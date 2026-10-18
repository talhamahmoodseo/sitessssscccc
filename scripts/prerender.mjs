/**
 * Prerender every page of the built site into real HTML.
 *
 *   npm run build      (runs this automatically after `vite build`)
 *
 * Why: the app is a client-side React SPA. Without this step the server sends
 * an empty <div id="root"> for every URL, so search engines have to run our
 * JavaScript to see any text, links, titles or schema, and most AI crawlers
 * never do. This script opens each page in headless Chromium, lets React and
 * the scroll animations finish, and saves what a visitor sees.
 *
 * Output (inside dist/):
 *   <route>/index.html      full pages for static hosting
 *   404.html                the not-found page (served with a 404 status)
 *   prerender/<key>.json    { head, body, scripts, critical } per page, for the
 *                           WordPress theme, which assembles the page in PHP
 *   prerender/routes.json   list of indexable paths (WordPress sitemap)
 *   sitemap.xml, robots.txt for static hosting
 *
 * Tokens: absolute URLs are written as __SITE_URL__ and image paths as
 * __ASSET_BASE__. The WordPress theme replaces them at request time with
 * home_url() and the theme folder, so the domain never has to be known at
 * build time. For static hosting set SITE_URL=https://yourdomain.com.
 *
 * Pages are discovered by crawling internal links from "/", so new pages are
 * picked up automatically as long as something links to them.
 */
import { createServer } from "node:http";
import { readFile, writeFile, mkdir, rm, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve, extname } from "node:path";
import { chromium } from "playwright";
import Beasties from "beasties";

const root = resolve(import.meta.dirname, "..");
const dist = join(root, "dist");
const SITE_URL = (process.env.SITE_URL || "").replace(/\/+$/, "");
const EXTRA = ["/404"]; // rendered by the catch-all route; never linked to

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".txt": "text/plain",
  ".xml": "application/xml",
};

const shell = await readFile(join(dist, "index.html"), "utf8");
// the shell may come from a `--base=./` build (WordPress); make it work at any depth
const absShell = shell.replace(
  /(src|href)="\.\/(assets|favicon|apple-touch)/g,
  '$1="/$2',
);

/* ----------------------------- tiny static server ---------------------------- */
const server = createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const file = join(dist, url);
  if (
    url !== "/" &&
    file.startsWith(dist) &&
    existsSync(file) &&
    (await stat(file)).isFile()
  ) {
    res.writeHead(200, {
      "content-type": TYPES[extname(file)] || "application/octet-stream",
    });
    res.end(await readFile(file));
    return;
  }
  res.writeHead(200, { "content-type": TYPES[".html"] });
  res.end(absShell);
});
await new Promise((r) => server.listen(0, r));
const ORIGIN = `http://localhost:${server.address().port}`;

/* --------------------------------- browser --------------------------------- */
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    (existsSync("/opt/pw-browsers/chromium")
      ? "/opt/pw-browsers/chromium"
      : undefined),
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
});
await context.addInitScript(() => {
  window.__SITE_URL__ = "__SITE_URL__";
  window.__TM_ASSET_BASE__ = "__ASSET_BASE__";
  window.__PRERENDER__ = true;
});

const beasties = new Beasties({
  path: dist,
  publicPath: "/",
  preload: "media",
  pruneSource: false,
  inlineFonts: false,
  reduceInlineStyles: false,
  logLevel: "warn",
});

const keyFor = (path) =>
  path === "/" ? "index" : path.replace(/^\/|\/$/g, "").replace(/\//g, "__");

const render = async (path) => {
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(ORIGIN + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  // walk the page so every scroll-triggered animation reaches its end state
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 400) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(90);
  }
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  const data = await page.evaluate(() => {
    const head = [
      `<title>${document.title.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</title>`,
    ]
      .concat(
        [...document.head.querySelectorAll("[data-seo]")].map(
          (e) => e.outerHTML,
        ),
      )
      .join("\n");
    const rootEl = document.getElementById("root");
    // anything still mid-entrance would be baked in as invisible: show it
    rootEl.querySelectorAll('[style*="opacity: 0"]').forEach((e) => {
      if (e.getAttribute("aria-hidden") === "true") return;
      e.style.opacity = "";
      e.style.transform = "";
    });
    const links = [...rootEl.querySelectorAll("a[href]")].map((a) =>
      a.getAttribute("href"),
    );
    const scripts = performance
      .getEntriesByType("resource")
      .map((r) => new URL(r.name).pathname)
      .filter(
        (p) => /^\/assets\/.+\.js$/.test(p) && !/\/app-[^/]+\.js$/.test(p),
      )
      .map((p) => p.replace(/^\/assets\//, ""));
    const robots =
      document.head
        .querySelector('meta[name="robots"]')
        ?.getAttribute("content") || "";
    return {
      head,
      body: rootEl.innerHTML,
      links,
      scripts,
      noindex: robots.includes("noindex"),
    };
  });
  await page.close();
  if (errors.length) console.warn(`  ! ${path}: ${errors.join(" | ")}`);
  return data;
};

/* ---------------------------------- crawl ---------------------------------- */
await rm(join(dist, "prerender"), { recursive: true, force: true });
await mkdir(join(dist, "prerender"), { recursive: true });

const queue = ["/", ...EXTRA];
const done = new Set();
const indexable = [];

while (queue.length) {
  const path = queue.shift();
  if (done.has(path)) continue;
  done.add(path);
  const d = await render(path);
  const key = path === "/404" ? "404" : keyFor(path);

  // full HTML for static hosting
  const site = SITE_URL || "__SITE_URL__";
  const head = d.head
    .replaceAll("__ASSET_BASE__", site)
    .replaceAll("__SITE_URL__", site);
  const preload = [...new Set(d.scripts)]
    .map((s) => `<link rel="modulepreload" crossorigin href="/assets/${s}">`)
    .join("\n");
  const html = absShell
    .replace(/<title>[\s\S]*?<\/title>/, `${head}\n${preload}`)
    .replace(
      '<div id="root"></div>',
      `<div id="root">${d.body.replaceAll("__ASSET_BASE__", "").replaceAll("__SITE_URL__", site)}</div>`,
    );
  // inline only the CSS this page uses; the full stylesheet loads without
  // blocking the first paint
  const fast = await beasties.process(html);
  const critical = (fast.match(/<style>([\s\S]*?)<\/style>/) || [])[1] || "";
  const out =
    path === "/404"
      ? join(dist, "404.html")
      : join(dist, path === "/" ? "" : path, "index.html");
  await mkdir(resolve(out, ".."), { recursive: true });
  await writeFile(out, fast);

  await writeFile(
    join(dist, "prerender", `${key}.json`),
    JSON.stringify({
      head: d.head,
      body: d.body,
      scripts: [...new Set(d.scripts)],
      critical,
    }),
  );

  if (!d.noindex) indexable.push(path);
  console.log(`  ${d.noindex ? "noindex" : "indexed"}  ${path}`);

  for (const href of d.links) {
    if (!href || !href.startsWith("/") || href.startsWith("//")) continue;
    const p = href.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
    if (/\.[a-z0-9]+$/i.test(p)) continue; // files, not pages
    if (!done.has(p)) queue.push(p);
  }
}

await browser.close();
server.close();

/* ------------------------------ sitemap, robots ------------------------------ */
const today = new Date().toISOString().slice(0, 10);
indexable.sort(
  (a, b) => a.split("/").length - b.split("/").length || a.localeCompare(b),
);
await writeFile(
  join(dist, "prerender", "routes.json"),
  JSON.stringify({ lastmod: today, paths: indexable }),
);

const site = SITE_URL || "https://YOURDOMAIN.com";
await writeFile(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    indexable
      .map(
        (p) =>
          `  <url><loc>${site}${p === "/" ? "/" : p}</loc><lastmod>${today}</lastmod></url>`,
      )
      .join("\n") +
    `\n</urlset>\n`,
);
await writeFile(
  join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`,
);

console.log(
  `\n  Prerendered ${done.size} pages (${indexable.length} indexable).`,
);
if (!SITE_URL)
  console.log(
    "  Static files use a placeholder domain. Set SITE_URL=https://yourdomain.com for static hosting.\n  (The WordPress theme fills in the domain itself.)\n",
  );

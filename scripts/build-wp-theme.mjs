/**
 * Assemble an installable WordPress theme from the Vite build.
 *
 *   npm run build:wp
 *
 * Produces wp-theme/talha-site/ and wp-theme/talha-site.zip, ready for
 * Appearance > Themes > Add New > Upload Theme.
 *
 * The zip is written here rather than by the OS on purpose: PowerShell's
 * Compress-Archive stores entry names with backslashes, which PHP reads as one
 * flat filename, and WordPress then rejects the theme with
 * "the theme is missing the style.css stylesheet". ZIP requires "/".
 *
 * Expects a build made with base "./" so the font url()s inside app.css stay
 * relative to the theme folder.
 */
import { cp, mkdir, rm, readdir, stat, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve, relative } from "node:path";
import JSZip from "jszip";

const root = resolve(import.meta.dirname, "..");
const dist = join(root, "dist");
const tpl = join(root, "wordpress");
const outDir = join(root, "wp-theme");
const slug = "talha-site";
const theme = join(outDir, slug);

if (!existsSync(dist)) {
  console.error("No dist/ found. Run `npm run build:wp`, not this script directly.");
  process.exit(1);
}

await rm(outDir, { recursive: true, force: true });
await mkdir(theme, { recursive: true });

// 1. compiled assets + images
await cp(join(dist, "assets"), join(theme, "assets"), { recursive: true });
if (existsSync(join(dist, "images"))) {
  await cp(join(dist, "images"), join(theme, "images"), { recursive: true });
}

// 1b. prerendered pages + icons (see scripts/prerender.mjs)
if (!existsSync(join(dist, "prerender", "index.json"))) {
  console.error("\n  ERROR: dist/prerender/ is missing. Run `npm run build:wp`, which prerenders first.\n");
  process.exit(1);
}
await cp(join(dist, "prerender"), join(theme, "prerender"), { recursive: true });
for (const f of ["favicon.svg", "favicon-32.png", "apple-touch-icon.png"]) {
  if (existsSync(join(dist, f))) await cp(join(dist, f), join(theme, f));
}

// 2. PHP templates
for (const f of await readdir(tpl)) {
  await cp(join(tpl, f), join(theme, f));
}

// 3. the stylesheet must reference fonts relatively or they 404 inside WP
const css = await readFile(join(theme, "assets", "app.css"), "utf8");
const absFont = css.match(/url\((\/[^)]*\.woff2?)\)/);
if (absFont) {
  console.error(
    `\n  ERROR: app.css references ${absFont[1]} with an absolute path.` +
      "\n  Rebuild with a relative base:  npm run build:wp\n"
  );
  process.exit(1);
}

// 4. collect every file, then zip with forward-slash entry names
const files = [];
const walk = async (dir) => {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else files.push(p);
  }
};
await walk(theme);

const zip = new JSZip();
let bytes = 0;
for (const p of files) {
  const entry = `${slug}/${relative(theme, p).split(/[\\/]/).join("/")}`;
  const buf = await readFile(p);
  bytes += buf.length;
  zip.file(entry, buf);
}

const zipPath = join(outDir, `${slug}.zip`);
await writeFile(
  zipPath,
  await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
  })
);

// 5. verify what we just wrote actually satisfies WordPress
const check = await JSZip.loadAsync(await readFile(zipPath));
const names = Object.keys(check.files);
const bad = names.filter((n) => n.includes("\\"));
const hasStyle = names.includes(`${slug}/style.css`);
if (bad.length || !hasStyle) {
  console.error(
    `\n  ERROR: bad zip. backslash entries=${bad.length} ` +
      `style.css at ${slug}/style.css=${hasStyle}\n`
  );
  process.exit(1);
}

const zipSize = (await stat(zipPath)).size;
console.log(`\n  Theme folder : wp-theme/${slug}/  (${(bytes / 1048576).toFixed(1)} MB)`);
console.log(`  Upload this  : wp-theme/${slug}.zip  (${(zipSize / 1048576).toFixed(1)} MB)`);
console.log(`  ${names.length} entries, forward-slash paths, ${slug}/style.css present.`);
console.log(`\n  WordPress: Appearance > Themes > Add New > Upload Theme > Activate,`);
console.log(`  then Settings > Permalinks > Save Changes once.\n`);

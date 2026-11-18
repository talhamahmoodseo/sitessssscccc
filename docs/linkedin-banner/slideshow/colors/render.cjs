/* Renders the three slides in each of the ten colour themes (themes.js):
 * colors/theme-N.jpg (three slides stacked) and colors/overview.jpg (slide 1 in all ten).
 * Run from the repo root: node docs/linkedin-banner/slideshow/colors/render.cjs */
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");
const dir = path.join(__dirname, "..");
const out = __dirname;
const src = fs.readFileSync(path.join(dir, "themes.js"), "utf8");
const THEMES = eval(src + ";THEMES");

(async () => {
  const b = await chromium.launch();
  const shots = {};
  for (let t = 1; t <= THEMES.length; t++) {
    for (const n of [1, 2, 3]) {
      const p = await b.newPage({ viewport: { width: 1584, height: 396 }, deviceScaleFactor: 1 });
      await p.goto("file://" + path.join(dir, "slides.html") + `#${n}-${t}`);
      await p.evaluate(() => document.fonts.ready);
      await p.waitForTimeout(150);
      const f = path.join(out, `_t${t}s${n}.png`);
      await p.screenshot({ path: f });
      shots[`${t}-${n}`] = f;
      await p.close();
    }
  }
  const sheet = async (file, body, width) => {
    const f = path.join(out, "_sheet.html");
    fs.writeFileSync(f, `<!doctype html><body style="margin:0;padding:28px;background:#E9E7E3;font-family:system-ui;width:${width}px">${body}</body>`);
    const p = await b.newPage({ viewport: { width: width + 56, height: 400 } });
    await p.goto("file://" + f);
    await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(out, file), fullPage: true, type: "jpeg", quality: 88 });
    await p.close();
    fs.unlinkSync(f);
  };
  const img = (k, w) => `<img src="${path.basename(shots[k])}" style="width:${w}px;display:block;border-radius:8px;box-shadow:0 1px 3px #0002">`;
  for (let t = 1; t <= THEMES.length; t++) {
    await sheet(`theme-${String(t).padStart(2, "0")}.jpg`,
      `<p style="margin:0 0 14px;font:700 26px system-ui;color:#222">${t}. ${THEMES[t - 1].name}</p>` +
      [1, 2, 3].map(n => `<div style="margin-bottom:16px">${img(`${t}-${n}`, 1200)}</div>`).join(""), 1200);
  }
  await sheet("overview.jpg", `<div style="display:grid;grid-template-columns:1fr 1fr;gap:22px 24px">` +
    THEMES.map((th, i) => `<div><p style="margin:0 0 8px;font:700 18px system-ui;color:#222">${i + 1}. ${th.name}</p>${img(`${i + 1}-1`, 760)}</div>`).join("") + `</div>`, 1544);
  for (const f of Object.values(shots)) fs.unlinkSync(f);
  await b.close();
  console.log("done");
})();

/* Exports the carousel: slide-NN.png (1080x1350), sheet.jpg (contact sheet) and carousel.pdf (upload this).
 * Run from the repo root: node docs/linkedin-content/posts/01-ai-before-google/render.cjs */
const path = require("path"); const fs = require("fs"); const { chromium } = require("playwright");
const dir = __dirname;
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  await p.goto("file://" + path.join(dir, "carousel.html"));
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  await p.pdf({ path: path.join(dir, "carousel.pdf"), width: "1080px", height: "1350px", printBackground: true, pageRanges: "" });
  const slides = await p.$$(".slide");
  for (let i = 0; i < slides.length; i++) await slides[i].screenshot({ path: path.join(dir, `slide-${String(i + 1).padStart(2, "0")}.png`) });
  const f = path.join(dir, "_s.html");
  fs.writeFileSync(f, `<!doctype html><body style="margin:0;padding:24px;background:#E9E7E3;display:grid;grid-template-columns:repeat(5,324px);gap:18px">${slides.map((_, i) => `<img src="slide-${String(i + 1).padStart(2, "0")}.png" style="width:324px;border-radius:8px">`).join("")}</body>`);
  const q = await b.newPage({ viewport: { width: 1730, height: 900 } });
  await q.goto("file://" + f); await q.waitForTimeout(400);
  await q.screenshot({ path: path.join(dir, "sheet.jpg"), fullPage: true, type: "jpeg", quality: 85 });
  fs.unlinkSync(f); await b.close(); console.log("slides", slides.length);
})();

/* Exports profile photos a-f (1000 x 1000) and a preview of each as a circle next to its banner.
 * Run from the repo root: node docs/linkedin-banner/profile-photo/render.cjs */
const path = require("path"); const fs = require("fs"); const { chromium } = require("playwright");
const dir = __dirname;
const sets = [["a", "Black + purple glow", 1], ["b", "Purple", 1], ["c", "Lavender", 1],
              ["d", "Black + orange/violet glow", 6], ["e", "Orange to violet", 6], ["f", "Off-white", 6],
              ["g", "Plain black", 6], ["h", "Black, soft light behind the head", 6]];
(async () => {
  const b = await chromium.launch();
  for (const [k] of sets) {
    const p = await b.newPage({ viewport: { width: 1000, height: 1000 } });
    await p.goto("file://" + path.join(dir, "photos.html") + "#" + k);
    await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(dir, `profile-${k}.png`) });
    await p.close();
  }
  // banner slide 1 in each theme, for the preview
  for (const t of [1, 6]) {
    const p = await b.newPage({ viewport: { width: 1584, height: 396 } });
    await p.goto("file://" + path.join(dir, "../slideshow/slides.html") + `#1-${t}`);
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(200);
    await p.screenshot({ path: path.join(dir, `_banner${t}.png`) });
    await p.close();
  }
  const card = ([k, name, t]) => `<div><p style="margin:0 0 8px;font:700 17px system-ui;color:#222">${k.toUpperCase()}. ${name} <span style="font-weight:500;color:#777">(banner ${t})</span></p>
    <div style="width:700px;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 1px 3px #0002">
      <img src="_banner${t}.png" style="display:block;width:700px;height:175px">
      <div style="position:relative;height:110px"><img src="profile-${k}.png" style="position:absolute;left:22px;top:-72px;width:140px;height:140px;border-radius:50%;border:4px solid #fff">
      <div style="position:absolute;left:24px;top:76px;font:700 19px system-ui">Talha Mahmood</div></div></div></div>`;
  const f = path.join(dir, "_sheet.html");
  fs.writeFileSync(f, `<!doctype html><body style="margin:0;padding:26px;background:#E9E7E3;width:1430px"><div style="display:grid;grid-template-columns:700px 700px;gap:26px 30px">${sets.map(card).join("")}</div></body>`);
  const p = await b.newPage({ viewport: { width: 1482, height: 400 }, deviceScaleFactor: 1.5 });
  await p.goto("file://" + f); await p.waitForTimeout(400);
  await p.screenshot({ path: path.join(dir, "preview.jpg"), fullPage: true, type: "jpeg", quality: 88 });
  fs.unlinkSync(f); for (const t of [1, 6]) fs.unlinkSync(path.join(dir, `_banner${t}.png`));
  await b.close(); console.log("done");
})();

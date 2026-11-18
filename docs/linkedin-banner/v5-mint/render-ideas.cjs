/* Exports ideas.html#1..#4 at 2x (idea-N-3168x792.png) and one sheet with banner.html plus all four on a profile.
 * Run from the repo root: node docs/linkedin-banner/v5-mint/render-ideas.cjs */
const path = require("path"); const fs = require("fs"); const { chromium } = require("playwright");
const dir = __dirname;
const names = ["Your current one: the two taglines", "Outranked by your competitor?", "They're just mentioned more", "Client review", "No PBNs, no link farms"];
(async () => {
  const b = await chromium.launch();
  for (const n of [1, 2, 3, 4]) {
    const p = await b.newPage({ viewport: { width: 1584, height: 396 }, deviceScaleFactor: 2 });
    await p.goto("file://" + path.join(dir, "ideas.html") + "#" + n);
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(dir, `idea-${n}-3168x792.png`) }); await p.close();
  }
  const files = ["banner-3168x792.png", ...[1, 2, 3, 4].map(n => `idea-${n}-3168x792.png`)];
  const card = (f, i) => `<p style="margin:${i ? 26 : 0}px 0 8px;font:700 19px system-ui;color:#222">${i === 0 ? "A" : String.fromCharCode(65 + i)}. ${names[i]}</p>
    <div style="width:1000px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px #0002">
      <img src="${f}" style="display:block;width:1000px;height:250px">
      <div style="position:relative;height:110px"><img src="../assets/talha-headshot.jpg" style="position:absolute;left:28px;top:-96px;width:176px;height:176px;border-radius:50%;border:5px solid #fff;object-fit:cover">
      <div style="position:absolute;left:220px;top:22px;font:700 24px system-ui">Talha Mahmood</div></div></div>`;
  const f = path.join(dir, "_s.html");
  fs.writeFileSync(f, `<!doctype html><body style="margin:0;padding:24px;background:#EAE8E4">${files.map(card).join("")}</body>`);
  const p = await b.newPage({ viewport: { width: 1048, height: 400 }, deviceScaleFactor: 1.4 });
  await p.goto("file://" + f); await p.waitForTimeout(400);
  await p.screenshot({ path: path.join(dir, "ideas-preview.jpg"), fullPage: true, type: "jpeg", quality: 88 });
  fs.unlinkSync(f); await b.close(); console.log("done");
})();

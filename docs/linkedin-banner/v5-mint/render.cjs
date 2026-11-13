/* Exports banner.html at 1x and 2x, plus a profile preview with Talha's mint headshot.
 * Run from the repo root: node docs/linkedin-banner/v5-mint/render.cjs */
const path = require("path"); const fs = require("fs"); const { chromium } = require("playwright");
const dir = __dirname;
(async () => {
  const b = await chromium.launch();
  for (const [s, name] of [[1, "banner-1584x396.png"], [2, "banner-3168x792.png"]]) {
    const p = await b.newPage({ viewport: { width: 1584, height: 396 }, deviceScaleFactor: s });
    await p.goto("file://" + path.join(dir, "banner.html"));
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(dir, name) }); await p.close();
  }
  const f = path.join(dir, "_p.html");
  fs.writeFileSync(f, `<!doctype html><body style="margin:0;padding:24px;background:#F4F2EE;font-family:system-ui">
    <div style="width:1000px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px #0002">
      <img src="banner-3168x792.png" style="display:block;width:1000px;height:250px">
      <div style="position:relative;height:150px"><img src="../assets/talha-headshot.jpg" style="position:absolute;left:28px;top:-104px;width:190px;height:190px;border-radius:50%;border:5px solid #fff;object-fit:cover">
      <div style="position:absolute;left:30px;top:96px;font:700 26px system-ui">Talha Mahmood</div></div></div></body>`);
  const p = await b.newPage({ viewport: { width: 1048, height: 448 }, deviceScaleFactor: 2 });
  await p.goto("file://" + f); await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(dir, "preview.png") }); fs.unlinkSync(f);
  await b.close(); console.log("done");
})();

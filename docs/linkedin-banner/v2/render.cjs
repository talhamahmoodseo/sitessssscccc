/* Renders the three v2 concepts (banner.html#1..#3) at LinkedIn size and 2x,
 * plus desktop/phone previews with the profile photo where LinkedIn puts it.
 * Run from the repo root: node docs/linkedin-banner/v2/render.cjs */
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

const dir = __dirname;

(async () => {
  const b = await chromium.launch();
  for (const n of [1, 2, 3]) {
    for (const [scale, suffix] of [[1, "1584x396"], [2, "3168x792"]]) {
      const p = await b.newPage({ viewport: { width: 1584, height: 396 }, deviceScaleFactor: scale });
      await p.goto("file://" + path.join(dir, "banner.html") + "#" + n);
      await p.evaluate(() => document.fonts.ready);
      await p.waitForTimeout(200);
      await p.screenshot({ path: path.join(dir, `concept-${n}-${suffix}.png`) });
      await p.close();
    }
    for (const [w, photo, left, name] of [[804, 152, 24, "desktop"], [390, 96, 16, "phone"]]) {
      const html = `<!doctype html><body style="margin:0;background:#F4F2EE;font-family:system-ui">
        <div style="width:${w}px;margin:24px auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 1px 3px #0002">
          <img src="concept-${n}-3168x792.png" style="display:block;width:${w}px;height:${w / 4}px">
          <div style="position:relative;height:${photo / 2 + 70}px">
            <img src="../assets/talha-headshot.jpg" style="position:absolute;left:${left}px;top:${-photo / 2 - 8}px;width:${photo}px;height:${photo}px;border-radius:50%;border:4px solid #fff;object-fit:cover">
            <div style="position:absolute;left:${left}px;top:${photo / 2 + 4}px;font-weight:700;font-size:${w > 500 ? 22 : 18}px">Talha Mahmood</div>
          </div>
        </div></body>`;
      const f = path.join(dir, `_p${n}${name}.html`);
      fs.writeFileSync(f, html);
      const p = await b.newPage({ viewport: { width: w + 48, height: Math.round(w / 4 + photo / 2 + 130) }, deviceScaleFactor: 2 });
      await p.goto("file://" + f);
      await p.waitForTimeout(300);
      await p.screenshot({ path: path.join(dir, `concept-${n}-preview-${name}.png`) });
      fs.unlinkSync(f);
      await p.close();
    }
  }
  await b.close();
  console.log("done");
})();

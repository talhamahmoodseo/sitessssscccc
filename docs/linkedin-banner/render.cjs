/* Renders banner.html to PNG (exact LinkedIn size and a 2x sharp copy) and
 * makes two previews with the profile photo where LinkedIn puts it.
 * Run from the repo root: node docs/linkedin-banner/render.cjs */
const path = require("path");
const { chromium } = require("playwright");

const dir = __dirname;
const url = "file://" + path.join(dir, "banner.html");

(async () => {
  const b = await chromium.launch();

  for (const [scale, name] of [[1, "banner-1584x396.png"], [2, "banner-3168x792.png"]]) {
    const p = await b.newPage({ viewport: { width: 1584, height: 396 }, deviceScaleFactor: scale });
    await p.goto(url);
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(dir, name) });
    await p.close();
  }

  // previews: desktop (banner ~804px wide, photo 152px circle bottom-left)
  // and phone (banner full width ~390px, photo ~100px circle bottom-left)
  const preview = (w, photo, left) => `<!doctype html><body style="margin:0;background:#F4F2EE;font-family:system-ui">
    <div style="width:${w}px;margin:24px auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 1px 3px #0002">
      <img src="banner-1584x396.png" style="display:block;width:${w}px;height:${w / 4}px">
      <div style="position:relative;height:${photo / 2 + 70}px">
        <img src="assets/talha-headshot.jpg" style="position:absolute;left:${left}px;top:${-photo / 2 - 8}px;width:${photo}px;height:${photo}px;border-radius:50%;border:4px solid #fff;object-fit:cover">
        <div style="position:absolute;left:${left}px;top:${photo / 2 + 4}px;font-weight:700;font-size:${w > 500 ? 22 : 18}px">Talha Mahmood</div>
      </div>
    </div></body>`;
  for (const [w, photo, left, name] of [[804, 152, 24, "preview-desktop.png"], [390, 96, 16, "preview-phone.png"]]) {
    const p = await b.newPage({ viewport: { width: w + 48, height: Math.round(w / 4 + photo / 2 + 130) }, deviceScaleFactor: 2 });
    const f = path.join(dir, "_" + name.replace(".png", ".html"));
    require("fs").writeFileSync(f, preview(w, photo, left));
    await p.goto("file://" + f);
    await p.waitForTimeout(400);
    await p.screenshot({ path: path.join(dir, name) });
    require("fs").unlinkSync(f);
    await p.close();
  }
  await b.close();
  console.log("done");
})();

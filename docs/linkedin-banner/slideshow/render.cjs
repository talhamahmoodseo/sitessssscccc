/* Exports the three slides (slides.html#1..#3) at LinkedIn size and 2x,
 * a contact sheet, and desktop/phone previews of slide 1 on a profile, with
 * the profile photo bottom-left and LinkedIn's slideshow dots bottom-right.
 * Run from the repo root: node docs/linkedin-banner/slideshow/render.cjs */
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");
const dir = __dirname;

(async () => {
  const b = await chromium.launch();
  for (const n of [1, 2, 3]) {
    for (const [scale, suffix] of [[1, "1584x396"], [2, "3168x792"]]) {
      const p = await b.newPage({ viewport: { width: 1584, height: 396 }, deviceScaleFactor: scale });
      await p.goto("file://" + path.join(dir, "slides.html") + "#" + n);
      await p.evaluate(() => document.fonts.ready);
      await p.waitForTimeout(250);
      await p.screenshot({ path: path.join(dir, `slide-${n}-${suffix}.png`) });
      await p.close();
    }
  }
  // previews on a mock profile, desktop and phone, for every slide.
  // Phone matches what the owner's preview tool showed: the profile photo is
  // about 36% of the banner width, starts 6% in, and its top sits 22% down the banner.
  for (const n of [1, 2, 3]) {
    for (const [w, photo, left, top, name] of [[804, 152, 24, 201 - 84, "desktop"], [390, 140, 23, 21, "phone"]]) {
      const h = w / 4;
      const big = w > 500;
      const dots = `<div style="position:absolute;right:${big ? 16 : 8}px;bottom:${big ? 10 : 6}px;background:rgba(0,0,0,.55);border-radius:99px;padding:${big ? '6px 12px' : '3px 7px'};display:flex;gap:${big ? 14 : 7}px">${[1,2,3].map(i => `<span style="width:${big ? 9 : 5}px;height:${big ? 9 : 5}px;border-radius:50%;${i === n ? 'background:#fff' : 'border:1.5px solid #fff'}"></span>`).join("")}</div>`;
      const below = top + photo - h;            // how far the photo hangs below the banner
      const html = `<!doctype html><body style="margin:0;background:#F4F2EE;font-family:system-ui">
        <div style="width:${w}px;margin:24px auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 1px 3px #0002">
          <div style="position:relative"><img src="slide-${n}-3168x792.png" style="display:block;width:${w}px;height:${h}px">${dots}
            <img src="../assets/talha-headshot.jpg" style="position:absolute;z-index:2;left:${left}px;top:${top}px;width:${photo}px;height:${photo}px;box-sizing:border-box;border-radius:50%;border:${big ? 4 : 3}px solid #fff;object-fit:cover"></div>
          <div style="position:relative;height:${below + 64}px">
            <div style="position:absolute;left:${left}px;top:${below + 14}px;font-weight:700;font-size:${big ? 22 : 18}px">Talha Mahmood</div>
          </div>
        </div></body>`;
      const f = path.join(dir, `_p${n}${name}.html`);
      fs.writeFileSync(f, html);
      const p = await b.newPage({ viewport: { width: w + 48, height: Math.round(h + below + 64 + 48) }, deviceScaleFactor: 2 });
      await p.goto("file://" + f);
      await p.waitForTimeout(300);
      await p.screenshot({ path: path.join(dir, `preview-${n}-${name}.png`) });
      fs.unlinkSync(f);
      await p.close();
    }
  }
  // contact sheet
  const sheet = `<!doctype html><body style="margin:0;padding:28px;background:#ECEAE6;font-family:system-ui;width:1584px">
    ${[1,2,3].map(n => `<p style="margin:${n>1?'26px':0} 0 10px;font:600 20px system-ui;color:#333">Slide ${n}</p><img src="slide-${n}-3168x792.png" style="width:1584px;display:block;border-radius:6px">`).join("")}</body>`;
  const sf = path.join(dir, "_sheet.html");
  fs.writeFileSync(sf, sheet);
  const p = await b.newPage({ viewport: { width: 1640, height: 400 }, deviceScaleFactor: 1 });
  await p.goto("file://" + sf);
  await p.waitForTimeout(400);
  await p.screenshot({ path: path.join(dir, "slides-all.png"), fullPage: true });
  fs.unlinkSync(sf);
  await b.close();
  console.log("done");
})();

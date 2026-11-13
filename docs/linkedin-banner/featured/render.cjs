/* Exports cards.html#1..#3 as featured-N.png (2400 x 1254, 2x of LinkedIn's 1200 x 627).
 * Run from the repo root: node docs/linkedin-banner/featured/render.cjs */
const path = require("path"); const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  for (const n of [1, 2, 3]) {
    const p = await b.newPage({ viewport: { width: 1200, height: 627 }, deviceScaleFactor: 2 });
    await p.goto("file://" + path.join(__dirname, "cards.html") + "#" + n);
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(__dirname, `featured-${n}.png`) }); await p.close();
  }
  await b.close(); console.log("done");
})();

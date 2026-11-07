# LinkedIn banner

**Ready to upload:** `banner-3168x792.png` (sharp on retina screens) or
`banner-1584x396.png` (LinkedIn's exact size). Both are the same design.

Previews with the profile photo where LinkedIn puts it:
`preview-desktop.png`, `preview-phone.png`. These are approximations; check
the real thing on your phone after uploading.

---

## 1. Why the old banner was a 5/10

| Old banner | Problem | New banner |
|---|---|---|
| Dark purple | Doesn't match the new mint photo or the website | Warm paper to mint, the same colours as the site and the photo |
| "Forget Low Quality Backlinks" | Opens with a negative and a word buyers don't search for | "Rank on Google. Get cited by AI." The website's own promise, so the profile and the site say the same thing |
| 3 logos | Two aren't on the website, and none of the big ones | The 5 clients from the website: CapCut, SmileTutor, Ocuco, CryptoDesk, Defender |
| Stock "SEO analysis" photo on the left | Noise, and the profile photo covers it anyway | Left side kept calm; no company logo (nobody knows the name yet) |
| "DM 'SEO' to get free audit" | Good idea, keep it | "Free link audit: DM me 'AUDIT'" |

## 2. The design (based on your 4th reference, the Anamul Hasan one)

What we took from it: light background with a faint grid, a small dark CTA
pill on top, a big two-line headline with one highlighted word, one
supporting line, a "Trusted by" row, and your photo on the right.

What we changed to make it ours: your brand font (Plus Jakarta Sans), the
orange-to-violet "cited" from the website, the highlighter-yellow mark, and
mint instead of lime, so the banner, the profile photo and the website feel
like one brand.

**Layout, left to right (1584 × 396):**
- 0–470 px: kept empty. On desktop the profile
  photo covers the bottom left (about the first 360 px). On phones it covers
  a bit more.
- 500–1140 px: the message. CTA pill, headline, one line, logos.
- 1150–1550 px: your arms-crossed photo (`assets/talha-cutout.webp`, transparent background) on a soft light circle.

## 3. The words

Visitors read this in about three seconds, so it does three jobs: what you
do, proof, and what to do next.

| Part | Text | Why |
|---|---|---|
| CTA pill | Free link audit: DM me "AUDIT" | One clear action. "AUDIT" is easy to type and you'll know where the DM came from |
| Headline | Rank on Google. Get *cited* by AI. | Same as the website hero. Covers SEO and the AI angle you want to be known for |
| Line | I get your brand onto **real publications** your buyers already read. | First person (it's your personal profile), plain words, says how |
| Proof | Trusted by CapCut, SmileTutor, Ocuco, CryptoDesk, Defender | Real clients, each with a case study on the site |

**Other headlines if you want to test one:**
- "Links from real publications. Not link farms."
- "I get brands named on Google and in AI answers."
- "Authority links that move rankings."

**Old logos:** the old banner had two more brands (including ScalaHosting).
If they were real clients and you're allowed to show them, send the logo
files and I'll add them. Keep it to 5–6 logos, or they get too small to read.

**Match it everywhere:** your LinkedIn headline (the line under your name)
should say the same thing, e.g. "Founder, Editorial HQ | Link building, digital
PR and AI brand mentions | I help brands rank on Google and get cited by AI".

## 4. Editing it yourself

The banner is a web page (`banner.html`), so the text and logos are exact.
To change a word, edit it in `banner.html` and run:

```
node docs/linkedin-banner/render.cjs
```

That makes new PNGs and previews. Or just tell Claude what to change.

---

## 5. If you want to make versions with ChatGPT, Gemini or Claude Design

**Important:** image AIs still struggle with small text and real logos. They
misspell words, invent letters and redraw logos wrong, and on a profile a
wrong client logo looks worse than no logo. So there are two safe ways to
use them:

1. **Background only (recommended):** let the AI make the background and your
   photo placement, leave the text area empty, then add the text and logos in
   Canva (or ask Claude to put them on).
2. **Full design:** fine for exploring ideas, but check every letter and redo
   the logos before using it.

### Prompt 1: background + photo only (ChatGPT or Gemini)

Upload your final headshot first.

```
Create a LinkedIn profile banner, exactly 1584 x 396 pixels (4:1), for the
founder of a link building and digital PR agency. Photorealistic, clean,
premium, modern. Not corporate, not busy.

Background: warm off-white paper (#F7F6F4) on the left, blending smoothly into
soft mint (#B2D8C1) on the right third. A very faint thin grid, like graph
paper, only on the left two-thirds, fading out towards the right.

Subject: the man from the uploaded photo on the far right, from mid-chest up,
facing the camera, filling the full height of the banner, his mint backdrop
blending invisibly into the banner's mint. Keep his face, glasses, hair,
beard, skin tone, expression and clothes exactly as in the photo.

Leave the area from about 30% to 72% of the width completely empty and evenly
lit. I will add text there. Leave the bottom-left corner empty too; my
profile photo covers it. No text, no logos, no icons, no watermark.
```

### Prompt 2: full design (to explore ideas)

```
Design a LinkedIn profile banner, exactly 1584 x 396 pixels, for Talha
Mahmood, founder of Editorial HQ, a link building and digital PR agency.
Clean, modern, premium, light design.

Background: warm off-white (#F7F6F4) blending into soft mint (#B2D8C1) on the
right, with a faint graph-paper grid on the left side.

Right side: the man from the uploaded photo, chest up, facing the camera.
Keep his face, glasses, hair, beard and skin tone exactly as in the photo.

Text, left-aligned, starting about 32% from the left edge, in a clean
geometric sans-serif like Plus Jakarta Sans:
1. A small black rounded pill: "Free link audit: DM me “AUDIT”" (the word
   AUDIT in yellow).
2. Large bold headline on two lines: "Rank on Google." / "Get cited by AI."
   The word "cited" in italic with an orange-to-violet gradient.
3. One line in dark grey: "I get your brand onto real publications your
   buyers already read."
4. Small caps label: "TRUSTED BY" followed by a row of five placeholder grey
   logo shapes (I will replace them with real logos).

Keep the bottom-left corner empty (my profile photo covers it). Spell every
word exactly as written. No other text.
```

### For Claude Design

Paste this as the brief, and attach the headshot and the five logo files from
`docs/linkedin-banner/assets/`:

```
LinkedIn banner, 1584 x 396. Brand: Editorial HQ (link building, digital PR,
AI brand mentions). Font: Plus Jakarta Sans. Colours: ink #0E0E0E, paper
#F7F6F4, mint #B2D8C1, accent gradient #E25428 to #7C5CF6, highlighter
#F5CE58. Light paper background with a faint grid on the left, mint on the
right, my headshot on the right with its mint backdrop blending in.
No logo. Message starting 500 px from the left: black pill
"Free link audit: DM me “AUDIT”", headline "Rank on Google. / Get cited by
AI." with "cited" in the italic gradient, line "I get your brand onto real
publications your buyers already read." with "real publications" highlighted,
then "TRUSTED BY" and the five client logos in one dark tone. Keep the bottom
left 470 px clear for the profile photo.
```

---

## Sources

- Banner size 1584 × 396 and safe zones (sources disagree on how much the
  profile photo covers, so the layout keeps a generous margin):
  [RightBlogger](https://rightblogger.com/blog/linkedin-banner-size),
  [ManyPixels](https://www.manypixels.co/blog/social-media-design/linkedin-banner-size),
  [Zeliq](https://www.zeliq.com/blog/linkedin-banner-size)

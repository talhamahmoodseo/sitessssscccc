# LinkedIn banner: content + ChatGPT / Gemini prompts

Uses the **website's brand colours**, not green:

| Use | Colour |
|---|---|
| Background | warm off-white `#F7F6F4` (or white `#FFFFFF`) |
| Text | ink black `#0E0E0E` |
| One accent word | orange-to-violet gradient, `#E25428` → `#7C5CF6` |
| Highlighter | yellow `#F5CE58` behind one short phrase |
| Font | Plus Jakarta Sans (a clean geometric sans) |

## The content

**Recommended (A):**
- **Top-left CTA pill:** DM "AUDIT" for a free link audit
- **Small line, with the strike:** Forget ~~low-quality backlinks~~.
- **Headline:** Build *authority* links that move your rankings.
- **Line under it:** Real publications. Real editors. No PBNs.
- **Proof:** Trusted by CapCut · SmileTutor · CryptoDesk

Why it converts:
- The strike names what buyers have been burned by.
- The headline promises the result they pay for: rankings.
- The short line answers "is this safe?".
- Three known brands prove it.
- The DM gives one easy next step.

**Option B:**
- No ~~PBNs~~. No ~~link farms~~.
- Backlinks from real publications that actually rank you.
- Trusted by CapCut · SmileTutor · CryptoDesk

**Option C:**
- Your competitors aren't better. They're just mentioned more.
- I get your brand on the sites Google and ChatGPT trust.
- Trusted by CapCut · SmileTutor · CryptoDesk

## What to upload with the prompt

1. Your arms-crossed photo without a background (`assets/talha-cutout.webp`).
2. Your style reference(s), e.g. the banner designs you like.
3. For Gemini only: `canvas-1584x396.png`, so it keeps LinkedIn's shape.

## Prompt for ChatGPT

```
Image 1 is my photo (arms crossed, no background). Image 2 is a style
reference for layout and polish only, not its colours or text.

Design a LinkedIn profile banner, exactly 1584 x 396 pixels (a wide 4:1
strip), for Talha Mahmood, who runs a link building and digital PR agency.
Clean, premium, modern, light. It should look like a professional design
studio made it.

Colours (use only these): warm off-white background #F7F6F4, ink black text
#0E0E0E, one word in an orange-to-violet gradient (#E25428 to #7C5CF6), and a
soft yellow highlighter (#F5CE58) behind one short phrase. A very faint
orange-to-violet glow behind me. No green.

Layout:
- Top-left corner: a small black rounded pill with white text:
  DM "AUDIT" for a free link audit
- Centre, left-aligned, starting about one third from the left edge:
  1. Small grey line: "Forget low-quality backlinks." with the words
     "low-quality backlinks" crossed out by one clean straight line.
  2. Big bold headline on two lines: "Build authority links" /
     "that move your rankings." The word "authority" in the
     orange-to-violet gradient, in italic.
  3. One smaller line: "Real publications. Real editors. No PBNs." with a
     yellow highlighter behind "Real publications".
  4. Small caps label "TRUSTED BY" followed by three plain white rounded
     tiles, left empty (I will add the logos).
- Right side: me from Image 1, from the waist up, arms crossed, facing the
  camera, filling the full height of the banner.
- Keep the bottom-left corner (the first 30% of the width, lower half)
  empty: my LinkedIn profile photo covers it.

Keep my face, glasses, hair, beard, skin tone and clothes exactly as in
Image 1. Spell every word exactly as written above. No other text, no
watermark, no extra icons.
```

## Prompt for Gemini

```
Using the photo of me and the blank canvas I uploaded, create a LinkedIn
banner the exact shape of the canvas (1584 x 396 pixels). It is for my link
building and digital PR agency, and it should look clean, premium and light,
like it came from a top design studio.

The background is warm off-white, the same as the canvas. On the right side
I'm standing from the waist up with my arms crossed, facing the camera,
filling the full height of the banner, with a very faint orange-to-violet
glow behind me. My face, glasses, hair, beard, skin tone and clothes stay
exactly as in my photo.

In the top-left corner sits a small black rounded pill with white text that
reads: DM "AUDIT" for a free link audit.

Starting about a third of the way in from the left, left-aligned, the text
reads in this order. First, a small grey line: "Forget low-quality
backlinks." with "low-quality backlinks" crossed out by one clean line. Then
a large bold black headline on two lines: "Build authority links" and "that
move your rankings." The word "authority" is italic, in an orange-to-violet
gradient. Under it, one smaller line: "Real publications. Real editors. No
PBNs." with a soft yellow highlighter behind "Real publications". Last, a
small label "TRUSTED BY" followed by three plain white rounded tiles, left
empty for logos.

The bottom-left corner stays empty, because my profile photo covers it. The
font is a clean geometric sans-serif. Every word is spelled exactly as
written, and there is no other text or watermark.
```

## If something comes out wrong (one fix at a time)

| Problem | Say this |
|---|---|
| Wrong shape | "Make it exactly 1584 x 396 pixels, a wide 4:1 strip. Keep everything else the same." |
| Text misspelt | "Fix the text so it reads exactly: [paste the line]. Change nothing else." |
| Face changed | "My face has changed. Match my face to Image 1 exactly. Change nothing else." |
| Green or other colours crept in | "Use only off-white, black, the orange-to-violet gradient and the yellow highlighter. Change nothing else." |
| Too busy | "Remove all decoration except the faint glow behind me. Change nothing else." |
| Text over the bottom-left corner | "Move the text block right so the bottom-left 30% is empty. Change nothing else." |

**Logos:** don't let the AI draw them. It gets logos wrong, and a wrong
client logo looks worse than none. Add the real files from `assets/`
(`capcut.svg`, `smiletutor.svg`, `cryptodesk-mark.png`) into the empty tiles
in Canva, or send the image to Claude to place them.

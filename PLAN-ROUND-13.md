# Round 13 plan: results-first hero, pricing, case studies, pilot page

Owner brief (31 Oct 2026): a new homepage hero idea (not a fix of the old
one), the pricing page rebuilt on Amplemarket's pricing structure, the case
studies page rethought along the lines of uSERP's /results, and a new Pilot
Offer page in the spirit of uSERP's /pilot. All four should read as one
premium brand. Real client data only.

## 1. What I reviewed

**Our site today**
- Hero: `SearchStory`, a made-up Google results page for "best crm for small
  teams". It explains *how* link building works. The owner doesn't like the
  concept.
- Pricing: dark stage with the trial band and four package cards. Below that
  come 3 steps, a 4-column comparison, the guarantee band, full guarantee
  terms (`#guarantee-terms`, linked from /terms), other services priced
  separately, "the terms in plain words", "five things move a custom quote",
  one quote, the FAQ and a CTA. It's long and text-heavy.
- Case studies index: six pastel cards (logo, chips, title, summary, stats),
  then totals, "eight sections, every time" and "what we count / leave out".
  There are no client screenshots and no single lead story.
- Real assets we haven't used yet: client homepage screenshots (SmileTutor,
  Ocuco, CapCut, Defender), SmileTutor's Google #1 and AI Overview captures,
  Semrush growth charts, CryptoDesk's two Google captures, and Ocuco's
  placement on OpenCart. Four clients have approved photos.

**References**
- Amplemarket hero: one product card in the middle shows what the customer
  gets. New rows slide in at the top, a small tile travels along faint lines
  from the left into the card, and the background glow changes colour with
  each item. A sketched character leans on the card. It shows no process,
  only the outcome.
- Amplemarket pricing: short cards (name, one-line tagline, price, a few
  grouped feature lines with check marks), a logo wall, one big quote, a light
  comparison table with coloured category markers, a bento of results, then
  a dark review wall.
- uSERP /results: a dark hero with a results-at-a-glance panel, a logo strip,
  **one featured result** (headline result, media, quote, 3 stats, CTA), video
  testimonials, then a filterable grid. Each card shows **the client's homepage
  on top**, a sector label, a title, 3 stat boxes, one line and a link.
- uSERP /pilot, in this order:
  1. A risk-free offer, with the form beside it.
  2. Why it's offered (3 cards).
  3. The usual way vs the pilot.
  4. Tiny steps with small numbers.
  5. "The same links our clients pay for", with an anchor price.
  6. "What three links will not do".
  7. Who qualifies.
  8. Proof of the full programme.
  9. A two-column FAQ.
  10. A final apply block.

## 2. One system for all four pages

- **New shared proof kit** (`src/components/proof.tsx`):
  - `SiteShot`: the client's own homepage in a slim browser frame, with the
    domain in the address bar.
  - `ResultCard`: the uSERP-style case card (screenshot, sector, client,
    title, 3 stats, one line, link).
  - Client data for the hero (person, approved quote, media, facts) taken
    from `lib/cases.ts`, so the numbers can't drift.
- **Reused as they are:** `LogoStrip`, `ProofGrid` (the results bento),
  `ReviewWall`, `GuaranteeBand`, `GuaranteeTerms`, `ServiceFaq`, the `kit`
  headings (`H2` + `Soft`) and `Annotation` (one handwritten note per page).
- Colour: ink on paper. Each client keeps its pastel tint from `cases.ts`
  (butter, lilac, mint, sky, blush). The only gradient is the existing
  orange-to-violet heading accent. Pricing and the pilot open on the same
  dark stage; the homepage and case studies stay light.

## 3. Homepage hero: "the results stage"

**Keep:** the NEW pill, the headline "Rank on Google. Get cited by AI." (it
matches the new brand kit and the social image), the audit input, and the
money-back and replacement chips.
**Replace:** `SearchStory` with `ResultStage`.
**Change:** the subline, so it's conversational and leads into the proof.

The stage, desktop:
- **A main card shaped like a social post from a real client.** Photo, name
  and role, a verbatim line from their approved quote, then "attached
  media": their homepage in a browser frame, with a result chip pinned on
  it. Three facts slide in underneath, one at a time.
- **Two proof chips peek from behind the card**, specific to the client.
  SmileTutor's are its real Google #1 result and the AI Overview that names
  it first.
- **Links arriving:** faint lines run from the left edge into the card, and
  small tiles travel along them. The tiles name the client's real link types
  (guest post, niche edit, brand mention), or real sites where we have them
  (CryptoDesk: MarketWatch, Khaleej Times, Cointelegraph).
- **It cycles through five clients:** SmileTutor, CryptoDesk, Ocuco, CapCut
  and Defender. The background glow fades to each client's tint. Pill tabs
  under the card (client and industry) let people pick one, with a thin
  progress line. Hovering or focusing pauses it, and it doesn't auto-play
  for people who prefer reduced motion.
- One handwritten note: "real clients, real numbers".

Phone: the card is full width, the facts stack under it, the tabs scroll
sideways, and there are no lines or floating chips.

Performance: the first render is fixed (SmileTutor), so hydration matches;
timers start after mount and pause when the stage is off screen. Only the
first screenshot loads at once, the rest on demand. Every animation uses
transform and opacity only.

## 4. Pricing

Order, following the owner's five points:
1. **Dark stage:** headline, a one-line sub and the guarantee chips. A slim
   **pilot bar** links to /pilot. Four **package cards**, Amplemarket-style:
   name and tag, a one-line tagline, the price, "3 placements · $190 each",
   and a short ✓/✗ list with the guarantees as highlighted lines. Custom keeps
   "Let's talk". Under the cards: once or monthly, no setup fee, no contract.
2. **One client quote**, large (Tiffany Lei, agency owner), with the logo
   strip.
3. **Comparison table**, Amplemarket-style: category headers with coloured
   markers, alternating rows, ✓ and ✗. Same data as today, plus "You keep the
   links and reports".
4. **Real results:** the `ProofGrid` bento.
5. **Client reviews:** `ReviewWall`.

Then the supporting material: the guarantee band, the full guarantee terms
(the `#guarantee-terms` anchor stays), PR and AI visibility priced
separately, the FAQ, and the closing CTA.

**Moved, not removed:** the content of "Three steps", "The terms in plain
words" and "Five things move a custom quote" moves into the cards, the table
and the FAQ ("How does ordering work?", "What changes a custom quote?"). If
the owner wants any of them back as a section, it's a small change.

No prices change. Everything still reads from `lib/pricing.ts`.

## 5. Case studies (/case-studies)

1. **Hero:** headline on the left, a "results at a glance" panel on the
   right, with real numbers only.
2. **Logo strip.**
3. **Featured result, SmileTutor:** headline result; a media stack (homepage,
   Google #1 capture, AI Overview capture); Rum Tan's quote; three stats; a
   CTA.
4. **More client results:** service filter chips (All, Link building, Brand
   mentions, Digital PR, White label) and a `ResultCard` grid with each
   client's homepage. CryptoDesk shows its Google capture, because its site
   is offline. The agency partner shows its quote, because it has no public
   site.
5. **In their words:** `ReviewWall`.
6. **How we report**, made compact: "what we count / what we leave out" and
   the eight parts of every case file as one row.

The case study detail pages stay as they are (the owner restored them in
round 9).

## 6. Pilot page (/pilot), new

**The offer is the real one we already sell:** one trial placement, $200,
one per company, the same placement as a package link, backed by the
money-back guarantee. The page calls it "the pilot: one trial link", so it
matches the "trial" wording used across the site. Nothing about the offer
is invented. If the owner wants a free pilot like uSERP's, the terms come
from him first.

Sections:
1. **Dark hero:** "One link on your site. Then decide." Three ✓ lines, "one
   pilot per company", and a start card (website, email, the page to rank)
   that opens the contact form with the trial package selected.
2. **Logo strip.**
3. **Why a pilot:** 3 cards, plus "the usual way vs the pilot".
4. **How it works:** 4 steps, plus small numbers (24 h reply, 2–4 weeks to
   live, $200, 100% money-back).
5. **The same placement clients pay for:** what's included, the price beside
   the package rate, and a real placement (Ocuco on OpenCart's blog).
6. **"What one link won't do":** an honesty note signed by Talha.
7. **Who it's for / not for / good to know:** from the terms and the FAQ.
8. **What the full programme did:** `ResultCard`s and quotes.
9. **FAQ:** about the pilot, and about the link.
10. **Final call to action.**

Linked from the pricing page, the homepage hero and the footer, so the
prerender finds it and the sitemap lists it.

## 7. Checks

`npx tsc --noEmit`, `npm run build`, `npm run build:wp`, then the build
again. Check 1440px and 390px with no sideways scroll, check hydration with
`__TM_DEBUG_HYDRATION__`, refresh the screenshots, update HANDOFF, commit and
push.

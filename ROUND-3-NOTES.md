# Round 3 — Outreachr rebrand and homepage rework

What changed in this round, and the two decisions still open.

## Done

**Brand**
- Name is **Outreachr** everywhere: logo (`components/Logo.tsx`, an "o" with
  one line reaching out to an amber dot), nav, footer, intro curtain, page
  titles, JSON-LD, WordPress theme header.
- The intro curtain plays once per visit (sessionStorage), not on every load.
- All freelancing-platform references removed (Upwork, Fiverr, Legiit, ComeUp,
  "Top Rated"). Reviews now show the service the client used.
- AI-sounding filler removed: CTA tick rows ("No retainer, no lock-in",
  "Reviewed by a senior strategist", "No obligation", "You talk to the person
  doing the work"), "Straight answers", the founder card on the Link Building
  FAQ, "results-driven", and similar lines.

**Colour**
- One heading accent, `<Accent>` (`components/Accent.tsx`): a few words in the
  hero smoke's orange-to-violet. Used on the home hero, The Shift, the data
  block, Services, Personas, FAQ, the CTA, the About hero and "different", and
  the second line of each service-page hero.

**Homepage**
- Hero: the rocket is static, flame included. The smoke is a WebGL shader
  (`components/SmokePlume.tsx`): domain-warped noise in orange and lavender,
  flowing left from the `data-nozzle` marker, with risograph grain. First
  frame draws on mount; reduced motion gets a still frame; no WebGL falls back
  to the old grain blobs. Rocket shows from 1280px up; below that the smoke
  drifts in from the right.
- The Shift: the three previews are drawn like the real products (Google
  results, Google AI Overview, ChatGPT).
- "What the data says": three sourced cards, each checked against its source
  page in October 2026:
  - Neil Patel: informational queries with AI Overviews −61% CTR; branded
    queries with AI Overviews +18.7% CTR (aggregated from four sources).
  - Ahrefs (75K brands): branded web mentions correlate 0.664 with AI Overview
    visibility; number of backlinks 0.218.
  - Semrush: the average AI search visitor is worth 4.4× the average organic
    visitor, by conversion rate.
  The old "+18.7% growth in branded search queries" label was wrong and is gone.
- Services: four services (Link Building, Digital PR, Brand Mentions, HARO &
  Expert Quotes), each with the artefact it produces in its page's colours.
- Personas: rebuilt to the Amplemarket reference — tall tab cards with
  pencil-sketch figures (`components/PersonaFigures.tsx`), lighter headline
  weight, accent word with margin sparks.
- Booking popup: what the call is, three clear next steps, email fallback.
- Footer rebuilt: one-line description, Services / Company / Get in touch.

**About** — content rewritten from scratch: who we are, four beliefs (replaces
the timeline), what makes us different, how the team works, where we draw the
line. Design kept.

**Digital PR** — hero back to the three small fanned paper previews.

## Open decisions

1. **Pricing.** Not touched. Waiting on the pricing discussion (pilot order,
   entry plan, exact placement counts, public vs "from" prices).
2. **Hero demo (SearchTheatre).** Not touched beyond copy. Proposed
   replacement: a "campaign view" product panel showing placements going live
   and what they moved. Waiting on approval.

## Still placeholder

- Calendly URL (`lib/booking.ts`) — the popup shows a loading state until set.
- Contact email domain (see PROJECT.md §10).
- All case studies, reviews, clippings and artefacts are samples.

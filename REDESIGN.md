# Redesign — design system and roadmap

Benchmark: **amplemarket.com**, studied for craft level, not copied. What makes
their site read premium, measured from the live page:

| Signal | Amplemarket | What we took |
| --- | --- | --- |
| Type | one variable grotesk, display at **w900, line-height 0.80, tracking −0.045em** | Inter Tight at **w800, lh 0.92, tracking −0.042em** |
| Surface | warm paper `#F6F5F3`, ink `#111`, alternating true-dark sections | paper `#F6F5F3`, ink `#0E0E0E`, dark sections |
| Accent | exactly one (`#1082EC`) + pastels for illustration | exactly one (**vermillion `#E2582A`**) + pastels |
| Elevation | **hairline inset ring** `inset 0 0 0 1px rgba(17,17,17,.05)` (82 uses) | `shadow-hairline` / `soft` / `lift` |
| Radii | 12 / 8 / 4 — no pills | 12 / 16, pills only for the badge |
| Nav | 59px, transparent, 13px links | 64px, transparent → blurred on scroll |
| Buttons | small and tight: 13px, r8, px14 py12 | 13px, r12, ink fill, accent on hover |
| Rhythm | 84 / 128px section padding | `.section` → clamp(4.5rem, 8vw, 8rem) |

The old palette's core failure: `blue-accent` was mapped to near-black, so the
site had **no accent at all**. Everything was ink-on-paper, which is why it read
flat regardless of layout.

## The system

Tokens live in `src/index.css` under `:root`; Tailwind surfaces them in
`tailwind.config.js`. Legacy names (`navy-dark`, `blue-accent`, `mist`, …) are
aliased onto the new tokens so existing pages inherit the new palette while they
are migrated page by page.

Typographic roles — use these rather than ad-hoc sizes:

- `.display-xl` hero, `.display-lg` section openers, `.display-md` sub-sections,
  `.display-sm` card titles
- `.lead` intro paragraphs, `.eyebrow` small caps labels
- `.card-flat` / `.card-lift` / `.ring-hairline` surfaces
- `.cite-mark` — the citation highlight, the brand's core metaphor

## The hero visual

`src/components/CitationEngine.tsx` replaces the old rocket. It animates the
mechanism the business actually sells, left to right:

```
editorial placements  →  domain authority  →  cited by answer engines
```

Four publication cards land, links draw themselves to the brand node with a
pulse travelling down each wire, the authority meter fills and DR climbs
35 → 68, then Google / AI Overviews / ChatGPT / Claude light up in sequence,
each naming the brand under a highlight.

One 14s loop. Every element keyframes against the same clock via `times`, so
nothing re-renders per frame. A separate stacked composition runs under `sm`,
and `prefers-reduced-motion` renders the finished state with no motion.

## Status

**Done**

- Design tokens, type scale, elevation, radii, spacing rhythm
- Inter Tight + Inter variable fonts, self-hosted
- Citation Engine hero visual (desktop + mobile + reduced-motion)
- Hero section rebuilt around it
- Navigation rebuilt: compact, blur-on-scroll, richer services menu
- Contrast swept to 0 failures below 2.2:1

**Next, in priority order**

1. **Service pages** — the weakest asset. Each needs: problem framing, what you
   actually get, the vetting standard, a worked example with real numbers,
   pricing context, objection handling, internal links to related services and
   case studies, and an FAQ targeting real queries. Target ~1,400–1,800 words
   of substance per page, no filler.
2. **Homepage sections** — TheShift, Services, Results, Process, Personas,
   Testimonials, FAQ still use the old spacing and card styles. They inherit the
   new palette but need the new type roles and section rhythm.
3. **About** — founder story, method, team, proof. Currently thin.
4. **Case studies** — move from summary cards to full narratives with charts.
5. **Pricing** — clarify tiers against deliverables, add comparison and FAQ.
6. **Footer + CTA band** — restyle to the new system.
7. **Blog** — article template typography, related posts, author block.

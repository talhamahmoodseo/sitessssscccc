# Design system — surfaces, depth, and when to use colour

This exists because the site read as "one long white document". The cause was
measurable, not stylistic.

## The problem it fixes

`white`, `paper/mist` and `linen` sat within **1.08:1** of each other in
relative luminance. The eye cannot separate surfaces that close, so a page
with a `white → linen → mist → white` rhythm looked like a single continuous
sheet interrupted by occasional black bands. The site effectively had two
surfaces, not four.

On top of that, `shadow-soft`, `shadow-deep` and `shadow-lift` were referenced
23 times in markup and resolved to **nothing**, so every card sat perfectly
flat on its background.

## The surface ladder

Use these as section grounds. Luminance in brackets; each step down is a real,
visible change.

| Token             | L     | Use                                                        |
| ----------------- | ----- | ---------------------------------------------------------- |
| `bg-white`        | 1.000 | Cards and panels sitting **on** a tinted ground. Rarely a whole section. |
| `bg-mist`         | 0.933 | The default page ground.                                    |
| `bg-stone`        | 0.767 | A visibly deeper neutral. The workhorse alternate.          |
| `bg-clay`         | 0.636 | Deepest light tone. One or two weighty sections per page.    |
| `bg-espresso`     | 0.012 | Warm dark. Use when a page needs a second dark band.         |
| `bg-navy-dark`    | 0.005 | Primary dark band (this is ink, the name is historical).     |
| `bg-mark`         | 0.643 | **Amber. One saturated moment per page, maximum.**           |

Ink on `clay` is 12.6:1 and ink on `mark` is 12.7:1, so both carry body copy
safely. Always verify rather than assume.

### Rules

1. **No two adjacent sections share a surface.**
2. A page uses **at least four** distinct surfaces, including at least one
   dark, and **at most one** amber.
3. **Never more than three consecutive light sections** (white/mist/stone/clay)
   without a dark or amber break.
4. `white` is for things sitting on top of something, not for long runs of
   full-width sections. A run of white sections is the exact failure this
   document exists to prevent.

## Depth

Shadows are now real. Tinted with ink rather than black so they stay warm:

- `shadow-soft` — chips, small controls
- `shadow-lift` — standard cards on a tinted ground
- `shadow-deep` — hero cards, the one feature object on a page

**Every page must use at least three** of these techniques:

- cards floating on a tinted ground with `shadow-lift`
- bordered inset panels (`border border-line`) on a contrasting ground
- oversized numerals or display figures as structure
- hairline rules carrying the layout instead of boxes
- a pastel feature panel (butter / mint / lilac / blush / sky) behind a
  figure, diagram or image
- a full-bleed amber band for the page's highest-intent moment
- an overlapping composition — a card pulled up over a section boundary with
  a negative margin so the two surfaces interlock

## Colour

The pastels are no longer reserved for stat tiles. They may ground a feature
panel or a card. They may not be used as a full-bleed section ground — they
are too saturated at that size, and the amber band is the page's one loud
moment.

Amber (`bg-mark`) is the accent. It is the brand highlighter, so it reads as
ours rather than as decoration. Spend it once per page on the thing you most
want remembered: a closing CTA, an emphasis line, or the single proof figure
that matters.

No red. It has been rejected twice. `--gap` is a rust reserved for rejection
markers and must not be promoted to an accent.

## Verifying

Per route, in the browser console, measure:

- WCAG AA contrast with **full alpha compositing** — every translucent
  ancestor background, plus any absolutely positioned element that is an
  *earlier sibling* of the text's branch and geometrically covers it
- adjacent same-surface sections (must be 0)
- distinct surfaces used (must be ≥ 4)
- longest run of consecutive light sections (must be ≤ 3)

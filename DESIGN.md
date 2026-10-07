# Design system — a controlled, limited visual language

Reference: **amplemarket.com**. The rule that matters most:

> Colour lives in artwork, product mocks and charts. **Not in section
> backgrounds.**

## What went wrong twice, so it doesn't go wrong again

**First mistake — everything white.** `white`, `paper` and `linen` sat within
1.08:1 of each other, so the page read as one sheet. True, but it was only
half the diagnosis.

**Second mistake — fixing that with colour.** Pages ended up with seven section
grounds (mist, stone, clay, white, espresso, amber, pastel panels), four or
five dark bands, and a different colour treatment per page. That reads
inconsistent and cheap, not premium.

**The actual diagnosis:** a section feels like a document when it is *text on a
flat ground with no visual object in it*. The fix is a visual object — a card
grid, a chart, a mock, a diagram — not a coloured background.

## Section grounds — this is the whole list

| Token          | Use                                                          |
| -------------- | ------------------------------------------------------------ |
| `bg-mist`      | The default ground. Most sections.                           |
| `bg-white`     | Alternating sections, and **every card**.                    |
| `bg-stone`     | A quieter band. **At most one or two per page.**             |
| `bg-navy-dark` | Dark. **At most two per page**, plus the global CTA band.     |

That is four, and two of them are near-white. Nothing else is a section
ground — ever.

**Banned as section grounds:** `bg-clay`, `bg-espresso`, `bg-mark`, and every
pastel (`butter`, `mint`, `lilac`, `blush`, `sky`). They still exist as tokens
for artwork and small components.

## Where colour is allowed

- the hero fluid artifact
- charts, sparklines, diagrams and UI mocks
- the homepage proof bento tiles (the established brand bento)
- case-study cover tints and team photo tints
- small chips and the `.mark` highlighter sweep on a few words of running text
- a single accent button

Amber is the brand highlighter. It belongs on **words and small controls**, not
on a band 400px tall.

## Where depth comes from instead

Every section should contain something to look at. In priority order:

1. a visual object — chart, mock, diagram, card grid, image
2. white cards on the mist ground, with `border-line` and `shadow-lift`
3. type scale: a section's headline should be meaningfully larger than its body
4. generous, consistent vertical rhythm (`py-24 lg:py-32`)
5. hairline rules carrying layout instead of boxes
6. an overlapping composition where two sections interlock

`shadow-soft` / `shadow-lift` / `shadow-deep` are real and ink-tinted.

## Headings

**No forced line breaks.** Amplemarket has none, and a hard `<br/>` that reads
well at one width breaks awkwardly at every other width.

Headings wrap naturally and are balanced with `text-balance`
(`text-wrap: balance`), which evens the lines out automatically. Constrain the
measure with `max-w-*` instead of breaking by hand.

The second half of a two-part headline stays in the muted colour
(`text-navy-dark/65`) — that is the emphasis device, not a line break.

## Rules

1. Four section grounds, no more.
2. At most two dark sections per page, plus the global CTA band.
3. At most two `stone` bands per page.
4. No pastel or amber section grounds.
5. Every section contains a visual object or card structure.
6. No `<br/>` inside a heading.
7. Zero WCAG AA contrast failures, measured with full alpha compositing, and
   with gradient scrims treated as unmeasurable rather than failed.

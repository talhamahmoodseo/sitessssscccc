# Brand system

One identity for the whole site. If something needs decorating, it uses a
primitive from here — it does not invent a wash, tint or heading style.

---

## The audit that produced this

Rated 3/10 on branding. Three faults, all structural rather than cosmetic:

1. **Pastels were decorative, not systematic.** `bg-butter` appeared six
   different ways: a hero glow blob, a card tint square, a "Your part" chip,
   and loose decorative blobs on About, Pricing and Services. One colour, six
   unrelated meanings. That is what read as *"the yellowish section does not
   look consistent"* — it was correct, and it was everywhere.
2. **No accent existed.** `blue-accent` resolved to near-black, so the site had
   no chromatic hierarchy at all. Everything was ink on paper.
3. **Brand assets sat unused.** 11 hand-drawn LineArt figures and the Caveat
   handwriting face were in the repo and barely on the page — exactly the
   devices that give the Amplemarket reference its warmth.

Amplemarket's discipline, measured from their live site: pastels appear in
**one** place (result tiles), the accent in **one** role, and elevation is a
hairline ring rather than a shadow. The restraint is the premium signal.

---

## Surfaces

Exactly four backgrounds. Nothing else.

| Token | Value | Use |
| --- | --- | --- |
| `bg-mist` | `#F7F6F4` | default section |
| `bg-white` | `#FFFFFF` | alternating section, cards |
| `bg-linen` | `#F0EFEC` | sunk panels, secondary cards |
| `bg-navy-dark` | `#0E0E0E` | proof strips, CTA bands, high-contrast breaks |

Sections alternate mist → white → mist, with an ink section every third or
fourth beat to break the rhythm. Verified: the homepage renders exactly four
distinct section backgrounds.

## Ink ramp

Four steps, no improvising. Anything below 70% fails AA on paper at body size —
measured, not assumed.

| Class | Use |
| --- | --- |
| `text-navy-dark` | headings, numbers, emphasis |
| `text-navy-dark/80` | lead paragraphs |
| `text-navy-dark/70` | body copy, captions, eyebrows, inactive states |
| `text-white/70` on ink | body copy inside dark sections |

**Never** use `/35`–`/65` for text. They land at 2.4–4.3:1 and read as faded.

## The tile palette

Five pastels. They exist for **stat tiles and persona illustrations only** —
never backgrounds, chips, blobs or borders.

`butter` · `mint` · `lilac` · `blush` · `sky`

Always carry near-black text. They are light; white text on them fails badly
(measured as low as 1.18:1 before this was fixed).

## Emphasis

One device sitewide: the highlighter.

- `.mark` — amber sweep under the words carrying the claim
- `.mark-dark` — solid amber block, for ink backgrounds
- `.mark-ink` — full-strength ink, no wash, when colour would be too much

## Type

Plus Jakarta Sans throughout.

| Role | Setting |
| --- | --- |
| Page H1 | `2.5rem → 3.5rem`, `leading-[1.03]`, `tracking-[-0.035em]`, 600 |
| Section H2 | `2rem → 2.6rem`, `leading-[1.06]`, `tracking-[-0.035em]`, 600 |
| Card H3 | `16.5px`, 600 |
| Body | `14–16.5px`, `leading-relaxed` |
| Eyebrow | `11px`, 600, `tracking-[0.18em]`, uppercase |
| Stat | `2.6rem`, 600, `tracking-[-0.035em]` |

Tight negative tracking on anything above 24px is what makes headings look
designed rather than typed.

---

## Branded primitives — `src/components/brand.tsx`

| Component | Job |
| --- | --- |
| `SectionTitle` | The one heading treatment. Eyebrow + H2 + optional sub. |
| `StatTile` | A result as number + client, on a tile pastel. |
| `QuoteTile` | A testimonial, sized to sit in the same grid. |
| `Annotation` | Handwritten margin note with a drawn arrow. **One per section, maximum.** |

`src/sections/ProofGrid.tsx` composes the first three into the bento proof grid.

### Proof strategy

Proof is interleaved, not quarantined in one testimonial section. Numbers and
voices alternate in the same grid so the section reads as a body of evidence.
Service pages carry their own proof strip near the top, before any claim.

---

## Rules

1. Colour appears in stat tiles, the highlighter, and nowhere else.
2. No decorative blobs or gradient washes. All `<Glow>` instances were removed.
3. One heading component. Do not hand-roll an `<h2>` with bespoke classes.
4. Text below 70% ink is a bug.
5. White text only on `bg-navy-dark` — never on a pastel.
6. Pricing lives on `/pricing`. Service pages link to it; they do not restate it.

## Verified

Homepage, after applying the system:

```
distinct section backgrounds : 4
stat tiles (all pastel usage): 11
WCAG AA failures             : 0
```

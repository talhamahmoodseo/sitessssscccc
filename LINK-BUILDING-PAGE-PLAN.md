# Link Building page — content and design plan

The plan for `/services/link-building`, written before the rebuild. Content and
design were planned together: every section below has one job, one message, and
one visual form chosen because it explains that message better than text alone.

References:

- **Story and copy quality:** dofollow.com/visibility-plus. What it does well
  (measured earlier in `SERVICE-PAGES-PLAN.md`): it names the reader's problem
  before selling anything, explains *why* the problem exists, gives the method a
  name, refuses to oversell, and answers real objections in the FAQ.
- **Visual quality:** amplemarket.com. Big, tight display type. A calm neutral
  base. Soft warm/cool gradient glows used behind product-style UI cards, never
  as section washes. Hairline borders. Every section uses a different layout,
  and motion explains something instead of decorating.

Neither site could be opened from the build environment (network policy), so the
references were worked from earlier teardown notes, not a fresh crawl.

---

## 1. The story

One idea carries the whole page:

> **Most backlinks look great in a report and do nothing in Google, because the
> metrics people buy on are easy to fake. We check what is behind the numbers,
> so the links we build actually move rankings.**

That is true of how Talha works (the three rejected sites came from his own
checks), it is specific, and it gives the reader a reason to pick us that is
not "trust us".

The arc:

1. **You want rankings.** Hero: outcome promise, and a live site check that
   shows the method in five seconds.
2. **You've been burned.** Problem: the report looked great, nothing moved.
3. **Here's why.** Insight: DR and traffic are easy to fake. Three real sites
   that looked fine and were not.
4. **Here's how we fix it.** Method: The 5-Point Site Check.
5. **Here's what you get.** Link types, shown in context, inside real articles.
6. **Here's how it runs.** First call to first links in about three weeks; your
   part is about 30 minutes a month.
7. **Here's proof.** One campaign in full, plus results and voices.
8. **Here's what you see every month.** The report.
9. **Is it for me?** Fit, pricing from $997, objections answered.
10. **Next step.** Send your URL.

Site selection is *done for the client*. Reviewing the shortlist is mentioned
once, as an option, in the FAQ — not a selling point.

---

## 2. Section by section

| # | Section | Job | Visual / interaction | Surface |
| --- | --- | --- | --- | --- |
| 1 | **Hero** | Match "link building services" intent in 3 seconds; show the differentiator | Animated **Site Check card** on a soft gradient glow: a domain is inspected, metrics fill in, keywords get flagged, verdict lands (pass / reject), then the next domain. Floating chips: "Indexed · day 9", rank "#14 → #4" | paper + glow |
| 2 | **Trust strip** | Credibility before any claim | Client wordmarks + platform ratings in one quiet row | paper |
| 3 | **Report vs reality** | Name the pain the reader already feels | **Toggle**: the same six links shown as "the report" (all green, DR 50+) and "the reality" (not indexed, spam keywords, no readers). Summary line changes with the toggle | white |
| 4 | **DR is easy to fake** | Explain *why* — the insight | Three **flip cards** with Talha's real rejections. Front: what the metrics said. Click: what we found | ink (dark) |
| 5 | **The 5-Point Site Check** | The named method | **Sticky scroll story**: left column holds an inspection panel that changes as each check scrolls past (traffic, keywords, graph, audience, link farm). Stacks inline on mobile | paper |
| — | Inline CTA | Catch the convinced reader early | Slim bar: free audit of your current backlinks | in section 5 |
| 6 | **Link types** | Remove ambiguity on deliverables | **Tabs** (Guest posts / Niche edits / Authority placements). Each tab shows a mock article with *your link* highlighted in context, plus best-for, typical DR, time to live | white |
| 7 | **How it works** | Reduce perceived effort | **Horizontal timeline** with a progress line that fills on scroll; each step shows what we do and what you do; ends with "your time: ~30 min a month" | paper |
| 8 | **Results** | Proof with numbers | Dark section. **Animated area chart** (clicks over 7 months) + stat tiles (pastel, the only place pastels appear) + testimonial with photo. CTA | ink |
| 9 | **The report** | Show transparency without making it a chore | **Live report mock**: rows flip from "Live" to "Indexed"; floating monthly summary card | white + glow |
| 10 | **Fit** | Build trust by excluding | Split panel: "Good fit" / "Not a fit", plus a white-label note for agencies | paper |
| 11 | **Pricing** | Pre-empt the #1 objection | One wide strip: "Plans start at $997/month", three plan chips, link to /pricing | white |
| 12 | **FAQ** | Close remaining doubt | Two columns: sticky heading + "still unsure?" card on the left, accordion on the right. `FAQPage` JSON-LD | paper |
| 13 | **Related** | Internal linking | Other services + the matching case study and vetting article | paper |
| 14 | **Final CTA** | Convert | Dark with glow. "Send us your URL." Booking + email. Replaces the generic site-wide band on this page | ink + glow |

No two neighbouring sections share a layout. Surfaces alternate so the page has
rhythm: paper → white → **ink** → paper → white → paper → **ink** → white →
paper → white → paper → **ink**.

## 3. CTA rhythm

Four, spaced so one is always within a screen of scroll:

1. Hero — *Book a strategy call* / *See starting prices*
2. After the 5-Point Site Check — *Get a free link audit*
3. Inside Results — *Book a strategy call*
4. Final — *Book a strategy call* / *Email us*

## 4. SEO

- `<h1>` carries "link building services" (as a small line above the headline).
- `<h2>`s use the phrases people search, said naturally: "why most backlinks
  don't move rankings", "how we vet every site", "types of backlinks we build",
  "how our link building process works", "link building results", "link
  building pricing", "link building FAQ".
- `Service` + `FAQPage` JSON-LD.
- Internal links: other three services, pricing, the matching case study, the
  site-vetting blog post.
- All charts and mockups are inline SVG/HTML: crawlable, fast, no images.
- Target ~2,000 words of real copy. No "what is link building" filler.

## 5. Design rules kept

- Plus Jakarta Sans, tight negative tracking on headings.
- Four surfaces only (paper, white, linen, ink).
- Colour lives in three places: glow behind product cards, pastel stat tiles,
  the amber highlighter. No red accent; rust only marks a rejection.
- Text never below 70% ink.
- Motion respects `prefers-reduced-motion`.

## 6. Placeholder content

Client names, figures, testimonials and the case study are realistic samples
for design review. Replace with verified material before launch. The three
rejected sites are real (anonymised).

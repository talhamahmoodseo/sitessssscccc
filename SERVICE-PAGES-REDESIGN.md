# Service pages redesign: Digital PR, Brand Mentions, HARO / Expert Quotes

Quality bar: the new Link Building page. Rule from the owner: same brand, but
each page gets its own story, layout and visual idea. Don't paste the Link
Building layout onto them.

---

## 1. Audit (what was there)

All three pages were built from the same template, then recoloured:

hero → dark strip → problem in two columns → "the craft" card → 3-step "how it
works" → reject cards → 5-step process → case panel → "What's included" grid →
"…not right for everyone" → "Straight answers" → other services → the shared
"Get ranked. Get cited." band.

What wasn't working, page by page and overall:

| Issue | Where | Why it hurts |
| --- | --- | --- |
| Same skeleton and the same headings ("What's included", "not right for everyone", "Straight answers") | All three | They read as one page with different colours. Nothing says "this is a different service". |
| The process is told twice | Brand Mentions (3-step "how it works" + 5-step funnel), HARO (4-step "workflow" + 5-step funnel), Digital PR (3 tabs + anatomy + 5 steps) | Pages run to 10,000–11,000px and repeat themselves. |
| Content lives in two places with different numbers | `shared.tsx` and `content/*.ts` (e.g. PR stats "12+ niches, 48h" vs "21 placements, 38%") | Mixed messages, and the richer copy (FAQ, fit) was half unused. |
| Every example was the same HVAC company in Fresno | PR pitch, Brand Mentions answer, HARO quote | Off-target: the buyers are SaaS, e-commerce and agencies. Also repetitive across pages. |
| Formal, slightly stiff copy ("precisely", "deservedly", "we would rather state it plainly") | Content files | Doesn't sound like the brand. |
| Weak or thin sections | PR "Three places we find the angle" (a tab that shows one sentence), PR stat tiles, HARO's coloured 4-step cards | Take space, add little. |
| Unsourced third-party stats | Brand Mentions ("85% of AI citations…") | A vendor's own claim with no link. Risky on a trust page. |
| Old blurred `Glow` blobs, small centred heroes | All three heroes | Below the Link Building hero in polish and hierarchy. |
| Quotes attached to the wrong client | HARO fintech case quoted a CapCut person; PR case quoted Ocuco | Breaks believability. |
| Generic closing band | All three | Same homepage CTA, nothing specific to the service. |

What was worth keeping: the honest positioning (no guarantees, scoped on
delivered work), the rejection examples, the "anatomy of a mention" idea, the
expertise profile, the case numbers, and most of the FAQ substance.

---

## 2. Each page's identity

| | Digital PR | Brand Mentions | HARO / Expert Quotes |
| --- | --- | --- | --- |
| Big idea | Stories, not press releases | AI repeats what others say about you | Be the expert who gets printed, not one of 300 replies |
| Visual language | Newsprint: clippings, mastheads in a serif, paper cards | AI interface: answer cards, cited sources, dot grids | Voice: big quote marks, journalist requests, deadline timers |
| Accent | Mint + butter on warm paper | Lilac + sky, cool glow | Blush + butter, one dark "filter" section |
| Hero layout | Centred headline over a wide "press table" of clippings | Text left, a live AI answer on a cool glow, with the sources behind it | Text left, a request → quote → published sequence |
| Signature interaction | Story Lab: pick raw material, watch it turn into an angle and a headline | Same question, six months apart (before/after toggle) | Same request, two replies (which one gets printed) |
| Running example | UK + Gulf home & lifestyle e-commerce brand (matches its case study) | B2B SaaS help desk tool (matches its case study) | Fintech founder (matches its case) |

Shared on purpose (utility, not identity): FAQ layout, the fit + price block,
related services, the dark closing section. Each one carries its own copy.

---

## 3. Digital PR (`/services/digital-pr`)

Story: what good PR is → why releases fail → where stories come from → where
they land → what one story keeps doing → proof → how it runs → fit + price →
questions → "tell us something boring".

1. **Hero.** "Stories editors want to run. / Coverage your buyers actually read."
   Three sample clippings laid on a table: a feature, an expert quote, a
   roundup, each with its masthead, headline, your highlighted mention and a
   link badge.
2. **Release vs story.** "A press release gets pickups. / A story gets coverage."
   Left: one release cloned onto a pile of syndication sites that fade out.
   Right: one feature that gets picked up. Plain numbers under each.
3. **Story Lab (interactive).** "Every business has a story. / Most never notice
   theirs." Three tabs (data you already have, a view your market disagrees
   with, news you didn't think was news). Each animates: your note → the angle
   → the headline that ran.
4. **Where coverage lands.** "Three kinds of publication. / Each does a different
   job." Business press, trade titles, roundups, with the job each does and a
   "what we skip" row. A dark Gulf media strip.
5. **One story, three returns.** Google (link), AI answers (mention), sales
   ("as seen in"), drawn as one clipping feeding three cards.
6. **Proof.** "One data study. / 21 placements in six months." Clippings dropping
   onto a six-month axis, with the referring-domains line.
7. **How it runs.** "We run the campaign. / You stay in the loop." Two lanes per
   step: what we do, what you do.
8. **Fit + price.** Full programme from $4,997/mo (Authority). Single campaigns
   quoted on a call.
9. **FAQ.** Eight questions, rewritten in plain language.
10. **Close.** "Tell us one boring thing / about your business."

## 4. Brand Mentions (`/services/brand-mentions`)

Story: the promise → how AI decides (with data) → before and after → what a
useful mention looks like → how we measure → the loop → proof → fit + price →
questions → free AI check.

1. **Hero.** "When buyers ask AI, / your name should come up." A live answer
   to "best help desk software for a small team?" types out, names the brand,
   and shows the sources behind it, two of them tagged "placed by us".
2. **How AI decides.** "AI doesn't take your word for it. / It checks what
   others say." Sources flowing into an answer (your own site is the thinnest
   line). Data card: Ahrefs' 75,000-brand study. Branded web mentions correlate
   0.664 with AI Overview visibility, backlinks 0.218. Source linked, caveat
   stated.
3. **Same question, six months apart.** Toggle month 0 / month 6: the same
   answer, before and after, with the sources that changed.
4. **Anatomy.** "Not a name-drop. / A sentence AI can repeat." An annotated
   sentence, plus three things that don't count (directories, pay-to-enter
   lists, dormant blogs).
5. **The report.** "AI has no Search Console. / So we built the report." A
   question × engine grid that fills in, plus share of answer against
   competitors.
6. **The loop.** "A monthly loop. / Not a one-off campaign." A circular
   five-step diagram: ask, find, place, align, re-check.
7. **Proof.** "Named in 0 of 42 answers. / Then 26." A 42-dot grid that fills
   month by month.
8. **Fit + price.** Included in Growth from $2,497/mo.
9. **FAQ.**
10. **Close.** "Find out what AI / says about you." Brand + category form for a
    free 10-question check.

## 5. HARO / Expert Quotes (`/services/haro-links`)

Story: the promise → what broke HARO and how we work instead → the craft →
the profile → the filter → your time → proof → fit + price → questions → call.

1. **Hero.** "Get quoted as the expert. / Skip the HARO lottery." A request with
   a countdown, the drafted quote (approved), then the published article.
2. **What happened to HARO.** "HARO didn't die. / It got crowded." A pile of
   300+ identical replies, then the two ways we work: our own publishing
   connections, and hand-picked requests.
3. **Same request, two replies.** "Same request. / Only one gets printed." A
   generic reply against ours, annotated.
4. **Expertise profile.** "We write down what you know. / Before we pitch
   anything." A profile doc with tabs for founder, head of product and CFO.
5. **The filter (dark).** "We say no a lot. / That's the service." Requests
   sorted live into answer or skip, each with a reason.
6. **Your time.** "One call to start. / Then a quick yes per quote." Our time
   against yours, step by step.
7. **Proof.** "Fewer replies. / More quotes in print." 214 squares: 180
   skipped, 34 answered, 11 published.
8. **Fit + price.** Included in Growth from $2,497/mo, scoped on delivered
   placements.
9. **FAQ.**
10. **Close.** "You know your field. / Let's get you quoted for it."

---

## 6. Notes

- All client names, clippings, outlets' headlines and numbers on these pages are
  samples for design review and are labelled as such where they appear. Swap in
  real coverage before launch.
- Prices match the pricing page (Growth $2,497, Authority $4,997).
- Third-party data: only the Ahrefs study, with its link
  (https://ahrefs.com/blog/ai-overview-brand-correlation/).

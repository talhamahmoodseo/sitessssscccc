# Project handoff

Read this before changing anything. It covers where the code came from, the
conventions that are not obvious from reading it, what is unfinished, and the
traps that will waste your time if you do not know about them.

---

## 1. What this is

Marketing website for **Talha Mahmood**, a link-building / digital-PR agency.
Positioning: editorial backlinks and brand mentions that move Google rankings
*and* get the client cited by AI answer engines (ChatGPT, Claude, AI Overviews).

It is a **static React SPA**. No backend, no CMS, no database. All content lives
in TypeScript files in `src/`. Lead capture goes to a Calendly embed in a modal.

**It is an agency site, not a SaaS product site.** This matters — see §6.

---

## 2. Where the code came from (important)

The original project files were lost. Only a deployed production build survived
(minified `app.js` + `app.css` + prerendered HTML).

The source in this repo was **reconstructed from that build**. The bundle
retained `code-path="src/components/Navigation.tsx:43:5"` attributes on every
element plus verbatim classNames and animation props, so the original file tree,
component boundaries and markup were recoverable exactly rather than guessed.

Reconstruction was verified against the original build:

- all 791 CSS classes the original stylesheet styled are present
- all 777 rendered text phrases accounted for
- DOM element counts per tag compared across all 20 routes — 19 matched exactly

**Consequence you will notice immediately:** files that were machine-recovered
still carry **single-letter local variable names** (`e`, `s`, `a`, `r`, `c`,
`u`, `d`, `h`) inside component bodies. Props and exports are properly named;
internals are not. This affects most of `src/pages/` and `src/sections/`.

Hand-written files are clean and idiomatic:
`components/MotionKit.tsx`, `Navigation.tsx`, `BookingModal.tsx`,
`LogoReveal.tsx`, `PlatformMarks.tsx`, `HeroAtmosphere.tsx`, `PlaneFlight.tsx`,
`CountUp.tsx`, `PageLayout.tsx`, `PageHero.tsx`, `LineArt.tsx`,
`ServicePage.tsx`, `pages/services/shared.tsx`, `pages/services/sections.tsx`,
`pages/services/LinkBuilding.tsx`, `pages/services/content/*`.

Renaming the machine-recovered internals is safe and welcome — just do it a file
at a time and check the page still renders.

---

## 3. Running it

```bash
npm install
```

```bash
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serves the built `dist/` on :4173 |
| `npm run build:wp` | Lints the theme PHP, builds with a relative base, assembles `wp-theme/talha-site.zip` |

Node 20+ recommended (developed on Node 22).

---

## 4. Project structure

```
src/
  App.tsx                routes, opening logo curtain, global booking modal
  main.tsx               entry; reads window.__TM_BASE_PATH__ for subfolder hosting
  index.css              design tokens, emphasis system, keyframes, utilities
  lib/
    booking.ts           Calendly config + the `open-booking` window event
    content.ts           CASE_STUDIES and BLOG_POSTS (shared across pages)
    clients.ts           real client names + the proof-grid tiles
    utils.ts             cn()
  components/
    MotionKit.tsx        Seo, ScrollToTop, ScrollProgress, SITE_NAME
    Navigation.tsx       fixed header, services dropdown, mobile sheet
    BookingModal.tsx     Calendly dialog, opens on the global event
    LogoReveal.tsx       1.8s opening curtain
    PlaneFlight.tsx      hero paper plane, scroll-driven along a sampled curve
    brand.tsx            SectionTitle, StatTile, QuoteTile, Annotation
    HeroAtmosphere.tsx   drifting colour blobs behind the hero
    LineArt.tsx          11 hand-drawn SVG figures
    PlatformMarks.tsx    Google / AI Overview / ChatGPT / Claude glyphs
    AgencyBlocks.tsx     timeline, principles, FaqList, Testimonial
    CountUp.tsx          scroll-triggered counter
    PageLayout.tsx       nav + body + CTA band + footer for inner pages
    PageHero.tsx         centred page header
    CTABand.tsx          closing call to action
    ui/                  button, accordion, dropdown-menu (shadcn-style)
  sections/              homepage, in render order:
                         Hero, ClientLogos, TheShift, Services, Results,
                         Personas, Process, VideoStories, ProofGrid,
                         FAQ, HomeContact, Footer
  pages/
    About, Services, ServicePage, CaseStudies, CaseStudy,
    Blog, BlogPost, Contact, Pricing
    services/
      shared.tsx         SERVICES content model + section primitives
      sections.tsx       long-form page building blocks (see §7)
      content/           per-page copy, separated from layout
      ServiceTemplate.tsx  the one shape all four service pages use
      LinkBuilding.tsx  DigitalPR.tsx  BrandMentions.tsx  HaroQuotes.tsx
                         thin wrappers: content + template
public/images/           22 photos used by case studies and testimonials
wordpress/               PHP templates for the WordPress theme build
scripts/                 theme build + PHP safety check
```

Routes are declared in `src/App.tsx`. `/services/:slug` resolves through
`pages/ServicePage.tsx`, which maps slug → page component.

---

## 5. Deployment

**Currently live:** `charming-fox-ed5fa9.netlify.app`

Important: that deployment was uploaded as a **pre-built bundle**, not built
from this repo. To deploy from source, connect this repository to Netlify —
`netlify.toml` already declares build `npm run build`, publish `dist`.

SPA routing needs a catch-all rewrite or deep links 404:

- Netlify — `netlify.toml` + `public/_redirects`
- Vercel — `vercel.json`
- Apache / LiteSpeed — `public/.htaccess` (ships into `dist/`)

**WordPress** is also supported, because the client's host (Hostinger) is
WordPress-oriented. `npm run build:wp` produces an installable theme at
`wp-theme/talha-site.zip`. See `HOSTING.md` for all three hosting routes and
their gotchas.

---

## 6. Design direction — read before restyling

The visual language is **editorial ink-on-paper**: warm off-white background,
near-black type, generous whitespace, pastel accents used only inside
illustrations. Typeface is **Plus Jakarta Sans**.

Two decisions were made by the client and should not be reversed without asking:

1. **No SaaS-product styling.** A redesign toward a modern-SaaS look (tighter
   grotesk display type, vermillion accent, product-style hero animation) was
   built and then **rejected** — it read as a software product rather than an
   agency. It was reverted. Do not reintroduce it.
2. **No red / warm accent colour.** The palette is deliberately monochrome.

**Emphasis system.** Earlier the site emphasised words by making them *lighter*
(35–50% ink over paper, ≈2.6:1) which read as faded. That was fixed sitewide:
emphasis spans are now 60–70% ink (4.85–7.05:1 measured), and the hero's
"YourBrand" highlight uses a real amber highlighter (`--mark`) rather than the
grey it previously resolved to. `index.css` provides `.mark`, `.mark-dark` and
`.mark-ink` for this. Keep using them rather than inventing new treatments.

### Colour token names lie

The Tailwind names are historical and do **not** describe their values:

| Tailwind name | Actual value |
| --- | --- |
| `navy-dark` | near-black `#0E0E0E` |
| `navy` / `navy-light` | slightly lifted blacks |
| `blue-accent` | also near-black — not blue |
| `mist` / `ivory` | warm paper `#F7F6F4` |
| `linen` / `cream` | slightly darker paper |
| `gold` | the amber highlight |

Real values live as RGB triples on `:root` in `src/index.css`. Change colours
there, not in the Tailwind config.

---

## 7. Service pages

`SERVICE-PAGES-PLAN.md` holds the full content strategy — search intent,
objections, trust signals, section list and CTA placement per page. It was
written from a teardown of dofollow.com (measured word counts and structure)
before any rebuilding. Follow it.

The shared architecture is implemented as components in
`src/pages/services/sections.tsx`:

`Section`, `ProofStrip`, `DeliverableGrid`, `LedgerPanel`, `ProcessTimeline`,
`WorkedExample` (inline SVG chart), `FitPanel`, `PricingContext`,
`ObjectionFaq` (emits `FAQPage` JSON-LD), `InlineCta`.

Page copy is separated from layout in `src/pages/services/content/`.

**Link Building is the flagship page and is built separately.** It was
redesigned from scratch (Oct 2026) with its own sections in
`src/pages/services/link-building/` and copy in `content/linkBuilding.ts`.
The story, section purposes and design rules are in
`LINK-BUILDING-PAGE-PLAN.md` — read it before changing that page. Its spine is
**The 5-Point Site Check**: every site checked by hand for real traffic, the
keywords behind it, a stable graph, the right audience, and link-farm signs.

Site approval by the client is **not** a selling point (owner's decision). We
pick the sites; reviewing the shortlist is offered once, in the FAQ. The older
"Open Ledger" framing below that idea has been retired.

---

## 8. Unfinished work

In rough priority order.

1. **Replace the placeholder client logos.** CapCut, Ocuco and Khaleej Times
   are real clients and are used as wordmarks in `lib/clients.ts`; the rest of
   the proof grid, testimonials and case-study figures are invented. The owner
   has said the site is not finished until the real client logos are in. Every
   name, figure and quote outside those three should be treated as dummy copy.
2. **Case-study word counts.** The three files run 440-530 words. They now
   carry everything the index promises (growth chart, indexation report,
   rejected domains, timeline), but the narrative sections — `situation`,
   `strategy`, `blockers` in `lib/content.ts` — are still short next to the
   ~1,000-word service pages. Content, not structure.
3. **Blog posts** run 300-480 words each. Same shape as above: the page
   template is fine, `BLOG_POSTS` bodies are short.
4. **Scroll-driven motion is unverified in this environment.** `PlaneFlight.tsx`
   was checked in the DOM only — the Browser pane does not composite, so the
   page cannot scroll and the flight could not be watched. Open the site in a
   real browser and confirm the plane tracks the curve and the contrail draws
   in behind it.
5. **Homepage sections** other than the hero still use the older spacing and
   card styles. Polish only; no redesign — the owner has rejected two homepage
   redesigns and asked for this direction to be kept.

### Design rules that are not negotiable

These came from the owner directly, after rejected attempts:

- **Every page has its own identity.** Do not add a shared page template and do
  not copy a section from one page onto another. Current signature shapes, one
  per page: homepage pastel bento (`ProofGrid`), service pages rejection
  filmstrip vs ledger and process rail vs funnel (`services/depth.tsx`),
  Case Studies numbered file index with sparklines, Pricing stacked allocation
  bar, About vertical DR-band columns + signed letter, Services hub two-way
  decision matrix, Contact horizontal numbered rail, Blog numbered reading
  paths.
- **`<Results />` is homepage-only.** It was previously rendered on
  `/case-studies` as well, which the owner called out directly.
- **No red accent.** Rejected twice. `--gap` is a rust used only for rejection
  markers, not an accent colour.
- **No build-notes in the markup.** Lines like "confirm these figures before
  launch" were rendering as body copy on live pages. All removed.
- **No standalone testimonial band immediately before a fit/FAQ section.** Fold
  the quote into the adjacent proof section instead.

### Audit the work before calling it done

`npm run build`, then in a browser console measure, per route: WCAG AA contrast
and adjacent same-surface sections. Contrast must be measured with **full alpha
compositing** — every translucent ancestor background, plus any absolutely
positioned element that is an *earlier sibling* of the text's branch and
geometrically covers it. Two earlier passes reported wrong numbers:
one composited a single layer and missed an overlay (hiding the unreadable blog
hero), another counted overlays that paint *after* the text (158 false
failures). Last verified state: **0 contrast failures, 0 broken images across
20 routes.**

## 9. Known issues and traps

- **`shadow-soft`, `shadow-deep`, `shadow-lift` are intentionally undefined.**
  They appear in markup but were never defined in the original Tailwind config,
  so they render as no-ops. They are left undefined so the build matches what
  was verified against the original. Defining them will change the look of many
  cards at once — fine, but do it deliberately.
- **Keep `lucide-react` on the 0.x line.** 1.x renames exports (`Linkedin` →
  `LinkedinIcon`) and changes some icon geometry. Pinned at 0.577.
- **`noImplicitAny` is `false`** in `tsconfig.json`, a concession to the
  reconstruction. `npm run build` does not typecheck (esbuild strips types), so
  run `npx tsc --noEmit` yourself. It is currently clean.
- **`app.js` / `app.css` filenames are not content-hashed** (preserved from the
  original build). Caching must revalidate or users get stale code after a
  deploy — `public/.htaccess` already handles this for Apache/LiteSpeed.
- **Never zip the WordPress theme with PowerShell `Compress-Archive`.** It
  writes backslash path separators, which the ZIP format disallows; WordPress
  then rejects the upload with *"the theme is missing the style.css
  stylesheet."* `npm run build:wp` builds the zip itself and verifies it.
- **A theme hook naming a function that does not exist will fatal the whole
  WordPress site.** `scripts/check-theme-php.mjs` fails the build on this; it
  exists because it happened once.
- **Bundle size** is ~800 kB (~240 kB gzipped) in one chunk. No route-level code
  splitting yet. Worth doing.

## 10. Placeholder content to replace before launch

- **Client proof** — `src/lib/clients.ts` holds the real client names (CapCut,
  Ocuco) with **indicative figures and invented quotes**. The names are real;
  the numbers and words are not yet signed off. The page carries a visible
  "figures indicative pending client sign-off" line — remove it once real.
- Real SVG logos — drop into `public/logos/` and swap the wordmarks in
  `sections/ClientLogos.tsx`
- Publication names — `PUBLICATIONS` in `components/AgencyBlocks.tsx`
- Testimonials elsewhere still render with a "placeholder" / "sample" suffix
- The three rejected-site examples in `content/linkBuilding.ts` are realistic
  but invented. Swap in real anonymised ones — that section is the strongest
  trust signal on the page and real data will land harder.
- Calendly handle — `lib/booking.ts` (`CALENDLY_URL`)
- Contact email — `pages/Contact.tsx`
- `YOURDOMAIN.com` entries in `public/sitemap.xml`

## 11. Other docs

| File | Contents |
| --- | --- |
| `README.md` | Quick start and stack |
| `BRAND.md` | **The visual identity. Read before any styling change.** |
| `SERVICE-PAGES-PLAN.md` | Content strategy for the service pages |
| `HOSTING.md` | Netlify / static / WordPress / Hostinger deployment |
| `REDESIGN.md` | The rejected SaaS-direction experiment, kept for context |

`REDESIGN.md` documents a direction that was **reverted**. Read it to know what
not to repeat.

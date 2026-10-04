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
`LogoReveal.tsx`, `PlatformMarks.tsx`, `HeroAtmosphere.tsx`, `RocketLaunch.tsx`,
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
    utils.ts             cn()
  components/
    MotionKit.tsx        Seo, ScrollToTop, ScrollProgress, SITE_NAME
    Navigation.tsx       fixed header, services dropdown, mobile sheet
    BookingModal.tsx     Calendly dialog, opens on the global event
    LogoReveal.tsx       1.8s opening curtain
    RocketLaunch.tsx     hero rocket (fly-in + idle float)
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
                         Personas, Process, VideoStories, Testimonials,
                         FAQ, HomeContact, Footer
  pages/
    About, Services, ServicePage, CaseStudies, CaseStudy,
    Blog, BlogPost, Contact, Pricing
    services/
      shared.tsx         SERVICES content model + section primitives
      sections.tsx       long-form page building blocks (see §7)
      content/           per-page copy, separated from layout
      LinkBuilding.tsx   rebuilt flagship page
      DigitalPR.tsx  BrandMentions.tsx  HaroQuotes.tsx   (not yet rebuilt)
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

**Link Building is the finished template.** Copy its shape for the others:

| | Before | After |
| --- | --- | --- |
| Words | 698 | 1,395 |
| FAQ | 0 | 8 + schema |
| CTAs | 1 | 4, spaced |
| Internal links | few | 8 |

The positioning spine is **"The Open Ledger"** — every domain disclosed and
approved before placement, and the rejections shown too. That is the real
differentiator versus competitors, who answer "can I see the sites?"
defensively. The name is a proposal and can be changed with a find-replace.

---

## 8. Unfinished work

In rough priority order.

1. **Three service pages still thin.** `DigitalPR.tsx`, `BrandMentions.tsx` and
   `HaroQuotes.tsx` are still the machine-recovered originals (~700 words, no
   FAQ, one CTA). Rebuild each using `sections.tsx` + a new file in `content/`,
   following `SERVICE-PAGES-PLAN.md` §4.2–4.4.
2. **Hero animation.** The client wants the rocket animation raised to the
   craft level of amplemarket.com's scroll-driven plane — smoother, ideally
   scroll-linked, more intentional. Not started. Improve `RocketLaunch.tsx`;
   do **not** replace the homepage design around it.
3. **Case study pages** → move to the 3-act format (goal / solution / result)
   with stat cards and a chart, like the `WorkedExample` component.
4. **About page** is thin — founder story, method, proof.
5. **Pricing** — clarify tiers against deliverables.
6. **Homepage sections** other than the hero still use the older spacing and
   card styles. Polish only; no redesign.

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

- Client logos — `CLIENT_LOGOS` in `sections/ClientLogos.tsx`
- Publication names — `PUBLICATIONS` in `components/AgencyBlocks.tsx`
- Testimonials — currently render with a "placeholder" / "sample" suffix
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
| `SERVICE-PAGES-PLAN.md` | Content strategy for the service pages |
| `HOSTING.md` | Netlify / static / WordPress / Hostinger deployment |
| `REDESIGN.md` | The rejected SaaS-direction experiment, kept for context |

`REDESIGN.md` documents a direction that was **reverted**. Read it to know what
not to repeat.

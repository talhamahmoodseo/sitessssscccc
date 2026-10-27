# Handoff — Editorial HQ website

Start here. This file is the entry point for any developer or AI agent taking
over the site. It tells you what exists, where everything lives, what the
owner wants, and what is still open.

## 1. What this is

Marketing website for **Editorial HQ** (editorialhq.com; called Outreachr until round 6), a link building and digital PR agency
(founder: Talha Mahmood, Faisalabad, Pakistan). Services: Link Building,
Digital PR, Brand Mentions for AI search, HARO & Expert Quotes.

- React 19 + Vite 6 + TypeScript + Tailwind 3 + Motion (Framer Motion v12)
- Static SPA, no backend, no CMS. All copy lives in TypeScript files.
- Also ships as an installable **WordPress theme** (owner hosts on Hostinger).
- Design quality reference: **amplemarket.com** (quality bar only — content
  and layout must stay original).

## 2. See it without running anything

| Where | What |
| --- | --- |
| `docs/screenshots/desktop/` | Full-page screenshot of every page at 1440px |
| `docs/screenshots/mobile/` | Same pages at 390px |
| `docs/downloads/editorialhq-wordpress-theme.zip` | Ready-to-upload WordPress theme of the current build |

Pages: home, about, services, link-building, digital-pr, brand-mentions,
haro-expert-quotes, results (case studies), case-study, blog, contact,
pricing, plus the booking popup.

## 3. Run it

```bash
npm install
npm run dev        # localhost:5173
npm run build      # production build + prerender every page -> dist/
npm run preview    # serve dist/ on localhost:4173
npm run build:wp   # WordPress theme -> wp-theme/talha-site.zip (prerendered pages inside)
npx tsc --noEmit   # typecheck (no test suite, no linter configured)
```

The build prerenders pages with Playwright's Chromium. On a new machine run
`npx playwright install chromium` once (or set `CHROME_PATH`).

### How pages reach Google (read before changing routing or <head>)

- `scripts/prerender.mjs` crawls the built site from `/`, saves every page as
  HTML (plus `prerender/<page>.json` for WordPress), inlines critical CSS,
  and writes the sitemap. **A new page must be linked from somewhere** or the
  crawler won't find it.
- `src/components/Seo.tsx` owns every page's title, description, canonical,
  robots, social tags and JSON-LD. Use `<Seo …/>` on each page; never add
  these tags to `index.html` or the WordPress theme.
- `src/routes.tsx` code-splits pages; `main.tsx` preloads the current page
  before rendering so the prerendered HTML is replaced without a flash.
- The WordPress theme (`wordpress/functions.php`) serves the prerendered page
  for each URL with the right status, fills in the domain, and serves
  `/sitemap.xml` + `/robots.txt`. **Do not install Yoast/Rank Math.**
- Unknown URLs must stay real 404s (`NotFound` page, `noindex`).

## 4. Where things are

| Path | What |
| --- | --- |
| `src/App.tsx` | Routes + homepage section order |
| `src/sections/` | Homepage sections (Hero, TheShift, Services, Personas, Process, ProofGrid, Results, Testimonials, FAQ, HomeCTA, Footer…) |
| `src/pages/` | Other routes (About, Contact, Pricing, Blog, CaseStudies…) |
| `src/pages/services/` | The four service pages. Copy in `content/*.ts`, layout in per-service folders, shared kit in `kit.tsx` and `common.tsx` |
| `src/pages/about/content.ts` | All About page copy |
| `src/lib/cases.ts` | The three sample case studies |
| `src/lib/content.ts` | Blog posts and homepage results data |
| `src/lib/booking.ts` | Calendly URL (placeholder) + `openBooking()` |
| `src/components/` | Shared UI: Seo (all head tags), Logo, Navigation, BookingModal, PersonaFigures (sketch illustrations), Accent (heading colour), PlatformMarks (Google/ChatGPT/etc. icons) |
| `src/routes.tsx` | Code-split pages + preload before first render |
| `scripts/prerender.mjs` | Prerenders every page, critical CSS, sitemap |
| `src/index.css` | Colour tokens (RGB triples on `:root`) and the `.accent-ink` heading accent |
| `wordpress/` | WordPress theme source (PHP + style.css). `scripts/build-wp-theme.mjs` packages it |
| `public/` | Images, avatars, sitemap |

## 5. Rules the owner has set (do not break)

1. **Agency, not freelancer.** Never mention Upwork, Fiverr, Legiit, ComeUp or
   "Top Rated". No "the founder personally handles every call" framing.
2. **Human copy.** Short, plain, conversational. No AI filler: no tick rows
   like "No retainer, no lock-in", no "Straight answers", no "results-driven",
   no "here's the thing", no em-dash-heavy marketing voice.
3. **Agency look, not SaaS.** Ink on warm paper, Plus Jakarta Sans.
4. **Colour selectively.** One heading accent only: `<Accent>` (orange→violet,
   the hero smoke colours). One accent per heading at most. No new palette.
5. **Pricing:** do not change prices or the pricing page until the owner has
   agreed a strategy (see §7).
6. **Data claims must be verified** against the original source and linked.
7. Every sample (case studies, reviews, clippings) stays labelled as a sample
   until real data replaces it.

## 6. History

| Commit | Round |
| --- | --- |
| (round 8) | Real portfolio: 5 case studies (SmileTutor, Defender, Ocuco, CapCut, agency partner) on a new evidence-led template (`lib/cases.ts`, `pages/results/CaseParts.tsx`), client logos, all invented quotes/stats/reviews removed, volume claims removed, guarantees cut to money-back + link replacement, pricing $150 standard (3+) / $170 trial, Home Services industry page (`/industries/home-services`), gradient second line on every section heading (`Soft` in kit), new homepage process timeline, Clutch/Trustpilot badges wired but hidden (`lib/reviews.ts`), testimonial drafts in `TESTIMONIAL-DRAFTS.md` |
| (round 7) | Guarantees (money-back, lifetime link, no PBNs, white label) as a band on home + link building + pricing, with full terms on /pricing#guarantee-terms (`components/Guarantees.tsx`); pricing rebuilt per placement (trial $129, packs 5/10 links, price list by DR, 3-step ordering, contact form preselects the package via `?package=`); 8-Point → 7-Point Site Check (traffic check removed, no traffic claims); About rewritten around 10,000+ backlinks, global positioning (schema areaServed "Worldwide", Gulf-only copy generalised) |
| (round 6) | Rebrand Outreachr → Editorial HQ (domain editorialhq.com): logo wordmark, site name in titles/OG/schema, social image, contact@editorialhq.com everywhere, theme name |
| (round 5) | Campaign-view hero (rocket removed), Ahrefs/Semrush/Neil Patel data cards, 8-Point Site Check (relevance first) site-wide, real rejected sites (techbullion.com, dsnews.co.uk, entrepreneursbreak.com), pilot + new pricing ladder, Digital PR story rewrite, shorter About, services index removed, "sample" labels removed |
| (round 4) | Technical SEO: prerendering, per-page head tags, real 404s, sitemap/robots in the theme, smoke → image, code splitting, critical CSS |
| `708d997` | Round 3: Outreachr rebrand, hero WebGL smoke, Shift previews + sourced data, 4-service section, personas sketches, booking popup, About rewrite, Digital PR fan restored |
| `729d237` | Round 2: About, Results + 3 case studies, Contact, Blog, Pricing |
| `260577c` | Service pages redesign (Digital PR, Brand Mentions, Expert Quotes) |

Technical SEO: `TECHNICAL-SEO-AUDIT.md` (findings, what was fixed, before/after scores).
Competitor study: `USERP-COMPETITOR-ANALYSIS.md` (uSERP, Oct 2026: their offer, SEO, industry pages, proof, and our prioritised plan).
Detailed notes: `ROUND-3-NOTES.md`, `PAGES-REDESIGN-2.md`,
`SERVICE-PAGES-REDESIGN.md`, `HOMEPAGE-PLAN.md`, `BRAND.md`, `PROJECT.md`
(conventions and traps), `HOSTING.md` (deployment).

## 7. Open work (owner's list, not done yet)

- **Pricing (round 8, owner-set):** standard placement $150 on orders of 3+,
  trial placement $170 once per company (deliberately above standard),
  20+ links a month / DR 70+ quoted. The round 7 notes below are superseded.
- **Pricing** (round 7, owner-approved basis of ~$150/link): Trial $129 (1× DR 40+,
  one per new client) · Starter $695 (5× DR 40+) · Growth $1,290 (10× DR 40+) ·
  Authority $2,190 (10× DR 50+) · singles DR 30+ $110, 40+ $150, 50+ $240,
  60+ $349, 70+ from $499. FatJoe blogger outreach in USD (checked Oct 2026):
  DR 30+ $137, 40+ $247, 50+ $384, 60+ $521, so we sit 20–40% below at every tier.
  Single placements show as a FatJoe-style card grid with a "What every link
  includes" panel and a bulk-buyer bar; order buttons pass `?package=dr40` etc.
  Confirm margins per DR band. Prices live in `src/pages/Pricing.tsx`,
  `content/linkBuilding.ts` (strip + FAQ), `sections/FAQ.tsx`, `pages/Contact.tsx`.
- **Guarantee terms need the owner's sign-off** — `src/components/Guarantees.tsx`
  states: 30-day refund window, "indexed within 30 days" as part of the order
  spec, link replacement on same-or-higher DR with no time limit (check in
  2 business days, replace within 30 days). Since round 8 only these two
  guarantees are shown. Edit there if any differ from practice.
- Owner says many more fixes are still needed across the site; compare each
  page against Amplemarket's quality and the screenshots in `docs/`.

## 8. Placeholders to replace before launch

Round 8 removed every invented testimonial, review, client figure and proof
tile. What remains to finish:

- **Testimonials:** drafts in `TESTIMONIAL-DRAFTS.md`. A quote only appears on
  the site once the client approves it and `testimonial.approved` is set to
  `true` in `src/lib/cases.ts`. Only Defender's genuine feedback is live.
- **Review badges:** fill `url`, `rating` and `count` in `src/lib/reviews.ts`
  for Clutch and Trustpilot. Badges stay hidden until all three are set.
- **Case study details still needed from the owner:** engagement dates and
  link counts per client, sample live URLs (CapCut, Defender, more for
  Ocuco), the Defender product and contact name, the agency partner's name,
  and permission to publish names, photos and numbers. CryptoDesk is left out
  on purpose (company closed).
- Calendly URL in `src/lib/booking.ts` (booking popup shows a loading state).
- Mailbox `contact@editorialhq.com` must exist in Hostinger (Emails).
- The Digital PR page's running example (UAE delivery study) and the blog
  post on Gulf media are illustrations/articles, not client claims.

## 9. Gotchas

- Motion components override Tailwind `transform` classes — pass rotate/scale
  through motion props or wrap the element.
- Tailwind opacity steps: only defaults (`/5`, `/10`…); others need brackets
  (`/[0.12]`).
- `.accent-ink` text is transparent with a gradient clip, so contrast checkers
  report it as 1:1 — false positive.
- The homepage hero panel is `src/sections/CampaignView.tsx` (placements going
  live, what they moved, the month in numbers). The rocket and smoke were
  removed at the owner's request.
- `/services` (the old services index) was removed on purpose and 301s to
  `/#services` (React route, WordPress theme, `.htaccess`). Nav says "Solutions".
- Code that must behave differently in the prerender can check
  `window.__PRERENDER__` (the About manifesto does).

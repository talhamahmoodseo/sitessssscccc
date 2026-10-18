# Handoff — Outreachr website

Start here. This file is the entry point for any developer or AI agent taking
over the site. It tells you what exists, where everything lives, what the
owner wants, and what is still open.

## 1. What this is

Marketing website for **Outreachr**, a link building and digital PR agency
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
| `docs/downloads/outreachr-wordpress-theme.zip` | Ready-to-upload WordPress theme of the current build |

Pages: home, about, services, link-building, digital-pr, brand-mentions,
haro-expert-quotes, results (case studies), case-study, blog, contact,
pricing, plus the booking popup.

## 3. Run it

```bash
npm install
npm run dev        # localhost:5173
npm run build      # production build -> dist/
npm run preview    # serve dist/ on localhost:4173
npm run build:wp   # WordPress theme -> wp-theme/talha-site.zip (run `npm run build` after)
npx tsc --noEmit   # typecheck (no test suite, no linter configured)
```

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
| `src/components/` | Shared UI: Logo, Navigation, BookingModal, SmokePlume (hero WebGL smoke), Rocket, PersonaFigures (sketch illustrations), Accent (heading colour), PlatformMarks (Google/ChatGPT/etc. icons) |
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
| `708d997` | Round 3: Outreachr rebrand, hero WebGL smoke, Shift previews + sourced data, 4-service section, personas sketches, booking popup, About rewrite, Digital PR fan restored |
| `729d237` | Round 2: About, Results + 3 case studies, Contact, Blog, Pricing |
| `260577c` | Service pages redesign (Digital PR, Brand Mentions, Expert Quotes) |

Technical SEO: `TECHNICAL-SEO-AUDIT.md` (findings + plan, not yet implemented).
Detailed notes: `ROUND-3-NOTES.md`, `PAGES-REDESIGN-2.md`,
`SERVICE-PAGES-REDESIGN.md`, `HOMEPAGE-PLAN.md`, `BRAND.md`, `PROJECT.md`
(conventions and traps), `HOSTING.md` (deployment).

## 7. Open work (owner's list, not done yet)

- **Pricing strategy** — owner wants a lower-risk entry (pilot order around
  $100–150 was floated), exact placement counts instead of ranges, and a
  decision on public vs "from" prices. Current site: Starter $997 / Growth
  $2,497 / Authority $4,997. Undecided.
- **Hero demo** (`src/sections/Hero.tsx`, `SearchTheatre`) — weak: HVAC/Fresno
  example, tiny labels. Proposed replacement: a "campaign view" product panel
  showing placements going live and what they moved. Not approved yet.
- Owner says many more fixes are still needed across the site; compare each
  page against Amplemarket's quality and the screenshots in `docs/`.

## 8. Placeholders to replace before launch

- Calendly URL in `src/lib/booking.ts` (booking popup shows a loading state).
- Email `contact@talhamahmood.com` (used in Contact, common.tsx, Footer,
  HomeCTA, FAQ, Hero, BookingModal) and the site URL in `index.html` JSON-LD.
- Case studies, reviews, press clippings, client figures: samples.
- `YOURDOMAIN.com` in `public/sitemap.xml`.

## 9. Gotchas

- Motion components override Tailwind `transform` classes — pass rotate/scale
  through motion props or wrap the element.
- Tailwind opacity steps: only defaults (`/5`, `/10`…); others need brackets
  (`/[0.12]`).
- `.accent-ink` text is transparent with a gradient clip, so contrast checkers
  report it as 1:1 — false positive.
- The intro curtain (`LogoReveal`) plays once per browser session.
- The smoke plume needs WebGL; without it the hero falls back to grain blobs.

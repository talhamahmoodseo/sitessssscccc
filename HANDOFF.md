# Handoff — Editorial HQ website

Start here. This file is the entry point for any developer or AI agent taking
over the site. It tells you what exists, where everything lives, what the
owner wants, and what is still open.

## 1. What this is

Marketing website for **Editorial HQ** (editorialhq.com; called Outreachr until round 6), a link building and digital PR agency
(founder: Talha Mahmood, Faisalabad, Pakistan). Services: Link Building,
Digital PR, Brand Mentions for AI search, HARO & Expert Quotes.

- React 19 + Vite 6 + TypeScript + Tailwind 3 + Motion (Framer Motion v12)
- Static SPA, no CMS. All copy lives in TypeScript files. The only server
  code is in the WordPress theme: the contact form endpoint and a few
  settings (§3, "Round 10").
- Also ships as an installable **WordPress theme** (owner hosts on Hostinger).
- Design quality reference: **amplemarket.com** (quality bar only — content
  and layout must stay original).

## 2. See it without running anything

| Where | What |
| --- | --- |
| `docs/screenshots/desktop/` | Full-page screenshot of every page at 1440px |
| `docs/screenshots/mobile/` | Same pages at 390px |
| `docs/downloads/editorialhq-wordpress-theme.zip` | Ready-to-upload WordPress theme of the current build |

Pages: home, about, link-building, digital-pr, brand-mentions,
haro-expert-quotes, results (case studies), case-study (SmileTutor),
home-services, blog, contact, pricing, pilot, privacy, terms, plus the booking popup.

## 3. Run it

```bash
npm install
npm run dev        # localhost:5173
npm run build      # production build + prerender every page -> dist/
npm run preview    # serve dist/ on localhost:4173 (careful: it answers every URL
                   # with the HOMEPAGE html, so it can't test other pages'
                   # prerendered HTML; use any static server that serves
                   # <path>/index.html, or the WordPress theme)
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
- `src/routes.tsx` code-splits pages; `main.tsx` preloads the current page,
  then **hydrates** the prerendered HTML (`hydrateRoot`) instead of replacing
  it. Replacing it made the browser count the hero as painted twice (mobile
  LCP 2.8 s in the lab; 0.3–0.5 s with hydration). If a page renders
  differently in the browser, React silently falls back to a fresh render,
  so a mismatch costs speed, not correctness.
- **Performance (round 11), keep these when you change the homepage:**
  - Hydration runs inside `startTransition` (`main.tsx`) so it's sliced
    into short tasks; `<Hydrated>` turns entrance animations back on after
    it commits.
  - Homepage sections below the hero have `content-visibility: auto`
    (`cv()` in `pages/Home.tsx`) with measured phone/desktop heights. If a
    section's height changes a lot, re-measure it. The process section is
    left out on purpose (its height follows the screen). Before any anchor
    jump, `ScrollToTop` adds `.cv-off` so the jump lands exactly.
  - Never animate `height: "auto"` or mix units (0 → "62%") on anything that
    changes while scrolling: motion then measures the page and calls
    `window.scrollTo`, which cancels smooth scrolling and forces reflows.
    Use transform (scale), or the CSS grid-rows trick as in `Process.tsx`.
  - Loops that run forever (colour blobs, review columns, the logo strip,
    the hero's travelling link tiles and tab timer) are CSS animations of
    transform/opacity (`ehq-*` in `index.css`), never motion animations, so
    they cost nothing on the main thread. The hero's loops pause together
    through the `ehq-paused` class (hover, focus, off screen).
  - The review wall renders each quote once in the HTML and builds its
    looping columns after load; loop copies are `inert` and `aria-hidden`.
  - Images: size them to about 3× their display size at most.
- **Keep pages hydratable.** The first render in the browser must match the
  prerendered HTML: don't read the URL, storage, screen size or the clock
  during render (do it in `useEffect`, as `Contact.tsx` does for
  `?package=`). The prerender helps: it stops `setInterval` and any
  `setTimeout` of 1 s or more (demo cycles stay on step one), scrolls back
  to the top before saving, and separates adjacent text nodes with `<!-- -->`
  the way React's server renderer does. Counters render their final number
  first, then reset to 0 (`CountUp.tsx`). To check a page, set
  `window.__TM_DEBUG_HYDRATION__ = true` before load: mismatches are logged
  as `hydration:` warnings.
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
| `src/lib/cases.ts` | The six client case studies (SmileTutor, CryptoDesk, Ocuco, CapCut, Defender, agency partner). Report sections in `pages/results/CaseSections.tsx`, charts in `charts.tsx`, shared cards in `CaseParts.tsx`. Every number's source: `CASE-STUDY-DRAFTS.md` |
| `src/lib/clients.ts` | Client logos (homepage strip) and the "see the numbers" proof tiles |
| `src/lib/stories.ts` | The homepage hero's five client stories (round 13): quotes, facts and evidence, all taken from `cases.ts` or copied word for word from the evidence screenshots |
| `src/components/proof.tsx` | Shared proof kit: `SiteShot` (a client's homepage in a browser frame), `Avatar`, `ProofChip` (Google result, AI Overview, press, lists) and `ResultCard` (case card used on /case-studies and /pilot) |
| `src/pages/Pilot.tsx` | /pilot: the free 3-link pilot, by application (round 14). The form posts to the contact endpoint as "Free pilot application". Page is `noindex` on purpose |
| `src/lib/pilot.ts` | **The free pilot's numbers**: links (3), spots a month (3), revenue and employee thresholds, the value shown ($570) |
| `src/components/PilotBar.tsx` | The "Get 3 editorial backlinks free" bar on every page (Navigation places it, folds it on scroll, hides it on /pilot; closing it hides it for the visit) |
| `src/lib/pricing.ts` | **All prices.** Pricing page, contact form, link building page, FAQs and About read from here |
| `src/lib/reviews.ts` | Clutch / Trustpilot badges, hidden until the real profiles exist (§8) |
| `src/lib/content.ts` | Blog posts |
| `src/lib/booking.ts` | Calendly URL (calendly.com/talhaseoexpert/30min) + `openBooking()` + `contactLink()` for the quick forms |
| `src/lib/analytics.ts` | GA4 + Consent Mode v2, `track()`, first-visit source for the contact form. Banner: `components/ConsentBanner.tsx` |
| `src/pages/legal/` | Privacy policy and terms of service |
| `src/components/` | Shared UI: Seo (all head tags), Logo (Link E mark + outlined wordmark; source files in `docs/branding/`), Navigation, BookingModal, PersonaFigures (sketch illustrations), Accent (heading colour), PlatformMarks (Google/ChatGPT/etc. icons) |
| `src/routes.tsx` | Code-split pages + preload before first render |
| `scripts/prerender.mjs` | Prerenders every page, critical CSS, sitemap |
| `src/index.css` | Colour tokens (RGB triples on `:root`) and the `.accent-ink` heading accent |
| `wordpress/` | WordPress theme source (PHP + style.css). `scripts/build-wp-theme.mjs` packages it. `functions.php` also holds the contact endpoint, the Enquiries list, the GA4 and inbox settings, redirects and the security switches |
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
5. **Pricing:** never change a price without the owner's approval. Prices
   live only in `src/lib/pricing.ts` (see §7).
6. **Data claims must be verified** against the original source and linked.
7. **Restore, don't remove.** The owner was clear in round 9: never delete a
   section they liked. Improve it, and ask before removing anything.
8. "No PBNs" and "white-hat" belong in the guarantee band and terms only. The
   small hero chips show just money-back and link replacement.
9. Home Services lives in the footer only, not the header menu.

## 6. History

| Commit | Round |
| --- | --- |
| (round 14) | **Free 3-link pilot, like uSERP's** (the owner's correction: not the paid trial). A bar on every page (`components/PilotBar.tsx`: "Get 3 editorial backlinks free. No catch, no contract." → /pilot?ref=bar), with a spacer so no hero sits under it; it folds on scroll and can be closed. /pilot rebuilt on uSERP's structure: offer + application form, why it's free, usual way vs pilot, 4 steps, what you get with an illustrative example and the value ($570 → $0), what 3 links won't do, who qualifies (published criteria), case results, FAQ, apply. The application posts to the contact endpoint ("Free pilot application"); `noindex`. The $200 link is called "trial" again on pricing and the contact form; case studies CTAs point to the free pilot; the homepage's "Trusted by…" line is back |
| (round 13) | Results-first pages, after Amplemarket and uSERP (plan: `PLAN-ROUND-13.md`). **Homepage hero:** `ResultStage` replaces `SearchStory`: one client at a time, set like a post (their approved words, their homepage with the result pinned on it, three figures), two pieces of evidence beside it (Google #1, AI Overview, press, the placement), link tiles flying in, the client's colour behind, five tabs that cycle. Subline rewritten, plus a link to the pilot. **Pricing:** Amplemarket order: short ✓/✗ package cards with a pilot bar, the logos and one big quote on the dark stage, a line-by-line comparison (first column pinned on phones), guarantee band, the results bento and review wall from the homepage, full guarantee terms (`#guarantee-terms` kept), other services, FAQ. "Three steps", "the terms in plain words" and "five things move a custom quote" now live in the FAQ. The nav is white on the dark stage (`navOnDark`; it was invisible before). **Case studies:** results-at-a-glance hero, logo strip, SmileTutor featured, service filters and `ResultCard`s with each client's homepage, a pilot card, the review wall, then the totals, what we count / leave out and the eight parts. **Pilot (/pilot, new):** the existing $200 trial link presented as a pilot, after uSERP's /pilot structure (start form → contact with `?package=trial`). Linked from the hero, pricing, case studies and the footer. The contact form's package label reads "Pilot: one trial link ($200)" |
| (round 12) | New logo, the "Link E" (Direction B in `docs/branding/`): a bold E with an orange-to-violet chain link hooked through it, wordmark "Editorial HQ" in Outfit Bold converted to outlines (no font loaded). `components/Logo.tsx` draws both from fixed paths; masks use `useId` so several logos can share a page. New favicon (svg, 32px, apple-touch), schema logo `public/images/logo.png`, and the logo in `og-default.jpg`. Brand kit (logo files, avatars, LinkedIn/X banners, post template) in `docs/branding/kit/`; competitor visual analysis, direction boards and the business profiles playbook (`docs/business-profiles-guide.md`) sit beside it |
| (round 11) | New homepage hero (`sections/SearchStory.tsx`, replaces `CampaignView`): one Google results page for one search; three editorial links go live, the client's result climbs #4 → #1, then the AI Overview names it. Plays once when the results come into view, with captions and a Replay button. SmileTutor chart redrawn from zero (`GrowthChart` in `pages/results/charts.tsx`): Oct 2024 14.3K vs Oct 2026 38.5K, then every month of both years. "Results our clients take to their boards" (`ProofGrid`) is two stats per row on phones (3,412 → 1,624 px). Speed: hydration in a transition, homepage sections skipped until near the screen, review wall rendered once, colour blobs and review columns as CSS animations, process steps open with CSS instead of `height: auto`, oversized logos resized, theme `.htaccess` for long cache lifetimes, Hostinger Reach script removed, font preloads. See §3 "Performance" |
| (round 10) | Go-live fixes from the SEO plan's step 0. Testimonials approved by the clients and case study figures approved by the owner. Booking goes to calendly.com/talhaseoexpert/30min ("30-minute call" site-wide). Placeholder Clutch/Trustpilot badges hidden. Real contact form: posts to `/wp-json/editorialhq/v1/contact`, emails the inbox set in Settings > General and keeps a copy under Enquiries in wp-admin (honeypot, 5 an hour per IP); the homepage and brand mentions quick forms now open it prefilled. GA4 via a Settings > General field, Consent Mode v2 banner for UK/Europe, events `generate_lead` (form sent, call booked) and `book_call` (booking opened). Theme: 301s for the three round 6 sample case studies and www → bare domain, feeds and trackbacks 404, `/wp/v2/users` hidden from visitors, XML-RPC off. Privacy and Terms pages, linked in the footer. Hydration instead of re-rendering (see §3). Titles under 60 and descriptions under 160 characters on every page |
| (round 9) | Restored what round 8 removed, at a higher standard: the case study report layout (numbered sections, contents rail, charts, link-building activity, results, outcomes) with six real clients incl. CryptoDesk; homepage featured review (Rum Tan), case-study rows, "see the numbers" bento and the review wall with Clutch/Trustpilot badges; the pinned scroll-through process with realistic product screens per step (`sections/Process.tsx`); the four-promise guarantee band; the full pricing page (trial $200, Starter/Growth/Authority at $190 a link, Custom, comparison table). Home Services rewritten long-form and taken out of the header. Plan: `PLAN-ROUND-9.md` |
| (round 8) | Real portfolio: 5 case studies (SmileTutor, Defender, Ocuco, CapCut, agency partner) on a new evidence-led template (`lib/cases.ts`, `pages/results/CaseParts.tsx`), client logos, all invented quotes/stats/reviews removed, volume claims removed, guarantees cut to money-back + link replacement, pricing $150 standard (3+) / $170 trial, Home Services industry page (`/industries/home-services`), gradient second line on every section heading (`Soft` in kit), new homepage process timeline, Clutch/Trustpilot badges wired but hidden (`lib/reviews.ts`), testimonial drafts in `TESTIMONIAL-DRAFTS.md` |
| (round 7) | Guarantees (money-back, lifetime link, no PBNs, white label) as a band on home + link building + pricing, with full terms on /pricing#guarantee-terms (`components/Guarantees.tsx`); pricing rebuilt per placement (trial $129, packs 5/10 links, price list by DR, 3-step ordering, contact form preselects the package via `?package=`); 8-Point → 7-Point Site Check (traffic check removed, no traffic claims); About rewritten around 10,000+ backlinks, global positioning (schema areaServed "Worldwide", Gulf-only copy generalised) |
| (round 6) | Rebrand Outreachr → Editorial HQ (domain editorialhq.com): logo wordmark, site name in titles/OG/schema, social image, team@editorialhq.com everywhere, theme name |
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

- **Free pilot thresholds (round 14), to confirm with the owner:** $5M+ annual revenue, 25+ employees, 3 businesses a month, agencies not eligible (they can buy the $200 trial link instead). uSERP uses $10M+ and 50+. All in `src/lib/pilot.ts`.
- **Pricing (round 9, owner-set):** $190 a placement; trial $200, one per
  company; Starter 3 links ($570, avg 5,000+ visits/site), Growth 5 links
  ($950, 10,000+), Authority 10 links ($1,900, 50,000+); Custom quoted.
  Packages can be ordered once or monthly, no setup fee, no contract, DR 40+
  in every package. **To confirm with the owner:** that bigger packages keep
  $190 a link even with higher-traffic sites, that "order once or monthly"
  is right, and that DR 40+ applies to all three. All in `src/lib/pricing.ts`.
  The round 8 and round 7 notes below are superseded.
- **Pricing** (round 7, superseded): Trial $129 (1× DR 40+,
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
  2 business days, replace within 30 days), plus no PBNs / white-hat only
  (refund any placement found on a PBN) and white label. Edit there if any
  differ from practice.
- Owner says many more fixes are still needed across the site; compare each
  page against Amplemarket's quality and the screenshots in `docs/`.

## 8. Before and after launch

Done in round 10 (27 Oct 2026): testimonials approved by the clients,
case study figures approved by the owner, Calendly link set, placeholder
review badges hidden.

**Owner, in WordPress after uploading the theme:**

- Settings > General > **GA4 Measurement ID**: paste the G-… ID. Until it's
  there, no analytics load. Then in GA4, mark `generate_lead` and `book_call`
  as key events.
- Settings > General > **Contact form sends to**: leave empty for
  team@editorialhq.com, which must exist in Hostinger (Emails). Install WP
  Mail SMTP so the emails arrive. Every enquiry is also kept under
  **Enquiries** in the dashboard.
- Send a test enquiry from /contact and check it arrives.

**Still open:**

- **Review badges:** `src/lib/reviews.ts` holds design-preview numbers and
  is switched off. When the Clutch or Trustpilot profile has real reviews,
  paste its URL, rating and count exactly as shown there.
- **Privacy policy:** says enquiries that don't become work are kept "up to
  2 years". That's a proposed policy: the owner should confirm it. Both legal
  pages are plain-English drafts, not legal advice; worth a lawyer's read.
- Defender: product name and contact name; CapCut: Julia's job title; the
  agency partner's name (or permission to stay anonymous).
- The Digital PR page's running example (UAE delivery study) and the blog
  post on Gulf media are illustrations/articles, not client claims. The SEO
  plan suggests retiring the Gulf post with a 301 to /services/digital-pr.

## 9. Gotchas

- Motion components override Tailwind `transform` classes — pass rotate/scale
  through motion props or wrap the element.
- Tailwind opacity steps: only defaults (`/5`, `/10`…); others need brackets
  (`/[0.12]`).
- `.accent-ink` text is transparent with a gradient clip, so contrast checkers
  report it as 1:1 — false positive.
- The homepage hero panel is `src/sections/ResultStage.tsx` (round 13). It
  replaced `SearchStory` (round 11), whose made-up CRM search the owner
  didn't like, and before it `CampaignView`. Everything on the stage is real
  client data (`lib/stories.ts`); keep it that way. It cycles through five
  clients on a CSS timer: the tab's progress bar ends, then `animationend`
  moves on. The first render is always SmileTutor and the prerender never
  advances, so hydration matches. The side chips and link lines only show
  from `xl` / `lg` up; the rocket and smoke were removed long ago.
- The pinned process (`sections/Process.tsx`) runs on a 340vh scroll track on
  desktop. The screens size to `calc(100vh - 380px)` so the section fits
  short laptop screens; check at 1440×800 after changing it.
- `/services` (the old services index) was removed on purpose and 301s to
  `/#services` (React route, WordPress theme, `.htaccess`). Nav says "Solutions".
- Code that must behave differently in the prerender can check
  `window.__PRERENDER__` (the About manifesto does).

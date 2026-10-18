# Technical SEO audit — Outreachr site

Audit date: 18 Oct 2026. Measured on the current build (commit `bca5c0a`),
served locally with `npm run preview`. **Nothing has been changed yet** — this is
the findings and the plan, waiting for the owner's go-ahead and the inputs in §6.

## 1. How the site is built (why it matters for SEO)

- React single-page app (Vite). The server sends the **same empty HTML shell**
  for every URL; all text, headings, links, titles and schema are created by
  JavaScript in the browser.
- Deployed either as a static site (Netlify/Vercel configs exist) or as a
  **WordPress theme** whose `index.php` outputs that same empty shell for every
  URL.
- Google can render JavaScript, but rendering is an extra step: it is slower,
  can fail, and only what is in the rendered page counts. Other search engines
  and most AI crawlers (ChatGPT, Perplexity, Claude) do **not** run JavaScript
  reliably — for an agency selling "get cited by AI", that is the bigger risk.

## 2. Measured results

Lighthouse 12, mobile emulation (slow 4G, mid-range phone):

| Page | Performance | SEO | Accessibility | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| Home (WebGL on, no GPU) | 33 | 92 | 91 | 5.3 s | 81 s | 0.02 |
| Home (WebGL off) | 60 | — | — | 4.0 s | 710 ms | — |
| Link Building | 61 | 92 | 100 | 4.0 s | 590 ms | 0 |
| About | 73 | 92 | 95 | 3.6 s | 280 ms | 0 |

Targets (Google, 75th percentile of real users): **LCP ≤ 2.5 s, INP ≤ 200 ms,
CLS ≤ 0.1**. Layout stability is already fine; loading speed and main-thread
work are not.

Crawl of all 20 routes (rendered with JavaScript):

- Every page has a unique title, meta description and one `<h1>` ✔
- **Every page declares `<link rel="canonical" href="/">`** ✘
- A made-up URL (`/this-page-does-not-exist`) returns **200 + the homepage** ✘
- Raw HTML of `/services/link-building` before JavaScript: **52 characters of text** ✘
- JS bundle: **1.03 MB (305 KB gzipped) in one file**, loaded for every page ✘

## 3. Findings, by priority

### P0 — blocks indexing or ranking

1. **Canonical points every page to the homepage.** `index.html` hard-codes
   `canonical="/"` and nothing updates it per page. Google may treat every
   service page, case study and blog post as a duplicate of the homepage and
   drop it from the index.
2. **Content only exists after JavaScript runs.** No text, links, titles or
   schema in the HTML the server sends. Fix: **prerender** every route to real
   HTML at build time (static site generation). The React app and every
   animation stay; the HTML just arrives filled in. This also fixes most of P1.
3. **Soft 404s.** Unknown URLs return 200 with the homepage (React `*` route,
   Netlify/Vercel rewrites, and `tm_spa_200()` in the WordPress theme). Google
   reports these as soft 404s and wastes crawl on them. Fix: real 404 page with
   a 404 status.
4. **WordPress theme serves an empty shell with WordPress's own title.** No
   per-page description, canonical or schema, and WordPress's built-in
   `wp-sitemap.xml` will not list the React pages. If an SEO plugin (Yoast /
   Rank Math) is active it will add conflicting tags. Needs a hosting decision
   (§5).
5. **Sitemap uses `YOURDOMAIN.com`** and has no `lastmod`; `robots.txt` does
   not point to it.

### P1 — Core Web Vitals and rendering

6. **Hero smoke (WebGL) on devices without a graphics chip.** On a normal
   phone/laptop GPU it is cheap. With software rendering (Lighthouse/PageSpeed
   lab machines, Googlebot, low-end phones) it runs on the CPU and blocks the
   page — that is the 81-second TBT. Fix, keeping the effect: detect software
   rendering and low-power devices and show one still frame; start the
   animation after the page has loaded; cap resolution and frame rate.
7. **Hero search demo re-renders React every animation frame** (`useElapsed` in
   `sections/Hero.tsx` calls `setState` in `requestAnimationFrame`). Constant
   main-thread work hurts INP (responsiveness). Fix: drive it with CSS/Motion
   values, or timers per step instead of per frame.
8. **Logo intro curtain hides the page for ~1.3 s** on the first visit, which
   delays the Largest Contentful Paint by that much. Fix: show the page
   underneath immediately, or drop the curtain.
9. **Render-blocking Google Font (Fraunces) that is not used anywhere.** Costs
   ~1.2 s on mobile. Fix: remove it.
10. **One 1 MB JavaScript file for every page.** Fix: split per route (lazy-load
    pages), and lazy-load heavy below-the-fold sections.
11. **Content that starts invisible.** Many sections animate in from
    `opacity: 0`. With prerendering, that hidden state would be baked into the
    HTML. Fix: prerendered HTML shows final content; animations only enhance it
    after load. Same visual result for visitors.
12. **Fonts:** Caveat (handwriting, ~100 KB across weights) and Newsreader are
    loaded globally; preload only the main text font, subset the others.

### P2 — technical hygiene

13. **Structured data:** Organization schema has the old site URL; no
    `WebSite`, `BreadcrumbList`, or proper `Article` (author, dates, image) on
    blog posts; `Service` schema per service page exists but needs checking in
    Google's Rich Results Test once the domain is live.
14. **Social / sharing tags:** no per-page Open Graph or Twitter tags, no
    `og:image`.
15. **Images:** some `<img>` tags lack `width`/`height`; no modern formats
    (WebP/AVIF); unused images in `public/images/`.
16. **Internal links:** the crawler found all 20 pages ✔, but some calls to action
    are buttons (`openBooking`) rather than links, which is fine for booking but
    service and case-study cross-links should stay real `<a href>`.
17. **Sample content is indexable:** case studies titled "Case study (sample)"
    and sample reviews. Decide: `noindex` until real, or replace before launch.
18. **Hosting headers:** HTTPS redirect, `www` vs non-`www`, trailing-slash
    consistency, compression (Brotli/gzip), long cache headers for `/assets/`.
    Can only be checked on the live domain.
19. **Accessibility items Lighthouse flagged** on the homepage (91): fixing
    them also helps mobile usability.

## 4. Animations and SEO — the short answer

Animations do not hurt rankings by themselves. Problems come from three
things, all fixable without removing the design:

- **Content hidden until JavaScript runs** → fixed by prerendering.
- **Heavy main-thread work** (per-frame React updates, CPU-rendered WebGL) →
  hurts INP and lab scores → use GPU-friendly `transform`/`opacity`
  animations, pause off-screen, fall back to a still frame on weak devices.
- **Layout shifts** → already fine (CLS 0–0.02).

Rankings use **real-user data** (Chrome UX Report), not the lab score, but
PageSpeed Insights lab numbers are what clients and prospects see when they
check an SEO agency's own site.

## 5. Proposed order of work

1. Decide hosting (owner): **static hosting of the prerendered site**
   (recommended: Netlify, Cloudflare Pages or Hostinger static) **or** keep the
   WordPress theme and make it serve the prerendered page for each URL.
2. Prerender all routes; per-page canonical, meta, Open Graph and schema in the
   HTML; real 404; correct sitemap + robots.
3. Performance: remove Fraunces, intro curtain change, WebGL safeguards,
   per-frame hero demo, route code-splitting, fonts, images.
4. Structured data and social tags.
5. Re-measure (Lighthouse + PageSpeed Insights), then submit sitemap in Search
   Console and request indexing of key pages.
6. After launch, watch Search Console (Pages, Core Web Vitals, Enhancements)
   for 4–8 weeks.

## 6. What we need from the owner

- The final **domain** (and www or non-www).
- **Hosting choice**: WordPress on Hostinger, or static hosting.
- If WordPress: which **SEO plugin** (if any) is installed, and whether other
  WordPress pages/posts exist on the same domain.
- **Google Search Console** access for the domain (Domain property, add the
  helper as a user).
- Once live: PageSpeed Insights links for home and one service page.
- The business **email on the new domain** (for schema and contact links).

## 7. Tools

| Tool | Used for |
| --- | --- |
| Google Search Console | Indexing, canonicals Google chose, soft 404s, field CWV, sitemap |
| PageSpeed Insights | Field data (CrUX) + lab data per URL |
| Lighthouse (Chrome DevTools) | Lab performance, SEO, accessibility |
| URL Inspection (in Search Console) | What Googlebot actually renders |
| Rich Results Test / Schema validator | Structured data |
| Screaming Frog (free up to 500 URLs) | Crawl: status codes, canonicals, titles, links |
| WebPageTest | Filmstrip, slow-device testing |

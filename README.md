# Editorial HQ — Link Building & AI Visibility

Marketing website for a link-building and digital-PR agency. Static React SPA,
no backend. Editorial ink-on-paper design, 20 routes, content held in
TypeScript rather than a CMS.

> **New to this project? Start with [HANDOFF.md](HANDOFF.md)**, then [PROJECT.md](PROJECT.md). It explains
> where the code came from, the conventions that are not obvious, what is
> unfinished, and the traps worth knowing before you change anything.

## Quick start

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:5173.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build into `dist/`, every page prerendered to HTML |
| `npm run preview` | Serve the built `dist/` on :4173 |
| `npm run build:wp` | Build an installable WordPress theme (`wp-theme/talha-site.zip`) |

Types are not checked during build (esbuild strips them). Run it yourself:

```bash
npx tsc --noEmit
```

## Stack

| Concern | Choice |
| --- | --- |
| Framework | React 19 + Vite 6 + TypeScript |
| Routing | react-router-dom 7 (`BrowserRouter`) |
| Styling | Tailwind CSS 3 + `tailwindcss-animate` |
| Animation | `motion` (Framer Motion v12) |
| Primitives | Radix UI accordion + dropdown, shadcn-style wrappers |
| Icons | `lucide-react` — **keep on 0.x**, 1.x renames exports |
| Fonts | Self-hosted Plus Jakarta Sans + Caveat via Fontsource |

## Structure

```
src/
  App.tsx          routes + opening curtain + global booking modal
  index.css        design tokens, emphasis system, keyframes
  lib/             booking helper, shared content, utils
  components/      shared UI, illustrations, layout chrome
  sections/        homepage sections, in render order
  pages/           one file per route
    services/      service pages, their content and building blocks
public/images/     photography used by case studies and testimonials
wordpress/         PHP templates for the WordPress theme build
scripts/           theme build + PHP safety check
```

Full breakdown in [PROJECT.md §4](PROJECT.md).

## Deploying

Live at `charming-fox-ed5fa9.netlify.app` — currently from an uploaded bundle,
not from this repo. Connect the repository to Netlify to deploy from source;
`netlify.toml` already sets build `npm run build`, publish `dist`.

Because it is a single-page app, every host needs a catch-all rewrite to
`index.html` or deep links like `/services/link-building` will 404. Configs for
Netlify (`netlify.toml`, `public/_redirects`), Vercel (`vercel.json`) and
Apache/LiteSpeed (`public/.htaccess`) are all included.

WordPress hosting is supported too — see [HOSTING.md](HOSTING.md).

## Design notes

Editorial, monochrome, deliberately not SaaS-styled. Two client decisions to
respect: **no SaaS-product look** and **no red accent** — both were tried and
rejected. Emphasis uses the `.mark` highlighter classes in `index.css`.

**[BRAND.md](BRAND.md) is the rulebook** — four surfaces, a four-step ink ramp,
and a closed pastel palette reserved for stat tiles. Read it before restyling.

Be aware the Tailwind colour names are historical and misleading: `navy-dark`
is near-black, `blue-accent` is *not* blue, `mist` is warm paper. Real values
are RGB triples on `:root` in `src/index.css`. See
[PROJECT.md §6](PROJECT.md).

## Status

All four service pages are rebuilt on one template — 2,000–2,200 words each,
8-question objection FAQ with `FAQPage` schema, four spaced CTAs, and a
scroll-revealed stage ladder. The brand system is defined in
[BRAND.md](BRAND.md) and applied across the site; 13 routes measured at zero
WCAG AA contrast failures.

All 20 routes verified at 0 WCAG AA contrast failures and 0 broken images.
Still thin on *content* (not structure): case-study narratives and blog post
bodies. Scroll-driven hero motion has not been watched in a real browser. Full
list, plus the non-negotiable design rules, in [PROJECT.md §8–9](PROJECT.md).

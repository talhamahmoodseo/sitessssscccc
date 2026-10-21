# Instructions for AI agents

Read `HANDOFF.md` first — it is the project map, the owner's rules and the
open work list. Screenshots of every page are in `docs/screenshots/`.

Before finishing any change:
1. `npx tsc --noEmit` and `npm run build` must pass (the build prerenders
   every page; it needs Playwright's Chromium — `npx playwright install chromium`).
2. Check the page at 1440px and 390px (no horizontal scroll on mobile).
3. If you touch anything shipped to WordPress, run `npm run build:wp` then `npm run build`.
4. Never break the SEO setup: each page sets its head tags through
   `<Seo …/>`, unknown URLs stay real 404s, new pages must be linked from
   somewhere so the prerender finds them. See HANDOFF.md "How pages reach Google".
5. Follow the owner's rules in HANDOFF.md §5 (no freelancing platforms, human
   copy, no pricing changes without approval, verified data only).
6. Update the screenshots in `docs/screenshots/` and the notes in `HANDOFF.md`
   when you change a page.

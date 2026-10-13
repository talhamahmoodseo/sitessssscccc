# Handoff — Talha Mahmood link-building agency site

Everything needed to continue this project in another session, on another
machine, or with another assistant.

## What this is

A React 19 + Vite 6 + TypeScript marketing site for a link-building and
digital-PR agency, which also ships as an installable **WordPress theme** (the
owner hosts on Hostinger).

## Current state — read this first

The working tree has been **restored to commit `4eabb08` (6 Oct 15:18)**. That
is the version the owner confirmed as preferred. Several later design passes
were rejected and have been set aside — not deleted.

Two tags mark the ends of that range:

| Tag                 | Commit    | What it is                                  |
| ------------------- | --------- | ------------------------------------------- |
| `preferred-version` | `4eabb08` | What the tree is restored to. The good one.  |
| `rejected-latest`   | `dcfbfa5` | The rejected line of work, kept for salvage. |

To inspect or cherry-pick anything from the rejected work:

```bash
git diff preferred-version rejected-latest -- src/
git checkout rejected-latest -- path/to/file
```

**Do not** `git reset --hard` past these tags — the rejected branch contains a
few fixes that are still wanted (see "Known outstanding" below).

## Run it

```bash
npm install
npm run dev        # development, localhost:5173
npm run preview    # serves the production build on localhost:4173
```

```bash
npm run build      # production build -> dist/
npm run build:wp   # WordPress theme -> wp-theme/talha-site.zip
```

The WordPress zip in `wp-theme/` is already built from the restored version:
77 entries, forward-slash paths, CRC clean. Upload via
**Appearance → Themes → Add New → Upload Theme → Activate**, then
**Settings → Permalinks → Save Changes** once so the SPA routes resolve.

## Push to GitHub

This repo has **no remote**. It has never been pushed — there was no GitHub
auth available in the session that built it (no `gh` CLI, and the credential
manager needs an interactive prompt).

Create an empty **private** repo on github.com, then:

```bash
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main --tags
```

`--tags` matters: it carries `preferred-version` and `rejected-latest` so the
next person can see both lines.

## Layout

```
src/
  App.tsx              routes + homepage section order
  index.css            design tokens (:root custom properties)
  sections/            homepage sections
  pages/               one file per route; *-depth.tsx = that page's own sections
  pages/services/      four service pages, one section folder each, kit.tsx,
                       common.tsx + content/ (copy lives separately)
  components/          shared UI, LineArt figures, Rocket hero animation
  lib/content.ts       case studies + blog posts
  lib/clients.ts       client names and the homepage proof bento
scripts/
  build-wp-theme.mjs   React build -> WordPress theme, with self-checks
  check-theme-php.mjs  guards against invented WP functions (has caught a fatal)
wp-theme/              generated theme + zip (gitignored)
```

## Traps worth knowing

- **Colour names are historical.** `navy-dark` is near-black ink, `blue-accent`
  is also near-black, `mist` is warm paper, `gold` is the amber highlight.
  Everything references them already; renaming is a large sweep.
- **Keep `lucide-react` on 0.x.** 1.x renames exports (`Linkedin` →
  `LinkedinIcon`) and changes icon geometry. Pinned at 0.577.
- **`noImplicitAny` is `false`** and `npm run build` does not typecheck
  (esbuild strips types). Run `npx tsc --noEmit` yourself.
- **`app.js` / `app.css` are not content-hashed**, preserved from the original
  build. Caching must revalidate or users get stale code after deploy;
  `public/.htaccess` handles this for Apache/LiteSpeed.
- **Measure contrast with full alpha compositing**, including any absolutely
  positioned earlier sibling that covers the text, and treat gradient scrims as
  unmeasurable rather than failed. Simpler methods produced both false passes
  and false failures on this codebase.

## Known outstanding

1. **Client logos are placeholders.** CapCut, Ocuco and Khaleej Times are real
   clients used as typographic wordmarks; every figure, quote and case study is
   invented. The owner considers the site unfinished until real logos land.
2. **A Neil Patel statement is wanted** under the zero-click stat on the
   homepage, properly attributed. It was not added because the exact wording
   could not be verified — three neilpatel.com URLs returned 404. Do not
   invent one; get the real sentence and source.
3. **Worth salvaging from `rejected-latest`:** the conceptual fix to the
   "answer engines" section (Google / AI Overviews / AI assistants, instead of
   listing ChatGPT and Claude as separate categories), the removal of the
   "AuthorityOS" coinage, and the rewrite of the "most link building starts
   with available inventory" comparison into something that does not imply the
   reader's current way of buying is wrong.
4. **Hero animation timing is unverified.** The browser pane used during
   development never composited frames, so no animation could be watched run.
   Check the hero `Rocket` animation in a real browser.

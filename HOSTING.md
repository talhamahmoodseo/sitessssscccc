# Hosting on Hostinger

This site is a React single-page app: one JavaScript bundle that draws every
page and handles its own URLs. That shapes the hosting choice.

**Your Hostinger plan can host it three ways.** Pick one:

| Option | Site lives at | WordPress still used? | Effort |
| --- | --- | --- | --- |
| **A — WordPress theme** | `yourdomain.com` | Yes, as the delivery shell | Medium |
| **B — Static upload** | `yourdomain.com` | No | Low |
| **C — Subdomain** | `app.yourdomain.com` | Yes, on the main domain | Low |

Option B is the simplest and fastest, and your Hostinger plan serves it fine —
Hostinger runs LiteSpeed, which handles static files and `.htaccess` natively.
You do not need WordPress to host this. Choose **A** only if you specifically
want the site to live inside WordPress (so it is managed from `/wp-admin`,
sits on the same domain as existing WordPress content, or you plan to add
WordPress-driven pages later).

All three options are documented below.

---

## Option A — Install as a WordPress theme

The theme is prebuilt and verified: WordPress serves the shell, the bundle
draws the site, and unknown URLs like `/services/digital-pr` are handed to the
app instead of 404ing.

### 1. Build the theme

```bash
npm install
```

```bash
npm run build:wp
```

That writes **`wp-theme/talha-site.zip`** — upload that file as-is. The script
builds the zip itself and verifies it before finishing, so there is no manual
zipping step.

> **Do not re-zip the folder with PowerShell's `Compress-Archive`.** On Windows
> PowerShell 5.1 it stores entry names with backslashes, which the ZIP format
> does not allow. PHP then reads `talha-site\style.css` as a single flat
> filename and WordPress rejects the upload with *"The package could not be
> installed. The theme is missing the style.css stylesheet."* If you ever need
> to zip it by hand, use Windows Explorer (right-click → *Send to* →
> *Compressed (zipped) folder*), which writes correct forward slashes.

### 2. Upload it

In WordPress admin: **Appearance → Themes → Add New → Upload Theme**, choose
`talha-site.zip`, then **Install Now → Activate**.

If the zip exceeds your upload limit, use Hostinger's **File Manager** instead
(hPanel → *Files* → *File Manager*) and drop the unzipped `talha-site` folder
into `public_html/wp-content/themes/`, then activate it under *Appearance →
Themes*.

### 3. Flush the rewrite rules — do not skip this

**Settings → Permalinks**, make sure the structure is **Post name**, and click
**Save Changes** once. Without this, deep links return 404 instead of loading.

### 4. Clear the cache

Hostinger's LiteSpeed cache will serve the old page otherwise:

- hPanel → *Performance* → *Cache Manager* → **Purge All**
- If the LiteSpeed Cache plugin is active: *LiteSpeed Cache → Toolbox → Purge All*

### Updating later

Re-run `npm run build:wp` and upload the new zip. WordPress will notice the
theme already exists — choose *Replace current with uploaded*.

A normal content or design edit only changes `assets/`, so you can also skip
the upload screen entirely: in File Manager, replace
`wp-content/themes/talha-site/assets/` with the new one.

Either way, purge the cache afterwards.

### Things that will break it

- **JS optimisation plugins.** The bundle is an ES module. Any plugin that
  combines, defers, or minifies it again (LiteSpeed Cache, Autoptimize,
  WP Rocket, Jetpack Boost) will stop it from running. In LiteSpeed Cache turn
  off *Page Optimization → JS Combine* and *JS Defer*, or add `app.js` to the
  JS excludes list.
- **Expecting WordPress pages to appear.** While this theme is active every URL
  renders the React app. WordPress posts and pages will not show. If you want
  a WordPress blog alongside it, use Option C instead.
- **A re-zipped or nested archive.** `style.css` must sit at `talha-site/style.css`
  inside the zip, with forward slashes. Use the zip `npm run build:wp` produces.
  See the warning in step 1.

---

## Option B — Upload the built site, no WordPress

Fastest route, and the site behaves exactly as it does on Netlify today.

### 1. Build

```bash
npm run build
```

### 2. Upload

hPanel → *Files* → **File Manager** → open `public_html`.

If WordPress currently lives there, move it out of the way first: create a
folder `wp-old` and drag the WordPress files into it (or delete them if you no
longer need that install — take a backup from hPanel → *Files* → *Backups*
first).

Upload **the contents of `dist/`** into `public_html` — so you end up with
`public_html/index.html`, `public_html/assets/`, `public_html/images/`,
`public_html/.htaccess`.

The `.htaccess` that ships in `dist/` is what makes `/services/digital-pr`
resolve. File Manager hides dotfiles by default — enable *Settings → Show
hidden files* to confirm it uploaded.

### 3. Point the domain

If the domain already points at this hosting, you are done. Purge the cache
(hPanel → *Performance* → *Cache Manager* → *Purge All*) and load the site.

---

## Option C — Subdomain, WordPress untouched

Good when you want to keep an existing WordPress site on the main domain.

1. hPanel → *Domains* → **Subdomains**, create e.g. `site`. Hostinger creates
   a folder such as `public_html/site` or `domains/site.yourdomain.com/public_html`
   and notes the path on screen.
2. `npm run build`
3. Upload the **contents of `dist/`** into that folder.
4. Visit `site.yourdomain.com`.

Because the subdomain has its own document root, the shipped `.htaccess` works
unchanged and WordPress on the main domain is unaffected.

---

## Serving from a subfolder (`yourdomain.com/site`)

Only needed if you want the app under a path on a domain WordPress already
owns. Three things must agree on the prefix:

1. Build with the base path:

```bash
npm run build -- --base=/site/
```

2. In `index.html`, uncomment the block near `<div id="root">` and set both:

```html
<script>
  window.__TM_BASE_PATH__ = "/site/";
  window.__TM_ASSET_BASE__ = "/site";
</script>
```

3. In `public/.htaccess`, change `RewriteBase /` to `RewriteBase /site/` and
   `RewriteRule . /index.html [L]` to `RewriteRule . /site/index.html [L]`.

Then upload `dist/` into `public_html/site/`. WordPress's own `.htaccess` at
the root skips requests that resolve to a real directory, so it will leave
`/site` alone.

---

## Troubleshooting

**Blank white page.** Open the browser console (F12). A 404 on
`assets/app.js` means the upload path is wrong or the base path does not match
where the files sit. A syntax error usually means a caching or optimisation
plugin rewrote the module — see the warning in Option A.

**Home page works, other pages 404.** The rewrite is not active. Option A:
re-save Permalinks. Options B/C: `.htaccess` is missing (it is a hidden file)
or `RewriteBase` does not match the folder.

**Fonts look wrong / text falls back to Arial.** The `.woff2` files did not
upload, or the server does not know the type. The shipped `.htaccess` declares
it; make sure the whole `assets/` folder transferred.

**Changes do not show.** Purge the Hostinger cache, then hard-reload with
Ctrl+F5. The theme versions its assets by file time, so a purge is normally
enough.

**"Fatal error ... must be a valid callback, function X not found".** A hook in
`functions.php` names a function that does not exist, so WordPress dies the
moment that hook fires. `npm run build:wp` now refuses to build when this is
true — see `scripts/check-theme-php.mjs`. To recover a dead site, rename
`wp-content/themes/talha-site` over FTP; WordPress falls back to a default
theme and the admin becomes reachable again.

**Images missing in Option A.** `window.__TM_ASSET_BASE__` must point at the
theme folder; `functions.php` sets this automatically, so this usually means
`images/` did not upload with the theme.

# Baseline summary — 2026-08-11

**Target:** `https://clarky3d.com/`  
**Access result:** Reachable from this environment (`HTTP/2 200`).  
**Stack observed:** Netlify + Cloudflare; Vite/React SPA (`#root`); admin separate bundle; data from `/api/bootstrap` and `/api/filaments`.

## 1. What the live site is

Evidence contradicts the provisional “agency portfolio” assumption in the pre-access audit framing:

- Made-to-order **3D print catalogue** with category browse, product detail, filament library, cart drawer.
- Conversion path is **Telegram deep link** (`t.me/Clarky_AU` with prefilled order text), not an HTML lead form.
- 4 categories / 16 products / 14 filaments (bootstrap + filaments APIs).
- Currency displayed as **AUD** in cart UI.

## 2. Route and template inventory

| Template | How reached | Indexability notes |
| --- | --- | --- |
| Home / Featured | `/` | SSR shell + client render; sitemap includes `/` |
| Category | `/#Hotwheels`, `/#Retro_Gaming`, `/#Misc_Items`, `/#Vial_Storage` | Client/hash; titles like “Pep Things — Clarky3D” |
| Product | `/?p=Category/Sub/Product` | 16 URLs in `sitemap.xml` |
| Colours | nav + `/#colours` | Client route |
| Cart | drawer UI | Not a URL |
| Admin | `/admin`, `/admin.html` | `noindex,nofollow` in admin HTML; robots Disallow |
| Missing | `/privacy`, `/contact`, `/accessibility` | Not in nav/sitemap |

Artifacts: `crawl/`, `docs/content-inventory.csv`, `docs/redirect-map.csv`.

## 3. Screenshots captured

Directory: `screenshots/` (31 files).

Viewports per primary template: 360×800, 768×1024, 1440×900, 1920×1080 for home, colours, three products, category (Pep Things), admin. Also: cart open, unknown product query, **no-JS home** (blank).

## 4. Automated checks

### Lighthouse (lab; Chromium headless)

Successful runs (`lighthouse/*-retry.json` and desktop originals):

| Page | Form factor | Perf | A11y | BP | SEO | LCP | CLS | Transfer |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home `/` | desktop | 98–99 | 100 | 100 | 100 | ~0.8–0.9s | ~0.04 | ~471 KB |
| Home `/` | mobile | 83 | 100 | 100 | 100 | ~3.7s | ~0.06 | ~921 KB |
| Product Modular Case | desktop | 98 | 96 | 100 | 100 | ~0.9s | ~0.03 | ~345 KB |
| Product Modular Case | mobile | 84 | 96 | 100 | 100 | ~3.7s | ~0.04 | ~522 KB |
| `#colours` | desktop | 99 | 95 | 100 | 100 | ~0.85s | ~0.01 | ~166 KB |
| `#colours` | mobile | 88 | 95 | 96 | 100 | ~3.3s | ~0.02 | ~166 KB |

Failed first-pass mobile/product runs with `NO_FCP` are retained for honesty; retries with `--max-wait-for-load=90000` succeeded. Lighthouse a11y scores can miss SPA contrast issues that axe caught after full client render.

### axe-core (Playwright, WCAG 2.2 AA tags)

| View | Violations |
| --- | --- |
| home | 0 |
| colours | 1 serious `color-contrast` (filament hex `#666` on `#1a1a1a`) |
| product-featured | 1 serious `color-contrast` (`.colour-parts-note`) |
| product-popular / product-priced | `color-contrast` |
| category-vial (Pep Things theme) | serious `color-contrast` on themed nav/cart/prices (`#8000ff`) |
| admin | 0 (login shell; limited DOM) |

### Keyboard (home, desktop)

- First Tab focuses visible **Skip to content** (`#main`).
- Subsequent focus moves through wordmark, Featured, Catalogue, Colours, Cart, category tiles, product cards.
- `:focus-visible` outline observed (cream/cyan).

### Responsive

- No horizontal overflow on public templates at tested widths.
- Admin at 360×800 reported `overflowX: true`.
- Mobile header stacks wordmark then nav (screenshot evidence).

### SEO / crawl

- `robots.txt`: Allow `/`; Disallow `/admin`, `/admin.html`, `/api/admin`; **Sitemap host `https://print.clarkyau.com/sitemap.xml` does not resolve (DNS failure)**.
- Live `https://clarky3d.com/sitemap.xml` returns 17 `<url>` entries (home + 16 products) using `clarky3d.com` hosts.
- SSR canonical/og URL initially `https://print.clarkyau.com/`; client updates canonical to `https://clarky3d.com/` after hydration.
- No JSON-LD in SSR HTML.
- No document `<h1>` in SSR; client home uses `h2`/`h3`/`h4` hierarchy (no `h1` observed on home DOM capture).
- `www` → apex 301; http → https 301.

### Headers / TLS

Present: `strict-transport-security: max-age=31536000`, Cloudflare/Netlify caching headers.  
Missing: CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`/`frame-ancestors`.  
TLS: CN=`clarky3d.com`, issuer Google Trust Services WE1, valid 2026-08-10 → 2026-11-08 (`headers/tls.txt`).

### Forms / integrations

- No HTML `<form>` on public catalogue views.
- Order CTA builds `https://t.me/Clarky_AU?text=...` (see `crawl/cart-state.json`).
- Admin implies Netlify Identity (robots comment + admin bundle).
- Third parties after load: Google Fonts, Cloudflare Insights beacon.
- Cookies: 0; empty local/session storage on fresh home load.

### Progressive enhancement

- With JavaScript disabled: empty `#root`, no text content (`screenshots/home-nojs--1440x900.png`, `crawl/nojs-home.json`). **Essential browse/order UI is JS-dependent.**

### Dependencies

- No public lockfile/source in this repo yet; live site ships hashed bundles only.
- Dependency CVE audit of application source: **not applicable until M1 scaffold**. Recorded as limitation, not a pass.

### Performance notes

- Initial public transfer roughly 0.17–0.9 MB depending on route/images.
- Mobile LCP ~3.3–3.7s in lab (above 2.5s CWV target) on home/product.
- Fonts loaded from Google (3 families).

## 5. Evidence index

| Path | Contents |
| --- | --- |
| `screenshots/` | Desktop/mobile template + interaction states |
| `lighthouse/` | JSON runs + `scores-summary.json` |
| `axe/` | Per-template violation JSON |
| `keyboard/home-keyboard.json` | Tab order sample |
| `headers/` | curl -I chains, TLS |
| `crawl/` | HTML, robots, sitemap, APIs, DOM inventories, assets, no-JS, integrations |
| `capture-baseline.mjs` / `capture-summary.json` | Repro harness + machine summary |
| `../../content-inventory.csv` | Route/content matrix |
| `../../redirect-map.csv` | Host/product URL map |
| `../../brand-inventory.md` | Brand retain/refine/retire |

## 6. Open owner decisions (block high-fidelity copy/IA)

1. Confirm overhaul keeps **catalogue + Telegram order** vs the plan’s **services portfolio / lead-form** default.
2. Approve brand retain/refine list (especially favicon replacement, contrast refinements, “Pep Things” naming).
3. Verify media rights for all product photos and OG image.
4. Decide canonical host strategy for unresolved `print.clarkyau.com`.
5. Supply privacy/legal basis for Telegram order handoff and any analytics (Cloudflare Insights).
6. Provide production credentials only when M3/M4 integration testing requires them.

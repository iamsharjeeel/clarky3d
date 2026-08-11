# Clarky3D brand inventory

**Captured:** 2026-08-11  
**Source:** live `https://clarky3d.com/` (Netlify SPA) + `/api/bootstrap`, `/api/filaments`, CSS tokens in `main-DXLfjVxv.css`, screenshots under `docs/evidence/2026-08-11/screenshots/`.  
**Approval status:** provisional — owner must confirm retain/refine/retire before high-fidelity redesign ships.

Legend: **retain** / **refine** / **retire** / **unknown**

## 1. Logo and wordmark

| Element | Evidence | Decision | Rationale |
| --- | --- | --- | --- |
| Pixel wordmark `CLARKY` + accent `3D` (Press Start 2P, cream/cyan, hard drop shadow) | Home/header screenshots; `.wordmark` CSS | **retain** | Primary recognizable brand signal on every view |
| Favicon `/favicon.svg` | Downloaded asset is a purple geometric mark matching Cursor’s logo, not the site wordmark | **retire** (current file) / **unknown** (intended mark) | Current favicon does not match live wordmark; do not preserve as Clarky3D identity without owner confirmation |
| Social image `/og-default.jpg` (1200×630) | HTTP 200; referenced in SSR meta | **unknown** | Rights/approval not verified; visual content not yet rights-cleared in writing |

## 2. Color system

From `:root` in live CSS:

| Token | Value | Decision | Notes |
| --- | --- | --- | --- |
| `--theme-color` / accent | `#00e5ff` | **retain** | Signature cyan; used for wordmark “3D”, CTAs, active nav |
| `--on-accent` | `#121212` | **retain** | Text on cyan controls |
| `--bg` | `#121212` | **retain** | Dark field is core identity |
| `--surface` | `#1a1a1a` | **retain** | Cards/panels |
| `--sunken` / `--inset` | `#0a0a0a` / `#050505` | **retain** | Depth layers |
| `--ink` | `#f5f0e6` | **retain** | Warm off-white body text |
| `--muted` / `--line-strong` | `#888` / `#666` | **refine** | axe: `#666` on `#1a1a1a` ≈ 3.03:1 (fails AA for small text) |
| `--line` | `#333` | **retain** | Borders |
| `--ok` / `--warn` / `--danger` | `#3f0` / `#ffb800` / `#ff5c5c` | **refine** | Keep semantics; verify contrast on badges |
| Category theme Hotwheels | `#cc0000` | **retain** | Per-catalogue theme |
| Category theme Retro Gaming | `#ff8000` | **retain** | Recolors chrome on product/category views |
| Category theme Misc Items | `#408080` | **retain** | |
| Category theme Pep Things (`Vial_Storage`) | `#8000ff` | **refine** | axe: purple on `#121212`/`#1a1a1a` fails AA for nav/price text (~2.8–3.0:1) |
| Scanline / RGB noise overlay | CSS `body:before` gradients | **retain** | Distinctive atmosphere; keep subtle; respect reduced motion (already short-circuits animations) |
| Hard offset shadows (`box-shadow: Npx Npx #000`) | Buttons/cards | **retain** | Signature “chunky” UI |

## 3. Typography

| Family | Role | Source | Decision | Notes |
| --- | --- | --- | --- | --- |
| Press Start 2P | Display / wordmark / strip titles | Google Fonts | **retain** | Licensing via Google Fonts OFL; consider self-host subset for performance |
| Exo 2 (400/600/700) | Body / product titles | Google Fonts | **retain** | |
| Space Mono (400/700) | UI chrome / nav / mono labels | Google Fonts | **retain** | |
| Default system stacks | n/a | not used as primary | **retire** as brand default | Do not replace with Inter/Roboto/Arial |

## 4. Composition and UI motifs

| Motif | Decision | Notes |
| --- | --- | --- |
| Sticky header + Featured / Catalogue / Colours / Cart | **retain** | Shallow IA matches live product |
| Category tiles with left accent bar + hard shadow | **retain** | |
| Product cards with image + name/price/meta; NEW/POPULAR ribbons | **retain** with a11y refine | Watermark ribbons are brand; ensure text remains available to AT |
| Made-to-order / Lucky Dip colour parts configurator | **retain** | Core commerce interaction |
| Cart drawer → “ORDER ON TELEGRAM” | **retain** pending privacy/legal review | Not a server form today |
| Pixel/retro-tech voice (“Lucky Dip”, playful copy) | **retain** where already published | Do not invent new claims |

## 5. Imagery and media

| Item | Decision | Notes |
| --- | --- | --- |
| Product photos under `/products/...` and `/api/photos/{id}` | **unknown** | 22 unique photo URLs observed, all HTTP 200; owner/license/model releases not verified |
| Filament swatches (CSS hex circles) | **retain** | Generated from filament records |
| No WebGL/Three.js on critical path | **retain** (absence) | Watermark module is JS decoration, not 3D scene |

## 6. Motion

| Behavior | Decision | Notes |
| --- | --- | --- |
| Short hover translate/shadow press on tiles/buttons | **retain** | |
| `prefers-reduced-motion: reduce` collapses transitions | **retain** | Present in CSS |
| No scroll hijacking / custom cursor observed | **retain** | |

## 7. Voice and positioning (observed only)

Published positioning from SSR meta and settings (not invented):

- Meta description: “Clarky3D — made-to-order 3D prints. Browse the catalogue by category, see the filament colours in stock, and order straight through Telegram.”
- Landing intro: “I'm always adding new products…”
- Landing subtext: “All items are print on demand.”
- Order channel: `https://t.me/Clarky_AU`

| Element | Decision |
| --- | --- |
| Made-to-order 3D print catalogue positioning | **retain** pending owner confirmation that overhaul keeps this business model |
| Telegram-first ordering | **unknown** / owner decision (privacy + conversion path) |
| Category label “Pep Things” for `Vial_Storage` | **unknown** — confirm public naming and any compliance constraints |

## 8. Elements to avoid inventing

Do not add unverified client logos, testimonials, awards, response-time guarantees, studio location pages, or agency-portfolio case studies unless the owner supplies approved source material. Live evidence shows a **product catalogue**, not a services portfolio.

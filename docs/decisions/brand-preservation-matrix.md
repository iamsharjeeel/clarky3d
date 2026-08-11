# Brand preservation matrix — visual overhaul

**Date:** 2026-08-11  
**Status:** provisional (owner may override)  
**Evidence:** `docs/brand-inventory.md`, `docs/evidence/2026-08-11/`, implementation captures under `docs/evidence/2026-08-11-visual/`.

| Element | Evidence / reference | Current treatment | Class | Proposed treatment | Reason | A11y impact | Perf impact | Approval |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Pixel wordmark CLARKY + cyan 3D | Live header; `.wordmark` | Press Start cream/cyan, hard shadow | retain | Keep as primary brand signal; enlarge in hero; keep in header | Recognizable equity | Ensure link name “Clarky3D home” | Negligible | provisional retain |
| Favicon | Live was Cursor logo; rebuild ships provisional C | Provisional mark | refine | Keep provisional until owner mark arrives | Must not ship Cursor logo | n/a | n/a | provisional |
| Palette dark `#121212` / cyan `#00e5ff` / cream `#f5f0e6` | Live CSS tokens | Same in `tokens.css` | retain | Retain as core; add surface steps for editorial layers | Signature identity | Contrast already refined for muted | None | provisional retain |
| Muted greys | Live `#666`/`#888` failed axe | Refined `#b0b0b0` | refine | Keep AA-safe muted; never restore `#666` for small text | Legibility | Positive | None | accepted refine |
| Category theme colours | Hotwheels/Retro/Misc/Pep | Theme tokens on tiles | refine | Use as accent bars/labels only; never small body text on dark for Pep purple | Contrast | Positive | None | provisional |
| Press Start 2P | Wordmark / strips | Display + strip titles | refine | Wordmark + rare section labels only; stop using as dense UI chrome | Hierarchy + readability | Better measure | Self-host subset already via next/font | provisional |
| Exo 2 | Body / titles | Body + product titles | refine | Primary editorial display + body; larger fluid steps | Portfolio/catalogue storytelling | Better scanning | Font already loaded | provisional |
| Space Mono | Nav / meta | UI chrome | retain | Meta, prices, nav labels | Brand UI voice | Keep size ≥14px where possible | None | provisional |
| Hard offset shadows | Buttons/cards | Ubiquitous | refine | Keep on interactive controls; retire as default card container chrome | Distinguish brand from layout | Focus still custom ring | None | provisional |
| Zero radius | Global | `--radius-*: 0` | retain | Keep sharp geometry | Brand character | n/a | n/a | provisional |
| Scanline / noise overlay | `body:before` | Present | refine | Soften opacity; disable decorative animation under reduced motion | Atmosphere without noise | Reduced distraction | Tiny CSS cost | provisional |
| Product photography | Captured catalogue | Card thumbnails | retain | Hero + editorial large media; rights status still unknown | Authentic craft signal | Meaningful alt required | Responsive images / priority LCP | rights unknown |
| NEW/POPULAR ribbons | Live cards | CSS ribbons | refine | Text badges in caption row (not watermark-only) | AT parity | Positive | None | provisional |
| Telegram order path | `t.me/Clarky_AU` | Cart + contact | retain | Keep as primary conversion; pair with enquiry form | Verified journey | Clear link names | External | accepted default |
| Playful copy (“Lucky Dip”, print on demand) | Live content | Present | retain | Keep published phrasing; no new claims | Voice continuity | Plain language helps | None | provisional |
| Dense equal card grid | Live + rebuild | `product-grid` | retire (as default composition) | Editorial asymmetric / featured lanes | Material visual difference | Clearer focus order | Fewer above-fold images possible | provisional |
| “Featured items” as H1 hero | Live + rebuild | Homepage H1 | retire | Brand-led H1 stating made-to-order 3D prints | First-screen comprehension | One clear H1 | None | provisional |
| Sticky mono nav-as-buttons | Live + rebuild | `.nav-btn` row | refine | Slim editorial header + accessible mobile disclosure | Mobile quality | Focus trap / Escape | Low | provisional |
| Agency case-study claims | Not in evidence | Absent | retire (do not invent) | Omit clients/outcomes; use product narrative fields | Integrity | Avoids false confidence | None | accepted |
| WebGL hero | Absent live | Absent | retain absence | CSS depth / imagery only unless later approved | Perf/resilience | Static fallback default | Avoids heavy JS | provisional |
| Motion press/hover | Live | Short translate | refine | 2–3 intentional fades/lifts; honor reduced motion | Presence without noise | Required | CSS only | provisional |

## Voice & terminology (retain)

- Clarky3D / made-to-order 3D prints / catalogue / colours / Lucky Dip / print on demand / Order
- Avoid: “agency”, “case study ROI”, fabricated “clients”, “award-winning”

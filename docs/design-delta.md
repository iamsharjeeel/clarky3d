# Design delta — legacy vs current implementation

**Date:** 2026-08-11  
**Sources:** live SPA evidence `docs/evidence/2026-08-11/`, implementation captures `docs/evidence/2026-08-11-visual/implementation/`, state verification `docs/evidence/2026-08-11-visual/state-verification.md`.

## Verified state

| Layer | Commit / host |
| --- | --- |
| Legacy production | Netlify SPA on `clarky3d.com` (captured 2026-08-11) |
| Current implementation (pre-overhaul) | Next.js app on `main` @ `24cb140` |
| Vercel production deploy | `dpl_5fSjWRydP7PYQmzSDmJhEuuRnkTV` → same commit |

## Comparison matrix

| Dimension | Legacy SPA | Current Next implementation | Merely reproduces legacy? |
| --- | --- | --- | --- |
| Positioning / first screen | Pixel wordmark + Featured items strip; intro panel; product grid. Brand strong; offer clear. | Same hierarchy: H1 “Featured items”, same intro copy, same CTA labels, same category tiles + product grid | **Yes** — composition is a near-reconstruction |
| Information architecture | Featured / Catalogue / Colours / Cart; Telegram order | Featured / Catalogue / Colours / Order + About/Privacy/Accessibility | Partial — Order/About added, but primary IA mirrors legacy |
| Navigation | Sticky header, mono nav buttons, hard shadows | Same wordmark treatment, same nav button chrome, cart control | **Yes** |
| Typography | Press Start 2P / Exo 2 / Space Mono; strip titles | Same families and roles; scale still strip-title + dense cards | **Yes** (fonts retained by design; hierarchy not reinvented) |
| Grid / spacing | Dense card grid, hard offsets, tight chrome | Same product-grid density, panel + hard shadow language | **Yes** |
| Project / product cards | Image, ribbons, title, price, meta | `ProductCard` mirrors ribbons, hard border, price cyan | **Yes** |
| Case-study depth | Product description + colour parts + photos | Same fields; no narrative framing beyond description | **Yes** (shallow catalogue detail) |
| Media art direction | Full product photos in cards | Same local product photos; placeholder when missing | Mostly same |
| Services presentation | None | None (`/services` absent) | N/A — must add buyer capabilities without inventing agency services |
| Trust / proof | None beyond product photos | None (correct — no approved testimonials) | Same omission (appropriate) |
| CTA hierarchy | Telegram from cart; soft browse CTAs | Browse catalogue + Start an order; form + Telegram | Slightly clearer, still secondary visually |
| Contact flow | Telegram only | Enquiry form + Telegram aside | Improved functionally; visually panel-clone of legacy chrome |
| Mobile composition | Stacked dense catalogue | Same stack; no dedicated mobile nav drawer | **Yes** — desktop chrome wraps |
| Animation | Short hover press; reduced-motion CSS | Same `motion-lift` / fade | **Yes** |
| Accessibility | Contrast fails; blank no-JS | Tokens refined; HTML content without JS | Improved technically, not visually distinct |
| Performance | SPA JS shell; mobile LCP ~3.7s lab | SSR/SSG HTML; still card-heavy imagery | Architecture improved; visual system unchanged |

## Choices that merely reproduce the legacy design

1. Homepage opens on “Featured items” instead of a brand-led hero composition.
2. Category tiles + equal product cards repeat the legacy browse rhythm.
3. Wordmark + mono nav buttons + hard black offsets are copied as layout system, not only as brand tokens.
4. Product cards retain ribbon/price/meta packing without editorial captions or asymmetric media.
5. Product detail remains a split media/configurator panel rather than a story + inquiry journey.
6. Spacing, zero-radius panels, and scanline atmosphere dominate without a new grid language.
7. No services/capabilities section and no process narrative for buyers.
8. Mobile is a compressed desktop header, not a composed mobile experience.

## Gaps vs brief (evidence-bound adaptations)

| Brief ask | Evidence-safe treatment |
| --- | --- |
| Agency services page | Build **How it works / capabilities** from real catalogue journey (browse → colours → order) |
| Case-study outcomes | Use product overview, print role, colour process, delivered photos; **omit** invented outcomes |
| Client trust strip | **Omit** — no approved clients/testimonials |

## Success criteria for the overhaul

A returning visitor keeps Clarky3D cyan/dark/pixel wordmark and playful catalogue voice, but the first screen, grid, product storytelling, navigation, and CTA hierarchy must not read as the Netlify SPA with a new framework.

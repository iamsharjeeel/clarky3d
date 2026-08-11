# Handover

## Latest: M0 evidence (2026-08-11)

### What changed
- Confirmed live access to `https://clarky3d.com/` (HTTP 200).
- Full crawl/inventory of routes, APIs, assets, products, filaments, redirects, headers.
- Screenshots (mobile/desktop), Lighthouse, axe, keyboard, no-JS, integrations baselines.
- Created content/redirect/brand inventories and architecture/scope/brand ADRs.
- Updated `AUDIT.md` / `README.md` with evidence-backed findings.

### Why
M0 is the hard gate before high-fidelity implementation.

### Files touched
- `docs/evidence/2026-08-11/**`
- `docs/content-inventory.csv`
- `docs/redirect-map.csv`
- `docs/brand-inventory.md`
- `docs/decisions/*`
- `AUDIT.md`, `README.md`, `HANDOVER.md`, `CHANGELOG.md`

### Pending / needs human input
- Confirm catalogue+Telegram scope vs portfolio/lead-form plan default.
- Approve brand retain/refine list (favicon is currently a Cursor mark).
- Media rights for product photos + OG image.
- Canonical decision for unresolved `print.clarkyau.com`.
- Privacy/legal text for Telegram + Cloudflare Insights.
- “Pep Things” / vial catalogue public naming & compliance review.

### Next
M1: Next.js foundation, CI, tokens from brand inventory, content schemas matching catalogue, tests.

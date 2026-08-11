# Handover

## Latest: M2 content experience (2026-08-11)

### What changed
- High-fidelity catalogue UI: category tiles, product cards with images/badges, colour swatches, themed product detail.
- Progressive cart + colour configurator; Telegram order message builder (handle via env).
- Local product images under `public/images/products/` with provenance ADR (`rightsStatus: unknown`).
- About page limited to verified facts only (no invented bio).
- Motions: fade-up, lift hover, cart slide — reduced-motion safe.

### Commands / results
```bash
npm run format:check  # pass
npm run lint          # pass
npm run typecheck     # pass
npm run test          # 6 passed
npm run build         # pass
CI=1 npm run test:e2e # 4 passed
```

### Screenshots
`docs/evidence/2026-08-11/m2-screenshots/`

### Pending human input
- Media rights approval before production
- Brand refinements / favicon
- Telegram handle production env
- Privacy/legal copy
- Scope confirmation (catalogue vs portfolio)

### Next
M3: secure lead/contact path (server form + optional Telegram adapter), privacy/consent wiring.

# Handover

## Latest: M4 migration / launch prep (2026-08-11)

### What changed
- Middleware 308 redirects: `/?p=Legacy/Path` → `/work/{slug}` (unknown → `/work`)
- Updated `docs/redirect-map.csv` with implemented product mappings
- JSON-LD for WebSite, Organization, Product
- `vercel.json` security headers mirror
- Launch runbook: `docs/runbooks/launch.md`

### Commands / results
```bash
npm run format:check  # pass
npm run lint          # pass
npm run typecheck     # pass
npm run test          # 12 passed
npm run build         # pass
CI=1 npm run test:e2e # 8 passed
```

### Human gates before DNS cutover
- Media rights, privacy copy, brand/favicon approval
- `print.clarkyau.com` decision
- Production env vars + Resend/Telegram as needed
- Retain Netlify for rollback window

### Next
M5 monitoring/stabilization checklist and lightweight ops docs.

# Visual overhaul quality notes

**Date:** 2026-08-11  
**Branch:** `cursor/visual-overhaul-0d22`

## Commands

```bash
npm ci
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
CI=1 npm run test:e2e
```

### Results (this branch)

| Check | Result |
| --- | --- |
| format:check / lint / typecheck / unit | pass |
| build | pass (routes include design-concepts + how-it-works) |
| CI=1 test:e2e | 9 passed |
| Lighthouse desktop `/` | Perf 1.00 / A11y 1.00 / BP 1.00 / SEO 1.00 |
| Lighthouse mobile `/` | Perf 0.89 / A11y 1.00 / BP 1.00 / SEO 1.00 |

Mobile performance is **0.01 under** the aspirational ≥0.90 lab gate. See `lighthouse/summary.json`. Axe CLI not installed in this environment — keyboard/smoke covered by Playwright; full axe pass not claimed.

## Manual accessibility smoke

- Skip link first focusable on `/`
- Desktop nav links + Order CTA keyboard reachable
- Mobile Menu opens, Escape closes, focus moves into panel
- Product cards are single links with visible focus on media
- Form validation/error/success states unchanged semantically on `/contact`
- `prefers-reduced-motion`: hero rise animation disabled via tokens media query

## Known limitations

| Item | Severity | Owner |
| --- | --- | --- |
| Product photo rights uncleared | High (launch) | Owner |
| No approved testimonials/trust strip | Medium | Owner (omit until approved) |
| Lighthouse/axe after-overhaul lab files | Medium | Agent to attach when suite completes |
| Spatial concept not production | Low | Retained at `/design-concepts/spatial` |
| Legal Terms/SMS pages live on separate PR | Low | Merge legal PR independently |

## Migration / rollback

- Routes added: `/how-it-works`, `/design-concepts/**` (noindex/disallow)
- IA labels refined; legacy catalogue URLs `/work`, `/work/[slug]` retained
- Rollback: redeploy previous Vercel deployment on `main` @ `24cb140`

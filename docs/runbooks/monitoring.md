# Monitoring and stabilization

Owners must be named before production alerts are considered controls.

## Signals

| Signal | Source | Cadence | Action |
| --- | --- | --- | --- |
| Uptime `/api/health` | External monitor → `GET /api/health` | 1–5 min | Page onboarded owner |
| Form delivery | `scripts/synthetic-contact-check.mjs` + provider dashboard | Daily synthetic; real failures on submit | Check Resend/logs; fall back to Telegram CTA |
| Web Vitals | Vercel Speed Insights (optional, privacy-reviewed) | Weekly | Investigate LCP/INP/CLS regressions |
| Errors | Vercel runtime logs | Continuous | Triage 5xx / contact_delivery_failed |
| Indexing | Search Console (when access granted) | 7d / 30d | Sitemap/coverage anomalies |
| Conversions | Enquiry count + Telegram replies (manual) | 7d / 30d | Do not claim rates from tiny samples |

## Post-launch windows

### 24 hours
- [ ] `/api/health` green
- [ ] Home, catalogue, product, colours, contact reachable on apex + www redirect
- [ ] One legacy `/?p=` URL redirects once (308) to `/work/{slug}`
- [ ] Synthetic contact check passes against production
- [ ] No unexpected spike in 5xx

### 7 days
- [ ] Review Web Vitals vs M0 lab baseline (mobile LCP was ~3.3–3.7s on live SPA)
- [ ] Confirm noindex not set on production
- [ ] Sitemap parity with published products
- [ ] Open residual a11y/contrast items tracked with owners

### 30 days
- [ ] Decide whether Resend/Telegram mix is sufficient or CRM is warranted
- [ ] Clear or replace any remaining `rightsStatus: unknown` media
- [ ] Close or schedule residual risks from M0 brand/legal list

## Synthetic contact check

```bash
SITE_URL=https://clarky3d.com node scripts/synthetic-contact-check.mjs
```

Uses reserved `example.com` data only. Do not put real personal data in monitors.

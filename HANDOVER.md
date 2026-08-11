# Handover

## Latest: M3 contact integration (2026-08-11)

### What changed
- `/api/contact` with Zod validation, honeypot, origin allowlist, rate limit.
- Adapters: Resend (when env set) or in-memory (CI/local) — no PII in logs.
- Accessible enquiry form on `/contact` beside optional Telegram CTA.
- Analytics event helper (non-PII CustomEvent bus).
- ADR: `docs/decisions/2026-08-11-contact-adapters.md`

### Commands / results
```bash
npm run format:check  # pass
npm run lint          # pass
npm run typecheck     # pass
npm run test          # 10 passed
npm run build         # pass
CI=1 npm run test:e2e # 6 passed
```

### Manual env for production email
- `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`, `SITE_URL` / `NEXT_PUBLIC_SITE_URL`
- Optional: `NEXT_PUBLIC_TELEGRAM_ORDER_HANDLE`

### Pending
- Owner privacy copy approval before treating form as live legal notice
- CRM/GoHighLevel mapping still blocked pending credentials/consent
- Media rights / brand approvals from M0–M2

### Next
M4 redirects, SEO crawl hardening, Vercel launch prep.

# Clarky3D website overhaul

Evidence-led rebuild of [clarky3d.com](https://clarky3d.com/) as a fast, accessible,
made-to-order 3D print catalogue on **Next.js + TypeScript + Vercel**.

> Live capture (2026-08-11) shows a Netlify React SPA catalogue with Telegram
> checkout—not an agency portfolio. Do not invent services, testimonials, clients,
> or outcomes. Owner decisions in `docs/decisions/` gate contested copy/IA.

## Documents

| Document                                                   | Purpose                                 |
| ---------------------------------------------------------- | --------------------------------------- |
| [`AUDIT.md`](./AUDIT.md)                                   | Expert audit + evidence-backed findings |
| [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md)       | Full overhaul specification             |
| [`AGENTS.md`](./AGENTS.md)                                 | Binding implementation contract         |
| [`docs/evidence/2026-08-11/`](./docs/evidence/2026-08-11/) | M0 baseline                             |
| [`HANDOVER.md`](./HANDOVER.md)                             | Latest changes and pending decisions    |

## Stack

- Next.js 16 App Router, React 19, TypeScript strict
- CSS tokens + Tailwind v4 for utilities
- Zod-validated local content (`content/`)
- Vitest unit tests, Playwright e2e
- Node `22.x` (see `package.json` engines)

## Setup

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Optional: set `NEXT_PUBLIC_TELEGRAM_ORDER_HANDLE=Clarky_AU` to enable the Order page
Telegram link locally. It is not enabled by default.

## Scripts

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

## Visual overhaul

Editorial Gallery direction (provisional). Concepts at `/design-concepts/*` (noindex).
See `docs/design-delta.md` and `docs/decisions/ADR-visual-direction.md`.

## Status

- [x] M0 live-site evidence + inventories
- [x] M1 application foundation (this app scaffold)
- [x] M2 high-fidelity catalogue templates + cart (media rights still unknown)
- [x] M3 secure lead/order integration (Resend optional; memory adapter default)
- [x] M4 migration, redirects, production launch prep
- [x] M5 monitoring / stabilization runbooks (production cutover still human-gated)

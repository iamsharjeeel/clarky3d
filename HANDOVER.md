# Handover

## Latest: M1 foundation (2026-08-11)

### What changed
- Scaffolded Next.js 16 + TypeScript + Tailwind v4 app with required quality scripts/CI.
- Design tokens from live brand inventory (contrast-refined muted/theme values).
- Zod content schemas + evidence-transcribed catalogue (`content/`).
- Global shell (skip link, header, footer), metadata/robots/sitemap, security headers (CSP report-only).
- Routes: `/`, `/work`, `/work/[slug]`, `/colours`, `/contact`, `/privacy`, `/accessibility`.
- Vitest + Playwright smoke; M1 screenshots in `docs/evidence/2026-08-11/m1-screenshots/`.

### Why
M1 exit criteria: build/lint/typecheck/unit/e2e pass with tokenized accessible shell.

### Files touched
- `package.json`, lockfile, CI, configs
- `src/**`, `content/**`, `tests/**`, `public/**`
- `.env.example`, `README.md`, `CHANGELOG.md`, `HANDOVER.md`

### Commands / results
```bash
npm run format:check  # pass
npm run lint          # pass
npm run typecheck     # pass
npm run test          # 4 passed
npm run build         # pass (27 static routes)
CI=1 npm run test:e2e # 3 passed
```

### Pending / needs human input
- Same owner decisions as M0 (scope, brand approval, media rights, print.clarkyau.com, privacy, Pep Things naming).
- Telegram handle env not enabled by default.
- Privacy page is explicitly draft/noindex.

### Next
M2: high-fidelity responsive templates, cart/colour UX progressive enhancement, optimized local media once rights cleared.

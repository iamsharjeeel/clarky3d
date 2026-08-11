# Clarky3D website overhaul

This repository is the delivery package for an evidence-led overhaul of
[clarky3d.com](https://clarky3d.com/). It currently contains the audit,
implementation specification, and operating instructions that an implementation
agent should follow when the existing source and brand assets are supplied.

> **Current phase: M0 evidence complete; M1 foundation next.** No replacement site
> has been built yet. Live `https://clarky3d.com/` was reachable on 2026-08-11 and
> inventoried under `docs/evidence/2026-08-11/`. The site is a made-to-order 3D
> print catalogue with Telegram checkout (not an agency portfolio). Do not invent
> business facts; owner decisions in `docs/decisions/` gate M2 content.

## Documents

| Document | Purpose |
| --- | --- |
| [`AUDIT.md`](./AUDIT.md) | Executive, UX, visual, content, conversion, accessibility, SEO, performance, security, privacy, and maintainability audit; risks; evidence status; recommendations. |
| [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md) | Target experience, architecture, design system, page and component specifications, data model, analytics, testing, migration, launch, and acceptance criteria. |
| [`AGENTS.md`](./AGENTS.md) | Binding working rules and definition of done for implementation agents. |

## Recommended outcome

Build a fast, accessible, portfolio-led lead-generation site that retains the
recognizable Clarky3D identity while making the value proposition, credibility,
work, process, and next action obvious. The recommended default is **Next.js +
TypeScript on Vercel**, with content stored locally first and a small headless CMS
added only when the client demonstrates a real editorial need.

## How to begin implementation

1. Read all three documents before changing code.
2. Acquire the current source/assets or capture the live site using the evidence
   procedure in `AUDIT.md`.
3. Complete the brand/content inventory and resolve every `TBD-EVIDENCE` item.
4. Record baseline Lighthouse, axe, crawl, header, and form results.
5. Implement milestones in `IMPLEMENTATION_PLAN.md` in order; do not invent client
   facts, testimonials, metrics, or project outcomes.
6. Preview on Vercel, complete QA, obtain content/legal approval, then connect the
   production domain with a documented rollback path.

## Local commands (after application scaffolding)

The implementation must expose these scripts:

```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
```

Pin Node and package-manager versions in `package.json`; commit the lockfile. Add
the exact commands and required environment variables here once the app exists.

## Delivery principles

- Preserve identity; improve clarity, consistency, accessibility, and conversion.
- Progressive enhancement beats decorative complexity.
- Every claim requires source material; every project needs approval and alt text.
- Performance and accessibility are acceptance criteria, not polish tasks.
- Collect the minimum lead data, disclose its use, and never expose secrets.
- Measure meaningful actions without dark patterns or inflated vanity metrics.

## Status

- [x] Repository operating guidance
- [x] Provisional expert audit and evidence register
- [x] Detailed overhaul implementation plan
- [x] Live-site evidence capture (2026-08-11)
- [ ] Client-approved content and brand inventory (draft inventory exists; approval pending)
- [ ] Application implementation
- [ ] Preview QA and stakeholder approval
- [ ] Production launch and post-launch monitoring

## M0 artifacts

| Path | Purpose |
| --- | --- |
| `docs/evidence/2026-08-11/` | Screenshots, Lighthouse, axe, headers, crawl, baseline summary |
| `docs/content-inventory.csv` | Routes, products, filaments, migration notes |
| `docs/redirect-map.csv` | Host and product URL map |
| `docs/brand-inventory.md` | Retain / refine / retire / unknown |
| `docs/decisions/` | Architecture, scope, brand ADRs |

# AGENTS.md — Clarky3D implementation contract

These instructions apply to the entire repository. Read `README.md`, `AUDIT.md`,
and `IMPLEMENTATION_PLAN.md` before editing. More specific nested `AGENTS.md` files
may add rules but must not weaken accessibility, security, privacy, provenance, or
quality gates here.

## 1. Evidence and integrity

- Treat the audit as provisional until evidence capture is complete. Replace
  `TBD-EVIDENCE` with dated evidence; never turn a hypothesis into a claimed defect.
- Do not invent client names, testimonials, awards, metrics, qualifications,
  locations, prices, timelines, services, or project outcomes. Use clearly marked
  draft placeholders that cannot ship, or omit the section.
- Verify rights and approval for every logo, font, image, video, model, quote, and
  personal datum. Preserve credits and record provenance.
- Preserve approved brand identity. Before changing a recognizable brand element,
  record current evidence, proposed treatment, accessibility/performance rationale,
  and approval status in `docs/decisions/`.
- Never silently discard existing URLs/content. Update the inventory and redirect
  map with a reason and test.

## 2. Working method

1. Inspect current branch/status and applicable instructions. Do not overwrite
   unrelated work or rewrite history.
2. For nontrivial work, state acceptance criteria and keep a short plan. Change one
   coherent concern per commit when practical.
3. Prefer the smallest architecture that meets the documented journey. Do not add a
   dependency, CMS, animation library, tracker, or integration without recording
   benefit, cost, privacy/performance impact, and fallback.
4. Implement mobile-first and semantic-first. Essential content and navigation must
   render without client JavaScript; enhance progressively.
5. Test the changed behavior, failure state, keyboard path, responsive layout, and
   reduced-motion behavior. Run the complete quality suite before handoff.
6. Update documentation, evidence, environment-variable examples, content schema,
   and decision records in the same change as behavior.

## 3. Code conventions

- TypeScript strict mode; avoid `any`, unsafe assertions, hidden global state, and
  swallowed errors. Validate external/content/form data at boundaries.
- Server components by default; add `'use client'` at the smallest interaction
  boundary. Never expose a server secret through a public environment variable.
- Use semantic HTML before ARIA. Never add ARIA that contradicts native behavior.
  All controls need programmatic names, visible focus, keyboard behavior, and state.
- Use design tokens; do not scatter unexplained colors, spacing, z-index, easing, or
  breakpoints. Check contrast for every state and surface.
- Use framework image/font tooling, intrinsic dimensions, meaningful alt decisions,
  and optimized sources. A canvas/video must have an accessible static equivalent.
- Respect `prefers-reduced-motion`. Do not implement scroll hijacking, cursor
  replacement, autoplay audio, or navigation-blocking intros.
- Keep modules cohesive, names descriptive, imports static, and comments focused on
  why. Never put `try/catch` around imports.
- Keep PII out of URLs, analytics, client storage, telemetry, snapshots, fixtures,
  logs, and commits. Test submissions use reserved/example data.

## 4. Required project scripts

Maintain deterministic scripts for `lint`, `format:check`, `typecheck`, `test`,
`test:e2e`, and `build`, plus accessibility/performance/crawl checks once configured.
Pin runtime/package-manager versions and commit the lockfile. CI and local commands
must exercise the same configuration.

Minimum pre-handoff checks after scaffolding:

```bash
npm ci
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

Also run axe, Lighthouse/budget, link/crawl, header, and secret/dependency checks for
affected production templates. If a check cannot run, document the exact limitation
and do not call it a pass.

## 5. Pull request requirements

Include:

- user/business outcome and screenshots for perceptible UI changes at representative
  mobile and desktop widths;
- scope, routes/components affected, and brand/content decisions;
- tests with exact commands/results, manual accessibility checks, and browser/device
  coverage;
- before/after performance evidence for critical UI or media changes;
- privacy, security, SEO, migration, environment, dependency, and rollback impacts;
- known limitations/follow-ups with owner and severity.

Never commit secrets, production form data, personal information, generated build
output, or unlicensed assets. Ensure preview URLs are protected/noindex before
sharing.

## 6. Definition of done

A change is done only when its acceptance criteria are met; approved copy/assets are
used; loading/empty/error/success states work; keyboard, screen reader smoke,
responsive, zoom/reflow, and reduced motion are considered; automated checks pass;
performance/accessibility/security budgets do not regress; analytics contain no PII;
documentation and evidence are current; and rollback/migration effects are known.

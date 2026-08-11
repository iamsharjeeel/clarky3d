# Clarky3D complete overhaul implementation plan

## 1. Outcome and non-goals

### Outcome

A production-ready, Git-managed, Vercel-deployed marketing and portfolio site that:

- preserves approved Clarky3D brand identity and showcases media at high quality;
- communicates the offer and credibility quickly to prospective clients;
- supports discovery through structured project stories and technical SEO;
- converts qualified visitors through an accessible, reliable inquiry workflow;
- meets WCAG 2.2 AA and explicit performance/security quality gates;
- remains simple for agents and future maintainers to evolve.

### Non-goals until evidence supports them

- A visual rebrand, custom CMS, authenticated portal, ecommerce, multilingual site,
  blog, complex quote calculator, or continuous WebGL world.
- Fabricated testimonials, client lists, awards, results, locations, pricing, or
  response times.
- Migrating every legacy page regardless of quality or search value.
- Adding GoHighLevel or another CRM before consent, field mapping, ownership,
  failure handling, and data-retention expectations are documented.

## 2. Recommended architecture

Use **Next.js (current stable App Router) + TypeScript + React Server Components +
CSS Modules or Tailwind with CSS custom-property tokens**, deployed to Vercel.
Reconfirm current stable versions at scaffold time and pin them. Next.js is the
default because it provides image/font optimization, metadata, route handlers,
preview deployments, and a clean path to later CRM/CMS integrations. Astro is an
acceptable alternative only if the team documents equivalent form, image,
preview, metadata, and content workflows and the site remains predominantly static.

### Architecture rules

- Server-render/static-render primary content; client components only for genuine
  interaction. No SPA-only shell.
- Start with validated local content (`content/` typed data or MDX). Introduce a CMS
  only after editorial roles and update frequency justify its operational cost.
- Prefer native CSS and small utilities; avoid a large UI kit that dilutes brand.
- Use `next/image`/equivalent and `next/font` or licensed self-hosted fonts.
- Isolate optional 3D in a dynamically loaded component with a semantic/static
  sibling. Do not make canvas the only source of text, links, or project meaning.
- Put external integrations behind server-only adapters with typed interfaces so
  email/CRM providers can change without rebuilding the form UI.
- Validate environment variables at startup; expose only explicitly public values.

### Proposed repository shape

```text
app/
  (marketing)/page.tsx
  work/page.tsx
  work/[slug]/page.tsx
  services/page.tsx
  about/page.tsx
  contact/page.tsx
  api/contact/route.ts
  privacy/page.tsx
  accessibility/page.tsx
  not-found.tsx  error.tsx  layout.tsx  sitemap.ts  robots.ts
components/
  ui/  layout/  sections/  work/  forms/  media/
content/
  site.ts  services.ts  projects/  testimonials.ts
lib/
  analytics/  contact/  content/  metadata/  security/  validation/
public/
  images/  video/  fonts/  social/
styles/
  tokens.css  globals.css
tests/
  unit/  integration/  e2e/  accessibility/
docs/
  evidence/  decisions/  content-inventory.csv  redirect-map.csv
```

## 3. Evidence, discovery, and brand preservation

Complete before high-fidelity UI:

1. Capture the baseline specified in `AUDIT.md` and identify every route/template.
2. Inventory brand elements with screenshot/source references: logo variants and
   clearspace, colors, typefaces/licenses, composition, texture, iconography,
   language, imagery treatment, 3D/motion behavior, sound, and signature details.
3. Label each element `retain`, `refine`, `retire`, or `unknown`; explain refinement
   in terms of legibility, consistency, responsiveness, accessibility, or speed.
4. Create a content matrix: page/section, audience question, source copy, proposed
   copy, proof/source, owner, legal/privacy status, asset, alt text, and approval.
5. Map all old URLs to `keep`, `merge`, `redirect`, or `remove`. A removal that has
   traffic/backlinks should normally redirect to the closest relevant page, never
   blanket redirect to home.
6. Draft two mobile-first homepage directions using the same identity and content;
   choose through documented reasoning, not novelty.

## 4. Information architecture and page specifications

### Global shell

- Header: home/logo link, Work, Services, About, Contact, visually differentiated
  project CTA; skip link precedes it. Desktop and mobile states share labels/order.
- Footer: concise positioning, primary contact, navigation, social links with clear
  destinations, privacy, accessibility, copyright year, no fake newsletter.
- Global CTA language is consistent. Track placement, never personal data.
- Provide custom loading only where real latency exists; do not gate the site with
  a splash screen.

### Home `/`

1. Hero: approved positioning, support copy, primary/secondary action, representative
   optimized media, and static/reduced-motion fallback.
2. Selected work: 3–6 strong projects with title, service/category, cover, and clear
   link; curate rather than dump.
3. Capabilities: 3–5 buyer-oriented service summaries linked to proof/details.
4. Value/process: concise collaboration sequence and differentiators supported by
   actual evidence.
5. Trust: approved clients/testimonials or factual project evidence; omit rather
   than fabricate.
6. Contact CTA: expected next step and link to the inquiry form.

**Acceptance:** value and category are comprehensible without playing media; all
projects/actions work by keyboard; no mobile overflow; LCP asset is intentional.

### Work `/work`

- Intro explains scope. Responsive grid uses consistent metadata and purposeful
  aspect ratios. Filters exist only for populated, useful taxonomies.
- Entire card may be clickable using one semantic link; do not create duplicate
  tab stops. Hover/focus treatment cannot hide essential text.
- Empty/no-JS/error states remain useful; optional pagination or “load more” has a
  navigable URL and preserves history/focus.

### Project `/work/[slug]`

- Title, short summary, approved client/type, Clarky3D role/services, year/status,
  cover media, and optional credits.
- Narrative sections follow the evidence-backed brief/approach/output/outcome model.
- Media blocks support image, comparison, video, gallery, process note, quote, and
  caption, but editors use only blocks that add meaning.
- Related projects are manually relevant first, taxonomy fallback second. End with
  a next-project and contact route. Generate page/social metadata from typed content.

### Services `/services`

- Opening value statement; service sections name suitable problems, deliverables,
  collaboration inputs, relevant project, and CTA.
- Add process and concise, truthful FAQs. Price/timeline statements require approval
  and qualifiers. FAQ schema only if visible content and current search guidelines
  warrant it.

### About `/about`

- Real biography/studio description, relevant experience, values/working style,
  approved portrait/studio media, optional collaborators/credits, and CTA.
- Use actual first/third person consistently. Do not imply a large team if one does
  not exist.

### Contact `/contact`

- Intro, response expectation (only approved), direct email fallback, privacy link.
- Default fields: name, email, project summary, optional company, service interest,
  budget band, timeframe, and explicit marketing consent only if marketing exists.
  Explain why optional qualifiers help.
- Inline accessible validation; summary for multiple errors; pending state; safe
  retry; success confirmation; error fallback; no values in analytics/logs/URLs.
- Optional calendar/CRM embed loads only after privacy, accessibility, performance,
  and fallback review. Prefer a link or server integration over a blocking embed.

### Policy/system pages

- Privacy text must accurately describe processors, purpose, lawful basis where
  applicable, retention, rights/contact, and cookies—not a generic template claim.
- Accessibility statement names target, test date/method, known limitations, and a
  feedback route.
- `not-found` and error states preserve identity, explain recovery, and link to Work
  and Contact. Error telemetry contains no sensitive content.

## 5. Design system specification

Do not assign final brand values until inventory. Implement semantic tokens:

```css
:root {
  --color-bg: /* approved */;
  --color-surface: /* approved */;
  --color-text: /* approved, contrast verified */;
  --color-text-muted: /* contrast verified */;
  --color-brand: /* retained/refined brand color */;
  --color-accent: /* restrained action/accent */;
  --color-border: /* non-text contrast when essential */;
  --color-error: /* not sole error indicator */;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --radius-sm: /* derived from brand */;
  --radius-md: /* derived from brand */;
  --shadow-focus: 0 0 0 3px /* verified focus color */;
}
```

- Typography: one display and one body family maximum unless the current identity
  demonstrably needs more. Define fluid `step--1` through `step-5`, line heights,
  weights, letter spacing, fallback metrics, and max measure.
- Grid: fluid gutters, max content width, editorial text width, and 4/8/12-column
  responsive grid. Breakpoints respond to layout stress.
- Components: link, button, icon button, header/menu, project card, media, figure,
  service card, quote, accordion (if needed), input/select/textarea/checkbox, error
  summary, status, CTA panel, and footer.
- Document default, hover, focus-visible, active, disabled, loading, error, empty,
  high-contrast, reduced-motion, narrow, and long-content states.
- Motion tokens define duration/easing/distance. Reduced-motion removes nonessential
  transforms and crossfades immediately or minimally without hiding content.

Create a `/style-guide` development-only route or Storybook only if its maintenance
cost is justified. It must not be indexed or exposed in production navigation.

## 6. Content and data model

Use schema validation (for example Zod) at build time. Project fields:

```ts
type Project = {
  slug: string;
  title: string;
  summary: string;
  client?: string;       // only approved/public
  year?: number;
  services: string[];
  tags: string[];
  role: string;
  credits?: { name: string; role: string; url?: string }[];
  cover: Media;
  socialImage: string;
  featured: boolean;
  featuredOrder?: number;
  blocks: ContentBlock[];
  related?: string[];
  seo: { title?: string; description: string; noindex?: boolean };
};
```

`Media` requires source, intrinsic dimensions/aspect, alt (including intentionally
empty), caption/credit, rights status, focal point where needed, and optional poster
or transcript. Fail builds for duplicate slugs, missing required alt decisions,
broken relations, unapproved status, or invalid featured order.

## 7. Inquiry and integration design

1. Client form uses semantic HTML and shared validation messages, but the server is
   authoritative.
2. Route handler verifies origin/CSRF strategy, content type, size, schema, honeypot,
   and rate limit. Normalize email and strip unexpected fields.
3. Adapter sends to approved transactional email and optionally GoHighLevel. Store
   provider IDs/status rather than message body in operational logs.
4. Return stable generic responses; do not reveal provider details. Make duplicate
   submissions idempotent within a reasonable window where feasible.
5. Alert on delivery failures and test a synthetic non-PII submission regularly.
   Queue/retry or provide a safe fallback if the CRM is unavailable.
6. Document data flow, processors, retention/deletion, access owners, consent, and
   environment variables before production.

Test valid, malformed, oversized, bot, rate-limited, provider-failure, retry,
keyboard, screen-reader, slow-network, and JavaScript-degraded paths.

## 8. SEO, metadata, and migration implementation

- Central metadata factory defines title template, description, canonical, social
  image/alt, robots, and type; page content overrides intentionally.
- Generate sitemap from published content and robots rules by environment. Preview
  deployments must be protected and `noindex`.
- JSON-LD is serialized safely from validated visible data. Use stable absolute IDs.
- Create social images in a consistent brand template, keeping critical copy inside
  safe areas; supply fallback if dynamic generation fails.
- Maintain `docs/redirect-map.csv`: old URL, new URL, status, reason, owner, tested.
  Prefer single-hop 308/301. Preserve query parameters only when safe/needed.
- Crawl preview and production; test canonical host, status, indexability, internal
  links, assets, metadata uniqueness, sitemap parity, and structured data.

## 9. Performance implementation and budgets

- Establish baseline first, then attach Lighthouse JSON/waterfalls to the PR.
- CI performance gate for representative built pages: Performance ≥90,
  Accessibility ≥95, Best Practices ≥95, SEO ≥95 under agreed Lighthouse settings;
  additionally enforce Core Web Vitals and byte budgets from `AUDIT.md`. A score is
  diagnostic, not a substitute for field/manual testing.
- Measure the actual LCP element at each breakpoint. Never preload multiple hero
  candidates. Audit request priority and unused JavaScript/CSS.
- Transform originals during build/upload; retain archival masters outside served
  assets. Never serve multi-megabyte originals as thumbnails.
- Lazy-load below-fold video/3D, observe visibility, pause rendering, cap DPR, and
  provide `CanvasFallback` content. Test mid-tier Android and Safari/iOS, not only a
  developer laptop.

## 10. Security, privacy, and headers

Example policy direction—not copy/paste production values:

- CSP with `default-src 'self'`, narrow directives for images/fonts/connect/media,
  nonce/hash strategy where needed, `object-src 'none'`, `base-uri 'self'`,
  `form-action 'self'`, and `frame-ancestors 'none'`. Inventory providers first and
  deploy report-only before enforcement.
- HSTS only after all relevant subdomains are HTTPS-ready; add preload only after
  explicit operational review.
- `nosniff`, strict referrer policy appropriate to analytics/referrals, deliberate
  permissions policy, secure/same-site/httpOnly cookies where applicable.
- Run dependency audit, secret scan, static analysis, and header scan in CI or a
  scheduled workflow. Triage severity/exploitability; do not blindly apply breaking
  upgrades.

## 11. Test strategy and release gates

### Automated

- ESLint, formatting check, strict TypeScript, production build.
- Unit: content schemas, metadata, URL builders, form validation, adapter errors.
- Integration: contact endpoint/rate limiting, sitemap/robots, published content.
- Playwright: navigation, project browse, contact validation/success/failure, 404,
  mobile menu, keyboard journey, reduced motion, no-JS essential content.
- axe on every page template and component state; HTML validation where useful.
- Link/crawl check, visual regression at agreed breakpoints, Lighthouse CI, bundle
  budgets, dependency/secret scanning.

### Manual release matrix

- Current Chrome, Firefox, Safari, and Edge; iOS Safari and Android Chrome.
- 320/360/768/1024/1440 widths; portrait/landscape; 200% and 400% zoom/reflow.
- Keyboard-only, VoiceOver or NVDA smoke, reduced motion, high contrast/forced
  colors, text spacing, slow connection, blocked third-party scripts.
- Every form state and real delivery route; email formatting; spam and rate limit.
- Content proofread, asset rights/credits, legal text approval, redirects, social
  previews, favicon/manifest, analytics consent and event debugging.

### Hard launch gates

No known critical/high security issue; no axe serious/critical issue on a core
journey; no keyboard blocker; no invented/unapproved claim; successful production-
like lead delivery; valid rollback; redirects/canonical/crawl controls tested; no
secrets or PII in client bundles, logs, analytics, or repository.

## 12. Milestones and deliverables

### M0 — Evidence and decisions

Baseline captures, content/asset/brand inventory, route map, analytics/data map,
risks, and architecture decision records. **Exit:** unknowns are recorded with
owners; preservation list and scope approved.

### M1 — Foundation

Scaffold pinned stack, CI, tokens, global shell, metadata helpers, content schemas,
preview protection, error handling, and test harness. **Exit:** build/lint/typecheck/
unit/e2e smoke pass; core components keyboard/accessibility reviewed.

### M2 — Content experience

Home, work, project, services, about, policy/system pages; optimized migrated media;
responsive design and optional progressive 3D. **Exit:** all approved content and
templates work across matrix with no critical accessibility/performance regression.

### M3 — Conversion and integration

Contact workflow, email/CRM adapter, privacy/consent, analytics events, delivery
alerts. **Exit:** end-to-end production-like tests pass without PII leakage.

### M4 — Migration and launch

Redirects, sitemap/robots/schema, full crawl, visual/content/legal approval, DNS and
rollback runbook, production deployment. **Exit:** domain/cert/redirects/forms/
monitoring verified and legacy deployment retained for rollback window.

### M5 — Stabilization

Monitor errors, uptime, delivery, Web Vitals, indexing and conversions at 24 hours,
7 days, and 30 days; fix regressions; close or schedule residual risks. Do not make
premature conversion claims from insufficient data.

## 13. Vercel launch and rollback runbook

1. Freeze content; export/retain old site and DNS; lower DNS TTL ahead of launch if
   operationally useful.
2. Verify production environment variables, provider restrictions, preview noindex/
   protection, and Vercel project ownership.
3. Deploy immutable candidate; run full gates against its production-like URL.
4. Add domain, verify apex/`www` canonical redirect and TLS, then switch DNS.
5. Immediately test representative old URLs, home/project/contact, live email/CRM,
   headers, robots/sitemap/canonical, analytics consent, and monitoring.
6. If critical journey, delivery, security, or indexing control fails, restore the
   previous Vercel deployment/DNS per recorded decision; communicate status; retain
   evidence. Never improvise DNS changes without recording old values.

## 14. Definition of success

- Visitors can identify offering, evidence, and next action in a five-second
  comprehension test with target-audience participants.
- Every featured claim/project/media item is approved, credited, and maintainable.
- All release gates and performance budgets pass or have an explicit, time-bounded,
  owner-approved exception with user impact documented.
- Qualified inquiries are delivered and observable without collecting unnecessary
  data. Funnel events are reliable and privacy-respecting.
- A maintainer can add a project, update service copy, preview, test, and deploy
  through documented Git workflow without editing unrelated code.

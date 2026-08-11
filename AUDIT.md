# Clarky3D website audit

**Audit date:** 2026-08-11  
**Target:** `https://clarky3d.com/`  
**Purpose:** presales expert review and implementation brief for a conversion-led,
brand-faithful overhaul  
**Confidence:** provisional until live/source evidence capture is completed

## 1. Executive assessment

Clarky3D should become a focused lead-generation portfolio: visitors should
understand what Clarky3D does, who it helps, why the work is credible, and how to
start a conversation within one short scan. Rich 3D work can remain the visual
signature, but must not compete with comprehension, keyboard access, motion
preferences, mobile stability, or load performance.

The recommended overhaul is not an ungrounded rebrand. Preserve verified brand
assets, visual motifs, voice, and strongest work; rebuild the information
hierarchy, case-study storytelling, calls to action, accessibility, technical
delivery, measurement, and maintainability around them.

### Highest-value opportunities

1. **Clarify positioning:** one concrete headline, supporting outcome, audience
   cue, primary CTA, and representative work above the fold.
2. **Turn imagery into evidence:** structured case studies should explain brief,
   role, constraints, solution, deliverables, and approved outcomes—not merely show
   a gallery.
3. **Create a trustworthy conversion path:** persistent but restrained CTA,
   expectations around response/process, low-friction form, and alternatives.
4. **Make visual ambition resilient:** responsive images/video, explicit sizing,
   poster frames, reduced-motion behavior, and static fallbacks for WebGL/3D.
5. **Establish technical fundamentals:** semantic rendering, metadata, schema,
   sitemap, canonical URLs, security headers, privacy-aware analytics, automated QA,
   and a safe Vercel launch process.

## 2. Evidence and limitations

### What was verified

- The supplied repository contained only a one-line `README.md` and Git metadata;
  there was no application source to inspect.
- Requests to the public URL from the audit environment were rejected by the
  environment's outbound proxy with `HTTP/1.1 403 Forbidden` and `CONNECT tunnel
  failed`. This is **not evidence that the public website itself returns 403**.
- No analytics, Search Console, CRM, hosting, source, customer research, brand
  guide, content inventory, or legal requirements were supplied.
- Git/Vercel and a modern code-first build are the stated deployment preference.

### What was not verified

Visual design, copy, routes, DOM semantics, responsive behavior, forms, cookies,
headers, robots directives, structured data, page weight, Core Web Vitals,
accessibility defects, indexed pages, and third-party scripts remain
`TBD-EVIDENCE`. This audit therefore avoids fabricating scores or claiming a defect
exists where it has not been observed.

### Mandatory evidence capture before design

Once access or source exists, create `docs/evidence/YYYY-MM-DD/` and save:

1. Full-page screenshots at 360×800, 768×1024, 1440×900, and 1920×1080 for every
   indexable template, plus navigation, modal, form error/success, and 404 states.
2. A route/content/asset inventory including titles, descriptions, headings,
   canonical, indexability, status, word count, media owner/license, and migration
   decision.
3. Lighthouse mobile and desktop JSON; WebPageTest or equivalent waterfall for
   home, work index, heaviest project, and contact.
4. axe results plus manual keyboard, screen-reader smoke, zoom/reflow, contrast,
   reduced-motion, and forced-colors checks.
5. `curl -I`, redirect-chain, TLS, CSP, cookie/storage, form endpoint, dependency,
   robots.txt, sitemap.xml, and structured-data evidence.
6. Search Console/analytics export if later available. Never infer conversion or
   traffic performance from visual inspection.

Suggested baseline commands (adapt URL list as discovered):

```bash
curl -sSIL https://clarky3d.com/
curl -sS https://clarky3d.com/robots.txt
curl -sS https://clarky3d.com/sitemap.xml
npx lighthouse https://clarky3d.com/ --preset=desktop --output=json --output-path=./lighthouse-desktop.json
npx lighthouse https://clarky3d.com/ --form-factor=mobile --output=json --output-path=./lighthouse-mobile.json
npx @axe-core/cli https://clarky3d.com/
```

## 3. Audience, intent, and journey hypothesis

Until discovery proves otherwise, design for a prospective buyer who has limited
time, may not understand production terminology, and needs confidence that
Clarky3D can deliver suitable visual work reliably.

### Primary jobs to be done

- Determine in seconds whether the offering fits the visitor's need.
- Judge craft and relevance through comparable work.
- Understand services, deliverables, process, and collaboration expectations.
- Resolve risk questions: capability, ownership, revisions, timeline, and contact.
- Send a useful inquiry without completing an intimidating questionnaire.

### Proposed funnel

`Landing/search/referral → positioning → selected work → relevant case study →
process/services/trust → inquiry → confirmation → human follow-up`

Do not optimize only the homepage. Each case study is a landing page and must
carry context, navigation, related work, and a next step.

## 4. Heuristic audit and recommendations

The findings below are requirements/hypotheses pending evidence, labeled by
priority: **P0** launch blocker, **P1** high value, **P2** improvement, **P3** test.

### 4.1 Positioning and information architecture

- **P1 — Specify one primary promise.** Avoid generic phrases such as “bringing
  ideas to life.” State the actual service/category, audience or use case, and
  differentiating value in plain language. Validate wording with the owner.
- **P1 — Use a shallow navigation.** Default to `Work`, `Services`, `About`, and
  `Contact`; put a clear “Start a project” action at the end. Add `Process` only if
  it contains substantive buying information.
- **P1 — Make Work the proof layer.** Allow scanning by useful, content-backed
  categories; do not add empty or overlapping filters.
- **P2 — Answer buying questions near intent.** Put concise process and FAQ content
  beside services/contact instead of hiding it in a generic footer.
- **P2 — Use breadcrumbs on project detail only when hierarchy merits them.** Keep
  labels human-readable and include structured data.

### 4.2 Homepage

- **P1:** Hero contains brand mark/navigation, one H1, one short support paragraph,
  primary CTA (“View selected work” or “Start a project”), optional secondary CTA,
  and optimized representative media with a safe fallback.
- **P1:** Follow with selected projects that show category/role, not unexplained
  thumbnails. Cards must be links with visible focus and meaningful names.
- **P1:** Explain services and deliverables in buyer language; never claim
  capabilities that source material cannot substantiate.
- **P1:** Establish trust using approved client names, real testimonial attribution,
  process transparency, or specific project evidence. Never invent social proof.
- **P2:** End with a concise conversion panel describing what happens after contact.
- **P3:** Use an interactive 3D hero only if it materially communicates the work and
  remains performant; otherwise choose a compressed reel/still.

### 4.3 Portfolio and case studies

- **P1:** Every featured project needs title, client/project type, service/role,
  year (if approved), cover, accessible description, and coherent ordering.
- **P1:** Case-study narrative: overview → challenge/brief → responsibilities →
  approach/process → delivered work → approved outcome → next project/CTA.
- **P1:** Separate Clarky3D's contribution from collaborators' work and credit them.
- **P1:** Do not publish confidential metrics, client assets, or unlicensed media.
- **P2:** Preserve media aspect ratios, provide zoom only when useful, and avoid
  carousel-only access. Captions should explain why an image matters.
- **P2:** Filters update results accessibly, work without JavaScript where feasible,
  announce counts, preserve a useful URL if indexable, and offer a reset.

### 4.4 Services, process, about, and contact

- **P1:** Services describe problems solved, typical deliverables, inputs needed,
  and a relevant proof link. Avoid unsupported claims and arbitrary package prices.
- **P1:** Process explains discovery, scope/proposal, production/review, delivery,
  and post-delivery expectations without promising fixed timelines universally.
- **P1:** About provides a real identity, relevant expertise, working style, and
  appropriately licensed portrait/studio imagery—not a long autobiography.
- **P0:** Contact form has visible labels; name, email, project summary, and consent
  are sufficient defaults. Company, service interest, budget band, and target date
  may be optional when commercially useful.
- **P0:** Server validates and sanitizes input, rate-limits/spam-protects, sends no
  secrets to the browser, handles delivery failure, and provides an accessible
  success state without losing the submission unexpectedly.
- **P1:** Confirmation states response expectation without an unapproved guarantee
  and offers a direct email alternative.

### 4.5 Visual design and brand continuity

- **P1:** Inventory exact logos, palette, typefaces/licenses, iconography, imagery,
  motion language, voice, and recurring motifs before changing them. Mark each as
  `retain`, `refine`, `retire`, or `unknown` with rationale and approval.
- **P1:** Preserve distinctive identity at token level; improve contrast, hierarchy,
  rhythm, responsive behavior, and consistency rather than defaulting to a generic
  agency aesthetic.
- **P1:** Use a restrained type scale and readable measure (roughly 45–75 characters
  for body copy), generous project imagery, and consistent alignment/grid rules.
- **P1:** Build light/dark surfaces only if both are intentional and contrast-safe.
  Never put copy on visually busy imagery without a robust scrim or separate panel.
- **P2:** Motion reinforces depth, causality, or navigation. Avoid scroll hijacking,
  cursor replacement, perpetual ambient motion, and delayed controls.
- **P2:** Icons supplement—not replace—text for unfamiliar actions. Maintain one
  family and provide accessible names where controls are icon-only.

### 4.6 Responsive and interaction behavior

- **P0:** All core tasks work at 320 CSS px width, 200% zoom, and keyboard-only.
- **P1:** Design content-driven breakpoints rather than device-specific layouts.
- **P1:** Use at least 44×44 CSS px touch targets where practical, visible focus,
  no hover-only information, and no horizontal page overflow.
- **P1:** Mobile navigation has correct dialog/disclosure semantics, focus handling,
  Escape behavior, background isolation, and scroll restoration.
- **P1:** Reserve media dimensions to prevent layout shift. Mobile gets intentionally
  cropped art direction or preserved imagery, not accidental desktop clipping.

### 4.7 Accessibility (WCAG 2.2 AA target)

- **P0:** Semantic landmarks, logical heading hierarchy, one descriptive page H1,
  skip link, meaningful link text, and valid control names/roles/states.
- **P0:** Full keyboard operation with visible `:focus-visible`; no focus traps,
  positive `tabindex`, keyboard-inaccessible canvas, or unexpected focus changes.
- **P0:** Text contrast ≥4.5:1 (≥3:1 for large text); UI/focus/non-text essential
  contrast ≥3:1. Verify tokens and image overlays in actual states.
- **P0:** Every informative image has useful alt text; decorative images use empty
  alt; complex 3D/video receives adjacent equivalent description; logo link names
  the homepage without redundant wording.
- **P0:** Form errors are associated, summarized when useful, announced, specific,
  and do not rely on color. Preserve entered values and move focus appropriately.
- **P0:** Honor `prefers-reduced-motion`; pause/stop controls for relevant animation;
  no harmful flashes; autoplay video muted and pausable; captions/transcripts where
  speech or meaningful audio exists.
- **P1:** HTML `lang`, reflow, text spacing, target size, consistent help, status
  messages, forced-colors, and screen-reader reading order receive manual testing.
- **P1:** Accessibility statement includes contact route and honest known issues;
  do not claim conformance solely from automated tools.

### 4.8 Content and editorial quality

- **P1:** Write for scanning: descriptive headings, short paragraphs, front-loaded
  meaning, concrete verbs, and consistent terminology.
- **P1:** Replace unsupported superlatives with proof. Validate names, dates, roles,
  outcomes, quotes, licenses, and link destinations with the owner.
- **P1:** Define voice traits from existing approved material (for example precise,
  imaginative, approachable) before rewriting. Preserve recognizable phrasing where
  clear and accurate.
- **P2:** Maintain a content owner, last-reviewed date, expiry trigger, and fallback
  for every project/testimonial/service. Avoid “latest” labels that age poorly.
- **P2:** Create custom 404 and error content with recovery paths and no blame.

### 4.9 Search and discoverability

- **P0:** Exactly one canonical HTTPS host; intentional redirect map; no chains,
  loops, soft 404s, orphan routes, or staging indexation.
- **P0:** Unique, descriptive title and meta description; canonical; index directive;
  social image; and renderable primary content on every indexable route.
- **P0:** Generate valid `robots.txt` and XML sitemap containing only canonical,
  indexable 200 pages. Exclude previews, form confirmations, and internal search.
- **P1:** Use `Organization`/appropriate business entity, `WebSite`, `BreadcrumbList`,
  and relevant `CreativeWork`/`VisualArtwork` schema only for visible, truthful
  data. Validate it; schema does not guarantee rich results.
- **P1:** Create useful project copy, alt text, internal links, and stable slugs.
  Avoid keyword stuffing and thin tag archives.
- **P1:** Set useful Open Graph/Twitter metadata with approved 1200×630 imagery.
- **P2:** Add RSS only if publishing recurs; local SEO only if there is a genuine
  service area/address strategy. Do not manufacture location pages.

### 4.10 Performance and resilience

- **P0 target at p75 field data:** LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1.
- **P1 lab budgets on representative mobile:** ≤180 KB initial compressed JS,
  ≤100 KB critical CSS, ≤1.5 MB initial route transfer, ≤2 font files initially,
  and no unexpected third-party blocking requests. Deviations require evidence.
- **P1:** Use responsive AVIF/WebP with sizes/srcset, explicit dimensions, sensible
  quality, priority only for the true LCP image, and lazy loading below the fold.
- **P1:** Video has optimized poster, no needless preload, adaptive/appropriately
  encoded sources, controls when needed, and a still fallback.
- **P1:** Dynamically load WebGL/Three.js outside critical rendering; cap pixel ratio;
  stop rendering offscreen/in background; handle lost context, low-power devices,
  reduced motion, and failed loading. Never block navigation on an intro sequence.
- **P1:** Self-host licensed subset fonts where beneficial; preload only critical
  font; use `font-display: swap`; provide metrics-compatible fallbacks.
- **P2:** Cache immutable hashed assets for one year; keep HTML/revalidation suitable
  for update cadence; test cold and warm paths under CPU/network throttling.

### 4.11 Security, privacy, and operations

- **P0:** Use maintained dependencies, lockfile, automated dependency review, secret
  scanning, least-privilege tokens, and separate preview/production secrets.
- **P0:** Configure HTTPS/HSTS after host validation; CSP (start report-only),
  `X-Content-Type-Options: nosniff`, deliberate `Referrer-Policy`, restrictive
  `Permissions-Policy`, and frame protection via CSP `frame-ancestors`.
- **P0:** Validate contact input server-side; rate limit; use honeypot and/or
  privacy-conscious challenge; escape output; protect email delivery; log failures
  without form content/PII. CSRF protection must match the chosen submission model.
- **P0:** Publish accurate privacy/cookie information before collecting analytics or
  leads. Collect minimum data, define retention/access, avoid preselected marketing
  consent, and load nonessential trackers only under the applicable consent regime.
- **P1:** Keep analytics first-party/privacy-conscious where possible. Redact query
  strings and never capture form values, email addresses, or session replay without
  explicit legal/product review.
- **P1:** Add error monitoring, uptime monitoring, form-delivery alerting, and a
  tested rollback. Assign owners; alerts without ownership are not controls.
- **P1:** Configure `www`/apex redirects, DNS, Vercel protection for previews, and
  environment isolation. Remove obsolete DNS records after a safe transition.

### 4.12 Analytics and conversion measurement

Define events before implementation and test them in preview:

| Event | Trigger | Properties (non-PII) |
| --- | --- | --- |
| `cta_select` | Meaningful CTA activated | `cta_name`, `placement`, `destination` |
| `project_view` | Project content intentionally viewed | `project_slug`, `source` |
| `contact_start` | First valid interaction with form | `source_page` |
| `contact_error` | Validation/submission failure | `error_type`, never field value |
| `contact_submit` | Server confirms accepted submission | `service_interest`, if coarse |
| `external_link` | Approved outbound destination | `destination_type` |

Primary KPI: qualified inquiries and inquiry completion rate. Supporting signals:
project-to-contact progression, form errors, CTA use, organic landing engagement,
and Core Web Vitals. Treat early small samples cautiously; do not use invasive
tracking to compensate for insufficient traffic.

## 5. Prioritized action register

| ID | Priority | Action | Acceptance evidence |
| --- | --- | --- | --- |
| A01 | P0 | Capture live/source baseline and brand/content inventory | Evidence folder, route sheet, screenshots, automated and manual results |
| A02 | P0 | Validate owner, claims, media rights, privacy and contact handling | Approval record and content provenance |
| A03 | P1 | Approve positioning, IA, and key journeys | Content outline and mobile/desktop wireframes |
| A04 | P1 | Build accessible tokenized design system preserving brand | Token sheet, component states, contrast checks |
| A05 | P1 | Implement home/work/project/services/about/contact/error routes | Acceptance checklist and responsive screenshots |
| A06 | P0 | Implement secure, reliable inquiry path | Server tests, spam/rate-limit evidence, delivery monitoring |
| A07 | P0 | Meet WCAG 2.2 AA release gate | axe clean on critical pages plus manual audit record |
| A08 | P1 | Meet performance budgets and 3D fallbacks | Lighthouse JSON, waterfall, real-device checks |
| A09 | P0 | Implement metadata, crawl controls, schema and redirects | Crawl report, validators, redirect test |
| A10 | P0 | Add security/privacy controls and environment isolation | Header scan, data map, consent test, secret scan |
| A11 | P1 | Add privacy-safe conversion analytics and monitoring | Debug evidence; synthetic form/uptime alerts |
| A12 | P0 | Run migration, preview QA, approval, rollback-aware launch | Signed checklist, backups, DNS/rollback plan |

## 6. Audit conclusion

The strategic direction is clear even though live-site defects cannot responsibly
be asserted from this environment: preserve the recognizable Clarky3D identity,
make the offer immediately legible, convert visual work into buyer-relevant proof,
create a trustworthy inquiry journey, and ship it on a measurable, accessible,
secure, performance-budgeted foundation. The evidence capture in A01 is a hard gate:
it will turn this provisional expert framework into a page-specific remediation
record without erasing the existing brand by assumption.

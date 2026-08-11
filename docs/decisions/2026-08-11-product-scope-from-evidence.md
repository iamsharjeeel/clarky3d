# ADR: Align implementation scope with live catalogue evidence

**Date:** 2026-08-11  
**Status:** accepted (see also `2026-08-11-owner-defaults.md`)

## Context

Pre-access audit/plan hypothesized a services/portfolio lead-gen site. Live evidence (2026-08-11) shows:

- made-to-order 3D print catalogue;
- categories Hotwheels, Retro Gaming, Misc Items, Pep Things;
- filament library;
- cart → Telegram order to `@Clarky_AU`;
- admin on Netlify Identity;
- no public HTML contact form, privacy page, or accessibility statement.

## Decision

1. Overhaul is a **brand-faithful catalogue rebuild**, not an agency portfolio.
2. Routes: `/`, `/work`, `/work/[slug]`, `/colours`, `/contact`, `/about`, `/privacy`, `/accessibility`.
3. Conversion: Telegram (live-parity) **and** secure enquiry form.
4. Do not invent services, testimonials, case-study outcomes, or studio claims.
5. Preserve `/?p=` URLs via 308 redirects to `/work/[slug]`.

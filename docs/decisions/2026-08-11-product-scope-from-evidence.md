# ADR: Align implementation scope with live catalogue evidence

**Date:** 2026-08-11  
**Status:** proposed — **requires owner confirmation before M2 copy/IA freeze**

## Context

Pre-access audit/plan hypothesized a services/portfolio lead-gen site. Live evidence (2026-08-11) shows:

- made-to-order 3D print catalogue;
- categories Hotwheels, Retro Gaming, Misc Items, Pep Things;
- filament library;
- cart → Telegram order to `@Clarky_AU`;
- admin on Netlify Identity;
- no public HTML contact form, privacy page, or accessibility statement.

## Decision (engineering default until owner overrides)

1. Treat the overhaul as a **brand-faithful catalogue rebuild** with progressive enhancement, not a greenfield agency portfolio.
2. Map plan routes pragmatically:
   - `/` featured home (retain intent)
   - `/work` or `/catalogue` → category/product index (name TBD with owner)
   - `/work/[slug]` → product detail
   - `/colours` → filament library
   - `/contact` → only if owner wants an alternative to Telegram; otherwise document Telegram as primary CTA
   - `/privacy`, `/accessibility` → create with accurate processors once approved
3. Do **not** invent services, testimonials, case-study outcomes, or studio claims absent in source material.
4. Preserve all `/?p=` sitemap URLs via redirect map when slugs change.

## Owner questions

- Keep Telegram-only checkout, add email/form, or both?
- Public name for `Vial_Storage` / “Pep Things”?
- Any products that must not migrate (compliance, confidentiality, pricing)?
- Is `print.clarkyau.com` retired?

## Consequences if rejected

If the owner wants a services portfolio instead, M2 content must wait for approved positioning, project list, and rights — M1 foundation can still proceed with tokens/schemas.

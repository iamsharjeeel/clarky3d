# ADR: Use Next.js on Vercel for the overhaul

**Date:** 2026-08-11  
**Status:** accepted for M1 scaffold (revisit if owner rejects catalogue scope)

## Context

Live `clarky3d.com` is a Netlify React SPA catalogue with API JSON, Telegram checkout, and no server-rendered body content. `IMPLEMENTATION_PLAN.md` defaults to Next.js unless Astro is materially simpler.

## Decision

Scaffold the replacement in **Next.js (App Router) + TypeScript on Vercel**.

## Why not Astro

Astro could render static catalogue pages, but the live product requires:

- product configurator + cart state;
- server-safe future contact/CRM adapters;
- metadata per product from typed content;
- preview deployments and route handlers.

Next.js covers these without a second integration story. Astro remains acceptable only if the owner later freezes the site to mostly static pages with a trivial order link and documents equivalent workflows.

## Consequences

- Server Components by default; client islands for cart/configurator only.
- Content starts as validated local data shaped like the live catalogue (products, filaments, settings), not invented case studies.
- Telegram adapter can remain the first conversion backend; HTML form/CRM is optional pending owner decision.

# ADR: Engineering defaults for open owner questions

**Date:** 2026-08-11  
**Status:** accepted as shipping defaults (owner may override)

These choices follow live-site evidence. They do not invent new business facts.

| Question | Default | Why |
| --- | --- | --- |
| Catalogue vs agency portfolio | **Catalogue + Telegram/order form** | Live site is a made-to-order print catalogue; no services/case-study content exists |
| Telegram vs form | **Both** — Telegram primary (live behavior); HTML enquiry as accessible fallback | Live conversion is Telegram; form adds resilience without replacing chat |
| Telegram handle | **`Clarky_AU`** when env unset | Observed on live order links (`t.me/Clarky_AU`) |
| “Pep Things” label | **Retain** public title for `Vial_Storage` | Live bootstrap `displayName`; no alternate approved name |
| Product set / prices | **Migrate all 16 captured products as-is** | Present on live sitemap/API; no evidence any must be withheld |
| `print.clarkyau.com` | **Retire for the new site** | DNS NXDOMAIN; new canonical/sitemap/robots use `clarky3d.com` only |
| Brand system | **Retain** dark/cyan retro-tech identity; **refine** muted/theme contrast | Evidence + axe findings |
| Favicon | **Ship provisional Clarky “C” mark** | Live `/favicon.svg` was a Cursor logo — must not ship |
| Product photos | **Ship with `rightsStatus: unknown` + on-page notice** | Needed for catalogue UX; production launch still carries rights risk until cleared |
| Privacy copy | **Ship accurate interim notice of actual processors** | Describes Vercel host, optional Resend, optional Telegram exit, no invented legal basis |
| CRM / GoHighLevel | **Do not integrate** | No mapping, consent, or credentials supplied |
| Analytics | **No third-party tracker enabled** | Optional later after privacy review; CustomEvent bus only |

## Residual risks the owner still owns

1. Confirming photography/model licenses for `public/images/products/`.
2. Legal review of the interim privacy notice (lawful basis, retention, rights language).
3. Any product that must be removed for compliance/confidentiality.
4. Production secrets (`RESEND_*`, domain DNS) and named on-call owner.

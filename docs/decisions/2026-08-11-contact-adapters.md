# ADR: Contact delivery adapters

**Date:** 2026-08-11  
**Status:** accepted for M3

## Decision

Expose `/api/contact` with Zod validation, honeypot, origin check, and in-memory
rate limiting. Delivery goes through `ContactAdapter`:

1. `ResendContactAdapter` when `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and
   `CONTACT_TO_EMAIL` are set.
2. Otherwise `MemoryContactAdapter` (records non-PII metadata only) so local/CI
   tests can pass without production credentials.

Telegram remains a parallel CTA via env-configured handle. No GoHighLevel/CRM
adapter ships until field mapping, consent, retention, and credentials are
supplied by the owner.

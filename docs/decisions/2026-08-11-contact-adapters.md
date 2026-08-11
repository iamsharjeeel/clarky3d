# ADR: Contact delivery adapters

**Date:** 2026-08-11  
**Status:** accepted for M3

## Decision

Expose `/api/contact` with Zod validation, honeypot, origin check, and in-memory
rate limiting. Delivery goes through `ContactAdapter`:

1. `ResendContactAdapter` when `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and
   `CONTACT_TO_EMAIL` are set.
2. `MemoryContactAdapter` (records non-PII metadata only) when development or CI
   explicitly uses `CONTACT_DELIVERY_MODE=memory`.
3. Otherwise production fails closed with a delivery error. It must never tell a
   visitor that an enquiry was received when no durable provider can deliver it.

Requests are restricted to JSON or URL-encoded form bodies and a 16 KiB boundary.
The Resend adapter has a ten-second timeout and maps network failures to the stable
generic delivery error returned by the route.

Telegram remains a parallel CTA via env-configured handle. No GoHighLevel/CRM
adapter ships until field mapping, consent, retention, and credentials are
supplied by the owner.

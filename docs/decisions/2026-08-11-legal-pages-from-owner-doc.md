# ADR: Branded Privacy, Terms, and SMS Terms from owner document

**Date:** 2026-08-11  
**Status:** accepted (owner-supplied copy; counsel review still recommended)

## Context

Owner provided a Google Doc template containing Privacy Policy, Terms and Conditions, and
mobile messaging (SMS) terms with contact email `xpozandgro@gmail.com` and phone
`+1 (480) 257-6030`, governing law United States.

## Decision

1. Publish three site routes branded for Clarky3D / `https://clarky3d.com`:
   - `/privacy` — Privacy Policy
   - `/terms` — Terms and Conditions (site use + pointer to SMS program)
   - `/sms-terms` — Mobile Messaging Terms (SMS program detail split from the doc for clarity)
2. Fill template blanks with Clarky3D and clarky3d.com; replace the stray
   “Best Performance Roofing” device definition with Clarky3D.
3. Link footer, contact page, and form consent to all three policies.
4. Keep contact details exactly as supplied in the owner document.

## Consequences

- Replaces the earlier interim processor-only privacy stub.
- Residual risk: template language (GDPR/CCPA, payment, HR, cookies) may not match
  actual processing; owner should confirm with counsel before production cutover.

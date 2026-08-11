# Launch runbook — Clarky3D on Vercel

## Preconditions
- [ ] Owner approved brand retain/refine list and favicon
- [ ] Media rights cleared or unknown assets removed
- [ ] Privacy copy approved (replace draft)
- [ ] `print.clarkyau.com` retire/restore decision recorded
- [ ] Production env vars set in Vercel:
  - `NEXT_PUBLIC_SITE_URL=https://clarky3d.com`
  - `SITE_URL=https://clarky3d.com`
  - `NEXT_PUBLIC_TELEGRAM_ORDER_HANDLE` (if used)
  - `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` (if form delivery live)
- [ ] Preview deployments protected + noindex verified
- [ ] Legacy Netlify site retained for rollback window

## Deploy steps
1. Merge release PR; confirm CI green.
2. Deploy production candidate on Vercel (immutable).
3. Run smoke against production URL (not custom domain yet):
   - `/`, `/work`, one product, `/colours`, `/contact` form (example.com data)
   - `/?p=Hotwheels/Display_Racks/5x1_Rack` → `/work/5x1-rack` (308)
   - `/robots.txt`, `/sitemap.xml`, security headers
4. Attach `clarky3d.com` + `www`; confirm apex canonical and TLS.
5. Lower/raise DNS as needed; keep old values documented.
6. Immediate post-cutover checks (same as step 3 on public host).
7. Watch form delivery + error logs for 24h.

## Rollback
1. Revert Vercel production deployment to previous successful deploy **or**
2. Point DNS back to prior Netlify targets recorded before cutover.
3. Keep redirect map and this runbook for incident notes.

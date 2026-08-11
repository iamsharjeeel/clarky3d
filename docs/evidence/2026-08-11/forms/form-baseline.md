# Form / conversion baseline — 2026-08-11

- Public catalogue pages: **no HTML `<form>` elements** (DOM inventory).
- Conversion: cart drawer builds Telegram URL `https://t.me/Clarky_AU?text=...` with product lines, colour parts, totals, shipping note “to be confirmed/calculated”.
- Evidence: `../crawl/cart-state.json`, screenshot `../screenshots/cart-open--1440x900.png`.
- Admin: separate app; Netlify Identity implied; not exercised with credentials (none supplied).
- No server contact endpoint (`/api/contact` → SPA 404 HTML).
- Implication for M3: either wrap Telegram as documented adapter or add approved server form; do not invent CRM fields.

import type { SiteSettings } from "@/lib/content/schemas";

export const siteSettings = {
  brandName: "Clarky3D",
  tagline: "made-to-order 3D prints",
  landingIntro:
    "I'm always adding new products, so keep an eye out for new additions.\nCheckout the latest releases below or checkout the catalogue above.",
  landingSubtext: "All items are print on demand.",
  currencyLabel: "AUD",
  telegramHandleObserved: "Clarky_AU",
} as const satisfies SiteSettings;

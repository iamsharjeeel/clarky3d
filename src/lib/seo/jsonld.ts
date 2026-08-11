import { getSiteSettings } from "@/lib/content/load";
import { getSiteUrl } from "@/lib/env";
import type { Product } from "@/lib/content/schemas";

export function websiteJsonLd() {
  const site = getSiteSettings();
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.brandName,
    url,
    description: `${site.brandName} — ${site.tagline}`,
  };
}

export function organizationJsonLd() {
  const site = getSiteSettings();
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brandName,
    url,
    description: `${site.brandName} — ${site.tagline}`,
  };
}

export function productJsonLd(product: Product) {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.seo.description,
    url: `${url}/work/${product.slug}`,
    image: product.photos.map((photo) => `${url}${photo.src}`),
    offers: {
      "@type": "Offer",
      priceCurrency: "AUD",
      price: product.priceAud,
      availability: "https://schema.org/PreOrder",
    },
  };
}

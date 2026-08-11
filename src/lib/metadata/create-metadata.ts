import type { Metadata } from "next";
import { getSiteUrl, shouldNoIndex } from "@/lib/env";
import { getSiteSettings } from "@/lib/content/load";

type CreateMetadataInput = {
  title?: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  ogImagePath?: string;
};

export function createMetadata({
  title,
  description,
  path = "/",
  noIndex,
  ogImagePath = "/favicon.svg",
}: CreateMetadataInput): Metadata {
  const site = getSiteSettings();
  const siteUrl = getSiteUrl();
  const url = new URL(path, `${siteUrl}/`).toString();
  const indexable = !(noIndex || shouldNoIndex());

  return {
    metadataBase: new URL(siteUrl),
    title: title
      ? {
          absolute: `${title} — ${site.brandName}`,
        }
      : {
          default: site.brandName,
          template: `%s — ${site.brandName}`,
        },
    description,
    alternates: { canonical: url },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: "website",
      siteName: site.brandName,
      title: title ? `${title} — ${site.brandName}` : `${site.brandName} — ${site.tagline}`,
      description,
      url,
      images: [{ url: ogImagePath, alt: `${site.brandName} — ${site.tagline}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} — ${site.brandName}` : `${site.brandName} — ${site.tagline}`,
      description,
      images: [ogImagePath],
    },
  };
}

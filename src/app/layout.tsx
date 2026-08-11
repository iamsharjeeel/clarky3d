import type { Metadata } from "next";
import { Exo_2, Press_Start_2P, Space_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { createMetadata } from "@/lib/metadata/create-metadata";
import { getSiteSettings } from "@/lib/content/load";
import "./globals.css";

const exo = Exo_2({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-exo",
  display: "swap",
});

const pixel = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const site = getSiteSettings();

export const metadata: Metadata = createMetadata({
  description: `${site.brandName} — ${site.tagline}. Browse the catalogue by category, see filament colours in stock, and order through Telegram when configured.`,
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${exo.variable} ${pixel.variable} ${spaceMono.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <SkipLink />
        <SiteHeader />
        <main id="main" className="page-shell" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}

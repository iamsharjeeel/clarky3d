import Link from "next/link";
import { CartButton } from "@/components/cart/CartButton";
import { MobileNav } from "@/components/layout/MobileNav";
import { getSiteSettings } from "@/lib/content/load";

const nav = [
  { href: "/work", label: "Catalogue" },
  { href: "/colours", label: "Colours" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const site = getSiteSettings();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="wordmark" aria-label={`${site.brandName} home`}>
          {site.brandName.replace("3D", "")}
          <span>3D</span>
        </Link>
        <nav className="topnav desktop-nav" aria-label="Primary">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <MobileNav />
          <CartButton />
          <Link className="btn header-cta" href="/contact">
            Start an order
          </Link>
        </div>
      </div>
    </header>
  );
}

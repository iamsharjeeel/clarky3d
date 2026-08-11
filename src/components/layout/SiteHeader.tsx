import Link from "next/link";
import { getSiteSettings } from "@/lib/content/load";

const nav = [
  { href: "/", label: "Featured" },
  { href: "/work", label: "Catalogue" },
  { href: "/colours", label: "Colours" },
  { href: "/contact", label: "Order" },
] as const;

export function SiteHeader() {
  const site = getSiteSettings();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="wordmark">
          {site.brandName.replace("3D", "")}
          <span>3D</span>
        </Link>
        <nav className="topnav" aria-label="Primary">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="nav-btn">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

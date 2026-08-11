import Link from "next/link";
import { getSiteSettings } from "@/lib/content/load";

export function SiteFooter() {
  const site = getSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-brand">
          {site.brandName} — {site.tagline}
        </p>
        <nav aria-label="Footer">
          <ul className="footer-nav">
            <li>
              <Link href="/work">Catalogue</Link>
            </li>
            <li>
              <Link href="/colours">Colours</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Order</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/accessibility">Accessibility</Link>
            </li>
          </ul>
        </nav>
        <p className="footer-meta">
          © {year} {site.brandName}
        </p>
      </div>
    </footer>
  );
}

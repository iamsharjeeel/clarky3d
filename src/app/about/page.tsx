import Link from "next/link";
import { createMetadata } from "@/lib/metadata/create-metadata";
import { getSiteSettings } from "@/lib/content/load";

export const metadata = createMetadata({
  title: "About",
  description: "About Clarky3D made-to-order 3D prints.",
  path: "/about",
});

export default function AboutPage() {
  const site = getSiteSettings();

  return (
    <div className="stack">
      <h1 className="page-title">About</h1>
      <div className="panel stack">
        <p className="lede">
          {site.brandName} offers {site.tagline}. The public site positions ordering through
          Telegram after browsing the catalogue and filament colours.
        </p>
        <p className="draft-note">
          No biography, studio location, team size, or credentials were verified in the M0 capture.
          Those details stay omitted until the owner supplies approved copy.
        </p>
        <Link className="btn" href="/work">
          Browse catalogue
        </Link>
      </div>
    </div>
  );
}

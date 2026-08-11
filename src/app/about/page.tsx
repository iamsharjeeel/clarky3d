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
    <div className="stack-editorial">
      <header className="section-head-editorial">
        <p className="eyebrow">About</p>
        <h1 className="page-title">{site.brandName}</h1>
        <p className="lede">
          {site.brandName} makes {site.tagline}. The public site is a catalogue: browse products,
          review filament colours, and order through Telegram or a short enquiry.
        </p>
      </header>
      <div className="story-block">
        <h2>Working style (observed)</h2>
        <p>
          Copy on the live site is direct and playful — “Lucky Dip” colouring, print-on-demand
          framing, and a Telegram-first checkout. No studio biography, team size, or credentials
          were verified in the evidence capture, so those details stay omitted here.
        </p>
      </div>
      <div className="cta-row">
        <Link className="btn" href="/work">
          Browse catalogue
        </Link>
        <Link className="btn btn-secondary" href="/contact">
          Start an order
        </Link>
      </div>
    </div>
  );
}

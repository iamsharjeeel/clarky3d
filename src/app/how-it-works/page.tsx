import Link from "next/link";
import { createMetadata } from "@/lib/metadata/create-metadata";
import { getSiteSettings } from "@/lib/content/load";

export const metadata = createMetadata({
  title: "How it works",
  description: "How to browse, colour-configure, and order Clarky3D made-to-order prints.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  const site = getSiteSettings();

  return (
    <div className="stack-editorial">
      <header className="section-head-editorial">
        <p className="eyebrow">Capabilities</p>
        <h1 className="page-title">How ordering works</h1>
        <p className="lede">
          {site.brandName} is a made-to-order 3D print catalogue. This page describes the real buyer
          journey from the live site — not an agency services menu.
        </p>
      </header>

      <ol className="process-steps large">
        <li>
          <span className="step-index">01</span>
          <div>
            <h2>Browse the catalogue</h2>
            <p>
              Explore categories and product pages with descriptions, AUD prices, and photos. Every
              item is print on demand.
            </p>
            <Link className="text-link" href="/work">
              Open catalogue
            </Link>
          </div>
        </li>
        <li>
          <span className="step-index">02</span>
          <div>
            <h2>Choose colours</h2>
            <p>
              Assign in-stock filament colours to each part, or leave selections to Lucky Dip when
              you prefer a surprise.
            </p>
            <Link className="text-link" href="/colours">
              See filament library
            </Link>
          </div>
        </li>
        <li>
          <span className="step-index">03</span>
          <div>
            <h2>Send the order</h2>
            <p>
              Add items to your cart and continue on Telegram, or use the enquiry form if you want
              to write a short message first.
            </p>
            <Link className="text-link" href="/contact">
              Start an order
            </Link>
          </div>
        </li>
      </ol>

      <section className="cta-band" aria-labelledby="how-cta">
        <h2 id="how-cta">Questions before you order?</h2>
        <p className="lede">
          Use the enquiry form. Do not expect guaranteed response times unless they are published
          separately.
        </p>
        <Link className="btn" href="/contact">
          Enquire
        </Link>
      </section>
    </div>
  );
}

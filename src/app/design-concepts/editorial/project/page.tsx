import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getSiteSettings } from "@/lib/content/load";

export default function EditorialProjectConceptPage() {
  const site = getSiteSettings();
  const product = getProductBySlug("cart-slide-out-drawer");
  if (!product) return null;

  return (
    <div className="ed-shell">
      <p className="concept-banner">NON-PRODUCTION CONCEPT A · Editorial project · noindex</p>
      <header className="ed-top">
        <Link className="ed-brand" href="/design-concepts/editorial">
          {site.brandName.replace("3D", "")}
          <span>3D</span>
        </Link>
        <nav className="ed-nav" aria-label="Concept primary">
          <Link href="/design-concepts/editorial">Home</Link>
          <Link href="/design-concepts/editorial/project" aria-current="page">
            Project
          </Link>
        </nav>
        <Link className="ed-cta" href="/contact">
          Start an order
        </Link>
      </header>

      <article className="ed-section">
        <p className="ed-kicker">
          {product.categoryId.replace(/_/g, " ")} · ${product.priceAud} AUD · Made to order
        </p>
        <h1 style={{ fontSize: "clamp(2rem,4vw,3.4rem)", margin: 0 }}>{product.title}</h1>
        <p className="ed-lede">{product.summary}</p>
        <div className="ed-feature-media" style={{ maxWidth: "56rem" }}>
          <Image
            src={product.cover.src}
            alt={product.cover.alt}
            width={1200}
            height={900}
            priority
          />
        </div>

        <div className="ed-rail">
          <article>
            <h2>Overview</h2>
            <p style={{ whiteSpace: "pre-wrap" }}>{product.description}</p>
          </article>
          <article>
            <h2>Clarky3D’s role</h2>
            <p>Made-to-order 3D print from the published catalogue. Printed on demand.</p>
          </article>
          <article>
            <h2>Process</h2>
            <p>
              Configure colour parts
              {product.colourParts.length ? ` (${product.colourParts.join(", ")})` : ""}, then order
              via Telegram or enquiry.
            </p>
          </article>
        </div>

        <p className="draft-note">
          Approved outcome metrics are not available — section omitted rather than invented.
        </p>
        <Link className="ed-cta" href="/contact">
          Enquire about this print
        </Link>
      </article>
    </div>
  );
}

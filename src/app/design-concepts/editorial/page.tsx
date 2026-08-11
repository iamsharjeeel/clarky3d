import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts, getSiteSettings } from "@/lib/content/load";

export default function EditorialConceptPage() {
  const site = getSiteSettings();
  const featured = getFeaturedProducts().slice(0, 3);
  const hero = featured[0];

  return (
    <div className="ed-shell">
      <p className="concept-banner">NON-PRODUCTION CONCEPT A · Editorial Gallery · noindex</p>
      <header className="ed-top">
        <Link className="ed-brand" href="/design-concepts/editorial">
          {site.brandName.replace("3D", "")}
          <span>3D</span>
        </Link>
        <nav className="ed-nav" aria-label="Concept primary">
          <Link href="/design-concepts/editorial" aria-current="page">
            Home
          </Link>
          <Link href="/design-concepts/editorial/project">Project</Link>
          <Link href="/design-concepts">All concepts</Link>
        </nav>
        <Link className="ed-cta" href="#enquire">
          Start an order
        </Link>
      </header>

      <section className="ed-hero" aria-labelledby="ed-hero-title">
        <div className="ed-hero-media">
          {hero ? (
            <Image src={hero.cover.src} alt={hero.cover.alt} width={1200} height={900} priority />
          ) : null}
        </div>
        <div className="ed-hero-copy">
          <p className="ed-kicker">{site.tagline}</p>
          <h1 id="ed-hero-title">
            CLARKY<span>3D</span>
          </h1>
          <p className="ed-lede">
            Made-to-order prints with real filament choices. Browse the catalogue, then order
            through Telegram.
          </p>
          <div className="ed-actions">
            <Link className="ed-cta" href="/work">
              View selected work
            </Link>
            <Link className="ed-cta ed-cta-ghost" href="#enquire">
              Enquire
            </Link>
          </div>
        </div>
      </section>

      <section className="ed-section" aria-labelledby="ed-work">
        <div className="ed-section-head">
          <p className="ed-kicker">Selected work</p>
          <h2 id="ed-work">Prints with context, not unexplained tiles</h2>
          <p className="ed-lede">
            Category, price, and why it exists — from published catalogue copy.
          </p>
        </div>
        {featured.map((product) => (
          <article className="ed-feature" key={product.slug}>
            <div className="ed-feature-media">
              <Image src={product.cover.src} alt={product.cover.alt} width={900} height={700} />
            </div>
            <div className="ed-caption">
              <p className="meta">
                {product.categoryId.replace(/_/g, " ")} · ${product.priceAud} AUD
              </p>
              <h3>{product.title}</h3>
              <p>{product.summary}</p>
              <Link href="/design-concepts/editorial/project">Open project view</Link>
            </div>
          </article>
        ))}
      </section>

      <section className="ed-section" aria-labelledby="ed-caps">
        <div className="ed-section-head">
          <p className="ed-kicker">How ordering works</p>
          <h2 id="ed-caps">Buyer-facing steps — not agency jargon</h2>
        </div>
        <div className="ed-rail">
          <article>
            <h3>Browse</h3>
            <p>Scan categories and product photos from the live catalogue.</p>
          </article>
          <article>
            <h3>Colour</h3>
            <p>Pick filament per part, or leave it to Lucky Dip.</p>
          </article>
          <article>
            <h3>Order</h3>
            <p>Message via Telegram or send a short enquiry form.</p>
          </article>
        </div>
      </section>

      <section className="ed-section" id="enquire" aria-labelledby="ed-form">
        <div className="ed-section-head">
          <p className="ed-kicker">Enquiry</p>
          <h2 id="ed-form">Representative form treatment</h2>
        </div>
        <form className="ed-form" action="#" method="get">
          <label>
            Name
            <input name="name" autoComplete="name" />
          </label>
          <label>
            Email
            <input name="email" type="email" autoComplete="email" />
          </label>
          <label>
            Project summary
            <textarea name="message" rows={4} />
          </label>
          <button className="ed-cta" type="submit">
            Send enquiry
          </button>
        </form>
      </section>

      <aside className="ed-notes">
        <p>
          <strong>Recognizably Clarky3D:</strong> pixel wordmark, cyan accent, dark field, catalogue
          voice, real product media.
        </p>
        <p>
          <strong>Different from legacy:</strong> brand-led first screen, asymmetric media features,
          caption storytelling, editorial type scale, slim nav (not button cluster).
        </p>
        <p>
          <strong>Motion:</strong> short rise on load; disabled under prefers-reduced-motion.
          <strong> Perf:</strong> CSS + optimized images only; no WebGL.
        </p>
      </aside>
    </div>
  );
}

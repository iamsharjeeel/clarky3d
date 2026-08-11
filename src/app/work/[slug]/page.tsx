import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductCard } from "@/components/work/ProductCard";
import { ProductConfigurator } from "@/components/work/ProductConfigurator";
import {
  getCategoryById,
  getFilaments,
  getProductBySlug,
  getProducts,
  getSiteSettings,
} from "@/lib/content/load";
import { createMetadata } from "@/lib/metadata/create-metadata";
import { productJsonLd } from "@/lib/seo/jsonld";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return createMetadata({
      title: "Product not found",
      description: "This product is not in the published catalogue.",
      path: `/work/${slug}`,
      noIndex: true,
    });
  }
  return createMetadata({
    title: product.seo.title ?? product.title,
    description: product.seo.description,
    path: `/work/${product.slug}`,
    noIndex: product.seo.noindex,
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const site = getSiteSettings();
  const category = getCategoryById(product.categoryId);
  const filaments = getFilaments()
    .filter((filament) => filament.status === "In Stock")
    .map((filament) => filament.name);
  const related = getProducts()
    .filter((item) => item.categoryId === product.categoryId && item.slug !== product.slug)
    .slice(0, 3);

  return (
    <article className={`product-editorial theme-${category?.themeToken ?? "misc"}`}>
      <JsonLd data={productJsonLd(product)} />
      <p className="meta breadcrumb">
        <Link href="/work">Catalogue</Link>
        {" / "}
        {category?.title ?? product.categoryId}
        {" / "}
        {product.title}
      </p>

      <header className="product-hero">
        <div className="product-hero-copy">
          <p className="eyebrow">
            {category?.title ?? product.categoryId} · ${product.priceAud} {site.currencyLabel}
          </p>
          <h1 className="page-title">{product.title}</h1>
          <p className="lede">{product.summary}</p>
          <p className="meta">Made to order · Print on demand</p>
        </div>
        <figure className="product-hero-media">
          <Image
            src={product.cover.src}
            alt={product.cover.alt}
            width={1200}
            height={900}
            className="detail-image"
            priority
          />
        </figure>
      </header>

      <div className="product-story">
        <section className="story-block" aria-labelledby="overview-heading">
          <h2 id="overview-heading">Overview</h2>
          <p style={{ whiteSpace: "pre-wrap" }}>{product.description}</p>
        </section>
        <section className="story-block" aria-labelledby="role-heading">
          <h2 id="role-heading">Clarky3D’s role</h2>
          <p>
            Made-to-order 3D print from the published {site.brandName} catalogue. Items are printed
            on demand after you send an order.
          </p>
        </section>
        <section className="story-block" aria-labelledby="brief-heading">
          <h2 id="brief-heading">Brief</h2>
          <p>{product.summary}</p>
        </section>
        <section className="story-block" aria-labelledby="process-heading">
          <h2 id="process-heading">Process / approach</h2>
          {product.colourParts.length > 0 ? (
            <ul>
              {product.colourParts.map((part) => (
                <li key={part}>Colour part: {part}</li>
              ))}
            </ul>
          ) : (
            <p>No multi-part colour configuration on this item.</p>
          )}
          {product.options.length > 0 ? (
            <div className="stack">
              {product.options.map((option) => (
                <div key={option.name}>
                  <p>
                    <strong>{option.name}</strong>
                  </p>
                  <ul>
                    {option.choices.map((choice) => (
                      <li key={choice}>{choice}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}
        </section>
        <section className="story-block" aria-labelledby="delivered-heading">
          <h2 id="delivered-heading">Delivered work</h2>
          <div className="product-gallery">
            {product.photos.map((photo) => (
              <figure key={photo.src}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={900}
                  height={700}
                  className="detail-image"
                />
              </figure>
            ))}
          </div>
        </section>
        <section className="story-block" aria-labelledby="credits-heading">
          <h2 id="credits-heading">Credits & rights</h2>
          <p>
            Photography rights status: {product.cover.rightsStatus}. No collaborator credits were
            supplied in the live capture.
          </p>
          {product.cover.rightsStatus !== "approved" ? (
            <p className="draft-note">
              Product photography is retained from the live site for development reference. Rights
              are not cleared for production launch.
            </p>
          ) : null}
        </section>
      </div>

      <section className="config-band" aria-labelledby="configure-heading">
        <h2 id="configure-heading">Configure & order</h2>
        <ProductConfigurator
          product={product}
          categoryLabel={`${category?.title ?? product.categoryId} / ${product.subcategoryId.replace(/_/g, " ")}`}
          filamentNames={filaments}
        />
      </section>

      {related.length > 0 ? (
        <section className="section-editorial" aria-labelledby="related-heading">
          <div className="section-head-editorial">
            <p className="eyebrow">Related</p>
            <h2 id="related-heading">More in {category?.title ?? "this category"}</h2>
          </div>
          <ul className="editorial-grid">
            {related.map((item) => (
              <li key={item.slug}>
                <ProductCard product={item} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="cta-band" aria-labelledby="product-cta">
        <h2 id="product-cta">Enquire about this print</h2>
        <p className="lede">
          Tell Clarky what you need, or add the configured item to your cart and continue on
          Telegram.
        </p>
        <div className="cta-row">
          <Link className="btn" href="/contact">
            Start an order
          </Link>
          <Link className="btn btn-secondary" href="/work">
            Back to catalogue
          </Link>
        </div>
      </section>
    </article>
  );
}

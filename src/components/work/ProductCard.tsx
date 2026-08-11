import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/content/schemas";

export function ProductCard({ product }: { product: Product }) {
  const badge = product.badge === "none" ? null : product.badge.toUpperCase();

  return (
    <Link className="product-card motion-lift" href={`/work/${product.slug}`}>
      <div className="card-media">
        {badge ? <span className={`badge-ribbon badge-${product.badge}`}>{badge}</span> : null}
        <Image
          src={product.cover.src}
          alt={product.cover.alt}
          width={600}
          height={450}
          className="card-image"
        />
      </div>
      <div className="product-card-body">
        <h3>{product.title}</h3>
        <p className="price">${product.priceAud}</p>
        <p className="meta">{product.subcategoryId.replace(/_/g, " ")}</p>
      </div>
    </Link>
  );
}

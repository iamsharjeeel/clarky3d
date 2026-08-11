import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/content/schemas";

export function ProductCard({
  product,
  priority = false,
  layout = "grid",
}: {
  product: Product;
  priority?: boolean;
  layout?: "grid" | "feature";
}) {
  const badge = product.badge === "none" ? null : product.badge;
  const category = product.categoryId.replace(/_/g, " ");

  return (
    <Link className={`product-card product-card--${layout}`} href={`/work/${product.slug}`}>
      <div className="card-media">
        <Image
          src={product.cover.src}
          alt={product.cover.alt}
          width={layout === "feature" ? 1200 : 800}
          height={layout === "feature" ? 900 : 600}
          className="card-image"
          priority={priority}
        />
      </div>
      <div className="product-card-body">
        <p className="meta">
          {category}
          {badge ? ` · ${badge}` : ""}
        </p>
        <h3>{product.title}</h3>
        <p className="card-summary">{product.summary}</p>
        <p className="price">${product.priceAud} AUD</p>
      </div>
    </Link>
  );
}

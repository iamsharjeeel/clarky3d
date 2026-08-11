import Link from "next/link";

export default function NotFound() {
  return (
    <div className="stack">
      <h1 className="page-title">Page not found</h1>
      <p className="lede">That route is not in the Clarky3D catalogue.</p>
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
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

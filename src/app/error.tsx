"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="stack">
      <h1 className="page-title">Something went wrong</h1>
      <p className="lede">
        The page hit an unexpected error. Try again or head back to the catalogue.
      </p>
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <button type="button" className="btn" onClick={reset}>
          Try again
        </button>
        <Link className="btn btn-secondary" href="/work">
          Browse catalogue
        </Link>
      </div>
    </div>
  );
}

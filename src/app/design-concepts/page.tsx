import Link from "next/link";

export default function DesignConceptsIndex() {
  return (
    <main className="concept-index">
      <p className="concept-banner">NON-PRODUCTION · noindex · concept comparison only</p>
      <h1>Clarky3D design concepts</h1>
      <p>
        Two brand-faithful directions using real catalogue content. Production is unchanged until a
        direction is selected (see ADR).
      </p>
      <ul>
        <li>
          <Link href="/design-concepts/editorial">Direction A — Editorial Gallery</Link>
        </li>
        <li>
          <Link href="/design-concepts/spatial">Direction B — Spatial Studio</Link>
        </li>
      </ul>
    </main>
  );
}

import { createMetadata } from "@/lib/metadata/create-metadata";
import { getFilaments } from "@/lib/content/load";

export const metadata = createMetadata({
  title: "Colour library",
  description: "Filament colours currently listed for Clarky3D made-to-order prints.",
  path: "/colours",
});

export default function ColoursPage() {
  const filaments = getFilaments();

  return (
    <div className="stack">
      <header className="stack">
        <h1 className="page-title">Colour library</h1>
        <p className="lede">
          Inventory transcribed from the live `/api/filaments` response captured on 2026-08-11.
        </p>
      </header>
      <ul className="stack" style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {filaments.map((filament) => (
          <li
            key={filament.id}
            className="panel"
            style={{ display: "flex", gap: "1rem", alignItems: "center" }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                background: filament.hex,
                border: "3px solid var(--color-text)",
                flex: "0 0 auto",
              }}
            />
            <div>
              <h2 style={{ margin: 0, fontSize: "1.05rem" }}>{filament.name}</h2>
              <p className="meta" style={{ margin: "0.25rem 0" }}>
                {filament.material} · {filament.finish}
              </p>
              <p className="meta" style={{ margin: 0 }}>
                {filament.hex} · {filament.status}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

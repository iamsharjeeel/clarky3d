import type { ReactNode } from "react";

export function LegalArticle({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <article className="stack legal-article">
      <header className="stack">
        <h1 className="page-title">{title}</h1>
        <p className="meta">Clarky3D · Last updated {updated}</p>
      </header>
      <div className="panel stack legal-body">{children}</div>
    </article>
  );
}

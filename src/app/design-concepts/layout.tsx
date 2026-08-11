import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/concepts.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Design concepts (non-production)",
};

export default function DesignConceptsLayout({ children }: { children: ReactNode }) {
  return <div className="concept-root">{children}</div>;
}

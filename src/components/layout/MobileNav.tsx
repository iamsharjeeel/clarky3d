"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Catalogue" },
  { href: "/colours", label: "Colours" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Order" },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const id = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className="mobile-nav">
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
      >
        Menu
      </button>
      {open ? (
        <div className="mobile-nav-layer" role="presentation" onClick={() => setOpen(false)}>
          <nav
            id={id}
            className="mobile-nav-panel"
            aria-label="Mobile primary"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              className="nav-toggle"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
            <ul>
              {links.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
}

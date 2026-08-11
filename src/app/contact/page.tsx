import { ContactForm } from "@/components/forms/ContactForm";
import { getTelegramOrderHandle } from "@/lib/env";
import { createMetadata } from "@/lib/metadata/create-metadata";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Order",
  description: "Order or enquire about Clarky3D made-to-order prints.",
  path: "/contact",
});

export default function ContactPage() {
  const handle = getTelegramOrderHandle();
  const href = `https://t.me/${handle}`;

  return (
    <div className="stack">
      <header className="stack">
        <h1 className="page-title">Order / enquire</h1>
        <p className="lede">
          Send a short enquiry below, or continue on Telegram. Response timing is not guaranteed
          here unless published separately.
        </p>
        <p className="meta">
          <Link href="/privacy">Privacy</Link>
          {" · "}
          <Link href="/terms">Terms</Link>
          {" · "}
          <Link href="/sms-terms">SMS Terms</Link>
        </p>
      </header>

      <div className="contact-layout">
        <ContactForm />
        <aside className="panel stack">
          <h2 className="meta">Telegram</h2>
          <p>
            Prefer chat? Message{" "}
            <a href={href} rel="noopener noreferrer">
              @{handle}
            </a>
            . Cart checkout also drafts an order message for you.
          </p>
          <a className="btn btn-secondary" href={href} rel="noopener noreferrer">
            Open Telegram
          </a>
        </aside>
      </div>
    </div>
  );
}

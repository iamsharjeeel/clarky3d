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
    <div className="stack-editorial">
      <header className="section-head-editorial">
        <p className="eyebrow">Order</p>
        <h1 className="page-title">Start an order</h1>
        <p className="lede">
          Tell Clarky what you want printed, or continue on Telegram. Response timing is not
          guaranteed here unless published separately.
        </p>
        <p className="meta">
          <Link href="/privacy">Privacy notice</Link>
          {" · "}
          <Link href="/how-it-works">How it works</Link>
        </p>
      </header>

      <div className="contact-layout">
        <ContactForm />
        <aside className="story-block">
          <h2>Telegram</h2>
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

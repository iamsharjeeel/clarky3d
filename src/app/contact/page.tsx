import { ContactForm } from "@/components/forms/ContactForm";
import { getPublicEnv } from "@/lib/env";
import { getSiteSettings } from "@/lib/content/load";
import { createMetadata } from "@/lib/metadata/create-metadata";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Order",
  description: "Order or enquire about Clarky3D made-to-order prints.",
  path: "/contact",
});

export default function ContactPage() {
  const site = getSiteSettings();
  const env = getPublicEnv();
  const handle = env.NEXT_PUBLIC_TELEGRAM_ORDER_HANDLE;
  const href = handle ? `https://t.me/${handle}` : undefined;

  return (
    <div className="stack">
      <header className="stack">
        <h1 className="page-title">Order / enquire</h1>
        <p className="lede">
          Send a short enquiry below, or use Telegram when configured. Response timing is not
          guaranteed here unless the owner publishes one.
        </p>
        <p className="meta">
          <Link href="/privacy">Privacy notice</Link>
        </p>
      </header>

      <div className="contact-layout">
        <ContactForm />
        <aside className="panel stack">
          <h2 className="meta">Telegram</h2>
          {href ? (
            <>
              <p>
                Prefer chat? Message{" "}
                <a href={href} rel="noopener noreferrer">
                  @{handle}
                </a>
                .
              </p>
              <a className="btn btn-secondary" href={href} rel="noopener noreferrer">
                Open Telegram
              </a>
            </>
          ) : (
            <p className="draft-note">
              Telegram CTA disabled until `NEXT_PUBLIC_TELEGRAM_ORDER_HANDLE` is set. Observed live
              handle: `{site.telegramHandleObserved}`.
            </p>
          )}
          <p className="meta">
            Cart checkout still builds a Telegram draft order from selected prints when the handle
            is enabled.
          </p>
        </aside>
      </div>
    </div>
  );
}

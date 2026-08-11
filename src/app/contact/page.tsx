import { createMetadata } from "@/lib/metadata/create-metadata";
import { getPublicEnv } from "@/lib/env";
import { getSiteSettings } from "@/lib/content/load";

export const metadata = createMetadata({
  title: "Order",
  description: "How to order made-to-order Clarky3D prints.",
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
        <h1 className="page-title">Order</h1>
        <p className="lede">
          The live site takes orders through Telegram. A server-backed form ships in M3 after
          privacy and delivery credentials are approved.
        </p>
      </header>
      <div className="panel stack">
        {href ? (
          <>
            <p>
              Message{" "}
              <a href={href} rel="noopener noreferrer">
                @{handle}
              </a>{" "}
              to order. Nothing is sent until you press send in Telegram.
            </p>
            <a className="btn" href={href} rel="noopener noreferrer">
              Open Telegram
            </a>
          </>
        ) : (
          <>
            <p className="draft-note">
              Telegram order CTA is disabled until `NEXT_PUBLIC_TELEGRAM_ORDER_HANDLE` is set. The
              observed live handle was `{site.telegramHandleObserved}`; it is not auto-enabled here
              to avoid implying production approval.
            </p>
            <p className="meta">Set the env var in `.env.local` for local order-link testing.</p>
          </>
        )}
      </div>
    </div>
  );
}

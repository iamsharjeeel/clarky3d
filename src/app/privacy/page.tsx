import { createMetadata } from "@/lib/metadata/create-metadata";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Privacy",
  description: "How Clarky3D handles information on this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="stack">
      <h1 className="page-title">Privacy</h1>
      <p className="draft-note">
        Interim notice describing what this site actually does today. Have counsel review before
        treating it as a final legal policy.
      </p>
      <div className="panel stack">
        <h2>Who we are</h2>
        <p>
          This website presents the Clarky3D made-to-order 3D print catalogue and ways to get in
          touch about an order.
        </p>

        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Enquiry form</strong> (if you submit it): name, email, optional company,
            optional interest, project summary, and consent confirmation.
          </li>
          <li>
            <strong>Technical logs</strong> from hosting (IP address, user agent, timestamps) as
            part of normal operation and abuse prevention.
          </li>
          <li>We do not run a marketing email list or newsletter on this site.</li>
        </ul>

        <h2>How messages are handled</h2>
        <ul>
          <li>
            If email delivery is configured, enquiry contents are sent via the Resend email API to
            the Clarky3D inbox configured for this project.
          </li>
          <li>
            If email delivery is not configured, submissions are accepted only into a temporary
            in-memory test adapter (local/preview) and are not retained as a CRM.
          </li>
          <li>
            Operational logs record delivery success/failure and provider IDs — not message bodies
            or email addresses.
          </li>
        </ul>

        <h2>Telegram</h2>
        <p>
          Ordering through Telegram opens Telegram (or t.me) with a draft message you control. That
          conversation is governed by Telegram’s terms and privacy policy, not by this website’s
          servers.
        </p>

        <h2>Hosting and fonts</h2>
        <ul>
          <li>This rebuild is intended to run on Vercel.</li>
          <li>Fonts are self-served through Next.js font loading where configured.</li>
          <li>No third-party analytics or advertising pixels are enabled by default.</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          The cart may use <code>localStorage</code> in your browser for items you add. That stays
          on your device. Essential hosting cookies may be set by the platform.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this notice: use the <Link href="/contact">Order / enquire</Link> page.
        </p>
      </div>
    </div>
  );
}

import { createMetadata } from "@/lib/metadata/create-metadata";

export const metadata = createMetadata({
  title: "Privacy",
  description: "Privacy information for the Clarky3D website overhaul.",
  path: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <div className="stack">
      <h1 className="page-title">Privacy</h1>
      <p className="draft-note">
        DRAFT — cannot ship. Replace with owner-approved text describing processors, purpose,
        retention, rights, and cookies before collecting leads or enabling analytics.
      </p>
      <div className="panel stack">
        <p>
          This rebuild currently stores catalogue content in the application repository. No contact
          form submissions are accepted yet. Third-party processors used by the live site at capture
          time included Telegram (order handoff), Google Fonts, and Cloudflare Insights;
          confirmation of continued use requires owner/legal review.
        </p>
      </div>
    </div>
  );
}

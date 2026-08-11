import { createMetadata } from "@/lib/metadata/create-metadata";

export const metadata = createMetadata({
  title: "Accessibility",
  description: "Accessibility statement for the Clarky3D website overhaul.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <div className="stack">
      <h1 className="page-title">Accessibility</h1>
      <div className="panel stack">
        <p>
          Target: WCAG 2.2 AA. Baseline testing date: 2026-08-11 against the live site, with
          foundation checks continuing on this rebuild.
        </p>
        <p>Known limitations carried from the live baseline into this foundation milestone:</p>
        <ul>
          <li>
            Muted and some category-theme colours failed contrast on the live site; tokens here use
            refined muted/theme values pending brand approval.
          </li>
          <li>
            Product photography rights remain unverified, so production launch is still gated on
            owner approval.
          </li>
        </ul>
        <p>
          Feedback: use the Order page once Telegram is configured, or open a repository issue
          during preview.
        </p>
      </div>
    </div>
  );
}

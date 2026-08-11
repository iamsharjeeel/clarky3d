"use client";

import { useState } from "react";
import { trackBrowserEvent } from "@/lib/analytics/events";

type FieldErrors = Partial<Record<string, string>>;

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  if (success) {
    return (
      <div className="panel stack" role="status">
        <h2>Message received</h2>
        <p className="lede">
          Thanks — your enquiry was accepted. If a delivery provider is configured, Clarky will get
          the message. You can also follow up on Telegram when that handle is enabled.
        </p>
      </div>
    );
  }

  return (
    <form
      className="panel stack contact-form"
      action="/api/contact"
      method="post"
      noValidate
      onSubmit={async (event) => {
        event.preventDefault();
        setPending(true);
        setFormError(null);
        setFieldErrors({});
        const form = new FormData(event.currentTarget);
        const body = {
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          company: String(form.get("company") ?? ""),
          message: String(form.get("message") ?? ""),
          serviceInterest: String(form.get("serviceInterest") ?? ""),
          website: String(form.get("website") ?? ""),
          consent: form.get("consent") === "on",
        };

        let response: Response;
        let payload: { ok?: boolean; errorType?: string; fieldErrors?: FieldErrors };
        try {
          response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          payload = (await response.json()) as typeof payload;
        } catch {
          setPending(false);
          setFormError("We could not send that just now. Check your connection and try again.");
          trackBrowserEvent({ name: "contact_error", error_type: "network" });
          return;
        }

        setPending(false);
        if (!response.ok || !payload.ok) {
          trackBrowserEvent({
            name: "contact_error",
            error_type: payload.errorType ?? "unknown",
          });
          if (payload.fieldErrors) setFieldErrors(payload.fieldErrors);
          setFormError(
            payload.errorType === "rate_limit"
              ? "Too many attempts. Please wait a minute and try again."
              : payload.errorType === "delivery"
                ? "We could not deliver that just now. Try again or use Telegram."
                : "Check the highlighted fields and try again.",
          );
          return;
        }

        trackBrowserEvent({
          name: "contact_submit",
          service_interest: body.serviceInterest || undefined,
        });
        setSuccess(true);
      }}
    >
      <h2 className="meta">Enquiry form</h2>
      {formError ? (
        <div className="form-error" role="alert">
          {formError}
          {Object.keys(fieldErrors).length > 0 ? (
            <ul>
              {Object.entries(fieldErrors).map(([key, message]) => (
                <li key={key}>
                  <a href={`#field-${key}`}>{message}</a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <label className="field" htmlFor="field-name">
        <span>Name</span>
        <input
          id="field-name"
          name="name"
          autoComplete="name"
          required
          onFocus={() => trackBrowserEvent({ name: "contact_start", source_page: "/contact" })}
          aria-invalid={fieldErrors.name ? true : undefined}
          aria-describedby={fieldErrors.name ? "error-name" : undefined}
        />
        {fieldErrors.name ? (
          <span id="error-name" className="field-error">
            {fieldErrors.name}
          </span>
        ) : null}
      </label>

      <label className="field" htmlFor="field-email">
        <span>Email</span>
        <input
          id="field-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={fieldErrors.email ? true : undefined}
          aria-describedby={fieldErrors.email ? "error-email" : undefined}
        />
        {fieldErrors.email ? (
          <span id="error-email" className="field-error">
            {fieldErrors.email}
          </span>
        ) : null}
      </label>

      <label className="field" htmlFor="field-company">
        <span>Company (optional)</span>
        <input id="field-company" name="company" autoComplete="organization" />
      </label>

      <label className="field" htmlFor="field-serviceInterest">
        <span>Interest (optional)</span>
        <select id="field-serviceInterest" name="serviceInterest" defaultValue="">
          <option value="">Select one</option>
          <option value="catalogue-print">Catalogue print</option>
          <option value="custom-print">Custom print</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label className="field" htmlFor="field-message">
        <span>Project summary</span>
        <textarea
          id="field-message"
          name="message"
          rows={6}
          required
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={fieldErrors.message ? "error-message" : undefined}
        />
        {fieldErrors.message ? (
          <span id="error-message" className="field-error">
            {fieldErrors.message}
          </span>
        ) : null}
      </label>

      <div className="hp" aria-hidden="true">
        <label htmlFor="field-website">Website</label>
        <input id="field-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="check-field" htmlFor="field-consent">
        <input
          id="field-consent"
          name="consent"
          type="checkbox"
          required
          aria-invalid={fieldErrors.consent ? true : undefined}
          aria-describedby={fieldErrors.consent ? "error-consent" : undefined}
        />
        <span>
          I agree to be contacted about this enquiry. See the <a href="/privacy">privacy notice</a>.
        </span>
      </label>
      {fieldErrors.consent ? (
        <span className="field-error" id="error-consent">
          {fieldErrors.consent}
        </span>
      ) : null}

      <button className="btn" type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}

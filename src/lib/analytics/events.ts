export type AnalyticsEvent =
  | { name: "cta_select"; cta_name: string; placement: string; destination: string }
  | { name: "project_view"; project_slug: string; source: string }
  | { name: "contact_start"; source_page: string }
  | { name: "contact_error"; error_type: string }
  | { name: "contact_submit"; service_interest?: string }
  | { name: "external_link"; destination_type: string };

export function trackBrowserEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("clarky3d:analytics", { detail: event }));
}

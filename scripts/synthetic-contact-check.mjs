const base = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:3000";

const payload = {
  name: "Synthetic Monitor",
  email: "synthetic@example.com",
  message: "Synthetic non-PII delivery check for Clarky3D contact path.",
  consent: true,
  website: "",
  serviceInterest: "other",
};

const response = await fetch(new URL("/api/contact", base), {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Origin: new URL(base).origin,
  },
  body: JSON.stringify(payload),
});

const body = await response.json();
if (!response.ok || !body.ok) {
  console.error("synthetic_contact_failed", { status: response.status, errorType: body.errorType });
  process.exit(1);
}

console.log("synthetic_contact_ok", { status: response.status });

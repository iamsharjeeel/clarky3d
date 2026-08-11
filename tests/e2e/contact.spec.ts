import { expect, test } from "@playwright/test";

test("contact form validates and accepts a reserved test enquiry", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Name").fill("Test User");
  await page.getByLabel("Email").fill("enquiry@example.com");
  await page.getByLabel("Project summary").fill("Need a made-to-order print quote for testing.");
  await page.getByLabel(/I agree to be contacted/i).check();
  await page.getByRole("button", { name: /Send enquiry/i }).click();
  await expect(page.getByRole("status")).toContainText(/Message received/i);
});

test("contact form shows validation errors", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: /Send enquiry/i }).click();
  await expect(page.getByRole("alert")).toBeVisible();
});

test("contact endpoint rejects unsupported and oversized payloads", async ({ request }) => {
  const unsupported = await request.post("/api/contact", {
    headers: { "Content-Type": "text/plain" },
    data: "not a supported form",
  });
  expect(unsupported.status()).toBe(415);

  const oversized = await request.post("/api/contact", {
    headers: { "Content-Type": "application/json" },
    data: { message: "x".repeat(17_000) },
  });
  expect(oversized.status()).toBe(413);
});

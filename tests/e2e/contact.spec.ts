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

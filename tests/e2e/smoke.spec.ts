import { expect, test } from "@playwright/test";

test("home renders brand and catalogue CTA", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /Clarky\s*3D/i }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /Featured items/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Browse catalogue/i })).toBeVisible();
});

test("catalogue and product pages are reachable", async ({ page }) => {
  await page.goto("/work");
  await expect(page.getByRole("heading", { name: "Catalogue" })).toBeVisible();
  const firstProduct = page.locator(".product-card").first();
  await expect(firstProduct).toBeVisible();
  await firstProduct.click();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: /Start an order/i })).toBeVisible();
});

test("skip link is first focusable control", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const focused = page.locator(":focus");
  await expect(focused).toHaveText(/Skip to content/i);
});

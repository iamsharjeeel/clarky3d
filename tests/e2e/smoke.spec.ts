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
  await expect(page.getByRole("button", { name: /Add to cart/i })).toBeVisible();
});

test("legal pages render branded policies", async ({ page }) => {
  await page.goto("/privacy");
  await expect(page.getByRole("heading", { level: 1, name: "Privacy Policy" })).toBeVisible();
  await expect(page.getByText(/Clarky3D · Last updated/i)).toBeVisible();
  await page.goto("/terms");
  await expect(
    page.getByRole("heading", { level: 1, name: "Terms and Conditions" }),
  ).toBeVisible();
  await page.goto("/sms-terms");
  await expect(page.getByRole("heading", { level: 1, name: "SMS Terms" })).toBeVisible();
});

test("skip link is first focusable control", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const focused = page.locator(":focus");
  await expect(focused).toHaveText(/Skip to content/i);
});

test("product configurator adds an item to the cart drawer", async ({ page }) => {
  await page.goto("/work/cart-slide-out-drawer");
  await page.getByRole("button", { name: /Add to cart/i }).click();
  const dialog = page.getByRole("dialog", { name: /Your cart/i });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("Stackable SNES Drawer (7-Cart)")).toBeVisible();
});

import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const base = process.env.CAPTURE_BASE_URL ?? "http://127.0.0.1:3000";
const outRoot = process.env.CAPTURE_OUT ?? "docs/evidence/2026-08-11-visual/implementation";
const viewports = [
  { name: "360x800", width: 360, height: 800 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1920x1080", width: 1920, height: 1080 },
];

const routes = [
  { id: "home", path: "/" },
  { id: "work", path: "/work" },
  { id: "product", path: "/work/cart-slide-out-drawer" },
  { id: "about", path: "/about" },
  { id: "contact", path: "/contact" },
  { id: "colours", path: "/colours" },
  { id: "not-found", path: "/this-route-does-not-exist" },
];

async function shot(page, file) {
  await page.screenshot({ path: file, fullPage: true });
}

async function main() {
  await mkdir(outRoot, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    for (const route of routes) {
      await page.goto(`${base}${route.path}`, { waitUntil: "networkidle" });
      await shot(page, path.join(outRoot, `${route.id}--${vp.name}.png`));
    }

    if (vp.name === "360x800") {
      await page.goto(`${base}/`, { waitUntil: "networkidle" });
      await shot(page, path.join(outRoot, `home-nav--${vp.name}.png`));
    }

    if (vp.name === "1440x900") {
      await page.goto(`${base}/contact`, { waitUntil: "networkidle" });
      await page.getByRole("button", { name: /Send enquiry/i }).click();
      await page.waitForTimeout(400);
      await shot(page, path.join(outRoot, `contact-validation--${vp.name}.png`));

      await page.locator("#field-name").fill("Example Buyer");
      await page.locator("#field-email").fill("enquiry@example.com");
      await page.locator("#field-message").fill("Reserved test enquiry for screenshots.");
      await page.locator("#field-consent").check();
      await page.getByRole("button", { name: /Send enquiry/i }).click();
      await page
        .getByRole("status")
        .waitFor({ timeout: 8000 })
        .catch(() => null);
      await shot(page, path.join(outRoot, `contact-success--${vp.name}.png`));
    }
  }

  await browser.close();
  console.log(`Wrote captures under ${outRoot}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

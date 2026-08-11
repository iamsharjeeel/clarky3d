import { expect, test } from "@playwright/test";

test("legacy product query redirects to stable slug", async ({ request }) => {
  const response = await request.get("/?p=Hotwheels/Display_Racks/5x1_Rack", {
    maxRedirects: 0,
  });
  expect(response.status()).toBe(308);
  expect(response.headers()["location"]).toContain("/work/5x1-rack");
});

test("unknown legacy product query redirects to catalogue", async ({ request }) => {
  const response = await request.get("/?p=Does_Not_Exist/Thing", { maxRedirects: 0 });
  expect(response.status()).toBe(308);
  expect(response.headers()["location"]).toMatch(/\/work\/?$/);
});

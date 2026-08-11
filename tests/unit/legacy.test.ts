import { describe, expect, it } from "vitest";
import { legacyPathToSlug } from "@/lib/content/legacy";

describe("legacyPathToSlug", () => {
  it("maps a known live sitemap path", () => {
    expect(legacyPathToSlug("Hotwheels/Display_Racks/5x1_Rack")).toBe("5x1-rack");
  });

  it("returns undefined for unknown paths", () => {
    expect(legacyPathToSlug("Nope/Missing")).toBeUndefined();
  });
});

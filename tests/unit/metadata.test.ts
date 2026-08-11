import { describe, expect, it } from "vitest";
import { createMetadata } from "@/lib/metadata/create-metadata";

describe("createMetadata", () => {
  it("sets canonical and description", () => {
    const metadata = createMetadata({
      title: "Catalogue",
      description: "Browse prints",
      path: "/work",
    });
    expect(metadata.description).toBe("Browse prints");
    expect(metadata.alternates?.canonical).toContain("/work");
  });
});

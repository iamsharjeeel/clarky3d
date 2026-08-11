import { describe, expect, it } from "vitest";
import { checkRateLimit, resetRateLimitsForTests } from "@/lib/contact/rate-limit";

describe("checkRateLimit", () => {
  it("allows then blocks within the window", () => {
    resetRateLimitsForTests();
    expect(checkRateLimit("t", 2, 60_000).ok).toBe(true);
    expect(checkRateLimit("t", 2, 60_000).ok).toBe(true);
    const blocked = checkRateLimit("t", 2, 60_000);
    expect(blocked.ok).toBe(false);
  });
});

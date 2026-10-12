import { describe, it, expect } from "vitest";
import { formatInr, formatIndianNumber, calculateDiscount, getScoreColor } from "@/lib/utils";

describe("Smoke & Utility Tests", () => {
  it("formats Indian Rupee correctly", () => {
    const formatted = formatInr(54990);
    // Should contain ₹ and 54,990
    expect(formatted).toContain("54,990");
  });

  it("formats Indian number commas correctly", () => {
    expect(formatIndianNumber(125000)).toBe("1,25,000");
  });

  it("calculates percentage discount accurately", () => {
    expect(calculateDiscount(50000, 100000)).toBe(50);
    expect(calculateDiscount(54990, 69990)).toBe(21);
    expect(calculateDiscount(60000, 60000)).toBe(0);
  });

  it("returns proper score colors for rating tiers", () => {
    expect(getScoreColor(92).text).toContain("emerald");
    expect(getScoreColor(75).text).toContain("teal");
    expect(getScoreColor(60).text).toContain("amber");
    expect(getScoreColor(40).text).toContain("rose");
  });
});

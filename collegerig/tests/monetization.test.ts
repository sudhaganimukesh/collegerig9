import { describe, it, expect } from "vitest";
import laptopsData from "@/data/laptops.json";
import branchesData from "@/data/branches.json";
import { Laptop, Branch } from "@/lib/types";
import { calculateSubScores, calculateOverallScore, BRANCH_PRESETS } from "@/lib/scoring";

const laptops = laptopsData as Laptop[];
const branches = branchesData as Branch[];

describe("Monetization & Score Neutrality", () => {
  it("guarantees scoring is 100% invariant to affiliate buy links", () => {
    const laptop = laptops[0];
    const subScoresOriginal = calculateSubScores(laptop);
    const overallOriginal = calculateOverallScore(subScoresOriginal, BRANCH_PRESETS["cse-aiml"]);

    // Clone laptop with mutated/added affiliate flags and links
    const mutatedLaptop: Laptop = {
      ...laptop,
      buyLinks: [
        { store: "Amazon.in", url: "https://example.com/affiliate", isAffiliate: true },
        { store: "Official Brand Store", url: "https://example.com/direct", isAffiliate: false },
      ],
    };

    const subScoresMutated = calculateSubScores(mutatedLaptop);
    const overallMutated = calculateOverallScore(subScoresMutated, BRANCH_PRESETS["cse-aiml"]);

    // Scores must be identical down to the floating point
    expect(subScoresMutated).toEqual(subScoresOriginal);
    expect(overallMutated).toBe(overallOriginal);
  });

  it("verifies all seed laptops have non-empty buy links with required fields", () => {
    for (const laptop of laptops) {
      expect(laptop.buyLinks.length).toBeGreaterThan(0);
      for (const link of laptop.buyLinks) {
        expect(link.store.trim().length).toBeGreaterThan(0);
        expect(link.url.startsWith("http")).toBe(true);
        expect(typeof link.isAffiliate).toBe("boolean");
      }
    }
  });

  it("verifies student discounts are well-formed when present", () => {
    const discountedLaptops = laptops.filter((l) => l.studentDiscount !== undefined);
    expect(discountedLaptops.length).toBeGreaterThan(0);

    for (const laptop of discountedLaptops) {
      const discount = laptop.studentDiscount!;
      expect(discount.program.length).toBeGreaterThan(0);
      expect(discount.summary.length).toBeGreaterThan(0);
      expect(discount.url.startsWith("http")).toBe(true);
      expect(discount.verifiedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("verifies branch presets each sum to exactly 100%", () => {
    for (const [branchSlug, weights] of Object.entries(BRANCH_PRESETS)) {
      const totalWeight =
        weights.performance +
        weights.battery +
        weights.portability +
        weights.display +
        weights.build +
        weights.value +
        weights.futureProofing;

      expect(totalWeight).toBe(100);
    }
  });

  it("verifies all branches from data exist in BRANCH_PRESETS", () => {
    for (const b of branches) {
      expect(BRANCH_PRESETS[b.slug]).toBeDefined();
    }
  });
});

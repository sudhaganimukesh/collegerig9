import { describe, it, expect } from "vitest";
import { LaptopSchema, BranchSchema, CampusSchema, DiscountDirectorySchema } from "@/lib/schema";
import laptopsData from "@/data/laptops.json";
import branchesData from "@/data/branches.json";
import campusData from "@/data/campus.json";
import discountsData from "@/data/discounts.json";

describe("Data Validation Suite (npm run validate:data)", () => {
  it("validates that at least 20 seed laptops exist and conform to LaptopSchema", () => {
    expect(laptopsData.length).toBeGreaterThanOrEqual(20);

    const ids = new Set<string>();
    const slugs = new Set<string>();

    laptopsData.forEach((laptop, idx) => {
      const parsed = LaptopSchema.safeParse(laptop);
      if (!parsed.success) {
        console.error(`Validation failed for laptop index ${idx} (${(laptop as any).model}):`, parsed.error.format());
      }
      expect(parsed.success).toBe(true);

      // Check unique IDs and slugs
      expect(ids.has(laptop.id)).toBe(false);
      ids.add(laptop.id);

      expect(slugs.has(laptop.slug)).toBe(false);
      slugs.add(laptop.slug);

      // Check pricing validity
      expect(laptop.priceInr).toBeGreaterThan(25000);
      expect(laptop.mrpInr).toBeGreaterThanOrEqual(laptop.priceInr);

      // Check sources presence
      expect(laptop.sources.length).toBeGreaterThanOrEqual(1);
      laptop.sources.forEach((source) => {
        expect(source.url.startsWith("https://")).toBe(true);
      });

      // Check buyLinks presence
      expect(laptop.buyLinks.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("validates all 6 branch presets conform to BranchSchema", () => {
    expect(branchesData.length).toBe(6);

    branchesData.forEach((branch) => {
      const parsed = BranchSchema.safeParse(branch);
      expect(parsed.success).toBe(true);
      expect(branch.typicalSoftware.length).toBeGreaterThan(0);
      expect(branch.minSpecs.minRamGb).toBeGreaterThanOrEqual(8);
    });
  });

  it("validates KPRIT campus profile conforms to CampusSchema and pick slugs exist", () => {
    const parsed = CampusSchema.safeParse(campusData);
    if (!parsed.success) {
      console.error("Campus validation error:", parsed.error.format());
    }
    expect(parsed.success).toBe(true);

    const laptopSlugs = new Set(laptopsData.map((l) => l.slug));
    campusData.picks.forEach((pick) => {
      expect(laptopSlugs.has(pick.laptopSlug)).toBe(true);
    });

    expect(campusData.nearbyServiceHubs.length).toBeGreaterThanOrEqual(3);
  });

  it("validates student discount programs directory", () => {
    expect(discountsData.length).toBeGreaterThanOrEqual(4);

    discountsData.forEach((discount) => {
      const parsed = DiscountDirectorySchema.safeParse(discount);
      expect(parsed.success).toBe(true);
      expect(discount.steps.length).toBeGreaterThanOrEqual(2);
    });
  });
});

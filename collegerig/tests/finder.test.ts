import { describe, it, expect } from "vitest";
import { scoreLaptopForBranch } from "@/lib/scoring";
import { Laptop, Branch } from "@/lib/types";
import laptopsData from "@/data/laptops.json";
import branchesData from "@/data/branches.json";

const laptops = laptopsData as Laptop[];
const branches = branchesData as Branch[];

describe("Finder & Results Engine Unit Tests", () => {
  const cseBranch = branches.find((b) => b.slug === "cse-aiml")!;
  const mechBranch = branches.find((b) => b.slug === "mech")!;

  it("ranks budget laptops with 16GB RAM highest for CSE under ₹60k", () => {
    const budget = 60000;
    const scored = laptops
      .map((laptop) => ({
        laptop,
        ...scoreLaptopForBranch(laptop, cseBranch, undefined, budget),
      }))
      .filter((r) => r.meetsMinSpecs && r.laptop.priceInr <= budget)
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    expect(scored.length).toBeGreaterThan(0);
    // Top pick should have 16GB RAM
    expect(scored[0].laptop.ramGb).toBeGreaterThanOrEqual(16);
    expect(scored[0].laptop.priceInr).toBeLessThanOrEqual(budget);
  });

  it("filters out integrated-graphics laptops for Mechanical Engineering", () => {
    const scored = laptops.map((laptop) => ({
      laptop,
      ...scoreLaptopForBranch(laptop, mechBranch),
    }));

    const qualified = scored.filter((s) => s.meetsMinSpecs);
    qualified.forEach((item) => {
      expect(item.laptop.gpu.type).toBe("dedicated");
      expect(item.laptop.gpu.vramGb).toBeGreaterThanOrEqual(4);
    });

    const disqualified = scored.filter((s) => !s.meetsMinSpecs);
    expect(disqualified.length).toBeGreaterThan(0);
  });

  it("re-calculates ranking dynamically when sliders shift weights towards battery", () => {
    // Under balanced weights
    const defaultScored = laptops
      .map((laptop) => ({
        laptop,
        ...scoreLaptopForBranch(laptop, cseBranch),
      }))
      .filter((r) => r.meetsMinSpecs)
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    // Extreme battery slider (battery: 60, performance: 5)
    const customWeights = { ...cseBranch.scoreWeights, battery: 60, performance: 5, portability: 25 };
    const batteryScored = laptops
      .map((laptop) => ({
        laptop,
        ...scoreLaptopForBranch(laptop, cseBranch, customWeights),
      }))
      .filter((r) => r.meetsMinSpecs)
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    // Top battery pick should have high battery Wh or high runtime
    expect(batteryScored[0].laptop.claimedBatteryHrs).toBeGreaterThanOrEqual(8);
  });
});

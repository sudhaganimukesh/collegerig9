import { describe, it, expect } from "vitest";
import {
  calculateSubScores,
  calculateOverallScore,
  checkBranchMinSpecs,
  generateWhyItFits,
  scoreLaptopForBranch,
  DEFAULT_WEIGHTS,
} from "@/lib/scoring";
import { Laptop, Branch } from "@/lib/types";
import laptopsData from "@/data/laptops.json";
import branchesData from "@/data/branches.json";

const laptops = laptopsData as Laptop[];
const branches = branchesData as Branch[];

describe("Scoring Engine Unit Tests", () => {
  const cseBranch = branches.find((b) => b.slug === "cse-aiml")!;
  const mechBranch = branches.find((b) => b.slug === "mech")!;
  const designBranch = branches.find((b) => b.slug === "design")!;

  it("calculates 0-100 bounded sub-scores for every laptop in the catalog", () => {
    laptops.forEach((laptop) => {
      const sub = calculateSubScores(laptop);
      expect(sub.performance).toBeGreaterThanOrEqual(0);
      expect(sub.performance).toBeLessThanOrEqual(100);

      expect(sub.battery).toBeGreaterThanOrEqual(0);
      expect(sub.battery).toBeLessThanOrEqual(100);

      expect(sub.portability).toBeGreaterThanOrEqual(0);
      expect(sub.portability).toBeLessThanOrEqual(100);

      expect(sub.display).toBeGreaterThanOrEqual(0);
      expect(sub.display).toBeLessThanOrEqual(100);

      expect(sub.build).toBeGreaterThanOrEqual(0);
      expect(sub.build).toBeLessThanOrEqual(100);

      expect(sub.value).toBeGreaterThanOrEqual(0);
      expect(sub.value).toBeLessThanOrEqual(100);

      expect(sub.futureProofing).toBeGreaterThanOrEqual(0);
      expect(sub.futureProofing).toBeLessThanOrEqual(100);
    });
  });

  it("gives high portability and battery score to ultraportables (MacBook Air / Zenbook)", () => {
    const macbook = laptops.find((l) => l.slug === "apple-macbook-air-m2")!;
    const zenbook = laptops.find((l) => l.slug === "asus-zenbook-14-oled-ux3405")!;

    const macSub = calculateSubScores(macbook);
    const zenSub = calculateSubScores(zenbook);

    expect(macSub.portability).toBeGreaterThanOrEqual(85);
    expect(macSub.battery).toBeGreaterThanOrEqual(85);
    expect(zenSub.portability).toBeGreaterThanOrEqual(85);
    expect(zenSub.display).toBeGreaterThanOrEqual(90); // 3K OLED
  });

  it("disqualifies laptops without dedicated GPU from Mechanical Engineering", () => {
    // Asus Vivobook 15 has integrated UHD graphics
    const integratedLaptop = laptops.find((l) => l.slug === "asus-vivobook-15-x1504za")!;
    const checkIntegrated = checkBranchMinSpecs(integratedLaptop, mechBranch);
    expect(checkIntegrated.meetsMinSpecs).toBe(false);
    expect(checkIntegrated.disqualificationReasons.some((r) => r.includes("dedicated graphics card"))).toBe(true);

    // Asus Vivobook 16X has dedicated RTX 2050 4GB GPU
    const dedicatedLaptop = laptops.find((l) => l.slug === "asus-vivobook-16x-rtx2050")!;
    const checkDedicated = checkBranchMinSpecs(dedicatedLaptop, mechBranch);
    expect(checkDedicated.meetsMinSpecs).toBe(true);
    expect(checkDedicated.disqualificationReasons.length).toBe(0);
  });

  it("disqualifies laptops with soldered 8GB RAM from CSE AI-ML minimum specs", () => {
    // IdeaPad Slim 1 has 8GB soldered non-upgradable RAM
    const slim1 = laptops.find((l) => l.slug === "lenovo-ideapad-slim-1-15amn7")!;
    const check = checkBranchMinSpecs(slim1, cseBranch);
    expect(check.meetsMinSpecs).toBe(false);
    expect(check.disqualificationReasons.some((r) => r.includes("soldered 8GB RAM"))).toBe(true);
  });

  it("re-ranks laptops dynamically when custom weight sliders change", () => {
    const gamingRig = laptops.find((l) => l.slug === "lenovo-loq-15-rtx4050")!;
    const ultrabook = laptops.find((l) => l.slug === "apple-macbook-air-m2")!;

    // Scenario A: Extreme Performance weight
    const perfWeights = { ...DEFAULT_WEIGHTS, performance: 90, battery: 5, portability: 5 };
    const perfGaming = calculateOverallScore(calculateSubScores(gamingRig), perfWeights);
    const perfUltra = calculateOverallScore(calculateSubScores(ultrabook), perfWeights);
    expect(perfGaming).toBeGreaterThan(perfUltra);

    // Scenario B: Extreme Battery & Portability weight
    const batteryWeights = { ...DEFAULT_WEIGHTS, performance: 5, battery: 70, portability: 25 };
    const batGaming = calculateOverallScore(calculateSubScores(gamingRig), batteryWeights);
    const batUltra = calculateOverallScore(calculateSubScores(ultrabook), batteryWeights);
    expect(batUltra).toBeGreaterThan(batGaming);
  });

  it("generates contextual 'Why this fits you' bullets based on branch", () => {
    const oledLaptop = laptops.find((l) => l.slug === "acer-swift-go-14-oled")!;
    const sub = calculateSubScores(oledLaptop);
    const bulletsDesign = generateWhyItFits(oledLaptop, designBranch, sub);
    expect(bulletsDesign.some((b) => b.includes("color gamut") || b.includes("OLED"))).toBe(true);

    const cseLaptop = laptops.find((l) => l.slug === "lenovo-ideapad-slim-3-ryzen7")!;
    const subCse = calculateSubScores(cseLaptop);
    const bulletsCse = generateWhyItFits(cseLaptop, cseBranch, subCse);
    expect(bulletsCse.some((b) => b.includes("16GB RAM") || b.includes("Docker"))).toBe(true);
  });

  it("applies budget penalty when laptop exceeds requested budget", () => {
    const expensiveLaptop = laptops.find((l) => l.slug === "asus-rog-zephyrus-g14-oled")!; // ₹1,44,990
    const scoredWithinBudget = scoreLaptopForBranch(expensiveLaptop, cseBranch, undefined, 160000);
    const scoredOverBudget = scoreLaptopForBranch(expensiveLaptop, cseBranch, undefined, 70000);

    expect(scoredOverBudget.matchPercentage).toBeLessThan(scoredWithinBudget.matchPercentage);
  });
});

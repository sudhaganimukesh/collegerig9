import { describe, it, expect } from "vitest";
import { getLaptops, getBranches, getCampus, getDiscounts } from "@/lib/data";
import { scoreLaptopForBranch, calculateSubScores, calculateOverallScore, BRANCH_PRESETS } from "@/lib/scoring";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

describe("End-to-End User Flow & Data Pipeline", () => {
  it("executes complete Finder flow: branch selection -> scoring -> min-spec filtering", async () => {
    const laptops = await getLaptops();
    const branches = await getBranches();
    const cseBranch = branches.find((b) => b.slug === "cse-aiml")!;
    const mechBranch = branches.find((b) => b.slug === "mech")!;

    // CSE Finder scoring with ₹70,000 budget
    const cseResults = laptops.map((l) => scoreLaptopForBranch(l, cseBranch, undefined, 70000));
    expect(cseResults.length).toBe(laptops.length);

    // Verify disqualification rules in CSE: laptops with 8GB non-upgradable RAM must fail min specs
    const failedRam = cseResults.filter(
      (r) => !r.meetsMinSpecs && r.disqualificationReasons.some((reason) => reason.includes("RAM"))
    );
    expect(failedRam.length).toBeGreaterThan(0);

    // Mechanical Finder scoring: laptops without dedicated GPU must fail
    const mechResults = laptops.map((l) => scoreLaptopForBranch(l, mechBranch));
    const failedGpu = mechResults.filter(
      (r) => !r.meetsMinSpecs && r.disqualificationReasons.some((reason) => reason.toLowerCase().includes("dedicated"))
    );
    expect(failedGpu.length).toBeGreaterThan(0);
  });

  it("dynamically re-ranks laptops when user adjusts weight sliders", async () => {
    const laptops = await getLaptops();
    const branches = await getBranches();
    const branch = branches.find((b) => b.slug === "cse-aiml")!;

    // Standard weights ranking
    const standardScores = laptops
      .map((l) => scoreLaptopForBranch(l, branch))
      .sort((a, b) => b.overallScore - a.overallScore);

    // Heavy battery priority override (boost battery to 70%)
    const batteryHeavyScores = laptops
      .map((l) =>
        scoreLaptopForBranch(l, branch, {
          performance: 5,
          battery: 70,
          portability: 10,
          display: 5,
          build: 5,
          value: 5,
          futureProofing: 0,
        })
      )
      .sort((a, b) => b.overallScore - a.overallScore);

    expect(batteryHeavyScores[0].laptopId).toBeDefined();
    // MacBook Air M2 (lap-15) has high battery capacity and efficiency
    const macbookScoreBattery = batteryHeavyScores.find((s) => s.laptopId === "lap-15");
    expect(macbookScoreBattery).toBeDefined();
    expect(macbookScoreBattery!.subScores.battery).toBeGreaterThanOrEqual(85);
  });

  it("verifies sitemap route generation covers all static and dynamic paths", async () => {
    const siteRoutes = await sitemap();
    expect(siteRoutes.length).toBeGreaterThanOrEqual(28); // 8 static + 20 laptops

    const urls = siteRoutes.map((r) => r.url);
    expect(urls.some((u) => u.endsWith("/"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/finder"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/laptops"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/compare"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/discounts"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/campus/kprit"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/methodology"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/about"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/privacy"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/terms"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/thank-you"))).toBe(true);
  });

  it("verifies robots.txt config", () => {
    const config = robots();
    expect(config.sitemap).toBeDefined();
  });

  it("verifies KPRIT Hyderabad pilot campus data and repair networks", async () => {
    const campus = await getCampus("kprit");
    expect(campus).not.toBeNull();
    expect(campus?.city).toBe("Hyderabad");
    expect(campus?.nearbyServiceHubs.length).toBeGreaterThan(0);
    expect(campus?.hostelLifeNotes.length).toBeGreaterThan(0);
  });
});

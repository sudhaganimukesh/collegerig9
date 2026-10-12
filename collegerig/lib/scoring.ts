import { Laptop, Branch, ScoreWeights, SubScores, ScoringResult } from "./types";

/**
 * Default balanced weights across all 7 dimensions
 */
export const DEFAULT_WEIGHTS: ScoreWeights = {
  performance: 25,
  battery: 20,
  portability: 15,
  display: 15,
  build: 10,
  value: 10,
  futureProofing: 5,
};

/**
 * Department score weight presets
 */
export const BRANCH_PRESETS: Record<string, ScoreWeights> = {
  "cse-aiml": {
    performance: 35,
    battery: 20,
    portability: 10,
    display: 10,
    build: 10,
    value: 10,
    futureProofing: 5,
  },
  ece: {
    performance: 25,
    battery: 25,
    portability: 15,
    display: 10,
    build: 10,
    value: 10,
    futureProofing: 5,
  },
  mech: {
    performance: 40,
    battery: 10,
    portability: 5,
    display: 15,
    build: 15,
    value: 10,
    futureProofing: 5,
  },
  civil: {
    performance: 35,
    battery: 15,
    portability: 10,
    display: 15,
    build: 10,
    value: 10,
    futureProofing: 5,
  },
  design: {
    performance: 25,
    battery: 15,
    portability: 10,
    display: 30,
    build: 10,
    value: 5,
    futureProofing: 5,
  },
  commerce: {
    performance: 15,
    battery: 35,
    portability: 25,
    display: 10,
    build: 5,
    value: 5,
    futureProofing: 5,
  },
};

/**
 * Calculate the 7 sub-scores (0-100 each) for a given laptop using pure formulas.
 */
export function calculateSubScores(laptop: Laptop): SubScores {
  // 1. Performance (0-100)
  // CPU score
  let cpuScore = Math.min(100, Math.max(30, laptop.cpu.cores * 8 + (laptop.cpu.threads ? laptop.cpu.threads * 2 : 0)));
  const cpuLower = laptop.cpu.name.toLowerCase();
  if (cpuLower.includes("ultra 7") || cpuLower.includes("i7") || cpuLower.includes("ryzen 7") || cpuLower.includes("m3") || cpuLower.includes("ryzen 9")) {
    cpuScore = Math.max(cpuScore, 85);
  } else if (cpuLower.includes("ultra 5") || cpuLower.includes("i5") || cpuLower.includes("ryzen 5") || cpuLower.includes("m2") || cpuLower.includes("m1")) {
    cpuScore = Math.max(cpuScore, 72);
  }

  // GPU score
  let gpuScore = 35; // baseline integrated
  if (laptop.gpu.type === "dedicated") {
    if (laptop.gpu.vramGb >= 8) gpuScore = 98;
    else if (laptop.gpu.vramGb >= 6) gpuScore = 88;
    else if (laptop.gpu.vramGb >= 4) gpuScore = 74;
    else gpuScore = 60;
  } else {
    // High-tier integrated GPUs
    if (cpuLower.includes("m3") || cpuLower.includes("m2")) gpuScore = 68;
    else if (cpuLower.includes("m1") || cpuLower.includes("ultra") || cpuLower.includes("arc")) gpuScore = 62;
    else if (cpuLower.includes("780m") || cpuLower.includes("680m")) gpuScore = 58;
    else gpuScore = 40;
  }

  // RAM score
  let ramScore = 35;
  if (laptop.ramGb >= 32) ramScore = 100;
  else if (laptop.ramGb >= 16) ramScore = 85;
  else if (laptop.ramGb >= 8) ramScore = laptop.ramUpgradable ? 58 : 42;

  const performance = Math.round(cpuScore * 0.45 + gpuScore * 0.4 + ramScore * 0.15);

  // 2. Battery (0-100)
  // Scale battery capacity (35Wh -> 45, 90Wh -> 98)
  const capacityScore = Math.min(100, Math.max(30, (laptop.batteryWh - 30) * 1.1 + 40));
  // Scale claimed hours (4hr -> 35, 18hr -> 100)
  const runtimeScore = Math.min(100, Math.max(30, laptop.claimedBatteryHrs * 5.5));
  // Efficiency bonus for high runtime per Wh (ARM M-series / Intel Core Ultra / AMD U-series)
  const efficiencyBonus = laptop.claimedBatteryHrs >= 14 ? 8 : laptop.claimedBatteryHrs >= 10 ? 4 : 0;
  // Penalty for dedicated high-wattage gaming GPUs on battery
  const efficiencyPenalty = laptop.gpu.type === "dedicated" && laptop.batteryWh < 65 ? 8 : 0;
  const battery = Math.round(Math.min(100, Math.max(10, (capacityScore * 0.4 + runtimeScore * 0.6 + efficiencyBonus) - efficiencyPenalty)));

  // 3. Portability (0-100)
  // Weight curve: <= 1.25kg -> 98, 1.4kg -> 88, 1.6kg -> 78, 1.8kg -> 65, 2.2kg -> 45, >= 2.4kg -> 25
  let weightScore: number;
  if (laptop.weightKg <= 1.25) weightScore = 98;
  else if (laptop.weightKg <= 1.4) weightScore = 88;
  else if (laptop.weightKg <= 1.65) weightScore = 76;
  else if (laptop.weightKg <= 1.85) weightScore = 64;
  else if (laptop.weightKg <= 2.1) weightScore = 48;
  else if (laptop.weightKg <= 2.35) weightScore = 36;
  else weightScore = 24;

  // Display size factor (13-14 inch easier to slip in backpack than 16 inch)
  const sizeBonus = laptop.display.sizeIn <= 14.1 ? 5 : laptop.display.sizeIn >= 16 ? -5 : 0;
  const portability = Math.round(Math.min(100, Math.max(10, weightScore + sizeBonus)));

  // 4. Display (0-100)
  let panelScore = 75;
  if (laptop.display.panel === "OLED" || laptop.display.panel === "Retina") panelScore = 98;
  else if (laptop.display.panel === "IPS" || laptop.display.panel === "IPS-Level" || laptop.display.panel === "WVA") panelScore = 78;
  else if (laptop.display.panel === "TN") panelScore = 38;

  let brightnessScore = Math.min(100, Math.max(40, (laptop.display.nits / 400) * 85));
  if (laptop.display.nits >= 500) brightnessScore = 100;

  let refreshScore = 60;
  if (laptop.display.refreshHz >= 144) refreshScore = 98;
  else if (laptop.display.refreshHz >= 120) refreshScore = 90;
  else if (laptop.display.refreshHz >= 90) refreshScore = 80;

  const colorScore = Math.min(100, Math.max(45, (laptop.display.srgbPct / 100) * 100));

  const display = Math.round(
    panelScore * 0.3 + brightnessScore * 0.25 + colorScore * 0.3 + refreshScore * 0.15
  );

  // 5. Build & Keyboard (0-100)
  let buildScore = 55;
  if (laptop.backlitKeyboard) buildScore += 15;
  // Port versatility check
  const portCount = laptop.ports.length;
  if (portCount >= 5) buildScore += 15;
  else if (portCount >= 3) buildScore += 10;

  if (laptop.warrantyYears >= 2) buildScore += 10;
  else if (laptop.warrantyYears >= 1) buildScore += 5;

  const build = Math.round(Math.min(100, Math.max(30, buildScore)));

  // 6. Value for Money (0-100)
  // Expected price index based on raw specs
  const rawFeatureSum = performance * 1.2 + display * 0.8 + battery * 0.8 + portability * 0.6;
  // Baseline price target in INR
  const priceInThousands = laptop.priceInr / 1000;
  let valueScore = 65;
  if (priceInThousands <= 40) {
    valueScore = rawFeatureSum > 180 ? 94 : 85;
  } else if (priceInThousands <= 60) {
    valueScore = rawFeatureSum > 230 ? 92 : 80;
  } else if (priceInThousands <= 80) {
    valueScore = rawFeatureSum > 260 ? 86 : 74;
  } else if (priceInThousands <= 110) {
    valueScore = rawFeatureSum > 280 ? 80 : 68;
  } else {
    valueScore = rawFeatureSum > 310 ? 76 : 60;
  }
  const value = Math.round(Math.min(100, Math.max(20, valueScore)));

  // 7. Future-proofing (0-100)
  let futureScore = 40;
  if (laptop.ramUpgradable) futureScore += 25;
  if (laptop.ramGb >= 16) futureScore += 20;
  if (laptop.storageGb >= 1000) futureScore += 15;
  else if (laptop.storageGb >= 512) futureScore += 10;
  if (laptop.gpu.vramGb >= 6) futureScore += 10;
  const futureProofing = Math.round(Math.min(100, Math.max(20, futureScore)));

  return {
    performance,
    battery,
    portability,
    display,
    build,
    value,
    futureProofing,
  };
}

/**
 * Calculate weighted overall score from sub-scores and weights.
 */
export function calculateOverallScore(subScores: SubScores, weights: ScoreWeights): number {
  const totalWeight =
    weights.performance +
    weights.battery +
    weights.portability +
    weights.display +
    weights.build +
    weights.value +
    weights.futureProofing;

  if (totalWeight <= 0) return 50;

  const weightedSum =
    subScores.performance * weights.performance +
    subScores.battery * weights.battery +
    subScores.portability * weights.portability +
    subScores.display * weights.display +
    subScores.build * weights.build +
    subScores.value * weights.value +
    subScores.futureProofing * weights.futureProofing;

  return Math.round(weightedSum / totalWeight);
}

/**
 * Verify whether a laptop satisfies a branch's minimum specs.
 * Returns exact reasons if disqualified.
 */
export function checkBranchMinSpecs(
  laptop: Laptop,
  branch: Branch
): { meetsMinSpecs: boolean; disqualificationReasons: string[] } {
  const reasons: string[] = [];
  const min = branch.minSpecs;

  // RAM requirement
  if (laptop.ramGb < min.minRamGb) {
    if (!laptop.ramUpgradable) {
      reasons.push(
        `Requires minimum ${min.minRamGb}GB RAM for ${branch.name}. This laptop has soldered ${laptop.ramGb}GB RAM which cannot be upgraded.`
      );
    } else {
      reasons.push(
        `Comes with ${laptop.ramGb}GB RAM (minimum recommended: ${min.minRamGb}GB). An immediate RAM upgrade is required.`
      );
    }
  }

  // Dedicated GPU requirement
  if (min.requiresDedicatedGpu && laptop.gpu.type !== "dedicated") {
    reasons.push(
      `${branch.name} software (${branch.typicalSoftware.slice(0, 3).join(", ")}) requires a dedicated graphics card. This machine only has integrated ${laptop.gpu.name}.`
    );
  }

  // Minimum VRAM check if specified
  if (min.minVramGb && min.minVramGb > 0) {
    if (laptop.gpu.vramGb < min.minVramGb) {
      reasons.push(
        `Requires at least ${min.minVramGb}GB VRAM for 3D simulation/rendering. This model provides ${laptop.gpu.vramGb}GB VRAM.`
      );
    }
  }

  // Minimum storage check
  if (laptop.storageGb < min.minStorageGb) {
    reasons.push(
      `Requires at least ${min.minStorageGb}GB storage for heavy project suites. This laptop only has ${laptop.storageGb}GB.`
    );
  }

  // CPU cores check
  if (min.minCpuCores && laptop.cpu.cores < min.minCpuCores) {
    reasons.push(
      `Recommended minimum ${min.minCpuCores} CPU cores. This processor only has ${laptop.cpu.cores} cores.`
    );
  }

  return {
    meetsMinSpecs: reasons.length === 0,
    disqualificationReasons: reasons,
  };
}

/**
 * Generate contextual "Why this fits you" bullet points.
 */
export function generateWhyItFits(
  laptop: Laptop,
  branch: Branch,
  subScores: SubScores,
  userBudget?: number
): string[] {
  const points: string[] = [];

  // Branch software compatibility
  if (branch.slug === "cse-aiml") {
    if (laptop.ramGb >= 16) {
      points.push("16GB RAM handles Docker containers, virtual machines, and IDEs smoothly");
    }
    if (laptop.gpu.type === "dedicated" && laptop.gpu.vramGb >= 6) {
      points.push(`Dedicated ${laptop.gpu.name} (${laptop.gpu.vramGb}GB) speeds up PyTorch & CUDA tensor operations`);
    } else if (laptop.cpu.cores >= 8) {
      points.push(`${laptop.cpu.cores}-core processor ensures fast code compilation and multitasking`);
    }
  } else if (branch.slug === "mech" || branch.slug === "civil") {
    if (laptop.gpu.type === "dedicated") {
      points.push(`Dedicated ${laptop.gpu.name} GPU enables hardware-accelerated 3D viewport in AutoCAD & SolidWorks`);
    }
    if (laptop.ramUpgradable) {
      points.push("Expandable memory slots let you upgrade to 32GB for large finite-element meshes");
    }
  } else if (branch.slug === "design") {
    if (laptop.display.srgbPct >= 95 || laptop.display.panel === "OLED" || laptop.display.panel === "Retina") {
      points.push(`${laptop.display.panel} screen with ${laptop.display.srgbPct}% color gamut gives accurate Figma & Blender previews`);
    }
  } else if (branch.slug === "commerce") {
    if (subScores.battery >= 80) {
      points.push(`${laptop.claimedBatteryHrs}h battery comfortably outlasts a full day of seminars without hunting for plugs`);
    }
    if (laptop.weightKg <= 1.6) {
      points.push(`At only ${laptop.weightKg}kg, it is easy to carry daily across campus`);
    }
  }

  // Battery & Campus life
  if (subScores.battery >= 85 && points.length < 3) {
    points.push(`${laptop.claimedBatteryHrs}h battery handles long lectures and lab periods without needing a charger`);
  } else if (laptop.weightKg <= 1.4 && points.length < 3) {
    points.push(`Lightweight chassis (${laptop.weightKg}kg) won't strain your back during daily bus commutes`);
  }

  // Budget bonus
  if (userBudget && laptop.priceInr <= userBudget && points.length < 3) {
    const savings = userBudget - laptop.priceInr;
    if (savings >= 5000) {
      points.push(`Fits comfortably under budget, leaving headroom for accessories or laptop bag`);
    }
  }

  // Student Discount
  if (laptop.studentDiscount && points.length < 3) {
    points.push(`Eligible for ${laptop.studentDiscount.program} student benefits`);
  }

  // Fallback if needed
  if (points.length === 0) {
    points.push("Well-balanced configuration meeting core academic guidelines");
    points.push(`Solid ${laptop.warrantyYears}-year manufacturer warranty`);
  }

  return points.slice(0, 3);
}

/**
 * Score a laptop against a branch with customizable weights and optional budget.
 */
export function scoreLaptopForBranch(
  laptop: Laptop,
  branch: Branch,
  customWeights?: Partial<ScoreWeights>,
  userBudget?: number
): ScoringResult {
  const subScores = calculateSubScores(laptop);
  const activeWeights: ScoreWeights = {
    ...branch.scoreWeights,
    ...(customWeights || {}),
  };

  const rawOverall = calculateOverallScore(subScores, activeWeights);
  const { meetsMinSpecs, disqualificationReasons } = checkBranchMinSpecs(laptop, branch);

  // Match score calculation
  let matchPercentage = rawOverall;
  if (!meetsMinSpecs) {
    // Penalty for failing minimum specs
    matchPercentage = Math.max(20, rawOverall - 25);
  }
  if (userBudget && laptop.priceInr > userBudget) {
    // Over budget penalty
    const overBudgetPct = (laptop.priceInr - userBudget) / userBudget;
    matchPercentage = Math.max(15, Math.round(matchPercentage * (1 - Math.min(0.4, overBudgetPct))));
  }

  const whyItFits = generateWhyItFits(laptop, branch, subScores, userBudget);

  return {
    laptopId: laptop.id,
    subScores,
    overallScore: rawOverall,
    matchPercentage,
    meetsMinSpecs,
    disqualificationReasons,
    whyItFits,
  };
}

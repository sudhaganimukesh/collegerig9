export * from "./schema";

export interface SubScores {
  performance: number;
  battery: number;
  portability: number;
  display: number;
  build: number;
  value: number;
  futureProofing: number;
}

export interface ScoringResult {
  laptopId: string;
  subScores: SubScores;
  overallScore: number;
  matchPercentage: number;
  meetsMinSpecs: boolean;
  disqualificationReasons: string[];
  whyItFits: string[];
}

export interface ScoreWeights {
  performance: number;
  battery: number;
  portability: number;
  display: number;
  build: number;
  value: number;
  futureProofing: number;
}

export interface FinderState {
  branchSlug?: string;
  budgetInr?: number;
  priorities?: {
    batteryFirst?: boolean;
    heavyWorkloads?: boolean;
    portableCommute?: boolean;
    colorAccuracy?: boolean;
    gamingCad?: boolean;
  };
  preferences?: {
    preferredOs?: "any" | "windows" | "macos";
    maxWeightKg?: number;
    screenSizePreference?: "any" | "compact" | "standard";
  };
}

export interface FilterState {
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  brands?: string[];
  minRamGb?: number;
  gpuType?: "all" | "dedicated" | "integrated";
  maxWeightKg?: number;
  minBatteryWh?: number;
  os?: string[];
  ramUpgradableOnly?: boolean;
  sortBy?: "score" | "price-asc" | "price-desc" | "battery" | "portability" | "performance";
}

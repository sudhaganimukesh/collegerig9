import { z } from "zod";

// --- Zod Schemas ---

export const CpuSchema = z.object({
  name: z.string(),
  cores: z.number().int().positive(),
  threads: z.number().int().positive().optional(),
  benchmarkScore: z.number().optional(),
});

export const GpuSchema = z.object({
  name: z.string(),
  type: z.enum(["integrated", "dedicated"]),
  vramGb: z.number().nonnegative(),
});

export const DisplaySchema = z.object({
  sizeIn: z.number().positive(),
  resolution: z.string(),
  panel: z.enum(["IPS", "OLED", "TN", "Retina", "WVA", "IPS-Level"]),
  nits: z.number().positive(),
  refreshHz: z.number().positive(),
  srgbPct: z.number().min(0).max(100),
});

export const SourceLinkSchema = z.object({
  label: z.string(),
  url: z.string().url(),
});

export const BuyLinkSchema = z.object({
  store: z.enum(["Amazon.in", "Flipkart", "Official Brand Store", "Croma", "Reliance Digital"]),
  url: z.string().url(),
  isAffiliate: z.boolean(),
});

export const StudentDiscountSchema = z.object({
  program: z.string(),
  summary: z.string(),
  url: z.string().url(),
  verifiedOn: z.string(),
});

export const LaptopSchema = z.object({
  id: z.string(),
  slug: z.string(),
  brand: z.string(),
  model: z.string(),
  priceInr: z.number().int().positive(),
  mrpInr: z.number().int().positive(),
  os: z.enum(["Windows 11 Home", "Windows 11 Pro", "macOS", "ChromeOS", "Linux / DOS"]),
  cpu: CpuSchema,
  gpu: GpuSchema,
  ramGb: z.number().int().positive(),
  ramUpgradable: z.boolean(),
  storageGb: z.number().int().positive(),
  storageType: z.enum(["NVMe SSD", "SATA SSD", "eMMC", "PCIe Gen4 SSD"]),
  display: DisplaySchema,
  batteryWh: z.number().positive(),
  claimedBatteryHrs: z.number().positive(),
  weightKg: z.number().positive(),
  ports: z.array(z.string()),
  backlitKeyboard: z.boolean(),
  warrantyYears: z.number().positive(),
  serviceNotes: z.string(),
  pros: z.array(z.string()).min(1),
  cons: z.array(z.string()).min(1),
  bestFor: z.array(z.string()).min(1),
  sources: z.array(SourceLinkSchema).min(1),
  lastVerified: z.string(),
  isVerified: z.boolean(),
  buyLinks: z.array(BuyLinkSchema).min(1),
  studentDiscount: StudentDiscountSchema.optional(),
  sponsored: z.boolean().optional(),
});

export const ScoreWeightsSchema = z.object({
  performance: z.number().min(0).max(100),
  battery: z.number().min(0).max(100),
  portability: z.number().min(0).max(100),
  display: z.number().min(0).max(100),
  build: z.number().min(0).max(100),
  value: z.number().min(0).max(100),
  futureProofing: z.number().min(0).max(100),
});

export const BranchMinSpecsSchema = z.object({
  minRamGb: z.number().int().positive(),
  requiresDedicatedGpu: z.boolean(),
  minVramGb: z.number().nonnegative().optional(),
  minStorageGb: z.number().int().positive(),
  minCpuCores: z.number().int().positive().optional(),
  preferredOs: z.array(z.string()).optional(),
});

export const BranchSchema = z.object({
  slug: z.string(),
  name: z.string(),
  shortName: z.string(),
  description: z.string(),
  typicalSoftware: z.array(z.string()),
  minSpecs: BranchMinSpecsSchema,
  scoreWeights: ScoreWeightsSchema,
});

export const CampusPickSchema = z.object({
  laptopSlug: z.string(),
  branchSlug: z.string(),
  reason: z.string(),
  hostelFriendly: z.boolean(),
});

export const ServiceHubSchema = z.object({
  area: z.string(),
  brand: z.string(),
  distanceKm: z.number(),
  address: z.string(),
  contactPhone: z.string().optional(),
});

export const CampusSchema = z.object({
  slug: z.string(),
  name: z.string(),
  shortName: z.string(),
  city: z.string(),
  state: z.string(),
  description: z.string(),
  hostelLifeNotes: z.string(),
  picks: z.array(CampusPickSchema),
  nearbyServiceHubs: z.array(ServiceHubSchema),
});

export const DiscountDirectorySchema = z.object({
  slug: z.string(),
  brand: z.string(),
  program: z.string(),
  discountSummary: z.string(),
  eligibility: z.string(),
  verificationMethod: z.string(),
  url: z.string().url(),
  steps: z.array(z.string()),
  verifiedOn: z.string(),
  badgeText: z.string(),
});

// Inferred TypeScript types
export type Cpu = z.infer<typeof CpuSchema>;
export type Gpu = z.infer<typeof GpuSchema>;
export type Display = z.infer<typeof DisplaySchema>;
export type SourceLink = z.infer<typeof SourceLinkSchema>;
export type BuyLink = z.infer<typeof BuyLinkSchema>;
export type StudentDiscount = z.infer<typeof StudentDiscountSchema>;
export type Laptop = z.infer<typeof LaptopSchema>;
export type ScoreWeights = z.infer<typeof ScoreWeightsSchema>;
export type BranchMinSpecs = z.infer<typeof BranchMinSpecsSchema>;
export type Branch = z.infer<typeof BranchSchema>;
export type CampusPick = z.infer<typeof CampusPickSchema>;
export type ServiceHub = z.infer<typeof ServiceHubSchema>;
export type Campus = z.infer<typeof CampusSchema>;
export type DiscountDirectoryItem = z.infer<typeof DiscountDirectorySchema>;

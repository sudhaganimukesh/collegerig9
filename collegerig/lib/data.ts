import { Laptop, Branch, Campus, DiscountDirectoryItem, FilterState } from "./types";
import laptopsData from "@/data/laptops.json";
import branchesData from "@/data/branches.json";
import campusData from "@/data/campus.json";
import discountsData from "@/data/discounts.json";

// Raw datasets typed from imported JSON
const laptops: Laptop[] = laptopsData as Laptop[];
const branches: Branch[] = branchesData as Branch[];
const campus: Campus = campusData as Campus;
const discounts: DiscountDirectoryItem[] = discountsData as DiscountDirectoryItem[];

/**
 * Fetch all laptops with optional filtering and sorting.
 * Async signature ensures seamless future migration to Supabase/PostgreSQL.
 */
export async function getLaptops(filter?: FilterState): Promise<Laptop[]> {
  let result = [...laptops];

  if (!filter) return result;

  // Search query (matches brand, model, cpu name, gpu name)
  if (filter.query && filter.query.trim().length > 0) {
    const q = filter.query.toLowerCase().trim();
    result = result.filter(
      (lap) =>
        lap.brand.toLowerCase().includes(q) ||
        lap.model.toLowerCase().includes(q) ||
        lap.cpu.name.toLowerCase().includes(q) ||
        lap.gpu.name.toLowerCase().includes(q) ||
        lap.bestFor.some((bf) => bf.toLowerCase().includes(q))
    );
  }

  // Price range
  if (typeof filter.minPrice === "number") {
    result = result.filter((lap) => lap.priceInr >= (filter.minPrice as number));
  }
  if (typeof filter.maxPrice === "number") {
    result = result.filter((lap) => lap.priceInr <= (filter.maxPrice as number));
  }

  // Brands filter
  if (filter.brands && filter.brands.length > 0) {
    const brandSet = new Set(filter.brands.map((b) => b.toLowerCase()));
    result = result.filter((lap) => brandSet.has(lap.brand.toLowerCase()));
  }

  // Minimum RAM filter
  if (typeof filter.minRamGb === "number") {
    result = result.filter((lap) => lap.ramGb >= (filter.minRamGb as number));
  }

  // GPU type filter
  if (filter.gpuType && filter.gpuType !== "all") {
    result = result.filter((lap) => lap.gpu.type === filter.gpuType);
  }

  // Max weight filter
  if (typeof filter.maxWeightKg === "number") {
    result = result.filter((lap) => lap.weightKg <= (filter.maxWeightKg as number));
  }

  // Min battery Wh filter
  if (typeof filter.minBatteryWh === "number") {
    result = result.filter((lap) => lap.batteryWh >= (filter.minBatteryWh as number));
  }

  // Operating system filter
  if (filter.os && filter.os.length > 0) {
    const osSet = new Set(filter.os);
    result = result.filter((lap) => osSet.has(lap.os));
  }

  // Upgradable RAM filter
  if (filter.ramUpgradableOnly) {
    result = result.filter((lap) => lap.ramUpgradable);
  }

  // Sorting
  if (filter.sortBy) {
    switch (filter.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.priceInr - b.priceInr);
        break;
      case "price-desc":
        result.sort((a, b) => b.priceInr - a.priceInr);
        break;
      case "battery":
        result.sort((a, b) => b.batteryWh - a.batteryWh);
        break;
      case "portability":
        result.sort((a, b) => a.weightKg - b.weightKg);
        break;
      case "performance":
        result.sort((a, b) => (b.cpu.benchmarkScore || 0) - (a.cpu.benchmarkScore || 0));
        break;
      default:
        // Default sort keeps seed order or score
        break;
    }
  }

  return result;
}

/**
 * Fetch a single laptop by slug.
 */
export async function getLaptopBySlug(slug: string): Promise<Laptop | null> {
  const match = laptops.find((l) => l.slug === slug);
  return match || null;
}

/**
 * Fetch a single laptop by unique ID.
 */
export async function getLaptopById(id: string): Promise<Laptop | null> {
  const match = laptops.find((l) => l.id === id);
  return match || null;
}

/**
 * Fetch similar laptops in the same budget bracket (±25%) or same branch category.
 */
export async function getSimilarLaptops(currentLaptop: Laptop, limit: number = 3): Promise<Laptop[]> {
  const minPrice = currentLaptop.priceInr * 0.75;
  const maxPrice = currentLaptop.priceInr * 1.3;

  const candidates = laptops.filter(
    (l) => l.id !== currentLaptop.id && l.priceInr >= minPrice && l.priceInr <= maxPrice
  );

  // Return up to limit candidates
  return candidates.slice(0, limit);
}

/**
 * Fetch all academic branches.
 */
export async function getBranches(): Promise<Branch[]> {
  return branches;
}

/**
 * Fetch a single branch by slug.
 */
export async function getBranchBySlug(slug: string): Promise<Branch | null> {
  const match = branches.find((b) => b.slug === slug);
  return match || null;
}

/**
 * Fetch campus profile (defaults to pilot 'kprit').
 */
export async function getCampus(slug: string = "kprit"): Promise<Campus | null> {
  if (campus.slug === slug) return campus;
  return null;
}

/**
 * Fetch Indian student discount directory items.
 */
export async function getDiscounts(): Promise<DiscountDirectoryItem[]> {
  return discounts;
}

/**
 * Fetch a single student discount program by slug.
 */
export async function getDiscountBySlug(slug: string): Promise<DiscountDirectoryItem | null> {
  const match = discounts.find((d) => d.slug === slug);
  return match || null;
}

"use client";

import * as React from "react";
import Link from "next/link";
import { Laptop } from "@/lib/types";
import { LaptopCard } from "@/components/laptop-card";
import { useCompareList } from "@/lib/hooks";
import { formatInr } from "@/lib/utils";
import laptopsData from "@/data/laptops.json";
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Scale,
  ArrowUpDown,
  Filter,
  Check,
  ChevronDown,
  Laptop as LaptopIcon,
  ShieldCheck,
} from "lucide-react";
import { AffiliateDisclosureModal } from "@/components/affiliate-disclosure-modal";

const allLaptops = laptopsData as Laptop[];
const allBrands = Array.from(new Set(allLaptops.map((l) => l.brand))).sort();

export default function LaptopsCatalogPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [priceMax, setPriceMax] = React.useState<number>(160000);
  const [minRam, setMinRam] = React.useState<number>(0);
  const [gpuType, setGpuType] = React.useState<"all" | "dedicated" | "integrated">("all");
  const [maxWeight, setMaxWeight] = React.useState<number>(3.0);
  const [minBatteryWh, setMinBatteryWh] = React.useState<number>(0);
  const [ramUpgradableOnly, setRamUpgradableOnly] = React.useState(false);
  const [selectedOs, setSelectedOs] = React.useState<string>("all");
  const [sortBy, setSortBy] = React.useState<string>("score");
  const [filterDrawerOpen, setFilterDrawerOpen] = React.useState(false);
  const [disclosureOpen, setDisclosureOpen] = React.useState(false);

  const { compareList, clearCompare } = useCompareList();

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedBrands([]);
    setPriceMax(160000);
    setMinRam(0);
    setGpuType("all");
    setMaxWeight(3.0);
    setMinBatteryWh(0);
    setRamUpgradableOnly(false);
    setSelectedOs("all");
    setSortBy("score");
  };

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedBrands.length > 0 ||
    priceMax < 160000 ||
    minRam > 0 ||
    gpuType !== "all" ||
    maxWeight < 3.0 ||
    minBatteryWh > 0 ||
    ramUpgradableOnly ||
    selectedOs !== "all";

  // Filter & Sort Logic
  const filteredLaptops = React.useMemo(() => {
    let result = [...allLaptops];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (l) =>
          l.brand.toLowerCase().includes(q) ||
          l.model.toLowerCase().includes(q) ||
          l.cpu.name.toLowerCase().includes(q) ||
          l.gpu.name.toLowerCase().includes(q) ||
          l.bestFor.some((b) => b.toLowerCase().includes(q))
      );
    }

    // Brands
    if (selectedBrands.length > 0) {
      result = result.filter((l) => selectedBrands.includes(l.brand));
    }

    // Price Max
    result = result.filter((l) => l.priceInr <= priceMax);

    // Min RAM
    if (minRam > 0) {
      result = result.filter((l) => l.ramGb >= minRam);
    }

    // GPU Type
    if (gpuType !== "all") {
      result = result.filter((l) => l.gpu.type === gpuType);
    }

    // Max Weight
    if (maxWeight < 3.0) {
      result = result.filter((l) => l.weightKg <= maxWeight);
    }

    // Min Battery Wh
    if (minBatteryWh > 0) {
      result = result.filter((l) => l.batteryWh >= minBatteryWh);
    }

    // Upgradable RAM
    if (ramUpgradableOnly) {
      result = result.filter((l) => l.ramUpgradable);
    }

    // OS
    if (selectedOs !== "all") {
      result = result.filter((l) =>
        selectedOs === "macos" ? l.os === "macOS" : l.os.startsWith("Windows")
      );
    }

    // Sorting
    switch (sortBy) {
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
        // Default: Keep catalog curated ranking
        break;
    }

    return result;
  }, [
    searchQuery,
    selectedBrands,
    priceMax,
    minRam,
    gpuType,
    maxWeight,
    minBatteryWh,
    ramUpgradableOnly,
    selectedOs,
    sortBy,
  ]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="flex flex-col gap-2 pb-6 border-b border-border/80 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Verified Laptops Catalog
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Every specification verified against official manufacturer whitepapers. Zero sponsor influence on ratings.
          </p>
        </div>

        <div className="flex items-center gap-2 pt-2 sm:pt-0">
          <Link
            href="/finder"
            className="tap-target inline-flex items-center gap-1.5 rounded-xl bg-primary/10 border border-primary/30 px-3.5 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
          >
            <span>Need recommendations? Take the 60-Sec Quiz</span>
          </Link>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by model, brand, processor, or software..."
            className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Controls: Mobile Filter Button & Sort Selector */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
            className="tap-target flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
                !
              </span>
            )}
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 shadow-sm">
            <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-semibold text-foreground focus:outline-none cursor-pointer"
            >
              <option value="score">CollegeRig Score</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="battery">Battery Life</option>
              <option value="portability">Portability (Lightest)</option>
              <option value="performance">CPU / GPU Power</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Pills Bar */}
      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          {selectedBrands.map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() => toggleBrand(brand)}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/20"
            >
              <span>{brand}</span>
              <X className="h-3 w-3" />
            </button>
          ))}
          {priceMax < 160000 && (
            <button
              type="button"
              onClick={() => setPriceMax(160000)}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/20"
            >
              <span>Under {formatInr(priceMax)}</span>
              <X className="h-3 w-3" />
            </button>
          )}
          {minRam > 0 && (
            <button
              type="button"
              onClick={() => setMinRam(0)}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/20"
            >
              <span>{minRam}GB+ RAM</span>
              <X className="h-3 w-3" />
            </button>
          )}
          {gpuType !== "all" && (
            <button
              type="button"
              onClick={() => setGpuType("all")}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/20"
            >
              <span>{gpuType === "dedicated" ? "Dedicated GPU" : "Integrated GPU"}</span>
              <X className="h-3 w-3" />
            </button>
          )}
          {ramUpgradableOnly && (
            <button
              type="button"
              onClick={() => setRamUpgradableOnly(false)}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/20"
            >
              <span>Upgradable RAM Only</span>
              <X className="h-3 w-3" />
            </button>
          )}
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground underline underline-offset-2 ml-1"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Clear all</span>
          </button>
        </div>
      )}

      {/* Affiliate & Scoring Transparency Strip */}
      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 rounded-xl border border-border/80 bg-muted/30 px-3.5 py-2.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
          <span>
            <strong className="text-foreground">Audited Scoring Guarantee:</strong> Commercial partnerships never influence our 0–100 scores or filter criteria.
          </span>
        </div>
        <button
          type="button"
          onClick={() => setDisclosureOpen(true)}
          className="text-xs font-semibold text-primary underline underline-offset-2 hover:text-primary/80 shrink-0"
        >
          Affiliate & Ethics Disclosure
        </button>
      </div>

      {/* Main Grid: Sidebar + Laptop Cards */}
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 rounded-2xl border border-border bg-card p-5 shadow-sm h-fit">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <Filter className="h-4 w-4 text-primary" />
              <span>Filters</span>
            </h2>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-primary font-semibold hover:underline"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Budget Range */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <label htmlFor="priceMaxRange" className="text-foreground">Max Budget</label>
              <span className="text-primary">{formatInr(priceMax)}</span>
            </div>
            <input
              id="priceMaxRange"
              type="range"
              min={30000}
              max={160000}
              step={5000}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>₹30,000</span>
              <span>₹1,60,000</span>
            </div>
          </div>

          {/* Quick Budget Shortcuts */}
          <div className="space-y-1.5 pt-2 border-t border-border/60">
            <p className="text-xs font-semibold text-foreground">Budget Tiers</p>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => setPriceMax(45000)}
                className={`rounded-lg border px-2 py-1.5 text-[11px] font-medium transition-colors ${
                  priceMax === 45000 ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"
                }`}
              >
                Under ₹45k
              </button>
              <button
                type="button"
                onClick={() => setPriceMax(65000)}
                className={`rounded-lg border px-2 py-1.5 text-[11px] font-medium transition-colors ${
                  priceMax === 65000 ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"
                }`}
              >
                Under ₹65k
              </button>
              <button
                type="button"
                onClick={() => setPriceMax(90000)}
                className={`rounded-lg border px-2 py-1.5 text-[11px] font-medium transition-colors ${
                  priceMax === 90000 ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"
                }`}
              >
                Under ₹90k
              </button>
              <button
                type="button"
                onClick={() => setPriceMax(160000)}
                className={`rounded-lg border px-2 py-1.5 text-[11px] font-medium transition-colors ${
                  priceMax === 160000 ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"
                }`}
              >
                All Budgets
              </button>
            </div>
          </div>

          {/* Brand Checkboxes */}
          <div className="space-y-2 pt-2 border-t border-border/60">
            <p className="text-xs font-semibold text-foreground">Brands</p>
            <div className="space-y-1.5">
              {allBrands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="rounded border-border text-primary focus:ring-primary accent-primary"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* RAM Capacity */}
          <div className="space-y-2 pt-2 border-t border-border/60">
            <p className="text-xs font-semibold text-foreground">Minimum RAM</p>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {[0, 8, 16].map((ram) => (
                <button
                  key={ram}
                  type="button"
                  onClick={() => setMinRam(ram)}
                  className={`rounded-lg border py-1.5 text-[11px] font-semibold transition-colors ${
                    minRam === ram ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"
                  }`}
                >
                  {ram === 0 ? "Any" : `${ram}GB+`}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={ramUpgradableOnly}
                onChange={(e) => setRamUpgradableOnly(e.target.checked)}
                className="rounded border-border text-primary accent-primary"
              />
              <span>Upgradable Slots Only</span>
            </label>
          </div>

          {/* GPU Type */}
          <div className="space-y-2 pt-2 border-t border-border/60">
            <p className="text-xs font-semibold text-foreground">Graphics (GPU)</p>
            <div className="flex flex-col gap-1 text-xs">
              {[
                { val: "all", label: "All Types" },
                { val: "dedicated", label: "Dedicated Only (CAD / ML / Gaming)" },
                { val: "integrated", label: "Integrated Only (Battery focused)" },
              ].map((opt) => (
                <label key={opt.val} className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground">
                  <input
                    type="radio"
                    name="gpuType"
                    checked={gpuType === opt.val}
                    onChange={() => setGpuType(opt.val as any)}
                    className="accent-primary"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Operating System */}
          <div className="space-y-2 pt-2 border-t border-border/60">
            <p className="text-xs font-semibold text-foreground">Operating System</p>
            <div className="grid grid-cols-3 gap-1 text-xs">
              {[
                { val: "all", label: "All" },
                { val: "windows", label: "Windows" },
                { val: "macos", label: "macOS" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setSelectedOs(opt.val)}
                  className={`rounded-lg border py-1.5 text-[11px] font-semibold transition-colors ${
                    selectedOs === opt.val ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Mobile Filter Modal/Drawer */}
        {filterDrawerOpen && (
          <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-sm lg:hidden">
            <div className="ml-auto flex h-full w-full max-w-xs flex-col bg-background p-6 shadow-2xl overflow-y-auto">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h2 className="text-base font-bold text-foreground">Filter Catalog</h2>
                <button
                  type="button"
                  onClick={() => setFilterDrawerOpen(false)}
                  className="tap-target rounded-lg p-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6 py-4">
                {/* Mobile Budget */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <label htmlFor="mobilePriceMaxRange" className="text-foreground">Max Budget</label>
                    <span className="text-primary">{formatInr(priceMax)}</span>
                  </div>
                  <input
                    id="mobilePriceMaxRange"
                    type="range"
                    min={30000}
                    max={160000}
                    step={5000}
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                {/* Mobile Brands */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-foreground">Brands</p>
                  <div className="grid grid-cols-2 gap-2">
                    {allBrands.map((brand) => (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => toggleBrand(brand)}
                        className={`rounded-lg border p-2 text-xs font-medium ${
                          selectedBrands.includes(brand)
                            ? "border-primary bg-primary/10 text-primary font-bold"
                            : "border-border"
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile RAM */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-foreground">RAM</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[0, 8, 16].map((ram) => (
                      <button
                        key={ram}
                        type="button"
                        onClick={() => setMinRam(ram)}
                        className={`rounded-lg border p-2 text-xs font-medium ${
                          minRam === ram
                            ? "border-primary bg-primary/10 text-primary font-bold"
                            : "border-border"
                        }`}
                      >
                        {ram === 0 ? "Any" : `${ram}GB+`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile GPU */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-foreground">Graphics</p>
                  <div className="flex flex-col gap-1.5 text-xs">
                    {[
                      { val: "all", label: "All Graphics" },
                      { val: "dedicated", label: "Dedicated Only" },
                      { val: "integrated", label: "Integrated Only" },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setGpuType(opt.val as any)}
                        className={`rounded-lg border p-2 text-left text-xs font-medium ${
                          gpuType === opt.val
                            ? "border-primary bg-primary/10 text-primary font-bold"
                            : "border-border"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-auto border-t border-border pt-4 flex gap-2">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="tap-target flex-1 rounded-xl border border-border py-2.5 text-xs font-semibold text-foreground"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setFilterDrawerOpen(false)}
                  className="tap-target flex-1 rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Laptop Catalog List */}
        <section className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground pb-1">
            <span>
              Showing <strong>{filteredLaptops.length}</strong> of {allLaptops.length} verified laptops
            </span>
            {hasActiveFilters && (
              <span className="text-primary font-medium">Filters active</span>
            )}
          </div>

          {filteredLaptops.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <LaptopIcon className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-foreground">No laptops match your filters</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Try raising your maximum budget, unchecking brand restrictions, or loosening GPU requirements.
                </p>
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="tap-target inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredLaptops.map((laptop) => (
                <LaptopCard key={laptop.id} laptop={laptop} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Floating Compare Action Bar (if items in compare list) */}
      {compareList.length > 0 && (
        <aside aria-label="Compare Tray" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-xl rounded-2xl border border-primary/40 bg-background/95 backdrop-blur-md p-3.5 shadow-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">
                Comparing {compareList.length} of 3 laptops
              </p>
              <p className="text-[10px] text-muted-foreground">
                Side-by-side spec & score highlight
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={clearCompare}
              className="tap-target rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
            <Link
              href="/compare"
              className="tap-target flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-md hover:bg-primary/90"
            >
              <span>Compare Now</span>
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black/20 text-[10px]">
                {compareList.length}
              </span>
            </Link>
          </div>
        </aside>
      )}

      {/* Affiliate Disclosure Modal */}
      <AffiliateDisclosureModal
        isOpen={disclosureOpen}
        onClose={() => setDisclosureOpen(false)}
      />
    </div>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { Laptop } from "@/lib/types";
import { formatInr, calculateDiscount, getScoreColor } from "@/lib/utils";
import { calculateSubScores, calculateOverallScore, DEFAULT_WEIGHTS } from "@/lib/scoring";
import { useCompareList } from "@/lib/hooks";
import { LaptopImage } from "@/components/laptop-image";
import { ScoreBadge } from "@/components/score-badge";
import {
  Scale,
  X,
  Plus,
  Check,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  ChevronDown,
  Trash2,
  AlertCircle,
} from "lucide-react";

interface CompareViewProps {
  allLaptops: Laptop[];
}

export function CompareView({ allLaptops }: CompareViewProps) {
  const { compareList, removeFromCompare, clearCompare, toggleCompare } = useCompareList();
  const [highlightDiffsOnly, setHighlightDiffsOnly] = React.useState(false);
  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const [searchPicker, setSearchPicker] = React.useState("");

  // Resolve laptops in compare list
  const comparedLaptops = React.useMemo(() => {
    return compareList
      .map((slug) => allLaptops.find((l) => l.slug === slug))
      .filter((l): l is Laptop => l !== undefined);
  }, [compareList, allLaptops]);

  // Compute scores for each compared laptop
  const laptopScores = React.useMemo(() => {
    return comparedLaptops.map((l) => {
      const sub = calculateSubScores(l);
      const overall = calculateOverallScore(sub, DEFAULT_WEIGHTS);
      return { laptop: l, sub, overall };
    });
  }, [comparedLaptops]);

  // Find best values for rows (best-in-row logic)
  const bestValues = React.useMemo(() => {
    if (laptopScores.length < 2) return {};

    const minPrice = Math.min(...laptopScores.map((s) => s.laptop.priceInr));
    const maxScore = Math.max(...laptopScores.map((s) => s.overall));
    const maxBattery = Math.max(...laptopScores.map((s) => s.laptop.batteryWh));
    const maxHours = Math.max(...laptopScores.map((s) => s.laptop.claimedBatteryHrs));
    const minWeight = Math.min(...laptopScores.map((s) => s.laptop.weightKg));
    const maxRam = Math.max(...laptopScores.map((s) => s.laptop.ramGb));
    const maxCores = Math.max(...laptopScores.map((s) => s.laptop.cpu.cores));
    const maxVram = Math.max(...laptopScores.map((s) => s.laptop.gpu.vramGb));
    const maxRefresh = Math.max(...laptopScores.map((s) => s.laptop.display.refreshHz));
    const maxNits = Math.max(...laptopScores.map((s) => s.laptop.display.nits));

    return {
      minPrice,
      maxScore,
      maxBattery,
      maxHours,
      minWeight,
      maxRam,
      maxCores,
      maxVram,
      maxRefresh,
      maxNits,
    };
  }, [laptopScores]);

  // Available laptops to add (excluding already compared)
  const availableToAdd = React.useMemo(() => {
    const set = new Set(compareList);
    let list = allLaptops.filter((l) => !set.has(l.slug));
    if (searchPicker.trim()) {
      const q = searchPicker.toLowerCase().trim();
      list = list.filter((l) =>
        l.brand.toLowerCase().includes(q) ||
        l.model.toLowerCase().includes(q) ||
        l.cpu.name.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allLaptops, compareList, searchPicker]);

  if (comparedLaptops.length === 0) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16 text-center space-y-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground mx-auto">
          <Scale className="h-8 w-8" />
        </div>
        <div className="space-y-2 max-w-md mx-auto">
          <h1 className="text-2xl font-black text-foreground">No Laptops to Compare</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            You haven&apos;t added any laptops to your comparison tray yet. Pick up to 3 laptops to inspect side-by-side specs and best-in-row scores.
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <Link
            href="/laptops"
            className="tap-target inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            <span>Browse All Laptops</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/finder"
            className="tap-target inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-xs font-semibold text-foreground hover:bg-muted"
          >
            <span>Take Finder Quiz</span>
          </Link>
        </div>
      </div>
    );
  }

  // Row helper: check if values differ
  const rowDiffers = (extractor: (l: Laptop) => any): boolean => {
    if (comparedLaptops.length <= 1) return true;
    const firstVal = JSON.stringify(extractor(comparedLaptops[0]));
    return comparedLaptops.some((l) => JSON.stringify(extractor(l)) !== firstVal);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 text-xs font-bold">
              Side-by-Side Analysis
            </span>
            <span className="text-xs text-muted-foreground">
              {comparedLaptops.length} of 3 slots filled
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mt-1">
            Compare Laptops
          </h1>
          <p className="text-xs text-muted-foreground">
            Best-in-row highlights indicate category leaders across battery, compute, display, and value.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Highlight Differences Toggle */}
          <button
            type="button"
            onClick={() => setHighlightDiffsOnly(!highlightDiffsOnly)}
            className={`tap-target inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold shadow-sm transition-colors ${
              highlightDiffsOnly
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-background text-foreground hover:bg-muted"
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
            <span>Highlight Diffs Only: {highlightDiffsOnly ? "ON" : "OFF"}</span>
          </button>

          {/* Add Laptop Button if < 3 */}
          {comparedLaptops.length < 3 && (
            <button
              type="button"
              onClick={() => setAddModalOpen(true)}
              className="tap-target inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Another Laptop</span>
            </button>
          )}

          {/* Clear Comparison */}
          <button
            type="button"
            onClick={clearCompare}
            className="tap-target inline-flex items-center gap-1 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-rose-600 hover:border-rose-300 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Main Comparison Table with Sticky Header */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        {/* Sticky Mobile/Desktop Header */}
        <div className="sticky top-16 z-30 border-b border-border bg-card/95 backdrop-blur shadow-sm">
          <div className="grid grid-cols-12 p-3 sm:p-4 gap-3 items-center">
            <div className="col-span-3 sm:col-span-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Comparison Spec
            </div>

            {/* Compared Laptops Headers */}
            {laptopScores.map(({ laptop, overall }) => {
              const isColSpan = laptopScores.length === 1 ? "col-span-9" : laptopScores.length === 2 ? "col-span-4 sm:col-span-4" : "col-span-3 sm:col-span-3";
              return (
                <div key={laptop.id} className={`${isColSpan} relative flex flex-col space-y-1`}>
                  <button
                    type="button"
                    onClick={() => removeFromCompare(laptop.slug)}
                    className="absolute -top-1 right-0 rounded-full bg-muted p-1 text-muted-foreground hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    title="Remove from comparison"
                  >
                    <X className="h-3 w-3" />
                  </button>

                  <p className="text-[10px] font-bold uppercase text-muted-foreground truncate">
                    {laptop.brand}
                  </p>
                  <h3 className="line-clamp-1 text-xs sm:text-sm font-extrabold text-foreground">
                    {laptop.model}
                  </h3>
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-xs sm:text-sm font-black text-primary">
                      {formatInr(laptop.priceInr)}
                    </span>
                    <ScoreBadge score={overall} size="sm" label="" />
                  </div>
                </div>
              );
            })}

            {/* Empty placeholder slot if < 3 */}
            {laptopScores.length < 3 && (
              <div
                className={`${laptopScores.length === 1 ? "col-span-0" : laptopScores.length === 2 ? "col-span-4 sm:col-span-4" : "col-span-3 sm:col-span-3"} hidden sm:flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-3 text-center cursor-pointer hover:bg-muted/40`}
                onClick={() => setAddModalOpen(true)}
              >
                <Plus className="h-4 w-4 text-primary mb-1" />
                <span className="text-[11px] font-semibold text-muted-foreground">Add Laptop</span>
              </div>
            )}
          </div>
        </div>

        {/* Spec Rows */}
        <div className="divide-y divide-border/60 text-xs">
          {/* Row: Laptop Visual Preview */}
          <div className="grid grid-cols-12 p-3 sm:p-4 gap-3 items-center bg-muted/10">
            <span className="col-span-3 font-semibold text-foreground">Device Render</span>
            {laptopScores.map(({ laptop }) => {
              const isColSpan = laptopScores.length === 1 ? "col-span-9" : laptopScores.length === 2 ? "col-span-4 sm:col-span-4" : "col-span-3 sm:col-span-3";
              return (
                <div key={laptop.id} className={isColSpan}>
                  <LaptopImage laptop={laptop} size="sm" />
                </div>
              );
            })}
          </div>

          {/* Row: Overall Score */}
          {(!highlightDiffsOnly || rowDiffers((l) => calculateOverallScore(calculateSubScores(l), DEFAULT_WEIGHTS))) && (
            <div className="grid grid-cols-12 p-3 sm:p-4 gap-3 items-center">
              <span className="col-span-3 font-semibold text-foreground">CollegeRig Index</span>
              {laptopScores.map(({ laptop, overall }) => {
                const isBest = bestValues.maxScore === overall;
                const isColSpan = laptopScores.length === 1 ? "col-span-9" : laptopScores.length === 2 ? "col-span-4 sm:col-span-4" : "col-span-3 sm:col-span-3";
                return (
                  <div key={laptop.id} className={isColSpan}>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm">{overall} / 100</span>
                      {isBest && (
                        <span className="rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.2 text-[9px] font-bold">
                          ★ Best
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Row: Price & MRP */}
          {(!highlightDiffsOnly || rowDiffers((l) => l.priceInr)) && (
            <div className="grid grid-cols-12 p-3 sm:p-4 gap-3 items-center">
              <span className="col-span-3 font-semibold text-foreground">Price (INR)</span>
              {laptopScores.map(({ laptop }) => {
                const isBest = bestValues.minPrice === laptop.priceInr;
                const discount = calculateDiscount(laptop.priceInr, laptop.mrpInr);
                const isColSpan = laptopScores.length === 1 ? "col-span-9" : laptopScores.length === 2 ? "col-span-4 sm:col-span-4" : "col-span-3 sm:col-span-3";
                return (
                  <div key={laptop.id} className={isColSpan}>
                    <p className="font-extrabold text-sm">{formatInr(laptop.priceInr)}</p>
                    <p className="text-[10px] text-muted-foreground line-through">MRP {formatInr(laptop.mrpInr)}</p>
                    {isBest && (
                      <span className="inline-block mt-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.2 text-[9px] font-bold">
                        Lowest Price
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Row: Processor */}
          {(!highlightDiffsOnly || rowDiffers((l) => l.cpu.name)) && (
            <div className="grid grid-cols-12 p-3 sm:p-4 gap-3 items-center bg-muted/10">
              <span className="col-span-3 font-semibold text-foreground">Processor</span>
              {laptopScores.map(({ laptop }) => {
                const isBest = bestValues.maxCores === laptop.cpu.cores;
                const isColSpan = laptopScores.length === 1 ? "col-span-9" : laptopScores.length === 2 ? "col-span-4 sm:col-span-4" : "col-span-3 sm:col-span-3";
                return (
                  <div key={laptop.id} className={isColSpan}>
                    <p className="font-bold text-foreground">{laptop.cpu.name}</p>
                    <p className="text-[11px] text-muted-foreground">{laptop.cpu.cores} cores · {laptop.cpu.threads || laptop.cpu.cores} threads</p>
                    {isBest && (
                      <span className="inline-block mt-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-1 text-[9px] font-bold">
                        Most Cores
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Row: Graphics (GPU) */}
          {(!highlightDiffsOnly || rowDiffers((l) => l.gpu.name)) && (
            <div className="grid grid-cols-12 p-3 sm:p-4 gap-3 items-center">
              <span className="col-span-3 font-semibold text-foreground">Graphics (GPU)</span>
              {laptopScores.map(({ laptop }) => {
                const isDedicated = laptop.gpu.type === "dedicated";
                const isBest = bestValues.maxVram && bestValues.maxVram === laptop.gpu.vramGb && laptop.gpu.vramGb > 0;
                const isColSpan = laptopScores.length === 1 ? "col-span-9" : laptopScores.length === 2 ? "col-span-4 sm:col-span-4" : "col-span-3 sm:col-span-3";
                return (
                  <div key={laptop.id} className={isColSpan}>
                    <p className="font-bold text-foreground">{laptop.gpu.name}</p>
                    <p className="text-[11px] text-muted-foreground capitalize">
                      {isDedicated ? `${laptop.gpu.vramGb}GB GDDR6 Dedicated` : "Integrated Graphics"}
                    </p>
                    {isBest && (
                      <span className="inline-block mt-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-1 text-[9px] font-bold">
                        Highest VRAM
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Row: Memory (RAM) */}
          {(!highlightDiffsOnly || rowDiffers((l) => `${l.ramGb}-${l.ramUpgradable}`)) && (
            <div className="grid grid-cols-12 p-3 sm:p-4 gap-3 items-center bg-muted/10">
              <span className="col-span-3 font-semibold text-foreground">RAM & Upgrade</span>
              {laptopScores.map(({ laptop }) => {
                const isColSpan = laptopScores.length === 1 ? "col-span-9" : laptopScores.length === 2 ? "col-span-4 sm:col-span-4" : "col-span-3 sm:col-span-3";
                return (
                  <div key={laptop.id} className={isColSpan}>
                    <p className="font-bold text-foreground">{laptop.ramGb}GB RAM</p>
                    <p className={`text-[11px] font-medium ${laptop.ramUpgradable ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                      {laptop.ramUpgradable ? "✓ Upgradable Slots" : "✕ Soldered Memory"}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Row: Storage */}
          {(!highlightDiffsOnly || rowDiffers((l) => `${l.storageGb}-${l.storageType}`)) && (
            <div className="grid grid-cols-12 p-3 sm:p-4 gap-3 items-center">
              <span className="col-span-3 font-semibold text-foreground">Storage</span>
              {laptopScores.map(({ laptop }) => {
                const isColSpan = laptopScores.length === 1 ? "col-span-9" : laptopScores.length === 2 ? "col-span-4 sm:col-span-4" : "col-span-3 sm:col-span-3";
                return (
                  <div key={laptop.id} className={isColSpan}>
                    <p className="font-bold text-foreground">{laptop.storageGb}GB</p>
                    <p className="text-[11px] text-muted-foreground">{laptop.storageType}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Row: Display */}
          {(!highlightDiffsOnly || rowDiffers((l) => `${l.display.resolution}-${l.display.panel}`)) && (
            <div className="grid grid-cols-12 p-3 sm:p-4 gap-3 items-center bg-muted/10">
              <span className="col-span-3 font-semibold text-foreground">Display</span>
              {laptopScores.map(({ laptop }) => {
                const isOled = laptop.display.panel === "OLED" || laptop.display.panel === "Retina";
                const isColSpan = laptopScores.length === 1 ? "col-span-9" : laptopScores.length === 2 ? "col-span-4 sm:col-span-4" : "col-span-3 sm:col-span-3";
                return (
                  <div key={laptop.id} className={isColSpan}>
                    <p className="font-bold text-foreground">{laptop.display.sizeIn}&quot; {laptop.display.panel}</p>
                    <p className="text-[11px] text-muted-foreground">{laptop.display.resolution} · {laptop.display.refreshHz}Hz · {laptop.display.nits} nits</p>
                    {isOled && (
                      <span className="inline-block mt-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-1 text-[9px] font-bold">
                        Vibrant {laptop.display.panel}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Row: Battery */}
          {(!highlightDiffsOnly || rowDiffers((l) => l.batteryWh)) && (
            <div className="grid grid-cols-12 p-3 sm:p-4 gap-3 items-center">
              <span className="col-span-3 font-semibold text-foreground">Battery</span>
              {laptopScores.map(({ laptop }) => {
                const isBest = bestValues.maxBattery === laptop.batteryWh;
                const isColSpan = laptopScores.length === 1 ? "col-span-9" : laptopScores.length === 2 ? "col-span-4 sm:col-span-4" : "col-span-3 sm:col-span-3";
                return (
                  <div key={laptop.id} className={isColSpan}>
                    <p className="font-bold text-foreground">{laptop.batteryWh} Wh</p>
                    <p className="text-[11px] text-muted-foreground">Up to {laptop.claimedBatteryHrs}h claimed</p>
                    {isBest && (
                      <span className="inline-block mt-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-1 text-[9px] font-bold">
                        Largest Capacity
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Row: Weight */}
          {(!highlightDiffsOnly || rowDiffers((l) => l.weightKg)) && (
            <div className="grid grid-cols-12 p-3 sm:p-4 gap-3 items-center bg-muted/10">
              <span className="col-span-3 font-semibold text-foreground">Carry Weight</span>
              {laptopScores.map(({ laptop }) => {
                const isBest = bestValues.minWeight === laptop.weightKg;
                const isColSpan = laptopScores.length === 1 ? "col-span-9" : laptopScores.length === 2 ? "col-span-4 sm:col-span-4" : "col-span-3 sm:col-span-3";
                return (
                  <div key={laptop.id} className={isColSpan}>
                    <p className="font-bold text-foreground">{laptop.weightKg} kg</p>
                    {isBest && (
                      <span className="inline-block mt-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-1 text-[9px] font-bold">
                        Lightest
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Row: Operating System */}
          {(!highlightDiffsOnly || rowDiffers((l) => l.os)) && (
            <div className="grid grid-cols-12 p-3 sm:p-4 gap-3 items-center">
              <span className="col-span-3 font-semibold text-foreground">OS</span>
              {laptopScores.map(({ laptop }) => {
                const isColSpan = laptopScores.length === 1 ? "col-span-9" : laptopScores.length === 2 ? "col-span-4 sm:col-span-4" : "col-span-3 sm:col-span-3";
                return (
                  <div key={laptop.id} className={isColSpan}>
                    <span className="font-medium text-foreground">{laptop.os}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Row: Student Discount */}
          <div className="grid grid-cols-12 p-3 sm:p-4 gap-3 items-center bg-muted/10">
            <span className="col-span-3 font-semibold text-foreground">Student Discount</span>
            {laptopScores.map(({ laptop }) => {
              const isColSpan = laptopScores.length === 1 ? "col-span-9" : laptopScores.length === 2 ? "col-span-4 sm:col-span-4" : "col-span-3 sm:col-span-3";
              return (
                <div key={laptop.id} className={isColSpan}>
                  {laptop.studentDiscount ? (
                    <div className="space-y-0.5">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {laptop.studentDiscount.program}
                      </span>
                      <p className="text-[10px] text-muted-foreground">{laptop.studentDiscount.summary}</p>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Standard pricing only</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Row: Where to Buy Action Buttons */}
          <div className="grid grid-cols-12 p-3 sm:p-4 gap-3 items-center">
            <span className="col-span-3 font-semibold text-foreground">Buy Links</span>
            {laptopScores.map(({ laptop }) => {
              const buy = laptop.buyLinks[0];
              const isColSpan = laptopScores.length === 1 ? "col-span-9" : laptopScores.length === 2 ? "col-span-4 sm:col-span-4" : "col-span-3 sm:col-span-3";
              return (
                <div key={laptop.id} className={isColSpan}>
                  <div className="flex flex-col gap-1.5">
                    <a
                      href={buy.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="tap-target inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90"
                    >
                      <span>Buy on {buy.store}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <Link
                      href={`/laptops/${laptop.slug}`}
                      className="text-center text-[10px] font-semibold text-primary hover:underline"
                    >
                      View Full Specs & Sources
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Laptop Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-background p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="text-base font-bold text-foreground">Add Laptop to Comparison</h2>
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search filter in modal */}
            <input
              type="text"
              value={searchPicker}
              onChange={(e) => setSearchPicker(e.target.value)}
              placeholder="Search by brand or model..."
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />

            {/* List */}
            <div className="flex-1 overflow-y-auto divide-y divide-border/60">
              {availableToAdd.map((laptop) => (
                <div
                  key={laptop.id}
                  className="flex items-center justify-between py-2.5 px-1 hover:bg-muted/40 rounded-lg"
                >
                  <div>
                    <p className="text-xs font-bold text-foreground">{laptop.brand} {laptop.model}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {formatInr(laptop.priceInr)} · {laptop.cpu.name.split(" ")[0]} {laptop.cpu.name.split(" ")[1] || ""} · {laptop.ramGb}GB RAM
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      toggleCompare(laptop.slug);
                      setAddModalOpen(false);
                    }}
                    className="tap-target rounded-lg bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 text-xs font-semibold hover:bg-primary/20"
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

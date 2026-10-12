"use client";

import * as React from "react";
import Link from "next/link";
import { Laptop } from "@/lib/types";
import { formatInr, calculateDiscount } from "@/lib/utils";
import { LaptopImage } from "./laptop-image";
import { calculateSubScores, calculateOverallScore, DEFAULT_WEIGHTS } from "@/lib/scoring";
import { useCompareList, useSavedLaptops } from "@/lib/hooks";
import {
  Cpu,
  Layers,
  Battery,
  Scale,
  Monitor,
  HardDrive,
  Bookmark,
  Check,
  Plus,
  ShieldCheck,
  Percent,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Zap,
} from "lucide-react";

interface LaptopCardProps {
  laptop: Laptop;
  scoreOverride?: number;
  whyItFits?: string[];
  disqualificationReasons?: string[];
  showCompare?: boolean;
}

export function LaptopCard({
  laptop,
  scoreOverride,
  whyItFits,
  disqualificationReasons,
  showCompare = true,
}: LaptopCardProps) {
  const { toggleCompare, isInCompare } = useCompareList();
  const { toggleSaved, isSaved } = useSavedLaptops();
  const [benchmarksExpanded, setBenchmarksExpanded] = React.useState(false);

  // Compute default score if not overridden
  const subScores = React.useMemo(() => calculateSubScores(laptop), [laptop]);
  const rawScore =
    typeof scoreOverride === "number"
      ? scoreOverride
      : calculateOverallScore(subScores, DEFAULT_WEIGHTS);

  // RigScore formatted as X.X / 10
  const rigScore = (rawScore / 10).toFixed(1);

  const discountPct = calculateDiscount(laptop.priceInr, laptop.mrpInr);
  const inCompare = isInCompare(laptop.slug);
  const saved = isSaved(laptop.slug);
  const isDisqualified = disqualificationReasons && disqualificationReasons.length > 0;

  // Workload Benchmark Scores (0 - 100)
  const codeCompiling = React.useMemo(() => {
    let score = laptop.cpu.cores * 6 + (laptop.ramGb >= 16 ? 38 : 22);
    if (laptop.cpu.name.toLowerCase().includes("i7") || laptop.cpu.name.toLowerCase().includes("ryzen 7") || laptop.cpu.name.toLowerCase().includes("ultra 7")) {
      score += 12;
    }
    return Math.min(100, Math.max(35, Math.round(score)));
  }, [laptop]);

  const aiGraphics = React.useMemo(() => {
    if (laptop.gpu.type === "dedicated") {
      return Math.min(100, Math.max(50, 48 + (laptop.gpu.vramGb || 4) * 8));
    }
    const cpuLower = laptop.cpu.name.toLowerCase();
    if (cpuLower.includes("m2") || cpuLower.includes("m3") || cpuLower.includes("ultra")) return 68;
    return 42;
  }, [laptop]);

  const portabilityThermals = React.useMemo(() => {
    return Math.round((subScores.portability * 0.55) + (subScores.battery * 0.45));
  }, [subScores]);

  // RAM Expandability warning detection
  const isSolderedSmallRam = !laptop.ramUpgradable && laptop.ramGb <= 8;

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border bg-slate-900/90 text-slate-100 shadow-sm transition-all duration-200 hover:border-teal-500/50 hover:shadow-lg ${
        isDisqualified
          ? "border-rose-900/60 opacity-90"
          : "border-slate-800"
      }`}
    >
      {/* 1. Header: Brand, Model, Verified Discount, RigScore */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-800/80 p-4 pb-3">
        <div className="space-y-1 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400">
              {laptop.brand}
            </span>

            {laptop.studentDiscount && (
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-950/60 border border-emerald-700/50 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                <Percent className="h-2.5 w-2.5" />
                <span>{laptop.studentDiscount.summary || laptop.studentDiscount.program}</span>
              </span>
            )}

            {laptop.isVerified ? (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-slate-400">
                <ShieldCheck className="h-3 w-3 text-emerald-400" />
                <span className="hidden sm:inline">Verified</span>
              </span>
            ) : (
              <span className="rounded bg-amber-950/60 border border-amber-800/50 px-1.5 text-[9px] font-semibold text-amber-300">
                Unverified
              </span>
            )}
          </div>

          <Link href={`/laptops/${laptop.slug}`} className="block">
            <h3 className="truncate text-base font-bold text-slate-100 transition-colors group-hover:text-teal-400">
              {laptop.model}
            </h3>
          </Link>
        </div>

        {/* RigScore Pill & Bookmark */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => toggleSaved(laptop.slug)}
            className={`tap-target flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-950/80 transition-colors ${
              saved
                ? "text-teal-400 border-teal-500/40 bg-teal-950/30"
                : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
            }`}
            aria-label={saved ? "Remove bookmark" : "Bookmark rig"}
          >
            <Bookmark className={`h-4 w-4 ${saved ? "fill-teal-400" : ""}`} />
          </button>

          <div
            className="flex items-center gap-1 rounded-lg border border-teal-500/30 bg-teal-950/40 px-2.5 py-1 text-xs font-black text-teal-300 shadow-inner"
            title="CollegeRig Overall Workload Index (0-10)"
          >
            <span>RigScore</span>
            <span className="text-teal-400 font-extrabold">{rigScore}</span>
          </div>
        </div>
      </div>

      {/* 2. Product Visual & 2x2 Micro Spec Badges */}
      <div className="p-4 space-y-3">
        {/* 16:9 Image Container */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950">
          <Link href={`/laptops/${laptop.slug}`} tabIndex={-1} className="block w-full h-full">
            <LaptopImage laptop={laptop} size="sm" className="w-full h-full" />
          </Link>
        </div>

        {/* 2x2 Hardware Micro-Badges */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* CPU Pill */}
          <div className="flex items-center gap-2 rounded-lg border border-slate-800/90 bg-slate-950/50 p-2 text-slate-300">
            <Cpu className="h-3.5 w-3.5 shrink-0 text-teal-400" />
            <span className="truncate font-mono text-[11px] font-medium" title={laptop.cpu.name}>
              {laptop.cpu.name}
            </span>
          </div>

          {/* RAM & Expandability */}
          <div
            className={`flex items-center gap-2 rounded-lg border p-2 text-[11px] ${
              isSolderedSmallRam
                ? "border-amber-700/60 bg-amber-950/30 text-amber-300 font-semibold"
                : "border-slate-800/90 bg-slate-950/50 text-slate-300 font-medium"
            }`}
            title={laptop.ramUpgradable ? "RAM is upgradable via SO-DIMM slot" : "RAM is soldered onto motherboard"}
          >
            <Layers className={`h-3.5 w-3.5 shrink-0 ${isSolderedSmallRam ? "text-amber-400" : "text-teal-400"}`} />
            <span className="truncate font-mono">
              {laptop.ramGb}GB {laptop.ramUpgradable ? "• Upgradable" : "• Soldered"}
            </span>
          </div>

          {/* GPU & VRAM */}
          <div className="flex items-center gap-2 rounded-lg border border-slate-800/90 bg-slate-950/50 p-2 text-slate-300">
            <Zap className="h-3.5 w-3.5 shrink-0 text-teal-400" />
            <span className="truncate font-mono text-[11px] font-medium" title={laptop.gpu.name}>
              {laptop.gpu.type === "dedicated" ? `${laptop.gpu.name} (${laptop.gpu.vramGb}GB)` : laptop.gpu.name}
            </span>
          </div>

          {/* Weight & Battery */}
          <div className="flex items-center gap-2 rounded-lg border border-slate-800/90 bg-slate-950/50 p-2 text-slate-300">
            <Scale className="h-3.5 w-3.5 shrink-0 text-teal-400" />
            <span className="truncate font-mono text-[11px] font-medium">
              {laptop.weightKg}kg • {laptop.batteryWh}Wh
            </span>
          </div>
        </div>
      </div>

      {/* Disqualification / Warning Warning (if any) */}
      {isDisqualified && (
        <div className="mx-4 mb-3 rounded-lg border border-rose-800/60 bg-rose-950/30 p-2.5 text-xs text-rose-300">
          <div className="flex items-center gap-1.5 font-bold">
            <AlertTriangle className="h-3.5 w-3.5 text-rose-400 shrink-0" />
            <span>Fails Branch Minimum:</span>
          </div>
          <ul className="mt-1 list-disc list-inside space-y-0.5 text-[11px] text-rose-200/90">
            {disqualificationReasons.map((reason, i) => (
              <li key={i}>{reason}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 3. Workload Benchmark Bars (Horizontal Normalized Bars, No Radar Charts) */}
      <div className="border-t border-slate-800/80 px-4 py-3 bg-slate-950/30">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
          <span>Engineering Workload Index</span>
          <button
            type="button"
            onClick={() => setBenchmarksExpanded(!benchmarksExpanded)}
            className="sm:hidden flex items-center gap-1 text-[11px] text-teal-400"
          >
            <span>{benchmarksExpanded ? "Hide" : "Details"}</span>
            {benchmarksExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
        </div>

        {/* Benchmark Bars: always visible on desktop, toggleable on compact mobile */}
        <div className={`space-y-2.5 ${benchmarksExpanded ? "block" : "hidden sm:block"}`}>
          {/* Bar 1: Code & Compiling */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-300">Code & Compiling (Docker, VS Code, IDEs)</span>
              <span className="font-mono font-bold text-teal-400">{codeCompiling}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-teal-400 transition-all duration-300"
                style={{ width: `${codeCompiling}%` }}
              />
            </div>
          </div>

          {/* Bar 2: Local AI & Graphics */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-300">Local AI & Graphics (CAD, PyTorch, 3D)</span>
              <span className="font-mono font-bold text-teal-400">{aiGraphics}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-teal-500 transition-all duration-300"
                style={{ width: `${aiGraphics}%` }}
              />
            </div>
          </div>

          {/* Bar 3: Portability & Thermals */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-300">Portability & Thermals (Transit, Runtime)</span>
              <span className="font-mono font-bold text-teal-400">{portabilityThermals}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-teal-600 transition-all duration-300"
                style={{ width: `${portabilityThermals}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Deal & Verdict Footer: Pricing, Compare Toggle, CTA */}
      <div className="mt-auto border-t border-slate-800/80 p-4 pt-3 flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <div className="space-y-0.5">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-slate-100 font-mono">
                {formatInr(laptop.priceInr)}
              </span>
              {discountPct > 0 && (
                <span className="text-xs text-slate-500 line-through">
                  {formatInr(laptop.mrpInr)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
              <span>●</span> Verified Indian Store Price
            </span>
          </div>

          {discountPct > 0 && (
            <span className="rounded bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 text-[11px] font-bold text-emerald-300">
              {discountPct}% OFF
            </span>
          )}
        </div>

        {/* Actions Group */}
        <div className="flex items-center gap-2">
          {showCompare && (
            <button
              type="button"
              onClick={() => toggleCompare(laptop.slug)}
              className={`tap-target flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors ${
                inCompare
                  ? "border-teal-500 bg-teal-950/50 text-teal-300"
                  : "border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
              }`}
              title={inCompare ? "Remove from comparison" : "Add to comparison"}
            >
              {inCompare ? <Check className="h-4 w-4 text-teal-400" /> : <Plus className="h-4 w-4" />}
              <span className="hidden sm:inline">{inCompare ? "Added" : "Compare"}</span>
            </button>
          )}

          <Link
            href={`/laptops/${laptop.slug}`}
            className="tap-target flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-teal-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-sm transition-all hover:bg-teal-400 hover:shadow-md"
          >
            <span>View Breakdown</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

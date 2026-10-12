"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  Sliders,
  ChevronDown,
  Compass,
  CheckCircle2,
  Activity,
  Database,
  RefreshCw,
} from "lucide-react";
import { Branch } from "@/lib/types";

import { ShimmerButton } from "./ui/shimmer-button";

interface HeroSectionProps {
  branches?: Branch[];
}

const DEFAULT_BRANCH_OPTIONS = [
  { slug: "cse-aiml", label: "CSE / AIML (Docker, PyTorch, Web)" },
  { slug: "ece", label: "ECE (MATLAB, Vivado, Microcontrollers)" },
  { slug: "mech", label: "Mechanical (SolidWorks, ANSYS, CAD)" },
  { slug: "civil", label: "Civil (AutoCAD, Revit, Staad Pro)" },
  { slug: "design", label: "Design & UI/UX (Figma, Blender, Adobe)" },
  { slug: "commerce", label: "Management & Commerce (Excel, PowerBI)" },
];

const BUDGET_OPTIONS = [
  { value: "50000", label: "Under ₹50,000 (Coding Basics)" },
  { value: "75000", label: "₹50,000 – ₹75,000 (All-Rounders)" },
  { value: "100000", label: "₹75,000 – ₹1,00,000 (Local AI & CAD)" },
  { value: "150000", label: "₹1,00,000+ (High-Performance Rigs)" },
];

export function HeroSection({ branches }: HeroSectionProps) {
  const router = useRouter();
  const [selectedBranch, setSelectedBranch] = React.useState<string>("cse-aiml");
  const [selectedBudget, setSelectedBudget] = React.useState<string>("75000");
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  // Map branches if passed, otherwise fall back to defaults
  const branchOptions = React.useMemo(() => {
    if (branches && branches.length > 0) {
      return branches.map((b) => ({
        slug: b.slug,
        label: `${b.name} (${b.typicalSoftware.slice(0, 2).join(", ")})`,
      }));
    }
    return DEFAULT_BRANCH_OPTIONS;
  }, [branches]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const targetUrl = `/results?branch=${encodeURIComponent(selectedBranch)}&budget=${encodeURIComponent(selectedBudget)}`;
    router.push(targetUrl);
  };

  const openGlobalCommandPalette = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("collegerig-open-command-palette"));
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 py-12 sm:py-20 text-slate-100 border-b border-slate-900 bg-dot-grid">
      {/* Pure CSS Radial Gradient Mesh (Zero WebGL Performance Penalty) */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500/20 via-slate-900/40 to-transparent blur-3xl -z-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-48 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl -z-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-48 h-72 w-72 rounded-full bg-teal-500/5 blur-3xl -z-0"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          {/* 1. Top Banner / Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-800 bg-slate-900/90 px-3.5 py-1.5 text-xs font-medium text-slate-300 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
              </span>
              <span>Built for Indian Engineering Curricula • 2026 Edition</span>
            </div>
          </motion.div>

          {/* 2. Main Headline & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
            className="space-y-4"
          >
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 sm:text-5xl md:text-6xl sm:leading-[1.12]">
              Stop Overpaying for{" "}
              <span className="bg-gradient-to-r from-teal-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                Specs You Won’t Use.
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-sm text-slate-400 sm:text-lg leading-relaxed">
              Find the exact laptop tuned to your engineering branch, semester workload, and real budget in 60 seconds.
            </p>
          </motion.div>

          {/* 3. Primary Search / CTA Block (IDE Command Palette) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.16, ease: "easeOut" }}
            className="pt-2"
          >
            <div className="mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/90 p-2 sm:p-3 shadow-2xl backdrop-blur-xl transition-all focus-within:border-teal-500/50">
              {/* Command Palette Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 px-3 pb-2 text-[11px] text-slate-400 font-mono">
                <button
                  type="button"
                  onClick={openGlobalCommandPalette}
                  className="flex items-center gap-1.5 text-teal-400 hover:text-teal-300 transition-colors cursor-pointer"
                  title="Open full interactive command palette"
                >
                  <Terminal className="h-3.5 w-3.5" />
                  <span className="text-slate-300">collegerig</span>
                  <span className="text-slate-500">spec-engine --match</span>
                </button>
                <button
                  type="button"
                  onClick={openGlobalCommandPalette}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <kbd className="rounded border border-slate-700 bg-slate-950 px-1.5 py-0.5 text-[10px] text-teal-400 font-mono">
                    ⌘K
                  </kbd>
                  <span className="hidden sm:inline">Press to open</span>
                </button>
              </div>

              {/* Form Input Row */}
              <form onSubmit={handleSearch} className="mt-3 flex flex-col gap-2.5 sm:flex-row sm:items-center">
                {/* Dropdown 1: Branch/Specialization */}
                <div className="relative flex-1">
                  <label htmlFor="hero-branch" className="sr-only">
                    Engineering Branch or Specialization
                  </label>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Cpu className="h-4 w-4 text-teal-400" />
                  </div>
                  <select
                    id="hero-branch"
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="tap-target min-h-[44px] w-full appearance-none rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 pl-9 pr-9 text-xs sm:text-sm font-medium text-slate-100 transition-colors hover:border-slate-700 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                  >
                    {branchOptions.map((opt) => (
                      <option key={opt.slug} value={opt.slug} className="bg-slate-950 text-slate-100">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>

                {/* Dropdown 2: Hard Budget Ceiling */}
                <div className="relative flex-1">
                  <label htmlFor="hero-budget" className="sr-only">
                    Hard Budget Ceiling
                  </label>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Sliders className="h-4 w-4 text-teal-400" />
                  </div>
                  <select
                    id="hero-budget"
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className="tap-target min-h-[44px] w-full appearance-none rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 pl-9 pr-9 text-xs sm:text-sm font-medium text-slate-100 transition-colors hover:border-slate-700 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                  >
                    {BUDGET_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-slate-950 text-slate-100">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>

                {/* 21st.dev Shimmer Button */}
                <ShimmerButton
                  type="submit"
                  disabled={isSubmitting}
                  shimmerColor="#14b8a6"
                  background="rgba(15, 23, 42, 0.95)"
                  className="tap-target min-h-[44px] shrink-0"
                >
                  <span className="flex items-center gap-2 text-teal-300">
                    <span>{isSubmitting ? "Matching..." : "Find Matching Rigs"}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </ShimmerButton>
              </form>

              {/* Auxiliary Quick Links Below Command Box */}
              <div className="mt-2.5 flex items-center justify-between px-2 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
                <Link
                  href="/finder"
                  className="inline-flex items-center gap-1 font-medium text-teal-400 hover:text-teal-300 underline underline-offset-2 transition-colors"
                >
                  <Compass className="h-3 w-3" />
                  <span>Launch 60-Sec Step-by-Step Wizard</span>
                </Link>
                <Link
                  href="/laptops"
                  className="hidden sm:inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <span>Browse full catalog</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* 4. Social Proof / Transparent Telemetry Strip (3 Border-Separated Stat Blocks) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.24, ease: "easeOut" }}
            className="pt-4"
          >
            <div className="grid grid-cols-1 divide-y divide-slate-800 rounded-xl border border-slate-800 bg-slate-900/70 shadow-lg backdrop-blur-md sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
              {/* Stat Block 1 */}
              <div className="flex flex-col items-center sm:items-start p-4 sm:p-5 text-center sm:text-left space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xl sm:text-2xl font-extrabold text-teal-400">180+</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-100">Rigs Benchmarked</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-snug">
                  Focus: Dev (VS Code, Docker), CAD, & Local LLM inference
                </p>
              </div>

              {/* Stat Block 2 */}
              <div className="flex flex-col items-center sm:items-start p-4 sm:p-5 text-center sm:text-left space-y-1">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-teal-400" />
                  <span className="text-xs sm:text-sm font-bold text-slate-100">Branch-Specific Scoring</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-snug">
                  Weights adjusted for IDEs vs. Emulators vs. Simulation suites
                </p>
              </div>

              {/* Stat Block 3 */}
              <div className="flex flex-col items-center sm:items-start p-4 sm:p-5 text-center sm:text-left space-y-1">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-teal-400" />
                  <span className="text-xs sm:text-sm font-bold text-slate-100">Daily Price Crawl</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-snug">
                  Amazon India, Flipkart, & verified Official Student Stores
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

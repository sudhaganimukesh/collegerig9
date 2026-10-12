"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Laptop, Branch, ScoreWeights } from "@/lib/types";
import { scoreLaptopForBranch, DEFAULT_WEIGHTS } from "@/lib/scoring";
import { LaptopCard } from "@/components/laptop-card";
import { formatInr } from "@/lib/utils";
import {
  Sparkles,
  Share2,
  Sliders,
  RotateCcw,
  AlertTriangle,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Info,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface ResultsViewProps {
  allLaptops: Laptop[];
  branches: Branch[];
}

export function ResultsView({ allLaptops, branches }: ResultsViewProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read URL params
  const branchSlug = searchParams.get("branch") || "cse-aiml";
  const budgetParam = searchParams.get("budget");
  const budget = budgetParam ? Number(budgetParam) : 75000;

  const batteryPref = searchParams.get("battery") === "high";
  const perfPref = searchParams.get("perf") === "high";
  const portablePref = searchParams.get("portable") === "high";
  const displayPref = searchParams.get("display") === "high";
  const gpuPref = searchParams.get("gpu") === "high";

  const osPref = searchParams.get("os") || "any";
  const screenPref = searchParams.get("screen") || "any";
  const weightPref = searchParams.get("weight") || "any";

  const currentBranch = React.useMemo(() => {
    return branches.find((b) => b.slug === branchSlug) || branches[0];
  }, [branches, branchSlug]);

  // Compute base weights combining branch preset + finder answers
  const initialWeights = React.useMemo(() => {
    const base: ScoreWeights = { ...currentBranch.scoreWeights };
    if (batteryPref) base.battery += 15;
    if (perfPref) base.performance += 15;
    if (portablePref) base.portability += 15;
    if (displayPref) base.display += 15;
    if (gpuPref) base.performance += 15;
    return base;
  }, [currentBranch, batteryPref, perfPref, portablePref, displayPref, gpuPref]);

  // Customizable slider weights state
  const [weights, setWeights] = React.useState<ScoreWeights>(initialWeights);
  const [showSliders, setShowSliders] = React.useState(false);
  const [showDisqualified, setShowDisqualified] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  // Sync weights if branch or URL params change
  React.useEffect(() => {
    setWeights(initialWeights);
  }, [initialWeights]);

  // Filter hardware preferences (OS, screen, weight)
  const candidateLaptops = React.useMemo(() => {
    let list = [...allLaptops];

    if (osPref === "windows") {
      list = list.filter((l) => l.os.startsWith("Windows"));
    } else if (osPref === "macos") {
      list = list.filter((l) => l.os === "macOS");
    }

    if (screenPref === "compact") {
      list = list.filter((l) => l.display.sizeIn <= 14.2);
    } else if (screenPref === "standard") {
      list = list.filter((l) => l.display.sizeIn >= 15.0);
    }

    if (weightPref === "1.4") {
      list = list.filter((l) => l.weightKg <= 1.45);
    } else if (weightPref === "1.8") {
      list = list.filter((l) => l.weightKg <= 1.85);
    }

    return list;
  }, [allLaptops, osPref, screenPref, weightPref]);

  // Calculate scores and partition into qualifying vs disqualified
  const scoredLaptops = React.useMemo(() => {
    const results = candidateLaptops.map((laptop) => {
      const scoreData = scoreLaptopForBranch(laptop, currentBranch, weights, budget);
      return {
        laptop,
        ...scoreData,
      };
    });

    const qualified = results
      .filter((r) => r.meetsMinSpecs)
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    const disqualified = results
      .filter((r) => !r.meetsMinSpecs)
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    return { qualified, disqualified };
  }, [candidateLaptops, currentBranch, weights, budget]);

  // Copy share URL to clipboard
  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleSliderChange = (key: keyof ScoreWeights, value: number) => {
    setWeights((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetWeights = () => {
    setWeights(initialWeights);
  };

  const topPick = scoredLaptops.qualified[0];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
      {/* Results Header Card */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/80 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-3 py-0.5 text-xs font-bold text-primary">
                <GraduationCap className="h-3.5 w-3.5" />
                <span>{currentBranch.name}</span>
              </span>
              <span className="rounded-full bg-secondary border border-border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                Max Budget: {formatInr(budget)}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              Ranked Laptop Recommendations
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Rankings computed using audited curriculum requirements and your campus preferences.
            </p>
          </div>

          {/* Action Buttons: Share & Tweak Weights */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleShare}
              className="tap-target inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-semibold text-foreground shadow-sm hover:bg-muted"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4 text-primary" />
                  <span>Share Results</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowSliders(!showSliders)}
              className={`tap-target inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-semibold shadow-sm transition-colors ${
                showSliders
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-foreground hover:bg-muted"
              }`}
            >
              <Sliders className="h-4 w-4 text-primary" />
              <span>{showSliders ? "Hide Weight Sliders" : "Tweak Weight Sliders"}</span>
            </button>

            <Link
              href="/finder"
              className="tap-target inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              <span>Edit Quiz Answers</span>
            </Link>
          </div>
        </div>

        {/* Live Weight Sliders Panel */}
        {showSliders && (
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  <Sliders className="h-4 w-4 text-primary" />
                  <span>Interactive Weight Sliders</span>
                </h3>
                <p className="text-xs text-muted-foreground">
                  Move any slider to customize ranking priority. Laptops will re-rank instantly!
                </p>
              </div>

              <button
                type="button"
                onClick={resetWeights}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset to Branch Default</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-2">
              {[
                { key: "performance", label: "Performance" },
                { key: "battery", label: "Battery Life" },
                { key: "portability", label: "Portability" },
                { key: "display", label: "Display Quality" },
                { key: "build", label: "Build & Keyboard" },
                { key: "value", label: "Value for Money" },
                { key: "futureProofing", label: "Future-proofing" },
              ].map((dim) => (
                <div key={dim.key} className="space-y-1.5 rounded-xl border border-border/80 bg-background/80 p-3">
                  <div className="flex justify-between text-xs font-semibold">
                    <label htmlFor={`slider-${dim.key}`} className="text-foreground">{dim.label}</label>
                    <span className="text-primary font-bold">
                      {weights[dim.key as keyof ScoreWeights]}%
                    </span>
                  </div>
                  <input
                    id={`slider-${dim.key}`}
                    type="range"
                    min={0}
                    max={60}
                    step={5}
                    value={weights[dim.key as keyof ScoreWeights]}
                    onChange={(e) =>
                      handleSliderChange(dim.key as keyof ScoreWeights, Number(e.target.value))
                    }
                    className="w-full accent-primary cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Recommendation Highlight Ribbon */}
        {topPick && (
          <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/10 via-background to-background p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-black text-xl shadow-md">
                  #1
                </div>
                <div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                    <Sparkles className="h-3 w-3" />
                    <span>Top Match for {currentBranch.shortName}</span>
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-foreground">
                    {topPick.laptop.brand} {topPick.laptop.model}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {formatInr(topPick.laptop.priceInr)} · {topPick.matchPercentage}% Overall Fit Score
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/laptops/${topPick.laptop.slug}`}
                  className="tap-target inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-md hover:bg-primary/90"
                >
                  <span>View Verified Spec Sheet</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Primary Ranked List Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">
            All Compatible Picks ({scoredLaptops.qualified.length})
          </h2>
          <span className="text-xs text-muted-foreground">
            Ranked by {currentBranch.name} Compatibility
          </span>
        </div>

        {scoredLaptops.qualified.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center space-y-3">
            <Info className="h-8 w-8 text-muted-foreground mx-auto" />
            <h3 className="text-base font-bold text-foreground">No laptops met all criteria</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Try adjusting your maximum budget or changing operating system preferences.
            </p>
            <Link
              href="/finder"
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
            >
              <span>Retake Finder Quiz</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {scoredLaptops.qualified.map((item, idx) => (
              <div key={item.laptop.id} className="relative">
                {/* Ranking Tag */}
                <div className="absolute top-2 left-2 z-30 rounded-lg bg-black/75 backdrop-blur px-2 py-0.5 text-[10px] font-black text-white shadow">
                  #{idx + 1}
                </div>
                <LaptopCard
                  laptop={item.laptop}
                  scoreOverride={item.overallScore}
                  whyItFits={item.whyItFits}
                  disqualificationReasons={item.disqualificationReasons}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Disqualified Laptops Section (Minimum Spec Gate) */}
      {scoredLaptops.disqualified.length > 0 && (
        <section className="rounded-3xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-rose-900 dark:text-rose-200">
                  {scoredLaptops.disqualified.length} Laptops Did Not Meet Minimum Specs for {currentBranch.name}
                </h3>
                <p className="text-[11px] text-rose-700 dark:text-rose-300">
                  We filter these out to save you from buying laptops that cannot run your lab syllabus.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowDisqualified(!showDisqualified)}
              className="tap-target inline-flex items-center gap-1 text-xs font-bold text-rose-800 dark:text-rose-300 underline underline-offset-2"
            >
              <span>{showDisqualified ? "Hide Disqualified List" : "Show Disqualified List"}</span>
              {showDisqualified ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>

          {showDisqualified && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-3 border-t border-rose-200/80 dark:border-rose-900/60">
              {scoredLaptops.disqualified.map((item) => (
                <LaptopCard
                  key={item.laptop.id}
                  laptop={item.laptop}
                  scoreOverride={item.overallScore}
                  whyItFits={item.whyItFits}
                  disqualificationReasons={item.disqualificationReasons}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

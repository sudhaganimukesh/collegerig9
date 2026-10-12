"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Branch } from "@/lib/types";
import { formatInr } from "@/lib/utils";
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Battery,
  Cpu,
  Feather,
  Palette,
  Gamepad2,
  Monitor,
  Scale,
  Code,
  Layers,
} from "lucide-react";

interface FinderWizardProps {
  branches: Branch[];
}

export function FinderWizard({ branches }: FinderWizardProps) {
  const router = useRouter();

  // Wizard Step (1 to 4)
  const [currentStep, setCurrentStep] = React.useState(1);

  // Form State
  const [selectedBranch, setSelectedBranch] = React.useState<string>("cse-aiml");
  const [budget, setBudget] = React.useState<number>(65000);
  const [priorities, setPriorities] = React.useState<{
    battery: boolean;
    performance: boolean;
    portability: boolean;
    display: boolean;
    gpu: boolean;
  }>({
    battery: true,
    performance: true,
    portability: false,
    display: false,
    gpu: false,
  });
  const [preferredOs, setPreferredOs] = React.useState<"any" | "windows" | "macos">("any");
  const [screenSize, setScreenSize] = React.useState<"any" | "compact" | "standard">("any");
  const [maxWeight, setMaxWeight] = React.useState<"any" | "1.4" | "1.8">("any");

  // Priority Toggle Helper
  const togglePriority = (key: keyof typeof priorities) => {
    setPriorities((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Submit and navigate to /results
  const handleComplete = () => {
    const params = new URLSearchParams();
    params.set("branch", selectedBranch);
    params.set("budget", budget.toString());

    if (priorities.battery) params.set("battery", "high");
    if (priorities.performance) params.set("perf", "high");
    if (priorities.portability) params.set("portable", "high");
    if (priorities.display) params.set("display", "high");
    if (priorities.gpu) params.set("gpu", "high");

    if (preferredOs !== "any") params.set("os", preferredOs);
    if (screenSize !== "any") params.set("screen", screenSize);
    if (maxWeight !== "any") params.set("weight", maxWeight);

    router.push(`/results?${params.toString()}`);
  };

  const stepsTotal = 4;
  const progressPct = ((currentStep) / stepsTotal) * 100;

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-sm">
      {/* Progress Bar & Header */}
      <div className="space-y-4 pb-6 border-b border-border/80">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span className="flex items-center gap-1.5 text-primary">
            <Compass className="h-4 w-4" />
            <span>60-Second Laptop Finder</span>
          </span>
          <span>Step {currentStep} of {stepsTotal}</span>
        </div>

        {/* Progress Track */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-all duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="py-8 min-h-[380px]">
        {/* STEP 1: Branch Selection */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
                1. Which college branch are you studying?
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Different engineering branches need vastly different hardware. We ensure your laptop handles your department&apos;s curriculum.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {branches.map((b) => {
                const isSelected = selectedBranch === b.slug;
                return (
                  <button
                    key={b.slug}
                    type="button"
                    onClick={() => setSelectedBranch(b.slug)}
                    className={`tap-target flex flex-col justify-between rounded-2xl border p-4 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-sm ring-2 ring-primary/20"
                        : "border-border/80 bg-background/50 hover:bg-muted hover:border-border"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-foreground text-sm">
                          {b.name}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-snug line-clamp-2">
                        {b.description}
                      </p>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {b.typicalSoftware.slice(0, 3).map((sw, i) => (
                        <span
                          key={i}
                          className="rounded-md bg-background/80 border border-border/60 px-1.5 py-0.5 text-[9px] font-mono text-muted-foreground"
                        >
                          {sw}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Budget */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
                2. What is your maximum budget?
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Laptops within your budget receive top match scores. We will also highlight where you can save money with student discounts.
              </p>
            </div>

            {/* Live Budget Display */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center space-y-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase">
                Selected Ceiling
              </span>
              <p className="text-4xl sm:text-5xl font-black text-primary tracking-tight">
                {formatInr(budget)}
              </p>
              <p className="text-xs text-muted-foreground">
                Showing top contenders up to {formatInr(budget)}
              </p>
            </div>

            {/* Slider */}
            <div className="space-y-2 px-2">
              <input
                type="range"
                min={30000}
                max={150000}
                step={2500}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-3 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>₹30,000 (Entry)</span>
                <span>₹75,000 (Sweet spot)</span>
                <span>₹1,50,000 (Pro)</span>
              </div>
            </div>

            {/* Budget Presets */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-foreground">Common Student Budgets</span>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { label: "Sub ₹40,000", val: 40000 },
                  { label: "Under ₹55,000", val: 55000 },
                  { label: "Under ₹75,000", val: 75000 },
                  { label: "Under ₹1,20,000", val: 120000 },
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setBudget(item.val)}
                    className={`rounded-xl border py-2.5 px-3 text-xs font-semibold transition-colors ${
                      budget === item.val
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Campus Priorities */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
                3. What matters most in your daily college life?
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Select your top priorities to dynamically adjust scoring weights.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                {
                  key: "battery",
                  icon: Battery,
                  label: "All-Day Battery Life",
                  desc: "Crucial for long college bus commutes (Uppal/Ghatkesar) and lecture halls with limited power outlets.",
                },
                {
                  key: "performance",
                  icon: Cpu,
                  label: "Heavy Computing & Multitasking",
                  desc: "Fast CPU & 16GB+ RAM for Docker containers, local Python libraries, and dozens of browser tabs.",
                },
                {
                  key: "portability",
                  icon: Feather,
                  label: "Ultra-Light to Carry (Under 1.4kg)",
                  desc: "Featherweight laptop chassis that won't strain your shoulders when walking across campus.",
                },
                {
                  key: "display",
                  icon: Palette,
                  label: "OLED / High Color Accuracy",
                  desc: "100% sRGB or DCI-P3 screen for Figma UI/UX, video editing, and eye comfort during late hostel hours.",
                },
                {
                  key: "gpu",
                  icon: Gamepad2,
                  label: "Dedicated 3D Graphics (dGPU)",
                  desc: "NVIDIA RTX GPU for SolidWorks 3D viewport, ANSYS simulations, Blender rendering, or gaming.",
                },
              ].map((item) => {
                const Icon = item.icon;
                const isChecked = priorities[item.key as keyof typeof priorities];
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => togglePriority(item.key as keyof typeof priorities)}
                    className={`tap-target flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                      isChecked
                        ? "border-primary bg-primary/10 shadow-sm ring-1 ring-primary/30"
                        : "border-border/80 bg-background/50 hover:bg-muted"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        isChecked
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground text-xs sm:text-sm">
                          {item.label}
                        </span>
                        {isChecked && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Preferences */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
                4. Any specific hardware preferences?
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Optional preferences for operating system, screen size, and weight tolerance.
              </p>
            </div>

            <div className="space-y-5">
              {/* OS Preference */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-foreground">Operating System</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: "any", label: "No Preference" },
                    { val: "windows", label: "Windows 11" },
                    { val: "macos", label: "Apple macOS" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setPreferredOs(opt.val as any)}
                      className={`rounded-xl border py-2.5 px-3 text-xs font-semibold transition-colors ${
                        preferredOs === opt.val
                          ? "border-primary bg-primary/10 text-primary border-primary"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Screen Size Preference */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-foreground">Screen Size</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: "any", label: "Any Size" },
                    { val: "compact", label: "Compact (13-14\")" },
                    { val: "standard", label: "Large (15-16\")" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setScreenSize(opt.val as any)}
                      className={`rounded-xl border py-2.5 px-3 text-xs font-semibold transition-colors ${
                        screenSize === opt.val
                          ? "border-primary bg-primary/10 text-primary border-primary"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Maximum Weight */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-foreground">Maximum Carry Weight</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: "any", label: "Any Weight" },
                    { val: "1.4", label: "Under 1.4 kg" },
                    { val: "1.8", label: "Under 1.8 kg" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setMaxWeight(opt.val as any)}
                      className={`rounded-xl border py-2.5 px-3 text-xs font-semibold transition-colors ${
                        maxWeight === opt.val
                          ? "border-primary bg-primary/10 text-primary border-primary"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons Footer */}
      <div className="flex items-center justify-between border-t border-border/80 pt-6">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={() => setCurrentStep(currentStep - 1)}
            className="tap-target inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>
        ) : (
          <div />
        )}

        {currentStep < stepsTotal ? (
          <button
            type="button"
            onClick={() => setCurrentStep(currentStep + 1)}
            className="tap-target inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            <span>Next Step</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleComplete}
            className="tap-target inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3 text-sm font-bold text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg"
          >
            <Sparkles className="h-4 w-4" />
            <span>Calculate Recommendations</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

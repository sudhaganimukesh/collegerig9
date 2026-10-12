"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Laptop, Branch } from "@/lib/types";
import { formatInr } from "@/lib/utils";
import { HeroSection } from "./hero-section";
import { CurriculumBentoGrid } from "./curriculum-bento";
import { LaptopCard } from "./laptop-card";
import { SponsoredLaptopCard } from "./sponsored-card";
import { AffiliateDisclosureModal } from "./affiliate-disclosure-modal";
import { ProModal } from "./pro-modal";

interface LandingViewProps {
  laptops: Laptop[];
  branches: Branch[];
}

export function LandingView({ laptops, branches }: LandingViewProps) {
  const [activeTab, setActiveTab] = React.useState<"under50k" | "under75k" | "power" | "battery">("under50k");
  const [disclosureOpen, setDisclosureOpen] = React.useState(false);
  const [proModalOpen, setProModalOpen] = React.useState(false);

  // Curated collections
  const under50k = React.useMemo(() => {
    return laptops.filter((l) => l.priceInr <= 50000).slice(0, 3);
  }, [laptops]);

  const under75k = React.useMemo(() => {
    return laptops.filter((l) => l.priceInr > 50000 && l.priceInr <= 75000).slice(0, 3);
  }, [laptops]);

  const powerLaptops = React.useMemo(() => {
    return laptops.filter((l) => l.gpu.type === "dedicated" || l.cpu.cores >= 10).slice(0, 3);
  }, [laptops]);

  const batteryLaptops = React.useMemo(() => {
    return laptops.filter((l) => l.claimedBatteryHrs >= 10 || l.batteryWh >= 65).slice(0, 3);
  }, [laptops]);

  const currentPicks = React.useMemo(() => {
    switch (activeTab) {
      case "under50k":
        return under50k;
      case "under75k":
        return under75k;
      case "power":
        return powerLaptops;
      case "battery":
        return batteryLaptops;
    }
  }, [activeTab, under50k, under75k, powerLaptops, batteryLaptops]);

  // Demo sponsored laptop (Lenovo LOQ 15) to demonstrate strict labeled isolation
  const sponsoredSample = laptops.find((l) => l.slug === "lenovo-loq-15-12450hx-rtx4050") || laptops[0];

  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Pilot Campus Alert Banner */}
      <section className="border-b border-teal-500/20 bg-teal-950/30 py-2.5">
        <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 text-xs sm:px-6">
          <div className="flex items-center gap-2 text-teal-400 font-medium">
            <GraduationCap className="h-4 w-4 shrink-0" />
            <span>
              <strong>KPRIT Hyderabad Pilot:</strong> Real-world scores calibrated for Telangana RTC bus commutes, lab socket availability, and local service centers.
            </span>
          </div>
          <Link
            href="/campus/kprit"
            className="hidden items-center gap-1 font-semibold text-teal-400 underline underline-offset-2 hover:text-teal-300 sm:flex"
          >
            <span>View Campus Guide</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </section>

      {/* Hero Section (Above The Fold - Linear/Vercel Utilitarian Aesthetic) */}
      <HeroSection branches={branches} />

      {/* 21st.dev Curriculum-First Bento Grid */}
      <CurriculumBentoGrid />

      {/* How It Works 3-Step */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              How CollegeRig Works
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Three simple steps to avoid wasting money on underpowered, fragile, or non-upgradable machines.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex flex-col rounded-xl border border-border/70 bg-background p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold mb-4">
                1
              </div>
              <h3 className="font-semibold text-foreground text-base">Select Your Branch & Budget</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Whether you need CUDA cores for AI-ML, AutoCAD and SolidWorks support for Mechanical, or all-day battery for Commerce lectures.
              </p>
            </div>

            <div className="flex flex-col rounded-xl border border-border/70 bg-background p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold mb-4">
                2
              </div>
              <h3 className="font-semibold text-foreground text-base">Audited 7-Dimension Scoring</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Performance, Battery, Portability, Display, Build, Value, and Future-proofing. Laptops missing branch minimums are disqualified automatically.
              </p>
            </div>

            <div className="flex flex-col rounded-xl border border-border/70 bg-background p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold mb-4">
                3
              </div>
              <h3 className="font-semibold text-foreground text-base">Buy with Indian Student Perks</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Verify official UNiDAYS, SheerID, and Indian brand warranty networks before ordering from verified retail sources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Student Recommendations Tabs */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Curated Student Shortlists
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-1">
                Featured Campus Picks
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Top scoring verified machines tested against Indian college workloads.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("under50k")}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  activeTab === "under50k"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                Under ₹50k (Coding Basics)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("under75k")}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  activeTab === "under75k"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                ₹50k–₹75k (All-Rounders)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("power")}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  activeTab === "power"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                AI-ML & CAD Heavy
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("battery")}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  activeTab === "battery"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                All-Day Battery (10h+)
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentPicks.map((laptop) => (
              <LaptopCard key={laptop.id} laptop={laptop} />
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/laptops"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline underline-offset-4 hover:text-primary/80"
            >
              <span>Explore all {laptops.length} verified laptops in the catalog</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Explore by Engineering Branch */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Syllabus-Aligned Recommendations
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-1">
              Browse by Engineering Branch
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Every department has distinct hardware demands. Select your branch to see pre-tuned weights and minimum spec checks.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {branches.map((b) => (
              <Link
                key={b.slug}
                href={`/results?branch=${b.slug}`}
                className="group relative flex flex-col justify-between rounded-xl border border-border/80 bg-background p-5 transition-all hover:border-primary/50 hover:shadow-md"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {b.name}
                    </h3>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Required Tools: {b.typicalSoftware.slice(0, 3).join(", ")}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Min RAM: {b.minSpecs.minRamGb}GB</span>
                  <span className="text-primary font-semibold">View Ranked Picks →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Demonstration of Sponsored Partner Slot & Ethical Isolation */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Revenue & Monetization Demonstration
              </span>
              <h2 className="text-lg font-bold text-foreground">
                Partner Spotlight (Strictly Labeled & Score-Neutral)
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setDisclosureOpen(true)}
              className="text-xs font-medium text-primary underline underline-offset-2 hover:text-primary/80"
            >
              Affiliate Policy & Disclosure
            </button>
          </div>

          {/* Render Sponsored Card */}
          {sponsoredSample && (
            <SponsoredLaptopCard
              laptop={sponsoredSample}
              onOpenDisclosure={() => setDisclosureOpen(true)}
            />
          )}
        </div>
      </section>

      {/* CollegeRig Pro Early Access Teaser Banner */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-card to-card p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>CollegeRig Pro • Pilot Early Access</span>
              </div>
              <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                Never miss an Indian student flash deal or clearance sale
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Get instant WhatsApp price drops for Amazon Great Indian Festival & Flipkart BBD, 1-on-1 senior mentor spec verification, and custom 4-year syllabus validation.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setProModalOpen(true)}
              className="tap-target shrink-0 rounded-xl bg-amber-500 px-6 py-3.5 text-xs sm:text-sm font-bold text-black shadow-md hover:bg-amber-400 transition-all"
            >
              Join Free Pro Waitlist
            </button>
          </div>
        </div>
      </section>

      {/* KPRIT Hyderabad Pilot Showcase Card */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-primary">
              <GraduationCap className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Pilot Campus Spotlight</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">
              Studying at KPRIT Hyderabad?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Check our hyper-local campus guide tailored for Ghatkesar bus commutes (RTC 280), socket availability across CSE labs & central library, and verified service centers in ECIL & Secunderabad.
            </p>
          </div>

          <Link
            href="/campus/kprit"
            className="shrink-0 flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs sm:text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
          >
            <span>Read KPRIT Guide</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Modals */}
      <AffiliateDisclosureModal
        isOpen={disclosureOpen}
        onClose={() => setDisclosureOpen(false)}
      />
      <ProModal
        isOpen={proModalOpen}
        onClose={() => setProModalOpen(false)}
      />
    </div>
  );
}

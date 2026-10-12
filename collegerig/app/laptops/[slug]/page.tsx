import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getLaptops, getLaptopBySlug, getSimilarLaptops } from "@/lib/data";
import { formatInr, calculateDiscount, getScoreColor } from "@/lib/utils";
import { calculateSubScores, calculateOverallScore, DEFAULT_WEIGHTS } from "@/lib/scoring";
import { LaptopImage } from "@/components/laptop-image";
import { ScoreBadge } from "@/components/score-badge";
import { LaptopCard } from "@/components/laptop-card";
import {
  ShieldCheck,
  Percent,
  ExternalLink,
  ChevronRight,
  Cpu,
  Monitor,
  Battery,
  HardDrive,
  Layers,
  Scale,
  Sparkles,
  CheckCircle2,
  XCircle,
  Info,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Check,
  Plus,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const laptops = await getLaptops();
  return laptops.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const laptop = await getLaptopBySlug(slug);
  if (!laptop) return { title: "Laptop Not Found | CollegeRig" };

  return {
    title: `${laptop.brand} ${laptop.model} — Price, Specs & College Score | CollegeRig`,
    description: `Verified specifications for ${laptop.brand} ${laptop.model} in India (${formatInr(laptop.priceInr)}). Tested for engineering branches, Indian warranty notes, and verified sources.`,
  };
}

export default async function LaptopDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const laptop = await getLaptopBySlug(slug);

  if (!laptop) {
    notFound();
  }

  const subScores = calculateSubScores(laptop);
  const overallScore = calculateOverallScore(subScores, DEFAULT_WEIGHTS);
  const discountPct = calculateDiscount(laptop.priceInr, laptop.mrpInr);
  const savingsAmount = laptop.mrpInr - laptop.priceInr;
  const similarLaptops = await getSimilarLaptops(laptop, 3);

  const subScoreKeys = [
    { key: "performance", label: "Performance", score: subScores.performance, desc: "CPU cores, GPU compute & RAM bandwidth" },
    { key: "battery", label: "Battery Life", score: subScores.battery, desc: "Watt-hour capacity & real-world runtime" },
    { key: "portability", label: "Portability", score: subScores.portability, desc: "Weight, footprint & campus commuting ease" },
    { key: "display", label: "Display Quality", score: subScores.display, desc: "Resolution, color gamut, panel type & refresh rate" },
    { key: "build", label: "Build & Keyboard", score: subScores.build, desc: "Chassis durability, ports & backlit keys" },
    { key: "value", label: "Value for Money", score: subScores.value, desc: "Feature-to-price ratio in the Indian market" },
    { key: "futureProofing", label: "Future-proofing", score: subScores.futureProofing, desc: "Upgradable RAM & storage slots" },
  ] as const;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-10">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/laptops" className="hover:text-foreground">Laptops</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-semibold truncate">{laptop.brand} {laptop.model}</span>
      </nav>

      {/* Hero Overview Card */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-12 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
        {/* Left Column: Visual Device Render */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <LaptopImage laptop={laptop} size="lg" />

          {/* Quick trust metrics */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="rounded-xl border border-border/70 bg-background/50 p-3">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase">Verification</span>
              <p className="text-xs font-bold text-foreground mt-0.5 flex items-center gap-1.5">
                {laptop.isVerified ? (
                  <>
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Official Spec Sheet</span>
                  </>
                ) : (
                  <span>Unverified Demo</span>
                )}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                <Calendar className="h-2.5 w-2.5" />
                <span>Verified: {laptop.lastVerified}</span>
              </p>
            </div>

            <div className="rounded-xl border border-border/70 bg-background/50 p-3">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase">Indian Warranty</span>
              <p className="text-xs font-bold text-foreground mt-0.5">
                {laptop.warrantyYears} Year{laptop.warrantyYears > 1 ? "s" : ""} Onsite
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5 truncate">
                {laptop.serviceNotes.split(".")[0]}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Specs, Pricing, and CTAs */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold text-primary">
                {laptop.brand}
              </span>
              <span className="rounded-full bg-secondary border border-border px-3 py-1 text-xs font-medium text-foreground">
                {laptop.os}
              </span>
              {laptop.studentDiscount && (
                <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                  <Percent className="h-3 w-3" />
                  <span>Student Offer Available</span>
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-4xl">
              {laptop.model}
            </h1>
            <p className="text-sm text-muted-foreground">
              {laptop.cpu.name} · {laptop.gpu.name} ({laptop.gpu.vramGb}GB {laptop.gpu.type}) · {laptop.ramGb}GB RAM · {laptop.storageGb}GB SSD
            </p>

            {/* Price Box */}
            <div className="flex flex-wrap items-baseline gap-3 pt-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-foreground">
                {formatInr(laptop.priceInr)}
              </span>
              {discountPct > 0 && (
                <>
                  <span className="text-sm text-muted-foreground line-through">
                    MRP {formatInr(laptop.mrpInr)}
                  </span>
                  <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    Save {formatInr(savingsAmount)} ({discountPct}% OFF)
                  </span>
                </>
              )}
            </div>

            {/* Student Discount Highlight Banner */}
            {laptop.studentDiscount && (
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-3.5 text-xs">
                <div className="flex items-start gap-2.5">
                  <Percent className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div className="space-y-1">
                    <p className="font-bold text-foreground">
                      {laptop.studentDiscount.program}: {laptop.studentDiscount.summary}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Requires college ID card or student email. Verified on {laptop.studentDiscount.verifiedOn}.
                    </p>
                    <a
                      href={laptop.studentDiscount.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary underline underline-offset-2 hover:text-primary/80"
                    >
                      <span>Claim via student verification portal</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Where to Buy (Affiliate Buttons) */}
          <div className="space-y-3 pt-2 border-t border-border/80">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Where to Buy (Indian Retailers)
              </h2>
              <span className="text-[10px] text-muted-foreground">
                Live pricing may fluctuate
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {laptop.buyLinks.map((buy) => (
                <a
                  key={buy.store}
                  href={buy.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="tap-target inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
                >
                  <span>Buy on {buy.store}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>

            {/* Affiliate Disclosure Notice */}
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              <strong>Transparency Note:</strong> As an affiliate, CollegeRig may earn a commission from qualifying purchases made through these store links. This never affects our scoring formulas or branch qualification criteria.
            </p>
          </div>
        </div>
      </section>

      {/* Transparent Score Breakdown & Sub-scores Section */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Transparent CollegeRig Index</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              How This Score is Calculated
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Deterministic mathematical ratings across 7 dimensions. No arbitrary reviewer scores.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <ScoreBadge score={overallScore} size="lg" label="Overall Rating" />
          </div>
        </div>

        {/* 7 Sub-scores Progress Bars Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subScoreKeys.map((item) => {
            const color = getScoreColor(item.score);
            return (
              <div
                key={item.key}
                className="rounded-2xl border border-border/70 bg-background/60 p-4 space-y-2.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-foreground">{item.label}</span>
                  <span className={`font-extrabold ${color.text}`}>{item.score} / 100</span>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.score >= 85
                        ? "bg-emerald-500"
                        : item.score >= 70
                        ? "bg-teal-500"
                        : item.score >= 55
                        ? "bg-amber-500"
                        : "bg-rose-500"
                    }`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>

                <p className="text-[11px] text-muted-foreground">{item.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs text-muted-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p>
            Curious about the exact math? All mathematical constants and penalty curves are publicly documented.
          </p>
          <Link
            href="/methodology"
            className="inline-flex items-center gap-1.5 font-bold text-primary underline underline-offset-2 shrink-0 hover:text-primary/80"
          >
            <span>Read Full Scoring Methodology</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Pros, Cons, and Academic Branch Fit */}
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Pros & Cons Card */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-foreground">Pros & Trade-offs</h2>

          {/* Pros */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              <span>What Students Will Love</span>
            </h3>
            <ul className="space-y-2 text-xs text-foreground/90">
              {laptop.pros.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="space-y-2.5 pt-4 border-t border-border/80">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" />
              <span>Drawbacks to Keep in Mind</span>
            </h3>
            <ul className="space-y-2 text-xs text-foreground/90">
              {laptop.cons.map((con, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold shrink-0 mt-0.5">⚠</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Who It's For / Who Should Avoid */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-foreground">Campus Fit Guide</h2>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              <span>Recommended For</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {laptop.bestFor.map((item, idx) => (
                <span
                  key={idx}
                  className="rounded-xl border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-border/80">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Info className="h-4 w-4" />
              <span>Hostel & Commute Notes</span>
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Weighs <strong>{laptop.weightKg} kg</strong> with <strong>{laptop.claimedBatteryHrs} hours</strong> claimed runtime ({laptop.batteryWh}Wh).{" "}
              {laptop.weightKg <= 1.4
                ? "Excellent for long daily college bus rides and carrying between lecture halls."
                : laptop.weightKg >= 2.2
                ? "Best suited for students staying in hostels or having a permanent desk setup at home."
                : "Balanced weight that fits in standard college backpacks without excessive fatigue."}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-border/80">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Info className="h-4 w-4" />
              <span>Service Center Proximity (KPRIT & Hyderabad)</span>
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {laptop.serviceNotes}
            </p>
          </div>
        </div>
      </section>

      {/* Comprehensive Grouped Technical Specs Grid */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Complete Technical Specifications
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Grouped and verified against manufacturer data sheets.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* 1. Processor */}
          <div className="rounded-2xl border border-border/70 bg-background/50 p-4 space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase">
              <Cpu className="h-4 w-4" />
              <span>Processor</span>
            </div>
            <div className="text-xs space-y-1.5">
              <p className="font-bold text-foreground text-sm">{laptop.cpu.name}</p>
              <div className="flex justify-between text-muted-foreground">
                <span>Cores:</span>
                <span className="font-semibold text-foreground">{laptop.cpu.cores} cores</span>
              </div>
              {laptop.cpu.threads && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Threads:</span>
                  <span className="font-semibold text-foreground">{laptop.cpu.threads} threads</span>
                </div>
              )}
              {laptop.cpu.benchmarkScore && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Benchmark Index:</span>
                  <span className="font-semibold text-foreground">{laptop.cpu.benchmarkScore.toLocaleString("en-IN")}</span>
                </div>
              )}
            </div>
          </div>

          {/* 2. Graphics */}
          <div className="rounded-2xl border border-border/70 bg-background/50 p-4 space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase">
              <Monitor className="h-4 w-4" />
              <span>Graphics (GPU)</span>
            </div>
            <div className="text-xs space-y-1.5">
              <p className="font-bold text-foreground text-sm">{laptop.gpu.name}</p>
              <div className="flex justify-between text-muted-foreground">
                <span>Type:</span>
                <span className="font-semibold text-foreground capitalize">{laptop.gpu.type}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>VRAM:</span>
                <span className="font-semibold text-foreground">
                  {laptop.gpu.vramGb > 0 ? `${laptop.gpu.vramGb}GB Dedicated GDDR6` : "Shared System Memory"}
                </span>
              </div>
            </div>
          </div>

          {/* 3. Memory & Storage */}
          <div className="rounded-2xl border border-border/70 bg-background/50 p-4 space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase">
              <Layers className="h-4 w-4" />
              <span>Memory & Storage</span>
            </div>
            <div className="text-xs space-y-1.5">
              <div className="flex justify-between text-muted-foreground">
                <span>RAM:</span>
                <span className="font-bold text-foreground">{laptop.ramGb}GB</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Upgradability:</span>
                <span className={`font-semibold ${laptop.ramUpgradable ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                  {laptop.ramUpgradable ? "Upgradable Slot Available" : "Soldered / Fixed"}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Storage:</span>
                <span className="font-bold text-foreground">{laptop.storageGb}GB</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>SSD Protocol:</span>
                <span className="font-semibold text-foreground">{laptop.storageType}</span>
              </div>
            </div>
          </div>

          {/* 4. Display */}
          <div className="rounded-2xl border border-border/70 bg-background/50 p-4 space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase">
              <Monitor className="h-4 w-4" />
              <span>Display Panel</span>
            </div>
            <div className="text-xs space-y-1.5">
              <div className="flex justify-between text-muted-foreground">
                <span>Screen Size:</span>
                <span className="font-bold text-foreground">{laptop.display.sizeIn} inches</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Resolution:</span>
                <span className="font-semibold text-foreground">{laptop.display.resolution}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Panel Technology:</span>
                <span className="font-semibold text-foreground">{laptop.display.panel}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Brightness:</span>
                <span className="font-semibold text-foreground">{laptop.display.nits} nits</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Refresh Rate:</span>
                <span className="font-semibold text-foreground">{laptop.display.refreshHz} Hz</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Color Accuracy:</span>
                <span className="font-semibold text-foreground">{laptop.display.srgbPct}% sRGB</span>
              </div>
            </div>
          </div>

          {/* 5. Battery & Power */}
          <div className="rounded-2xl border border-border/70 bg-background/50 p-4 space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase">
              <Battery className="h-4 w-4" />
              <span>Battery & Charging</span>
            </div>
            <div className="text-xs space-y-1.5">
              <div className="flex justify-between text-muted-foreground">
                <span>Capacity:</span>
                <span className="font-bold text-foreground">{laptop.batteryWh} Watt-hours</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Claimed Run-time:</span>
                <span className="font-semibold text-foreground">Up to {laptop.claimedBatteryHrs} hours</span>
              </div>
            </div>
          </div>

          {/* 6. Ports & Hardware */}
          <div className="rounded-2xl border border-border/70 bg-background/50 p-4 space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase">
              <HardDrive className="h-4 w-4" />
              <span>Chassis & Connectivity</span>
            </div>
            <div className="text-xs space-y-1.5">
              <div className="flex justify-between text-muted-foreground">
                <span>Carry Weight:</span>
                <span className="font-bold text-foreground">{laptop.weightKg} kg</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Keyboard:</span>
                <span className="font-semibold text-foreground">
                  {laptop.backlitKeyboard ? "Backlit Chiclet" : "Non-backlit"}
                </span>
              </div>
              <div className="pt-1">
                <span className="text-muted-foreground block mb-1">Ports:</span>
                <div className="flex flex-wrap gap-1">
                  {laptop.ports.map((port, i) => (
                    <span key={i} className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-foreground">
                      {port}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Sources Panel */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="h-5 w-5 text-emerald-500" />
          <h2 className="text-lg font-bold text-foreground">
            Verified Manufacturer Data Sources
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          CollegeRig enforces a strict verification policy. Every spec listed on this page was manually verified against official OEM technical specifications:
        </p>
        <ul className="space-y-2 text-xs">
          {laptop.sources.map((source, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-primary font-bold">🔗</span>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
              >
                {source.label}
              </a>
              <span className="text-[10px] text-muted-foreground">({new URL(source.url).hostname})</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Similar Laptops in this Budget Bracket */}
      {similarLaptops.length > 0 && (
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Similar Laptops in this Price Bracket
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Compare alternatives within ±25% of {formatInr(laptop.priceInr)}.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similarLaptops.map((similar) => (
              <LaptopCard key={similar.id} laptop={similar} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

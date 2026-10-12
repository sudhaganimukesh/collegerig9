import Link from "next/link";
import {
  BookOpen,
  Cpu,
  BatteryCharging,
  Feather,
  Monitor,
  ShieldCheck,
  Tag,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { BRANCH_PRESETS } from "@/lib/scoring";
import { getBranches } from "@/lib/data";

export const metadata = {
  title: "Scoring Methodology & Data Integrity | CollegeRig",
  description:
    "Transparent documentation of CollegeRig's 7-dimension scoring formulas, branch minimum-spec rules, verified data sourcing, and affiliate monetization ethics.",
};

export default async function MethodologyPage() {
  const branches = await getBranches();

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
      {/* Header */}
      <div className="space-y-4 border-b border-border pb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Full Algorithmic Transparency</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          How CollegeRig Scores Every Laptop
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Unlike generic review websites and sponsored YouTube benchmarks, CollegeRig operates on <strong>audited, deterministic formulas</strong> designed specifically for Indian college syllabi and student living conditions.
        </p>
      </div>

      {/* Table of Contents Quick Nav */}
      <div className="mt-8 rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          On this page
        </h2>
        <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 md:grid-cols-4">
          <a href="#subscores" className="text-foreground hover:text-primary transition-colors flex items-center gap-1.5">
            <span className="text-primary font-mono text-xs">01.</span> The 7 Sub-Scores
          </a>
          <a href="#branches" className="text-foreground hover:text-primary transition-colors flex items-center gap-1.5">
            <span className="text-primary font-mono text-xs">02.</span> Branch Weight Presets
          </a>
          <a href="#disqualification" className="text-foreground hover:text-primary transition-colors flex items-center gap-1.5">
            <span className="text-primary font-mono text-xs">03.</span> Minimum Spec Filter
          </a>
          <a href="#verification" className="text-foreground hover:text-primary transition-colors flex items-center gap-1.5">
            <span className="text-primary font-mono text-xs">04.</span> Data Verification
          </a>
          <a href="#monetization" className="text-foreground hover:text-primary transition-colors flex items-center gap-1.5">
            <span className="text-primary font-mono text-xs">05.</span> Ethical Monetization
          </a>
        </div>
      </div>

      {/* Section 1: The 7 Sub-Scores */}
      <section id="subscores" className="mt-12 space-y-8 scroll-mt-20">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <span>Dimension Breakdown</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-1">
            The 7 Sub-Scores (0 to 100)
          </h2>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Every laptop is evaluated on seven discrete mathematical axes implemented as pure functions in <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">lib/scoring.ts</code>.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* 1. Performance */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">1. Performance (0–100)</h3>
                <p className="text-xs text-muted-foreground">Weight: 45% CPU + 40% GPU + 15% RAM</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Combines processor tier (Intel Core i3/i5/i7/Ultra, AMD Ryzen 3/5/7/8000, Apple M2/M3) and physical core count with graphics capability. Dedicated GPUs (RTX 4060, RTX 4050, RTX 3050, RTX 2050) scale with VRAM capacity (4GB to 8GB), while integrated graphics (Intel Arc, Radeon 780M, Intel Iris Xe) receive scaled base points suitable for coding and general tasks.
            </p>
            <div className="rounded-lg bg-muted/50 p-3 text-xs font-mono text-foreground">
              Performance = (CPUScore * 0.45) + (GPUScore * 0.40) + (RAMScore * 0.15)
            </div>
          </div>

          {/* 2. Battery */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BatteryCharging className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">2. Battery Life (0–100)</h3>
                <p className="text-xs text-muted-foreground">Battery capacity (Wh) + Claimed Runtime + Efficiency Bonus</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Crucial for campus day scholars and lecture halls with limited AC sockets. Evaluates battery capacity in Watt-Hours (40Wh–90Wh) and real-world manufacturer claimed runtime. Laptops featuring high-efficiency ARM or Intel Core Ultra architectures that exceed 14 hours receive an additional efficiency bonus (+8).
            </p>
            <div className="rounded-lg bg-muted/50 p-3 text-xs font-mono text-foreground">
              Battery = min(100, (BatteryWh / 75 * 50) + (ClaimedHrs / 16 * 50) + EfficiencyBonus)
            </div>
          </div>

          {/* 3. Portability */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Feather className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">3. Portability (0–100)</h3>
                <p className="text-xs text-muted-foreground">Chassis weight + Screen footprint</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Based on the physical burden of carrying a backpack on crowded college transit (e.g., RTC bus 280 to KPRIT). Laptops ≤1.24 kg score a perfect 100; ultrabooks under 1.45 kg score 90; typical 1.7 kg laptops score 75; heavy gaming rigs over 2.3 kg receive 40 or lower. Compact 13–14 inch screens receive a footprint portability bonus.
            </p>
          </div>

          {/* 4. Display */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Monitor className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">4. Display Quality (0–100)</h3>
                <p className="text-xs text-muted-foreground">Panel type + Brightness (nits) + Color Gamut (sRGB) + Resolution</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Essential for Design and UI/UX students, and for reading code for hours without eye strain. Penalizes washed-out 45% NTSC / 250-nit TN panels (capped at 50-60 points) while rewarding 100% sRGB, OLED / Liquid Retina panels, 120Hz refresh rates, and 400+ nits outdoor brightness.
            </p>
          </div>

          {/* 5. Build & Keyboard */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">5. Build & Keyboard (0–100)</h3>
                <p className="text-xs text-muted-foreground">Backlit typing + Port diversity (Type-C PD, HDMI) + Durability</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Designed for late-night hostel coding (backlit keyboard is mandatory +15 pts), lab projector connections (full-size HDMI), and modern universal charging (Type-C Power Delivery). Multi-year warranty packages in India provide additional score reinforcement.
            </p>
          </div>

          {/* 6. Value for Money */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Tag className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">6. Value for Money (0–100)</h3>
                <p className="text-xs text-muted-foreground">Capabilities delivered per Indian Rupee (₹)</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Evaluates composite performance, battery, and display relative to selling price. High-tier laptops costing ₹1.4L+ naturally score lower on raw budget value than a ₹52k laptop packing a 16GB Core i5 with 100% sRGB.
            </p>
          </div>

          {/* 7. Future-proofing */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Wrench className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">7. Future-proofing & Upgradability (0–100)</h3>
                <p className="text-xs text-muted-foreground">User-upgradable RAM + Spare M.2 SSD + Modern Wi-Fi</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Will this laptop survive all 4 years of engineering? Laptops with dual SO-DIMM upgradable RAM slots earn +30 pts, spare SSD slots earn +20 pts, baseline 16GB RAM earns +25 pts. 8GB soldered laptops receive a maximum score of 45, warning students against early obsolescence.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Branch Weight Presets */}
      <section id="branches" className="mt-16 space-y-6 scroll-mt-20">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <span>Branch Presets</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-1">
            Department-Specific Weights
          </h2>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            The overall score is a weighted average based on the student&apos;s department syllabus. Students can always customize these weights live using our interactive sliders.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-border bg-muted/60 text-foreground font-semibold">
              <tr>
                <th className="p-3 sm:p-4">Branch Preset</th>
                <th className="p-3 text-center">Perf</th>
                <th className="p-3 text-center">Battery</th>
                <th className="p-3 text-center">Portab.</th>
                <th className="p-3 text-center">Display</th>
                <th className="p-3 text-center">Build</th>
                <th className="p-3 text-center">Value</th>
                <th className="p-3 text-center">Future</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              {branches.map((b) => {
                const w = BRANCH_PRESETS[b.slug] || b.scoreWeights;
                return (
                  <tr key={b.slug} className="hover:bg-muted/30 transition-colors">
                    <td className="p-3 sm:p-4 font-medium text-foreground">
                      <div className="font-bold">{b.name}</div>
                      <div className="text-[11px] text-muted-foreground">{b.typicalSoftware.slice(0, 3).join(", ")}</div>
                    </td>
                    <td className="p-3 text-center font-semibold text-foreground">{w.performance}%</td>
                    <td className="p-3 text-center">{w.battery}%</td>
                    <td className="p-3 text-center">{w.portability}%</td>
                    <td className="p-3 text-center">{w.display}%</td>
                    <td className="p-3 text-center">{w.build}%</td>
                    <td className="p-3 text-center">{w.value}%</td>
                    <td className="p-3 text-center font-semibold text-foreground">{w.futureProofing}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Minimum Spec Disqualification */}
      <section id="disqualification" className="mt-16 space-y-6 scroll-mt-20">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <span>Strict Filtering</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-1">
            Minimum Spec Disqualification Engine
          </h2>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            A high overall score means nothing if a laptop cannot run your 3rd semester lab practicals. CollegeRig automatically filters out laptops that fail branch minimum criteria:
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 space-y-2">
            <div className="flex items-center gap-2 text-destructive font-semibold text-sm">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>CSE / AI-ML RAM Rule</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Requires <strong>16GB RAM</strong> (or 8GB with open upgradable slot). Laptops with 8GB soldered/non-upgradable RAM are disqualified because Docker, PyTorch, and Android Studio simultaneously exceed 8GB.
            </p>
          </div>

          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 space-y-2">
            <div className="flex items-center gap-2 text-destructive font-semibold text-sm">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>Mechanical & Civil GPU Rule</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Requires a <strong>Dedicated GPU (min 4GB VRAM)</strong>. Laptops with only integrated graphics are disqualified because SolidWorks, ANSYS, and Revit viewport rendering stutter heavily without hardware acceleration.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Data Verification Policy */}
      <section id="verification" className="mt-16 space-y-6 scroll-mt-20">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <span>Data Integrity</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-1">
            Zero-Hallucination Spec Verification
          </h2>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Spec sheets in India are notorious for misleading marketing (e.g. claiming &quot;Up to 16GB&quot; when only 8GB is included). We enforce rigid verification standards:
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-1">
              <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Official OEM Whitepapers
              </div>
              <p className="text-xs text-muted-foreground">
                We cite official sources like Lenovo PSREF, Dell Owner Manuals, Apple Technical Specifications, and Asus ROG ARK.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Timestamped Verification
              </div>
              <p className="text-xs text-muted-foreground">
                Every laptop lists its &quot;Last Verified&quot; date. Specs are re-audited monthly against Indian retail SKUs.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Unverified Flag
              </div>
              <p className="text-xs text-muted-foreground">
                Any demo or preliminary laptop without a verified OEM whitepaper is permanently flagged with <code className="text-[11px] text-amber-500 font-bold">isVerified: false</code>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Ethical Monetization */}
      <section id="monetization" className="mt-16 space-y-6 scroll-mt-20">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <span>Commercial Transparency</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-1">
            How We Make Money Without Compromising Integrity
          </h2>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            CollegeRig was created by students, for students. We rely on clear, non-intrusive revenue models that never interfere with scoring:
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5 space-y-2">
            <h3 className="font-bold text-foreground text-sm flex items-center gap-1.5">
              <Tag className="h-4 w-4 text-primary" />
              1. Affiliate Links
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              When students click buy links to Amazon, Flipkart, or Lenovo and purchase, we receive a 1%–2% referral commission. <strong>Prices never increase</strong> for students, and non-affiliate laptops are scored with identical formulas.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 space-y-2">
            <h3 className="font-bold text-foreground text-sm flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-amber-500" />
              2. Sponsored Slots
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Brands can purchase labeled promotional banners. These are always explicitly tagged <span className="text-amber-500 font-bold">&quot;Sponsored Partner Slot&quot;</span>. <strong>Sponsorship NEVER boosts the laptop&apos;s 0–100 score or organic rank.</strong>
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 space-y-2">
            <h3 className="font-bold text-foreground text-sm flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              3. CollegeRig Pro
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              An upcoming student advisory tier offering WhatsApp festive price drop alerts, senior student 1-on-1 calls, and syllabus PDF validators. Free for pilot campus students.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <div className="mt-16 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8 text-center space-y-4">
        <h3 className="text-xl font-bold text-foreground">
          Ready to find your ideal college machine?
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
          Take the 60-second branch and budget finder to see live scores computed with these exact formulas.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/finder"
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs sm:text-sm font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
          >
            <span>Start 60-Sec Finder</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/laptops"
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-xs sm:text-sm font-semibold text-foreground hover:bg-muted transition-colors"
          >
            <span>Browse All Laptops</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

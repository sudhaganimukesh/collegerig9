"use client";

import * as React from "react";
import Link from "next/link";
import {
  Cpu,
  Layers,
  Battery,
  ShieldAlert,
  GraduationCap,
  Percent,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Zap,
  Sparkles,
  Flame,
  Bus,
} from "lucide-react";

export function CurriculumBentoGrid() {
  return (
    <section className="container mx-auto max-w-7xl px-4 sm:px-6 py-6">
      <div className="space-y-4 text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1 text-xs font-semibold text-teal-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Curriculum-First Architecture</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
          Why Generic Laptop Reviews Fail Indian Engineering Students
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Showroom sales reps push high-margin laptops with soldered memory and poor thermals. CollegeRig audits every machine against actual college syllabi and campus transit constraints.
        </p>
      </div>

      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {/* Bento 1: 4-Year Syllabus Stack (Spans 2 columns) */}
        <div className="md:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden group hover:border-teal-500/40 transition-colors">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-teal-400">
                <Cpu className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider font-mono">
                  Syllabus Toolchain Mapping
                </span>
              </div>
              <span className="rounded-full bg-teal-500/10 border border-teal-500/30 px-2.5 py-0.5 text-[11px] font-mono text-teal-400">
                JNTU & Autonomous Standards
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
              Calibrated for Your Semester Workloads, Not Synthetic Benchmarks
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
              We benchmark laptops against actual heavy-weight undergraduate toolchains rather than generic gaming tests:
            </p>

            {/* Software Stack Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-slate-200">Docker + WSL2</span>
                  <span className="text-[10px] font-mono text-teal-400">16GB RAM Min</span>
                </div>
                <p className="text-[11px] text-slate-500">Containerized microservices</p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-slate-200">PyTorch / CUDA</span>
                  <span className="text-[10px] font-mono text-teal-400">Tensor Compute</span>
                </div>
                <p className="text-[11px] text-slate-500">Local small LLMs & CNNs</p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-slate-200">SolidWorks & CAD</span>
                  <span className="text-[10px] font-mono text-teal-400">GPU OpenGL</span>
                </div>
                <p className="text-[11px] text-slate-500">3D mechanical assembly</p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-slate-200">MATLAB & Vivado</span>
                  <span className="text-[10px] font-mono text-teal-400">Fast Multi-Core</span>
                </div>
                <p className="text-[11px] text-slate-500">FPGA HDL & digital circuits</p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-slate-200">Android Studio</span>
                  <span className="text-[10px] font-mono text-teal-400">Gradle Emulators</span>
                </div>
                <p className="text-[11px] text-slate-500">High RAM + virtual threads</p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-slate-200">Figma & Blender</span>
                  <span className="text-[10px] font-mono text-teal-400">100% sRGB Color</span>
                </div>
                <p className="text-[11px] text-slate-500">UI/UX & 3D wireframing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bento 2: Transit & Battery Realities (1 Column) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden group hover:border-teal-500/40 transition-colors flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-teal-400">
              <Bus className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider font-mono">
                Indian Campus Transit
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-100">
              RTC Bus Commutes & Socket Scarcity
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tested on Hyderabad Ghatkesar RTC route 280. Carrying a 2.5 kg brick in a crowded bus ruins your back.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Backpack Weight Ceiling</span>
                <span className="font-mono font-bold text-teal-400">≤ 1.85 kg target</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Lab Socket Scarcity</span>
                <span className="font-mono font-bold text-teal-400">6h+ Real Web/IDE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">USB-C PD Charging</span>
                <span className="font-mono font-bold text-teal-400">Power Bank Support</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <Link
              href="/campus/kprit"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 hover:text-teal-300"
            >
              <span>Explore KPRIT Hyderabad Pilot Guide</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Bento 3: Hardware Trap Detector (1 Column) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden group hover:border-amber-500/40 transition-colors flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-amber-400">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider font-mono">
                Hardware Trap Detector
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-100">
              Avoid Irreversible Bottlenecks
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our scoring model disqualifies or heavily penalizes hardware pitfalls that cannot be upgraded later:
            </p>

            <div className="space-y-2.5 text-xs pt-1">
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-2.5 flex items-start gap-2">
                <span className="text-amber-400 font-bold">!</span>
                <div>
                  <p className="font-bold text-slate-200">Soldered 8GB RAM</p>
                  <p className="text-[11px] text-slate-400">Chokes in 3rd semester Docker & Android Studio</p>
                </div>
              </div>

              <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-2.5 flex items-start gap-2">
                <span className="text-amber-400 font-bold">!</span>
                <div>
                  <p className="font-bold text-slate-200">45% NTSC Display</p>
                  <p className="text-[11px] text-slate-400">Severe color washout for design students</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <Link
              href="/methodology"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
            >
              <span>Read Audited Scoring Criteria</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Bento 4: Live Student Perk & Price Parity Engine (Spans 2 columns) */}
        <div className="md:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden group hover:border-teal-500/40 transition-colors">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-teal-400">
                <Percent className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider font-mono">
                  Verified Student Perks
                </span>
              </div>
              <span className="rounded-full bg-teal-500/10 border border-teal-500/30 px-2.5 py-0.5 text-[11px] font-mono text-teal-400">
                Daily Price Audit
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
              Stack Official Indian Student Discounts & Bank Offers
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
              Never pay showroom MRP. We aggregate verified UNiDAYS, SheerID, and Indian student portal clearance deals:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-1">
                <p className="text-xs font-bold text-slate-100">Lenovo Edu Store</p>
                <p className="text-base font-extrabold font-mono text-teal-400">Up to ₹12,000 off</p>
                <p className="text-[11px] text-slate-500">Custom CTO build discounts + ADP warranty</p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-1">
                <p className="text-xs font-bold text-slate-100">Apple Education</p>
                <p className="text-base font-extrabold font-mono text-teal-400">Free AirPods / ₹10k</p>
                <p className="text-[11px] text-slate-500">Back-to-School season SheerID verification</p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-1">
                <p className="text-xs font-bold text-slate-100">UNiDAYS India</p>
                <p className="text-base font-extrabold font-mono text-teal-400">₹3,500 – ₹7,000</p>
                <p className="text-[11px] text-slate-500">HP, ASUS, and Acer direct coupons</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

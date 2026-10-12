import Link from "next/link";
import {
  Laptop,
  GraduationCap,
  Heart,
  ShieldCheck,
  MapPin,
  Sparkles,
  ArrowRight,
  Bus,
  CheckCircle2,
  Users,
} from "lucide-react";
import { RequestCollegeForm } from "@/components/request-college-form";

export const metadata = {
  title: "About CollegeRig | Built for Indian Engineering Students",
  description:
    "The mission behind CollegeRig: helping Indian college students find durable, upgrade-ready laptops tailored to their branch, budget, and daily campus commute.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
      {/* Header */}
      <div className="space-y-4 border-b border-border pb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
          <span>Student Mission</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Why We Built CollegeRig
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Every autumn across India, thousands of first-year engineering students walk into physical electronics retail stores or scroll through sales algorithms and end up spending ₹50,000 to ₹80,000 on machines they will regret in 3rd semester.
        </p>
      </div>

      {/* The Problem We Solve */}
      <section className="mt-10 space-y-6">
        <h2 className="text-xl font-bold text-foreground">The Real Campus Problem</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5 space-y-2">
            <h3 className="font-bold text-foreground text-sm">Soldered 8GB Traps</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Sales staff pitch thin designs with 8GB soldered RAM that cannot be upgraded when students start running Android Studio, Docker, or deep learning models in year 2.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 space-y-2">
            <h3 className="font-bold text-foreground text-sm">Dim TN Screen Headaches</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Laptops marketed as &quot;FHD Display&quot; often carry 220-nit 45% NTSC twisted nematic panels with terrible viewing angles that cause severe eye strain during marathon coding.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 space-y-2">
            <h3 className="font-bold text-foreground text-sm">Heavy Bricks & Dead Batteries</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Heavy 2.4kg gaming rigs with 2-hour battery life purchased by students who commute on RTC buses and attend lectures in halls with zero available plug points.
            </p>
          </div>
        </div>
      </section>

      {/* The KPRIT Hyderabad Pilot */}
      <section className="mt-14 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2.5 text-primary">
          <GraduationCap className="h-6 w-6" />
          <h2 className="text-xl font-bold">The KPRIT Hyderabad Pilot</h2>
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed max-w-3xl">
          CollegeRig started on the ground at <strong>Kommuri Pratap Reddy Institute of Technology (KPRIT)</strong> in Ghatkesar, Hyderabad. We interviewed CSE, AI-ML, ECE, Mech, and Civil students and faculty to understand the real day-to-day realities:
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2 text-xs">
          <div className="flex items-start gap-2.5">
            <Bus className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>
              <strong>RTC Bus 280 & College Vans:</strong> Laptops need strong metal hinges or rigid polycarbonate lids that don&apos;t crack in crowded backpack commutes.
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>
              <strong>ECIL & Secunderabad Service Hubs:</strong> We map warranty service centers within 15km of Ghatkesar so students never face a 3-week repair delay before semester exams.
            </span>
          </div>
        </div>
        <div className="pt-2">
          <Link
            href="/campus/kprit"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary underline underline-offset-4 hover:text-primary/80"
          >
            <span>Explore the complete KPRIT Campus Guide</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </section>

      {/* Core Principles */}
      <section className="mt-14 space-y-6">
        <h2 className="text-xl font-bold text-foreground">Our 3 Core Pledges to Students</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5 space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              1. Zero Jargon
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We translate TDP wattage, sRGB vs NTSC, and SO-DIMM slots into plain language: &quot;Will it heat up in your lap? Can you add 16GB RAM yourself?&quot;
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              2. Zero Invented Specs
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We never scrape unverified store titles. Every laptop is sourced from official manufacturer whitepapers (PSREF, Dell Support, Apple Specs) with explicit timestamps.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              3. Unbribable Scores
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Sponsorships and affiliate deals are clearly labeled. Neither can ever modify a laptop&apos;s 0–100 score or branch pass/fail status.
            </p>
          </div>
        </div>
      </section>

      {/* Request Your College Form */}
      <section className="mt-16 pt-8 border-t border-border">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-foreground">Want CollegeRig at Your College?</h2>
            <p className="text-xs text-muted-foreground">
              We are expanding to engineering colleges across Hyderabad, Telangana, and other major student hubs. Let us know where you study!
            </p>
          </div>
          <RequestCollegeForm />
        </div>
      </section>

      {/* Real Campus Headquarters Contact */}
      <section className="mt-16 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-foreground font-bold text-base">
          <MapPin className="h-5 w-5 text-primary" />
          <h2>Campus Headquarters & Student Support</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 text-xs text-muted-foreground leading-relaxed">
          <div className="space-y-1.5">
            <p className="font-semibold text-foreground">Physical Address (Pilot Campus):</p>
            <p>
              CollegeRig Student Initiative<br />
              Kommuri Pratap Reddy Institute of Technology (KPRIT)<br />
              Near Sy. No. 1140, Edulabad, Ghatkesar Mandal<br />
              Medchal-Malkajgiri District, Hyderabad, Telangana 501301, India
            </p>
            <p className="text-[11px] text-muted-foreground pt-1">
              Adjacent to Hyderabad–Warangal Highway (NH 163).
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-foreground">Electronic Inquiries:</p>
            <p>
              Student Support: <a href="mailto:support@collegerig.in" className="text-primary underline">support@collegerig.in</a><br />
              Campus Partnerships: <a href="mailto:campus@collegerig.in" className="text-primary underline">campus@collegerig.in</a><br />
              Privacy & Legal: <a href="mailto:privacy@collegerig.in" className="text-primary underline">privacy@collegerig.in</a>
            </p>
            <p className="text-[11px] text-muted-foreground">
              Response SLA: Within 24–48 hours for Indian college students.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

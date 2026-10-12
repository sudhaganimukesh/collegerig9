import Link from "next/link";
import { Compass, Laptop, ArrowLeft, Search, GraduationCap, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[75vh] max-w-2xl flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-sm border border-primary/20">
        <Laptop className="h-10 w-10 text-primary" />
        <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-[11px] font-black text-destructive-foreground">
          ?
        </span>
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Error 404 • Missing Specification
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Laptop Spec Sheet Not Found
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          The laptop model or campus page you are trying to visit may have been re-indexed, or the URL might have a typo.
        </p>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <Link
          href="/finder"
          className="tap-target flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all"
        >
          <Compass className="h-4 w-4" />
          <span>Launch 60-Sec Finder</span>
        </Link>
        <Link
          href="/laptops"
          className="tap-target flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-xs font-semibold text-foreground hover:bg-muted transition-all"
        >
          <Laptop className="h-4 w-4 text-muted-foreground" />
          <span>Browse All 20+ Laptops</span>
        </Link>
      </div>

      {/* Quick shortcuts */}
      <div className="mt-6 w-full rounded-2xl border border-border bg-card p-5 text-left space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Popular Campus Shortcuts
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <Link
            href="/results?branch=cse-aiml"
            className="flex items-center justify-between rounded-lg border border-border/80 bg-background p-2.5 hover:border-primary/40 transition-colors"
          >
            <span className="font-semibold text-foreground">CSE & AI-ML Picks</span>
            <ArrowRight className="h-3 w-3 text-muted-foreground" />
          </Link>
          <Link
            href="/results?branch=mech"
            className="flex items-center justify-between rounded-lg border border-border/80 bg-background p-2.5 hover:border-primary/40 transition-colors"
          >
            <span className="font-semibold text-foreground">Mechanical & CAD</span>
            <ArrowRight className="h-3 w-3 text-muted-foreground" />
          </Link>
          <Link
            href="/campus/kprit"
            className="flex items-center justify-between rounded-lg border border-border/80 bg-background p-2.5 hover:border-primary/40 transition-colors"
          >
            <span className="font-semibold text-foreground">KPRIT Campus Guide</span>
            <ArrowRight className="h-3 w-3 text-muted-foreground" />
          </Link>
          <Link
            href="/discounts"
            className="flex items-center justify-between rounded-lg border border-border/80 bg-background p-2.5 hover:border-primary/40 transition-colors"
          >
            <span className="font-semibold text-foreground">Student Discounts</span>
            <ArrowRight className="h-3 w-3 text-muted-foreground" />
          </Link>
        </div>
      </div>
    </div>
  );
}

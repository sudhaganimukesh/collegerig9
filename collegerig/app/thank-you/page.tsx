import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Compass, Laptop, ArrowRight, GraduationCap, Percent } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You! | CollegeRig",
  description:
    "Thank you for contacting CollegeRig. Your student campus inquiry or Pro priority registration has been confirmed.",
};

export default function ThankYouPage() {
  return (
    <div className="container mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 mb-6 shadow-sm">
        <CheckCircle2 className="h-9 w-9" />
      </div>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span>Submission Confirmed</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Thank you for supporting CollegeRig!
        </h1>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Your campus request or Pro waitlist registration has been securely noted. We are working hard to expand hyper-local laptop recommendations and service network guides across Indian engineering institutes.
        </p>
      </div>

      {/* Helpful Next Steps */}
      <div className="mt-10 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 text-left">
        <Link
          href="/finder"
          className="group flex flex-col justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Compass className="h-4 w-4" />
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
              Launch 60-Sec Laptop Finder
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Get personalized picks for your branch and budget.
            </p>
          </div>
        </Link>

        <Link
          href="/discounts"
          className="group flex flex-col justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Percent className="h-4 w-4" />
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
              Indian Student Discounts
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Save up to ₹15,000 via UNiDAYS & SheerID portals.
            </p>
          </div>
        </Link>
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary underline underline-offset-4 hover:text-primary/80"
        >
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}

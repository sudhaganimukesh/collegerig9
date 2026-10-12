import type { Metadata } from "next";
import { getBranches } from "@/lib/data";
import { FinderWizard } from "@/components/finder-wizard";
import { Compass, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "60-Second Laptop Finder Quiz | CollegeRig",
  description:
    "Answer 4 simple questions about your branch, budget, and daily campus life to get ranked, mathematically scored laptop recommendations.",
};

export default async function FinderPage() {
  const branches = await getBranches();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
      {/* Quiz Hero Header */}
      <div className="mx-auto max-w-2xl text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1 text-xs font-semibold text-primary">
          <GraduationCap className="h-3.5 w-3.5" />
          <span>Campus-First Matching Algorithm</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
          Find your campus-ready laptop in 60 seconds
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          No jargon, no biased sponsored rankings. Tell us what branch you are in and what you can afford — we do the technical math for you.
        </p>
      </div>

      {/* The 4-step wizard */}
      <FinderWizard branches={branches} />
    </div>
  );
}

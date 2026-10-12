import * as React from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getLaptops, getBranches } from "@/lib/data";
import { ResultsView } from "@/components/results-view";
import { Laptop } from "lucide-react";

export const metadata: Metadata = {
  title: "Your Personalized Recommendations | CollegeRig",
  description:
    "Audited, mathematically ranked laptop picks based on your engineering branch and budget in India.",
};

function ResultsLoading() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-16 text-center space-y-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mx-auto">
        <Laptop className="h-7 w-7 animate-pulse" />
      </div>
      <p className="text-base font-bold text-foreground">Calculating Campus Compatibility...</p>
      <p className="text-xs text-muted-foreground">Evaluating minimum spec constraints and battery benchmarks</p>
    </div>
  );
}

export default async function ResultsPage() {
  const allLaptops = await getLaptops();
  const branches = await getBranches();

  return (
    <Suspense fallback={<ResultsLoading />}>
      <ResultsView allLaptops={allLaptops} branches={branches} />
    </Suspense>
  );
}

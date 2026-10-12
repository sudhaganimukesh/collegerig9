"use client";

import * as React from "react";
import Link from "next/link";
import { Laptop } from "@/lib/types";
import { useSavedLaptops } from "@/lib/hooks";
import { LaptopCard } from "@/components/laptop-card";
import { Bookmark, ArrowRight, Trash2 } from "lucide-react";

interface SavedViewProps {
  allLaptops: Laptop[];
}

export function SavedView({ allLaptops }: SavedViewProps) {
  const { savedList } = useSavedLaptops();

  const savedLaptops = React.useMemo(() => {
    return savedList
      .map((slug) => allLaptops.find((l) => l.slug === slug))
      .filter((l): l is Laptop => l !== undefined);
  }, [savedList, allLaptops]);

  if (savedLaptops.length === 0) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16 text-center space-y-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground mx-auto">
          <Bookmark className="h-8 w-8" />
        </div>
        <div className="space-y-2 max-w-md mx-auto">
          <h1 className="text-2xl font-black text-foreground">No Saved Laptops</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            You haven&apos;t saved any laptops yet. Tap the bookmark icon on any laptop card to save it for later or compare it with parents.
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <Link
            href="/laptops"
            className="tap-target inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            <span>Browse All Laptops</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
            Saved Laptops ({savedLaptops.length})
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Persisted in your local browser storage. Access anytime to review specs or add to comparison.
          </p>
        </div>
        <Link
          href="/compare"
          className="tap-target inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90"
        >
          <span>Go to Side-by-Side Compare</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {savedLaptops.map((laptop) => (
          <LaptopCard key={laptop.id} laptop={laptop} />
        ))}
      </div>
    </div>
  );
}

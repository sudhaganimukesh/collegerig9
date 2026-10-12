import { Laptop, Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 space-y-8 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="mx-auto max-w-2xl text-center space-y-3">
        <div className="h-6 w-48 rounded-full bg-muted mx-auto" />
        <div className="h-10 w-3/4 rounded-xl bg-muted mx-auto" />
        <div className="h-4 w-1/2 rounded-md bg-muted mx-auto" />
      </div>

      {/* Grid Card Skeletons */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <div className="h-40 w-full rounded-xl bg-muted" />
            <div className="space-y-2">
              <div className="h-3 w-20 rounded bg-muted" />
              <div className="h-5 w-3/4 rounded bg-muted" />
              <div className="h-3 w-full rounded bg-muted" />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border/60">
              <div className="h-6 w-24 rounded bg-muted" />
              <div className="h-8 w-20 rounded-xl bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home, Laptop } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log error to console for debugging
    console.error("CollegeRig Error:", error);
  }, [error]);

  return (
    <div className="container mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mb-4">
        <AlertCircle className="h-8 w-8" />
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Something went wrong
      </h1>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        We encountered an unexpected issue while loading laptop specifications or score calculations.
      </p>

      {error.digest && (
        <div className="mt-3 rounded-md bg-muted px-2.5 py-1 text-[11px] font-mono text-muted-foreground">
          Error ID: {error.digest}
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <button
          type="button"
          onClick={() => reset()}
          className="tap-target flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Try Again</span>
        </button>

        <Link
          href="/"
          className="tap-target flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
        >
          <Home className="h-4 w-4 text-muted-foreground" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}

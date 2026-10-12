"use client";

import * as React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 p-4 font-sans">
        <div className="max-w-md text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold">Application Error</h1>
          <p className="text-sm text-slate-400">
            A critical system error occurred. Please refresh the page.
          </p>
          <button
            onClick={() => reset()}
            className="rounded-xl bg-teal-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-teal-400 transition-colors"
          >
            Reload CollegeRig
          </button>
        </div>
      </body>
    </html>
  );
}

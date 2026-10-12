"use client";

import * as React from "react";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";

export function CookieBanner() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    try {
      const consent = localStorage.getItem("collegerig-cookie-consent");
      if (!consent) {
        // Show after small delay so it doesn't pop aggressively
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleConsent = (choice: "accepted" | "essential_only") => {
    try {
      localStorage.setItem("collegerig-cookie-consent", choice);
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie & Storage Preferences"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-300 sm:left-6 sm:right-auto"
    >
      <div className="rounded-2xl border border-border bg-card/95 p-4 sm:p-5 shadow-2xl backdrop-blur-md text-card-foreground">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Student Privacy & Local Storage
              </h3>
              <button
                type="button"
                onClick={() => handleConsent("essential_only")}
                className="tap-target -mr-2 -mt-2 p-1.5 text-muted-foreground hover:text-foreground"
                aria-label="Dismiss banner"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              We use browser local storage to save your compare tray and bookmarked laptops. We never sell your data or use cross-site tracking cookies. Read our{" "}
              <Link href="/privacy" className="text-primary underline font-medium hover:text-primary/80">
                Privacy Policy
              </Link>.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => handleConsent("accepted")}
                className="rounded-xl bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={() => handleConsent("essential_only")}
                className="rounded-xl border border-border bg-background px-3.5 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                Essential Only
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

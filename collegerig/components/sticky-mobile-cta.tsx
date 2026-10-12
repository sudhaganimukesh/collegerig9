"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Scale, Laptop, ArrowRight } from "lucide-react";

export function StickyMobileCTA() {
  const pathname = usePathname();
  const [compareCount, setCompareCount] = React.useState(0);
  const [showSticky, setShowSticky] = React.useState(false);

  // Sync compare count
  React.useEffect(() => {
    const checkCount = () => {
      try {
        const compare = JSON.parse(localStorage.getItem("collegerig-compare") || "[]");
        setCompareCount(Array.isArray(compare) ? compare.length : 0);
      } catch {
        setCompareCount(0);
      }
    };
    checkCount();
    window.addEventListener("storage", checkCount);
    window.addEventListener("collegerig-storage-update", checkCount);
    return () => {
      window.removeEventListener("storage", checkCount);
      window.removeEventListener("collegerig-storage-update", checkCount);
    };
  }, []);

  // Show sticky bar after scrolling down 250px on mobile
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't show sticky finder CTA if already on /finder or /compare
  if (pathname === "/finder" || pathname === "/compare") return null;
  if (!showSticky) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/80 bg-background/95 p-3 backdrop-blur-md transition-transform duration-200 sm:hidden">
      <div className="container mx-auto flex items-center justify-between gap-3 px-2">
        {compareCount > 0 ? (
          <Link
            href="/compare"
            className="tap-target flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary/10 py-2.5 text-xs font-bold text-primary"
          >
            <Scale className="h-4 w-4" />
            <span>Compare ({compareCount}/3)</span>
          </Link>
        ) : (
          <Link
            href="/laptops"
            className="tap-target flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-card py-2.5 text-xs font-semibold text-foreground"
          >
            <Laptop className="h-4 w-4 text-muted-foreground" />
            <span>Catalog</span>
          </Link>
        )}

        <Link
          href="/finder"
          className="tap-target flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-bold text-primary-foreground shadow-md hover:bg-primary/90"
        >
          <Compass className="h-4 w-4" />
          <span>Launch Finder</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

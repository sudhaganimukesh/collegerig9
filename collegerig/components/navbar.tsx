"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Laptop,
  Compass,
  SlidersHorizontal,
  Scale,
  Percent,
  GraduationCap,
  BookOpen,
  Menu,
  X,
  Sun,
  Moon,
  Bookmark,
  Sparkles,
  Search,
} from "lucide-react";
import { useTheme } from "./theme-provider";
import { ProModal } from "./pro-modal";
import { CommandPalette } from "./command-palette";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [proModalOpen, setProModalOpen] = React.useState(false);
  const [compareCount, setCompareCount] = React.useState(0);
  const [savedCount, setSavedCount] = React.useState(0);

  // Sync compare and saved count from localStorage
  React.useEffect(() => {
    const updateCounts = () => {
      try {
        const compare = JSON.parse(localStorage.getItem("collegerig-compare") || "[]");
        setCompareCount(Array.isArray(compare) ? compare.length : 0);
        const saved = JSON.parse(localStorage.getItem("collegerig-saved") || "[]");
        setSavedCount(Array.isArray(saved) ? saved.length : 0);
      } catch {
        setCompareCount(0);
        setSavedCount(0);
      }
    };

    updateCounts();
    window.addEventListener("storage", updateCounts);
    window.addEventListener("collegerig-storage-update", updateCounts);
    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("collegerig-storage-update", updateCounts);
    };
  }, []);

  const navLinks = [
    { href: "/finder", label: "Laptop Finder", icon: Compass, badge: "60s" },
    { href: "/laptops", label: "Browse Laptops", icon: Laptop },
    { href: "/compare", label: "Compare", icon: Scale, count: compareCount },
    { href: "/saved", label: "Saved", icon: Bookmark, count: savedCount },
    { href: "/discounts", label: "Student Discounts", icon: Percent },
    { href: "/campus/kprit", label: "KPRIT Pilot", icon: GraduationCap },
    { href: "/methodology", label: "Methodology", icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold tracking-tight text-foreground transition-colors hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Laptop className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-lg font-extrabold tracking-tight">CollegeRig</span>
                <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                  IN
                </span>
              </div>
              <span className="text-[10px] font-medium text-muted-foreground">
                KPRIT Hyderabad Pilot
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{link.label}</span>
                {link.badge && (
                  <span className="rounded-full bg-primary/15 px-1.5 py-0.2 text-[10px] font-bold text-primary">
                    {link.badge}
                  </span>
                )}
                {typeof link.count === "number" && link.count > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {link.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* 21st.dev Command Palette Trigger */}
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("collegerig-open-command-palette"));
              }
            }}
            className="flex items-center gap-2 rounded-lg border border-border/80 bg-card px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-all shadow-sm"
            aria-label="Open command palette (Ctrl+K or ⌘K)"
          >
            <Search className="h-3.5 w-3.5 text-teal-400" />
            <span className="hidden md:inline">Search specs...</span>
            <kbd className="hidden md:inline-flex rounded border border-border bg-muted/60 px-1 py-0.2 text-[10px] font-mono text-muted-foreground">
              ⌘K
            </kbd>
          </button>

          {/* CollegeRig Pro Early Access Teaser */}
          <button
            type="button"
            onClick={() => setProModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-colors shadow-sm"
            aria-label="Open CollegeRig Pro waitlist"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Pro</span>
          </button>

          {/* Quick Finder CTA for Desktop */}
          <Link
            href="/finder"
            className="hidden items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 sm:inline-flex"
          >
            <Compass className="h-3.5 w-3.5" />
            <span>Start Finder</span>
          </Link>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="tap-target flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-muted"
            aria-label="Toggle theme"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
          </button>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="tap-target flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-muted lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-background px-4 py-4 lg:hidden">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`tap-target flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                    isActive
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary">
                      {link.badge}
                    </span>
                  )}
                  {typeof link.count === "number" && link.count > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {link.count}
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setProModalOpen(true);
                }}
                className="tap-target flex w-full items-center justify-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 py-2.5 text-center font-bold text-amber-600 dark:text-amber-400"
              >
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>CollegeRig Pro (Free Pilot Access)</span>
              </button>

              <Link
                href="/finder"
                onClick={() => setMobileMenuOpen(false)}
                className="tap-target flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-center font-semibold text-primary-foreground"
              >
                <Compass className="h-5 w-5" />
                <span>Launch 60-Sec Laptop Finder</span>
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* Pro Modal */}
      <ProModal isOpen={proModalOpen} onClose={() => setProModalOpen(false)} />

      {/* 21st.dev Command Palette (⌘K) */}
      <CommandPalette />
    </header>
  );
}

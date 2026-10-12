"use client";

import * as React from "react";
import { ShieldCheck, Info, X, ExternalLink, CheckCircle2 } from "lucide-react";

interface AffiliateDisclosureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AffiliateDisclosureModal({ isOpen, onClose }: AffiliateDisclosureModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl text-card-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Affiliate & Ethics Disclosure</h3>
              <p className="text-xs text-muted-foreground">How CollegeRig stays free & independent</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="tap-target flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 text-xs text-foreground">
            <strong className="text-primary font-bold">Our Golden Rule:</strong>{" "}
            Commercial partnerships and affiliate links <strong>NEVER</strong> affect CollegeRig 0–100 scores, branch compatibility checks, or laptop rankings.
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              How do affiliate links work?
            </h4>
            <p>
              When you click a buy link on CollegeRig (to Amazon India, Flipkart, Lenovo India, Dell, Apple, etc.) and make a purchase, the retailer may pay us a small referral commission (typically 1% to 2.5%).
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Does this increase the price for students?
            </h4>
            <p>
              <strong>Never.</strong> You pay the exact same price (or lower if you use our tracked student discount coupon codes). The affiliate fee comes entirely out of the retailer’s advertising budget.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              How do we prevent bias?
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Our scoring code is an open, pure mathematical function in <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px] text-foreground">lib/scoring.ts</code>.</li>
              <li>Laptops without affiliate programs are scored with the exact same formulas as laptops with affiliate programs.</li>
              <li>If a brand offers a sponsored feature, it is always explicitly labeled with a <span className="rounded bg-amber-500/10 px-1 text-amber-600 font-semibold dark:text-amber-400">Sponsored</span> tag and never ranks above better organic matches.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end border-t border-border pt-4">
          <button
            onClick={onClose}
            className="rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}

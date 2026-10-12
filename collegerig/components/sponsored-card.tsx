"use client";

import * as React from "react";
import Link from "next/link";
import { Laptop } from "@/lib/types";
import { formatInr } from "@/lib/utils";
import { LaptopImage } from "./laptop-image";
import { ScoreBadge } from "./score-badge";
import { ShieldAlert, ExternalLink, Info, CheckCircle2, Sparkles } from "lucide-react";

interface SponsoredCardProps {
  laptop: Laptop;
  onOpenDisclosure?: () => void;
}

export function SponsoredLaptopCard({ laptop, onOpenDisclosure }: SponsoredCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-500/5 via-card to-card p-5 shadow-sm transition-all hover:shadow-md">
      {/* Sponsored Pill Badge & Disclosure Trigger */}
      <div className="flex items-center justify-between pb-3 border-b border-border/80">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <Sparkles className="h-3 w-3" />
            Sponsored Partner Slot
          </span>
          <span className="text-[10px] text-muted-foreground hidden sm:inline">
            Brand Partner Placement
          </span>
        </div>

        <button
          onClick={onOpenDisclosure}
          type="button"
          className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground underline underline-offset-2"
        >
          <Info className="h-3 w-3 text-amber-500" />
          <span>Why is this labeled?</span>
        </button>
      </div>

      {/* Strict Scoring Independence Banner */}
      <div className="my-3 rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-[11px] text-foreground flex items-center gap-2">
        <ShieldAlert className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
        <span>
          <strong>Ethical Scoring Guarantee:</strong> Sponsorship <strong>never</strong> alters this laptop&apos;s 0–100 score or organic search ranking.
        </span>
      </div>

      {/* Main Laptop Content */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 items-center">
        {/* Device Image */}
        <div className="sm:col-span-1 flex justify-center">
          <div className="w-full max-w-[160px]">
            <LaptopImage laptop={laptop} size="sm" />
          </div>
        </div>

        {/* Info */}
        <div className="sm:col-span-2 space-y-1.5">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {laptop.brand}
          </div>
          <Link
            href={`/laptops/${laptop.slug}`}
            className="text-base font-bold text-foreground hover:text-primary transition-colors block leading-snug"
          >
            {laptop.model}
          </Link>

          <p className="text-xs text-muted-foreground line-clamp-2">
            {laptop.cpu.name} • {laptop.ramGb}GB RAM • {laptop.gpu.name} • {laptop.batteryWh}Wh Battery ({laptop.claimedBatteryHrs}h)
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {laptop.bestFor.slice(0, 2).map((item, idx) => (
              <span
                key={idx}
                className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Action */}
        <div className="sm:col-span-1 flex flex-col sm:items-end justify-between gap-3 border-t sm:border-t-0 sm:border-l border-border pt-3 sm:pt-0 sm:pl-4">
          <div className="sm:text-right">
            <div className="text-lg font-black text-foreground">
              {formatInr(laptop.priceInr)}
            </div>
            <div className="text-[11px] text-muted-foreground line-through">
              MRP {formatInr(laptop.mrpInr)}
            </div>
            {laptop.studentDiscount && (
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                Student discount available
              </span>
            )}
          </div>

          <div className="flex w-full sm:w-auto items-center gap-2">
            <Link
              href={`/laptops/${laptop.slug}`}
              className="w-full sm:w-auto text-center rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-all"
            >
              View Specs & Score
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

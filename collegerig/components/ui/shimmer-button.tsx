"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * 21st.dev signature ShimmerButton component
 * High-performance pure-CSS rotating conic shimmer border for primary actions
 */
export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ShimmerButtonProps
>(
  (
    {
      shimmerColor = "#14b8a6",
      shimmerSize = "0.08em",
      shimmerDuration = "3.2s",
      borderRadius = "0.75rem",
      background = "rgba(15, 23, 42, 0.95)",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as React.CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-5 py-3 text-white transition-all duration-300 hover:scale-[1.01] hover:border-teal-500/50 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-60",
          className
        )}
        {...props}
      >
        {/* Spark container */}
        <div className="absolute inset-0 -z-30 overflow-visible [container-type:size]">
          <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
            <div className="absolute -inset-full w-auto rotate-0 animate-spin-slow [background:conic-gradient(from_0deg,transparent_0_340deg,var(--shimmer-color)_360deg)] [translate:0_0]" />
          </div>
        </div>

        {/* Backdrop overlay */}
        <div
          className="absolute -z-20 transition-colors"
          style={{
            inset: "var(--cut)",
            borderRadius: "calc(var(--radius) - var(--cut))",
            background: "var(--bg)",
          }}
        />

        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2 text-sm font-bold tracking-tight text-slate-100 group-hover:text-white">
          {children}
        </span>
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";

import * as React from "react";
import { getScoreColor } from "@/lib/utils";

interface ScoreBadgeProps {
  score: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  showRing?: boolean;
  className?: string;
}

export function ScoreBadge({
  score,
  label = "CollegeRig Score",
  size = "md",
  showRing = true,
  className = "",
}: ScoreBadgeProps) {
  const color = getScoreColor(score);

  const sizeClasses = {
    sm: "h-8 w-8 text-xs font-bold",
    md: "h-11 w-11 text-sm font-extrabold",
    lg: "h-16 w-16 text-xl font-extrabold",
  };

  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div
        className={`relative flex items-center justify-center rounded-xl border ${color.border} ${color.bg} ${sizeClasses[size]} shadow-sm`}
        aria-label={`${label}: ${score} out of 100`}
      >
        <span className={color.text}>{score}</span>
      </div>
      {label && size !== "sm" && (
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold text-foreground leading-tight">
            {label}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {score >= 85 ? "Exceptional" : score >= 70 ? "Great Match" : score >= 55 ? "Moderate" : "Basic"}
          </span>
        </div>
      )}
    </div>
  );
}

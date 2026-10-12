import * as React from "react";
import { Laptop } from "@/lib/types";

interface LaptopImageProps {
  laptop: Laptop;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function LaptopImage({ laptop, className = "", size = "md" }: LaptopImageProps) {
  // Brand color accents
  const brandThemes: Record<string, { bg: string; accent: string; label: string }> = {
    Apple: { bg: "from-slate-800 to-slate-950", accent: "#a3e635", label: "Apple Silicon" },
    Lenovo: { bg: "from-rose-950 to-slate-950", accent: "#f43f5e", label: "Lenovo" },
    ASUS: { bg: "from-cyan-950 to-slate-950", accent: "#06b6d4", label: "ASUS" },
    HP: { bg: "from-blue-950 to-slate-950", accent: "#3b82f6", label: "HP" },
    Acer: { bg: "from-emerald-950 to-slate-950", accent: "#10b981", label: "Acer" },
    Dell: { bg: "from-indigo-950 to-slate-950", accent: "#6366f1", label: "Dell" },
  };

  const theme = brandThemes[laptop.brand] || {
    bg: "from-slate-900 to-zinc-950",
    accent: "#14b8a6",
    label: laptop.brand,
  };

  const heights = {
    sm: "h-36",
    md: "h-48",
    lg: "h-64 sm:h-80",
  };

  const isOled = laptop.display.panel === "OLED" || laptop.display.panel === "Retina";
  const isDedicatedGpu = laptop.gpu.type === "dedicated";

  return (
    <div
      role="img"
      aria-label={`Illustration of ${laptop.brand} ${laptop.model} with ${laptop.display.sizeIn}-inch ${laptop.display.panel} display and ${laptop.weightKg}kg chassis`}
      className={`relative w-full ${heights[size]} overflow-hidden rounded-xl bg-gradient-to-br ${theme.bg} p-4 flex flex-col items-center justify-center border border-border/60 shadow-inner select-none ${className}`}
    >
      {/* Background ambient glow */}
      <div
        className="absolute inset-0 opacity-20 blur-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${theme.accent}, transparent 70%)`,
        }}
      />

      {/* Stylized Laptop SVG Illustration */}
      <div className="relative z-10 w-full max-w-[260px] flex flex-col items-center">
        {/* Screen Bezel */}
        <div className="w-[88%] aspect-[16/10] bg-slate-950 rounded-t-lg border-2 border-slate-700/80 p-1.5 shadow-2xl relative flex flex-col justify-between overflow-hidden">
          {/* Webcam dot */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-500 rounded-full" />

          {/* Screen Content Simulation */}
          <div
            className={`w-full h-full rounded flex flex-col justify-between p-2 text-[9px] font-mono leading-tight ${
              isOled
                ? "bg-gradient-to-br from-indigo-950/80 via-purple-950/80 to-slate-950 text-emerald-300"
                : "bg-gradient-to-br from-slate-900 to-slate-950 text-cyan-300"
            }`}
          >
            {/* Window title bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-1">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-[8px] text-white/50 tracking-wider font-sans uppercase">
                {laptop.brand}
              </span>
            </div>

            {/* Screen Graphics */}
            <div className="flex flex-col gap-0.5 opacity-90 my-auto">
              <div className="flex items-center gap-1">
                <span className="text-white/40">&gt;</span>
                <span className="text-white/90 font-sans font-bold text-[10px] truncate">
                  {laptop.model.split(" ")[0]} {laptop.model.split(" ")[1] || ""}
                </span>
              </div>
              <div className="text-[8px] text-white/60 truncate">
                {laptop.cpu.name.split(" ")[0]} {laptop.cpu.name.split(" ")[1] || ""} · {laptop.ramGb}GB RAM
              </div>
              {isDedicatedGpu && (
                <div className="text-[7.5px] text-emerald-400 font-sans font-medium flex items-center gap-1">
                  <span>⚡ {laptop.gpu.name} ({laptop.gpu.vramGb}GB)</span>
                </div>
              )}
            </div>

            {/* Screen Bottom Status */}
            <div className="flex items-center justify-between text-[7.5px] text-white/40 pt-1 border-t border-white/10 font-sans">
              <span>{laptop.display.panel} {laptop.display.refreshHz}Hz</span>
              <span>{laptop.batteryWh}Wh</span>
            </div>
          </div>
        </div>

        {/* Laptop Hinge & Keyboard Base */}
        <div className="w-[98%] h-3 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-md border-t border-slate-600 shadow-md flex items-center justify-center relative">
          {/* Trackpad notch */}
          <div className="w-8 h-1 bg-slate-900 rounded-sm opacity-60" />
        </div>
      </div>

      {/* Floating Category Tag */}
      <div className="absolute bottom-2 left-2 flex items-center gap-1.5 z-10">
        <span className="rounded-full bg-black/60 backdrop-blur px-2 py-0.5 text-[10px] font-medium text-white/90 border border-white/10">
          {laptop.display.sizeIn}&quot; · {laptop.weightKg} kg
        </span>
        {isDedicatedGpu && (
          <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-semibold">
            {laptop.gpu.vramGb}GB dGPU
          </span>
        )}
      </div>

      {/* Verified Stamp */}
      {laptop.isVerified && (
        <div className="absolute top-2 right-2 rounded-full bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 text-[9px] font-semibold text-emerald-300 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Verified Specs</span>
        </div>
      )}
    </div>
  );
}

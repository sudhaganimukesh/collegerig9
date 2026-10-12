"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Laptop,
  GraduationCap,
  Scale,
  Compass,
  Sliders,
  Percent,
  BookOpen,
  ArrowRight,
  X,
  Terminal,
  Cpu,
} from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Branches" | "Budget" | "Featured Rigs" | "Campus & Tools";
  href: string;
  badge?: string;
}

const COMMAND_ITEMS: CommandItem[] = [
  // Branches
  {
    id: "branch-cse",
    title: "Computer Science & AI / ML",
    subtitle: "Docker, PyTorch, VS Code, Fullstack development",
    category: "Branches",
    href: "/results?branch=cse-aiml",
    badge: "Branch",
  },
  {
    id: "branch-ece",
    title: "Electronics & Communication (ECE)",
    subtitle: "MATLAB, Simulink, Vivado, LTspice, Microcontrollers",
    category: "Branches",
    href: "/results?branch=ece",
    badge: "Branch",
  },
  {
    id: "branch-mech",
    title: "Mechanical Engineering",
    subtitle: "SolidWorks, ANSYS, AutoCAD, 3D Finite Element Analysis",
    category: "Branches",
    href: "/results?branch=mech",
    badge: "Branch",
  },
  {
    id: "branch-civil",
    title: "Civil Engineering",
    subtitle: "AutoCAD, Revit, STAAD.Pro, Structural Modeling",
    category: "Branches",
    href: "/results?branch=civil",
    badge: "Branch",
  },
  {
    id: "branch-design",
    title: "Design & Multimedia",
    subtitle: "Figma, Blender 3D, After Effects, 100% sRGB color accuracy",
    category: "Branches",
    href: "/results?branch=design",
    badge: "Branch",
  },
  {
    id: "branch-commerce",
    title: "Management & Commerce",
    subtitle: "Excel modeling, PowerBI, Python analytics, All-day battery",
    category: "Branches",
    href: "/results?branch=commerce",
    badge: "Branch",
  },

  // Budget
  {
    id: "budget-under50k",
    title: "Under ₹50,000 Rigs",
    subtitle: "Entry-level coding machines with reliable multi-core CPUs",
    category: "Budget",
    href: "/results?budget=50000",
    badge: "Budget",
  },
  {
    id: "budget-under75k",
    title: "₹50,000 – ₹75,000 All-Rounders",
    subtitle: "Sweet spot for engineering undergraduates with upgradable RAM",
    category: "Budget",
    href: "/results?budget=75000",
    badge: "Budget",
  },
  {
    id: "budget-under100k",
    title: "₹75,000 – ₹1,00,000 Heavy Compute",
    subtitle: "Dedicated NVIDIA RTX graphics for CUDA AI & CAD simulations",
    category: "Budget",
    href: "/results?budget=100000",
    badge: "Budget",
  },
  {
    id: "budget-above100k",
    title: "₹1,00,000+ Extreme Workstations",
    subtitle: "MacBook Pro, Legion Pro, & ROG Zephyrus for intensive workloads",
    category: "Budget",
    href: "/results?budget=150000",
    badge: "Budget",
  },

  // Featured Rigs
  {
    id: "laptop-ideapad-5",
    title: "Lenovo IdeaPad Slim 5 (16AHP9)",
    subtitle: "Ryzen 7 8845HS • 16GB LPDDR5x • 100% sRGB • RigScore 8.7",
    category: "Featured Rigs",
    href: "/laptops/lenovo-ideapad-slim-5-16ahp9",
    badge: "₹68,990",
  },
  {
    id: "laptop-tuf-a15",
    title: "ASUS TUF Gaming A15",
    subtitle: "Ryzen 7 7735HS • RTX 4050 140W • 16GB DDR5 (Upgradable) • RigScore 8.5",
    category: "Featured Rigs",
    href: "/laptops/asus-tuf-gaming-a15-fa507nu",
    badge: "₹76,990",
  },
  {
    id: "laptop-loq-15",
    title: "Lenovo LOQ 15 (12450HX)",
    subtitle: "Core i5-12450HX • RTX 4050 95W • Dual M.2 SSD • RigScore 8.3",
    category: "Featured Rigs",
    href: "/laptops/lenovo-loq-15-12450hx-rtx4050",
    badge: "₹67,990",
  },
  {
    id: "laptop-macbook-air-m2",
    title: "Apple MacBook Air 13 M2",
    subtitle: "Apple M2 • 16GB Unified • 18h Real Battery • 1.24 kg • RigScore 8.9",
    category: "Featured Rigs",
    href: "/laptops/apple-macbook-air-13-m2-16gb",
    badge: "₹94,900",
  },

  // Campus & Tools
  {
    id: "tool-finder",
    title: "60-Second Guided Finder Wizard",
    subtitle: "Answer 4 questions to find your mathematically ranked rig",
    category: "Campus & Tools",
    href: "/finder",
    badge: "Tool",
  },
  {
    id: "tool-compare",
    title: "Side-by-Side Spec Comparator",
    subtitle: "Compare up to 4 laptops with benchmark differentials",
    category: "Campus & Tools",
    href: "/compare",
    badge: "Tool",
  },
  {
    id: "campus-kprit",
    title: "KPRIT Hyderabad Pilot Guide",
    subtitle: "RTC 280 bus commute, CSE lab sockets, & local service centers",
    category: "Campus & Tools",
    href: "/campus/kprit",
    badge: "Campus",
  },
  {
    id: "tool-discounts",
    title: "Student Discount Directory",
    subtitle: "UNiDAYS, SheerID, and bank card cashback up to ₹15,000",
    category: "Campus & Tools",
    href: "/discounts",
    badge: "Perks",
  },
  {
    id: "tool-methodology",
    title: "Audited 7-Dimension Methodology",
    subtitle: "Transparent math behind Performance, Battery, & Thermals",
    category: "Campus & Tools",
    href: "/methodology",
    badge: "Audit",
  },
];

export function CommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Global keyboard shortcut: Ctrl+K or Cmd+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Global custom event for opening command palette from anywhere
  React.useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("collegerig-open-command-palette", handleOpen);
    return () => window.removeEventListener("collegerig-open-command-palette", handleOpen);
  }, []);

  // Focus input when opened
  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Filter items
  const filteredItems = React.useMemo(() => {
    if (!query.trim()) return COMMAND_ITEMS;
    const q = query.toLowerCase().trim();
    return COMMAND_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q))
    );
  }, [query]);

  // Handle arrow keys and Enter
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? Math.max(0, filteredItems.length - 1) : prev - 1
      );
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex]);
    }
  };

  const handleSelect = (item: CommandItem) => {
    setIsOpen(false);
    router.push(item.href);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="CollegeRig Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-teal-950/40 ring-1 ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Command Search Header */}
        <div className="relative flex items-center border-b border-slate-800 px-4 py-3">
          <Terminal className="h-5 w-5 text-teal-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Type a branch (CSE, ECE), budget (<50k), or laptop model..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-slate-500 hover:text-slate-300 p-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex ml-2 rounded border border-slate-800 bg-slate-950 px-2 py-0.5 text-[10px] font-mono text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-800/40">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500 space-y-1">
              <p className="font-semibold text-slate-400">No matching specs or branches found</p>
              <p className="text-xs">Try searching &quot;CSE&quot;, &quot;RTX&quot;, &quot;50000&quot;, or &quot;KPRIT&quot;</p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left transition-colors ${
                    isSelected
                      ? "bg-slate-800/90 text-slate-100 ring-1 ring-teal-500/30"
                      : "text-slate-300 hover:bg-slate-800/50"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        isSelected
                          ? "bg-teal-500/20 text-teal-300"
                          : "bg-slate-950 text-slate-400 border border-slate-800"
                      }`}
                    >
                      {item.category === "Branches" && <Cpu className="h-4 w-4" />}
                      {item.category === "Budget" && <Sliders className="h-4 w-4" />}
                      {item.category === "Featured Rigs" && <Laptop className="h-4 w-4" />}
                      {item.category === "Campus & Tools" && <Compass className="h-4 w-4" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs sm:text-sm text-slate-100 truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="rounded-md border border-slate-700 bg-slate-950/80 px-1.5 py-0.5 text-[10px] font-mono font-medium text-teal-400 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      isSelected ? "text-teal-400 translate-x-0.5" : "text-slate-600"
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950/60 px-4 py-2.5 text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span className="text-teal-400">21st.dev Utilitarian Command Bar</span>
        </div>
      </div>
    </div>
  );
}

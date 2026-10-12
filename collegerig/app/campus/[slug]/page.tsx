import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCampus, getLaptopBySlug, getBranches } from "@/lib/data";
import { LaptopCard } from "@/components/laptop-card";
import {
  GraduationCap,
  MapPin,
  Bus,
  Zap,
  Wrench,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Compass,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [{ slug: "kprit" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const campus = await getCampus(slug);
  if (!campus) return { title: "Campus Not Found | CollegeRig" };

  return {
    title: `${campus.shortName} Laptop Recommendations & Guide | CollegeRig`,
    description: `Pilot campus laptop guide for ${campus.name}, Ghatkesar, Hyderabad. Curated picks for CSE, AI-ML, ECE, Mech labs, and authorized service centers nearby.`,
  };
}

export default async function CampusPage({ params }: PageProps) {
  const { slug } = await params;
  const campus = await getCampus(slug);

  if (!campus) {
    notFound();
  }

  const branches = await getBranches();

  // Resolve picked laptops
  const pickPromises = campus.picks.map(async (pick) => {
    const laptop = await getLaptopBySlug(pick.laptopSlug);
    const branch = branches.find((b) => b.slug === pick.branchSlug);
    return {
      pick,
      laptop,
      branch,
    };
  });

  const resolvedPicks = (await Promise.all(pickPromises)).filter(
    (p): p is { pick: any; laptop: any; branch: any } => p.laptop !== null
  );

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-10">
      {/* Hero Banner */}
      <section className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background p-6 sm:p-10 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 text-primary border border-primary/30 px-3 py-1 text-xs font-bold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Pilot Campus Program</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary border border-border px-3 py-1 text-xs font-semibold text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span>Ghatkesar, Hyderabad</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          {campus.name}
        </h1>
        <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {campus.description}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/finder"
            className="tap-target inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-bold text-primary-foreground shadow-md hover:bg-primary/90"
          >
            <Compass className="h-4 w-4" />
            <span>Launch KPRIT 60-Sec Laptop Quiz</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/laptops"
            className="tap-target inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-xs font-semibold text-foreground hover:bg-muted"
          >
            <span>Browse All Verified Models</span>
          </Link>
        </div>
      </section>

      {/* Campus Context & Hostel Reality Cards */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Bus className="h-5 w-5" />
          </div>
          <h2 className="text-sm font-bold text-foreground">The Daily Ghatkesar Commute</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Most day-scholars travel 45–75 mins on college buses from Uppal, Secunderabad, and Dilsukhnagar. Laptops over 2.0kg cause shoulder fatigue; we heavily weight sub-1.6kg machines.
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Zap className="h-5 w-5" />
          </div>
          <h2 className="text-sm font-bold text-foreground">Classroom Socket Access</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            First-year lecture halls have power sockets situated along rear walls only. A laptop with at least 6–8 hours of genuine battery runtime prevents scramble for seats near plugs.
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Wrench className="h-5 w-5" />
          </div>
          <h2 className="text-sm font-bold text-foreground">CAD & AI Lab Workstations</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Department computer labs have stable power strips for heavy simulation software (SolidWorks, ANSYS, PyTorch) during lab periods where dedicated GPU gaming rigs can be plugged in.
          </p>
        </div>
      </section>

      {/* Curated KPRIT Picks Grid */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-foreground">
            Curated Department Recommendations for KPRIT
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Hand-selected configurations tailored for specific semester lab software at KPRIT.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resolvedPicks.map(({ pick, laptop, branch }) => (
            <div key={laptop.id} className="flex flex-col space-y-2">
              <div className="rounded-xl border border-primary/25 bg-primary/5 p-3 text-xs">
                <span className="font-bold text-primary block text-[11px] uppercase tracking-wide">
                  {branch ? branch.shortName : "General Pick"} · {pick.hostelFriendly ? "Bus & Hostel Friendly" : "Lab Powerhouse"}
                </span>
                <p className="text-muted-foreground text-[11px] mt-0.5 leading-snug">
                  {pick.reason}
                </p>
              </div>
              <LaptopCard laptop={laptop} />
            </div>
          ))}
        </div>
      </section>

      {/* Nearby Authorized Service Centers (Hyderabad) */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Authorized Service Centers Nearest to KPRIT (Hyderabad)
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Never risk unauthorized local repairs. When buying your college rig, choose brands that have official repair hubs along your commuting route:
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campus.nearbyServiceHubs.map((hub, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/70 bg-background/60 p-4 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground text-sm">{hub.brand}</span>
                <span className="rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary">
                  {hub.distanceKm} km
                </span>
              </div>
              <p className="font-semibold text-primary text-[11px]">{hub.area}</p>
              <p className="text-muted-foreground leading-relaxed">{hub.address}</p>
              {hub.contactPhone && (
                <div className="pt-2 border-t border-border/60 flex items-center gap-1.5 text-muted-foreground">
                  <Phone className="h-3 w-3 text-primary" />
                  <span>{hub.contactPhone}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

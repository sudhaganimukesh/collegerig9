import type { Metadata } from "next";
import Link from "next/link";
import { getDiscounts } from "@/lib/data";
import {
  Percent,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  HelpCircle,
  FileText,
  CreditCard,
  GraduationCap,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Indian Student Laptop Discounts Directory (2026) | CollegeRig",
  description:
    "Complete directory of verified student laptop discounts in India. Step-by-step verification guides for Apple UNiDAYS, Lenovo SheerID, Samsung Advantage, Dell & HP.",
};

export default async function DiscountsPage() {
  const discounts = await getDiscounts();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-10">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1 text-xs font-semibold text-primary">
          <Percent className="h-3.5 w-3.5" />
          <span>Save up to ₹15,000 as a Student</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
          Indian College Student Laptop Discounts
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Never pay full retail price. Most major laptop OEMs in India offer exclusive student pricing, 3-year warranty extensions for ₹999, and free accessories. Verified against official brand programs.
        </p>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {discounts.map((item) => (
          <div
            key={item.slug}
            className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-sm hover:border-primary/50 transition-all space-y-5"
          >
            <div className="space-y-3">
              {/* Badge & Brand */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {item.brand}
                </span>
                <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  {item.badgeText}
                </span>
              </div>

              {/* Title & Summary */}
              <div>
                <h2 className="text-base font-bold text-foreground">
                  {item.program}
                </h2>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {item.discountSummary}
                </p>
              </div>

              {/* Verification & Eligibility */}
              <div className="space-y-1.5 rounded-xl border border-border/70 bg-background/60 p-3 text-xs">
                <div className="flex items-start gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">Verification: </span>
                    <span className="text-muted-foreground">{item.verificationMethod}</span>
                  </div>
                </div>

                <div className="flex items-start gap-1.5 pt-1 border-t border-border/60">
                  <GraduationCap className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">Eligibility: </span>
                    <span className="text-muted-foreground">{item.eligibility}</span>
                  </div>
                </div>
              </div>

              {/* Step by Step list */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-foreground uppercase tracking-wide">
                  How to Claim:
                </span>
                <ol className="space-y-1 text-[11px] text-muted-foreground list-decimal list-inside">
                  {item.steps.map((step, idx) => (
                    <li key={idx} className="leading-snug">
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Direct Verification CTA Link */}
            <div className="pt-3 border-t border-border/80 flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Calendar className="h-2.5 w-2.5" />
                <span>Verified: {item.verifiedOn}</span>
              </span>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90"
              >
                <span>Go to Store Portal</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Indian Student FAQ Section */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Frequently Asked Questions by Indian College Students
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 text-xs">
          <div className="rounded-2xl border border-border/70 bg-background/50 p-4 space-y-1.5">
            <h3 className="font-bold text-foreground text-sm">
              I am a 1st year student and don&apos;t have my physical college ID card yet. Can I still claim discounts?
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Yes!</strong> All major programs (UNiDAYS, SheerID, Lenovo, Dell, Samsung) accept your provisional college allotment letter, paid admission fee receipt, or semester fee challan showing your name and college name.
            </p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/50 p-4 space-y-1.5">
            <h3 className="font-bold text-foreground text-sm">
              Do I need a university email address (.ac.in or .edu)?
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              No. While institutional emails grant instant automated approval, every brand portal allows document review where you can simply upload a photo or PDF of your college ID card. Approval typically takes 15 minutes to 24 hours.
            </p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/50 p-4 space-y-1.5">
            <h3 className="font-bold text-foreground text-sm">
              Can student discounts be stacked with bank card offers?
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Yes! For example, on Lenovo and Apple stores, educational pricing is treated as a base discount. You can still apply bank instant cashback (HDFC, ICICI, SBI) and No-Cost EMI during checkout.
            </p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/50 p-4 space-y-1.5">
            <h3 className="font-bold text-foreground text-sm">
              Why is the ₹999 3-year warranty bundle so important?
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Hostel environments and daily bus commutes expose laptops to wear and tear. Standard warranties only last 1 year. Lenovo and HP allow students to extend to 3-year Onsite + Accidental Damage Protection for ₹999 instead of ₹5,500+. Always take this bundle!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

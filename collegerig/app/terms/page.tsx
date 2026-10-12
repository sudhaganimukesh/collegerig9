import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ShieldAlert, Scale, CheckCircle2, MapPin, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | CollegeRig",
  description:
    "CollegeRig terms of service: advisory nature of scores, manufacturer pricing disclaimers, affiliate disclosures, and Indian student protections.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
      {/* Header */}
      <div className="space-y-3 border-b border-border pb-6">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary">
          <FileText className="h-3.5 w-3.5" />
          <span>Usage Guidelines & Disclaimers</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Terms of Service
        </h1>
        <p className="text-xs text-muted-foreground">
          Last updated: October 2026 • Governing use of the CollegeRig recommendation platform
        </p>
      </div>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
        {/* Advisory Scope */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">1. Advisory & Educational Nature</h2>
          <p>
            CollegeRig is an independent technical platform designed to guide Indian university students in matching laptop hardware to academic curricula. Our ratings, match percentages, and suitability indexes are calculated deterministically using open formulas, but are provided for <strong>advisory and educational purposes only</strong>.
          </p>
          <p className="text-xs">
            We strongly encourage students to double-check their specific college department notices for any changes in mandatory laboratory tools before finalizing their purchase.
          </p>
        </section>

        {/* Pricing & Stock Disclaimers */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">2. Live Pricing, Stock & SKU Variations</h2>
          <p>
            Laptop pricing in India fluctuates frequently during festive sale events (e.g. Amazon Great Indian Festival, Flipkart Big Billion Days, manufacturer clearance drives). While we verify MRP and typical selling prices regularly:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li>Actual checkout prices on retailer portals may differ due to bank card discounts, exchange bonuses, or dynamic pricing algorithms.</li>
            <li>Retailers sometimes change internal part numbers (SKUs) — always verify with the retailer that the exact model number, CPU generation, and RAM configuration matches our verified spec sheet before paying.</li>
          </ul>
        </section>

        {/* Score Neutrality */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Scale className="h-4 w-4 text-primary" />
            3. Algorithmic Independence & Score Integrity
          </h2>
          <p>
            CollegeRig guarantees that our 0–100 scores and branch qualification passes can <strong>never be purchased, influenced, or inflated</strong> by any brand, manufacturer, or retail partner. Sponsored placements are isolated in designated containers clearly labeled with &quot;Sponsored Partner Slot&quot; and never alter ranking order or algorithm weights.
          </p>
        </section>

        {/* Warranties & Repairs */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">4. Manufacturer Warranties & Repairs</h2>
          <p>
            Warranty support, on-site service calls, and hardware replacements are provided exclusively by the respective manufacturers (Lenovo India, Dell, HP India, ASUS India, Apple, Acer, Samsung). CollegeRig does not sell hardware directly, does not handle returns, and does not provide repairs.
          </p>
        </section>

        {/* Contact & Jurisdiction */}
        <section className="space-y-3 pt-4 border-t border-border">
          <h2 className="text-lg font-bold text-foreground">5. Governing Law & Contact</h2>
          <p className="text-xs">
            These terms are governed by the laws of India, under the jurisdiction of the courts of Hyderabad, Telangana.
          </p>
          <div className="rounded-xl border border-border bg-card p-4 space-y-2 text-xs">
            <div className="flex items-start gap-2 text-foreground">
              <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <strong>CollegeRig Student Initiative:</strong><br />
                Kommuri Pratap Reddy Institute of Technology (KPRIT)<br />
                Near Sy. No. 1140, Edulabad, Ghatkesar Mandal<br />
                Medchal-Malkajgiri District, Hyderabad, Telangana 501301, India
              </div>
            </div>
            <div className="flex items-center gap-2 text-foreground pt-1">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <span>Legal inquiries: <a href="mailto:legal@collegerig.in" className="text-primary underline">legal@collegerig.in</a></span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

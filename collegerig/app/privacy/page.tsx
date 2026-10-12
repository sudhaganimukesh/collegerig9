import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, EyeOff, Server, HardDrive, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | CollegeRig",
  description:
    "CollegeRig student privacy policy: our strict no-tracking pledge, client-side localStorage usage, affiliate disclosures, and zero sale of student information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
      {/* Header */}
      <div className="space-y-3 border-b border-border pb-6">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Student Privacy Guarantee</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="text-xs text-muted-foreground">
          Last updated: October 2026 • Effective for all Indian university students & visitors
        </p>
      </div>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
        {/* Core Pledge */}
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 text-foreground space-y-2">
          <h2 className="text-base font-bold text-primary flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Our Student-First Privacy Pledge
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            CollegeRig was designed for college students, not data brokers. We do not require accounts, we do not require your phone number or student ID to use the Finder, and we never sell student browsing habits to advertisers or third-party marketing firms.
          </p>
        </div>

        {/* 1. What Data We Collect */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">1. Information We Collect</h2>
          <p>
            We adhere to strict data minimization principles under the Indian Digital Personal Data Protection Act (DPDP Act, 2023):
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li>
              <strong>Finder & Search Answers:</strong> When you use the 60-Second Laptop Finder, your chosen branch, budget, and priorities are encoded strictly into the URL query parameters (<code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px] text-foreground">/results?branch=...</code>) so you can bookmark or share results with classmates. This is processed on your device.
            </li>
            <li>
              <strong>Voluntary Feedback & Forms:</strong> If you voluntarily submit our &quot;Request Your College&quot; form or sign up for CollegeRig Pro early alerts, we collect the email address or phone number you provide solely to send requested campus notifications.
            </li>
            <li>
              <strong>Aggregated Analytics:</strong> We collect lightweight, anonymized telemetry (page visits, device viewport width, button clicks) without storing personal IP addresses or fingerprinting your device.
            </li>
          </ul>
        </section>

        {/* 2. Client-Side Storage */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <HardDrive className="h-4 w-4 text-primary" />
            2. LocalStorage & Client Storage
          </h2>
          <p>
            To keep CollegeRig lightning-fast and private, we use browser <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">localStorage</code> rather than intrusive tracking cookies:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li>
              <code className="text-foreground font-mono">collegerig-compare</code>: Saves up to 3 laptops currently added to your side-by-side comparison tray.
            </li>
            <li>
              <code className="text-foreground font-mono">collegerig-saved</code>: Stores your personal list of bookmarked laptops.
            </li>
            <li>
              <code className="text-foreground font-mono">collegerig-theme</code>: Remembers your preferred dark or light mode color scheme.
            </li>
            <li>
              <code className="text-foreground font-mono">collegerig-cookie-consent</code>: Stores your cookie & telemetry preference.
            </li>
          </ul>
          <p className="text-xs">
            This data never leaves your browser and can be completely wiped at any time by clearing your browser cache.
          </p>
        </section>

        {/* 3. Affiliate Links */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">3. Retailer & Affiliate Links</h2>
          <p>
            When you click on an external retailer link (e.g., to Amazon.in, Flipkart, Lenovo India, Dell India, Apple India), you leave CollegeRig. Those external commercial sites govern your transaction and data processing under their respective privacy policies.
          </p>
          <p className="text-xs">
            We use standard referral tags to earn affiliate commissions that keep CollegeRig free. These tags never track your personal identity or student documents.
          </p>
        </section>

        {/* 4. Contact & Campus Address */}
        <section className="space-y-3 pt-4 border-t border-border">
          <h2 className="text-lg font-bold text-foreground">4. Contact & Grievance Redressal</h2>
          <p className="text-xs">
            For privacy inquiries, data deletion requests, or questions regarding CollegeRig:
          </p>
          <div className="rounded-xl border border-border bg-card p-4 space-y-2 text-xs">
            <div className="flex items-start gap-2 text-foreground">
              <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <strong>Pilot Campus Head:</strong> CollegeRig Pilot Initiative<br />
                Kommuri Pratap Reddy Institute of Technology (KPRIT)<br />
                Near Sy. No. 1140, Edulabad, Ghatkesar Mandal<br />
                Medchal-Malkajgiri District, Hyderabad, Telangana 501301, India
              </div>
            </div>
            <div className="flex items-center gap-2 text-foreground pt-1">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <span>Email: <a href="mailto:privacy@collegerig.in" className="text-primary underline">privacy@collegerig.in</a></span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

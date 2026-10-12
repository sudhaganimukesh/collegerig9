import Link from "next/link";
import { Laptop, ShieldCheck, Heart, ExternalLink, GraduationCap, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <Laptop className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">CollegeRig</span>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              Campus-first laptop recommendations for Indian college students. Tailored for your branch, budget, and real hostel & lab life.
            </p>
            <div className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
              <GraduationCap className="h-4 w-4" />
              <span>Pilot Campus: Kommuri Pratap Reddy Institute of Technology (KPRIT), Hyderabad</span>
            </div>
          </div>

          {/* Quick Tools */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Discovery Tools
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/finder" className="text-muted-foreground hover:text-primary transition-colors">
                  60-Sec Laptop Finder
                </Link>
              </li>
              <li>
                <Link href="/laptops" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse All Laptops
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-muted-foreground hover:text-primary transition-colors">
                  Side-by-Side Compare
                </Link>
              </li>
              <li>
                <Link href="/discounts" className="text-muted-foreground hover:text-primary transition-colors">
                  Indian Student Discounts
                </Link>
              </li>
              <li>
                <Link href="/campus/kprit" className="text-muted-foreground hover:text-primary transition-colors">
                  KPRIT Campus Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              By Engineering Branch
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/results?branch=cse-aiml" className="text-muted-foreground hover:text-primary transition-colors">
                  CSE & AI / ML
                </Link>
              </li>
              <li>
                <Link href="/results?branch=ece" className="text-muted-foreground hover:text-primary transition-colors">
                  ECE & Embedded
                </Link>
              </li>
              <li>
                <Link href="/results?branch=mech" className="text-muted-foreground hover:text-primary transition-colors">
                  Mechanical (CAD/CAE)
                </Link>
              </li>
              <li>
                <Link href="/results?branch=civil" className="text-muted-foreground hover:text-primary transition-colors">
                  Civil Engineering
                </Link>
              </li>
              <li>
                <Link href="/results?branch=design" className="text-muted-foreground hover:text-primary transition-colors">
                  UI/UX & 3D Design
                </Link>
              </li>
              <li>
                <Link href="/results?branch=commerce" className="text-muted-foreground hover:text-primary transition-colors">
                  Commerce & Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Transparency */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Transparency
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/methodology" className="text-muted-foreground hover:text-primary transition-colors">
                  Scoring Methodology
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About & Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Real Physical Campus Contact Strip */}
        <div className="mt-8 rounded-xl border border-border/80 bg-muted/20 p-4 text-xs text-muted-foreground flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <p className="font-bold text-foreground">Pilot Campus Headquarters:</p>
              <p>
                Kommuri Pratap Reddy Institute of Technology (KPRIT), Near Sy. No. 1140, Edulabad, Ghatkesar, Medchal-Malkajgiri Dist, Hyderabad, Telangana 501301
              </p>
            </div>
          </div>
          <div className="shrink-0 text-xs">
            <a href="mailto:support@collegerig.in" className="font-semibold text-primary underline underline-offset-2">
              support@collegerig.in
            </a>
          </div>
        </div>

        {/* Affiliate Disclosure Strip */}
        <div className="mt-4 rounded-xl border border-border/80 bg-muted/40 p-4 text-xs text-muted-foreground leading-relaxed">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p>
              <strong className="text-foreground">Affiliate Disclosure:</strong> CollegeRig is an independent student guidance initiative. When you purchase through certain buy links on our site, we may earn an affiliate commission at zero additional cost to you. <strong>Commercial partnerships and affiliate ties NEVER influence our 0-100 scoring formulas, branch minimum-spec disqualifications, or recommendation rankings.</strong>
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} CollegeRig. Designed for Indian students.</p>
          <div className="flex items-center gap-4">
            <Link href="/methodology" className="hover:text-foreground">
              Methodology
            </Link>
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <span className="flex items-center gap-1 text-muted-foreground">
              Made with <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> for KPRIT
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

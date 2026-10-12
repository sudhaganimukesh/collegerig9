import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { StickyMobileCTA } from "@/components/sticky-mobile-cta";
import { AnalyticsProvider } from "@/components/analytics-provider";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://collegerig.vercel.app"),
  title: {
    default: "CollegeRig | Campus-Ready Laptop Recommendations for Indian Students",
    template: "%s | CollegeRig",
  },
  description:
    "Transparent, branch-specific laptop recommendations for Indian college students. Tested for CSE, ECE, Mech, Civil, Design & Commerce. Pilot campus: KPRIT, Hyderabad.",
  keywords: [
    "student laptops india",
    "engineering laptop recommendations",
    "KPRIT laptop guide",
    "best laptop for cse student",
    "best laptop for mechanical engineering",
    "student laptop discounts india",
    "budget laptops hyderabad",
    "UNiDAYS india laptop discounts",
  ],
  authors: [{ name: "CollegeRig Team" }],
  creator: "CollegeRig",
  openGraph: {
    title: "CollegeRig — Find Your Campus-Ready Laptop in 60 Seconds",
    description:
      "Deep verified specs, transparent 0-100 scoring, Indian student discounts, and branch-specific recommendations.",
    type: "website",
    locale: "en_IN",
    siteName: "CollegeRig",
  },
  twitter: {
    card: "summary_large_image",
    title: "CollegeRig — Campus-Ready Laptop Recommendations",
    description:
      "Find your campus-ready laptop in 60 seconds. Sourced specs, transparent math, and student discounts for Indian students.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background font-sans text-foreground antialiased selection:bg-primary/20 selection:text-primary">
        <ThemeProvider defaultTheme="system" storageKey="collegerig-theme">
          <Suspense fallback={null}>
            <AnalyticsProvider>
              <Navbar />
              <main className="flex-1 pb-16 sm:pb-0">{children}</main>
              <Footer />
              <StickyMobileCTA />
              <CookieBanner />
            </AnalyticsProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}

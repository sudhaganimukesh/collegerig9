import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse All Verified Laptops | CollegeRig",
  description:
    "Explore 20+ verified laptops in India (₹30k to ₹1.5L) with transparent 7-dimension scores, battery runtimes, and official manufacturer spec sources.",
};

export default function LaptopsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

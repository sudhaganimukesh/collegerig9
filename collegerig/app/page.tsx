import { getLaptops, getBranches } from "@/lib/data";
import { LandingView } from "@/components/landing-view";

export const metadata = {
  title: "CollegeRig | Campus-First Laptop Recommender for Indian Students",
  description:
    "Find your campus-ready laptop in 60 seconds. Scored for your engineering branch, budget (₹30k–₹1.5L), battery life, and student discounts. Pilot campus: KPRIT Hyderabad.",
};

export default async function HomePage() {
  const [laptops, branches] = await Promise.all([getLaptops(), getBranches()]);

  return <LandingView laptops={laptops} branches={branches} />;
}

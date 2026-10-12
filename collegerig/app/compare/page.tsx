import type { Metadata } from "next";
import { getLaptops } from "@/lib/data";
import { CompareView } from "@/components/compare-view";

export const metadata: Metadata = {
  title: "Side-by-Side Laptop Comparison | CollegeRig",
  description:
    "Compare up to 3 student laptops side by side. Best-in-row badges highlight category leaders for battery, weight, compute, and value in India.",
};

export default async function ComparePage() {
  const allLaptops = await getLaptops();

  return <CompareView allLaptops={allLaptops} />;
}

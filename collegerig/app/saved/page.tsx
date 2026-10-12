import type { Metadata } from "next";
import { getLaptops } from "@/lib/data";
import { SavedView } from "@/components/saved-view";

export const metadata: Metadata = {
  title: "Your Saved Laptops | CollegeRig",
  description: "View your bookmarked laptops and inspect saved specs.",
};

export default async function SavedPage() {
  const allLaptops = await getLaptops();
  return <SavedView allLaptops={allLaptops} />;
}

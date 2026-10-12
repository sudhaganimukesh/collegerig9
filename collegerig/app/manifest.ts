import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CollegeRig — Campus-Ready Laptop Recommender",
    short_name: "CollegeRig",
    description:
      "Find your campus-ready laptop in 60 seconds. Tailored for Indian engineering students, branches, and budgets.",
    start_url: "/",
    display: "standalone",
    background_color: "#090d16",
    theme_color: "#0d9488",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}

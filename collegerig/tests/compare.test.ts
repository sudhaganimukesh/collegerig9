import { describe, it, expect } from "vitest";
import { Laptop } from "@/lib/types";
import laptopsData from "@/data/laptops.json";

const laptops = laptopsData as Laptop[];

describe("Comparison Engine Unit Tests", () => {
  it("correctly identifies best-in-row values for a set of compared laptops", () => {
    // Pick 3 diverse laptops
    const lap1 = laptops.find((l) => l.slug === "lenovo-ideapad-slim-1-15amn7")!; // ₹32,990
    const lap2 = laptops.find((l) => l.slug === "acer-swift-go-14-oled")!; // ₹59,990, 1.25kg
    const lap3 = laptops.find((l) => l.slug === "asus-tuf-gaming-a15-90wh")!; // 90Wh battery

    const sample = [lap1, lap2, lap3];

    const minPrice = Math.min(...sample.map((s) => s.priceInr));
    expect(minPrice).toBe(lap1.priceInr);

    const minWeight = Math.min(...sample.map((s) => s.weightKg));
    expect(minWeight).toBe(lap2.weightKg);

    const maxBattery = Math.max(...sample.map((s) => s.batteryWh));
    expect(maxBattery).toBe(lap3.batteryWh);
  });

  it("evaluates difference detector correctly when laptops share identical vs distinct specs", () => {
    const lapA = laptops.find((l) => l.slug === "acer-swift-go-14-oled")!;
    const lapB = laptops.find((l) => l.slug === "asus-zenbook-14-oled-ux3405")!;

    // Both have OLED panels
    expect(lapA.display.panel).toBe(lapB.display.panel);

    // But have different battery capacities
    expect(lapA.batteryWh).not.toBe(lapB.batteryWh);
  });
});

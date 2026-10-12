import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "CollegeRig - Campus-Ready Laptop Recommendations for Indian Students";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#090d16",
          padding: "64px 80px",
          color: "#f8fafc",
          fontFamily: "sans-serif",
          border: "8px solid #0d9488",
        }}
      >
        {/* Header Bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                display: "flex",
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                backgroundColor: "#0d9488",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                color: "#ffffff",
                fontWeight: "bold",
              }}
            >
              CR
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: "36px", fontWeight: "900", letterSpacing: "-1px" }}>
                CollegeRig
              </div>
              <div style={{ display: "flex", fontSize: "16px", color: "#2dd4bf", fontWeight: "600" }}>
                Campus-First Laptop Recommender
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              backgroundColor: "rgba(13, 148, 136, 0.2)",
              border: "2px solid #0d9488",
              borderRadius: "30px",
              padding: "10px 24px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#2dd4bf",
            }}
          >
            Pilot Campus: KPRIT Hyderabad
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
          <div style={{ display: "flex", fontSize: "54px", fontWeight: "900", lineHeight: 1.15, letterSpacing: "-1.5px" }}>
            Find Your Campus-Ready Laptop in 60 Seconds
          </div>
          <div style={{ display: "flex", fontSize: "24px", color: "#94a3b8", maxWidth: "950px", lineHeight: 1.4 }}>
            Transparent 7-dimension scoring for CSE, ECE, Mechanical, Civil & Design.
            100% verified Indian market specs with student discount tracking.
          </div>
        </div>

        {/* Footer Trust Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #1e293b",
            paddingTop: "28px",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", gap: "32px", fontSize: "18px", color: "#cbd5e1" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              100% Sourced Specs
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              Transparent 0-100 Math
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              INR 30k to 1.5L Budgets
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              Zero Sponsor Bias
            </div>
          </div>
          <div style={{ display: "flex", fontSize: "18px", color: "#64748b", fontWeight: "600" }}>
            collegerig.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

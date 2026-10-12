# CollegeRig 🎓💻

> **Campus-first laptop recommender for Indian college students.**  
> *Pilot Campus: Kommuri Pratap Reddy Institute of Technology (KPRIT), Hyderabad.*

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Tests-Vitest%20(30%2F30)-success?style=flat-square&logo=vitest)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-MIT-teal?style=flat-square)](LICENSE)

---

## 🌟 What Makes CollegeRig Different

Most laptop buying guides in India are either translated US reviews, sponsored YouTube tech influencers, or showroom salespeople pushing high-commission models with soldered 8GB RAM and washed-out 220-nit screens.

CollegeRig is built from the ground up for Indian students:
- **Campus-First Recommendations:** Calibrated for your engineering branch (**CSE / AI-ML**, **ECE**, **Mechanical**, **Civil**, **UI/UX Design**, **Commerce**) and actual college living realities (all-day battery for un-powered lecture halls, lightweight builds for crowded Telangana RTC bus commutes, durable hinges).
- **Audited 7-Dimension Scoring Engine:** Every laptop receives deterministic 0–100 sub-scores (**Performance**, **Battery**, **Portability**, **Display**, **Build & Keyboard**, **Value for Money**, **Future-proofing**) computed by pure functions.
- **Minimum-Spec Disqualification:** Laptops that fail hard academic requirements (e.g. 8GB soldered RAM for AI-ML/Docker, or lack of a dedicated GPU for SolidWorks CAD) are filtered out with exact failure reasons highlighted.
- **Deep Verified Specs:** 100% of specs cite official manufacturer technical documentation (Lenovo PSREF, Dell Support, Apple Specs) with explicit verification timestamps. Unverified demo data is visibly badged.
- **Indian Student Perks Directory:** Verified guide to claiming educational discounts via **UNiDAYS**, **SheerID**, and student ID cards across Apple, Lenovo, Samsung, HP, ASUS, and Dell.
- **Ethical & Transparent Monetization:** Clear affiliate buy links, labeled **"Sponsored Partner Slot"** banners with an ironclad score-neutrality guarantee, and a **CollegeRig Pro** early access teaser. Commercial ties **never** alter laptop scores or rankings.

---

## 🏗️ Architecture & Tech Stack

```
collegerig/
├── app/                        # Next.js 15 App Router
│   ├── page.tsx               # Rich Landing Page (Hero, Curated Tabs, Branch Presets)
│   ├── finder/page.tsx        # 4-Step Mobile-First Recommendation Wizard
│   ├── results/page.tsx       # URL-Driven Recommendations & Real-Time Weight Sliders
│   ├── laptops/page.tsx       # Catalog with Search, Multi-Faceted Filters & Compare Bar
│   ├── laptops/[slug]/page.tsx# Grouped Spec Deep-Dive, 7 Sub-Scores, Verified Sources
│   ├── compare/page.tsx       # Up to 3 Laptops Side-by-Side with Best-in-Row Badges
│   ├── saved/page.tsx         # Bookmarked Laptops Client Tray
│   ├── discounts/page.tsx     # Indian Student Discount Programs & Verification Guide
│   ├── campus/[slug]/page.tsx # KPRIT Hyderabad Pilot Guide (Transit & Local Repair Hubs)
│   ├── methodology/page.tsx   # Mathematical Formulas & Sourcing Policies
│   ├── about/page.tsx         # Student Mission & "Request Your College" Form
│   ├── sitemap.ts             # Dynamic XML Sitemap
│   ├── robots.ts              # SEO Crawler Rules
│   ├── error.tsx              # Graceful Client Error Boundary
│   ├── not-found.tsx          # Custom 404 Spec Not Found Screen
│   ├── loading.tsx            # Animated Pulsing Skeleton
│   └── globals.css            # Tailwind, CSS Variables, 360px Base, WCAG Focus Rings
├── components/                 # Accessible UI Component Library
│   ├── finder-wizard.tsx      # Multi-step state machine with branch & budget controls
│   ├── results-view.tsx       # URL param listener, share links, disqualified modal
│   ├── compare-view.tsx       # Sticky comparison table with diff highlight toggle
│   ├── saved-view.tsx         # Saved bookmarks list with direct buy links
│   ├── laptop-card.tsx        # Responsive card with 0-100 score ring and spec pills
│   ├── sponsored-card.tsx     # Labeled sponsored spotlight card with score neutrality
│   ├── score-badge.tsx        # SVG circular progress indicator
│   ├── laptop-image.tsx       # Lightweight SVG device render (no broken hotlinks)
│   ├── affiliate-disclosure-modal.tsx # Ethical transparency modal
│   ├── pro-modal.tsx          # CollegeRig Pro waitlist modal
│   ├── request-college-form.tsx # Student campus expansion form
│   ├── navbar.tsx             # Responsive header with theme toggle & live counters
│   └── footer.tsx             # Comprehensive footer with affiliate statement
├── data/                       # Validated JSON Datasets
│   ├── laptops.json           # 20 verified Indian laptops (₹32k - ₹1.45L)
│   ├── branches.json          # 6 academic engineering branches & syllabus software
│   ├── campus.json            # KPRIT Hyderabad profile & local service network
│   └── discounts.json         # Indian student discount portals & requirements
├── lib/                        # Core Utilities & Business Logic
│   ├── scoring.ts             # 7-dimension scoring formulas & disqualification logic
│   ├── data.ts                # Thin async query layer (future Supabase/Postgres drop-in)
│   ├── schema.ts              # Strict Zod validation schemas
│   ├── types.ts               # TypeScript data models
│   ├── hooks.ts               # useCompareList & useSavedLaptops (localStorage synced)
│   └── utils.ts               # formatInr (₹54,990), Tailwind merge helpers
└── tests/                      # Vitest Test Suites
    ├── scoring.test.ts        # Pure scoring formula unit tests
    ├── schema.test.ts         # Zod dataset schema validation tests
    ├── finder.test.ts         # Wizard query param serialization tests
    ├── compare.test.ts        # Best-in-row comparison algorithm tests
    ├── monetization.test.ts   # Score neutrality & affiliate format tests
    ├── e2e-flow.test.ts       # End-to-end integration flow tests
    └── smoke.test.ts          # Baseline data loader sanity tests
```

---

## 🧮 7-Dimension Scoring System

All scores are calculated deterministically in [`lib/scoring.ts`](lib/scoring.ts) and scaled from **0 to 100**:

$$\text{Overall Score} = \frac{\sum (\text{SubScore}_i \times \text{Weight}_i)}{\sum \text{Weight}_i}$$

| Sub-Score | Weight (CSE) | Core Calculation Factors |
| :--- | :---: | :--- |
| **Performance** | 35% | CPU tier & physical cores (45%), GPU tier & dedicated VRAM (40%), RAM capacity (15%). |
| **Battery Life** | 20% | Battery capacity in Watt-Hours ($Wh$), claimed manufacturer runtime, ARM/Ultra silicon bonus. |
| **Portability** | 10% | Weight scaling ($\le 1.25\text{kg} \rightarrow 100$, $\ge 2.4\text{kg} \rightarrow 40$), compact 14" display footprint bonus. |
| **Display Quality**| 10% | Panel type (OLED/Retina 100, IPS 80, TN 40), brightness ($\ge 400\text{ nits} \rightarrow 100$), sRGB gamut coverage ($\ge 100\% \rightarrow 100$, $45\%\text{ NTSC} \rightarrow 55$). |
| **Build & Keyboard**| 10% | Backlit keyboard for night coding (+15 pts), port diversity (Type-C PD, HDMI, USB-A), chassis rigidity. |
| **Value for Money**| 10% | Composite capability ratio delivered per Indian Rupee relative to median market price. |
| **Future-proofing**| 5% | Upgradable SO-DIMM RAM slots (+30 pts), spare M.2 NVMe slot (+25 pts), Wi-Fi 6E/7, 16GB baseline. |

### Minimum Spec Disqualification Rules
- **CSE / AI-ML:** Requires 16GB RAM (or 8GB with an open upgradable slot). Laptops with soldered 8GB are automatically disqualified.
- **Mechanical & Civil:** Requires a dedicated GPU with $\ge 4\text{GB}$ VRAM for SolidWorks and Revit 3D viewport acceleration.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+ (LTS)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/collegerig.git
cd collegerig

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view CollegeRig in your browser.

---

## 🧪 Testing & Verification

```bash
# Run all Vitest test suites (30 tests)
npm test

# Run TypeScript strict typecheck
npm run typecheck

# Run Next.js linter
npm run lint

# Validate all seed datasets against strict Zod schemas
npm run validate:data

# Compile production Next.js build
npm run build
```

---

## 🚢 Deploying to Vercel (Free Tier)

CollegeRig is architected to run seamlessly on Vercel's free tier with **zero database latency** using Next.js Static Site Generation (SSG).

### Step-by-Step Vercel Deployment:
1. **Push to GitHub / GitLab:**
   ```bash
   git remote add origin https://github.com/your-username/collegerig.git
   git branch -M main
   git push -u origin main
   ```
2. **Import to Vercel:**
   - Log in to [vercel.com](https://vercel.com) and click **"Add New Project"**.
   - Select your `collegerig` repository.
3. **Configure Build Settings:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
4. **Environment Variables (Optional):**
   - `NEXT_PUBLIC_SITE_URL`: `https://collegerig.vercel.app` (used for Open Graph and XML sitemap generation)
   - `NEXT_PUBLIC_ENABLE_PRO`: `true` (enables early access teaser)
5. **Deploy:**
   - Click **Deploy**. Vercel will build and distribute all 33 static routes globally via its high-performance edge network in seconds.

---

## 🛡️ License & Ethics Statement

CollegeRig is open-source under the [MIT License](LICENSE).  
Commercial affiliate links and sponsored placements never alter laptop scores, search rankings, or branch compatibility checks.

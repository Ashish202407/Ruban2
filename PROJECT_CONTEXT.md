# Project Context: Startup Valuation Calculator

## What this is
Founder-facing valuation calculator that gives a fast but credible range using multiple methods, quality signals, and transparent assumptions.

Live app: https://ashish202407.github.io/Ruban2/
Repo: https://github.com/Ashish202407/Ruban2

## Product intent
- Audience: Founders
- Positioning: Decision-support and quick credibility check
- Modes:
  - Quick Check (fewer inputs, faster)
  - Deep Dive (more inputs, tighter rationale — IP, partnerships, team completeness, biz plan quality)

## Geography and sectors (v2)
- Geographies: US, Europe, MENA, India/South Asia, Southeast Asia, LATAM
- Currency symbols: US=$, Europe=€, MENA=$, India/South Asia=₹, Southeast Asia=$, LATAM=$
- Sectors:
  - SaaS
  - AI-native software
  - E-commerce/D2C
  - Marketplace
  - Fintech
  - Healthtech
  - Edtech
  - Biotech/Deeptech
  - Climate/Cleantech
  - Consumer App
- 60 benchmark entries (6 geographies × 10 sectors), each with revenue multiples, EBITDA multiples, and pre-seed baseline

## Valuation model (v2)
Outputs:
- Low / Base / High range (no single final number)
- Method-level breakdown and weights
- Quality signals (Rule of 40, LTV/CAC, AI premium badge)
- Top valuation drivers
- Cap table simulation (post-round ownership breakdown)
- Public company comps (growth-stage only)

Stage-based methods:
- Pre-revenue:
  - Scorecard
  - Berkus
  - Risk Factor
  - Cost-to-Duplicate (when team size & dev months provided)
- Early revenue:
  - Revenue Multiple
  - VC Method
  - DCF-lite
- Growth:
  - Comps Blend
  - DCF
  - VC Method
- All stages (optional):
  - Comparable Transactions (when user provides 1-3 comp deals)

Default weights:
- Pre-revenue: Scorecard 40%, Berkus 35%, Risk Factor 25%
- Pre-revenue (with Cost-to-Duplicate): Scorecard 30%, Berkus 25%, Risk Factor 20%, Cost-to-Duplicate 25%
- Early revenue: Revenue Multiple 45%, VC Method 35%, DCF-lite 20%
- Growth: Comps Blend 45%, DCF 40%, VC Method 15%
- When Comparable Transactions present: 20% weight, existing methods scaled to 80%

Quality signals & multipliers:
- **Rule of 40**: growthRate + grossMargin. Multiplier 0.88x–1.15x on revenue-based methods (revenue-stage only)
- **AI Premium**: 17.5% on revenue multiples, 10% on pre-seed baseline when AI-integrated = Yes
- **Unit Economics**: LTV/CAC ratio grading (Excellent ≥5x, Good ≥3x, Fair ≥2x, Weak <2x). Multiplier 0.88x–1.15x
- **Deep Dive signals**: IP portfolio, strategic partnerships, team completeness, business plan quality — blended into Scorecard (15% weight) and Risk Factor adjustments

## Current UX features
- 5-step wizard: Mode → Profile → Financials → Market & Risk → Fundraise
- Adaptive form behavior:
  - Hides deep-only questions unless Deep Dive is selected
  - Hides revenue fields for pre-revenue stage
  - Shows Cost-to-Duplicate fields only for pre-revenue
- Comparable Transactions: "Add comp" button to input 1-3 recent deals
- Sensitivity sliders: Growth / Multiple / Discount rate shifts
- Quality metrics strip: Rule of 40, LTV/CAC, payback period, AI premium badge
- Cap table simulator: Pre-money/raise sliders, doughnut chart, live ownership breakdown
- Public company comps table: 3-4 comps per sector for growth-stage companies (as of Q1 2026)
- Downloads:
  - PDF report (jsPDF with methodology note, footer, page overflow handling)
  - Excel model (ExcelJS with 5 sheets: Cover, Executive Summary, Inputs, Methods, Scenarios)

## Theme
- Black / grey / white palette across UI, charts, PDF, and Excel
- Fonts: Manrope (body), Sora (headings)

## Data and storage status
- No backend.
- No database writes.
- No localStorage/sessionStorage usage.
- User inputs exist in browser memory only for the current session.
- Report and Excel are generated client-side and downloaded locally.

## Technical structure
- `index.html`: app structure, wizard steps, results sections
- `styles.css`: visual design, responsive styles (breakpoints at 920px, 480px)
- `app.js`: single IIFE (~2334 lines) — constants, state, wizard, validation, valuation engine, rendering, charts, PDF export, Excel export, utilities

## How to run locally
```bash
cd /home/ashish/projects/Ruban2
python3 -m http.server 8000
```
Open `http://127.0.0.1:8000`.

## Known limitations (v2)
- Benchmark data is static in code (`app.js`), not live.
- Public company comps are static snapshots (Q1 2026), not API-driven.
- No user auth, no saved sessions, no admin panel.
- No backend persistence.

## Suggested next upgrades
1. Add backend persistence (submissions/history).
2. Move benchmark assumptions to managed JSON or DB with timestamps.
3. Add live public company comps via financial data API.
4. Add shareable result links and lightweight analytics.
5. Add scenario comparison (save and compare multiple runs).

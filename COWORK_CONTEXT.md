# Founder Valuation Studio -- Context for Claude Cowork

## What is Claude Cowork?

Claude Cowork is a feature in Claude Desktop that turns Claude into an autonomous digital coworker. Instead of responding to prompts one at a time, you point it at a folder, describe what you need, and it executes multi-step tasks on your behalf -- creating files, editing documents, and working through complex workflows.

- Available on Pro, Max, Team, and Enterprise plans
- Works on both macOS and Windows
- Can pair with Chrome extension for browser-based tasks
- Runs code safely in an isolated environment while making real changes to your files

**Get started:** https://support.claude.com/en/articles/13345190-get-started-with-cowork
**Blog post:** https://claude.com/blog/cowork-research-preview

---

## What is This Project?

**Founder Valuation Studio** by The VC Corner -- a single-page web app that helps startup founders estimate their company's valuation using multiple methodologies, benchmarked against real market data.

### Live App

Open `index.html` in a browser (works from file:// or GitHub Pages).

### Tech Stack

- Vanilla HTML/CSS/JS (no frameworks, no build step)
- CDN dependencies: Chart.js 4.4.7, jsPDF 2.5.2, ExcelJS 4.4.0
- Single IIFE in `app.js` (~2428 lines)

### Key Files

| File | Purpose |
|------|---------|
| `index.html` | 5-step wizard UI |
| `styles.css` | Styling (Manrope/Sora fonts, grey palette, responsive) |
| `app.js` | All logic -- constants, engine, rendering, charts, PDF & Excel exports |
| `TheVCcorner_Logo.webp` | Logo for web UI |
| `VC - Logo.jpeg` | Logo for PDF export (base64-encoded in app.js) |

---

## What the Tool Does

### 5-Step Wizard Flow

1. **Mode** -- Quick estimate or Deep Dive
2. **Profile** -- Company name, stage (pre-revenue / early-revenue / growth), sector, geography
3. **Financials** -- Revenue, growth rate, margins, customers, unit economics
4. **Market** -- TAM, competitive positioning, AI integration
5. **Fundraise** -- Raise target, founder/ESOP/existing ownership splits

### Valuation Engine

- **6 geographies**: US, Europe, MENA, India/South Asia, Southeast Asia, LATAM
- **10 sectors**: SaaS, AI-native, E-commerce/D2C, Marketplace, Fintech, Healthtech, Edtech, Biotech/Deeptech, Climate/Cleantech, Consumer App
- **Methods by stage**:
  - Pre-revenue: Scorecard, Berkus, Risk Factor, Cost-to-Duplicate
  - Early-revenue: Revenue Multiple, VC Method, DCF-lite
  - Growth: Comps Blend, DCF, VC Method
  - All stages also get Comparable Transactions (20% weight)
- **Quality signals**: Rule of 40, AI premium (17.5%), LTV/CAC ratio
- **Sensitivity analysis**: Growth, multiple, and discount rate sliders
- **Cap table simulator**: Pre/post-money ownership with doughnut chart

### Exports

**PDF Report** (jsPDF) -- single-page investor-quality layout:
- 3-column header (logo + brand, company name, stage/sector/geo + date)
- Grey valuation band with LOW / BASE / HIGH
- Compact key metrics line
- Auto-generated methodology note
- Method breakdown table (grey header, alternating rows)
- Top valuation drivers
- Public company comps with inline bar charts (growth-stage only)
- Cap table as 4 horizontal boxes
- Branded footer with disclaimer

**Excel Model** (ExcelJS) -- 6 sheets:
- Cover (dark grey header band, valuation range)
- Executive Summary (methods, drivers, chart images)
- Inputs (all model inputs)
- Methods (breakdown with quality signals)
- Scenarios (bear/base/bull, color-coded red/white/green)
- Cap Table (ownership table + doughnut chart image)

---

## How to Demo the Tool (Walkthrough Script)

### Pre-revenue Example
1. Open `index.html` in browser
2. Select **Quick Estimate**
3. Enter: "NovaTech AI", Pre-revenue, AI-native software, US
4. Financials: 0 revenue, 50 customers, 80% gross margin
5. Market: $5B TAM, AI-integrated = Yes
6. Fundraise: $2M raise, 80% founder, 10% ESOP, 10% existing
7. Click Calculate -- see valuation range, charts, cap table
8. Download PDF and Excel

### Growth-stage Example
1. Select **Deep Dive**
2. Enter: "ScaleFlow", Growth, SaaS, Europe
3. Financials: $8M revenue, 45% growth, 72% GM, 500 customers, LTV $50K, CAC $12K
4. Market: $20B TAM, AI-integrated = Yes
5. Deep Dive: IP portfolio = strong, team completeness = high
6. Fundraise: $15M raise, 60% founder, 15% ESOP, 25% existing
7. Click Calculate -- note public company comps section appears
8. Download PDF (single page with bar charts) and Excel (6 sheets)

---

## Repository

GitHub: https://github.com/Ashish202407/Ruban2

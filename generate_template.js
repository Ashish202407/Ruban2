const ExcelJS = require("exceljs");
const path = require("path");

// ── Dummy data ──
const inputs = {
  companyName: "Acme Labs",
  mode: "Deep Dive",
  stage: "Early Revenue",
  sector: "SaaS",
  geography: "US",
  businessModel: "B2B",
  foundingYear: 2022,
  revenueRunRate: 1.2,
  growthRate: 60,
  grossMargin: 72,
  customerCount: 180,
  cac: 2800,
  ltv: 14000,
  churn: 10,
  nrr: 115,
  burnMultiple: 1.6,
  tam: 5000,
  competitionIntensity: 3,
  moatStrength: 4,
  founderExperience: 4,
  concentrationRisk: 2,
  regulatoryRisk: 2,
  raiseTarget: 2.5,
  runwayMonths: 18,
  targetDilution: 18,
  pipelineCoverage: 3.2,
  projectedCagr: 45,
};

const result = {
  range: { low: 6.84, base: 10.22, high: 15.38 },
  methods: [
    { name: "Revenue Multiple", weight: 0.45, low: 5.04, base: 9.36, high: 15.0 },
    { name: "VC Method", weight: 0.35, low: 7.12, base: 11.48, high: 17.63 },
    { name: "DCF-lite", weight: 0.20, low: 4.80, base: 7.25, high: 11.92 },
  ],
  drivers: [
    "Revenue multiple baseline in US SaaS: 7.8x",
    "Growth profile at 60% annualized",
    "Moat vs competition spread: 4 / 3",
    "Runway and raise plan: 18 months, $2.50M raise",
    "Risk posture (concentration 2, regulatory 2)",
  ],
  sensitivity: { growth: 0, multiple: 0, discount: 0 },
  timestamp: new Date().toLocaleString("en-US", {
    year: "numeric", month: "short", day: "2-digit",
    hour: "2-digit", minute: "2-digit",
  }),
  assumptionsDate: "March 2, 2026",
};

// ── Colors ──
const NAVY      = "FF0D1B2A";
const DARK_BG   = "FF1B2838";
const WHITE      = "FFFFFFFF";
const BLUE_FONT  = "FF2155CD";
const BLACK      = "FF111111";
const LIGHT_GREY = "FFF5F5F5";
const SECTION_BG = "FFEDF2F7";
const GREY_TEXT  = "FF777777";

// ── Font helpers ──
function whiteFont(bold, size) {
  return { bold: !!bold, color: { argb: WHITE }, size: size || 11, name: "Calibri" };
}
function blueFont(bold, size) {
  return { bold: !!bold, color: { argb: BLUE_FONT }, size: size || 11, name: "Calibri" };
}
function blackFont(bold, size) {
  return { bold: !!bold, color: { argb: BLACK }, size: size || 11, name: "Calibri" };
}
function greyFont(size) {
  return { bold: false, color: { argb: GREY_TEXT }, size: size || 11, name: "Calibri" };
}
function defaultFont(bold, size) {
  return { bold: !!bold, size: size || 11, name: "Calibri" };
}
function navyFill() {
  return { type: "pattern", pattern: "solid", fgColor: { argb: NAVY } };
}
function darkFill() {
  return { type: "pattern", pattern: "solid", fgColor: { argb: DARK_BG } };
}
function lightFill() {
  return { type: "pattern", pattern: "solid", fgColor: { argb: LIGHT_GREY } };
}
function sectionFill() {
  return { type: "pattern", pattern: "solid", fgColor: { argb: SECTION_BG } };
}

function noGridlines(sheet) {
  sheet.views = [{ showGridLines: false }];
}

function setColWidths(sheet, widths) {
  widths.forEach((w, i) => { sheet.getColumn(i + 1).width = w; });
}

// Applies dark title band to a single row
function titleBand(sheet, row, cols, text, fontSize) {
  for (let c = 1; c <= cols; c++) {
    sheet.getRow(row).getCell(c).fill = navyFill();
  }
  sheet.getRow(row).getCell(2).value = text;
  sheet.getRow(row).getCell(2).font = whiteFont(true, fontSize || 14);
  sheet.getRow(row).height = 28;
}

async function main() {
  const wb = new ExcelJS.Workbook();
  wb.creator = "The VC Corner — Founder Valuation Studio";
  wb.created = new Date();

  // ════════════════════════════════════════════
  // SHEET 1: COVER
  // ════════════════════════════════════════════
  const cover = wb.addWorksheet("Cover", { properties: { tabColor: { argb: NAVY } } });
  noGridlines(cover);
  setColWidths(cover, [4, 50, 30, 4]);

  // Dark band rows 1-2 only
  for (let r = 1; r <= 2; r++) {
    for (let c = 1; c <= 4; c++) {
      cover.getRow(r).getCell(c).fill = navyFill();
    }
  }
  cover.getRow(2).getCell(2).value = "THE VC CORNER";
  cover.getRow(2).getCell(2).font = whiteFont(true, 20);
  cover.getRow(2).height = 32;

  // Subtitle — no bg, default black, sz:13
  cover.getRow(3).getCell(2).value = "Founder Valuation Studio";
  cover.getRow(3).getCell(2).font = defaultFont(false, 13);

  // Row 4 blank

  // Company info — starts at R5
  const infoData = [
    ["Company", inputs.companyName],
    ["Stage", inputs.stage],
    ["Sector", inputs.sector],
    ["Geography", inputs.geography],
    ["Mode", inputs.mode],
  ];
  infoData.forEach((pair, i) => {
    const row = cover.getRow(5 + i);
    row.getCell(2).value = pair[0];
    row.getCell(2).font = greyFont(11);
    row.getCell(3).value = pair[1];
    row.getCell(3).font = blueFont(false, 11);
  });

  // Row 10 blank

  // Valuation Range
  cover.getRow(11).getCell(2).value = "Valuation Range";
  cover.getRow(11).getCell(2).font = blackFont(true, 13);

  const rangeData = [
    ["Low", "$" + result.range.low.toFixed(2) + "M", false],
    ["Base", "$" + result.range.base.toFixed(2) + "M", true],
    ["High", "$" + result.range.high.toFixed(2) + "M", false],
  ];
  rangeData.forEach((r, i) => {
    const row = cover.getRow(12 + i);
    row.getCell(2).value = r[0];
    row.getCell(2).font = greyFont(11);
    row.getCell(3).value = r[1];
    row.getCell(3).font = blackFont(r[2], 12);
  });

  // Row 15 blank

  // Timestamps
  cover.getRow(16).getCell(2).value = "Generated: " + result.timestamp;
  cover.getRow(16).getCell(2).font = greyFont(9);
  cover.getRow(17).getCell(2).value = "Benchmark assumptions last updated: " + result.assumptionsDate;
  cover.getRow(17).getCell(2).font = greyFont(9);

  // Row 18 blank

  // Disclaimer
  cover.getRow(19).getCell(2).value = "For decision-support only. Not investment advice. Benchmarks are static model assumptions.";
  cover.getRow(19).getCell(2).font = greyFont(9);

  // ════════════════════════════════════════════
  // SHEET 2: EXECUTIVE SUMMARY
  // ════════════════════════════════════════════
  const summary = wb.addWorksheet("Executive Summary");
  noGridlines(summary);
  setColWidths(summary, [3, 24, 18, 18, 18, 3]);

  // Dark band row 1-2
  for (let c = 1; c <= 6; c++) {
    summary.getRow(1).getCell(c).fill = navyFill();
    summary.getRow(2).getCell(c).fill = navyFill();
  }
  summary.getRow(2).getCell(2).value = "Executive Summary";
  summary.getRow(2).getCell(2).font = whiteFont(true, 14);
  summary.getRow(2).height = 28;

  // Company name — R3, bold black
  summary.getRow(3).getCell(2).value = inputs.companyName;
  summary.getRow(3).getCell(2).font = defaultFont(true, 11);

  // Valuation Range — R5
  summary.getRow(5).getCell(2).value = "Valuation Range";
  summary.getRow(5).getCell(2).font = blackFont(true, 13);

  // Range header labels — R6
  ["Low", "Base", "High"].forEach((label, i) => {
    summary.getRow(6).getCell(3 + i).value = label;
    summary.getRow(6).getCell(3 + i).font = greyFont(10);
  });

  // Range values — R7
  const r7 = summary.getRow(7);
  r7.getCell(2).value = "Pre-money ($M)";
  r7.getCell(2).font = blackFont(false);
  r7.getCell(3).value = result.range.low;
  r7.getCell(3).font = blackFont(true, 12);
  r7.getCell(3).numFmt = '$#,##0.00"M"';
  r7.getCell(4).value = result.range.base;
  r7.getCell(4).font = blackFont(true, 12);
  r7.getCell(4).numFmt = '$#,##0.00"M"';
  r7.getCell(5).value = result.range.high;
  r7.getCell(5).font = blackFont(true, 12);
  r7.getCell(5).numFmt = '$#,##0.00"M"';
  r7.height = 22;

  // Method Weights — R9
  summary.getRow(9).getCell(2).value = "Method Weights";
  summary.getRow(9).getCell(2).font = blackFont(true, 13);

  // Table header — R10, dark bg, white text
  const mwH = summary.getRow(10);
  ["Method", "Weight", "Base ($M)"].forEach((label, i) => {
    mwH.getCell(i + 2).value = label;
    mwH.getCell(i + 2).font = whiteFont(true);
    mwH.getCell(i + 2).fill = darkFill();
  });
  mwH.height = 20;

  // Method rows — R11+, alternating fills
  let sy = 11;
  result.methods.forEach((m, i) => {
    const row = summary.getRow(sy);
    if (i % 2 === 0) {
      for (let c = 2; c <= 4; c++) row.getCell(c).fill = lightFill();
    }
    row.getCell(2).value = m.name;
    row.getCell(2).font = blackFont(false);
    row.getCell(3).value = m.weight;
    row.getCell(3).font = blackFont(false);
    row.getCell(3).numFmt = "0%";
    row.getCell(4).value = m.base;
    row.getCell(4).font = blackFont(false);
    row.getCell(4).numFmt = '$#,##0.00"M"';
    sy++;
  });

  // Blended total
  const bRow = summary.getRow(sy);
  bRow.getCell(2).value = "Blended";
  bRow.getCell(2).font = blackFont(true);
  bRow.getCell(3).value = 1;
  bRow.getCell(3).font = blackFont(true);
  bRow.getCell(3).numFmt = "0%";
  bRow.getCell(4).value = result.range.base;
  bRow.getCell(4).font = blackFont(true);
  bRow.getCell(4).numFmt = '$#,##0.00"M"';
  for (let c = 2; c <= 4; c++) {
    bRow.getCell(c).border = { top: { style: "medium", color: { argb: BLACK } } };
  }
  sy += 2;

  // Key Drivers
  summary.getRow(sy).getCell(2).value = "Key Drivers";
  summary.getRow(sy).getCell(2).font = blackFont(true, 13);
  sy++;
  result.drivers.forEach((d) => {
    summary.getRow(sy).getCell(2).value = "\u2022  " + d;
    summary.getRow(sy).getCell(2).font = blackFont(false, 10);
    sy++;
  });

  // ════════════════════════════════════════════
  // SHEET 3: INPUTS
  // ════════════════════════════════════════════
  const inp = wb.addWorksheet("Inputs");
  noGridlines(inp);
  setColWidths(inp, [3, 36, 22, 3]);

  // Dark band row 1-2
  for (let c = 1; c <= 4; c++) {
    inp.getRow(1).getCell(c).fill = navyFill();
    inp.getRow(2).getCell(c).fill = navyFill();
  }
  inp.getRow(2).getCell(2).value = "Model Inputs";
  inp.getRow(2).getCell(2).font = whiteFont(true, 14);
  inp.getRow(2).height = 28;

  let iy = 4;

  function addSection(title) {
    inp.getRow(iy).getCell(2).value = title;
    inp.getRow(iy).getCell(2).font = defaultFont(true, 12);
    iy++;
  }

  function addInput(label, value, fmt) {
    const row = inp.getRow(iy);
    row.getCell(2).value = label;
    row.getCell(2).font = greyFont(11);
    row.getCell(3).value = value;
    row.getCell(3).font = blueFont(false, 11);
    if (fmt) row.getCell(3).numFmt = fmt;
    iy++;
  }

  addSection("Company Profile");
  addInput("Company Name", inputs.companyName);
  addInput("Stage", inputs.stage);
  addInput("Sector", inputs.sector);
  addInput("Geography", inputs.geography);
  addInput("Business Model", inputs.businessModel);
  addInput("Founding Year", inputs.foundingYear, "0");
  iy++;

  addSection("Financials & Traction");
  addInput("Revenue Run-rate ($M)", inputs.revenueRunRate, '$#,##0.00"M"');
  addInput("Annual Growth", inputs.growthRate / 100, "0%");
  addInput("Gross Margin", inputs.grossMargin / 100, "0%");
  addInput("Active Customers", inputs.customerCount, "#,##0");
  addInput("CAC", inputs.cac, "$#,##0");
  addInput("LTV", inputs.ltv, "$#,##0");
  addInput("Annual Churn", inputs.churn / 100, "0%");
  addInput("Net Revenue Retention", inputs.nrr / 100, "0%");
  addInput("Burn Multiple", inputs.burnMultiple, "0.0x");
  iy++;

  addSection("Market & Risk");
  addInput("TAM ($M)", inputs.tam, '$#,##0"M"');
  addInput("Competition Intensity (1-5)", inputs.competitionIntensity, "0");
  addInput("Moat Strength (1-5)", inputs.moatStrength, "0");
  addInput("Founder Experience (1-5)", inputs.founderExperience, "0");
  addInput("Concentration Risk (1-5)", inputs.concentrationRisk, "0");
  addInput("Regulatory Risk (1-5)", inputs.regulatoryRisk, "0");
  iy++;

  addSection("Fundraise & Projections");
  addInput("Target Raise ($M)", inputs.raiseTarget, '$#,##0.00"M"');
  addInput("Runway (months)", inputs.runwayMonths, "0");
  addInput("Target Dilution", inputs.targetDilution / 100, "0%");
  addInput("Pipeline Coverage", inputs.pipelineCoverage, "0.0x");
  addInput("Projected 3Y CAGR", inputs.projectedCagr / 100, "0%");

  // ════════════════════════════════════════════
  // SHEET 4: METHODS
  // ════════════════════════════════════════════
  const methods = wb.addWorksheet("Methods");
  noGridlines(methods);
  setColWidths(methods, [3, 24, 14, 18, 18, 18, 3]);

  // Dark band row 1-2
  for (let c = 1; c <= 7; c++) {
    methods.getRow(1).getCell(c).fill = navyFill();
    methods.getRow(2).getCell(c).fill = navyFill();
  }
  methods.getRow(2).getCell(2).value = "Valuation Methods";
  methods.getRow(2).getCell(2).font = whiteFont(true, 14);
  methods.getRow(2).height = 28;

  // Table header — R4, plain bold (no dark bg)
  const mH = methods.getRow(4);
  ["Method", "Weight", "Low ($M)", "Base ($M)", "High ($M)"].forEach((label, i) => {
    mH.getCell(i + 2).value = label;
    mH.getCell(i + 2).font = defaultFont(true, 11);
  });

  // Method rows — no alternating fills
  let my = 5;
  result.methods.forEach((m) => {
    const row = methods.getRow(my);
    row.getCell(2).value = m.name;
    row.getCell(2).font = blackFont(false);
    row.getCell(3).value = m.weight;
    row.getCell(3).font = blackFont(false);
    row.getCell(3).numFmt = "0%";
    row.getCell(4).value = m.low;
    row.getCell(4).font = blackFont(false);
    row.getCell(4).numFmt = '$#,##0.00"M"';
    row.getCell(5).value = m.base;
    row.getCell(5).font = blackFont(false);
    row.getCell(5).numFmt = '$#,##0.00"M"';
    row.getCell(6).value = m.high;
    row.getCell(6).font = blackFont(false);
    row.getCell(6).numFmt = '$#,##0.00"M"';
    row.height = 20;
    my++;
  });

  // Blended row
  const mBlend = methods.getRow(my);
  mBlend.getCell(2).value = "Blended";
  mBlend.getCell(2).font = blackFont(true);
  mBlend.getCell(3).value = 1;
  mBlend.getCell(3).font = blackFont(true);
  mBlend.getCell(3).numFmt = "0%";
  mBlend.getCell(4).value = result.range.low;
  mBlend.getCell(4).font = blackFont(true);
  mBlend.getCell(4).numFmt = '$#,##0.00"M"';
  mBlend.getCell(5).value = result.range.base;
  mBlend.getCell(5).font = blackFont(true);
  mBlend.getCell(5).numFmt = '$#,##0.00"M"';
  mBlend.getCell(6).value = result.range.high;
  mBlend.getCell(6).font = blackFont(true);
  mBlend.getCell(6).numFmt = '$#,##0.00"M"';
  for (let c = 2; c <= 6; c++) {
    mBlend.getCell(c).border = { top: { style: "medium", color: { argb: BLACK } } };
  }
  mBlend.height = 22;

  // ════════════════════════════════════════════
  // SHEET 5: SCENARIOS
  // ════════════════════════════════════════════
  const scenarios = wb.addWorksheet("Scenarios");
  noGridlines(scenarios);
  setColWidths(scenarios, [3, 32, 18, 18, 18, 3]);

  // Dark band row 1-2
  for (let c = 1; c <= 6; c++) {
    scenarios.getRow(1).getCell(c).fill = navyFill();
    scenarios.getRow(2).getCell(c).fill = navyFill();
  }
  scenarios.getRow(2).getCell(2).value = "Scenario Analysis";
  scenarios.getRow(2).getCell(2).font = whiteFont(true, 14);
  scenarios.getRow(2).height = 28;

  // Sensitivity section — R4
  scenarios.getRow(4).getCell(2).value = "Sensitivity Adjustments";
  scenarios.getRow(4).getCell(2).font = defaultFont(true, 12);

  // Sensitivity inputs — blue font, no fills
  [
    ["Growth Shift", result.sensitivity.growth / 100],
    ["Multiple Shift", result.sensitivity.multiple / 100],
    ["Discount Rate Shift", result.sensitivity.discount / 100],
  ].forEach((pair, i) => {
    const row = scenarios.getRow(5 + i);
    row.getCell(2).value = pair[0];
    row.getCell(2).font = greyFont(11);
    row.getCell(3).value = pair[1];
    row.getCell(3).font = blueFont(false, 11);
    row.getCell(3).numFmt = "0%";
  });

  // Resulting Valuation — R9, with section fill
  const rvRow = scenarios.getRow(9);
  rvRow.getCell(2).value = "Resulting Valuation";
  rvRow.getCell(2).font = blackFont(true, 12);
  rvRow.getCell(2).fill = sectionFill();

  // Table header — R10, plain bold (no dark bg)
  const scH = scenarios.getRow(10);
  ["Scenario", "Low ($M)", "Base ($M)", "High ($M)"].forEach((label, i) => {
    scH.getCell(i + 2).value = label;
    scH.getCell(i + 2).font = defaultFont(true, 11);
  });

  // Scenario rows — no alternating fills
  [
    ["Bear Case", result.range.low * 0.85, result.range.base * 0.85, result.range.high * 0.85, false],
    ["Base Case", result.range.low, result.range.base, result.range.high, true],
    ["Bull Case", result.range.low * 1.18, result.range.base * 1.18, result.range.high * 1.18, false],
  ].forEach((sc, i) => {
    const row = scenarios.getRow(11 + i);
    const bold = sc[4];
    row.getCell(2).value = sc[0];
    row.getCell(2).font = blackFont(bold);
    row.getCell(3).value = sc[1];
    row.getCell(3).font = blackFont(bold);
    row.getCell(3).numFmt = '$#,##0.00"M"';
    row.getCell(4).value = sc[2];
    row.getCell(4).font = blackFont(bold);
    row.getCell(4).numFmt = '$#,##0.00"M"';
    row.getCell(5).value = sc[3];
    row.getCell(5).font = blackFont(bold);
    row.getCell(5).numFmt = '$#,##0.00"M"';
  });

  // ── Save ──
  const outPath = path.join(__dirname, "Valuation_Template.xlsx");
  await wb.xlsx.writeFile(outPath);
  console.log("Saved to:", outPath);
}

main().catch(console.error);

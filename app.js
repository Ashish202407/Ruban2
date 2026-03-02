(function () {
  const BENCHMARKS = {
    US: {
      "SaaS": { rev: [4.2, 7.8, 12.5], ebitda: [12, 18, 24], preseed: 6.0 },
      "AI-native software": { rev: [6.2, 10.8, 16.0], ebitda: [14, 21, 28], preseed: 7.0 },
      "E-commerce/D2C": { rev: [1.3, 2.3, 3.6], ebitda: [7, 10, 14], preseed: 4.0 },
      Marketplace: { rev: [2.8, 4.6, 7.3], ebitda: [10, 15, 21], preseed: 5.0 },
      Fintech: { rev: [3.6, 6.3, 9.8], ebitda: [11, 17, 24], preseed: 5.5 },
      Healthtech: { rev: [3.0, 5.3, 8.0], ebitda: [9, 14, 20], preseed: 4.8 },
    },
    Europe: {
      "SaaS": { rev: [3.2, 6.1, 9.6], ebitda: [10, 15, 21], preseed: 4.8 },
      "AI-native software": { rev: [5.0, 8.5, 12.8], ebitda: [11, 18, 24], preseed: 5.8 },
      "E-commerce/D2C": { rev: [1.0, 1.8, 2.9], ebitda: [6, 9, 12], preseed: 3.2 },
      Marketplace: { rev: [2.2, 3.8, 5.8], ebitda: [8, 13, 18], preseed: 4.1 },
      Fintech: { rev: [2.9, 5.2, 7.9], ebitda: [9, 14, 20], preseed: 4.5 },
      Healthtech: { rev: [2.4, 4.2, 6.7], ebitda: [8, 12, 17], preseed: 4.0 },
    },
  };

  const METHOD_WEIGHTS = {
    "pre-revenue": { Scorecard: 0.4, Berkus: 0.35, "Risk Factor": 0.25 },
    "early-revenue": { "Revenue Multiple": 0.45, "VC Method": 0.35, "DCF-lite": 0.2 },
    growth: { "Comps Blend": 0.45, DCF: 0.4, "VC Method": 0.15 },
  };

  const EXPOSURES = {
    Berkus: { growth: 0.15, multiple: 0.2, discount: 0.1 },
    Scorecard: { growth: 0.22, multiple: 0.28, discount: 0.08 },
    "Risk Factor": { growth: 0.08, multiple: 0.12, discount: 0.08 },
    "Revenue Multiple": { growth: 0.35, multiple: 0.5, discount: 0.15 },
    "VC Method": { growth: 0.45, multiple: 0.35, discount: 0.4 },
    "DCF-lite": { growth: 0.35, multiple: 0.1, discount: 0.5 },
    "Comps Blend": { growth: 0.25, multiple: 0.55, discount: 0.2 },
    DCF: { growth: 0.32, multiple: 0.1, discount: 0.55 },
  };

  const state = {
    mode: "quick",
    inputs: null,
    rawResult: null,
    sensitivity: { growth: 0, multiple: 0, discount: 0 },
  };

  const form = document.getElementById("valuation-form");
  const stageEl = document.getElementById("stage");
  const warningEl = document.getElementById("form-warning");
  const modeButtons = document.querySelectorAll(".mode-btn");
  const resultsEl = document.getElementById("results");

  const outputEls = {
    company: document.getElementById("result-company"),
    meta: document.getElementById("result-meta"),
    low: document.getElementById("range-low"),
    base: document.getElementById("range-base"),
    high: document.getElementById("range-high"),
    confidenceScore: document.getElementById("confidence-score"),
    confidenceLabel: document.getElementById("confidence-label"),
    methodTable: document.getElementById("method-table"),
    methodBars: document.getElementById("method-bars"),
    drivers: document.getElementById("driver-list"),
    timestamp: document.getElementById("timestamp"),
  };

  const sensitivityEls = {
    growth: document.getElementById("sensitivity-growth"),
    multiple: document.getElementById("sensitivity-multiple"),
    discount: document.getElementById("sensitivity-discount"),
    growthVal: document.getElementById("sensitivity-growth-value"),
    multipleVal: document.getElementById("sensitivity-multiple-value"),
    discountVal: document.getElementById("sensitivity-discount-value"),
  };

  const downloadReportBtn = document.getElementById("download-report");
  const downloadModelBtn = document.getElementById("download-model");

  init();

  function init() {
    modeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        state.mode = btn.dataset.mode || "quick";
        modeButtons.forEach((item) => item.classList.toggle("active", item === btn));
        applyVisibility();
      });
    });

    stageEl.addEventListener("change", applyVisibility);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      warningEl.textContent = "";

      const inputs = collectInputs();
      const errors = validateInputs(inputs);
      if (errors.length) {
        warningEl.textContent = errors[0];
        return;
      }

      state.inputs = inputs;
      resetSensitivity();
      state.rawResult = runValuation(inputs, state.sensitivity);
      renderResults(state.rawResult);
      resultsEl.classList.remove("hidden");
      resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    [sensitivityEls.growth, sensitivityEls.multiple, sensitivityEls.discount].forEach((slider) => {
      slider.addEventListener("input", () => {
        sensitivityEls.growthVal.textContent = `${sensitivityEls.growth.value}%`;
        sensitivityEls.multipleVal.textContent = `${sensitivityEls.multiple.value}%`;
        sensitivityEls.discountVal.textContent = `${sensitivityEls.discount.value}%`;
        if (!state.inputs) {
          return;
        }
        state.sensitivity = {
          growth: toNumber(sensitivityEls.growth.value, 0),
          multiple: toNumber(sensitivityEls.multiple.value, 0),
          discount: toNumber(sensitivityEls.discount.value, 0),
        };
        state.rawResult = runValuation(state.inputs, state.sensitivity);
        renderResults(state.rawResult);
      });
    });

    downloadReportBtn.addEventListener("click", () => {
      if (!state.rawResult || !state.inputs) {
        return;
      }
      downloadReport(state.inputs, state.rawResult);
    });

    downloadModelBtn.addEventListener("click", () => {
      if (!state.rawResult || !state.inputs) {
        return;
      }
      downloadSpreadsheetModel(state.inputs, state.rawResult);
    });

    applyVisibility();
  }

  function applyVisibility() {
    const stage = stageEl.value;
    const isDeep = state.mode === "deep";
    document.querySelectorAll(".deep-field").forEach((el) => {
      el.classList.toggle("hidden", !isDeep);
    });

    const revenueHidden = stage === "pre-revenue";
    document.querySelectorAll("[data-revenue='true']").forEach((el) => {
      el.classList.toggle("hidden", revenueHidden);
    });
  }

  function collectInputs() {
    const data = new FormData(form);
    const mapped = {
      mode: state.mode,
      companyName: (data.get("companyName") || "Unnamed startup").toString().trim(),
      stage: (data.get("stage") || "early-revenue").toString(),
      sector: (data.get("sector") || "SaaS").toString(),
      geography: (data.get("geography") || "US").toString(),
      businessModel: (data.get("businessModel") || "B2B").toString(),
      foundingYear: toNumber(data.get("foundingYear"), 2022),
      revenueRunRate: toMoneyMillions(data.get("revenueRunRate")),
      growthRate: toNumber(data.get("growthRate"), 0),
      grossMargin: toNumber(data.get("grossMargin"), 0),
      customerCount: toNumber(data.get("customerCount"), 0),
      cac: toNumber(data.get("cac"), 0),
      ltv: toNumber(data.get("ltv"), 0),
      churn: toNumber(data.get("churn"), 0),
      tam: toMoneyMillions(data.get("tam")),
      competitionIntensity: toNumber(data.get("competitionIntensity"), 3),
      moatStrength: toNumber(data.get("moatStrength"), 3),
      founderExperience: toNumber(data.get("founderExperience"), 3),
      concentrationRisk: toNumber(data.get("concentrationRisk"), 3),
      regulatoryRisk: toNumber(data.get("regulatoryRisk"), 2),
      raiseTarget: toMoneyMillions(data.get("raiseTarget")),
      runwayMonths: toNumber(data.get("runwayMonths"), 18),
      targetDilution: toNumber(data.get("targetDilution"), 18),
      nrr: toNumber(data.get("nrr"), 100),
      pipelineCoverage: toNumber(data.get("pipelineCoverage"), 2.5),
      burnMultiple: toNumber(data.get("burnMultiple"), 1.8),
      projectedCagr: toNumber(data.get("projectedCagr"), 30),
    };
    if (mapped.stage === "pre-revenue") {
      mapped.revenueRunRate = 0;
    }
    return mapped;
  }

  function validateInputs(inputs) {
    const errors = [];
    if (!inputs.companyName) {
      errors.push("Please add a company name.");
    }
    if (!BENCHMARKS[inputs.geography] || !BENCHMARKS[inputs.geography][inputs.sector]) {
      errors.push("No benchmark profile found for this geography and sector.");
    }
    if (inputs.stage !== "pre-revenue" && inputs.revenueRunRate <= 0) {
      errors.push("Revenue run-rate is required for early-revenue and growth stages.");
    }
    if (inputs.growthRate < -50 || inputs.growthRate > 500) {
      errors.push("Growth must be between -50% and 500%.");
    }
    return errors;
  }

  function runValuation(inputs, sensitivity) {
    const methods = [];
    if (inputs.stage === "pre-revenue") {
      methods.push(calcScorecard(inputs));
      methods.push(calcBerkus(inputs));
      methods.push(calcRiskFactor(inputs));
    } else if (inputs.stage === "early-revenue") {
      methods.push(calcRevenueMultiple(inputs));
      methods.push(calcVcMethod(inputs));
      methods.push(calcDcfLite(inputs));
    } else {
      methods.push(calcCompsBlend(inputs));
      methods.push(calcDcf(inputs));
      methods.push(calcVcMethod(inputs));
    }

    const adjustedMethods = methods.map((method) => applySensitivity(method, sensitivity));
    const weights = resolveWeights(inputs.stage, adjustedMethods);
    const blended = blendWeighted(adjustedMethods, weights);
    const confidence = calculateConfidence(inputs, adjustedMethods);
    const drivers = identifyDrivers(inputs, adjustedMethods);

    return {
      range: blended,
      methods: adjustedMethods.map((method) => ({
        ...method,
        weight: weights[method.name] || 0,
      })),
      confidence,
      drivers,
      timestamp: new Date(),
      assumptionsDate: "March 2, 2026",
    };
  }

  function calcBerkus(inputs) {
    const benchmark = getBench(inputs);
    const maxPerFactor = benchmark.preseed / 5;
    const factors = [
      inputs.founderExperience,
      inputs.moatStrength,
      scoreFromCustomers(inputs.customerCount),
      scoreFromTam(inputs.tam),
      6 - inputs.competitionIntensity,
    ];
    const base = factors.reduce((sum, score) => sum + (clamp(score, 1, 5) / 5) * maxPerFactor, 0);
    return {
      name: "Berkus",
      low: base * 0.78,
      base,
      high: base * 1.24,
    };
  }

  function calcScorecard(inputs) {
    const benchmark = getBench(inputs);
    const basePremoney = benchmark.preseed;
    const weightedScore =
      0.3 * scale(inputs.founderExperience, 1, 5, 0.75, 1.25) +
      0.25 * scale(scoreFromTam(inputs.tam), 1, 5, 0.8, 1.25) +
      0.2 * scale(inputs.moatStrength, 1, 5, 0.78, 1.23) +
      0.15 * scale(6 - inputs.competitionIntensity, 1, 5, 0.8, 1.18) +
      0.1 * scale(scoreFromCustomers(inputs.customerCount), 1, 5, 0.78, 1.2);

    const base = basePremoney * weightedScore;
    return {
      name: "Scorecard",
      low: base * 0.8,
      base,
      high: base * 1.2,
    };
  }

  function calcRiskFactor(inputs) {
    const benchmark = getBench(inputs);
    const base = benchmark.preseed;
    const adjustments =
      (inputs.founderExperience - 3) * 0.25 +
      (inputs.moatStrength - 3) * 0.2 -
      (inputs.competitionIntensity - 3) * 0.22 -
      (inputs.concentrationRisk - 3) * 0.2 -
      (inputs.regulatoryRisk - 3) * 0.18;
    const output = clamp(base + adjustments, 0.7, 200);
    return {
      name: "Risk Factor",
      low: output * 0.85,
      base: output,
      high: output * 1.16,
    };
  }

  function calcRevenueMultiple(inputs) {
    const bench = getBench(inputs);
    const revenue = clamp(inputs.revenueRunRate, 0.01, 100000);
    return {
      name: "Revenue Multiple",
      low: revenue * bench.rev[0],
      base: revenue * bench.rev[1],
      high: revenue * bench.rev[2],
    };
  }

  function calcCompsBlend(inputs) {
    const bench = getBench(inputs);
    const revenue = clamp(inputs.revenueRunRate, 0.01, 100000);
    const ebitdaMargin = clamp((inputs.grossMargin / 100) * 0.42 - 0.08, -0.2, 0.5);
    const ebitda = revenue * ebitdaMargin;

    const low = revenue * bench.rev[0] * 0.65 + ebitda * bench.ebitda[0] * 0.35;
    const base = revenue * bench.rev[1] * 0.6 + ebitda * bench.ebitda[1] * 0.4;
    const high = revenue * bench.rev[2] * 0.55 + ebitda * bench.ebitda[2] * 0.45;

    return {
      name: "Comps Blend",
      low: Math.max(low, revenue * bench.rev[0] * 0.7),
      base: Math.max(base, revenue * bench.rev[1] * 0.72),
      high: Math.max(high, revenue * bench.rev[2] * 0.75),
    };
  }

  function calcVcMethod(inputs) {
    const bench = getBench(inputs);
    const currentRevenue = Math.max(inputs.revenueRunRate, bench.preseed * 0.08);
    const growth = clamp((inputs.growthRate || 25) / 100, -0.1, 1.4);
    const cagr = inputs.mode === "deep" ? clamp(inputs.projectedCagr / 100, 0, 1.2) : growth;
    const fiveYearRevenue = currentRevenue * Math.pow(1 + (growth + cagr) / 2, 5);
    const exitValueLow = fiveYearRevenue * bench.rev[0] * 0.9;
    const exitValueBase = fiveYearRevenue * bench.rev[1];
    const exitValueHigh = fiveYearRevenue * bench.rev[2] * 1.08;

    const targetReturn = inputs.stage === "growth" ? 3.8 : inputs.stage === "early-revenue" ? 6.5 : 10.5;
    const raise = Math.max(inputs.raiseTarget, 0.1);
    const preLow = Math.max(exitValueLow / (targetReturn * 1.15) - raise, 0.2);
    const preBase = Math.max(exitValueBase / targetReturn - raise, 0.3);
    const preHigh = Math.max(exitValueHigh / (targetReturn * 0.88) - raise, 0.5);

    return {
      name: "VC Method",
      low: preLow,
      base: preBase,
      high: preHigh,
    };
  }

  function calcDcfLite(inputs) {
    return calcDcfCore(inputs, {
      years: 5,
      startDiscount: inputs.geography === "US" ? 0.3 : 0.33,
      terminalGrowth: 0.025,
      marginLift: 0.08,
      name: "DCF-lite",
    });
  }

  function calcDcf(inputs) {
    return calcDcfCore(inputs, {
      years: 6,
      startDiscount: inputs.geography === "US" ? 0.22 : 0.25,
      terminalGrowth: 0.03,
      marginLift: 0.12,
      name: "DCF",
    });
  }

  function calcDcfCore(inputs, options) {
    const initialRevenue = Math.max(inputs.revenueRunRate, 0.2);
    const initialGrowth = clamp((inputs.growthRate || 20) / 100, -0.05, 1.1);
    const terminalGrowth = options.terminalGrowth;
    const discountRate = options.startDiscount;
    const burnPenalty = clamp((inputs.burnMultiple || 1.8) * 0.02, 0.01, 0.12);
    const marginStart = clamp(inputs.grossMargin / 100 - 0.62 - burnPenalty, -0.25, 0.18);
    const marginEnd = clamp(marginStart + options.marginLift, -0.15, 0.35);

    let revenue = initialRevenue;
    let pv = 0;
    for (let year = 1; year <= options.years; year += 1) {
      const progress = year / options.years;
      const growth = initialGrowth + (terminalGrowth - initialGrowth) * progress;
      const margin = marginStart + (marginEnd - marginStart) * progress;
      revenue *= 1 + growth;
      const fcf = revenue * margin;
      pv += fcf / Math.pow(1 + discountRate, year);
    }

    const finalRevenue = revenue * (1 + terminalGrowth);
    const terminalMargin = marginEnd;
    const terminalFcf = finalRevenue * terminalMargin;
    const terminalValue = terminalFcf / Math.max(discountRate - terminalGrowth, 0.08);
    const enterpriseValue = pv + terminalValue / Math.pow(1 + discountRate, options.years);
    const base = clamp(enterpriseValue, 0.2, 250000);

    return {
      name: options.name,
      low: base * 0.72,
      base,
      high: base * 1.35,
    };
  }

  function applySensitivity(method, sensitivity) {
    const profile = EXPOSURES[method.name] || { growth: 0.2, multiple: 0.2, discount: 0.2 };
    const growthImpact = (sensitivity.growth / 100) * profile.growth;
    const multipleImpact = (sensitivity.multiple / 100) * profile.multiple;
    const discountImpact = (sensitivity.discount / 100) * profile.discount;
    const multiplier = clamp(1 + growthImpact + multipleImpact - discountImpact, 0.5, 1.9);

    return {
      ...method,
      low: method.low * multiplier,
      base: method.base * multiplier,
      high: method.high * multiplier,
    };
  }

  function resolveWeights(stage, methods) {
    const defined = METHOD_WEIGHTS[stage];
    const weights = {};
    let sum = 0;
    methods.forEach((method) => {
      const weight = defined[method.name] || 0;
      weights[method.name] = weight;
      sum += weight;
    });
    if (sum <= 0) {
      const equal = 1 / methods.length;
      methods.forEach((method) => {
        weights[method.name] = equal;
      });
      return weights;
    }
    Object.keys(weights).forEach((name) => {
      weights[name] /= sum;
    });
    return weights;
  }

  function blendWeighted(methods, weights) {
    return methods.reduce(
      (acc, method) => {
        const w = weights[method.name] || 0;
        acc.low += method.low * w;
        acc.base += method.base * w;
        acc.high += method.high * w;
        return acc;
      },
      { low: 0, base: 0, high: 0 }
    );
  }

  function calculateConfidence(inputs, methods) {
    const completeness = scoreCompleteness(inputs);
    const consistency = scoreConsistency(inputs);
    const benchmarkCoverage = methods.length >= 3 ? 92 : 70;
    const outlierPenalty = scoreOutlierPenalty(inputs);
    const score = clamp(
      0.42 * completeness + 0.33 * consistency + 0.18 * benchmarkCoverage + 0.07 * (100 - outlierPenalty),
      35,
      96
    );
    return {
      score: Math.round(score),
      label: score >= 80 ? "High" : score >= 65 ? "Medium" : "Low",
      parts: {
        completeness,
        consistency,
        benchmarkCoverage,
        outlierPenalty,
      },
    };
  }

  function scoreCompleteness(inputs) {
    const required = [
      "companyName",
      "stage",
      "sector",
      "geography",
      "tam",
      "founderExperience",
      "moatStrength",
      "competitionIntensity",
      "raiseTarget",
      "runwayMonths",
      "targetDilution",
    ];

    if (inputs.stage !== "pre-revenue") {
      required.push("revenueRunRate", "growthRate", "grossMargin", "customerCount");
    }

    if (inputs.mode === "deep") {
      required.push("nrr", "pipelineCoverage", "burnMultiple", "projectedCagr");
    }

    const filled = required.filter((field) => {
      const value = inputs[field];
      if (value === null || value === undefined) {
        return false;
      }
      if (typeof value === "string") {
        return value.trim().length > 0;
      }
      return Number.isFinite(value) && value !== 0;
    }).length;

    return Math.round((filled / required.length) * 100);
  }

  function scoreConsistency(inputs) {
    let score = 90;
    if (inputs.ltv > 0 && inputs.cac > 0 && inputs.ltv / inputs.cac < 2) {
      score -= 10;
    }
    if (inputs.churn > 22) {
      score -= 9;
    }
    if (inputs.runwayMonths < 10) {
      score -= 7;
    }
    if (inputs.targetDilution > 30) {
      score -= 5;
    }
    if (inputs.mode === "deep" && inputs.pipelineCoverage < 1.5) {
      score -= 6;
    }
    return clamp(score, 40, 95);
  }

  function scoreOutlierPenalty(inputs) {
    let penalty = 0;
    if (inputs.growthRate > 220) {
      penalty += 18;
    }
    if (inputs.grossMargin > 95) {
      penalty += 12;
    }
    if (inputs.tam > 1500000) {
      penalty += 8;
    }
    if (inputs.revenueRunRate > 0 && inputs.revenueRunRate < 0.05 && inputs.stage !== "pre-revenue") {
      penalty += 12;
    }
    return clamp(penalty, 0, 45);
  }

  function identifyDrivers(inputs, methods) {
    const benchmark = getBench(inputs);
    const avgMethodBase = methods.reduce((sum, method) => sum + method.base, 0) / methods.length;
    const drivers = [
      {
        label: `Revenue multiple baseline in ${inputs.geography} ${inputs.sector}: ${benchmark.rev[1].toFixed(
          1
        )}x`,
        impact: benchmark.rev[1] * 4,
      },
      {
        label: `Growth profile at ${inputs.growthRate || 0}% annualized`,
        impact: (inputs.growthRate || 0) * 0.5,
      },
      {
        label: `Moat vs competition spread: ${inputs.moatStrength} / ${inputs.competitionIntensity}`,
        impact: (inputs.moatStrength - inputs.competitionIntensity) * 12,
      },
      {
        label: `Runway and raise plan: ${inputs.runwayMonths} months, ${formatMoney(inputs.raiseTarget, inputs.geography)} raise`,
        impact: inputs.runwayMonths - (inputs.raiseTarget / Math.max(avgMethodBase, 0.001)) * 12,
      },
      {
        label: `Risk posture (concentration ${inputs.concentrationRisk}, regulatory ${inputs.regulatoryRisk})`,
        impact: -1 * (inputs.concentrationRisk + inputs.regulatoryRisk) * 6,
      },
    ];

    return drivers
      .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
      .slice(0, 5)
      .map((item) => item.label);
  }

  function renderResults(result) {
    const inputs = state.inputs;
    outputEls.company.textContent = inputs.companyName || "Startup";
    outputEls.meta.textContent = `${titleCase(inputs.stage)} • ${inputs.sector} • ${inputs.geography} • ${titleCase(
      inputs.mode
    )}`;
    outputEls.low.textContent = formatMoney(result.range.low, inputs.geography);
    outputEls.base.textContent = formatMoney(result.range.base, inputs.geography);
    outputEls.high.textContent = formatMoney(result.range.high, inputs.geography);
    outputEls.confidenceScore.textContent = `${result.confidence.score}/100`;
    outputEls.confidenceLabel.textContent = `${result.confidence.label} confidence`;
    outputEls.timestamp.textContent = `Benchmark assumptions last updated: ${result.assumptionsDate}`;

    outputEls.methodTable.innerHTML = "";
    outputEls.methodBars.innerHTML = "";

    const peak = Math.max(...result.methods.map((method) => method.base));
    result.methods.forEach((method) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${method.name}</td><td>${Math.round(method.weight * 100)}%</td><td>${formatMoney(
        method.base,
        inputs.geography
      )}</td>`;
      outputEls.methodTable.appendChild(row);

      const barRow = document.createElement("div");
      barRow.className = "method-row";
      barRow.innerHTML = `
        <span>${method.name}</span>
        <div class="bar-track"><div class="bar-fill" style="width:${Math.max(
          8,
          (method.base / peak) * 100
        )}%"></div></div>
        <span>${Math.round(method.weight * 100)}%</span>
      `;
      outputEls.methodBars.appendChild(barRow);
    });

    outputEls.drivers.innerHTML = "";
    result.drivers.forEach((driver) => {
      const li = document.createElement("li");
      li.textContent = driver;
      outputEls.drivers.appendChild(li);
    });
  }

  function downloadReport(inputs, result) {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      warningEl.textContent = "Pop-up blocked. Enable pop-ups to export the report.";
      return;
    }

    const methodsHtml = result.methods
      .map(
        (method) =>
          `<tr><td>${escapeHtml(method.name)}</td><td>${Math.round(method.weight * 100)}%</td><td>${escapeHtml(
            formatMoney(method.low, inputs.geography)
          )}</td><td>${escapeHtml(formatMoney(method.base, inputs.geography))}</td><td>${escapeHtml(
            formatMoney(method.high, inputs.geography)
          )}</td></tr>`
      )
      .join("");

    const drivers = result.drivers.map((driver) => `<li>${escapeHtml(driver)}</li>`).join("");

    const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${escapeHtml(inputs.companyName)} - Valuation Report</title>
    <style>
      body{font-family:Arial,sans-serif;margin:28px;color:#222}
      h1{margin:0 0 8px}
      h2{margin:24px 0 8px;font-size:18px}
      p{margin:4px 0}
      table{border-collapse:collapse;width:100%;margin-top:8px}
      th,td{border:1px solid #ddd;padding:8px;text-align:left;font-size:13px}
      th{background:#f2f2f2}
      .range{display:flex;gap:10px}
      .box{border:1px solid #d0d0d0;padding:10px;flex:1;border-radius:8px}
      .muted{color:#666}
    </style>
  </head>
  <body>
    <h1>${escapeHtml(inputs.companyName)} - Valuation Report</h1>
    <p class="muted">${escapeHtml(titleCase(inputs.stage))} | ${escapeHtml(inputs.sector)} | ${escapeHtml(
      inputs.geography
    )}</p>
    <p class="muted">Generated: ${escapeHtml(formatDate(result.timestamp))} | Assumptions updated: ${escapeHtml(
      result.assumptionsDate
    )}</p>

    <h2>Valuation Range</h2>
    <div class="range">
      <div class="box"><strong>Low</strong><p>${escapeHtml(formatMoney(result.range.low, inputs.geography))}</p></div>
      <div class="box"><strong>Base</strong><p>${escapeHtml(formatMoney(result.range.base, inputs.geography))}</p></div>
      <div class="box"><strong>High</strong><p>${escapeHtml(formatMoney(result.range.high, inputs.geography))}</p></div>
    </div>

    <h2>Method Breakdown</h2>
    <table>
      <thead><tr><th>Method</th><th>Weight</th><th>Low</th><th>Base</th><th>High</th></tr></thead>
      <tbody>${methodsHtml}</tbody>
    </table>

    <h2>Confidence</h2>
    <p>Score: ${result.confidence.score}/100 (${escapeHtml(result.confidence.label)})</p>
    <p>Completeness: ${result.confidence.parts.completeness} | Consistency: ${result.confidence.parts.consistency} | Benchmark coverage: ${result.confidence.parts.benchmarkCoverage} | Outlier penalty: ${result.confidence.parts.outlierPenalty}</p>

    <h2>Key Drivers</h2>
    <ul>${drivers}</ul>

    <h2>Assumptions and Disclaimer</h2>
    <p>Output is a decision-support estimate for founders and should not be treated as investment advice. Multiples and weights are static in this v1 model and should be reviewed before external use.</p>
    <script>window.onload = function(){ window.print(); };</script>
  </body>
</html>`;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  }

  function downloadSpreadsheetModel(inputs, result) {
    const methods = result.methods;
    const workbook = `<?xml version="1.0"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
  ${sheetXml("Inputs", [
    ["Field", "Value"],
    ["Company", inputs.companyName],
    ["Mode", titleCase(inputs.mode)],
    ["Stage", titleCase(inputs.stage)],
    ["Sector", inputs.sector],
    ["Geography", inputs.geography],
    ["Business model", inputs.businessModel],
    ["Founding year", inputs.foundingYear],
    ["Revenue run-rate (M)", round(inputs.revenueRunRate, 4)],
    ["Growth %", inputs.growthRate],
    ["Gross margin %", inputs.grossMargin],
    ["Customers", inputs.customerCount],
    ["CAC", inputs.cac],
    ["LTV", inputs.ltv],
    ["Churn %", inputs.churn],
    ["TAM (M)", round(inputs.tam, 4)],
    ["Raise target (M)", round(inputs.raiseTarget, 4)],
    ["Runway months", inputs.runwayMonths],
    ["Target dilution %", inputs.targetDilution],
  ])}
  ${sheetXml("Assumptions", [
    ["Assumption", "Value"],
    ["Benchmark update date", result.assumptionsDate],
    ["Stage method blend", methods.map((method) => `${method.name} ${Math.round(method.weight * 100)}%`).join(" | ")],
    ["Confidence score", `${result.confidence.score}/100`],
    ["Currency basis", inputs.geography === "US" ? "USD" : "EUR"],
  ])}
  ${sheetXml("Methods", [
    ["Method", "Weight %", "Low (M)", "Base (M)", "High (M)"],
    ...methods.map((method) => [
      method.name,
      Math.round(method.weight * 100),
      round(method.low, 4),
      round(method.base, 4),
      round(method.high, 4),
    ]),
  ])}
  ${sheetXml("Scenarios", [
    ["Scenario", "Valuation (M)"],
    ["Low", round(result.range.low, 4)],
    ["Base", round(result.range.base, 4)],
    ["High", round(result.range.high, 4)],
    ["Sensitivity growth", `${state.sensitivity.growth}%`],
    ["Sensitivity multiple", `${state.sensitivity.multiple}%`],
    ["Sensitivity discount", `${state.sensitivity.discount}%`],
  ])}
  ${sheetXml("Summary", [
    ["Metric", "Value"],
    ["Company", inputs.companyName],
    ["Final low", round(result.range.low, 4)],
    ["Final base", round(result.range.base, 4)],
    ["Final high", round(result.range.high, 4)],
    ["Confidence label", result.confidence.label],
    ["Generated", formatDate(result.timestamp)],
  ])}
</Workbook>`;

    const blob = new Blob([workbook], {
      type: "application/vnd.ms-excel;charset=utf-8;",
    });
    const filename = `${safeFilename(inputs.companyName || "startup")}_valuation_model.xls`;
    triggerDownload(blob, filename);
  }

  function sheetXml(name, rows) {
    const xmlRows = rows
      .map((row) => {
        const cells = row
          .map((cell) => {
            const type = typeof cell === "number" ? "Number" : "String";
            return `<Cell><Data ss:Type="${type}">${escapeXml(String(cell))}</Data></Cell>`;
          })
          .join("");
        return `<Row>${cells}</Row>`;
      })
      .join("");

    return `<Worksheet ss:Name="${escapeXml(name)}"><Table>${xmlRows}</Table></Worksheet>`;
  }

  function triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  }

  function getBench(inputs) {
    return BENCHMARKS[inputs.geography][inputs.sector];
  }

  function scoreFromCustomers(count) {
    if (count >= 500) return 5;
    if (count >= 200) return 4;
    if (count >= 80) return 3;
    if (count >= 20) return 2;
    return 1;
  }

  function scoreFromTam(tamMillions) {
    if (tamMillions >= 10000) return 5;
    if (tamMillions >= 4000) return 4;
    if (tamMillions >= 1500) return 3;
    if (tamMillions >= 500) return 2;
    return 1;
  }

  function toMoneyMillions(value) {
    const n = toNumber(value, 0);
    return n > 0 ? n / 1000000 : 0;
  }

  function toNumber(value, fallback) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function scale(value, inMin, inMax, outMin, outMax) {
    const ratio = (value - inMin) / (inMax - inMin);
    return outMin + clamp(ratio, 0, 1) * (outMax - outMin);
  }

  function round(value, precision) {
    const factor = 10 ** precision;
    return Math.round(value * factor) / factor;
  }

  function formatMoney(millions, geography) {
    const symbol = geography === "US" ? "$" : "€";
    if (millions >= 1000) {
      return `${symbol}${(millions / 1000).toFixed(2)}B`;
    }
    return `${symbol}${millions.toFixed(2)}M`;
  }

  function titleCase(value) {
    return String(value)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function resetSensitivity() {
    state.sensitivity = { growth: 0, multiple: 0, discount: 0 };
    sensitivityEls.growth.value = "0";
    sensitivityEls.multiple.value = "0";
    sensitivityEls.discount.value = "0";
    sensitivityEls.growthVal.textContent = "0%";
    sensitivityEls.multipleVal.textContent = "0%";
    sensitivityEls.discountVal.textContent = "0%";
  }

  function formatDate(date) {
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function safeFilename(value) {
    return String(value)
      .trim()
      .replace(/[^a-z0-9]+/gi, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 60);
  }

  function escapeXml(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function escapeHtml(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

})();

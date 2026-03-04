(function () {
  /* ══════════════════════════════════════════════════════════════
     CONSTANTS — benchmarks, weights, exposures (unchanged)
     ══════════════════════════════════════════════════════════════ */
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

  /* ══════════════════════════════════════════════════════════════
     STATE
     ══════════════════════════════════════════════════════════════ */
  const state = {
    mode: null,
    currentStep: 1,
    maxVisitedStep: 1,
    stepData: { 1: {}, 2: {}, 3: {}, 4: {}, 5: {} },
    inputs: null,
    rawResult: null,
    sensitivity: { growth: 0, multiple: 0, discount: 0 },
    charts: { methods: null, range: null },
  };

  /* ══════════════════════════════════════════════════════════════
     DOM REFERENCES
     ══════════════════════════════════════════════════════════════ */
  const wizardSteps = document.querySelectorAll(".wizard-step");
  const progressSteps = document.querySelectorAll(".progress-step");
  const progressLines = document.querySelectorAll(".progress-line");
  const progressFill = document.getElementById("progress-fill");
  const btnNext = document.getElementById("btn-next");
  const btnBack = document.getElementById("btn-back");
  const warningEl = document.getElementById("wizard-warning");
  const resultsEl = document.getElementById("results");
  const stageSelect = document.getElementById("stage-select");

  const outputEls = {
    company: document.getElementById("result-company"),
    meta: document.getElementById("result-meta"),
    low: document.getElementById("range-low"),
    base: document.getElementById("range-base"),
    high: document.getElementById("range-high"),
    confidenceScore: document.getElementById("confidence-score"),
    confidenceLabel: document.getElementById("confidence-label"),
    methodTable: document.getElementById("method-table"),
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
  const startOverBtn = document.getElementById("btn-start-over");

  /* ══════════════════════════════════════════════════════════════
     INIT
     ══════════════════════════════════════════════════════════════ */
  init();

  function init() {
    // Mode cards
    document.querySelectorAll(".mode-card").forEach(function (card) {
      card.addEventListener("click", function () {
        document.querySelectorAll(".mode-card").forEach(function (c) { c.classList.remove("selected"); });
        card.classList.add("selected");
        state.mode = card.dataset.mode;
        state.stepData[1].mode = card.dataset.mode;
      });
    });

    // Stage change clears step 3 data
    stageSelect.addEventListener("change", function () {
      state.stepData[3] = {};
    });

    // Wizard navigation
    btnNext.addEventListener("click", handleNext);
    btnBack.addEventListener("click", handleBack);

    // Progress step clicks (back-navigation to completed steps)
    progressSteps.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = parseInt(btn.dataset.step, 10);
        if (target < state.currentStep && target <= state.maxVisitedStep) {
          saveCurrentStepData();
          goToStep(target);
        }
      });
    });

    // Sensitivity sliders
    [sensitivityEls.growth, sensitivityEls.multiple, sensitivityEls.discount].forEach(function (slider) {
      slider.addEventListener("input", handleSensitivityChange);
    });

    // Download buttons
    downloadReportBtn.addEventListener("click", function () {
      if (state.rawResult && state.inputs) downloadPdfReport(state.inputs, state.rawResult);
    });
    downloadModelBtn.addEventListener("click", function () {
      if (state.rawResult && state.inputs) downloadExcelModel(state.inputs, state.rawResult);
    });

    // Start over
    startOverBtn.addEventListener("click", function () {
      state.mode = null;
      state.currentStep = 1;
      state.maxVisitedStep = 1;
      state.stepData = { 1: {}, 2: {}, 3: {}, 4: {}, 5: {} };
      state.inputs = null;
      state.rawResult = null;
      state.sensitivity = { growth: 0, multiple: 0, discount: 0 };
      destroyCharts();
      resultsEl.classList.add("hidden");
      document.querySelector(".wizard-panel").classList.remove("hidden");
      document.querySelectorAll(".mode-card").forEach(function (c) { c.classList.remove("selected"); });
      clearAllFields();
      goToStep(1);
    });

    // Slider badge live updates
    document.querySelectorAll(".slider-field input[type='range']").forEach(function (slider) {
      var badge = slider.parentElement.querySelector(".slider-badge");
      if (badge) {
        badge.textContent = slider.value;
        slider.addEventListener("input", function () { badge.textContent = slider.value; });
      }
    });

    // Number formatting on blur/focus
    document.querySelectorAll(".fmt-number").forEach(function (input) {
      input.addEventListener("focus", function () {
        var raw = input.getAttribute("data-raw-value");
        if (raw) input.value = raw;
      });
      input.addEventListener("blur", function () {
        var raw = input.value.replace(/[^0-9.\-]/g, "");
        input.setAttribute("data-raw-value", raw);
        var n = parseFloat(raw);
        if (Number.isFinite(n)) {
          input.value = formatNumberCommas(n);
        }
      });
    });

    // Inline validation on blur
    document.querySelectorAll(".field input, .field select").forEach(function (el) {
      el.addEventListener("blur", function () {
        var field = el.closest(".field");
        if (!field) return;
        // Only validate if the field is visible
        if (field.classList.contains("hidden") || field.offsetParent === null) return;
        validateSingleField(field);
      });
    });

    // Set initial state
    goToStep(1);
  }

  /* ══════════════════════════════════════════════════════════════
     WIZARD CONTROLLER
     ══════════════════════════════════════════════════════════════ */
  function handleNext() {
    warningEl.textContent = "";

    if (state.currentStep === 1 && !state.mode) {
      warningEl.textContent = "Please select a mode to continue.";
      return;
    }

    saveCurrentStepData();

    var errors = validateCurrentStep();
    if (errors.length > 0) {
      warningEl.textContent = errors[0];
      return;
    }

    if (state.currentStep === 5) {
      runAndShowResults();
      return;
    }

    goToStep(state.currentStep + 1);
  }

  function handleBack() {
    if (state.currentStep <= 1) return;
    warningEl.textContent = "";
    saveCurrentStepData();
    goToStep(state.currentStep - 1);
  }

  function goToStep(step) {
    state.currentStep = step;
    if (step > state.maxVisitedStep) state.maxVisitedStep = step;

    // Show/hide step panels
    wizardSteps.forEach(function (el) {
      var s = parseInt(el.dataset.step, 10);
      el.classList.toggle("hidden", s !== step);
    });

    // Apply dynamic visibility for step 3 (stage-dependent) and deep-dive fields
    applyDynamicVisibility();

    // Restore field values from state
    restoreStepData(step);

    // Update progress indicator
    updateProgress();

    // Update nav buttons
    btnBack.disabled = step === 1;
    btnNext.textContent = step === 5 ? "Run Valuation" : "Next";

    warningEl.textContent = "";
  }

  function updateProgress() {
    var step = state.currentStep;

    progressSteps.forEach(function (el, idx) {
      var s = parseInt(el.dataset.step, 10);
      el.classList.remove("active", "completed");
      if (s === step) {
        el.classList.add("active");
      } else if (s < step) {
        el.classList.add("completed");
        // Replace number with checkmark
        var numEl = el.querySelector(".step-num");
        if (numEl) numEl.innerHTML = "&#10003;";
      } else {
        var numEl2 = el.querySelector(".step-num");
        if (numEl2) numEl2.textContent = s;
      }
    });

    // Fill progress lines
    progressLines.forEach(function (line, idx) {
      line.classList.toggle("filled", idx < step - 1);
    });

    // Progress bar
    var pct = ((step - 1) / 4) * 100;
    progressFill.style.width = pct + "%";
  }

  /* ══════════════════════════════════════════════════════════════
     DYNAMIC VISIBILITY
     ══════════════════════════════════════════════════════════════ */
  function applyDynamicVisibility() {
    var stage = getStageValue();
    var isDeep = state.mode === "deep";
    var isPreRevenue = stage === "pre-revenue";

    // Step 3: toggle pre-revenue vs revenue fields
    document.querySelectorAll(".prerev-field").forEach(function (el) {
      el.classList.toggle("hidden", !isPreRevenue);
    });
    document.querySelectorAll(".rev-field").forEach(function (el) {
      // Show if NOT pre-revenue, but also check deep-field
      if (el.classList.contains("deep-field")) {
        el.classList.toggle("hidden", isPreRevenue || !isDeep);
      } else {
        el.classList.toggle("hidden", isPreRevenue);
      }
    });

    // Deep fields on steps 3 and 5
    document.querySelectorAll(".deep-field").forEach(function (el) {
      if (el.classList.contains("rev-field")) return; // handled above
      el.classList.toggle("hidden", !isDeep);
    });

    // Update step 3 description
    var descEl = document.getElementById("step3-desc");
    if (descEl) {
      descEl.textContent = isPreRevenue
        ? "Tell us about your product stage and early traction."
        : "Enter your financial metrics and unit economics.";
    }
  }

  function getStageValue() {
    // Check step 2 stored data first, then the DOM select
    if (state.stepData[2] && state.stepData[2].stage) return state.stepData[2].stage;
    return stageSelect ? stageSelect.value : "early-revenue";
  }

  /* ══════════════════════════════════════════════════════════════
     STEP DATA — SAVE / RESTORE
     ══════════════════════════════════════════════════════════════ */
  function saveCurrentStepData() {
    var stepEl = document.querySelector('.wizard-step[data-step="' + state.currentStep + '"]');
    if (!stepEl) return;
    var data = {};

    stepEl.querySelectorAll("input, select").forEach(function (el) {
      if (!el.name) return;
      // Skip hidden fields
      var field = el.closest(".field");
      if (field && (field.classList.contains("hidden") || field.offsetParent === null)) return;

      if (el.classList.contains("fmt-number")) {
        data[el.name] = el.getAttribute("data-raw-value") || el.value.replace(/[^0-9.\-]/g, "");
      } else {
        data[el.name] = el.value;
      }
    });

    // For step 1, mode is tracked via state.mode
    if (state.currentStep === 1) {
      data.mode = state.mode;
    }

    state.stepData[state.currentStep] = data;
  }

  function restoreStepData(step) {
    var data = state.stepData[step];
    if (!data) return;
    var stepEl = document.querySelector('.wizard-step[data-step="' + step + '"]');
    if (!stepEl) return;

    // Restore mode card selection on step 1
    if (step === 1 && data.mode) {
      state.mode = data.mode;
      document.querySelectorAll(".mode-card").forEach(function (c) {
        c.classList.toggle("selected", c.dataset.mode === data.mode);
      });
    }

    Object.keys(data).forEach(function (name) {
      if (name === "mode") return;
      var el = stepEl.querySelector('[name="' + name + '"]');
      if (!el) return;
      if (el.classList.contains("fmt-number")) {
        el.setAttribute("data-raw-value", data[name]);
        var n = parseFloat(data[name]);
        el.value = Number.isFinite(n) ? formatNumberCommas(n) : data[name];
      } else {
        el.value = data[name];
      }
    });

    // Update slider badges after restoring values
    stepEl.querySelectorAll(".slider-field input[type='range']").forEach(function (slider) {
      var badge = slider.parentElement.querySelector(".slider-badge");
      if (badge) badge.textContent = slider.value;
    });
  }

  function clearAllFields() {
    document.querySelectorAll(".wizard-step input, .wizard-step select").forEach(function (el) {
      if (el.type === "range") {
        el.value = el.getAttribute("value") || "3";
      } else if (el.tagName === "SELECT") {
        el.selectedIndex = el.querySelector("[selected]")
          ? Array.from(el.options).findIndex(function (o) { return o.hasAttribute("selected"); })
          : 0;
      } else {
        el.value = el.getAttribute("value") || "";
      }
      if (el.classList.contains("fmt-number")) el.setAttribute("data-raw-value", "");
      var field = el.closest(".field");
      if (field) {
        field.classList.remove("has-error");
        var err = field.querySelector(".field-error");
        if (err) err.textContent = "";
      }
    });
    // Reset slider badges
    document.querySelectorAll(".slider-field input[type='range']").forEach(function (slider) {
      var badge = slider.parentElement.querySelector(".slider-badge");
      if (badge) badge.textContent = slider.value;
    });
  }

  /* ══════════════════════════════════════════════════════════════
     VALIDATION
     ══════════════════════════════════════════════════════════════ */
  function validateCurrentStep() {
    var errors = [];
    var step = state.currentStep;

    if (step === 1) {
      if (!state.mode) errors.push("Please select a mode.");
      return errors;
    }

    // Validate visible fields in current step
    var stepEl = document.querySelector('.wizard-step[data-step="' + step + '"]');
    if (!stepEl) return errors;

    var fields = stepEl.querySelectorAll(".field");
    fields.forEach(function (field) {
      if (field.classList.contains("hidden") || field.offsetParent === null) return;
      var result = validateSingleField(field);
      if (result) errors.push(result);
    });

    // Step-specific cross-field validation
    if (step === 2) {
      var data = state.stepData[2];
      if (!data.companyName || !data.companyName.trim()) {
        errors.push("Please enter a company name.");
      }
    }

    return errors;
  }

  function validateSingleField(field) {
    var input = field.querySelector("input, select");
    if (!input || !input.name) return null;

    var errEl = field.querySelector(".field-error");
    var value = input.classList.contains("fmt-number")
      ? (input.getAttribute("data-raw-value") || input.value.replace(/[^0-9.\-]/g, ""))
      : input.value;

    var error = null;

    // Required check for text fields
    if (input.type === "text" && !input.classList.contains("fmt-number")) {
      if (!value.trim()) error = "This field is required.";
    }

    // Number fields
    if (input.type === "number" || input.classList.contains("fmt-number")) {
      var n = parseFloat(value);
      if (input.name === "companyName") {
        // skip, it's text
      } else if (value && !Number.isFinite(n)) {
        error = "Enter a valid number.";
      } else if (input.min && Number.isFinite(n) && n < parseFloat(input.min)) {
        error = "Minimum value is " + input.min + ".";
      } else if (input.max && Number.isFinite(n) && n > parseFloat(input.max)) {
        error = "Maximum value is " + input.max + ".";
      }
    }

    // Specific field validations
    if (input.name === "growthRate") {
      var gv = parseFloat(value);
      if (Number.isFinite(gv) && (gv < -50 || gv > 500)) {
        error = "Growth must be between -50% and 500%.";
      }
    }

    field.classList.toggle("has-error", !!error);
    if (errEl) errEl.textContent = error || "";
    return error;
  }

  /* ══════════════════════════════════════════════════════════════
     COLLECT INPUTS — merges from state.stepData
     ══════════════════════════════════════════════════════════════ */
  function collectInputs() {
    var d = {};
    for (var s = 1; s <= 5; s++) {
      var sd = state.stepData[s];
      if (sd) {
        Object.keys(sd).forEach(function (k) { d[k] = sd[k]; });
      }
    }

    var stage = d.stage || "early-revenue";
    var isPreRevenue = stage === "pre-revenue";

    var mapped = {
      mode: state.mode || "quick",
      companyName: (d.companyName || "Unnamed startup").trim(),
      stage: stage,
      sector: d.sector || "SaaS",
      geography: d.geography || "US",
      businessModel: d.businessModel || "B2B",
      foundingYear: toNumber(d.foundingYear, 2022),
      revenueRunRate: isPreRevenue ? 0 : toMoneyMillions(d.revenueRunRate),
      growthRate: toNumber(d.growthRate, 0),
      grossMargin: toNumber(d.grossMargin, 0),
      customerCount: isPreRevenue ? toNumber(d.earlyUsers, 0) : toNumber(d.customerCount, 0),
      cac: toNumber(d.cac, 0),
      ltv: toNumber(d.ltv, 0),
      churn: toNumber(d.churn, 0),
      tam: toMoneyMillions(d.tam),
      competitionIntensity: toNumber(d.competitionIntensity, 3),
      moatStrength: toNumber(d.moatStrength, 3),
      founderExperience: toNumber(d.founderExperience, 3),
      concentrationRisk: toNumber(d.concentrationRisk, 3),
      regulatoryRisk: toNumber(d.regulatoryRisk, 2),
      raiseTarget: toMoneyMillions(d.raiseTarget),
      runwayMonths: toNumber(d.runwayMonths, 18),
      targetDilution: toNumber(d.targetDilution, 18),
      nrr: toNumber(d.nrr, 100),
      pipelineCoverage: toNumber(d.pipelineCoverage, 2.5),
      burnMultiple: toNumber(d.burnMultiple, 1.8),
      projectedCagr: toNumber(d.projectedCagr, 30),
      productStage: d.productStage || "mvp",
      earlyUsers: toNumber(d.earlyUsers, 0),
    };

    return mapped;
  }

  /* ══════════════════════════════════════════════════════════════
     RUN VALUATION & SHOW RESULTS
     ══════════════════════════════════════════════════════════════ */
  function runAndShowResults() {
    var inputs = collectInputs();
    var errors = validateInputsFinal(inputs);
    if (errors.length > 0) {
      warningEl.textContent = errors[0];
      return;
    }

    state.inputs = inputs;
    resetSensitivity();
    state.rawResult = runValuation(inputs, state.sensitivity);

    document.querySelector(".wizard-panel").classList.add("hidden");
    resultsEl.classList.remove("hidden");
    renderResults(state.rawResult);
    renderCharts(state.rawResult);
    resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function validateInputsFinal(inputs) {
    var errors = [];
    if (!inputs.companyName) errors.push("Please add a company name.");
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

  /* ══════════════════════════════════════════════════════════════
     SENSITIVITY
     ══════════════════════════════════════════════════════════════ */
  function handleSensitivityChange() {
    sensitivityEls.growthVal.textContent = sensitivityEls.growth.value + "%";
    sensitivityEls.multipleVal.textContent = sensitivityEls.multiple.value + "%";
    sensitivityEls.discountVal.textContent = sensitivityEls.discount.value + "%";
    if (!state.inputs) return;
    state.sensitivity = {
      growth: toNumber(sensitivityEls.growth.value, 0),
      multiple: toNumber(sensitivityEls.multiple.value, 0),
      discount: toNumber(sensitivityEls.discount.value, 0),
    };
    state.rawResult = runValuation(state.inputs, state.sensitivity);
    renderResults(state.rawResult);
    renderCharts(state.rawResult);
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

  /* ══════════════════════════════════════════════════════════════
     VALUATION ENGINE — preserved unchanged
     ══════════════════════════════════════════════════════════════ */
  function runValuation(inputs, sensitivity) {
    var methods = [];
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

    var adjustedMethods = methods.map(function (method) { return applySensitivity(method, sensitivity); });
    var weights = resolveWeights(inputs.stage, adjustedMethods);
    var blended = blendWeighted(adjustedMethods, weights);
    var confidence = calculateConfidence(inputs, adjustedMethods);
    var drivers = identifyDrivers(inputs, adjustedMethods);

    return {
      range: blended,
      methods: adjustedMethods.map(function (method) {
        return Object.assign({}, method, { weight: weights[method.name] || 0 });
      }),
      confidence: confidence,
      drivers: drivers,
      timestamp: new Date(),
      assumptionsDate: "March 2, 2026",
    };
  }

  function calcBerkus(inputs) {
    var benchmark = getBench(inputs);
    var maxPerFactor = benchmark.preseed / 5;
    var factors = [
      inputs.founderExperience,
      inputs.moatStrength,
      scoreFromCustomers(inputs.customerCount),
      scoreFromTam(inputs.tam),
      6 - inputs.competitionIntensity,
    ];
    var base = factors.reduce(function (sum, score) { return sum + (clamp(score, 1, 5) / 5) * maxPerFactor; }, 0);
    return { name: "Berkus", low: base * 0.78, base: base, high: base * 1.24 };
  }

  function calcScorecard(inputs) {
    var benchmark = getBench(inputs);
    var basePremoney = benchmark.preseed;
    var weightedScore =
      0.3 * scale(inputs.founderExperience, 1, 5, 0.75, 1.25) +
      0.25 * scale(scoreFromTam(inputs.tam), 1, 5, 0.8, 1.25) +
      0.2 * scale(inputs.moatStrength, 1, 5, 0.78, 1.23) +
      0.15 * scale(6 - inputs.competitionIntensity, 1, 5, 0.8, 1.18) +
      0.1 * scale(scoreFromCustomers(inputs.customerCount), 1, 5, 0.78, 1.2);
    var base = basePremoney * weightedScore;
    return { name: "Scorecard", low: base * 0.8, base: base, high: base * 1.2 };
  }

  function calcRiskFactor(inputs) {
    var benchmark = getBench(inputs);
    var base = benchmark.preseed;
    var adjustments =
      (inputs.founderExperience - 3) * 0.25 +
      (inputs.moatStrength - 3) * 0.2 -
      (inputs.competitionIntensity - 3) * 0.22 -
      (inputs.concentrationRisk - 3) * 0.2 -
      (inputs.regulatoryRisk - 3) * 0.18;
    var output = clamp(base + adjustments, 0.7, 200);
    return { name: "Risk Factor", low: output * 0.85, base: output, high: output * 1.16 };
  }

  function calcRevenueMultiple(inputs) {
    var bench = getBench(inputs);
    var revenue = clamp(inputs.revenueRunRate, 0.01, 100000);
    return {
      name: "Revenue Multiple",
      low: revenue * bench.rev[0],
      base: revenue * bench.rev[1],
      high: revenue * bench.rev[2],
    };
  }

  function calcCompsBlend(inputs) {
    var bench = getBench(inputs);
    var revenue = clamp(inputs.revenueRunRate, 0.01, 100000);
    var ebitdaMargin = clamp((inputs.grossMargin / 100) * 0.42 - 0.08, -0.2, 0.5);
    var ebitda = revenue * ebitdaMargin;
    var low = revenue * bench.rev[0] * 0.65 + ebitda * bench.ebitda[0] * 0.35;
    var base = revenue * bench.rev[1] * 0.6 + ebitda * bench.ebitda[1] * 0.4;
    var high = revenue * bench.rev[2] * 0.55 + ebitda * bench.ebitda[2] * 0.45;
    return {
      name: "Comps Blend",
      low: Math.max(low, revenue * bench.rev[0] * 0.7),
      base: Math.max(base, revenue * bench.rev[1] * 0.72),
      high: Math.max(high, revenue * bench.rev[2] * 0.75),
    };
  }

  function calcVcMethod(inputs) {
    var bench = getBench(inputs);
    var currentRevenue = Math.max(inputs.revenueRunRate, bench.preseed * 0.08);
    var growth = clamp((inputs.growthRate || 25) / 100, -0.1, 1.4);
    var cagr = inputs.mode === "deep" ? clamp(inputs.projectedCagr / 100, 0, 1.2) : growth;
    var fiveYearRevenue = currentRevenue * Math.pow(1 + (growth + cagr) / 2, 5);
    var exitValueLow = fiveYearRevenue * bench.rev[0] * 0.9;
    var exitValueBase = fiveYearRevenue * bench.rev[1];
    var exitValueHigh = fiveYearRevenue * bench.rev[2] * 1.08;
    var targetReturn = inputs.stage === "growth" ? 3.8 : inputs.stage === "early-revenue" ? 6.5 : 10.5;
    var raise = Math.max(inputs.raiseTarget, 0.1);
    var preLow = Math.max(exitValueLow / (targetReturn * 1.15) - raise, 0.2);
    var preBase = Math.max(exitValueBase / targetReturn - raise, 0.3);
    var preHigh = Math.max(exitValueHigh / (targetReturn * 0.88) - raise, 0.5);
    return { name: "VC Method", low: preLow, base: preBase, high: preHigh };
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
    var initialRevenue = Math.max(inputs.revenueRunRate, 0.2);
    var initialGrowth = clamp((inputs.growthRate || 20) / 100, -0.05, 1.1);
    var terminalGrowth = options.terminalGrowth;
    var discountRate = options.startDiscount;
    var burnPenalty = clamp((inputs.burnMultiple || 1.8) * 0.02, 0.01, 0.12);
    var marginStart = clamp(inputs.grossMargin / 100 - 0.62 - burnPenalty, -0.25, 0.18);
    var marginEnd = clamp(marginStart + options.marginLift, -0.15, 0.35);
    var revenue = initialRevenue;
    var pv = 0;
    for (var year = 1; year <= options.years; year += 1) {
      var progress = year / options.years;
      var growth = initialGrowth + (terminalGrowth - initialGrowth) * progress;
      var margin = marginStart + (marginEnd - marginStart) * progress;
      revenue *= 1 + growth;
      var fcf = revenue * margin;
      pv += fcf / Math.pow(1 + discountRate, year);
    }
    var finalRevenue = revenue * (1 + terminalGrowth);
    var terminalMargin = marginEnd;
    var terminalFcf = finalRevenue * terminalMargin;
    var terminalValue = terminalFcf / Math.max(discountRate - terminalGrowth, 0.08);
    var enterpriseValue = pv + terminalValue / Math.pow(1 + discountRate, options.years);
    var base = clamp(enterpriseValue, 0.2, 250000);
    return { name: options.name, low: base * 0.72, base: base, high: base * 1.35 };
  }

  function applySensitivity(method, sensitivity) {
    var profile = EXPOSURES[method.name] || { growth: 0.2, multiple: 0.2, discount: 0.2 };
    var growthImpact = (sensitivity.growth / 100) * profile.growth;
    var multipleImpact = (sensitivity.multiple / 100) * profile.multiple;
    var discountImpact = (sensitivity.discount / 100) * profile.discount;
    var multiplier = clamp(1 + growthImpact + multipleImpact - discountImpact, 0.5, 1.9);
    return {
      name: method.name,
      low: method.low * multiplier,
      base: method.base * multiplier,
      high: method.high * multiplier,
    };
  }

  function resolveWeights(stage, methods) {
    var defined = METHOD_WEIGHTS[stage];
    var weights = {};
    var sum = 0;
    methods.forEach(function (method) {
      var weight = defined[method.name] || 0;
      weights[method.name] = weight;
      sum += weight;
    });
    if (sum <= 0) {
      var equal = 1 / methods.length;
      methods.forEach(function (method) { weights[method.name] = equal; });
      return weights;
    }
    Object.keys(weights).forEach(function (name) { weights[name] /= sum; });
    return weights;
  }

  function blendWeighted(methods, weights) {
    return methods.reduce(function (acc, method) {
      var w = weights[method.name] || 0;
      acc.low += method.low * w;
      acc.base += method.base * w;
      acc.high += method.high * w;
      return acc;
    }, { low: 0, base: 0, high: 0 });
  }

  function calculateConfidence(inputs, methods) {
    var completeness = scoreCompleteness(inputs);
    var consistency = scoreConsistency(inputs);
    var benchmarkCoverage = methods.length >= 3 ? 92 : 70;
    var outlierPenalty = scoreOutlierPenalty(inputs);
    var score = clamp(
      0.42 * completeness + 0.33 * consistency + 0.18 * benchmarkCoverage + 0.07 * (100 - outlierPenalty),
      35, 96
    );
    return {
      score: Math.round(score),
      label: score >= 80 ? "High" : score >= 65 ? "Medium" : "Low",
      parts: { completeness: completeness, consistency: consistency, benchmarkCoverage: benchmarkCoverage, outlierPenalty: outlierPenalty },
    };
  }

  function scoreCompleteness(inputs) {
    var required = [
      "companyName", "stage", "sector", "geography", "tam",
      "founderExperience", "moatStrength", "competitionIntensity",
      "raiseTarget", "runwayMonths", "targetDilution",
    ];
    if (inputs.stage !== "pre-revenue") {
      required.push("revenueRunRate", "growthRate", "grossMargin", "customerCount");
    }
    if (inputs.mode === "deep") {
      required.push("nrr", "pipelineCoverage", "burnMultiple", "projectedCagr");
    }
    var filled = required.filter(function (field) {
      var value = inputs[field];
      if (value === null || value === undefined) return false;
      if (typeof value === "string") return value.trim().length > 0;
      return Number.isFinite(value) && value !== 0;
    }).length;
    return Math.round((filled / required.length) * 100);
  }

  function scoreConsistency(inputs) {
    var score = 90;
    if (inputs.ltv > 0 && inputs.cac > 0 && inputs.ltv / inputs.cac < 2) score -= 10;
    if (inputs.churn > 22) score -= 9;
    if (inputs.runwayMonths < 10) score -= 7;
    if (inputs.targetDilution > 30) score -= 5;
    if (inputs.mode === "deep" && inputs.pipelineCoverage < 1.5) score -= 6;
    return clamp(score, 40, 95);
  }

  function scoreOutlierPenalty(inputs) {
    var penalty = 0;
    if (inputs.growthRate > 220) penalty += 18;
    if (inputs.grossMargin > 95) penalty += 12;
    if (inputs.tam > 1500000) penalty += 8;
    if (inputs.revenueRunRate > 0 && inputs.revenueRunRate < 0.05 && inputs.stage !== "pre-revenue") penalty += 12;
    return clamp(penalty, 0, 45);
  }

  function identifyDrivers(inputs, methods) {
    var benchmark = getBench(inputs);
    var avgMethodBase = methods.reduce(function (sum, m) { return sum + m.base; }, 0) / methods.length;
    var drivers = [
      {
        label: "Revenue multiple baseline in " + inputs.geography + " " + inputs.sector + ": " + benchmark.rev[1].toFixed(1) + "x",
        impact: benchmark.rev[1] * 4,
      },
      {
        label: "Growth profile at " + (inputs.growthRate || 0) + "% annualized",
        impact: (inputs.growthRate || 0) * 0.5,
      },
      {
        label: "Moat vs competition spread: " + inputs.moatStrength + " / " + inputs.competitionIntensity,
        impact: (inputs.moatStrength - inputs.competitionIntensity) * 12,
      },
      {
        label: "Runway and raise plan: " + inputs.runwayMonths + " months, " + formatMoney(inputs.raiseTarget, inputs.geography) + " raise",
        impact: inputs.runwayMonths - (inputs.raiseTarget / Math.max(avgMethodBase, 0.001)) * 12,
      },
      {
        label: "Risk posture (concentration " + inputs.concentrationRisk + ", regulatory " + inputs.regulatoryRisk + ")",
        impact: -1 * (inputs.concentrationRisk + inputs.regulatoryRisk) * 6,
      },
    ];
    return drivers
      .sort(function (a, b) { return Math.abs(b.impact) - Math.abs(a.impact); })
      .slice(0, 5)
      .map(function (item) { return item.label; });
  }

  /* ══════════════════════════════════════════════════════════════
     RENDER RESULTS
     ══════════════════════════════════════════════════════════════ */
  function renderResults(result) {
    var inputs = state.inputs;
    outputEls.company.textContent = inputs.companyName || "Startup";
    outputEls.meta.textContent =
      titleCase(inputs.stage) + " \u2022 " + inputs.sector + " \u2022 " +
      inputs.geography + " \u2022 " + titleCase(inputs.mode);
    outputEls.low.textContent = formatMoney(result.range.low, inputs.geography);
    outputEls.base.textContent = formatMoney(result.range.base, inputs.geography);
    outputEls.high.textContent = formatMoney(result.range.high, inputs.geography);
    outputEls.confidenceScore.textContent = result.confidence.score + "/100";
    outputEls.confidenceLabel.textContent = result.confidence.label + " confidence";
    outputEls.timestamp.textContent = "Benchmark assumptions last updated: " + result.assumptionsDate;

    // Method table
    outputEls.methodTable.innerHTML = "";
    result.methods.forEach(function (method) {
      var row = document.createElement("tr");
      row.innerHTML =
        "<td>" + escapeHtml(method.name) + "</td>" +
        "<td>" + Math.round(method.weight * 100) + "%</td>" +
        "<td>" + escapeHtml(formatMoney(method.low, inputs.geography)) + "</td>" +
        "<td>" + escapeHtml(formatMoney(method.base, inputs.geography)) + "</td>" +
        "<td>" + escapeHtml(formatMoney(method.high, inputs.geography)) + "</td>";
      outputEls.methodTable.appendChild(row);
    });

    // Drivers
    outputEls.drivers.innerHTML = "";
    result.drivers.forEach(function (driver) {
      var li = document.createElement("li");
      li.textContent = driver;
      outputEls.drivers.appendChild(li);
    });
  }

  /* ══════════════════════════════════════════════════════════════
     CHART.JS — Method Comparison & Range Visualization
     ══════════════════════════════════════════════════════════════ */
  function destroyCharts() {
    if (state.charts.methods) { state.charts.methods.destroy(); state.charts.methods = null; }
    if (state.charts.range) { state.charts.range.destroy(); state.charts.range = null; }
  }

  function renderCharts(result) {
    if (typeof Chart === "undefined") return;
    destroyCharts();

    var inputs = state.inputs;
    var methods = result.methods;
    var labels = methods.map(function (m) { return m.name; });

    // Method Comparison — grouped bar
    var ctxMethods = document.getElementById("chart-methods").getContext("2d");
    state.charts.methods = new Chart(ctxMethods, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Low",
            data: methods.map(function (m) { return roundNum(m.low, 2); }),
            backgroundColor: "#c0c0c0",
          },
          {
            label: "Base",
            data: methods.map(function (m) { return roundNum(m.base, 2); }),
            backgroundColor: "#555555",
          },
          {
            label: "High",
            data: methods.map(function (m) { return roundNum(m.high, 2); }),
            backgroundColor: "#1a1a1a",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom", labels: { boxWidth: 14, font: { size: 11 } } },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                return ctx.dataset.label + ": " + formatMoney(ctx.parsed.y, inputs.geography);
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (val) { return formatMoney(val, inputs.geography); },
              font: { size: 10 },
            },
          },
          x: { ticks: { font: { size: 10 } } },
        },
      },
    });

    // Range Visualization — horizontal floating bar
    var rangeLabels = labels.concat(["Blended"]);
    var rangeLow = methods.map(function (m) { return roundNum(m.low, 2); }).concat([roundNum(result.range.low, 2)]);
    var rangeHigh = methods.map(function (m) { return roundNum(m.high, 2); }).concat([roundNum(result.range.high, 2)]);
    var floatingData = rangeLow.map(function (low, i) { return [low, rangeHigh[i]]; });

    var ctxRange = document.getElementById("chart-range").getContext("2d");
    state.charts.range = new Chart(ctxRange, {
      type: "bar",
      data: {
        labels: rangeLabels,
        datasets: [
          {
            label: "Valuation Range",
            data: floatingData,
            backgroundColor: rangeLabels.map(function (_, i) {
              return i === rangeLabels.length - 1 ? "#1a1a1a" : "#888888";
            }),
            borderRadius: 4,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                var raw = ctx.raw;
                return formatMoney(raw[0], inputs.geography) + " \u2013 " + formatMoney(raw[1], inputs.geography);
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              callback: function (val) { return formatMoney(val, inputs.geography); },
              font: { size: 10 },
            },
          },
          y: { ticks: { font: { size: 10 } } },
        },
      },
    });
  }

  /* ══════════════════════════════════════════════════════════════
     PDF EXPORT — html2pdf.js
     ══════════════════════════════════════════════════════════════ */
  function downloadPdfReport(inputs, result) {
    if (typeof html2pdf === "undefined") {
      alert("PDF library not loaded. Please check your internet connection.");
      return;
    }

    // Populate hidden template
    document.getElementById("pdf-company").textContent = inputs.companyName;
    document.getElementById("pdf-meta").textContent =
      titleCase(inputs.stage) + " | " + inputs.sector + " | " + inputs.geography +
      " | Generated: " + formatDate(result.timestamp) + " | Assumptions: " + result.assumptionsDate;
    document.getElementById("pdf-low").textContent = formatMoney(result.range.low, inputs.geography);
    document.getElementById("pdf-base").textContent = formatMoney(result.range.base, inputs.geography);
    document.getElementById("pdf-high").textContent = formatMoney(result.range.high, inputs.geography);
    document.getElementById("pdf-confidence").textContent =
      "Score: " + result.confidence.score + "/100 (" + result.confidence.label + ") \u2014 " +
      "Completeness: " + result.confidence.parts.completeness +
      " | Consistency: " + result.confidence.parts.consistency +
      " | Benchmark coverage: " + result.confidence.parts.benchmarkCoverage;

    // Method table
    var tbody = document.querySelector("#pdf-method-table tbody");
    tbody.innerHTML = "";
    result.methods.forEach(function (m) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" + escapeHtml(m.name) + "</td>" +
        "<td>" + Math.round(m.weight * 100) + "%</td>" +
        "<td>" + escapeHtml(formatMoney(m.low, inputs.geography)) + "</td>" +
        "<td>" + escapeHtml(formatMoney(m.base, inputs.geography)) + "</td>" +
        "<td>" + escapeHtml(formatMoney(m.high, inputs.geography)) + "</td>";
      tbody.appendChild(tr);
    });

    // Drivers
    var driversUl = document.getElementById("pdf-drivers");
    driversUl.innerHTML = "";
    result.drivers.forEach(function (d) {
      var li = document.createElement("li");
      li.textContent = d;
      driversUl.appendChild(li);
    });

    // Clone template, make visible, generate PDF
    var template = document.getElementById("pdf-template");
    var clone = template.cloneNode(true);
    clone.style.display = "block";
    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    document.body.appendChild(clone);

    var filename = safeFilename(inputs.companyName || "startup") + "_valuation_report.pdf";

    html2pdf()
      .set({
        margin: [12, 12, 12, 12],
        filename: filename,
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(clone.querySelector(".pdf-page"))
      .save()
      .then(function () {
        document.body.removeChild(clone);
      })
      .catch(function () {
        document.body.removeChild(clone);
      });
  }

  /* ══════════════════════════════════════════════════════════════
     EXCEL EXPORT — ExcelJS
     ══════════════════════════════════════════════════════════════ */
  function downloadExcelModel(inputs, result) {
    if (typeof ExcelJS === "undefined") {
      alert("Excel library not loaded. Please check your internet connection.");
      return;
    }

    var wb = new ExcelJS.Workbook();
    wb.creator = "Founder Valuation Studio";
    wb.created = new Date();

    var currency = inputs.geography === "US" ? "$" : "\u20AC";

    // ── Summary sheet ──
    var summary = wb.addWorksheet("Summary");
    summary.columns = [
      { header: "Metric", key: "metric", width: 28 },
      { header: "Value", key: "value", width: 28 },
    ];
    applyHeaderStyle(summary);
    addRows(summary, [
      ["Company", inputs.companyName],
      ["Stage", titleCase(inputs.stage)],
      ["Sector", inputs.sector],
      ["Geography", inputs.geography],
      ["Mode", titleCase(inputs.mode)],
      ["Final Low (M)", roundNum(result.range.low, 4)],
      ["Final Base (M)", roundNum(result.range.base, 4)],
      ["Final High (M)", roundNum(result.range.high, 4)],
      ["Confidence", result.confidence.score + "/100 (" + result.confidence.label + ")"],
      ["Generated", formatDate(result.timestamp)],
      ["Assumptions Date", result.assumptionsDate],
    ]);
    applyAlternatingRows(summary);

    // ── Inputs sheet ──
    var inputsSheet = wb.addWorksheet("Inputs");
    inputsSheet.columns = [
      { header: "Field", key: "field", width: 32 },
      { header: "Value", key: "value", width: 24 },
    ];
    applyHeaderStyle(inputsSheet);
    addRows(inputsSheet, [
      ["Company", inputs.companyName],
      ["Mode", titleCase(inputs.mode)],
      ["Stage", titleCase(inputs.stage)],
      ["Sector", inputs.sector],
      ["Geography", inputs.geography],
      ["Business Model", inputs.businessModel],
      ["Founding Year", inputs.foundingYear],
      ["Revenue Run-rate (M)", roundNum(inputs.revenueRunRate, 4)],
      ["Growth %", inputs.growthRate],
      ["Gross Margin %", inputs.grossMargin],
      ["Customers", inputs.customerCount],
      ["CAC", inputs.cac],
      ["LTV", inputs.ltv],
      ["Churn %", inputs.churn],
      ["TAM (M)", roundNum(inputs.tam, 4)],
      ["Competition Intensity", inputs.competitionIntensity],
      ["Moat Strength", inputs.moatStrength],
      ["Founder Experience", inputs.founderExperience],
      ["Concentration Risk", inputs.concentrationRisk],
      ["Regulatory Risk", inputs.regulatoryRisk],
      ["Raise Target (M)", roundNum(inputs.raiseTarget, 4)],
      ["Runway (months)", inputs.runwayMonths],
      ["Target Dilution %", inputs.targetDilution],
      ["NRR %", inputs.nrr],
      ["Pipeline Coverage", inputs.pipelineCoverage],
      ["Burn Multiple", inputs.burnMultiple],
      ["Projected CAGR %", inputs.projectedCagr],
    ]);
    applyAlternatingRows(inputsSheet);

    // ── Methods sheet ──
    var methodsSheet = wb.addWorksheet("Methods");
    methodsSheet.columns = [
      { header: "Method", key: "method", width: 22 },
      { header: "Weight %", key: "weight", width: 12 },
      { header: "Low (M)", key: "low", width: 16 },
      { header: "Base (M)", key: "base", width: 16 },
      { header: "High (M)", key: "high", width: 16 },
    ];
    applyHeaderStyle(methodsSheet);
    result.methods.forEach(function (m) {
      methodsSheet.addRow({
        method: m.name,
        weight: Math.round(m.weight * 100),
        low: roundNum(m.low, 4),
        base: roundNum(m.base, 4),
        high: roundNum(m.high, 4),
      });
    });
    applyAlternatingRows(methodsSheet);

    // ── Scenarios sheet ──
    var scenarios = wb.addWorksheet("Scenarios");
    scenarios.columns = [
      { header: "Scenario", key: "scenario", width: 28 },
      { header: "Valuation (M)", key: "valuation", width: 20 },
    ];
    applyHeaderStyle(scenarios);
    addRows(scenarios, [
      ["Low", roundNum(result.range.low, 4)],
      ["Base", roundNum(result.range.base, 4)],
      ["High", roundNum(result.range.high, 4)],
      ["Sensitivity Growth", state.sensitivity.growth + "%"],
      ["Sensitivity Multiple", state.sensitivity.multiple + "%"],
      ["Sensitivity Discount", state.sensitivity.discount + "%"],
    ]);
    applyAlternatingRows(scenarios);

    // Generate and download
    wb.xlsx.writeBuffer().then(function (buffer) {
      var blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      var filename = safeFilename(inputs.companyName || "startup") + "_valuation_model.xlsx";
      triggerDownload(blob, filename);
    });
  }

  function applyHeaderStyle(sheet) {
    var headerRow = sheet.getRow(1);
    headerRow.eachCell(function (cell) {
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF111111" } };
      cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
      cell.alignment = { vertical: "middle" };
    });
    headerRow.height = 24;
  }

  function addRows(sheet, data) {
    data.forEach(function (row) {
      sheet.addRow(row);
    });
  }

  function applyAlternatingRows(sheet) {
    sheet.eachRow(function (row, rowNumber) {
      if (rowNumber <= 1) return;
      if (rowNumber % 2 === 0) {
        row.eachCell(function (cell) {
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF5F5F5" } };
        });
      }
    });
  }

  /* ══════════════════════════════════════════════════════════════
     UTILITY FUNCTIONS
     ══════════════════════════════════════════════════════════════ */
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
    var raw = String(value || "0").replace(/[^0-9.\-]/g, "");
    var n = parseFloat(raw);
    return Number.isFinite(n) && n > 0 ? n / 1000000 : 0;
  }

  function toNumber(value, fallback) {
    var raw = String(value || "").replace(/[^0-9.\-]/g, "");
    var n = Number(raw);
    return Number.isFinite(n) ? n : fallback;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function scale(value, inMin, inMax, outMin, outMax) {
    var ratio = (value - inMin) / (inMax - inMin);
    return outMin + clamp(ratio, 0, 1) * (outMax - outMin);
  }

  function roundNum(value, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  }

  function formatMoney(millions, geography) {
    var symbol = geography === "US" ? "$" : "\u20AC";
    if (millions >= 1000) return symbol + (millions / 1000).toFixed(2) + "B";
    return symbol + millions.toFixed(2) + "M";
  }

  function formatNumberCommas(n) {
    var parts = n.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  function titleCase(value) {
    return String(value)
      .replace(/-/g, " ")
      .replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }

  function formatDate(date) {
    return date.toLocaleString(undefined, {
      year: "numeric", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit",
    });
  }

  function safeFilename(value) {
    return String(value).trim().replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "").slice(0, 60);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function triggerDownload(blob, filename) {
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 500);
  }

})();

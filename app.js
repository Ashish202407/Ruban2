(function () {
  /* ══════════════════════════════════════════════════════════════
     CONSTANTS — benchmarks, weights, exposures
     ══════════════════════════════════════════════════════════════ */
  var BENCHMARKS = {
    US: {
      "SaaS": { rev: [4.2, 7.8, 12.5], ebitda: [12, 18, 24], preseed: 6.0 },
      "AI-native software": { rev: [6.2, 10.8, 16.0], ebitda: [14, 21, 28], preseed: 7.0 },
      "E-commerce/D2C": { rev: [1.3, 2.3, 3.6], ebitda: [7, 10, 14], preseed: 4.0 },
      "Marketplace": { rev: [2.8, 4.6, 7.3], ebitda: [10, 15, 21], preseed: 5.0 },
      "Fintech": { rev: [3.6, 6.3, 9.8], ebitda: [11, 17, 24], preseed: 5.5 },
      "Healthtech": { rev: [3.0, 5.3, 8.0], ebitda: [9, 14, 20], preseed: 4.8 },
      "Edtech": { rev: [2.5, 4.8, 7.5], ebitda: [8, 12, 17], preseed: 4.2 },
      "Biotech/Deeptech": { rev: [3.8, 7.0, 11.0], ebitda: [10, 16, 22], preseed: 5.5 },
      "Climate/Cleantech": { rev: [3.0, 5.5, 8.8], ebitda: [9, 14, 19], preseed: 4.8 },
      "Consumer App": { rev: [1.8, 3.2, 5.2], ebitda: [6, 9, 13], preseed: 3.5 },
    },
    Europe: {
      "SaaS": { rev: [3.2, 6.1, 9.6], ebitda: [10, 15, 21], preseed: 4.8 },
      "AI-native software": { rev: [5.0, 8.5, 12.8], ebitda: [11, 18, 24], preseed: 5.8 },
      "E-commerce/D2C": { rev: [1.0, 1.8, 2.9], ebitda: [6, 9, 12], preseed: 3.2 },
      "Marketplace": { rev: [2.2, 3.8, 5.8], ebitda: [8, 13, 18], preseed: 4.1 },
      "Fintech": { rev: [2.9, 5.2, 7.9], ebitda: [9, 14, 20], preseed: 4.5 },
      "Healthtech": { rev: [2.4, 4.2, 6.7], ebitda: [8, 12, 17], preseed: 4.0 },
      "Edtech": { rev: [1.9, 3.7, 5.8], ebitda: [7, 10, 14], preseed: 3.4 },
      "Biotech/Deeptech": { rev: [3.0, 5.5, 8.8], ebitda: [8, 13, 19], preseed: 4.5 },
      "Climate/Cleantech": { rev: [2.4, 4.3, 7.0], ebitda: [7, 12, 16], preseed: 3.9 },
      "Consumer App": { rev: [1.4, 2.5, 4.0], ebitda: [5, 8, 11], preseed: 2.8 },
    },
    MENA: {
      "SaaS": { rev: [2.8, 5.2, 8.2], ebitda: [8, 12, 17], preseed: 4.0 },
      "AI-native software": { rev: [4.0, 7.2, 10.8], ebitda: [10, 15, 20], preseed: 4.8 },
      "E-commerce/D2C": { rev: [1.4, 2.5, 4.0], ebitda: [6, 9, 13], preseed: 3.2 },
      "Marketplace": { rev: [2.2, 3.8, 6.0], ebitda: [7, 11, 15], preseed: 3.8 },
      "Fintech": { rev: [2.8, 5.0, 7.8], ebitda: [8, 13, 18], preseed: 4.2 },
      "Healthtech": { rev: [2.0, 3.6, 5.5], ebitda: [7, 10, 14], preseed: 3.4 },
      "Edtech": { rev: [2.0, 3.8, 6.0], ebitda: [7, 10, 14], preseed: 3.5 },
      "Biotech/Deeptech": { rev: [2.5, 4.5, 7.2], ebitda: [7, 11, 16], preseed: 3.8 },
      "Climate/Cleantech": { rev: [2.2, 4.0, 6.3], ebitda: [7, 10, 14], preseed: 3.5 },
      "Consumer App": { rev: [1.5, 2.7, 4.3], ebitda: [5, 8, 11], preseed: 2.8 },
    },
    "India/South Asia": {
      "SaaS": { rev: [2.5, 4.6, 7.3], ebitda: [7, 11, 16], preseed: 3.5 },
      "AI-native software": { rev: [3.6, 6.5, 9.8], ebitda: [9, 14, 19], preseed: 4.2 },
      "E-commerce/D2C": { rev: [1.2, 2.2, 3.5], ebitda: [5, 8, 11], preseed: 2.8 },
      "Marketplace": { rev: [2.0, 3.5, 5.5], ebitda: [7, 10, 14], preseed: 3.4 },
      "Fintech": { rev: [2.5, 4.5, 7.0], ebitda: [8, 12, 17], preseed: 3.8 },
      "Healthtech": { rev: [1.8, 3.2, 5.0], ebitda: [6, 9, 13], preseed: 3.0 },
      "Edtech": { rev: [2.2, 4.0, 6.3], ebitda: [7, 10, 14], preseed: 3.5 },
      "Biotech/Deeptech": { rev: [2.2, 4.0, 6.5], ebitda: [7, 10, 15], preseed: 3.4 },
      "Climate/Cleantech": { rev: [1.8, 3.4, 5.4], ebitda: [6, 9, 13], preseed: 3.0 },
      "Consumer App": { rev: [1.5, 2.8, 4.5], ebitda: [5, 7, 10], preseed: 2.8 },
    },
    "Southeast Asia": {
      "SaaS": { rev: [2.6, 4.8, 7.6], ebitda: [8, 12, 16], preseed: 3.8 },
      "AI-native software": { rev: [3.8, 6.8, 10.2], ebitda: [9, 14, 19], preseed: 4.5 },
      "E-commerce/D2C": { rev: [1.5, 2.6, 4.2], ebitda: [6, 9, 12], preseed: 3.2 },
      "Marketplace": { rev: [2.4, 4.0, 6.2], ebitda: [7, 11, 15], preseed: 3.8 },
      "Fintech": { rev: [2.6, 4.6, 7.2], ebitda: [8, 12, 17], preseed: 4.0 },
      "Healthtech": { rev: [1.9, 3.4, 5.2], ebitda: [6, 10, 13], preseed: 3.2 },
      "Edtech": { rev: [1.8, 3.4, 5.4], ebitda: [6, 9, 13], preseed: 3.0 },
      "Biotech/Deeptech": { rev: [2.4, 4.3, 6.8], ebitda: [7, 11, 15], preseed: 3.6 },
      "Climate/Cleantech": { rev: [2.0, 3.6, 5.8], ebitda: [6, 10, 14], preseed: 3.2 },
      "Consumer App": { rev: [1.8, 3.2, 5.0], ebitda: [5, 8, 11], preseed: 3.0 },
    },
    LATAM: {
      "SaaS": { rev: [2.2, 4.2, 6.6], ebitda: [7, 10, 14], preseed: 3.2 },
      "AI-native software": { rev: [3.4, 6.0, 9.2], ebitda: [8, 13, 17], preseed: 4.0 },
      "E-commerce/D2C": { rev: [1.1, 2.0, 3.2], ebitda: [5, 7, 10], preseed: 2.5 },
      "Marketplace": { rev: [1.8, 3.2, 5.0], ebitda: [6, 9, 13], preseed: 3.0 },
      "Fintech": { rev: [2.4, 4.2, 6.5], ebitda: [7, 11, 15], preseed: 3.5 },
      "Healthtech": { rev: [1.7, 3.0, 4.6], ebitda: [6, 9, 12], preseed: 2.8 },
      "Edtech": { rev: [1.5, 2.8, 4.5], ebitda: [5, 8, 12], preseed: 2.6 },
      "Biotech/Deeptech": { rev: [2.0, 3.8, 6.0], ebitda: [6, 10, 14], preseed: 3.2 },
      "Climate/Cleantech": { rev: [1.8, 3.2, 5.2], ebitda: [6, 9, 13], preseed: 2.8 },
      "Consumer App": { rev: [1.2, 2.2, 3.5], ebitda: [4, 6, 9], preseed: 2.2 },
    },
  };

  var CURRENCY_MAP = {
    "US": "$", "Europe": "\u20AC", "MENA": "$",
    "India/South Asia": "\u20B9", "Southeast Asia": "$", "LATAM": "$"
  };

  var METHOD_WEIGHTS = {
    "pre-revenue": { Scorecard: 0.4, Berkus: 0.35, "Risk Factor": 0.25 },
    "pre-revenue-ctd": { Scorecard: 0.3, Berkus: 0.25, "Risk Factor": 0.2, "Cost-to-Duplicate": 0.25 },
    "early-revenue": { "Revenue Multiple": 0.45, "VC Method": 0.35, "DCF-lite": 0.2 },
    growth: { "Comps Blend": 0.45, DCF: 0.4, "VC Method": 0.15 },
  };

  var EXPOSURES = {
    Berkus: { growth: 0.15, multiple: 0.2, discount: 0.1 },
    Scorecard: { growth: 0.22, multiple: 0.28, discount: 0.08 },
    "Risk Factor": { growth: 0.08, multiple: 0.12, discount: 0.08 },
    "Cost-to-Duplicate": { growth: 0.05, multiple: 0.15, discount: 0.08 },
    "Revenue Multiple": { growth: 0.35, multiple: 0.5, discount: 0.15 },
    "VC Method": { growth: 0.45, multiple: 0.35, discount: 0.4 },
    "DCF-lite": { growth: 0.35, multiple: 0.1, discount: 0.5 },
    "Comps Blend": { growth: 0.25, multiple: 0.55, discount: 0.2 },
    DCF: { growth: 0.32, multiple: 0.1, discount: 0.55 },
    "Comparable Transactions": { growth: 0.1, multiple: 0.45, discount: 0.1 },
  };

  var PUBLIC_COMPS = {
    "SaaS": [
      { name: "Salesforce", ticker: "CRM", evRev: 7.8 },
      { name: "ServiceNow", ticker: "NOW", evRev: 16.2 },
      { name: "Datadog", ticker: "DDOG", evRev: 15.8 },
      { name: "HubSpot", ticker: "HUBS", evRev: 12.4 },
    ],
    "AI-native software": [
      { name: "Palantir", ticker: "PLTR", evRev: 22.5 },
      { name: "C3.ai", ticker: "AI", evRev: 9.8 },
      { name: "UiPath", ticker: "PATH", evRev: 8.2 },
      { name: "SoundHound AI", ticker: "SOUN", evRev: 28.0 },
    ],
    "Fintech": [
      { name: "Block (Square)", ticker: "XYZ", evRev: 2.8 },
      { name: "Adyen", ticker: "ADYEN", evRev: 14.5 },
      { name: "Affirm", ticker: "AFRM", evRev: 5.2 },
      { name: "Toast", ticker: "TOST", evRev: 4.8 },
    ],
    "Healthtech": [
      { name: "Veeva Systems", ticker: "VEEV", evRev: 12.8 },
      { name: "Doximity", ticker: "DOCS", evRev: 10.5 },
      { name: "Evolent Health", ticker: "EVH", evRev: 2.4 },
    ],
    "E-commerce/D2C": [
      { name: "Shopify", ticker: "SHOP", evRev: 14.2 },
      { name: "Chewy", ticker: "CHWY", evRev: 1.2 },
      { name: "Etsy", ticker: "ETSY", evRev: 4.6 },
    ],
    "Marketplace": [
      { name: "Airbnb", ticker: "ABNB", evRev: 8.8 },
      { name: "DoorDash", ticker: "DASH", evRev: 5.2 },
      { name: "Fiverr", ticker: "FVRR", evRev: 4.8 },
    ],
    "Edtech": [
      { name: "Coursera", ticker: "COUR", evRev: 3.2 },
      { name: "Duolingo", ticker: "DUOL", evRev: 14.5 },
      { name: "Chegg", ticker: "CHGG", evRev: 1.2 },
    ],
    "Biotech/Deeptech": [
      { name: "Twist Bioscience", ticker: "TWST", evRev: 8.5 },
      { name: "Ginkgo Bioworks", ticker: "DNA", evRev: 5.2 },
      { name: "Recursion Pharma", ticker: "RXRX", evRev: 18.0 },
    ],
    "Climate/Cleantech": [
      { name: "Enphase Energy", ticker: "ENPH", evRev: 5.8 },
      { name: "ChargePoint", ticker: "CHPT", evRev: 2.2 },
      { name: "Stem Inc", ticker: "STEM", evRev: 1.8 },
    ],
    "Consumer App": [
      { name: "Spotify", ticker: "SPOT", evRev: 4.5 },
      { name: "Pinterest", ticker: "PINS", evRev: 6.8 },
      { name: "Bumble", ticker: "BMBL", evRev: 3.2 },
    ],
  };


  /* ══════════════════════════════════════════════════════════════
     LOGO BASE64 (for PDF)
     ══════════════════════════════════════════════════════════════ */
  var LOGO_BASE64 = "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";

  /* ══════════════════════════════════════════════════════════════
     STATE
     ══════════════════════════════════════════════════════════════ */
  var state = {
    mode: null,
    currentStep: 1,
    maxVisitedStep: 1,
    stepData: { 1: {}, 2: {}, 3: {}, 4: {}, 5: {} },
    compCount: 1,
    inputs: null,
    rawResult: null,
    sensitivity: { growth: 0, multiple: 0, discount: 0 },
    charts: { methods: null, range: null, captable: null },
  };

  /* ══════════════════════════════════════════════════════════════
     DOM REFERENCES
     ══════════════════════════════════════════════════════════════ */
  var wizardSteps = document.querySelectorAll(".wizard-step");
  var progressSteps = document.querySelectorAll(".progress-step");
  var progressLines = document.querySelectorAll(".progress-line");
  var progressFill = document.getElementById("progress-fill");
  var btnNext = document.getElementById("btn-next");
  var btnBack = document.getElementById("btn-back");
  var warningEl = document.getElementById("wizard-warning");
  var resultsEl = document.getElementById("results");
  var stageSelect = document.getElementById("stage-select");

  var outputEls = {
    company: document.getElementById("result-company"),
    meta: document.getElementById("result-meta"),
    low: document.getElementById("range-low"),
    base: document.getElementById("range-base"),
    high: document.getElementById("range-high"),
    methodTable: document.getElementById("method-table"),
    drivers: document.getElementById("driver-list"),
    timestamp: document.getElementById("timestamp"),
  };

  var sensitivityEls = {
    growth: document.getElementById("sensitivity-growth"),
    multiple: document.getElementById("sensitivity-multiple"),
    discount: document.getElementById("sensitivity-discount"),
    growthVal: document.getElementById("sensitivity-growth-value"),
    multipleVal: document.getElementById("sensitivity-multiple-value"),
    discountVal: document.getElementById("sensitivity-discount-value"),
  };

  var downloadReportBtn = document.getElementById("download-report");
  var downloadModelBtn = document.getElementById("download-model");
  var startOverBtn = document.getElementById("btn-start-over");
  var addCompBtn = document.getElementById("add-comp-btn");

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

    // Progress step clicks
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
      state.compCount = 1;
      state.inputs = null;
      state.rawResult = null;
      state.sensitivity = { growth: 0, multiple: 0, discount: 0 };
      destroyCharts();
      resultsEl.classList.add("hidden");
      document.querySelector(".wizard-panel").classList.remove("hidden");
      document.querySelectorAll(".mode-card").forEach(function (c) { c.classList.remove("selected"); });
      clearAllFields();
      resetCompRows();
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
    initFmtNumber(document);

    // Inline validation on blur
    document.querySelectorAll(".field input, .field select").forEach(function (el) {
      el.addEventListener("blur", function () {
        var field = el.closest(".field");
        if (!field) return;
        if (field.classList.contains("hidden") || field.offsetParent === null) return;
        validateSingleField(field);
      });
    });

    // Add comp button
    if (addCompBtn) {
      addCompBtn.addEventListener("click", function () {
        if (state.compCount >= 3) return;
        state.compCount++;
        addCompRow(state.compCount);
        if (state.compCount >= 3) addCompBtn.disabled = true;
      });
    }

    // Cap table sliders
    var ctPremoney = document.getElementById("captable-premoney");
    var ctRaise = document.getElementById("captable-raise");
    if (ctPremoney) ctPremoney.addEventListener("input", updateCapTable);
    if (ctRaise) ctRaise.addEventListener("input", updateCapTable);

    goToStep(1);
  }

  function initFmtNumber(root) {
    root.querySelectorAll(".fmt-number").forEach(function (input) {
      if (input._fmtBound) return;
      input._fmtBound = true;
      input.addEventListener("focus", function () {
        var raw = input.getAttribute("data-raw-value");
        if (raw) input.value = raw;
      });
      input.addEventListener("blur", function () {
        var raw = input.value.replace(/[^0-9.\-]/g, "");
        input.setAttribute("data-raw-value", raw);
        var n = parseFloat(raw);
        if (Number.isFinite(n)) input.value = formatNumberCommas(n);
      });
    });
  }

  function addCompRow(num) {
    var container = document.getElementById("comp-rows");
    var row = document.createElement("div");
    row.className = "comp-row";
    row.setAttribute("data-comp", num);
    row.innerHTML =
      '<input type="text" name="compName' + num + '" placeholder="Company name" class="comp-input" />' +
      '<input type="text" name="compVal' + num + '" placeholder="Valuation ($M)" class="comp-input fmt-number" data-raw-value="" />' +
      '<input type="text" name="compRev' + num + '" placeholder="Revenue ($M)" class="comp-input fmt-number" data-raw-value="" />' +
      '<select name="compStage' + num + '" class="comp-input">' +
        '<option value="">Stage</option>' +
        '<option value="pre-revenue">Pre-revenue</option>' +
        '<option value="early-revenue">Early revenue</option>' +
        '<option value="growth">Growth</option>' +
      '</select>';
    container.appendChild(row);
    initFmtNumber(row);
  }

  function resetCompRows() {
    var container = document.getElementById("comp-rows");
    if (!container) return;
    container.innerHTML =
      '<div class="comp-row" data-comp="1">' +
        '<input type="text" name="compName1" placeholder="Company name" class="comp-input" />' +
        '<input type="text" name="compVal1" placeholder="Valuation ($M)" class="comp-input fmt-number" data-raw-value="" />' +
        '<input type="text" name="compRev1" placeholder="Revenue ($M)" class="comp-input fmt-number" data-raw-value="" />' +
        '<select name="compStage1" class="comp-input">' +
          '<option value="">Stage</option>' +
          '<option value="pre-revenue">Pre-revenue</option>' +
          '<option value="early-revenue">Early revenue</option>' +
          '<option value="growth">Growth</option>' +
        '</select>' +
      '</div>';
    initFmtNumber(container);
    state.compCount = 1;
    if (addCompBtn) addCompBtn.disabled = false;
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

    wizardSteps.forEach(function (el) {
      var s = parseInt(el.dataset.step, 10);
      el.classList.toggle("hidden", s !== step);
    });

    applyDynamicVisibility();
    restoreStepData(step);
    updateProgress();

    btnBack.disabled = step === 1;
    btnNext.textContent = step === 5 ? "Run Valuation" : "Next";
    warningEl.textContent = "";
  }

  function updateProgress() {
    var step = state.currentStep;

    progressSteps.forEach(function (el) {
      var s = parseInt(el.dataset.step, 10);
      el.classList.remove("active", "completed");
      if (s === step) {
        el.classList.add("active");
      } else if (s < step) {
        el.classList.add("completed");
        var numEl = el.querySelector(".step-num");
        if (numEl) numEl.innerHTML = "&#10003;";
      } else {
        var numEl2 = el.querySelector(".step-num");
        if (numEl2) numEl2.textContent = s;
      }
    });

    progressLines.forEach(function (line, idx) {
      line.classList.toggle("filled", idx < step - 1);
    });

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

    document.querySelectorAll(".prerev-field").forEach(function (el) {
      el.classList.toggle("hidden", !isPreRevenue);
    });
    document.querySelectorAll(".rev-field").forEach(function (el) {
      if (el.classList.contains("deep-field")) {
        el.classList.toggle("hidden", isPreRevenue || !isDeep);
      } else {
        el.classList.toggle("hidden", isPreRevenue);
      }
    });

    document.querySelectorAll(".deep-field").forEach(function (el) {
      if (el.classList.contains("rev-field")) return;
      el.classList.toggle("hidden", !isDeep);
    });

    var descEl = document.getElementById("step3-desc");
    if (descEl) {
      descEl.textContent = isPreRevenue
        ? "Tell us about your product stage and early traction."
        : "Enter your financial metrics and unit economics.";
    }
  }

  function getStageValue() {
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
      var field = el.closest(".field");
      // For comp inputs, always save them
      if (el.classList.contains("comp-input")) {
        if (el.classList.contains("fmt-number")) {
          data[el.name] = el.getAttribute("data-raw-value") || el.value.replace(/[^0-9.\-]/g, "");
        } else {
          data[el.name] = el.value;
        }
        return;
      }
      if (field && (field.classList.contains("hidden") || field.offsetParent === null)) return;

      if (el.classList.contains("fmt-number")) {
        data[el.name] = el.getAttribute("data-raw-value") || el.value.replace(/[^0-9.\-]/g, "");
      } else {
        data[el.name] = el.value;
      }
    });

    if (state.currentStep === 1) data.mode = state.mode;
    if (state.currentStep === 3) data._compCount = state.compCount;

    state.stepData[state.currentStep] = data;
  }

  function restoreStepData(step) {
    var data = state.stepData[step];
    if (!data) return;
    var stepEl = document.querySelector('.wizard-step[data-step="' + step + '"]');
    if (!stepEl) return;

    if (step === 1 && data.mode) {
      state.mode = data.mode;
      document.querySelectorAll(".mode-card").forEach(function (c) {
        c.classList.toggle("selected", c.dataset.mode === data.mode);
      });
    }

    // Restore comp rows for step 3
    if (step === 3 && data._compCount && data._compCount > 1) {
      for (var ci = 2; ci <= data._compCount; ci++) {
        if (!document.querySelector('.comp-row[data-comp="' + ci + '"]')) {
          state.compCount = ci;
          addCompRow(ci);
        }
      }
      if (state.compCount >= 3 && addCompBtn) addCompBtn.disabled = true;
    }

    Object.keys(data).forEach(function (name) {
      if (name === "mode" || name === "_compCount") return;
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

    var stepEl = document.querySelector('.wizard-step[data-step="' + step + '"]');
    if (!stepEl) return errors;

    var fields = stepEl.querySelectorAll(".field");
    fields.forEach(function (field) {
      if (field.classList.contains("hidden") || field.offsetParent === null) return;
      var result = validateSingleField(field);
      if (result) errors.push(result);
    });

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

    if (input.type === "text" && !input.classList.contains("fmt-number")) {
      if (!value.trim()) error = "This field is required.";
    }

    if (input.type === "number" || input.classList.contains("fmt-number")) {
      var n = parseFloat(value);
      if (input.name === "companyName") {
        // skip
      } else if (value && !Number.isFinite(n)) {
        error = "Enter a valid number.";
      } else if (input.min && Number.isFinite(n) && n < parseFloat(input.min)) {
        error = "Minimum value is " + input.min + ".";
      } else if (input.max && Number.isFinite(n) && n > parseFloat(input.max)) {
        error = "Maximum value is " + input.max + ".";
      }
    }

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

    // Collect comparable transactions
    var compDeals = [];
    for (var ci = 1; ci <= 3; ci++) {
      var cName = d["compName" + ci];
      var cVal = parseFloat(String(d["compVal" + ci] || "").replace(/[^0-9.\-]/g, ""));
      var cRev = parseFloat(String(d["compRev" + ci] || "").replace(/[^0-9.\-]/g, ""));
      var cStage = d["compStage" + ci];
      if (cName && Number.isFinite(cVal) && cVal > 0) {
        compDeals.push({ name: cName, valuation: cVal, revenue: Number.isFinite(cRev) && cRev > 0 ? cRev : 0, stage: cStage || "" });
      }
    }

    var mapped = {
      mode: state.mode || "quick",
      companyName: (d.companyName || "Unnamed startup").trim(),
      stage: stage,
      sector: d.sector || "SaaS",
      geography: d.geography || "US",
      businessModel: d.businessModel || "B2B",
      foundingYear: toNumber(d.foundingYear, 2022),
      aiIntegrated: d.aiIntegrated || "no",
      ipPortfolio: d.ipPortfolio || "none",
      strategicPartnerships: d.strategicPartnerships || "none",
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
      teamCompleteness: toNumber(d.teamCompleteness, 3),
      bizPlanQuality: toNumber(d.bizPlanQuality, 3),
      raiseTarget: toMoneyMillions(d.raiseTarget),
      runwayMonths: toNumber(d.runwayMonths, 18),
      targetDilution: toNumber(d.targetDilution, 18),
      founderOwnership: toNumber(d.founderOwnership, 80),
      esopPool: toNumber(d.esopPool, 10),
      existingInvestor: toNumber(d.existingInvestor, 10),
      nrr: toNumber(d.nrr, 100),
      pipelineCoverage: toNumber(d.pipelineCoverage, 2.5),
      burnMultiple: toNumber(d.burnMultiple, 1.8),
      projectedCagr: toNumber(d.projectedCagr, 30),
      productStage: d.productStage || "mvp",
      earlyUsers: toNumber(d.earlyUsers, 0),
      teamSize: toNumber(d.teamSize, 0),
      devMonths: toNumber(d.devMonths, 0),
      techComplexity: toNumber(d.techComplexity, 3),
      ipPatents: d.ipPatents || "no",
      compDeals: compDeals,
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
    renderMetricsStrip(state.rawResult);
    renderPublicComps(inputs);
    initCapTable(inputs, state.rawResult);
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
    renderMetricsStrip(state.rawResult);
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
     VALUATION ENGINE
     ══════════════════════════════════════════════════════════════ */
  function runValuation(inputs, sensitivity) {
    var methods = [];
    var qualitySignals = computeQualitySignals(inputs);

    if (inputs.stage === "pre-revenue") {
      methods.push(calcScorecard(inputs));
      methods.push(calcBerkus(inputs));
      methods.push(calcRiskFactor(inputs));
      if (inputs.teamSize > 0 && inputs.devMonths > 0) {
        methods.push(calcCostToDuplicate(inputs));
      }
    } else if (inputs.stage === "early-revenue") {
      methods.push(calcRevenueMultiple(inputs));
      methods.push(calcVcMethod(inputs));
      methods.push(calcDcfLite(inputs));
    } else {
      methods.push(calcCompsBlend(inputs));
      methods.push(calcDcf(inputs));
      methods.push(calcVcMethod(inputs));
    }

    // Apply quality multipliers to revenue-based methods
    if (inputs.stage !== "pre-revenue") {
      methods = methods.map(function (m) { return applyQualityMultipliers(m, qualitySignals, inputs); });
    }

    // Add Comparable Transactions if user provided comp deals
    if (inputs.compDeals.length > 0) {
      var compResult = calcComparableTransactions(inputs);
      if (compResult) methods.push(compResult);
    }

    var adjustedMethods = methods.map(function (method) { return applySensitivity(method, sensitivity); });
    var weights = resolveWeights(inputs, adjustedMethods);
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
      qualitySignals: qualitySignals,
      timestamp: new Date(),
      assumptionsDate: "March 2, 2026",
    };
  }

  /* ── Quality Signals ── */
  function computeQualitySignals(inputs) {
    var signals = { rule40: null, unitEcon: null, aiPremium: inputs.aiIntegrated === "yes" };

    // Rule of 40 (revenue-stage only)
    if (inputs.stage !== "pre-revenue" && inputs.growthRate && inputs.grossMargin) {
      var rule40Score = inputs.growthRate + inputs.grossMargin;
      var grade, multiplier;
      if (rule40Score >= 80) { grade = "Excellent"; multiplier = 1.15; }
      else if (rule40Score >= 60) { grade = "Good"; multiplier = 1.08; }
      else if (rule40Score >= 40) { grade = "Good"; multiplier = 1.02; }
      else if (rule40Score >= 30) { grade = "Fair"; multiplier = 1.0; }
      else if (rule40Score >= 20) { grade = "Fair"; multiplier = 0.95; }
      else { grade = "Weak"; multiplier = 0.88; }
      signals.rule40 = { score: rule40Score, grade: grade, multiplier: multiplier };
    }

    // Unit Economics (revenue-stage, when LTV & CAC provided)
    if (inputs.stage !== "pre-revenue" && inputs.ltv > 0 && inputs.cac > 0) {
      var ltvCac = inputs.ltv / inputs.cac;
      var paybackMonths = inputs.cac > 0 ? Math.round((inputs.cac / (inputs.ltv / 36)) * 10) / 10 : 0;
      var ueGrade, ueMultiplier;
      if (ltvCac >= 5) { ueGrade = "Excellent"; ueMultiplier = 1.15; }
      else if (ltvCac >= 3) { ueGrade = "Good"; ueMultiplier = 1.06; }
      else if (ltvCac >= 2) { ueGrade = "Fair"; ueMultiplier = 0.97; }
      else { ueGrade = "Weak"; ueMultiplier = 0.88; }
      signals.unitEcon = { ltvCac: ltvCac, paybackMonths: paybackMonths, grade: ueGrade, multiplier: ueMultiplier };
    }

    return signals;
  }

  function applyQualityMultipliers(method, signals, inputs) {
    var multiplier = 1.0;
    // Rule of 40 — applies to revenue-based methods
    if (signals.rule40) {
      var r40Methods = ["Revenue Multiple", "Comps Blend", "VC Method"];
      if (r40Methods.indexOf(method.name) !== -1) {
        multiplier *= signals.rule40.multiplier;
      }
    }
    // Unit economics
    if (signals.unitEcon) {
      var ueTargets = ["Revenue Multiple", "Comps Blend", "DCF-lite", "DCF"];
      if (ueTargets.indexOf(method.name) !== -1) {
        multiplier *= signals.unitEcon.multiplier;
      }
    }
    if (multiplier === 1.0) return method;
    return { name: method.name, low: method.low * multiplier, base: method.base * multiplier, high: method.high * multiplier };
  }

  function getAiAdjustedBench(inputs) {
    var bench = getBench(inputs);
    if (inputs.aiIntegrated !== "yes") return bench;
    return {
      rev: [bench.rev[0] * 1.175, bench.rev[1] * 1.175, bench.rev[2] * 1.175],
      ebitda: bench.ebitda,
      preseed: bench.preseed * 1.10,
    };
  }

  /* ── Existing Methods (updated for AI premium + Deep Dive signals) ── */
  function calcBerkus(inputs) {
    var benchmark = getAiAdjustedBench(inputs);
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
    var benchmark = getAiAdjustedBench(inputs);
    var basePremoney = benchmark.preseed;

    var weightedScore;
    if (inputs.mode === "deep") {
      // Deep mode: blend in IP, partnerships, team completeness, biz plan at 15% total
      var ipScore = inputs.ipPortfolio === "granted" ? 5 : inputs.ipPortfolio === "pending" ? 3.5 : 2;
      var partnerScore = inputs.strategicPartnerships === "exclusive" ? 5 :
        inputs.strategicPartnerships === "formal" ? 4 :
        inputs.strategicPartnerships === "informal" ? 3 : 1.5;
      var deepSignal =
        0.04 * scale(ipScore, 1, 5, 0.8, 1.2) +
        0.04 * scale(partnerScore, 1, 5, 0.8, 1.2) +
        0.04 * scale(inputs.teamCompleteness, 1, 5, 0.78, 1.22) +
        0.03 * scale(inputs.bizPlanQuality, 1, 5, 0.8, 1.2);
      weightedScore =
        0.255 * scale(inputs.founderExperience, 1, 5, 0.75, 1.25) +
        0.2125 * scale(scoreFromTam(inputs.tam), 1, 5, 0.8, 1.25) +
        0.17 * scale(inputs.moatStrength, 1, 5, 0.78, 1.23) +
        0.1275 * scale(6 - inputs.competitionIntensity, 1, 5, 0.8, 1.18) +
        0.085 * scale(scoreFromCustomers(inputs.customerCount), 1, 5, 0.78, 1.2) +
        deepSignal;
    } else {
      weightedScore =
        0.3 * scale(inputs.founderExperience, 1, 5, 0.75, 1.25) +
        0.25 * scale(scoreFromTam(inputs.tam), 1, 5, 0.8, 1.25) +
        0.2 * scale(inputs.moatStrength, 1, 5, 0.78, 1.23) +
        0.15 * scale(6 - inputs.competitionIntensity, 1, 5, 0.8, 1.18) +
        0.1 * scale(scoreFromCustomers(inputs.customerCount), 1, 5, 0.78, 1.2);
    }
    var base = basePremoney * weightedScore;
    return { name: "Scorecard", low: base * 0.8, base: base, high: base * 1.2 };
  }

  function calcRiskFactor(inputs) {
    var benchmark = getAiAdjustedBench(inputs);
    var base = benchmark.preseed;
    var adjustments =
      (inputs.founderExperience - 3) * 0.25 +
      (inputs.moatStrength - 3) * 0.2 -
      (inputs.competitionIntensity - 3) * 0.22 -
      (inputs.concentrationRisk - 3) * 0.2 -
      (inputs.regulatoryRisk - 3) * 0.18;

    // Deep Dive adjustments
    if (inputs.mode === "deep") {
      // IP adjustment
      if (inputs.ipPortfolio === "granted") adjustments += 0.35;
      else if (inputs.ipPortfolio === "pending") adjustments += 0.15;
      // Partnership adjustment
      if (inputs.strategicPartnerships === "exclusive") adjustments += 0.35;
      else if (inputs.strategicPartnerships === "formal") adjustments += 0.2;
      else if (inputs.strategicPartnerships === "informal") adjustments += 0.05;
      else adjustments -= 0.1;
      // Team completeness
      adjustments += (inputs.teamCompleteness - 3) * 0.18;
      // Business plan
      adjustments += (inputs.bizPlanQuality - 3) * 0.15;
    }

    var output = clamp(base + adjustments, 0.7, 200);
    return { name: "Risk Factor", low: output * 0.85, base: output, high: output * 1.16 };
  }

  function calcRevenueMultiple(inputs) {
    var bench = getAiAdjustedBench(inputs);
    var revenue = clamp(inputs.revenueRunRate, 0.01, 100000);
    return {
      name: "Revenue Multiple",
      low: revenue * bench.rev[0],
      base: revenue * bench.rev[1],
      high: revenue * bench.rev[2],
    };
  }

  function calcCompsBlend(inputs) {
    var bench = getAiAdjustedBench(inputs);
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
    var bench = getAiAdjustedBench(inputs);
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

  /* ── NEW: Cost-to-Duplicate (pre-revenue) ── */
  function calcCostToDuplicate(inputs) {
    var complexityMultiplier = [0.7, 0.85, 1.0, 1.25, 1.6][clamp(inputs.techComplexity, 1, 5) - 1];
    var ipPremium = inputs.ipPatents === "yes" ? 1.35 : 1.0;
    var monthlyCostPerPerson = 0.012; // $12K/month in $M
    var rebuildCost = inputs.teamSize * inputs.devMonths * monthlyCostPerPerson * complexityMultiplier * ipPremium;
    var base = clamp(rebuildCost, 0.1, 200);
    return { name: "Cost-to-Duplicate", low: base * 0.75, base: base, high: base * 1.3 };
  }

  /* ── NEW: Comparable Transactions ── */
  function calcComparableTransactions(inputs) {
    var deals = inputs.compDeals;
    if (deals.length === 0) return null;

    // Calculate implied multiples from comps that have revenue
    var multiples = [];
    var avgVal = 0;
    deals.forEach(function (deal) {
      if (deal.revenue > 0) {
        multiples.push(deal.valuation / deal.revenue);
      }
      avgVal += deal.valuation;
    });
    avgVal /= deals.length;

    if (multiples.length > 0 && inputs.revenueRunRate > 0) {
      // Use implied multiples on user's revenue
      var avgMultiple = multiples.reduce(function (s, v) { return s + v; }, 0) / multiples.length;
      var base = inputs.revenueRunRate * avgMultiple;
      return { name: "Comparable Transactions", low: base * 0.75, base: base, high: base * 1.25 };
    } else {
      // Use average valuation from comps directly
      return { name: "Comparable Transactions", low: avgVal * 0.7, base: avgVal, high: avgVal * 1.3 };
    }
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

  function resolveWeights(inputs, methods) {
    var stage = inputs.stage;
    var hasCtd = methods.some(function (m) { return m.name === "Cost-to-Duplicate"; });
    var hasComps = methods.some(function (m) { return m.name === "Comparable Transactions"; });

    var weightKey = stage;
    if (stage === "pre-revenue" && hasCtd) weightKey = "pre-revenue-ctd";
    var defined = METHOD_WEIGHTS[weightKey] || METHOD_WEIGHTS[stage];

    var weights = {};
    var coreSum = 0;
    methods.forEach(function (method) {
      if (method.name === "Comparable Transactions") return;
      var weight = defined[method.name] || 0;
      weights[method.name] = weight;
      coreSum += weight;
    });

    // If Comparable Transactions present, give it 20%, scale others to 80%
    if (hasComps) {
      var scaleFactor = coreSum > 0 ? 0.8 / coreSum : 0;
      Object.keys(weights).forEach(function (k) { weights[k] *= scaleFactor; });
      weights["Comparable Transactions"] = 0.2;
    } else if (coreSum > 0) {
      Object.keys(weights).forEach(function (k) { weights[k] /= coreSum; });
    }

    var sum = 0;
    Object.keys(weights).forEach(function (k) { sum += weights[k]; });
    if (sum <= 0) {
      var equal = 1 / methods.length;
      methods.forEach(function (m) { weights[m.name] = equal; });
    }

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
    if (inputs.aiIntegrated === "yes") {
      drivers.push({ label: "AI-integrated product premium applied (+17.5% rev multiples)", impact: 25 });
    }
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

  /* ── Quality Metrics Strip ── */
  function renderMetricsStrip(result) {
    var container = document.getElementById("metrics-cards");
    var strip = document.getElementById("metrics-strip");
    if (!container || !strip) return;

    container.innerHTML = "";
    var signals = result.qualitySignals;
    var hasCards = false;

    if (signals.rule40) {
      hasCards = true;
      container.innerHTML += buildMetricCard("Rule of 40", signals.rule40.score + "%", signals.rule40.grade);
    }

    if (signals.unitEcon) {
      hasCards = true;
      container.innerHTML += buildMetricCard("LTV/CAC Ratio", signals.unitEcon.ltvCac.toFixed(1) + "x", signals.unitEcon.grade);
      container.innerHTML += buildMetricCard("Payback Period", signals.unitEcon.paybackMonths.toFixed(0) + " mo", null);
    }

    if (signals.aiPremium) {
      hasCards = true;
      container.innerHTML += '<div class="metric-card"><p class="metric-card-label">AI Premium</p><span class="metric-card-badge">+17.5% Applied</span></div>';
    }

    strip.classList.toggle("hidden", !hasCards);
  }

  function buildMetricCard(label, value, grade) {
    var gradeHtml = "";
    if (grade) {
      var cls = grade === "Excellent" ? "grade-excellent" : grade === "Good" ? "grade-good" : grade === "Fair" ? "grade-fair" : "grade-weak";
      gradeHtml = '<span class="metric-card-grade ' + cls + '">' + escapeHtml(grade) + '</span>';
    }
    return '<div class="metric-card"><p class="metric-card-label">' + escapeHtml(label) + '</p><p class="metric-card-value">' + escapeHtml(value) + '</p>' + gradeHtml + '</div>';
  }

  /* ── Public Company Comps ── */
  function renderPublicComps(inputs) {
    var section = document.getElementById("public-comps-section");
    var tbody = document.getElementById("public-comps-table");
    if (!section || !tbody) return;

    if (inputs.stage !== "growth") {
      section.classList.add("hidden");
      return;
    }

    var comps = PUBLIC_COMPS[inputs.sector];
    if (!comps || comps.length === 0) {
      section.classList.add("hidden");
      return;
    }

    tbody.innerHTML = "";
    comps.forEach(function (comp) {
      var row = document.createElement("tr");
      row.innerHTML =
        "<td>" + escapeHtml(comp.name) + "</td>" +
        "<td>" + escapeHtml(comp.ticker) + "</td>" +
        "<td>" + comp.evRev.toFixed(1) + "x</td>";
      tbody.appendChild(row);
    });
    section.classList.remove("hidden");
  }

  /* ── Cap Table Simulator ── */
  function initCapTable(inputs, result) {
    var section = document.getElementById("captable-section");
    if (!section) return;

    var premoneySlider = document.getElementById("captable-premoney");
    var raiseSlider = document.getElementById("captable-raise");
    if (!premoneySlider || !raiseSlider) return;

    // Set slider defaults from result
    var baseVal = Math.max(result.range.base, 0.5);
    premoneySlider.max = Math.max(Math.round(baseVal * 3), 10);
    premoneySlider.value = Math.round(baseVal * 10) / 10;
    raiseSlider.value = Math.round(inputs.raiseTarget * 10) / 10;
    raiseSlider.max = Math.max(Math.round(baseVal), 5);

    section.classList.remove("hidden");
    updateCapTable();
  }

  function updateCapTable() {
    var premoneySlider = document.getElementById("captable-premoney");
    var raiseSlider = document.getElementById("captable-raise");
    var premoneyValEl = document.getElementById("captable-premoney-val");
    var raiseValEl = document.getElementById("captable-raise-val");
    var summaryEl = document.getElementById("captable-summary");
    if (!premoneySlider || !raiseSlider || !state.inputs) return;

    var premoney = parseFloat(premoneySlider.value);
    var raise = parseFloat(raiseSlider.value);
    var geo = state.inputs.geography;

    premoneyValEl.textContent = formatMoney(premoney, geo);
    raiseValEl.textContent = formatMoney(raise, geo);

    var postmoney = premoney + raise;
    var newInvestorPct = (raise / postmoney) * 100;
    var dilution = newInvestorPct / 100;

    var founderPre = state.inputs.founderOwnership;
    var esopPre = state.inputs.esopPool;
    var existingPre = state.inputs.existingInvestor;

    var founderPost = founderPre * (1 - dilution);
    var esopPost = esopPre * (1 - dilution);
    var existingPost = existingPre * (1 - dilution);

    summaryEl.innerHTML =
      '<div class="captable-summary-row"><span class="captable-summary-label">Post-money</span><span>' + formatMoney(postmoney, geo) + '</span></div>' +
      '<div class="captable-summary-row"><span class="captable-summary-label">New investor</span><span>' + newInvestorPct.toFixed(1) + '%</span></div>' +
      '<div class="captable-summary-row"><span class="captable-summary-label">Founders</span><span>' + founderPost.toFixed(1) + '%</span></div>' +
      '<div class="captable-summary-row"><span class="captable-summary-label">ESOP</span><span>' + esopPost.toFixed(1) + '%</span></div>' +
      '<div class="captable-summary-row"><span class="captable-summary-label">Existing investors</span><span>' + existingPost.toFixed(1) + '%</span></div>';

    renderCapTableChart(founderPost, esopPost, existingPost, newInvestorPct);
  }

  function renderCapTableChart(founder, esop, existing, newInvestor) {
    if (typeof Chart === "undefined") return;
    if (state.charts.captable) { state.charts.captable.destroy(); state.charts.captable = null; }

    var ctx = document.getElementById("chart-captable");
    if (!ctx) return;

    state.charts.captable = new Chart(ctx.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: ["Founders", "ESOP", "Existing Investors", "New Investor"],
        datasets: [{
          data: [founder, esop, existing, newInvestor],
          backgroundColor: ["#1a1a1a", "#666666", "#999999", "#cccccc"],
          borderWidth: 2,
          borderColor: "#fff",
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 11 } } },
          tooltip: {
            callbacks: {
              label: function (ctx) { return ctx.label + ": " + ctx.parsed.toFixed(1) + "%"; },
            },
          },
        },
      },
    });
  }


  /* ══════════════════════════════════════════════════════════════
     CHART.JS — Method Comparison & Range Visualization
     ══════════════════════════════════════════════════════════════ */
  function destroyCharts() {
    if (state.charts.methods) { state.charts.methods.destroy(); state.charts.methods = null; }
    if (state.charts.range) { state.charts.range.destroy(); state.charts.range = null; }
    if (state.charts.captable) { state.charts.captable.destroy(); state.charts.captable = null; }
  }

  function renderCharts(result) {
    if (typeof Chart === "undefined") return;
    if (state.charts.methods) { state.charts.methods.destroy(); state.charts.methods = null; }
    if (state.charts.range) { state.charts.range.destroy(); state.charts.range = null; }

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
          { label: "Low", data: methods.map(function (m) { return roundNum(m.low, 2); }), backgroundColor: "#c0c0c0" },
          { label: "Base", data: methods.map(function (m) { return roundNum(m.base, 2); }), backgroundColor: "#555555" },
          { label: "High", data: methods.map(function (m) { return roundNum(m.high, 2); }), backgroundColor: "#1a1a1a" },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom", labels: { boxWidth: 14, font: { size: 11 } } },
          tooltip: {
            callbacks: { label: function (ctx) { return ctx.dataset.label + ": " + formatMoney(ctx.parsed.y, inputs.geography); } },
          },
        },
        scales: {
          y: { beginAtZero: true, grid: { display: false }, ticks: { callback: function (val) { return formatMoney(val, inputs.geography); }, font: { size: 10 } } },
          x: { grid: { display: false }, ticks: { font: { size: 10 } } },
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
        datasets: [{
          label: "Valuation Range",
          data: floatingData,
          backgroundColor: rangeLabels.map(function (_, i) { return i === rangeLabels.length - 1 ? "#1a1a1a" : "#888888"; }),
          borderRadius: 4,
        }],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: function (ctx) { var raw = ctx.raw; return formatMoney(raw[0], inputs.geography) + " \u2013 " + formatMoney(raw[1], inputs.geography); } },
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { callback: function (val) { return formatMoney(val, inputs.geography); }, font: { size: 10 } } },
          y: { grid: { display: false }, ticks: { font: { size: 10 } } },
        },
      },
    });
  }


  /* ══════════════════════════════════════════════════════════════
     PDF EXPORT — jsPDF with logo, methodology, branded layout
     ══════════════════════════════════════════════════════════════ */
  function generateMethodologyNote(inputs, result) {
    var methodNames = result.methods.map(function (m) {
      return m.name + " (" + Math.round(m.weight * 100) + "%)";
    });
    var note = "This valuation blends " + methodNames.join(", ") +
      ", calibrated to " + inputs.geography + " " + inputs.sector + " benchmarks.";
    if (inputs.aiIntegrated === "yes") {
      note += " An AI-integration premium of 17.5% has been applied to revenue multiples.";
    }
    if (result.qualitySignals.rule40) {
      note += " Rule of 40 score: " + result.qualitySignals.rule40.score + "% (" + result.qualitySignals.rule40.grade + ").";
    }
    if (result.qualitySignals.unitEcon) {
      note += " LTV/CAC ratio: " + result.qualitySignals.unitEcon.ltvCac.toFixed(1) + "x (" + result.qualitySignals.unitEcon.grade + ").";
    }
    return note;
  }

  function downloadPdfReport(inputs, result) {
    var JsPDF = (window.jspdf && window.jspdf.jsPDF) || (window.jsPDF);
    if (!JsPDF) {
      alert("PDF library not loaded. Please check your internet connection.");
      return;
    }

    var doc = new JsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
    var pw = doc.internal.pageSize.getWidth();
    var ph = doc.internal.pageSize.getHeight();
    var m = 18;
    var usable = pw - 2 * m;
    var y = 18;

    function checkPageOverflow(needed) {
      if (y + needed > 270) {
        addFooter(doc, pw, ph, m);
        doc.addPage();
        y = 18;
      }
    }

    function addFooter(d, pageW, pageH, margin) {
      d.setDrawColor(200);
      d.setLineWidth(0.3);
      d.line(margin, pageH - 16, pageW - margin, pageH - 16);
      d.setFontSize(7);
      d.setTextColor(140);
      d.setFont("helvetica", "normal");
      d.text("The VC Corner | thevc.corner@email.com", margin, pageH - 11);
      d.text("For decision-support only. Not investment advice. Benchmarks as of Mar 2, 2026.", margin, pageH - 7);
    }

    // ── Header with logo ──
    if (LOGO_BASE64 && LOGO_BASE64 !== "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") {
      try {
        doc.addImage("data:image/png;base64," + LOGO_BASE64, "PNG", m, y - 2, 14, 14);
      } catch (e) { /* skip logo on error */ }
    }
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(17);
    doc.text("THE VC CORNER", m + 17, y + 3);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("Founder Valuation Studio", m + 17, y + 8);
    y += 16;
    doc.setDrawColor(17);
    doc.setLineWidth(0.7);
    doc.line(m, y, pw - m, y);
    y += 8;

    // ── Company info ──
    doc.setTextColor(0);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(inputs.companyName, m, y);
    y += 7;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text(
      titleCase(inputs.stage) + "  |  " + inputs.sector + "  |  " + inputs.geography,
      m, y
    );
    y += 4.5;
    doc.text("Valuation Report  |  Generated: " + formatDate(result.timestamp), m, y);
    y += 10;

    // ── Valuation Range Cards ──
    doc.setTextColor(0);
    var cardW = (usable - 10) / 3;
    var ranges = [
      { label: "Low", val: formatMoney(result.range.low, inputs.geography), dark: false },
      { label: "Base", val: formatMoney(result.range.base, inputs.geography), dark: true },
      { label: "High", val: formatMoney(result.range.high, inputs.geography), dark: false },
    ];
    ranges.forEach(function (r, i) {
      var x = m + i * (cardW + 5);
      if (r.dark) {
        doc.setFillColor(17, 17, 17);
        doc.roundedRect(x, y, cardW, 22, 2, 2, "F");
        doc.setTextColor(180);
      } else {
        doc.setDrawColor(200);
        doc.roundedRect(x, y, cardW, 22, 2, 2, "S");
        doc.setTextColor(120);
      }
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(r.label, x + cardW / 2, y + 8, { align: "center" });
      doc.setFontSize(15);
      doc.setFont("helvetica", "bold");
      if (r.dark) doc.setTextColor(255); else doc.setTextColor(17);
      doc.text(r.val, x + cardW / 2, y + 17, { align: "center" });
    });
    doc.setTextColor(0);
    y += 30;

    // ── Key Metrics ──
    checkPageOverflow(20);
    var signals = result.qualitySignals;
    var metricsLine = [];
    if (inputs.stage !== "pre-revenue") {
      metricsLine.push("Revenue: " + formatMoney(inputs.revenueRunRate, inputs.geography));
      metricsLine.push("Growth: " + inputs.growthRate + "%");
      metricsLine.push("GM: " + inputs.grossMargin + "%");
    }
    metricsLine.push("Customers: " + inputs.customerCount);
    metricsLine.push("TAM: " + formatMoney(inputs.tam, inputs.geography));
    if (signals.rule40) metricsLine.push("R40: " + signals.rule40.score + "%");

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("KEY METRICS", m, y);
    y += 6;
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60);
    var metricsText = metricsLine.join("  |  ");
    var metricsWrapped = doc.splitTextToSize(metricsText, usable);
    doc.text(metricsWrapped, m, y);
    y += metricsWrapped.length * 4.5 + 6;

    // ── Methodology ──
    checkPageOverflow(30);
    doc.setTextColor(0);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("METHODOLOGY", m, y);
    y += 6;
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60);
    var methNote = generateMethodologyNote(inputs, result);
    var methLines = doc.splitTextToSize(methNote, usable);
    doc.text(methLines, m, y);
    y += methLines.length * 4.5 + 8;

    // ── Method Breakdown ──
    checkPageOverflow(10 + result.methods.length * 7);
    doc.setTextColor(0);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("METHOD BREAKDOWN", m, y);
    y += 7;

    var cols = [m, m + 42, m + 62, m + 96, m + 130];
    var colLabels = ["Method", "Weight", "Low", "Base", "High"];
    doc.setFillColor(17, 17, 17);
    doc.rect(m, y - 4.5, usable, 7, "F");
    doc.setTextColor(255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    colLabels.forEach(function (lbl, i) { doc.text(lbl, cols[i] + 2, y); });
    y += 5;

    doc.setTextColor(0);
    doc.setFont("helvetica", "normal");
    result.methods.forEach(function (mt, i) {
      checkPageOverflow(7);
      if (i % 2 === 0) {
        doc.setFillColor(245, 245, 245);
        doc.rect(m, y - 3.5, usable, 6.5, "F");
      }
      doc.setFontSize(8);
      doc.text(mt.name, cols[0] + 2, y);
      doc.text(Math.round(mt.weight * 100) + "%", cols[1] + 2, y);
      doc.text(formatMoney(mt.low, inputs.geography), cols[2] + 2, y);
      doc.text(formatMoney(mt.base, inputs.geography), cols[3] + 2, y);
      doc.text(formatMoney(mt.high, inputs.geography), cols[4] + 2, y);
      y += 6.5;
    });
    y += 8;

    // ── Top Valuation Drivers ──
    checkPageOverflow(10 + result.drivers.length * 5);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text("TOP VALUATION DRIVERS", m, y);
    y += 6;
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60);
    result.drivers.forEach(function (d) {
      checkPageOverflow(6);
      var lines = doc.splitTextToSize("\u2022  " + d, usable - 4);
      doc.text(lines, m + 2, y);
      y += lines.length * 4.5;
    });
    y += 6;

    // ── Public Comps (growth-stage only) ──
    if (inputs.stage === "growth" && PUBLIC_COMPS[inputs.sector]) {
      checkPageOverflow(30);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0);
      doc.text("PUBLIC COMPANY COMPS", m, y);
      y += 7;
      var pcCols = [m, m + 55, m + 95];
      doc.setFillColor(17, 17, 17);
      doc.rect(m, y - 4.5, usable, 7, "F");
      doc.setTextColor(255);
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      ["Company", "Ticker", "EV/Revenue"].forEach(function (l, i) { doc.text(l, pcCols[i] + 2, y); });
      y += 5;
      doc.setTextColor(0);
      doc.setFont("helvetica", "normal");
      PUBLIC_COMPS[inputs.sector].forEach(function (comp, i) {
        if (i % 2 === 0) { doc.setFillColor(245, 245, 245); doc.rect(m, y - 3.5, usable, 6.5, "F"); }
        doc.text(comp.name, pcCols[0] + 2, y);
        doc.text(comp.ticker, pcCols[1] + 2, y);
        doc.text(comp.evRev.toFixed(1) + "x", pcCols[2] + 2, y);
        y += 6.5;
      });
      y += 6;
    }

    // ── Cap Table summary (if provided) ──
    if (inputs.founderOwnership > 0 && inputs.raiseTarget > 0) {
      checkPageOverflow(30);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0);
      doc.text("CAP TABLE (at base valuation)", m, y);
      y += 7;
      var premoney = result.range.base;
      var raise = inputs.raiseTarget;
      var postmoney = premoney + raise;
      var newPct = (raise / postmoney) * 100;
      var dil = newPct / 100;
      var capRows = [
        ["Post-money valuation", formatMoney(postmoney, inputs.geography)],
        ["Founders", (inputs.founderOwnership * (1 - dil)).toFixed(1) + "%"],
        ["ESOP", (inputs.esopPool * (1 - dil)).toFixed(1) + "%"],
        ["Existing investors", (inputs.existingInvestor * (1 - dil)).toFixed(1) + "%"],
        ["New investor", newPct.toFixed(1) + "%"],
      ];
      doc.setFontSize(8.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(60);
      capRows.forEach(function (row) {
        doc.text(row[0] + ":  " + row[1], m + 2, y);
        y += 5;
      });
      y += 6;
    }

    // ── Footer ──
    addFooter(doc, pw, ph, m);

    var filename = safeFilename(inputs.companyName || "startup") + "_valuation_report.pdf";
    doc.save(filename);
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
    wb.creator = "The VC Corner \u2014 Founder Valuation Studio";
    wb.created = new Date();

    var NAVY = "FF0D1B2A";
    var DARK_BG = "FF1B2838";
    var BLUE_FNT = "FF2155CD";
    var BLK = "FF111111";
    var GREY_TXT = "FF777777";
    var LIGHT_GRY = "FFF5F5F5";
    var SECTION_BG = "FFEDF2F7";

    function navyFill() { return { type: "pattern", pattern: "solid", fgColor: { argb: NAVY } }; }
    function darkFill() { return { type: "pattern", pattern: "solid", fgColor: { argb: DARK_BG } }; }
    function lightFill() { return { type: "pattern", pattern: "solid", fgColor: { argb: LIGHT_GRY } }; }
    function sectionFillBg() { return { type: "pattern", pattern: "solid", fgColor: { argb: SECTION_BG } }; }
    function wFont(b, sz) { return { bold: !!b, color: { argb: "FFFFFFFF" }, size: sz || 11, name: "Calibri" }; }
    function bFont(b, sz) { return { bold: !!b, color: { argb: BLUE_FNT }, size: sz || 11, name: "Calibri" }; }
    function kFont(b, sz) { return { bold: !!b, color: { argb: BLK }, size: sz || 11, name: "Calibri" }; }
    function gFont(sz) { return { bold: false, color: { argb: GREY_TXT }, size: sz || 11, name: "Calibri" }; }
    function dFont(b, sz) { return { bold: !!b, size: sz || 11, name: "Calibri" }; }
    var moneyFmt = '$#,##0.00"M"';

    function noGrid(s) { s.views = [{ showGridLines: false }]; }
    function setCols(s, w) { w.forEach(function (v, i) { s.getColumn(i + 1).width = v; }); }
    function bandRow(s, r, cols) {
      for (var c = 1; c <= cols; c++) s.getRow(r).getCell(c).fill = navyFill();
    }

    var geo = inputs.geography;

    // ═══ COVER ═══
    var cover = wb.addWorksheet("Cover", { properties: { tabColor: { argb: NAVY } } });
    noGrid(cover);
    setCols(cover, [4, 50, 30, 4]);
    bandRow(cover, 1, 4); bandRow(cover, 2, 4);
    cover.getRow(2).getCell(2).value = "THE VC CORNER";
    cover.getRow(2).getCell(2).font = wFont(true, 20);
    cover.getRow(2).height = 32;
    cover.getRow(3).getCell(2).value = "Founder Valuation Studio";
    cover.getRow(3).getCell(2).font = dFont(false, 13);

    var ci = [
      ["Company", inputs.companyName], ["Stage", titleCase(inputs.stage)],
      ["Sector", inputs.sector], ["Geography", geo], ["Mode", titleCase(inputs.mode)],
      ["AI-Integrated", inputs.aiIntegrated === "yes" ? "Yes" : "No"],
    ];
    ci.forEach(function (p, i) {
      var row = cover.getRow(5 + i);
      row.getCell(2).value = p[0]; row.getCell(2).font = gFont(11);
      row.getCell(3).value = p[1]; row.getCell(3).font = bFont(false, 11);
    });

    cover.getRow(12).getCell(2).value = "Valuation Range";
    cover.getRow(12).getCell(2).font = kFont(true, 13);
    var rd = [
      ["Low", formatMoney(result.range.low, geo), false],
      ["Base", formatMoney(result.range.base, geo), true],
      ["High", formatMoney(result.range.high, geo), false],
    ];
    rd.forEach(function (r, i) {
      var row = cover.getRow(13 + i);
      row.getCell(2).value = r[0]; row.getCell(2).font = gFont(11);
      row.getCell(3).value = r[1]; row.getCell(3).font = kFont(r[2], 12);
    });

    // Quality signals on cover
    var cvy = 17;
    if (result.qualitySignals.rule40) {
      cover.getRow(cvy).getCell(2).value = "Rule of 40";
      cover.getRow(cvy).getCell(2).font = gFont(11);
      cover.getRow(cvy).getCell(3).value = result.qualitySignals.rule40.score + "% (" + result.qualitySignals.rule40.grade + ")";
      cover.getRow(cvy).getCell(3).font = bFont(false, 11);
      cvy++;
    }
    if (result.qualitySignals.unitEcon) {
      cover.getRow(cvy).getCell(2).value = "LTV/CAC";
      cover.getRow(cvy).getCell(2).font = gFont(11);
      cover.getRow(cvy).getCell(3).value = result.qualitySignals.unitEcon.ltvCac.toFixed(1) + "x (" + result.qualitySignals.unitEcon.grade + ")";
      cover.getRow(cvy).getCell(3).font = bFont(false, 11);
      cvy++;
    }
    cvy++;

    cover.getRow(cvy).getCell(2).value = "Generated: " + formatDate(result.timestamp);
    cover.getRow(cvy).getCell(2).font = gFont(9);
    cvy++;
    cover.getRow(cvy).getCell(2).value = "Benchmark assumptions last updated: " + result.assumptionsDate;
    cover.getRow(cvy).getCell(2).font = gFont(9);
    cvy += 2;
    cover.getRow(cvy).getCell(2).value = "For decision-support only. Not investment advice. Benchmarks are static model assumptions.";
    cover.getRow(cvy).getCell(2).font = gFont(9);

    // ═══ EXECUTIVE SUMMARY ═══
    var es = wb.addWorksheet("Executive Summary");
    noGrid(es);
    setCols(es, [3, 24, 18, 18, 18, 3]);
    bandRow(es, 1, 6); bandRow(es, 2, 6);
    es.getRow(2).getCell(2).value = "Executive Summary";
    es.getRow(2).getCell(2).font = wFont(true, 14);
    es.getRow(2).height = 28;
    es.getRow(3).getCell(2).value = inputs.companyName;
    es.getRow(3).getCell(2).font = dFont(true, 11);

    es.getRow(5).getCell(2).value = "Valuation Range";
    es.getRow(5).getCell(2).font = kFont(true, 13);
    ["Low", "Base", "High"].forEach(function (l, i) {
      es.getRow(6).getCell(3 + i).value = l;
      es.getRow(6).getCell(3 + i).font = gFont(10);
    });
    var r7 = es.getRow(7);
    r7.getCell(2).value = "Pre-money ($M)"; r7.getCell(2).font = kFont(false);
    r7.getCell(3).value = result.range.low; r7.getCell(3).font = kFont(true, 12); r7.getCell(3).numFmt = moneyFmt;
    r7.getCell(4).value = result.range.base; r7.getCell(4).font = kFont(true, 12); r7.getCell(4).numFmt = moneyFmt;
    r7.getCell(5).value = result.range.high; r7.getCell(5).font = kFont(true, 12); r7.getCell(5).numFmt = moneyFmt;
    r7.height = 22;

    es.getRow(9).getCell(2).value = "Method Weights";
    es.getRow(9).getCell(2).font = kFont(true, 13);
    var mwH = es.getRow(10);
    ["Method", "Weight", "Base ($M)"].forEach(function (l, i) {
      mwH.getCell(i + 2).value = l; mwH.getCell(i + 2).font = wFont(true); mwH.getCell(i + 2).fill = darkFill();
    });
    mwH.height = 20;

    var esy = 11;
    result.methods.forEach(function (mt, i) {
      var row = es.getRow(esy);
      if (i % 2 === 0) { for (var c = 2; c <= 4; c++) row.getCell(c).fill = lightFill(); }
      row.getCell(2).value = mt.name; row.getCell(2).font = kFont(false);
      row.getCell(3).value = mt.weight; row.getCell(3).font = kFont(false); row.getCell(3).numFmt = "0%";
      row.getCell(4).value = mt.base; row.getCell(4).font = kFont(false); row.getCell(4).numFmt = moneyFmt;
      esy++;
    });
    var bRow = es.getRow(esy);
    bRow.getCell(2).value = "Blended"; bRow.getCell(2).font = kFont(true);
    bRow.getCell(3).value = 1; bRow.getCell(3).font = kFont(true); bRow.getCell(3).numFmt = "0%";
    bRow.getCell(4).value = result.range.base; bRow.getCell(4).font = kFont(true); bRow.getCell(4).numFmt = moneyFmt;
    for (var bc = 2; bc <= 4; bc++) bRow.getCell(bc).border = { top: { style: "medium", color: { argb: BLK } } };
    esy += 2;

    es.getRow(esy).getCell(2).value = "Key Drivers";
    es.getRow(esy).getCell(2).font = kFont(true, 13);
    esy++;
    result.drivers.forEach(function (d) {
      es.getRow(esy).getCell(2).value = "\u2022  " + d;
      es.getRow(esy).getCell(2).font = kFont(false, 10);
      esy++;
    });

    // ═══ INPUTS ═══
    var inp = wb.addWorksheet("Inputs");
    noGrid(inp);
    setCols(inp, [3, 36, 22, 3]);
    bandRow(inp, 1, 4); bandRow(inp, 2, 4);
    inp.getRow(2).getCell(2).value = "Model Inputs";
    inp.getRow(2).getCell(2).font = wFont(true, 14);
    inp.getRow(2).height = 28;

    var iy = 4;
    function addSec(t) { inp.getRow(iy).getCell(2).value = t; inp.getRow(iy).getCell(2).font = dFont(true, 12); iy++; }
    function addInp(l, v, f) {
      var row = inp.getRow(iy);
      row.getCell(2).value = l; row.getCell(2).font = gFont(11);
      row.getCell(3).value = v; row.getCell(3).font = bFont(false, 11);
      if (f) row.getCell(3).numFmt = f;
      iy++;
    }

    addSec("Company Profile");
    addInp("Company Name", inputs.companyName);
    addInp("Stage", titleCase(inputs.stage));
    addInp("Sector", inputs.sector);
    addInp("Geography", geo);
    addInp("Business Model", inputs.businessModel);
    addInp("Founding Year", inputs.foundingYear, "0");
    addInp("AI-Integrated", inputs.aiIntegrated === "yes" ? "Yes" : "No");
    if (inputs.mode === "deep") {
      addInp("IP Portfolio", titleCase(inputs.ipPortfolio));
      addInp("Strategic Partnerships", titleCase(inputs.strategicPartnerships));
    }
    iy++;

    addSec("Financials & Traction");
    if (inputs.stage === "pre-revenue") {
      addInp("Product Stage", titleCase(inputs.productStage));
      addInp("Early Users", inputs.earlyUsers, "#,##0");
      if (inputs.teamSize > 0) addInp("Team Size", inputs.teamSize, "0");
      if (inputs.devMonths > 0) addInp("Dev Months", inputs.devMonths, "0");
      addInp("Tech Complexity (1-5)", inputs.techComplexity, "0");
      addInp("IP/Patents", inputs.ipPatents === "yes" ? "Yes" : "No");
    } else {
      addInp("Revenue Run-rate ($M)", inputs.revenueRunRate, moneyFmt);
      addInp("Annual Growth", inputs.growthRate / 100, "0%");
      addInp("Gross Margin", inputs.grossMargin / 100, "0%");
      addInp("Active Customers", inputs.customerCount, "#,##0");
      addInp("CAC", inputs.cac, "$#,##0");
      addInp("LTV", inputs.ltv, "$#,##0");
      addInp("Annual Churn", inputs.churn / 100, "0%");
      if (inputs.mode === "deep") {
        addInp("Net Revenue Retention", inputs.nrr / 100, "0%");
        addInp("Burn Multiple", inputs.burnMultiple, '0.0"x"');
      }
    }
    if (inputs.compDeals.length > 0) {
      iy++;
      addSec("Comparable Transactions");
      inputs.compDeals.forEach(function (deal, idx) {
        addInp("Comp " + (idx + 1), deal.name + " - " + formatMoney(deal.valuation, geo));
      });
    }
    iy++;

    addSec("Market & Risk");
    addInp("TAM ($M)", inputs.tam, '$#,##0"M"');
    addInp("Competition Intensity (1-5)", inputs.competitionIntensity, "0");
    addInp("Moat Strength (1-5)", inputs.moatStrength, "0");
    addInp("Founder Experience (1-5)", inputs.founderExperience, "0");
    addInp("Concentration Risk (1-5)", inputs.concentrationRisk, "0");
    addInp("Regulatory Risk (1-5)", inputs.regulatoryRisk, "0");
    if (inputs.mode === "deep") {
      addInp("Team Completeness (1-5)", inputs.teamCompleteness, "0");
      addInp("Business Plan Quality (1-5)", inputs.bizPlanQuality, "0");
    }
    iy++;

    addSec("Fundraise & Projections");
    addInp("Target Raise ($M)", inputs.raiseTarget, moneyFmt);
    addInp("Runway (months)", inputs.runwayMonths, "0");
    addInp("Target Dilution", inputs.targetDilution / 100, "0%");
    addInp("Founder Ownership", inputs.founderOwnership / 100, "0%");
    addInp("ESOP Pool", inputs.esopPool / 100, "0%");
    addInp("Existing Investor", inputs.existingInvestor / 100, "0%");
    if (inputs.mode === "deep") {
      addInp("Pipeline Coverage", inputs.pipelineCoverage, '0.0"x"');
      addInp("Projected 3Y CAGR", inputs.projectedCagr / 100, "0%");
    }

    // ═══ METHODS ═══
    var mth = wb.addWorksheet("Methods");
    noGrid(mth);
    setCols(mth, [3, 28, 14, 18, 18, 18, 3]);
    bandRow(mth, 1, 7); bandRow(mth, 2, 7);
    mth.getRow(2).getCell(2).value = "Valuation Methods";
    mth.getRow(2).getCell(2).font = wFont(true, 14);
    mth.getRow(2).height = 28;

    var mhR = mth.getRow(4);
    ["Method", "Weight", "Low ($M)", "Base ($M)", "High ($M)"].forEach(function (l, i) {
      mhR.getCell(i + 2).value = l; mhR.getCell(i + 2).font = dFont(true, 11);
    });

    var my = 5;
    result.methods.forEach(function (mt) {
      var row = mth.getRow(my);
      row.getCell(2).value = mt.name; row.getCell(2).font = kFont(false);
      row.getCell(3).value = mt.weight; row.getCell(3).font = kFont(false); row.getCell(3).numFmt = "0%";
      row.getCell(4).value = mt.low; row.getCell(4).font = kFont(false); row.getCell(4).numFmt = moneyFmt;
      row.getCell(5).value = mt.base; row.getCell(5).font = kFont(false); row.getCell(5).numFmt = moneyFmt;
      row.getCell(6).value = mt.high; row.getCell(6).font = kFont(false); row.getCell(6).numFmt = moneyFmt;
      row.height = 20;
      my++;
    });
    var mbR = mth.getRow(my);
    mbR.getCell(2).value = "Blended"; mbR.getCell(2).font = kFont(true);
    mbR.getCell(3).value = 1; mbR.getCell(3).font = kFont(true); mbR.getCell(3).numFmt = "0%";
    mbR.getCell(4).value = result.range.low; mbR.getCell(4).font = kFont(true); mbR.getCell(4).numFmt = moneyFmt;
    mbR.getCell(5).value = result.range.base; mbR.getCell(5).font = kFont(true); mbR.getCell(5).numFmt = moneyFmt;
    mbR.getCell(6).value = result.range.high; mbR.getCell(6).font = kFont(true); mbR.getCell(6).numFmt = moneyFmt;
    for (var mc = 2; mc <= 6; mc++) mbR.getCell(mc).border = { top: { style: "medium", color: { argb: BLK } } };
    mbR.height = 22;

    // Quality signals in Methods sheet
    my += 2;
    if (result.qualitySignals.rule40 || result.qualitySignals.unitEcon || result.qualitySignals.aiPremium) {
      mth.getRow(my).getCell(2).value = "Quality Signals";
      mth.getRow(my).getCell(2).font = kFont(true, 13);
      my++;
      if (result.qualitySignals.rule40) {
        mth.getRow(my).getCell(2).value = "Rule of 40"; mth.getRow(my).getCell(2).font = gFont(11);
        mth.getRow(my).getCell(3).value = result.qualitySignals.rule40.score + "% (" + result.qualitySignals.rule40.grade + ")";
        mth.getRow(my).getCell(3).font = kFont(false); my++;
      }
      if (result.qualitySignals.unitEcon) {
        mth.getRow(my).getCell(2).value = "LTV/CAC"; mth.getRow(my).getCell(2).font = gFont(11);
        mth.getRow(my).getCell(3).value = result.qualitySignals.unitEcon.ltvCac.toFixed(1) + "x (" + result.qualitySignals.unitEcon.grade + ")";
        mth.getRow(my).getCell(3).font = kFont(false); my++;
      }
      if (result.qualitySignals.aiPremium) {
        mth.getRow(my).getCell(2).value = "AI Premium"; mth.getRow(my).getCell(2).font = gFont(11);
        mth.getRow(my).getCell(3).value = "+17.5% on revenue multiples";
        mth.getRow(my).getCell(3).font = kFont(false); my++;
      }
    }

    // ═══ SCENARIOS ═══
    var sc = wb.addWorksheet("Scenarios");
    noGrid(sc);
    setCols(sc, [3, 32, 18, 18, 18, 3]);
    bandRow(sc, 1, 6); bandRow(sc, 2, 6);
    sc.getRow(2).getCell(2).value = "Scenario Analysis";
    sc.getRow(2).getCell(2).font = wFont(true, 14);
    sc.getRow(2).height = 28;

    sc.getRow(4).getCell(2).value = "Sensitivity Adjustments";
    sc.getRow(4).getCell(2).font = dFont(true, 12);

    [
      ["Growth Shift", state.sensitivity.growth / 100],
      ["Multiple Shift", state.sensitivity.multiple / 100],
      ["Discount Rate Shift", state.sensitivity.discount / 100],
    ].forEach(function (p, i) {
      var row = sc.getRow(5 + i);
      row.getCell(2).value = p[0]; row.getCell(2).font = gFont(11);
      row.getCell(3).value = p[1]; row.getCell(3).font = bFont(false, 11); row.getCell(3).numFmt = "0%";
    });

    sc.getRow(9).getCell(2).value = "Resulting Valuation";
    sc.getRow(9).getCell(2).font = kFont(true, 12);
    sc.getRow(9).getCell(2).fill = sectionFillBg();

    var scHR = sc.getRow(10);
    ["Scenario", "Low ($M)", "Base ($M)", "High ($M)"].forEach(function (l, i) {
      scHR.getCell(i + 2).value = l; scHR.getCell(i + 2).font = dFont(true, 11);
    });

    [
      ["Bear Case", result.range.low * 0.85, result.range.base * 0.85, result.range.high * 0.85, false],
      ["Base Case", result.range.low, result.range.base, result.range.high, true],
      ["Bull Case", result.range.low * 1.18, result.range.base * 1.18, result.range.high * 1.18, false],
    ].forEach(function (s, i) {
      var row = sc.getRow(11 + i);
      var bold = s[4];
      row.getCell(2).value = s[0]; row.getCell(2).font = kFont(bold);
      row.getCell(3).value = s[1]; row.getCell(3).font = kFont(bold); row.getCell(3).numFmt = moneyFmt;
      row.getCell(4).value = s[2]; row.getCell(4).font = kFont(bold); row.getCell(4).numFmt = moneyFmt;
      row.getCell(5).value = s[3]; row.getCell(5).font = kFont(bold); row.getCell(5).numFmt = moneyFmt;
    });

    // Cap table in scenarios sheet
    if (inputs.founderOwnership > 0 && inputs.raiseTarget > 0) {
      var scy = 16;
      sc.getRow(scy).getCell(2).value = "Cap Table (at base valuation)";
      sc.getRow(scy).getCell(2).font = kFont(true, 12);
      scy++;
      var pm = result.range.base;
      var ra = inputs.raiseTarget;
      var pom = pm + ra;
      var nip = (ra / pom) * 100;
      var dd = nip / 100;
      [
        ["Post-money", formatMoney(pom, geo)],
        ["New Investor %", nip.toFixed(1) + "%"],
        ["Founders (post)", (inputs.founderOwnership * (1 - dd)).toFixed(1) + "%"],
        ["ESOP (post)", (inputs.esopPool * (1 - dd)).toFixed(1) + "%"],
        ["Existing (post)", (inputs.existingInvestor * (1 - dd)).toFixed(1) + "%"],
      ].forEach(function (r) {
        sc.getRow(scy).getCell(2).value = r[0]; sc.getRow(scy).getCell(2).font = gFont(11);
        sc.getRow(scy).getCell(3).value = r[1]; sc.getRow(scy).getCell(3).font = kFont(false);
        scy++;
      });
    }

    // Generate and download
    wb.xlsx.writeBuffer().then(function (buffer) {
      var blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      var filename = safeFilename(inputs.companyName || "startup") + "_valuation_model.xlsx";
      triggerDownload(blob, filename);
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
    var symbol = CURRENCY_MAP[geography] || "$";
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

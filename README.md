# Founder Valuation Studio (v1)

Single-page valuation calculator for founders with:

- Quick Check and Deep Dive modes
- Stage-based multi-method valuation (`Low / Base / High`)
- Confidence scoring and top-driver explanations
- Downloadable printable report (PDF via browser print)
- Excel-compatible model export (multi-sheet SpreadsheetML XML)

## Run

Use any static server from this folder, for example:

```bash
python3 -m http.server 8000
```

Then open `http://127.0.0.1:8000`.

## Notes

- Currency formatting switches between USD (`US`) and EUR (`Europe`).
- Benchmarks and method weights are static model assumptions in `app.js`.
- Output is decision-support only, not investment advice.

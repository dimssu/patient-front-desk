# Patient Front Desk — Test Report

## Acceptance Checks

- **Build (`npm run build`)**: PASS — 23 static pages generated, no TS errors.
- **Route `/` returns 200**: PASS — 83,633 chars HTML.
- **Route `/scheduling` returns 200**: PASS — 91,186 chars HTML.
- **Route `/patient/p-001` returns 200**: PASS — 74,631 chars HTML.
- **Real content (>=5000 chars, no Lorem / Item 1 / TODO / placeholder string literals)**: PASS on all 3 routes.
- **`<h1>` and `<main>` present on each route**: PASS on all 3 routes.
- **Identity hygiene scan clean**: PASS.
- **No stray `</content>` literal in source**: PASS.

## Notes

- Initial puppeteer capture exceeded the 30s `networkidle0` timeout on `/`. Switched to `networkidle2` with a `domcontentloaded` fallback and 2.5s settle delay; second pass succeeded for all three routes.

## Screenshots Captured (1440x900 @ 2x)

- `public/screenshots/hero.png` (Waiting room)
- `public/screenshots/dashboard.png` (Scheduling calendar)
- `public/screenshots/detail.png` (Patient detail — p-001)

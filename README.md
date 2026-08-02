# WannaCalc

WannaCalc is a responsive collection of free calculators, converters,
generators, and text utilities built with Next.js and Material UI.

## Local development

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint       # Next.js and React lint checks
npm run test       # Formula and utility unit tests
npm run test:e2e   # Chromium smoke tests for every registered tool
npm run build      # Production build
npm run sitemap    # Regenerate public/sitemap.xml
```

`npm run verify` runs lint, unit tests, and the production build. Browser tests
require Chromium once per machine:

```bash
npx playwright install chromium
```

## Adding a tool

1. Add the component under the appropriate `components` category.
2. Register its route and metadata in `constants.js`.
3. Add the component to `componentsBySlug` in `pages/[slug].js`.
4. Add English copy to `public/locales/en/common.json`.
5. Run the full verification commands and regenerate the sitemap.

## Release checklist

1. Confirm the canonical production domain remains `https://wannacalc.com`.
2. Run `npm ci`, `npm run sitemap`, and `npm run verify`.
3. Run `npm run test:e2e` and confirm every registered route passes.
4. Review the home page and representative tools at mobile and desktop widths.
5. Confirm the Azure Static Web Apps deployment secret is available.
6. Merge or push the release commit to `main` to trigger the existing Azure
   Static Web Apps workflow.
7. After deployment, verify the home page, one calculator, one converter,
   analytics, ads, `robots.txt`, and `sitemap.xml`.

Publishing is intentionally handled outside the application code.

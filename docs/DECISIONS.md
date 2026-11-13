# Decision log

| # | Phase | Decision | Reason |
|---|---|---|---|
| 1 | 0 | Next.js 16 line, App Router, TypeScript, src/ folder; starter defaults kept (including Cache Components when enabled) | Current stable line |
| 2 | 0 | SCSS + CSS Modules via sass; no Tailwind, Bootstrap or UI kits | Owner requirement |
| 3 | 0 | No animation, scroll or 3D libraries; native CSS and browser APIs only | Owner requirement |
| 4 | 1 | trailingSlash: true | Every URL in the SEO plan ends with "/" |
| 5 | 1 | poweredByHeader: false | Do not advertise the framework |
| 6 | 1 | React Compiler declined | Adds a Babel plugin dependency |
| 7 | 1 | Exact version pinning (.npmrc save-exact, .nvmrc) | Reproducible installs |
| 8 | 1 | Git not initialised | Git and GitHub belong to Phase 7 |
| 9 | 1 | Zero-dependency smoke tests; Playwright e2e added via setup-e2e.sh | Owner asked for e2e; one dev-only package |
| 10 | 8 | New logo and palette: navy #0B1224, mint #2BE3A8, cerulean #008DB5, warm white #FAF7F0, ink #163541; headings in Plus Jakarta Sans (the wordmark's typeface) | Owner supplied new logo assets |
| 11 | 8 | Primary buttons use cerulean one step darker (#007DA1) | White text on #008DB5 is 3.8:1; on #007DA1 it is 4.7:1 (WCAG AA) |
| 12 | 8 | Blog routes export `ensureStatic = "navigation"`; `src/proxy.ts` removed | Posts published after a deploy were answered with an empty page shell on direct visits; the full page is now rendered before it is sent, and unknown slugs return a real 404 without a proxy |
| 13 | 8 | A post missing from the cached list is looked up on its own (`/posts?slug=`) | A new article opens at once instead of after the 5-minute list refresh |
| 14 | 8 | Starting prices published for every service (`src/content/services/prices.ts`) | Owner request; figures proposed from market research in `docs/PRICING-RESEARCH.md`, to be confirmed |
| 15 | 8 | Homepage gets a looping canvas background with a pause control in the hero | Owner asked for an animated background; a loop needs a way to stop it (WCAG 2.2.2) |
| 16 | 8 | Content-Security-Policy: each directive written once | Browsers ignore repeated directives, which was blocking Google Tag Manager |

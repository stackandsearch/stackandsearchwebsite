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

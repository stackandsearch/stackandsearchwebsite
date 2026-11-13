# Stack & Search website

The website for [stackandsearch.com](https://stackandsearch.com), a web design, development and growth studio.

Next.js 16 (App Router, Cache Components), TypeScript and SCSS Modules. All animation is native CSS and browser APIs; there are no UI or animation libraries.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run test:ui` | Browser checks: devices, lead forms, every page, every link and button |
| `npm run test:responsive` | Device layout checks only |
| `npm run inventory` | Rebuild `docs/PAGE-INVENTORY.md` |

## Settings (`.env.local`)

| Variable | Purpose |
| --- | --- |
| `SITE_INDEXING` | `on` at launch. Until then every page is noindex and robots.txt blocks crawlers. |
| `LEAD_SHEET_URL`, `LEAD_SHEET_TOKEN` | Google Sheet (Apps Script web app) that receives enquiries |
| `LEAD_WEBHOOK_URL`, `LEAD_WEBHOOK_SECRET` | Optional extra destination for enquiries (Zapier, a CRM...) |
| `LEAD_DELIVERY=log` | Log enquiries instead of sending them (used by the browser checks) |

`.env.example` lists every setting. Never commit `.env.local`.

## Where things live

- `src/content/`: all page text (services, about, pricing, blog, legal)
- `src/content/services/prices.ts`: every price on the site, in one file
- `src/components/brand/`: the logo as inline vector paths
- `src/styles/_themes.scss`: the colour palette (`$brand`) for both themes
- `src/components/`: page templates, hero scenes, lead forms
- `src/styles/`: design tokens, motion and effect mixins
- `docs/PAGE-INVENTORY.md`: every page and its status
- `docs/OWNER-INPUTS.md`: details still needed before launch
- `docs/PRICING-RESEARCH.md`: where the proposed prices come from
- `docs/IMPROVEMENTS.md`: site review, with what to improve next

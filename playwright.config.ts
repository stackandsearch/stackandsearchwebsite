import { defineConfig, devices } from "@playwright/test";

// E2E tests run against the PRODUCTION build, because that is what visitors
// and crawlers receive. Port 3200 avoids clashing with `npm run dev` (3000).
const PORT = Number(process.env.E2E_PORT ?? 3200);
const BASE_URL = `http://127.0.0.1:${PORT}`;
const build = process.env.E2E_SKIP_BUILD ? "" : "npm run build && ";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chromium", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `${build}node node_modules/next/dist/bin/next start -H 127.0.0.1 -p ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});

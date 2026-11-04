import { expect, test } from "@playwright/test";

// Phase 1 baseline: the page renders, hydrates cleanly, fits small screens,
// and stays readable without JavaScript.

test("homepage shows its title and a single main heading", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/Stack & Search/);
  const h1 = page.getByRole("heading", { level: 1 });
  await expect(h1).toHaveCount(1);
  await expect(h1).toHaveText("Stack & Search");
});

test("loads without console errors, page errors or failed requests", async ({ page }) => {
  const problems: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") problems.push(`console error: ${message.text()}`);
  });
  page.on("pageerror", (error) => problems.push(`page error: ${error.message}`));
  page.on("requestfailed", (request) => problems.push(`request failed: ${request.url()}`));

  await page.goto("/");
  await page.waitForLoadState("networkidle");
  expect(problems).toEqual([]);
});

test("does not scroll horizontally", async ({ page }) => {
  await page.goto("/");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test("unknown URLs return a 404 status", async ({ page }) => {
  const response = await page.goto("/this-page-should-not-exist/");
  expect(response?.status()).toBe(404);
});

test.describe("with JavaScript disabled", () => {
  test.use({ javaScriptEnabled: false });

  test("content is still fully readable", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Stack & Search");
    await expect(
      page.getByText("this text is in the HTML before any JavaScript runs"),
    ).toBeVisible();
  });
});

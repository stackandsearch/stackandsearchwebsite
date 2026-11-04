import { expect, test, type Page } from "@playwright/test";

// Scrolls down in steps until `done` returns true (or the steps run out).
async function scrollUntil(page: Page, done: () => Promise<boolean>, steps = 60) {
  for (let step = 0; step < steps; step += 1) {
    if (await done()) return true;
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(80);
  }
  return done();
}

test("footer form explains what is missing and keeps what was typed", async ({ page }) => {
  await page.goto("/");
  const form = page.locator("form[data-lead-form='footer']");
  test.skip((await form.count()) === 0, "The footer form has not been placed yet.");

  await form.scrollIntoViewIfNeeded();
  await form.getByLabel("Your name").fill("A");
  await form.getByLabel("Email").fill("not-an-email");
  await form.getByRole("button", { name: /free audit/i }).click();

  await expect(form.getByText("Please enter your name.")).toBeVisible();
  await expect(form.getByText("Please enter a valid email address.")).toBeVisible();
  await expect(form.getByText("Please agree so we can contact you about your request.")).toBeVisible();
  await expect(form.getByLabel("Your name")).toHaveValue("A");
});

test("popup opens after two sections and stays closed for the session", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  const popup = page.locator("dialog[data-lead-popup]");
  await page.mouse.move(640, 400);

  const opened = await scrollUntil(page, async () => (await popup.getAttribute("open")) !== null);
  expect(opened, "popup opened while scrolling").toBe(true);
  await expect(popup.locator("form[data-lead-form='popup']")).toBeVisible();

  await popup.getByRole("button", { name: "Close" }).click();
  await expect(popup).not.toHaveAttribute("open");

  await page.reload();
  await page.mouse.move(640, 400);
  await scrollUntil(page, async () => false, 40);
  await expect(popup).not.toHaveAttribute("open");
});

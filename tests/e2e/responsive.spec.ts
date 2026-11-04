import { expect, test, type Page } from "@playwright/test";

// Responsive audit at real device sizes. Checks that nothing scrolls
// sideways, no visible text is cut by the screen edge, and every storyboard
// card fits the pinned area at the end of its scroll. Lists anything that
// reaches past the screen edge, and saves screenshots in test-results/.
const VIEWPORTS = [
  { name: "galaxy-fold", width: 344, height: 882 },
  { name: "iphone-se", width: 375, height: 667 },
  { name: "iphone-14", width: 390, height: 844 },
  { name: "pixel-7", width: 412, height: 915 },
  { name: "ipad-mini", width: 768, height: 1024 },
  { name: "ipad-landscape", width: 1024, height: 768 },
  { name: "laptop-1280x720", width: 1280, height: 720 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "full-hd", width: 1920, height: 1080 },
];

const TRACK = "section#how-we-build > div";

async function sidewaysOverflow(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
}

// Waits for intro animations to finish (ignores scroll-linked and looping ones).
async function settle(page: Page) {
  await page
    .waitForFunction(
      () =>
        document.getAnimations().every((animation) => {
          if (!(animation.timeline instanceof DocumentTimeline)) return true;
          if (animation.effect?.getTiming().iterations === Infinity) return true;
          return animation.playState !== "running";
        }),
      undefined,
      { timeout: 8000 },
    )
    .catch(() => undefined);
}

interface EdgeReport {
  reaching: string[];
  cutText: string[];
}

// Elements that reach past the left/right screen edge and are not already
// clipped by their own section (outermost only), plus visible text that the
// screen edge cuts through.
async function edgeReport(page: Page): Promise<EdgeReport> {
  return page.evaluate(() => {
    const width = document.documentElement.clientWidth;
    const guards = "main, #site-footer, body";
    const reaching: string[] = [];
    const cutText: string[] = [];

    const outside = (rect: DOMRect) => rect.right > width + 1 || rect.left < -1;
    const label = (el: Element) => {
      const firstClass = (el.getAttribute("class") ?? "").split(/\s+/).find(Boolean);
      return `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""}${firstClass ? `.${firstClass}` : ""}`;
    };
    const clippedBySection = (el: Element) => {
      for (let node = el.parentElement; node && !node.matches(guards); node = node.parentElement) {
        if (getComputedStyle(node).overflowX !== "visible") return true;
      }
      return false;
    };

    for (const el of Array.from(document.body.querySelectorAll("*"))) {
      const rect = el.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1 || !outside(rect) || clippedBySection(el)) continue;

      const ownText = Array.from(el.childNodes)
        .filter((node) => node.nodeType === Node.TEXT_NODE)
        .map((node) => node.textContent ?? "")
        .join("")
        .trim();
      const straddles = (rect.left < width && rect.right > width + 1) || (rect.right > 0 && rect.left < -1);
      if (ownText && straddles && !el.closest('[aria-hidden="true"]')) {
        cutText.push(`${label(el)} "${ownText.slice(0, 40)}"`);
      }

      const parent = el.parentElement;
      if (parent && parent !== document.body && outside(parent.getBoundingClientRect())) continue;
      reaching.push(`${label(el)}  ${Math.round(rect.left)}px to ${Math.round(rect.right)}px`);
    }

    return { reaching: reaching.slice(0, 12), cutText };
  });
}

for (const viewport of VIEWPORTS) {
  test(`homepage fits ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    // 1. Final layout: reduced motion shows every section in its finished state.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const edges = await edgeReport(page);
    if (edges.reaching.length > 0) {
      console.log(`[${viewport.name}] reaches past the screen edge (trimmed):\n  ${edges.reaching.join("\n  ")}`);
    }
    expect.soft(edges.cutText, "visible text cut off by the screen edge").toEqual([]);
    expect.soft(await sidewaysOverflow(page), "no sideways scrolling (final layout)").toBeLessThanOrEqual(0);
    await page.screenshot({ path: testInfo.outputPath(`${viewport.name}-page.png`), fullPage: true });

    // 2. With motion: intro and scroll effects must not cause sideways scrolling.
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    await settle(page);
    expect.soft(await sidewaysOverflow(page), "no sideways scrolling (with motion)").toBeLessThanOrEqual(0);

    // 3. Storyboard: at the end of its scroll, the heading and all six cards
    //    sit fully inside the pinned area.
    await page
      .waitForFunction((selector) => document.querySelector(selector)?.hasAttribute("data-scrolly") ?? false, TRACK, {
        timeout: 5000,
      })
      .catch(() => undefined);
    if ((await page.locator(TRACK).getAttribute("data-scrolly")) === null) return;

    await page.evaluate((selector) => {
      const track = document.querySelector<HTMLElement>(selector);
      if (!track) return;
      const end = window.scrollY + track.getBoundingClientRect().bottom - window.innerHeight - 4;
      window.scrollTo({ top: end, behavior: "instant" });
    }, TRACK);
    await page.waitForTimeout(700);

    const stage = await page.locator("[data-story-sticky]").boundingBox();
    expect(stage, "pinned storyboard area").not.toBeNull();
    if (!stage) return;
    const stageBottom = stage.y + stage.height;

    const targets = [page.locator("#story-title"), ...(await page.locator("[data-story-card]").all())];
    for (const target of targets) {
      const box = await target.boundingBox();
      expect(box, "storyboard element is rendered").not.toBeNull();
      if (!box) continue;
      expect(box.y, "top edge inside the pinned area").toBeGreaterThanOrEqual(stage.y - 1);
      expect(box.y + box.height, "bottom edge inside the pinned area").toBeLessThanOrEqual(stageBottom + 1);
    }

    await page.screenshot({ path: testInfo.outputPath(`${viewport.name}-storyboard.png`) });
  });
}

test("header hides on scroll down and returns on scroll up", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/");
  const header = page.locator("header").first();
  await page.mouse.move(640, 400);
  await page.mouse.wheel(0, 1500);
  await expect(header).toHaveAttribute("data-hidden", "");
  await page.mouse.wheel(0, -300);
  await expect(header).not.toHaveAttribute("data-hidden");
});

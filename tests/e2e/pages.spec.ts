import { expect, test, type Page } from "@playwright/test";

const POPUP_COOKIE = "ss-lead-popup";

type AuditWindow = Window & { __audit?: { count: number; observer: MutationObserver } };

async function keepPopupClosed(page: Page) {
  const baseURL = test.info().project.use.baseURL ?? "http://localhost:3200";
  await page.context().addCookies([{ name: POPUP_COOKIE, value: "dismissed", url: baseURL }]);
}

// Unknown and retired URLs must return a real 404 status.
test("unknown and old URLs return a real 404", async ({ request }) => {
  for (const href of ["/this-page-does-not-exist/", "/services/website-development/"]) {
    const response = await request.get(href);
    expect(response.status(), href).toBe(404);
  }
});

// The 404 page suggests the closest page and its search box works.
test("the 404 page helps visitors find their way", async ({ page }) => {
  await keepPopupClosed(page);
  const response = await page.goto("/services/website-development/");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator('[data-nf="did-you-mean"] a')).toHaveText("Website development");

  const search = page.getByRole("searchbox", { name: "Search the site" });
  await search.fill("local");
  await expect(page.locator('[data-nf="results"] a').first()).toContainText(/local seo/i);
  await search.press("Enter");
  await expect(page).toHaveURL(/\/local-seo\/$/);
});

// Every inner page that exists: one h1, a matching canonical URL, valid
// structured data, no sideways scrolling on a laptop or a phone, every
// scroll-reveal element visible after scrolling, and a one-liner on every
// related-service card.
test("inner pages pass basic SEO and layout checks", async ({ page, request }) => {
  test.setTimeout(480_000);
  await keepPopupClosed(page);

  const found = new Set<string>(["/services/", "/blog/"]);
  for (const start of ["/services/", "/blog/"]) {
    await page.goto(start);
    const linked = await page.locator("a[href^='/']").evaluateAll((links) => links.map((link) => link.getAttribute("href") ?? ""));
    for (const href of linked) found.add(href.split("#")[0]);
  }
  const hrefs = Array.from(found).filter((href) => href.length > 1);
  const checked: string[] = [];

  for (const href of hrefs) {
    const response = await request.get(href);
    if (response.status() === 404) continue;
    expect(response.status(), `${href} status`).toBe(200);

    for (const width of [390, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(href);
      await expect(page.locator("h1"), `${href} has one h1`).toHaveCount(1);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${href} at ${width}px: no sideways scrolling`).toBeLessThanOrEqual(0);
    }

    await page.evaluate(async () => {
      const step = Math.round(window.innerHeight * 0.6);
      for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
        window.scrollTo({ top: y, behavior: "instant" });
        await new Promise((resolve) => setTimeout(resolve, 60));
      }
    });
    await page.waitForTimeout(400);
    const hidden = await page.locator("[data-fx-reveal]:not([data-fx-shown])").count();
    expect(hidden, `${href}: every section shows after scrolling`).toBe(0);

    const missing = await page
      .locator('section[aria-labelledby="related-title"] a')
      .evaluateAll((links) =>
        links.filter((link) => link.querySelectorAll(":scope > span").length < 4).map((link) => link.textContent?.trim() ?? ""),
      );
    expect(missing, `${href}: every related service has a one-liner`).toEqual([]);

    const canonicalLink = page.locator('link[rel="canonical"]');
    await expect(canonicalLink, `${href} has a canonical link`).toHaveCount(1);
    const canonical = (await canonicalLink.getAttribute("href")) ?? "";
    expect(canonical.endsWith(href), `${href} canonical is ${canonical}`).toBe(true);
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(blocks.length, `${href} structured data`).toBeGreaterThan(0);
    for (const block of blocks) expect(() => JSON.parse(block), `${href} structured data parses`).not.toThrow();
    checked.push(href);
  }

  console.log(`Checked ${checked.length} pages: ${checked.join(", ")}`);
  expect(checked.length, "all inner pages").toBeGreaterThan(25);
});

// The lead sheet's source columns: a campaign link is remembered while the
// visitor browses, and a later search visit becomes the latest source.
test("visits record where the visitor came from", async ({ page }) => {
  await keepPopupClosed(page);

  const attribution = async () => {
    const cookie = (await page.context().cookies()).find((item) => item.name === "ss_attr");
    if (!cookie) return "";
    const data = JSON.parse(decodeURIComponent(cookie.value));
    return [data.first?.source, data.last?.source, data.last?.medium, data.last?.campaign ?? ""].join("|");
  };

  await page.goto("/?utm_source=newsletter&utm_medium=email&utm_campaign=launch");
  await expect.poll(attribution).toBe("newsletter|newsletter|email|launch");

  await page.goto("/contact/");
  await page.waitForTimeout(500);
  expect(await attribution()).toBe("newsletter|newsletter|email|launch");

  await page.goto("/about/", { referer: "https://www.google.com/" });
  await expect.poll(attribution).toBe("newsletter|google|organic|");
});

// --- Link and button audit -----------------------------------------------------

// Labels every visible button so it can be found again, and notes which to skip.
function tagButtons() {
  return Array.from(document.querySelectorAll("button")).flatMap((button, index) => {
    if (button.getClientRects().length === 0 || getComputedStyle(button).visibility === "hidden") return [];
    const id = `b${index}`;
    button.setAttribute("data-audit", id);
    const name = (button.getAttribute("aria-label") || button.textContent || button.getAttribute("title") || "")
      .trim()
      .replace(/\s+/g, " ")
      .slice(0, 70);
    const zone = button.closest("footer") ? "footer" : button.closest("header") ? "header" : "main";
    let skip = "";
    if (button.disabled) skip = "disabled";
    else if (button.type === "submit" && button.form) skip = "submit";
    else if (["aria-pressed", "aria-checked", "aria-selected", "aria-current"].some((attr) => button.getAttribute(attr) === "true")) {
      skip = "already active";
    }
    return [{ id, name, zone, skip }];
  });
}

// Counts page changes, ignoring pointer effects (spotlight, tilt, magnet).
function startObserver() {
  const auditWindow = window as AuditWindow;
  auditWindow.__audit?.observer.disconnect();
  const audit = {
    count: 0,
    observer: new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === "attributes") {
          const name = record.attributeName ?? "";
          if (name.startsWith("data-fx") || name === "data-audit") continue;
          const target = record.target;
          if (
            name === "style" &&
            target instanceof Element &&
            Array.from(target.attributes).some((attr) => attr.name.startsWith("data-fx"))
          ) {
            continue;
          }
        }
        audit.count += 1;
      }
    }),
  };
  audit.observer.observe(document.documentElement, { subtree: true, childList: true, attributes: true, characterData: true });
  auditWindow.__audit = audit;
}

async function auditButtons(page: Page, path: string, tested: Set<string>, issues: string[]) {
  let clicked = 0;
  const buttons = await page.evaluate(tagButtons);
  for (const button of buttons) {
    if (!button.name) issues.push(`${path}: a button has no label for screen readers`);
    if (button.skip) continue;
    const key = button.zone === "main" ? `${path}|${button.name}` : `${button.zone}|${button.name}`;
    if (tested.has(key)) continue;
    tested.add(key);

    const locator = page.locator(`[data-audit="${button.id}"]`);
    if (!(await locator.isVisible())) continue;
    await locator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(350);
    const before = page.url();
    await page.evaluate(startObserver);

    let reload = button.zone !== "main";
    try {
      await locator.click({ timeout: 3_000 });
      await page.waitForTimeout(300);
      clicked += 1;
      const changes = await page.evaluate(() => (window as AuditWindow).__audit?.count ?? 0);
      if (page.url() !== before) reload = true;
      else if (changes === 0) issues.push(`${path} button "${button.name}": nothing happens when clicked`);
    } catch {
      reload = true;
      issues.push(`${path} button "${button.name}": can't be clicked (something covers it)`);
    }

    if (reload) {
      await page.goto(path);
      await page.evaluate(tagButtons);
    } else {
      await page.keyboard.press("Escape");
    }
  }
  return clicked;
}

// Every page in the sitemap, and every page they link to: links must open a
// real page, jump links must land on something visible, external links must
// exist, and every button must do something when clicked.
test("every link and button works", async ({ page, request }) => {
  test.setTimeout(900_000);
  await keepPopupClosed(page);
  await page.setViewportSize({ width: 1280, height: 900 });

  const sitemap = await (await request.get("/sitemap.xml")).text();
  const fromSitemap = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => new URL(match[1]).pathname);
  const queue = Array.from(new Set(["/", ...fromSitemap]));
  const seen = new Set(queue);
  const linkedFrom = new Map<string, string>();
  const visibleIds = new Map<string, Set<string>>();
  const jumpLinks: { path: string; id: string; where: string }[] = [];
  const externals = new Map<string, string>();
  const testedButtons = new Set<string>();
  const issues: string[] = [];
  let buttonsClicked = 0;

  for (let index = 0; index < queue.length && index < 200; index += 1) {
    const path = queue[index];
    const response = await request.get(path);
    if (response.status() !== 200) {
      issues.push(`${linkedFrom.get(path) ?? "sitemap"}: links to ${path}, which returns ${response.status()}`);
      continue;
    }
    if (!(response.headers()["content-type"] ?? "").includes("text/html")) continue;

    await page.goto(path);
    const found = await page.evaluate(() => {
      const isVisible = (element: Element) =>
        element.getClientRects().length > 0 && getComputedStyle(element).visibility !== "hidden";
      return {
        links: Array.from(document.querySelectorAll("a")).map((link) => ({
          href: (link.getAttribute("href") ?? "").trim(),
          name: (link.getAttribute("aria-label") || link.textContent || "").trim().replace(/\s+/g, " ").slice(0, 60),
        })),
        ids: Array.from(document.querySelectorAll("[id]"))
          .filter(isVisible)
          .map((element) => element.id),
      };
    });
    visibleIds.set(path, new Set(found.ids));

    for (const link of found.links) {
      const where = `${path} link "${link.name || "(no text)"}"`;
      const href = link.href;
      if (!href || href === "#" || href.toLowerCase().startsWith("javascript:")) {
        issues.push(`${where}: goes nowhere (${href || "no href"})`);
        continue;
      }
      if (href.startsWith("mailto:")) {
        if (!/^mailto:[^@\s]+@[^@\s]+\.[a-z]{2,}/i.test(href)) issues.push(`${where}: malformed email link ${href}`);
        continue;
      }
      if (href.startsWith("tel:")) {
        if (href.replace(/\D/g, "").length < 7) issues.push(`${where}: malformed phone link ${href}`);
        continue;
      }
      const url = new URL(href, `http://localhost${path}`);
      if (url.hostname !== "localhost" && url.hostname !== "stackandsearch.com") {
        if (!externals.has(url.href)) externals.set(url.href, where);
        continue;
      }
      if (url.hash.length > 1) jumpLinks.push({ path: url.pathname, id: decodeURIComponent(url.hash.slice(1)), where });
      if (!seen.has(url.pathname)) {
        seen.add(url.pathname);
        linkedFrom.set(url.pathname, where);
        queue.push(url.pathname);
      }
    }

    buttonsClicked += await auditButtons(page, path, testedButtons, issues);
  }

  for (const jump of jumpLinks) {
    const ids = visibleIds.get(jump.path);
    if (ids && !ids.has(jump.id)) issues.push(`${jump.where}: jumps to #${jump.id}, which is missing or hidden on ${jump.path}`);
  }

  for (const [href, where] of externals) {
    try {
      const response = await request.get(href, { timeout: 15_000 });
      if ([404, 410].includes(response.status())) issues.push(`${where}: ${href} returns ${response.status()}`);
    } catch {
      console.warn(`Couldn't reach ${href} (${where}); please check it by hand.`);
    }
  }

  console.log(`Checked ${seen.size} pages, ${externals.size} external links and ${buttonsClicked} buttons.`);
  expect(issues, `Problems found:\n${issues.join("\n")}`).toEqual([]);
});

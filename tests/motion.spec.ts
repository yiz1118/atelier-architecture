import { expect, test } from "@playwright/test";

const widths = [375, 390, 430, 768, 1024, 1440];
const routes = ["/", "/projects", "/projects/coastal-house", "/studio", "/services", "/journal", "/journal/the-shape-of-daylight", "/contact"];

test("opening imagery is immediate and selected scroll reveals run once", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator(".home-hero-image .editorial-media");
  await expect(hero).not.toHaveAttribute("data-motion", /image/);
  await expect(hero.locator("img")).toHaveCSS("opacity", "1");
  await expect(page.locator("h1")).toHaveCSS("opacity", "1");
  const title = page.locator(".home-selected h2");
  await expect(title).toHaveAttribute("data-motion-state", "waiting");
  await title.scrollIntoViewIfNeeded();
  await expect(title).toHaveAttribute("data-motion-state", "entering");
  await expect(title).toHaveCSS("animation-name", "atelier-text-reveal");
  await expect(title).toHaveAttribute("data-motion-state", "shown");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await title.scrollIntoViewIfNeeded();
  await expect(title).toHaveAttribute("data-motion-state", "shown");
  await expect(title).toHaveCSS("animation-name", "none");

  const feature = page.locator(".feature-image .editorial-media");
  await feature.scrollIntoViewIfNeeded();
  await expect(feature).toHaveAttribute("data-image-ready", "true");
  await expect(feature).toHaveAttribute("data-motion-state", "entering");
  const veil = await feature.evaluate(element => ({ display: getComputedStyle(element, "::after").display, animation: getComputedStyle(element, "::after").animationName }));
  if ((page.viewportSize()?.width ?? 0) <= 700) expect(veil.display).toBe("none");
  else expect(veil.animation).toBe("atelier-image-mask");
  await expect(feature).toHaveAttribute("data-motion-state", "shown");
  await expect(feature.locator("img")).toHaveCSS("opacity", "1");
});

test("navigation stays immediate and hover feedback preserves link geometry", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("h1")).toHaveCSS("transform", "none");
  const before = await page.locator(".home-opening").boundingBox();
  const toggle = page.getByRole("button", { name: "Menu", exact: true });
  if (testInfo.project.use.hasTouch) await toggle.tap(); else await toggle.click();
  const nav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(nav).toBeVisible();
  expect(await nav.evaluate(element => getComputedStyle(element).transitionProperty)).not.toMatch(/height|width/);
  expect(await page.locator(".home-opening").boundingBox()).toEqual(before);
  await nav.getByRole("link", { name: /Studio/ }).click();
  await expect(page).toHaveURL(/\/studio$/);
  await expect(page.getByRole("button", { name: "Menu", exact: true })).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#mobile-navigation")).toHaveAttribute("inert", "");

  await page.goto("/");
  await page.setViewportSize({ width: 1440, height: 900 });
  const link = page.locator(".home-selected .text-link");
  await link.scrollIntoViewIfNeeded();
  const bounds = await link.boundingBox();
  if (!testInfo.project.use.hasTouch) {
    await link.hover();
    await expect.poll(() => link.locator("svg").evaluate(element => getComputedStyle(element).transform)).toBe("matrix(1, 0, 0, 1, 3, -3)");
  }
  expect(await link.boundingBox()).toEqual(bounds);
});

test("reduced motion is immediate and server content works without JavaScript", async ({ page, browser }) => {
  await page.goto("/");
  await expect(page.locator(".home-selected h2")).toHaveAttribute("data-motion-state", "waiting");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("[data-motion-state=waiting], [data-motion-state=entering]")).toHaveCount(0);
  await expect(page.locator("h1")).toHaveCSS("animation-name", "none");
  for (const element of await page.locator("[data-motion]").all()) {
    await expect(element).toHaveCSS("opacity", "1");
    const image = element.locator("img");
    if (await image.count()) {
      await expect(image).toHaveCSS("opacity", "1");
      await expect(image).toHaveCSS("transform", "none");
      await expect(image).toHaveCSS("animation-name", "none");
    }
  }
  const projectLink = page.locator(".home-selected .project-card a").first();
  await projectLink.scrollIntoViewIfNeeded();
  if (await page.evaluate(() => matchMedia("(hover: hover) and (pointer: fine)").matches)) {
    await projectLink.hover();
    await expect(projectLink.locator("img")).toHaveCSS("transform", "none");
  }

  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: "reduce", viewport: { width: 390, height: 844 } });
  try {
    const fallback = await context.newPage();
    await fallback.goto("http://127.0.0.1:3204/");
    await expect(fallback.locator(".home-selected h2")).toHaveCSS("opacity", "1");
    await expect(fallback.locator(".feature-image img")).toHaveCSS("opacity", "1");
    await fallback.locator("#creator summary").click();
    await expect(fallback.locator("#creator a[data-analytics-event=creator_whatsapp]")).toBeVisible();
    await expect(fallback.locator("#creator a[data-analytics-event=creator_portfolio]")).toHaveAttribute("href", "https://alson-portfolio-nine.vercel.app/");
  } finally { await context.close(); }
});

test("motion preserves responsive content and produces no runtime errors", async ({ context }) => {
  test.setTimeout(180_000);
  const errors: string[] = [];
  for (const width of widths) {
    for (const route of routes) {
      // Inspect each document in its own tab. Replacing documents during a fast
      // sweep aborts unrelated Next prefetches and distorts WebKit console QA.
      const page = await context.newPage();
      await page.setViewportSize({ width, height: 900 });
      page.on("pageerror", error => errors.push(error.message));
      page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
      await page.goto(route);
      await page.evaluate(async () => {
        await document.fonts.ready;
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo({ top: y, behavior: "instant" });
          await new Promise(resolve => setTimeout(resolve, 35));
        }
      });
      const findings = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        transitionProperties: [...document.querySelectorAll(".text-link, .service-row, .submit-button, .mobile-nav")].map(element => getComputedStyle(element).transitionProperty),
        unseenAbove: [...document.querySelectorAll("[data-motion-state=waiting]")].filter(element => element.getBoundingClientRect().bottom < 0).length,
      }));
      expect(findings.overflow, `${route} at ${width}px`).toBeLessThanOrEqual(1);
      expect(findings.transitionProperties.join(",")).not.toMatch(/\b(height|width|gap|padding|top|left)\b/);
      await expect.poll(async () => page.locator("[data-motion-state=waiting]").evaluateAll(elements => elements.filter(element => element.getBoundingClientRect().bottom < 0).length), { message: `${route}: already-passed content remains visible` }).toBe(0);
      // Closing a test tab cancels background requests; that is outside the
      // page's active runtime, which has been monitored throughout this visit.
      page.removeAllListeners("console");
      page.removeAllListeners("pageerror");
      await page.close();
    }
  }
  expect(errors).toEqual([]);
});

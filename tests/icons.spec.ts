import { expect, test } from "@playwright/test";

const routes = ["/", "/projects", "/projects/coastal-house", "/projects/courtyard-residence", "/projects/gallery-hotel", "/projects/north-light-apartment", "/projects/urban-pavilion", "/studio", "/services", "/journal", "/journal/the-shape-of-daylight", "/journal/materials-that-acquire-character", "/journal/the-quiet-threshold", "/contact", "/missing-page"];
const widths = [375, 390, 430, 768, 1024, 1440];

// Reintroducing a text arrow lets an OS choose an emoji glyph instead of our artwork.
test("interface symbols cannot fall back to platform emoji glyphs", async ({ page }) => {
  test.setTimeout(180_000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const findings = await page.evaluate(() => {
        const forbidden = /[\u2190-\u21ff\u2b05-\u2b07\u27a1\u2630\u2637\u2713-\u2716\u2605\u2665\u2661\u2304\u2303\ufe0e\ufe0f]/u;
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const symbols: string[] = [];
        while (walker.nextNode()) {
          const node = walker.currentNode;
          if (!node.parentElement?.closest("script, style") && forbidden.test(node.textContent ?? "")) symbols.push(node.textContent ?? "");
        }
        const pseudoSymbols = [...document.querySelectorAll("body *")].flatMap((element) => ["::before", "::after"].filter((pseudo) => forbidden.test(getComputedStyle(element, pseudo).content)));
        const icons = [...document.querySelectorAll<SVGSVGElement>("svg.ui-icon, svg.menu-glyph")].map((icon) => ({
          hidden: icon.getAttribute("aria-hidden"), focusable: icon.getAttribute("focusable"), text: icon.textContent,
          stroke: getComputedStyle(icon).stroke, color: getComputedStyle(icon).color,
          background: getComputedStyle(icon).backgroundColor, fill: getComputedStyle(icon).fill,
        }));
        return { symbols, pseudoSymbols, icons, overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth };
      });
      expect(findings.symbols, `${route} at ${width}px`).toEqual([]);
      expect(findings.pseudoSymbols, `${route} pseudo-elements`).toEqual([]);
      expect(findings.icons.length, route).toBeGreaterThan(0);
      for (const icon of findings.icons) {
        expect(icon.hidden).toBe("true");
        expect(icon.focusable).toBe("false");
        expect(icon.text).toBe("");
        expect(icon.stroke).toBe(icon.color);
        expect(icon.fill).toBe("none");
        expect(icon.background).toBe("rgba(0, 0, 0, 0)");
      }
      expect(findings.overflow, `${route} at ${width}px`).toBeLessThanOrEqual(1);
    }
  }
});

test("SVG controls preserve menu, dropdown, color and motion behavior", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Menu", exact: true });
  const size = await toggle.boundingBox();
  expect(size?.width).toBeGreaterThanOrEqual(44);
  expect(size?.height).toBeGreaterThanOrEqual(44);
  if (testInfo.project.use.hasTouch) await toggle.tap(); else await toggle.click();
  await expect(page.getByRole("button", { name: "Close", exact: true })).toHaveAttribute("aria-expanded", "true");
  const contact = page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: /Contact/ });
  await expect(contact.locator("svg")).toBeVisible();
  if (testInfo.project.use.hasTouch) await contact.tap(); else await contact.click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole("button", { name: "Menu", exact: true })).toHaveAttribute("aria-expanded", "false");
  const select = page.getByRole("combobox", { name: /Project type/ });
  await expect(select).toHaveCSS("appearance", "none");
  await expect(page.locator(".select-control svg")).toHaveCSS("pointer-events", "none");
  await select.selectOption("Hospitality");
  await expect(select).toHaveValue("Hospitality");
  await expect(page.locator(".submit-button svg")).toBeVisible();
  await expect(page.locator(".footer-cta svg")).toHaveCSS("color", "rgb(243, 241, 236)");
  await expect(page.locator(".submit-button svg")).toHaveCSS("color", "rgb(36, 38, 34)");
  await page.goto("/");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.locator(".project-card").first().hover();
  await expect.poll(() => page.locator(".project-card-arrow").first().evaluate((element) => getComputedStyle(element).transform)).toBe("matrix(1, 0, 0, 1, 3, -3)");
  await page.emulateMedia({ reducedMotion: "reduce" });
  const duration = await page.locator(".project-card-arrow").first().evaluate((element) => parseFloat(getComputedStyle(element).transitionDuration));
  expect(duration).toBeLessThanOrEqual(0.001);
});

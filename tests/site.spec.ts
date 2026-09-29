import path from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const projectPaths = ["coastal-house", "courtyard-residence", "gallery-hotel", "north-light-apartment", "urban-pavilion"];
const articlePaths = ["the-shape-of-daylight", "materials-that-acquire-character", "the-quiet-threshold"];
const routes = ["/", "/projects", ...projectPaths.map((slug) => `/projects/${slug}`), "/studio", "/services", "/journal", ...articlePaths.map((slug) => `/journal/${slug}`), "/contact"];

async function scrollAll(page: import("@playwright/test").Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 75));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(250);
}

test("all pages render and their photographs load", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/ATELIER NORTH/);
    await scrollAll(page);
    const failed = await page.locator("img").evaluateAll((images) => images.filter((element) => { const image = element as HTMLImageElement; return !image.complete || image.naturalWidth === 0; }).map((image) => image.getAttribute("src")));
    expect(failed, route).toEqual([]);
  }
  expect(errors).toEqual([]);
});

test("project filters, article links and next project navigation work", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.locator(".projects-grid .project-card")).toHaveCount(5);
  await page.getByRole("button", { name: /Hospitality/ }).click();
  await expect(page.locator(".projects-grid .project-card")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "Gallery Hotel" })).toBeVisible();
  for (const [category, count] of [["Residential", 2], ["Interiors", 1], ["Commercial", 1]] as const) {
    await page.getByRole("button", { name: new RegExp(category) }).click();
    await expect(page.locator(".projects-grid .project-card")).toHaveCount(count);
  }
  await page.getByRole("button", { name: /All/ }).click();
  await page.getByRole("link", { name: "View Coastal House project" }).click();
  await expect(page).toHaveURL(/\/projects\/coastal-house$/);
  await page.getByRole("link", { name: /Next project \/ 02/ }).click();
  await expect(page).toHaveURL(/\/projects\/courtyard-residence$/);
  await page.goto("/journal");
  await page.getByRole("link", { name: /The Shape of Daylight/ }).click();
  await expect(page.getByRole("heading", { name: "Begin with the sun" })).toBeVisible();
});

test("enquiry remains a local demonstration and validates input", async ({ page }) => {
  const writes: string[] = [];
  page.on("request", (request) => { if (!["GET", "HEAD"].includes(request.method())) writes.push(`${request.method()} ${request.url()}`); });
  await page.goto("/projects/coastal-house");
  await page.getByRole("link", { name: /Discuss a similar project/ }).click();
  await expect(page.getByText("Coastal House", { exact: true })).toBeVisible();
  await expect(page.getByLabel(/Project type/)).toHaveValue("Residential");
  await page.getByRole("button", { name: /Complete demo enquiry/ }).click();
  await expect(page.getByLabel(/Name/)).toBeFocused();
  await expect(page.getByText("Please enter your name.")).toBeVisible();
  await page.getByLabel(/Name/).fill("Alex Rowan");
  await page.getByLabel(/Email/).fill("alex@example.com");
  await page.getByLabel(/Message/).fill("A renovation for a coastal property.");
  await page.getByLabel(/Email/).fill("invalid-email");
  await page.getByRole("button", { name: /Complete demo enquiry/ }).click();
  await expect(page.getByLabel(/Email/)).toBeFocused();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  await expect(page.getByLabel(/Name/)).toHaveValue("Alex Rowan");
  await page.getByLabel(/Email/).fill("alex@example.com");
  await page.getByRole("button", { name: /Complete demo enquiry/ }).click();
  await expect(page.getByRole("status")).toHaveText("Demo enquiry complete. No information has been sent or saved.");
  expect(writes).toEqual([]);
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
  expect(await page.evaluate(() => sessionStorage.length)).toBe(0);
});

test("common widths remain within the viewport", async ({ page }) => {
  for (const width of [360, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${route} at ${width}px`).toBeLessThanOrEqual(1);
      if (width >= 1024 && route.startsWith("/projects/")) {
        const conceptWidth = await page.locator(".detail-introduction h2").evaluate((element) => element.getBoundingClientRect().width);
        expect(conceptWidth, `Readable project introduction at ${width}px`).toBeGreaterThan(230);
      }
    }
  }
});

test("mobile navigation and reduced motion work", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.locator(".menu-toggle");
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();
  await menu.click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: /Studio/ }).click();
  await expect(page).toHaveURL(/\/studio$/);
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await page.emulateMedia({ reducedMotion: "reduce" });
  const duration = await page.locator(".editorial-media img").first().evaluate((image) => getComputedStyle(image).transitionDuration);
  expect(Number.parseFloat(duration)).toBeLessThanOrEqual(0.001);
});

test("enquiry can be completed with the keyboard", async ({ page }) => {
  await page.goto("/contact");
  for (let index = 0; index < 10; index++) {
    await page.keyboard.press("Tab");
    if (await page.getByLabel(/Name/).evaluate((element) => element === document.activeElement)) break;
  }
  await expect(page.getByLabel(/Name/)).toBeFocused();
  await page.keyboard.type("Sam Rivers");
  await page.keyboard.press("Tab");
  await expect(page.getByLabel(/Email/)).toBeFocused();
  await page.keyboard.type("sam@example.com");
  await page.keyboard.press("Tab");
  await expect(page.getByLabel(/Project type/)).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Tab");
  await expect(page.getByLabel(/Location/)).toBeFocused();
  await page.keyboard.type("Northumberland");
  await page.keyboard.press("Tab");
  await page.keyboard.type("One coastal home");
  await page.keyboard.press("Tab");
  await expect(page.getByLabel(/Message/)).toBeFocused();
  await page.keyboard.type("A sheltered home with a sea view.");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: /Complete demo enquiry/ })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toBeVisible();
});

test("key pages pass automated accessibility scan", async ({ page }) => {
  const violations = [];
  for (const route of ["/", "/projects", "/projects/coastal-house", "/studio", "/services", "/journal", "/journal/the-shape-of-daylight", "/contact"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    if (results.violations.length) violations.push({ route, issues: results.violations });
  }
  expect(violations).toEqual([]);
});

test("context links, keyboard navigation, optimized images and missing routes", async ({ page, request }) => {
  for (const type of ["Residential", "Hospitality", "Interiors", "Commercial"]) {
    await page.goto(`/contact?type=${type}`);
    await expect(page.getByLabel(/Project type/)).toHaveValue(type);
  }
  await page.goto("/projects?category=Interiors");
  await expect(page.locator(".projects-grid .project-card")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "North Light Apartment" })).toBeVisible();
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
  const hero = page.locator(".home-hero-image img");
  const source = await hero.evaluate((element) => (element as HTMLImageElement).currentSrc);
  expect(source).toContain("/_next/image?");
  const imageResponse = await request.get(source);
  expect(imageResponse.status()).toBe(200);
  expect(imageResponse.headers()["content-type"]).toMatch(/^image\//);
  expect((await imageResponse.body()).length).toBeGreaterThan(1000);
  for (const route of ["/projects/unknown-study", "/journal/unknown-article", "/missing-page"]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: /Some paths lead/ })).toBeVisible();
  }
});

test("portfolio screenshots", async ({ page }) => {
  const output = path.join(process.cwd(), "screenshots");
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const [route, name] of [["/", "homepage-desktop"], ["/projects", "projects-grid"], ["/projects/coastal-house", "coastal-house-detail"], ["/contact", "contact-desktop"]]) {
    await page.goto(route);
    await scrollAll(page);
    await page.screenshot({ path: path.join(output, `${name}.png`), fullPage: true, animations: "disabled" });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await scrollAll(page);
  await page.screenshot({ path: path.join(output, "homepage-mobile.png"), fullPage: true, animations: "disabled" });
});

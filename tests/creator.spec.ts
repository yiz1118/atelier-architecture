import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { creator } from "@/config/creator";

const widths = [375, 390, 430, 768, 1024, 1440];

test("the concept creator is credited separately from the studio enquiry", async ({ page }) => {
  for (const route of ["/", "/projects", "/projects/coastal-house", "/studio", "/services", "/journal", "/journal/the-shape-of-daylight", "/contact", "/missing-page"]) {
    await page.goto(route);
    const section = page.locator("#creator");
    await expect(section.getByRole("heading", { name: "Alson Chua", exact: true })).toBeVisible();
    await expect(section.getByText("Independent Concept Project", { exact: true })).toBeVisible();
    await expect(section.getByText("Independent Web & App Developer", { exact: true })).toBeVisible();
    await expect(section.getByText("Malaysia · Working with clients worldwide", { exact: true })).toBeVisible();
    await expect(section.getByText("Available for freelance projects worldwide", { exact: true })).toBeVisible();
    await expect(section.getByText("Designed & developed by", { exact: true })).toBeVisible();
    if (creator.portfolioUrl) await expect(section.getByRole("link", { name: /View Portfolio/ })).toHaveAttribute("href", creator.portfolioUrl);
    else await expect(section.getByRole("link", { name: /View Portfolio/ })).toHaveCount(0);
    await expect(page.locator(".footer-cta")).toHaveAttribute("href", "/contact");
    await expect(page.locator(".desktop-nav, .mobile-nav").getByText("Alson Chua")).toHaveCount(0);
  }
});

test("Start a Project offers properly addressed email and WhatsApp choices", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#creator");
  const start = section.getByText("Start a Project", { exact: true });
  await expect(start).toHaveAttribute("data-analytics-event", "creator_start_project");
  await start.click();
  const whatsapp = section.getByRole("link", { name: /WhatsApp/ });
  const email = section.getByRole("link", { name: /Email/ });
  await expect(whatsapp).toBeVisible();
  await expect(email).toBeVisible();
  const whatsappUrl = new URL((await whatsapp.getAttribute("href"))!);
  expect(whatsappUrl.origin + whatsappUrl.pathname).toBe("https://wa.me/601158576386");
  expect(whatsappUrl.searchParams.get("text")).toBe("Hi Alson, I came across your ATELIER NORTH concept project and I'm interested in discussing a website/app project with you.");
  const emailUrl = new URL((await email.getAttribute("href"))!);
  expect(emailUrl.pathname).toBe("alsonchua18@gmail.com");
  expect(emailUrl.searchParams.get("subject")).toBe("Project Inquiry — ATELIER NORTH");
  expect(emailUrl.searchParams.get("body")).toContain("Hi Alson,");
  expect(emailUrl.searchParams.get("body")).toContain("ATELIER NORTH concept project");
  for (const [name, destination, event] of [
    ["WhatsApp", "https://wa.me/601158576386", "creator_whatsapp"],
    ["LinkedIn", "https://www.linkedin.com/in/chua-yiz-063ba9272", "creator_linkedin"],
    ["GitHub", "https://github.com/yiz1118", "creator_github"],
  ]) {
    const link = section.getByRole("link", { name: new RegExp(name) });
    expect(await link.getAttribute("href")).toContain(destination);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    await expect(link).toHaveAttribute("data-analytics-event", event);
  }
  await expect(email).toHaveAttribute("data-analytics-event", "creator_email");
  await expect(section).toHaveAttribute("data-analytics-project", "ATELIER NORTH");
});

test("creator contacts fit common widths and work with keyboard or touch", async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const section = page.locator("#creator");
    const start = section.getByText("Start a Project", { exact: true });
    await start.scrollIntoViewIfNeeded();
    if (testInfo.project.use.hasTouch) await start.tap();
    else { await start.focus(); await page.keyboard.press("Enter"); }
    await expect(section.getByRole("link", { name: /WhatsApp/ })).toBeVisible();
    for (const control of await section.locator("a, summary").all()) {
      const bounds = await control.boundingBox();
      expect(bounds?.height, `${width}px ${await control.textContent()}`).toBeGreaterThanOrEqual(44);
      expect(bounds?.x).toBeGreaterThanOrEqual(0);
      expect((bounds?.x ?? 0) + (bounds?.width ?? 0)).toBeLessThanOrEqual(width);
    }
    const metrics = await section.evaluate((element) => ({ text: element.textContent, overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, clipped: [...element.querySelectorAll<HTMLElement>(".creator-contact-address")].some(item => item.scrollWidth > item.clientWidth + 1) }));
    expect(metrics.overflow).toBeLessThanOrEqual(1);
    expect(metrics.clipped).toBe(false);
    expect(metrics.text).not.toMatch(/[\u2190-\u21ff\u2b05-\u2b07\u27a1\ufe0f\ufe0e]/u);
    const issues = await new AxeBuilder({ page }).include("#creator").analyze();
    expect(issues.violations).toEqual([]);
    await start.focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Shift+Tab");
    const focus = await start.evaluate(element => getComputedStyle(element).outlineStyle);
    expect(focus).not.toBe("none");
    await page.keyboard.press("Tab");
    await expect(section.getByRole("link", { name: /WhatsApp/ })).toBeFocused();
    await start.focus();
    await page.keyboard.press("Enter");
    await expect(section.getByRole("link", { name: /WhatsApp/ })).not.toBeVisible();
  }
});

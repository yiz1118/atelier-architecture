import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import sharp from "sharp";

const output = path.resolve("qa/motion");
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });

async function walk(page) {
  await page.goto("http://127.0.0.1:3204/");
  await page.evaluate(() => document.fonts.ready);
  await page.locator(".home-hero-image img").evaluate(image => image.decode());
  await page.waitForTimeout(800);
  for (const section of [".home-selected", ".philosophy-section", ".home-services", ".feature-image", ".journal-preview-grid", "#creator"]) {
    const target = page.locator(section);
    if (!await target.count()) continue;
    await target.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1100);
  }
  await page.locator("#creator summary").click();
  await page.waitForTimeout(400);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(400);
}

try {
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await desktop.newPage();
  await page.goto("http://127.0.0.1:3204/");
  await page.locator(".home-hero-image img").evaluate(image => image.decode());
  const image = page.locator(".feature-image .editorial-media");
  await image.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector(".feature-image .editorial-media")?.getAttribute("data-motion-state") === "entering");
  for (const [name, time] of [["early", 120], ["middle", 500]]) {
    await image.evaluate((element, currentTime) => {
      for (const animation of element.getAnimations({ subtree: true })) {
        animation.pause();
        animation.currentTime = currentTime;
      }
    }, time);
    await page.screenshot({ path: path.join(output, `feature-${name}-desktop.png`) });
  }
  await image.evaluate(element => element.getAnimations({ subtree: true }).forEach(animation => animation.finish()));
  await page.waitForFunction(() => document.querySelector(".feature-image .editorial-media")?.getAttribute("data-motion-state") === "shown");
  await page.screenshot({ path: path.join(output, "feature-settled-desktop.png") });
  await walk(page);
  await page.screenshot({ path: path.join(output, "home-desktop.png") });
  await desktop.close();

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
  const phone = await mobile.newPage();
  await walk(phone);
  await phone.screenshot({ path: path.join(output, "home-mobile.png") });
  await phone.getByRole("button", { name: "Menu", exact: true }).tap();
  await phone.waitForTimeout(400);
  await phone.screenshot({ path: path.join(output, "menu-mobile.png") });
  await phone.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: /Studio/ }).tap();
  await phone.waitForURL("**/studio");
  await phone.waitForTimeout(800);
  await mobile.close();

  const labels = ["Image reveal / 120 ms", "Image reveal / 500 ms", "Image reveal / settled"];
  const frames = [];
  for (const [index, state] of ["early", "middle", "settled"].entries()) {
    const frame = await sharp(path.join(output, `feature-${state}-desktop.png`)).resize(720, 450).png().toBuffer();
    const label = Buffer.from(`<svg width="720" height="40"><rect width="720" height="40" fill="#f3f1ec"/><text x="20" y="27" font-family="sans-serif" font-size="16" fill="#242622">${labels[index]}</text></svg>`);
    frames.push({ input: label, top: 0, left: index * 720 }, { input: frame, top: 40, left: index * 720 });
  }
  await sharp({ create: { width: 2160, height: 490, channels: 3, background: "#f3f1ec" } }).composite(frames).png().toFile(path.join(output, "image-reveal-review.png"));
  console.log("Completed desktop/mobile walkthroughs and saved reveal review frames.");
} finally { await browser.close(); }

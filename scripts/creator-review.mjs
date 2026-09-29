import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import sharp from "sharp";

const output = path.resolve("qa/creator");
await fs.mkdir(output, { recursive: true });
const widths = [375, 390, 430, 768, 1024, 1440];
const routes = ["/", "/projects", "/projects/coastal-house", "/studio", "/services", "/journal", "/journal/the-shape-of-daylight", "/contact"];
const baseline = JSON.parse(await fs.readFile(path.join(output, "before-layout.json"), "utf8"));
const snapshots = {};
const differences = [];
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ reducedMotion: "reduce" });
try {
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(`http://localhost:3204${route}`);
      await page.evaluate(() => document.fonts.ready);
      const key = `${width}:${route}`;
      snapshots[key] = await page.evaluate(() => [...document.querySelectorAll(".site-header-inner,main h1,main h2,main .editorial-media,.footer-top,.footer-bottom,.footer-cta")].map(element => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return { tag: element.tagName, class: element.className, rect: [rect.x, rect.y + scrollY, rect.width, rect.height].map(value => Math.round(value * 100) / 100), font: [style.fontFamily, style.fontSize, style.fontWeight, style.lineHeight, style.letterSpacing], colors: [style.color, style.backgroundColor], spacing: [style.padding, style.gap] };
      }));
      snapshots[key].forEach((element, index) => {
        const previous = baseline[key][index];
        if (!previous || element.rect.some((value, axis) => Math.abs(value - previous.rect[axis]) > .5) || JSON.stringify(element.font) !== JSON.stringify(previous.font) || JSON.stringify(element.colors) !== JSON.stringify(previous.colors) || JSON.stringify(element.spacing) !== JSON.stringify(previous.spacing)) differences.push({ key, index, previous, current: element });
      });
      if (snapshots[key].length !== baseline[key].length) differences.push({ key, issue: "Core element count changed" });
      if (route === "/") {
        await page.mouse.move(0, 0);
        await page.locator("#creator").screenshot({ path: path.join(output, `creator-${width}-closed.png`) });
        await page.locator(".creator-start").click();
        await page.mouse.move(0, 0);
        await page.locator("#creator").screenshot({ path: path.join(output, `creator-${width}-open.png`) });
        if ([390, 1440].includes(width)) await page.locator(".site-footer").screenshot({ path: path.join(output, `footer-${width}.png`) });
      }
    }
    console.log(`Creator reviewed at ${width}px`);
  }
} finally { await browser.close(); }
await fs.writeFile(path.join(output, "after-layout.json"), JSON.stringify(snapshots, null, 2));
await fs.writeFile(path.join(output, "core-layout-differences.json"), JSON.stringify(differences, null, 2));
for (const width of widths) {
  const panels = await Promise.all(["closed", "open"].map(async state => sharp(path.join(output, `creator-${width}-${state}.png`)).resize({ width: 570, withoutEnlargement: true }).png().toBuffer({ resolveWithObject: true })));
  const title = Buffer.from(`<svg width="1200" height="35"><rect width="1200" height="35" fill="#e6e2da"/><text x="15" y="23" font-size="14" font-family="Arial">${width}px | CREATOR / CLOSED (left) + CONTACT CHOICES (right)</text></svg>`);
  await sharp({ create: { width: 1200, height: Math.max(...panels.map(panel => panel.info.height)) + 60, channels: 3, background: "#f3f1ec" } }).composite([{ input: title, left: 0, top: 0 }, ...panels.map((panel, index) => ({ input: panel.data, left: index * 600 + 15, top: 45 }))]).png().toFile(path.join(output, `review-${width}.png`));
}
console.log(`Core layout changes above 0.5px or changed styles: ${differences.length}`);
if (differences.length) process.exitCode = 1;

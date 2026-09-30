import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const output = path.resolve("qa/motion");
await fs.mkdir(output, { recursive: true });
const baselineMode = process.argv.includes("--baseline");
const widths = [375, 390, 430, 768, 1024, 1440];
const routes = ["/", "/projects", "/projects/coastal-house", "/projects/courtyard-residence", "/projects/gallery-hotel", "/projects/north-light-apartment", "/projects/urban-pavilion", "/studio", "/services", "/journal", "/journal/the-shape-of-daylight", "/journal/materials-that-acquire-character", "/journal/the-quiet-threshold", "/contact"];
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ reducedMotion: "reduce" });
const snapshots = {};
try {
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(`http://127.0.0.1:3204${route}`);
      await page.evaluate(() => document.fonts.ready);
      snapshots[`${width}:${route}`] = await page.evaluate(() => ({
        text: document.querySelector("main")?.textContent?.replace(/\s+/g, " ").trim(),
        elements: [...document.querySelectorAll(".site-header-inner, main h1, main h2, main .editorial-media, .footer-top, .footer-bottom, .creator-grid")].map(element => {
          const rect = element.getBoundingClientRect();
          const css = getComputedStyle(element);
          return { tag: element.tagName, class: element.className, rect: [rect.x, rect.y + scrollY, rect.width, rect.height].map(value => Math.round(value * 100) / 100), font: [css.fontFamily, css.fontSize, css.fontWeight, css.lineHeight, css.letterSpacing], colors: [css.color, css.backgroundColor], spacing: [css.padding, css.gap] };
        }),
      }));
    }
    console.log(`Core presentation measured at ${width}px`);
  }
} finally { await browser.close(); }
await fs.writeFile(path.join(output, baselineMode ? "before-layout.json" : "after-layout.json"), JSON.stringify(snapshots, null, 2));
if (!baselineMode) {
  const before = JSON.parse(await fs.readFile(path.join(output, "before-layout.json"), "utf8"));
  const differences = [];
  for (const [key, current] of Object.entries(snapshots)) {
    const previous = before[key];
    if (current.text !== previous.text) differences.push({ key, issue: "Page text changed" });
    if (current.elements.length !== previous.elements.length) differences.push({ key, issue: "Core element count changed" });
    current.elements.forEach((element, index) => {
      const old = previous.elements[index];
      if (!old || element.rect.some((value, axis) => Math.abs(value - old.rect[axis]) > .5) || JSON.stringify(element.font) !== JSON.stringify(old.font) || JSON.stringify(element.colors) !== JSON.stringify(old.colors) || JSON.stringify(element.spacing) !== JSON.stringify(old.spacing)) differences.push({ key, index, previous: old, current: element });
    });
  }
  await fs.writeFile(path.join(output, "layout-differences.json"), JSON.stringify(differences, null, 2));
  console.log(`Core presentation differences: ${differences.length}`);
  if (differences.length) process.exitCode = 1;
}

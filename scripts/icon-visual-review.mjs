import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import sharp from "sharp";

const phase = process.argv[2];
if (!["before", "after"].includes(phase)) throw new Error("Choose before or after.");
const root = path.resolve("qa/icon-consistency");
const output = path.join(root, phase);
await fs.mkdir(output, { recursive: true });
const widths = [375, 390, 430, 768, 1024, 1440];
const routes = ["/", "/projects", "/projects/coastal-house", "/projects/courtyard-residence", "/projects/gallery-hotel", "/projects/north-light-apartment", "/projects/urban-pavilion", "/studio", "/services", "/journal", "/journal/the-shape-of-daylight", "/journal/materials-that-acquire-character", "/journal/the-quiet-threshold", "/contact", "/missing-page"];
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ reducedMotion: "reduce" });
const snapshots = {};
const cropSelectors = {
  "/": [".section-intro .text-link", ".project-card-meta", ".service-row", ".footer-cta"],
  "/projects/coastal-house": [".back-row", ".next-project"],
  "/studio": [".capability-list a"],
  "/contact": [".field:has(select)", ".submit-button"],
};
const cropped = [];
try {
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(`http://localhost:3204${route}`);
      await page.evaluate(() => document.fonts.ready);
      snapshots[`${width}:${route}`] = await page.evaluate(() => [...document.querySelectorAll(".page-shell, h1, h2, h3, .editorial-media, .text-link, .project-card-meta, .service-row, .capability-list a, .site-header-inner, .menu-toggle, .next-project, .field input, .field select, .field textarea, .submit-button, .footer-top, .footer-bottom")].map((element) => {
        const r = element.getBoundingClientRect();
        const s = getComputedStyle(element);
        return { tag: element.tagName, class: element.className, rect: [r.x, r.y + window.scrollY, r.width, r.height].map(v => Math.round(v * 100) / 100), font: [s.fontFamily, s.fontSize, s.fontWeight, s.lineHeight, s.letterSpacing], spacing: [s.padding, s.margin, s.gap], colors: [s.color, s.backgroundColor, s.borderColor] };
      }));
      for (const [index, selector] of (cropSelectors[route] ?? []).entries()) {
        const file = `${width}-${route.replaceAll("/", "_") || "home"}-${index}.png`;
        await page.locator(selector).first().screenshot({ path: path.join(output, file), animations: "disabled" });
        cropped.push({ width, file, label: `${route} ${selector}` });
      }
      if (route === "/" && width <= 768) {
        await page.locator(".menu-toggle").click();
        const file = `${width}-menu.png`;
        await page.locator(".site-header").screenshot({ path: path.join(output, file), animations: "disabled" });
        cropped.push({ width, file, label: "Mobile menu" });
      }
    }
    console.log(`${phase}: captured ${width}px`);
  }
} finally { await browser.close(); }
await fs.writeFile(path.join(root, `${phase}-layout.json`), JSON.stringify(snapshots, null, 2));
await fs.writeFile(path.join(root, `${phase}-crops.json`), JSON.stringify(cropped, null, 2));

if (phase === "after") {
  const before = JSON.parse(await fs.readFile(path.join(root, "before-layout.json"), "utf8"));
  const differences = [];
  for (const [key, elements] of Object.entries(snapshots)) {
    if (before[key].length !== elements.length) differences.push({ key, issue: "element count changed" });
    elements.forEach((element, index) => {
      const prior = before[key][index];
      if (!prior) return;
      const delta = element.rect.map((value, axis) => Math.round((value - prior.rect[axis]) * 100) / 100);
      if (delta.some(value => Math.abs(value) > .5) || JSON.stringify(element.font) !== JSON.stringify(prior.font) || JSON.stringify(element.spacing) !== JSON.stringify(prior.spacing) || JSON.stringify(element.colors) !== JSON.stringify(prior.colors)) differences.push({ key, index, class: element.class, delta, before: prior, after: element });
    });
  }
  await fs.writeFile(path.join(root, "layout-differences.json"), JSON.stringify(differences, null, 2));
  console.log(`Layout differences above 0.5px or changed styles: ${differences.length}`);
  for (const width of widths) {
    const panels = [];
    let top = 0;
    for (const crop of cropped.filter(item => item.width === width)) {
      const pair = await Promise.all(["before", "after"].map(async stage => sharp(path.join(root, stage, crop.file)).resize({ width: 570, withoutEnlargement: true }).png().toBuffer({ resolveWithObject: true })));
      const label = Buffer.from(`<svg width="1200" height="28"><rect width="1200" height="28" fill="#e6e2da"/><text x="12" y="18" font-size="12" font-family="Arial">${width}px | ${crop.label.replaceAll("&", "&amp;")} | BEFORE (left) / AFTER (right)</text></svg>`);
      panels.push({ input: label, left: 0, top });
      top += 34;
      pair.forEach((item, index) => panels.push({ input: item.data, left: index * 600 + 12, top }));
      top += Math.max(...pair.map(item => item.info.height)) + 24;
    }
    await sharp({ create: { width: 1200, height: top, channels: 3, background: "#f3f1ec" } }).composite(panels).png().toFile(path.join(root, `comparison-${width}.png`));
  }
}

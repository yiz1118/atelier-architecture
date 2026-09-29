import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const origin = process.env.AUDIT_ORIGIN || "http://127.0.0.1:3204";
const output = new URL("../qa/", import.meta.url);
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage();
  for (const width of [360, 390, 768, 1024, 1440, 1920]) {
    const panels = [];
    const panelHeight = Math.round(900 * 360 / width);
    await page.setViewportSize({ width, height: 900 });
    for (const [route, section] of [
      ["/", ".home-opening"],
      ["/projects", ".projects-grid"],
      ["/projects/coastal-house", ".detail-introduction"],
      ["/studio", ".studio-belief"],
      ["/services", ".service-detail"],
      ["/journal", ".journal-list"],
      ["/journal/the-shape-of-daylight", ".article-body"],
      ["/contact", ".contact-layout"],
    ]) {
      await page.goto(`${origin}${route}`);
      await page.locator(section).first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all([...document.images].filter((image) => {
          const rect = image.getBoundingClientRect();
          return rect.top < innerHeight && rect.bottom > 0;
        }).map((image) => image.decode().catch(() => {})));
      });
      const buffer = await page.screenshot({ animations: "disabled" });
      const panel = await sharp(buffer).resize({ width: 360, height: panelHeight }).png().toBuffer();
      panels.push(panel);
    }
    await sharp({ create: { width: 1440, height: panelHeight * 2, channels: 3, background: "#e6e2da" } })
      .composite(panels.map((input, index) => ({ input, left: (index % 4) * 360, top: Math.floor(index / 4) * panelHeight })))
      .png().toFile(fileURLToPath(new URL(`responsive-${width}.png`, output)));
    console.log(`Reviewed sheet: ${width}px`);
  }
} finally {
  await browser.close();
}

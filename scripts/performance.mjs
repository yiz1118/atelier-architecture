import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { chromium } from "@playwright/test";

const origin = process.env.AUDIT_ORIGIN || "http://127.0.0.1:3204";
const output = new URL("../qa/", import.meta.url);
await fs.mkdir(output, { recursive: true });

// Prime only the production image conversion cache. Lighthouse still resets
// browser storage for its own cold navigation and simulated network measurement.
const warmBrowser = await chromium.launch({ channel: "chrome" });
try {
  for (const width of [1440, 412]) {
    const warmPage = await warmBrowser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: width === 412 ? 1.75 : 1 });
    await warmPage.goto(origin);
    await warmPage.locator(".home-hero-image img").evaluate(async (element) => { await element.decode(); });
    await warmPage.close();
  }
} finally {
  await warmBrowser.close();
}

for (const formFactor of ["desktop", "mobile"]) {
  const profile = new URL(`.profiles/${formFactor}/`, output);
  await fs.mkdir(profile, { recursive: true });
  const chrome = await launch({
    chromeFlags: ["--headless", "--no-sandbox"],
    userDataDir: fileURLToPath(profile),
  });
  try {
    const result = await lighthouse(origin, {
      port: chrome.port,
      output: ["json", "html"],
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      ...(formFactor === "desktop" ? {
        formFactor: "desktop",
        screenEmulation: { mobile: false, width: 1440, height: 900, deviceScaleFactor: 1, disabled: false },
        throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1 },
      } : {}),
    });
    if (!result || result.lhr.runtimeError) throw new Error(result?.lhr.runtimeError?.message || "Lighthouse returned no result");
    await fs.writeFile(new URL(`lighthouse-${formFactor}.json`, output), result.report[0]);
    await fs.writeFile(new URL(`lighthouse-${formFactor}.html`, output), result.report[1]);
    console.log(JSON.stringify({
      formFactor,
      scores: Object.fromEntries(Object.entries(result.lhr.categories).map(([name, category]) => [name, Math.round(category.score * 100)])),
      metrics: Object.fromEntries(["first-contentful-paint", "largest-contentful-paint", "total-blocking-time", "cumulative-layout-shift", "speed-index"].map((key) => [key, result.lhr.audits[key].displayValue])),
      opportunities: Object.values(result.lhr.audits).filter((audit) => audit.details?.type === "opportunity" && audit.score !== 1).map((audit) => ({ title: audit.title, value: audit.displayValue })),
    }));
  } finally {
    await chrome.kill();
  }
}

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 45_000,
  expect: { timeout: 12_000 },
  workers: 2,
  reporter: [["list"], ["json", { outputFile: "qa/browser-results.json" }]],
  use: { ...devices["Desktop Chrome"], channel: "chrome", baseURL: "http://127.0.0.1:3204", trace: "retain-on-failure" },
  webServer: {
    command: "npm run start -- -p 3204",
    url: "http://127.0.0.1:3204",
    reuseExistingServer: !process.env.CI,
    timeout: 90_000,
  },
});

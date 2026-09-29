import { defineConfig, devices } from "@playwright/test";
import base from "./playwright.config";

export default defineConfig({
  ...base,
  testMatch: "icons.spec.ts",
  workers: 2,
  reporter: [["list"], ["json", { outputFile: "qa/icon-consistency/browser-matrix.json" }]],
  use: { baseURL: "http://127.0.0.1:3204", trace: "retain-on-failure" },
  projects: [
    { name: "windows-chrome", use: { ...devices["Desktop Chrome"], channel: "chrome" } },
    { name: "windows-edge", use: { ...devices["Desktop Edge"], channel: "msedge" } },
    { name: "webkit-desktop", use: { ...devices["Desktop Safari"] } },
    { name: "webkit-iphone", use: { ...devices["iPhone 13"] } },
    { name: "chrome-android-emulation", use: { ...devices["Pixel 7"], channel: "chrome" } },
  ],
});

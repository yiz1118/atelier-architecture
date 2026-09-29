import { defineConfig } from "@playwright/test";
import crossPlatform from "./playwright.icons.config";

export default defineConfig({
  ...crossPlatform,
  testMatch: "creator.spec.ts",
  reporter: [["list"], ["json", { outputFile: "qa/creator/browser-matrix.json" }]],
});

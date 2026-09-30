import { defineConfig } from "@playwright/test";
import browsers from "./playwright.icons.config";

export default defineConfig({
  ...browsers,
  testMatch: "motion.spec.ts",
  reporter: [["list"], ["json", { outputFile: "qa/motion/browser-matrix.json" }]],
});

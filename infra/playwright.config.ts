import { defineConfig, devices } from "@playwright/test";

// Default target: production deploy. Override with TEST_URL=http://localhost:8787
// to run against `wrangler dev`. Use || (not ??) so an empty TEST_URL="" falls
// back to the default rather than producing an invalid "" baseURL.
const baseURL = process.env.TEST_URL || "https://california-election.tedmao.workers.dev";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  fullyParallel: true,
  retries: 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    headless: true,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium-desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 } },
    },
    {
      // iPhone-13 device emulation but driven by chromium so we don't need
      // a separate webkit binary (mobile.spec.ts only checks layout, not
      // browser-specific behavior).
      name: "chromium-mobile",
      use: {
        browserName: "chromium",
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
        userAgent:
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
      },
    },
  ],
});

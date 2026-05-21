import { test as base, expect } from "@playwright/test";

// Shared test fixtures.
//
// The suite's default baseURL is the production deploy (see playwright.config.ts),
// so a plain `npm test` drives the LIVE site. The app fires fire-and-forget
// analytics (emitEvent → POST /api/event) and the flag button (POST /api/flag),
// which would otherwise write test rows into production D1 on every run.
//
// Guard: unless TEST_URL points at a local dev server, intercept those write
// endpoints and fulfill them locally so the suite can never pollute prod. When
// running against localhost we let the writes through, so the write-path tests
// in api.spec.ts exercise real D1.
const target = process.env.TEST_URL ?? "";
const isLocalTarget = target !== "" && !/workers\.dev/.test(target);

export const test = base.extend({
  page: async ({ page }, use) => {
    if (!isLocalTarget) {
      const ok = (route: import("@playwright/test").Route) =>
        route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
      await page.route("**/api/event", ok);
      await page.route("**/api/flag", ok);
    }
    await use(page);
  },
});

export { expect };

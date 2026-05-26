import { test as base, expect } from "@playwright/test";

// Shared test fixtures.
//
// The suite's default baseURL is the production deploy (see playwright.config.ts),
// so a plain `npm test` drives the LIVE site. The app fires fire-and-forget
// analytics (emitEvent → POST /api/tally) and the flag button (POST /api/flag),
// which would otherwise write test rows into production D1 on every run.
//
// Guard: unless TEST_URL points at a local dev server, intercept those write
// endpoints on the page and fulfill them locally, so in-page fetches (emitEvent,
// the flag button) can't pollute prod. When running against localhost we let the
// writes through, so the write-path tests in api.spec.ts exercise real D1.
//
// NOTE: this only covers browser-driven `page` requests. Direct `request`
// (APIRequestContext) writes bypass page.route — api.spec.ts's request-based
// write tests must keep self-gating with test.skip(!isLocalTarget).
const target = process.env.TEST_URL ?? "";
const isLocalTarget = target !== "" && !/workers\.dev/.test(target);

export const test = base.extend({
  page: async ({ page }, use) => {
    if (!isLocalTarget) {
      const ok = (route: import("@playwright/test").Route) =>
        route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
      await page.route("**/api/tally", ok);
      await page.route("**/api/flag", ok);
    }
    await use(page);
  },
});

export { expect };

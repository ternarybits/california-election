import { test, expect } from "@playwright/test";

// Mobile-only assertions. Run by the chromium-mobile project in playwright.config.ts.
// Skip when running on desktop viewports.
test.skip(({ viewport }) => (viewport?.width ?? 0) > 600, "mobile-only");

test.describe("Mobile layout", () => {
  test("intro fits viewport without overflow", async ({ page }) => {
    await page.goto("/");
    const main = await page.locator("main.container").boundingBox();
    const viewport = page.viewportSize();
    expect(main).not.toBeNull();
    expect(viewport).not.toBeNull();
    expect(main!.x).toBeGreaterThanOrEqual(0);
    expect(main!.x + main!.width).toBeLessThanOrEqual(viewport!.width + 1);
  });

  test("buttons meet 44pt minimum tap target", async ({ page }) => {
    await page.goto("/");
    const btn = await page.getByRole("button", { name: /start the quiz/i }).boundingBox();
    expect(btn).not.toBeNull();
    expect(btn!.height).toBeGreaterThanOrEqual(44);
  });

  test("nav row stacks correctly with back left, skip/next right", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /start the quiz/i }).click();
    await expect(page.locator("#policy-quiz")).toBeVisible();
    const back = await page.locator("#pq-back").boundingBox();
    const next = await page.locator("#pq-next").boundingBox();
    expect(back).not.toBeNull();
    expect(next).not.toBeNull();
    expect(back!.x).toBeLessThan(next!.x);
  });
});

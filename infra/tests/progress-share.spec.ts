import { test, expect } from "./fixtures";

// Progress bar + intro "share this quiz" control.

test.describe("Progress bar", () => {
  test("fills further on Q2 than Q1", async ({ page }) => {
    await page.goto("/");
    await page.locator("#start-btn").click();
    await expect(page.locator("#policy-quiz")).toBeVisible();

    const fill = page.locator("#policy-quiz .progress-fill");
    await expect(fill).toBeVisible();

    const widthOf = async () =>
      (await fill.evaluate((el) => (el as HTMLElement).getBoundingClientRect().width)) as number;

    const q1 = await widthOf();
    expect(q1).toBeGreaterThan(0);

    // Answer Q1 and advance.
    await page.locator("#pq-options input[type='radio']").first().check();
    await page.locator("#pq-next").click();
    await expect(page.locator("#pq-progress")).toContainText(/Question 2/);

    // Width transitions; poll until it grows past Q1.
    await expect.poll(widthOf).toBeGreaterThan(q1);
  });
});

test.describe("Intro share", () => {
  test("share-this-quiz copies the base quiz URL", async ({ page, context, browserName }) => {
    test.skip(browserName !== "chromium", "clipboard permissions are chromium-specific here");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");

    await page.locator("#share-quiz").click();
    await expect(page.locator("#intro-share-status")).toContainText(/copied/i);

    const clip = await page.evaluate(() => navigator.clipboard.readText());
    // Base page URL, with no result hash.
    expect(clip).not.toContain("#r=");
    expect(clip).toMatch(/^https?:\/\//);
  });
});

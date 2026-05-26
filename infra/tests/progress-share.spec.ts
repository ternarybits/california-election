import { test, expect } from "./fixtures";

// Progress bar + intro "share this quiz" control.

test.describe("Progress bar", () => {
  test("fills further on Q2 than Q1", async ({ page }) => {
    await page.goto("/");
    await page.locator("#start-btn").click();
    await expect(page.locator("#policy-quiz")).toBeVisible();

    const fill = page.locator("#policy-quiz .progress-fill");
    await expect(fill).toBeVisible();

    // Read the explicit width percentage the app sets (e.g. "8%"), not the
    // measured pixel width — that's deterministic and free of CSS-transition
    // timing, so it can't flake on a mid-animation sample.
    const pctOf = async () =>
      (await fill.evaluate((el) => parseFloat((el as HTMLElement).style.width) || 0)) as number;

    await expect.poll(pctOf).toBeGreaterThan(0);
    const q1 = await pctOf();

    // Answer Q1 and advance.
    await page.locator("#pq-options input[type='radio']").first().check();
    await page.locator("#pq-next").click();
    await expect(page.locator("#pq-progress")).toContainText(/Question 2/);

    // Q2's progress percentage must exceed Q1's.
    await expect.poll(pctOf).toBeGreaterThan(q1);
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

import { test, expect } from "@playwright/test";

test.describe("Quiz navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /start the quiz/i }).click();
    await expect(page.locator("#policy-quiz")).toBeVisible();
  });

  test("nav layout: back on left, skip/next on right", async ({ page }) => {
    const nav = page.locator("#policy-quiz .nav-row");
    await expect(nav).toBeVisible();
    const back = nav.locator("#pq-back");
    const skip = nav.locator("#pq-skip");
    const next = nav.locator("#pq-next");
    const backBox = await back.boundingBox();
    const skipBox = await skip.boundingBox();
    const nextBox = await next.boundingBox();
    expect(backBox).not.toBeNull();
    expect(skipBox).not.toBeNull();
    expect(nextBox).not.toBeNull();
    // back should be left of skip, skip should be left of next
    expect(backBox!.x).toBeLessThan(skipBox!.x);
    expect(skipBox!.x).toBeLessThan(nextBox!.x);
  });

  test("back is disabled on first question, enabled on later questions", async ({ page }) => {
    await expect(page.locator("#pq-back")).toBeDisabled();
    // Pick any option and advance
    await page.locator("#pq-options label").first().click();
    await page.locator("#pq-next").click();
    await expect(page.locator("#pq-progress")).toContainText(/Question 2/);
    await expect(page.locator("#pq-back")).toBeEnabled();
  });

  test("back restores the prior answer", async ({ page }) => {
    // Q1: pick stance 3 (the middle option for tax_top_wealth)
    const opt3 = page.locator("#pq-options input[value='3']");
    await opt3.check();
    await expect(page.locator("#pq-next")).toBeEnabled();
    await page.locator("#pq-next").click();
    await expect(page.locator("#pq-progress")).toContainText(/Question 2/);

    // Click back, expect to be on Q1 with stance 3 still selected and next enabled
    await page.locator("#pq-back").click();
    await expect(page.locator("#pq-progress")).toContainText(/Question 1/);
    await expect(opt3).toBeChecked();
    await expect(page.locator("#pq-next")).toBeEnabled();
  });

  test("importance slider value is preserved across back-navigation", async ({ page }) => {
    // Pick an option, set importance high (2), advance, back, verify slider still shows 2
    await page.locator("#pq-options label").first().click();
    await page.locator("#pq-importance").fill("2");
    await page.locator("#pq-next").click();
    await page.locator("#pq-back").click();
    await expect(page.locator("#pq-importance")).toHaveValue("2");
  });

  test("skip records a no-answer and advances", async ({ page }) => {
    await page.locator("#pq-skip").click();
    await expect(page.locator("#pq-progress")).toContainText(/Question 2/);
    // Back to Q1 — no option should be checked
    await page.locator("#pq-back").click();
    const anyChecked = await page.locator("#pq-options input[type='radio']:checked").count();
    expect(anyChecked).toBe(0);
    // Next should be disabled because no option selected
    await expect(page.locator("#pq-next")).toBeDisabled();
  });
});

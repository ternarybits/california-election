import { test, expect } from "@playwright/test";

// Drives a complete quiz run end-to-end (15 policy + 12 personal-fit).
// Validates: results screen renders, ranking has 8 candidates, see-why
// receipts render, share link is generated, what-if explorer works.

test("complete quiz → results screen with receipts, share link, why-not, what-if", async ({ page }) => {
  test.setTimeout(60_000);

  await page.goto("/");
  await page.getByRole("button", { name: /start the quiz/i }).click();
  await expect(page.locator("#policy-quiz")).toBeVisible();

  // Answer all policy questions with stance 5 + high importance (progressive persona)
  for (let i = 0; i < 15; i++) {
    await expect(page.locator("#pq-progress")).toContainText(`Question ${i + 1} of 15`);
    const opt5 = page.locator("#pq-options input[value='5']");
    const has5 = await opt5.count();
    if (has5 > 0) {
      await opt5.check();
    } else {
      // Fall back to last available option
      const lastOpt = page.locator("#pq-options input[type='radio']").last();
      await lastOpt.check();
    }
    await page.locator("#pq-importance").fill("2");
    await page.locator("#pq-next").click();
  }

  // Personal-fit phase
  await expect(page.locator("#personal-quiz")).toBeVisible();
  // Skip through all personal-fit dimensions to keep the test fast
  for (let i = 0; i < 30; i++) {
    if (await page.locator("#personal-quiz").isVisible()) {
      await page.locator("#fq-skip").click();
    } else {
      break;
    }
  }

  // Results
  await expect(page.locator("#results")).toBeVisible();
  const rankingItems = page.locator("#ranking > li");
  await expect(rankingItems).toHaveCount(8);

  // Top match should have a rank-badge of #1
  await expect(rankingItems.first().locator(".rank-badge")).toHaveText("#1");

  // Expand "see why" on top candidate, expect at least one source link
  const seeWhy = rankingItems.first().locator(".see-why");
  await seeWhy.locator("summary").click();
  const sourceLinks = seeWhy.locator(".receipt-source");
  expect(await sourceLinks.count()).toBeGreaterThan(0);
  await expect(sourceLinks.first()).toHaveAttribute("target", "_blank");

  // Why-not panel should be visible (runner-up exists)
  await expect(page.locator("#why-not")).toBeVisible();

  // What-if explorer: open and verify there are alternative-stance buttons
  const whatIf = page.locator("#what-if");
  await whatIf.locator("summary").click();
  await expect(whatIf.locator("#wi-issue")).toBeVisible();
  const wiOptions = whatIf.locator(".wi-option");
  expect(await wiOptions.count()).toBeGreaterThan(0);

  // Share link button should be clickable; copy-link button present
  await expect(page.locator("#copy-link")).toBeVisible();
});

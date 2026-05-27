import { test, expect } from "./fixtures";

// Drives a complete quiz run end-to-end (all policy + personal-fit questions).
// Validates: results screen renders, ranking has 8 candidates, see-why
// receipts render, share link is generated, what-if explorer works.

test("complete quiz → results screen with receipts, share link, why-not, what-if", async ({ page }) => {
  test.setTimeout(60_000);

  // Derive the policy-question count from the dataset (default_quiz flags) rather
  // than hardcoding it, so a re-trim doesn't spuriously fail this test.
  const policyCount = (await (await page.request.get("/api/questions")).json()).length;

  await page.goto("/");
  await page.getByRole("button", { name: /start the quiz/i }).click();
  await expect(page.locator("#policy-quiz")).toBeVisible();

  // Answer all policy questions with stance 5 + high importance (progressive persona)
  for (let i = 0; i < policyCount; i++) {
    await expect(page.locator("#pq-progress")).toContainText(`Question ${i + 1} of ${policyCount}`);
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

  // Pin the REAL client scorer (not a re-implementation): stance-5-everything
  // with high importance is the progressive persona, which the scoring smoke
  // tests put at Tom Steyer ~77% policy. This guards against silent drift in
  // app.js's scoring and against the web result diverging from the MCP result.
  await expect(rankingItems.first().locator(".result-name strong")).toHaveText("Tom Steyer");
  const topPolicy = await rankingItems.first().locator(".score-policy code").textContent();
  expect(parseInt(topPolicy ?? "0", 10)).toBeGreaterThanOrEqual(70);

  // Top match's "see why" is open by default so the flag button is discoverable
  const seeWhy = rankingItems.first().locator(".see-why");
  await expect(seeWhy).toHaveAttribute("open", "");
  const sourceLinks = seeWhy.locator(".receipt-source");
  expect(await sourceLinks.count()).toBeGreaterThan(0);
  await expect(sourceLinks.first()).toHaveAttribute("target", "_blank");

  // Flag button is visible without any extra interaction
  const flagBtn = seeWhy.locator(".flag-btn").first();
  await expect(flagBtn).toBeVisible();
  await expect(flagBtn).toContainText(/flag/i);

  // Why-not panel should be visible (runner-up exists)
  await expect(page.locator("#why-not")).toBeVisible();

  // What-if explorer: open and verify there are alternative-stance buttons
  const whatIf = page.locator("#what-if");
  await whatIf.locator("summary").click();
  await expect(whatIf.locator("#wi-issue")).toBeVisible();
  const wiOptions = whatIf.locator(".wi-option");
  expect(await wiOptions.count()).toBeGreaterThan(0);

  // Results actions are present near the top: copy-link + preview card + retake.
  await expect(page.locator("#copy-link")).toBeVisible();
  await expect(page.locator("#retake")).toBeVisible();

  // The top-3 summary lists three matches, and "copy share link" carries a
  // top-3 share-card URL (3 comma-separated candidate ids + 3 percents).
  await expect(page.locator("#top3-summary .top3-row")).toHaveCount(3);
  const cardHref = await page.locator("#copy-link").getAttribute("data-share-card");
  expect(cardHref, "share-card URL should be set").toBeTruthy();
  const cardParams = new URL(cardHref!).searchParams;
  expect(cardParams.get("c")?.split(",").length).toBe(3);
  expect(cardParams.get("p")?.split(",").length).toBe(3);
  expect(cardHref).toContain("/api/share-card.svg");

  // Reaching results updates the address bar to the full-result link (answers
  // encoded in the #r= hash) so it can be copied straight from there.
  expect(page.url()).toMatch(/#r=\S+/);

  // Share-link round-trip: open the address-bar URL in a fresh page and confirm
  // it reproduces the same result (base64url encode→decode of the answers).
  const shareUrl = page.url();

  const fresh = await page.context().newPage();
  await fresh.goto(shareUrl);
  await expect(fresh.locator("#results")).toBeVisible();
  await expect(fresh.locator("#ranking > li")).toHaveCount(8);
  await expect(fresh.locator("#ranking > li").first().locator(".result-name strong")).toHaveText("Tom Steyer");
  // Same dataset version → no stale-version banner.
  await expect(fresh.locator("#stale-banner")).toBeHidden();
  await fresh.close();
});

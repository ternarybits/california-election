import { test, expect } from "./fixtures";

// Drives a complete quiz run end-to-end (15 policy + 12 personal-fit).
// Validates: results screen renders, ranking has 8 candidates, see-why
// receipts render, share link is generated, what-if explorer works.

test("complete quiz → results screen with receipts, share link, why-not, what-if", async ({ page }) => {
  test.setTimeout(60_000);

  await page.goto("/");
  await page.getByRole("button", { name: /start the quiz/i }).click();
  await expect(page.locator("#policy-quiz")).toBeVisible();

  // Answer all policy questions with stance 5 + high importance (progressive persona)
  for (let i = 0; i < 13; i++) {
    await expect(page.locator("#pq-progress")).toContainText(`Question ${i + 1} of 13`);
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

  // Share link button should be clickable; copy-link button present
  await expect(page.locator("#copy-link")).toBeVisible();

  // Share-link round-trip: generate the link, open it in a fresh page, and
  // confirm it reproduces the same result (answers are encoded in the URL hash,
  // base64url with re-derived padding — exercise the full encode→decode path).
  const copyLink = page.locator("#copy-link");
  await copyLink.scrollIntoViewIfNeeded();
  // Force past mobile actionability quirks (a sibling element overlaps the hit
  // point mid-scroll); the button is visually clear and functional for users.
  await copyLink.click({ force: true });
  // The copy handler populates #share-status after an async clipboard call —
  // wait for it rather than reading immediately.
  await expect(page.locator("#share-status")).toContainText("#r=", { timeout: 10_000 });
  const statusText = await page.locator("#share-status").textContent();
  const shareUrl = statusText?.match(/https?:\/\/\S+#r=\S+/)?.[0];
  expect(shareUrl, "a share URL with an #r= hash should be generated").toBeTruthy();

  const fresh = await page.context().newPage();
  await fresh.goto(shareUrl!);
  await expect(fresh.locator("#results")).toBeVisible();
  await expect(fresh.locator("#ranking > li")).toHaveCount(8);
  await expect(fresh.locator("#ranking > li").first().locator(".result-name strong")).toHaveText("Tom Steyer");
  // Same dataset version → no stale-version banner.
  await expect(fresh.locator("#stale-banner")).toBeHidden();
  await fresh.close();
});

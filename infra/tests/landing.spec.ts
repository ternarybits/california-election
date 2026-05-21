import { test, expect } from "@playwright/test";

test.describe("Landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("title and intro render, and name the gubernatorial primary", async ({ page }) => {
    await expect(page).toHaveTitle(/Governor Primary/i);
    await expect(page.getByRole("heading", { name: /California 2026 Governor/i })).toBeVisible();
    await expect(page.getByText(/June 2, 2026 gubernatorial primary/i)).toBeVisible();
  });

  test("snapshot date is populated from dataset", async ({ page }) => {
    const snap = page.locator("#snapshot-date");
    await expect(snap).toBeVisible();
    await expect(snap).not.toHaveText("—");
    await expect(snap).toHaveText(/^\d{4}-\d{2}-\d{2}$/);
  });

  test("start button advances to the policy phase", async ({ page }) => {
    await expect(page.locator("#intro")).toBeVisible();
    await page.getByRole("button", { name: /start the quiz/i }).click();
    await expect(page.locator("#intro")).toBeHidden();
    await expect(page.locator("#policy-quiz")).toBeVisible();
    await expect(page.locator("#pq-progress")).toContainText(/Question 1 of \d+/);
  });

  test("FAQ renders and items expand", async ({ page }) => {
    const faq = page.locator(".faq");
    await expect(faq).toBeVisible();
    const items = faq.locator("details");
    // At least the methodology questions we care about
    expect(await items.count()).toBeGreaterThanOrEqual(6);
    await expect(faq.locator("summary", { hasText: /How were the questions chosen/i })).toBeVisible();
    await expect(faq.locator("summary", { hasText: /How were the candidate positions researched/i })).toBeVisible();
    await expect(faq.locator("summary", { hasText: /What if I think a position is wrong/i })).toBeVisible();

    // Expand one and check its content is revealed
    const researched = faq.locator("details", { has: page.locator("summary", { hasText: /positions researched/i }) });
    await researched.locator("summary").click();
    await expect(researched).toHaveAttribute("open", "");
    await expect(researched.locator("p")).toContainText(/primary source/i);
  });

  test("FAQ links open in a new tab", async ({ page }) => {
    const ghLinks = page.locator(".faq a", { hasText: /github/i });
    expect(await ghLinks.count()).toBeGreaterThan(0);
    await expect(ghLinks.first()).toHaveAttribute("target", "_blank");
    await expect(ghLinks.first()).toHaveAttribute("rel", /noopener/);
  });

  test("footer links open in a new tab", async ({ page }) => {
    const ghLink = page.locator("footer a", { hasText: "ternarybits/california-election" });
    const dsLink = page.locator("footer a", { hasText: "dataset_v1.json" });
    await expect(ghLink).toHaveAttribute("target", "_blank");
    await expect(ghLink).toHaveAttribute("rel", /noopener/);
    await expect(dsLink).toHaveAttribute("target", "_blank");
    await expect(dsLink).toHaveAttribute("rel", /noopener/);
  });
});

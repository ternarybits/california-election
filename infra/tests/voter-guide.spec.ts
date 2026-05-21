import { test, expect } from "@playwright/test";

// Voter-guide expandable block on each policy question:
// - shows current policy, key facts, comparison, arguments for/against, sources
// - is collapsed by default; user expands it to read
// - source links open in a new tab
// - is hidden on questions that don't yet have a voter_guide entry (rolling refresh)

test.describe("Voter-guide context block", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /start the quiz/i }).click();
    await expect(page.locator("#policy-quiz")).toBeVisible();
  });

  test("tax question has a voter guide that expands and shows expected sections", async ({ page }) => {
    // tax_top_wealth is Q1 (rank 1)
    await expect(page.locator("#pq-title")).toHaveText(/Top-bracket \/ corporate \/ wealth tax/);
    const vg = page.locator("#pq-voter-guide");
    await expect(vg).toBeVisible();

    // Collapsed by default
    await expect(vg).not.toHaveAttribute("open", "");

    // Expand
    await vg.locator("summary").click();
    await expect(vg).toHaveAttribute("open", "");

    // Expected sections present
    await expect(vg.locator("h4", { hasText: /Current California policy/i })).toBeVisible();
    await expect(vg.locator("h4", { hasText: /Key facts/i })).toBeVisible();
    await expect(vg.locator("h4", { hasText: /Arguments for change/i })).toBeVisible();
    await expect(vg.locator("h4", { hasText: /Arguments against change/i })).toBeVisible();
    await expect(vg.locator("h4", { hasText: /Sources/i })).toBeVisible();
  });

  test("source links open in a new tab", async ({ page }) => {
    const vg = page.locator("#pq-voter-guide");
    await vg.locator("summary").click();
    const sourceLinks = vg.locator(".vg-sources a");
    expect(await sourceLinks.count()).toBeGreaterThan(0);
    await expect(sourceLinks.first()).toHaveAttribute("target", "_blank");
    await expect(sourceLinks.first()).toHaveAttribute("rel", /noopener/);
  });

  test("voter-guide collapses again when the user navigates", async ({ page }) => {
    const vg = page.locator("#pq-voter-guide");
    await vg.locator("summary").click();
    await expect(vg).toHaveAttribute("open", "");
    // Pick an answer and go to Q2
    await page.locator("#pq-options input[value='3']").check();
    await page.locator("#pq-next").click();
    // On Q2 the voter-guide should reset (collapsed)
    await expect(page.locator("#pq-progress")).toContainText(/Question 2/);
    await expect(vg).not.toHaveAttribute("open", "");
  });

  test("every default-quiz question has a complete voter guide", async ({ request }) => {
    const qs = await request.get("/api/questions").then((r) => r.json());
    expect(qs.length).toBe(15);
    const required = ["current_policy", "key_facts", "comparison", "arguments_for_change", "arguments_against_change", "sources"];
    for (const q of qs) {
      expect(q.voter_guide, `${q.id} should have a voter_guide`).not.toBeNull();
      for (const field of required) {
        expect(q.voter_guide[field], `${q.id}.${field}`).toBeTruthy();
      }
      expect(Array.isArray(q.voter_guide.sources)).toBe(true);
      expect(q.voter_guide.sources.length).toBeGreaterThan(0);
      for (const s of q.voter_guide.sources) {
        expect(s.title, `${q.id} source title`).toBeTruthy();
        expect(s.url, `${q.id} source url`).toMatch(/^https?:\/\//);
      }
    }
  });

  test("no voter guide leaks internal researcher commentary", async ({ request }) => {
    // Guard against meta-notes like "confirm before display" / "task brief" / "the live dataset"
    const qs = await request.get("/api/questions").then((r) => r.json());
    const forbidden = [/task('s)? (brief|framing)/i, /confirm .* before display/i, /opposite direction/i, /gold[- ]standard/i];
    for (const q of qs) {
      const note = q.voter_guide?.note_on_options ?? "";
      for (const pat of forbidden) {
        expect(note, `${q.id} note_on_options should not contain internal commentary (${pat})`).not.toMatch(pat);
      }
    }
  });
});

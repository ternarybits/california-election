import { test, expect } from "./fixtures";

// Voter-guide context block on each policy question:
// - always shown — the visible tier (basics, current policy, arguments) carries
//   the decision-relevant context
// - reference detail (key facts, comparison, note, sources) folds into a single
//   "More background" disclosure to cut the reading load
// - source links open in a new tab

test.describe("Voter-guide context block", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /start the quiz/i }).click();
    await expect(page.locator("#policy-quiz")).toBeVisible();
  });

  test("first question shows the visible tier, with reference detail behind a disclosure", async ({ page }) => {
    // After the tax split, the State wealth tax is the #1 differentiating issue.
    await expect(page.locator("#pq-title")).toHaveText(/State wealth tax/);
    const vg = page.locator("#pq-voter-guide");
    await expect(vg).toBeVisible();
    await expect(vg.locator(".voter-guide-heading")).toBeVisible();

    // Visible tier: current policy and both arguments — no click needed.
    // ("The basics" explainer is optional and absent on this question.)
    await expect(vg.locator("h4", { hasText: /Current California policy/i })).toBeVisible();
    await expect(vg.locator("h4", { hasText: /Arguments for change/i })).toBeVisible();
    await expect(vg.locator("h4", { hasText: /Arguments against change/i })).toBeVisible();

    // Reference detail is collapsed by default behind the "More background" toggle
    const more = vg.locator("details.vg-more");
    await expect(more).toHaveCount(1);
    await expect(more).not.toHaveAttribute("open", "");
    await expect(vg.locator("h4", { hasText: /Key facts/i })).toBeHidden();
    await expect(vg.locator("h4", { hasText: /Sources/i })).toBeHidden();

    // Expanding it reveals the hidden sections
    await more.locator("summary").click();
    await expect(vg.locator("h4", { hasText: /Key facts/i })).toBeVisible();
    await expect(vg.locator("h4", { hasText: /How CA compares/i })).toBeVisible();
    await expect(vg.locator("h4", { hasText: /Sources/i })).toBeVisible();
  });

  test("source links open in a new tab", async ({ page }) => {
    const vg = page.locator("#pq-voter-guide");
    const sourceLinks = vg.locator(".vg-sources a");
    expect(await sourceLinks.count()).toBeGreaterThan(0);
    await expect(sourceLinks.first()).toHaveAttribute("target", "_blank");
    await expect(sourceLinks.first()).toHaveAttribute("rel", /noopener/);
  });

  test("inline bill links in prose render as real anchors", async ({ page }) => {
    // The wealth-tax question (Q1) cites AB 259 inline in its body text.
    const billLink = page.locator("#pq-voter-guide .vg-section a", { hasText: /AB 259/i }).first();
    await expect(billLink).toBeVisible();
    await expect(billLink).toHaveAttribute("href", /leginfo\.legislature\.ca\.gov/);
    await expect(billLink).toHaveAttribute("target", "_blank");
    // The raw markdown syntax must not leak as visible text anywhere in the guide.
    await expect(page.locator("#pq-voter-guide")).not.toContainText("](http");
  });

  test("voter guide stays open and updates on every question", async ({ page }) => {
    const vg = page.locator("#pq-voter-guide");
    await expect(vg).toBeVisible();
    const q1Policy = await vg.locator(".vg-section").first().textContent();
    // Pick an answer and go to Q2
    await page.locator("#pq-options input[value='3']").check();
    await page.locator("#pq-next").click();
    await expect(page.locator("#pq-progress")).toContainText(/Question 2/);
    // Still visible (always-open), with different content
    await expect(vg).toBeVisible();
    const q2Policy = await vg.locator(".vg-section").first().textContent();
    expect(q2Policy).not.toBe(q1Policy);
  });

  test("every default-quiz question has a complete voter guide", async ({ request }) => {
    const qs = await request.get("/api/questions").then((r) => r.json());
    expect(qs.length).toBe(13);
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
    const forbidden = [/task('s)? (brief|framing)/i, /confirm .* before display/i, /opposite direction from/i, /gold[- ]standard/i, /the live dataset/i];
    for (const q of qs) {
      const note = q.voter_guide?.note_on_options ?? "";
      for (const pat of forbidden) {
        expect(note, `${q.id} note_on_options should not contain internal commentary (${pat})`).not.toMatch(pat);
      }
    }
  });
});

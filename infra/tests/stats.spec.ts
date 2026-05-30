import { test, expect } from "./fixtures";

// The /stats page reads /api/stats and renders three live sections plus a
// "Recently asked" feed of user-typed questions. Those questions are free text,
// so the page must HTML-escape them; the divisive ranking must ignore tiny-n
// issues (pre-trim strays, or extremes split across 1–2 answers).

const target = process.env.TEST_URL ?? "";
const isLocalTarget = target !== "" && !/workers\.dev/.test(target);

test.describe("Stats page", () => {
  test("renders all sections without crashing", async ({ page }) => {
    await page.goto("/stats");
    await expect(page.locator("#overview-body")).not.toHaveText(/Failed to load/);
    await expect(page.locator("#match-share-list")).toBeVisible();
    await expect(page.locator("#lang-list")).toBeVisible();
    await expect(page.locator("#lang-list")).not.toHaveText(/Loading/);
    await expect(page.locator("#divisive-list")).toBeVisible();
    // The recently-asked section exists and resolves to either questions or the
    // empty-state line (never the perpetual "Loading…").
    await expect(page.locator("#questions-list")).toBeVisible();
    await expect(page.locator("#questions-list")).not.toHaveText(/Loading/);
  });
});

// Seeding writes to D1, so only run against a local dev target (never prod).
test.describe("Stats page (local-only, seeds D1)", () => {
  test.skip(!isLocalTarget, "seeds D1 — runs only against a non-production TEST_URL");

  test("escapes user-typed questions and never executes injected script", async ({ request, page }) => {
    const payload = "XSS <script>window.__pwned=1</script> & <b>bold</b>";
    const res = await request.post("/api/tally", {
      data: { kind: "chat_opened", session_id: "stats-spec", issue_id: "gun_policy", detail: payload },
    });
    expect(res.status()).toBe(200);

    const dialogs: string[] = [];
    page.on("dialog", (d) => { dialogs.push(d.message()); void d.dismiss(); });
    await page.goto("/stats");

    const item = page.locator("#questions-list li", { hasText: "XSS" }).first();
    await expect(item).toBeVisible();
    // The literal markup survives as text (escaped), and no node was injected.
    await expect(item).toContainText("<script>");
    await expect(item.locator("script")).toHaveCount(0);
    await expect(item.locator("b")).toHaveCount(0);
    expect(await page.evaluate(() => (window as unknown as { __pwned?: number }).__pwned)).toBeUndefined();
    expect(dialogs).toEqual([]);
  });

  test("tallies the language a quiz was completed in", async ({ request, page }) => {
    const es = await request.post("/api/tally", {
      data: { kind: "quiz_complete", session_id: "stats-spec-lang", candidate_id: "porter", match_pct: 81, lang: "es" },
    });
    expect(es.status()).toBe(200);
    // zh-Hant is the hyphenated script code that the supported-list and label-map
    // must both carry; assert it survives storage and renders with its own label.
    const hant = await request.post("/api/tally", {
      data: { kind: "quiz_complete", session_id: "stats-spec-lang-hant", candidate_id: "porter", match_pct: 81, lang: "zh-Hant" },
    });
    expect(hant.status()).toBe(200);

    await page.goto("/stats");
    await expect(page.locator("#lang-list", { hasText: "Español" })).toBeVisible();
    await expect(page.locator("#lang-list", { hasText: "中文（繁體）" })).toBeVisible();
  });

  test("divisive ranking ignores issues below the answer floor", async ({ request, page }) => {
    // A single extreme answer on an off-quiz issue would, unfiltered, post a
    // huge variance and top the list. It must not appear.
    await request.post("/api/tally", {
      data: { kind: "policy_answer", session_id: "stats-spec-lowN", issue_id: "utility_rates", stance: 5, importance: 1 },
    });
    await page.goto("/stats");
    await expect(page.locator("#divisive-list")).not.toContainText(/utility/i);
  });
});

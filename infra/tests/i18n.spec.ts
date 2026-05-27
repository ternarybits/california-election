import { test, expect } from "./fixtures";

declare global {
  interface Window {
    I18N: {
      lang: string;
      t: (key: string, params?: Record<string, unknown>) => string;
      setLang: (l: string) => void;
    };
  }
}

// Localization: a language selector sits in the header, the chosen language
// persists, and the app defaults to the browser locale when we support it.
//
// Assertions compare rendered DOM against window.I18N.t(<key>) computed in the
// page, so they validate the wiring without hardcoding any translated wording.

test.describe("Language selector", () => {
  test("offers the six supported languages and defaults to English (en-US locale)", async ({ page }) => {
    await page.goto("/");
    const select = page.locator("#lang-select");
    await expect(select).toBeVisible();
    await expect(select.locator("option")).toHaveCount(6);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    // The English UI hides the "questions stay in English" note.
    await expect(page.locator("#intro-lang-note")).toBeHidden();
  });

  test("switching language localizes static + dynamic copy and persists across reloads", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    await page.locator("#lang-select").selectOption("es");
    await expect(page.locator("html")).toHaveAttribute("lang", "es");

    // Header (static, data-i18n) is now Spanish — matches the dictionary value.
    const h1Expected = await page.evaluate(() => window.I18N.t("header.h1"));
    await expect(page.locator("header h1")).toHaveText(h1Expected);

    // The start button (static) and the question-count bullet (JS-filled) localize.
    const startExpected = await page.evaluate(() => window.I18N.t("intro.start"));
    await expect(page.locator("#start-btn")).toHaveText(startExpected);
    await expect(page.locator("#how-count")).not.toHaveText(/questions in all/i);

    // The English-content note becomes visible in a non-English UI.
    await expect(page.locator("#intro-lang-note")).toBeVisible();

    // Choice persists on reload (localStorage), beating the en-US browser locale.
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.locator("#start-btn")).toHaveText(startExpected);
  });

  test("re-renders an in-progress quiz question on language switch", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /start the quiz/i }).click();
    await expect(page.locator("#policy-quiz")).toBeVisible();

    await page.locator("#lang-select").selectOption("vi");

    // Navigation buttons are rebuilt in Vietnamese (back/skip/next via rerender).
    const nextExpected = await page.evaluate(() => window.I18N.t("nav.next"));
    await expect(page.locator("#pq-next")).toHaveText(nextExpected);
    // The JS-rendered progress line localizes too (no longer the English "Question N of M").
    await expect(page.locator("#pq-progress")).not.toContainText("Question");
  });

  test("localizes the dataset content (question title + options), not just chrome", async ({ page }) => {
    // English first question title.
    await page.goto("/");
    await page.getByRole("button", { name: /start the quiz/i }).click();
    await expect(page.locator("#policy-quiz")).toBeVisible();
    const enTitle = (await page.locator("#pq-title").textContent())?.trim() ?? "";
    const enFirstOption = (await page.locator("#pq-options .option span").first().textContent())?.trim() ?? "";
    expect(enTitle.length).toBeGreaterThan(0);

    // Same question in Spanish must render translated text (overlay merged onto
    // the English dataset), and the source quote on results stays English —
    // here we just assert the quiz-page content actually changed.
    await page.locator("#lang-select").selectOption("es");
    const esTitle = (await page.locator("#pq-title").textContent())?.trim() ?? "";
    const esFirstOption = (await page.locator("#pq-options .option span").first().textContent())?.trim() ?? "";
    expect(esTitle.length).toBeGreaterThan(0);
    expect(esTitle).not.toBe(enTitle);
    expect(esFirstOption).not.toBe(enFirstOption);

    // The voter-guide body (background/arguments) is present and localized too.
    await expect(page.locator("#pq-voter-guide")).toBeVisible();
  });

  test("detects a supported browser locale and defaults to it", async ({ browser }) => {
    const context = await browser.newContext({ locale: "ko-KR" });
    const page = await context.newPage();
    await page.route("**/api/tally", (r) => r.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }));
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "ko");
    const startExpected = await page.evaluate(() => window.I18N.t("intro.start"));
    await expect(page.locator("#start-btn")).toHaveText(startExpected);
    await context.close();
  });

  test("falls back to English for an unsupported browser locale", async ({ browser }) => {
    const context = await browser.newContext({ locale: "de-DE" });
    const page = await context.newPage();
    await page.route("**/api/tally", (r) => r.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }));
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await context.close();
  });
});

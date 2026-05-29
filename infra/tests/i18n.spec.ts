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
  test("offers the seven supported languages and defaults to English (en-US locale)", async ({ page }) => {
    await page.goto("/");
    const select = page.locator("#lang-select");
    await expect(select).toBeVisible();
    // en, es, zh (Simplified), zh-Hant (Traditional), vi, tl, ko
    await expect(select.locator("option")).toHaveCount(7);
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

    // The English-content note becomes visible in a non-English UI, with real
    // translated text — not the bare "intro.langNote" key (a fallback miss).
    await expect(page.locator("#intro-lang-note")).toBeVisible();
    await expect(page.locator("#intro-lang-note")).not.toHaveText("intro.langNote");
    await expect(page.locator("#intro-lang-note")).not.toBeEmpty();

    // Choice persists when we navigate to a bare URL (no param): localStorage
    // drives it, beating the en-US browser locale.
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.locator("#start-btn")).toHaveText(startExpected);
    // A stored choice is canonicalized into the address bar on load, so the URL
    // a returning visitor copies is itself shareable in their language.
    await expect.poll(() => new URL(page.url()).searchParams.get("locale")).toBe("es-US");
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
    // Auto-detection is NOT a deliberate choice: the address bar stays locale-less
    // (the `if (explicit)` canonicalization must not fire), so a copied URL lets
    // each recipient auto-detect their own language.
    expect(new URL(page.url()).searchParams.get("locale")).toBeNull();
    await context.close();
  });

  test("respects a ?locale= URL param (zh-CN → zh) over the browser locale, and persists it", async ({ page }) => {
    // Browser locale is the default en-US, but a shared ?locale= link wins.
    await page.goto("/?locale=zh-CN");
    await expect(page.locator("html")).toHaveAttribute("lang", "zh");
    await expect(page.locator("#lang-select")).toHaveValue("zh");

    // The choice is persisted, so navigating to a param-less URL keeps Chinese.
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "zh");
  });

  test("Traditional Chinese (zh-Hant) is distinct from Simplified and maps to/from zh-TW", async ({ page }) => {
    // Simplified via zh-CN → internal code "zh".
    await page.goto("/?locale=zh-CN");
    await expect(page.locator("html")).toHaveAttribute("lang", "zh");
    const simplifiedH1 = (await page.locator("header h1").textContent())?.trim() ?? "";

    // Traditional via zh-TW → internal code "zh-Hant"; canonicalizes back to zh-TW.
    await page.goto("/?locale=zh-TW");
    await expect(page.locator("html")).toHaveAttribute("lang", "zh-Hant");
    await expect(page.locator("#lang-select")).toHaveValue("zh-Hant");
    await expect.poll(() => new URL(page.url()).searchParams.get("locale")).toBe("zh-TW");
    const traditionalH1 = (await page.locator("header h1").textContent())?.trim() ?? "";

    // The generated zh-Hant chrome must carry real text, not the bare key
    // (the generator once folded the langNote key in as its own value).
    await expect(page.locator("#intro-lang-note")).toBeVisible();
    await expect(page.locator("#intro-lang-note")).not.toHaveText("intro.langNote");

    // Both are Chinese, but the script differs (e.g. 长/長, 选/選), so the
    // rendered chrome must not be identical — proves the overlay is wired, not
    // silently falling back to Simplified or English.
    expect(simplifiedH1.length).toBeGreaterThan(0);
    expect(traditionalH1.length).toBeGreaterThan(0);
    expect(traditionalH1).not.toBe(simplifiedH1);
  });

  test("detects a Traditional-Chinese browser locale (zh-TW → zh-Hant)", async ({ browser }) => {
    const context = await browser.newContext({ locale: "zh-TW" });
    const page = await context.newPage();
    await page.route("**/api/tally", (r) => r.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }));
    await page.goto("/");
    // zh-TW region → Traditional; address bar stays locale-less (auto-detected).
    await expect(page.locator("html")).toHaveAttribute("lang", "zh-Hant");
    expect(new URL(page.url()).searchParams.get("locale")).toBeNull();
    await context.close();
  });

  test("accepts an underscore-separated locale (es_MX → es)", async ({ page }) => {
    await page.goto("/?locale=es_MX");
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    // A region variant is canonicalized to our emitted US locale on load.
    await expect.poll(() => new URL(page.url()).searchParams.get("locale")).toBe("es-US");
  });

  test("accepts the legacy ?lang= alias and canonicalizes it to ?locale= on load", async ({ page }) => {
    await page.goto("/?lang=es");
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    // The legacy alias collapses to the full ?locale= on load, leaving no ?lang=.
    await expect.poll(() => new URL(page.url()).searchParams.get("locale")).toBe("es-US");
    expect(new URL(page.url()).searchParams.get("lang")).toBeNull();
  });

  test("?locale= wins over a previously stored preference", async ({ page }) => {
    await page.goto("/");
    await page.locator("#lang-select").selectOption("es");
    await expect(page.locator("html")).toHaveAttribute("lang", "es");

    // A link in a different language overrides the stored choice on next load.
    await page.goto("/?locale=ko");
    await expect(page.locator("html")).toHaveAttribute("lang", "ko");
  });

  test("ignores an unsupported ?locale= and falls back to the browser locale", async ({ page }) => {
    // de isn't supported and there's no stored choice → en-US browser default.
    await page.goto("/?locale=de");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("changing language pins a full ?locale= in the address bar, which round-trips", async ({ page }) => {
    await page.goto("/");
    expect(new URL(page.url()).searchParams.get("locale")).toBeNull();

    // The emitted value is a full BCP-47 locale (language + US region), not a bare code.
    await page.locator("#lang-select").selectOption("ko");
    await expect.poll(() => new URL(page.url()).searchParams.get("locale")).toBe("ko-US");

    // Switching again rewrites (not stacks) the param.
    await page.locator("#lang-select").selectOption("vi");
    await expect.poll(() => new URL(page.url()).searchParams.get("locale")).toBe("vi-US");

    // The full locale we emit reads back to the same language on reload.
    await page.goto(`/?locale=vi-US`);
    await expect(page.locator("html")).toHaveAttribute("lang", "vi");
  });

  test("share buttons carry the chosen full ?locale=", async ({ browser }) => {
    const context = await browser.newContext({ permissions: ["clipboard-read", "clipboard-write"] });
    const page = await context.newPage();
    await page.route("**/api/tally", (r) => r.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }));
    await page.goto("/");

    await page.locator("#lang-select").selectOption("vi");
    await page.locator("#share-quiz").click();
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(new URL(copied).searchParams.get("locale")).toBe("vi-US");
    await context.close();
  });

  test("share link is locale-less when the language was only auto-detected", async ({ browser }) => {
    // Korean browser, no explicit choice → the shared link omits ?locale= so the
    // recipient's own browser locale decides.
    const context = await browser.newContext({ locale: "ko-KR", permissions: ["clipboard-read", "clipboard-write"] });
    const page = await context.newPage();
    await page.route("**/api/tally", (r) => r.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }));
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "ko");

    await page.locator("#share-quiz").click();
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(new URL(copied).searchParams.get("locale")).toBeNull();
    await context.close();
  });

  test("localizes candidate party + bio on results, but keeps names in English", async ({ page }) => {
    test.setTimeout(60_000);
    const policyCount = (await (await page.request.get("/api/questions")).json()).length;

    await page.goto("/");
    await page.getByRole("button", { name: /start the quiz/i }).click();
    await expect(page.locator("#policy-quiz")).toBeVisible();
    for (let i = 0; i < policyCount; i++) {
      const opt5 = page.locator("#pq-options input[value='5']");
      if ((await opt5.count()) > 0) await opt5.check();
      else await page.locator("#pq-options input[type='radio']").last().check();
      await page.locator("#pq-importance").fill("2");
      await page.locator("#pq-next").click();
    }
    await expect(page.locator("#personal-quiz")).toBeVisible();
    for (let i = 0; i < 30; i++) {
      if (await page.locator("#personal-quiz").isVisible()) await page.locator("#fq-skip").click();
      else break;
    }
    await expect(page.locator("#results")).toBeVisible();

    const topRow = page.locator("#ranking > li").first();
    const enName = (await topRow.locator(".result-name strong").textContent())?.trim() ?? "";
    const enParty = (await topRow.locator(".result-name .muted").textContent())?.trim() ?? "";
    const enBio = (await topRow.locator("p.muted.small").first().textContent())?.trim() ?? "";
    expect(enName.length).toBeGreaterThan(0);
    expect(enParty).toContain("Democratic"); // progressive persona → Tom Steyer (D)

    // Switch to Spanish: results re-render. Party + bio localize; name stays English.
    await page.locator("#lang-select").selectOption("es");
    await expect(page.locator("#results")).toBeVisible();

    // The results URL must carry BOTH the result hash and the chosen locale:
    // makeShareUrl()/syncUrl pin ?locale= while preserving the #r= answers hash,
    // so a shared result link reproduces the ranking in the chosen language.
    await expect.poll(() => new URL(page.url()).searchParams.get("locale")).toBe("es-US");
    expect(new URL(page.url()).hash).toMatch(/^#r=/);

    const esName = (await topRow.locator(".result-name strong").textContent())?.trim() ?? "";
    const esParty = (await topRow.locator(".result-name .muted").textContent())?.trim() ?? "";
    const esBio = (await topRow.locator("p.muted.small").first().textContent())?.trim() ?? "";

    expect(esName).toBe(enName); // proper noun — not translated
    expect(esParty).not.toBe(enParty); // "(Democratic)" → "(Demócrata)"
    expect(esParty).toContain("Demócrata");
    expect(esBio).not.toBe(enBio); // bio_short is translated
    expect(esBio.length).toBeGreaterThan(0);

    // The receipt headings live in a cloned <template>; they must be localized
    // by I18N.apply() on the clone, not left at the English default.
    const agreedHeading = topRow.locator('.see-why h4[data-i18n="receipt.agreedOn"]').first();
    const agreedExpected = await page.evaluate(() => window.I18N.t("receipt.agreedOn"));
    await expect(agreedHeading).toHaveText(agreedExpected);
    expect(agreedExpected).not.toBe("You agreed on"); // sanity: es value differs

    // Switching back restores English — exercises the fallback branch of
    // localizeCandidate and re-cloning the receipt on every re-render.
    await page.locator("#lang-select").selectOption("en");
    await expect(page.locator("#results")).toBeVisible();
    await expect(topRow.locator(".result-name .muted")).toHaveText(enParty);
    await expect(topRow.locator("p.muted.small").first()).toHaveText(enBio);
    await expect(topRow.locator('.see-why h4[data-i18n="receipt.agreedOn"]').first()).toHaveText("You agreed on");
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

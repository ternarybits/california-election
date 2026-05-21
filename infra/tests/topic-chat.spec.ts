import { test, expect } from "./fixtures";

// "Ask AI about this topic" hand-off + the content-only /topic/:id page.
// - Each question has a "Go deeper" box (#pq-ask-ai) with a question input +
//   ChatGPT/Claude/Copy actions. Clicking builds a prompt (with the typed
//   question + a link to the topic page) and opens the user's own AI in a new tab.
// - We stub window.open to capture the URL and intercept /api/event so the test
//   never opens a real tab or writes to prod D1.

test.describe("Ask-AI hand-off on a quiz question", () => {
  test("builds a ChatGPT/Claude prompt containing the typed question and topic link", async ({ page, request }) => {
    // Q1 is the top-ranked question from /api/questions.
    const qs = await request.get("/api/questions").then((r) => r.json());
    const qId = qs[0].id;

    // Don't write analytics to D1, and capture window.open targets in-page.
    await page.route("**/api/event", (route) => route.fulfill({ status: 200, body: '{"ok":true}' }));
    await page.addInitScript(() => {
      (window as any).__opened = [];
      window.open = ((url: string) => { (window as any).__opened.push(url); return null; }) as any;
    });

    await page.goto("/");
    await page.getByRole("button", { name: /start the quiz/i }).click();
    await expect(page.locator("#policy-quiz")).toBeVisible();

    const chat = page.locator("#pq-ask-ai .vg-chat");
    await expect(chat).toBeVisible();
    await expect(chat.locator(".vg-chat-btn")).toHaveCount(3);

    const question = "How would this affect renters in Oakland?";
    await chat.locator(".vg-chat-input").fill(question);

    await chat.locator('.vg-chat-btn[data-target="chatgpt"]').click();
    await chat.locator('.vg-chat-btn[data-target="claude"]').click();

    const opened: string[] = await page.evaluate(() => (window as any).__opened);
    expect(opened.length).toBe(2);

    const chatgptUrl = opened.find((u) => u.startsWith("https://chatgpt.com/?q="))!;
    const claudeUrl = opened.find((u) => u.startsWith("https://claude.ai/new?q="))!;
    expect(chatgptUrl).toBeTruthy();
    expect(claudeUrl).toBeTruthy();

    for (const u of [chatgptUrl, claudeUrl]) {
      const decoded = decodeURIComponent(u.split("?q=")[1]);
      expect(decoded).toContain(question);
      expect(decoded).toContain(`/topic/${qId}`);
    }
  });

  test("blank question produces the generic 'help me understand' prompt", async ({ page }) => {
    await page.route("**/api/event", (route) => route.fulfill({ status: 200, body: '{"ok":true}' }));
    await page.addInitScript(() => {
      (window as any).__opened = [];
      window.open = ((url: string) => { (window as any).__opened.push(url); return null; }) as any;
    });

    await page.goto("/");
    await page.getByRole("button", { name: /start the quiz/i }).click();
    const chat = page.locator("#pq-ask-ai .vg-chat");
    await expect(chat).toBeVisible();

    // No question typed — just hand off.
    await chat.locator('.vg-chat-btn[data-target="chatgpt"]').click();
    const opened: string[] = await page.evaluate(() => (window as any).__opened);
    expect(opened.length).toBe(1);
    const decoded = decodeURIComponent(opened[0].split("?q=")[1]);
    expect(decoded).toMatch(/help me understand/i);
  });

  test("Copy prompt writes to the clipboard and confirms", async ({ page, context, browserName }) => {
    test.skip(browserName !== "chromium", "clipboard permissions are chromium-specific here");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.route("**/api/event", (route) => route.fulfill({ status: 200, body: '{"ok":true}' }));

    await page.goto("/");
    await page.getByRole("button", { name: /start the quiz/i }).click();
    const chat = page.locator("#pq-ask-ai .vg-chat");
    await expect(chat).toBeVisible();

    const question = "What's the fiscal impact?";
    await chat.locator(".vg-chat-input").fill(question);
    const copyBtn = chat.locator('.vg-chat-btn[data-target="copy"]');
    await copyBtn.click();

    // Button confirms with a checkmark, then reverts.
    await expect(copyBtn).toHaveText(/copied/i);
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toContain(question);
    expect(clip).toContain("/topic/");
  });
});

test.describe("Content-only topic page", () => {
  test("renders the issue, every candidate, and sources", async ({ page, request }) => {
    const qs = await request.get("/api/questions").then((r) => r.json());
    const issue = qs[0];
    const candidates = await request.get("/api/candidates").then((r) => r.json());

    const res = await request.get(`/topic/${issue.id}`);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("text/html");

    await page.goto(`/topic/${issue.id}`);
    await expect(page.locator("h1")).toContainText(issue.name);
    await expect(page.getByRole("heading", { name: /Where the candidates stand/i })).toBeVisible();
    // Every candidate is listed (even unknown positions are shown honestly).
    for (const c of candidates) {
      await expect(page.locator(".cand h3", { hasText: c.name })).toBeVisible();
    }
    // At least one outbound source link.
    expect(await page.locator('a[href^="http"]').count()).toBeGreaterThan(0);
    // Back-to-quiz CTA.
    await expect(page.getByRole("link", { name: /take the .*quiz/i })).toBeVisible();
  });

  test("unknown issue id returns 404", async ({ request }) => {
    const res = await request.get("/topic/__does_not_exist__");
    expect(res.status()).toBe(404);
  });
});

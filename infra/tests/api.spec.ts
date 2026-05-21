import { test, expect } from "./fixtures";

// Hits the live API endpoints. Complements infra/test_worker.mjs (which runs
// the worker locally with stubbed bindings) — these run against the deployed
// Worker so we catch deploy-time regressions.

test.describe("API endpoints", () => {
  test("/api discovery returns expected endpoint list", async ({ request }) => {
    const res = await request.get("/api");
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.endpoints.length).toBeGreaterThanOrEqual(8);
  });

  test("/api/candidates returns 8 candidates", async ({ request }) => {
    const res = await request.get("/api/candidates");
    const body = await res.json();
    expect(body).toHaveLength(8);
    expect(body[0]).toHaveProperty("id");
    expect(body[0]).toHaveProperty("name");
    expect(body[0]).toHaveProperty("party");
  });

  test("/api/questions returns 15 default-quiz items in rank order", async ({ request }) => {
    const res = await request.get("/api/questions");
    const body = await res.json();
    expect(body).toHaveLength(15);
    for (let i = 0; i < body.length; i++) {
      expect(body[i].rank).toBe(i + 1);
    }
  });

  test("/api/personal-fit-dimensions returns 12 dimensions", async ({ request }) => {
    const res = await request.get("/api/personal-fit-dimensions");
    expect((await res.json())).toHaveLength(12);
  });

  test("/api/dataset has 200 positions", async ({ request }) => {
    const res = await request.get("/api/dataset");
    const body = await res.json();
    expect(body.positions).toHaveLength(200);
    expect(body.version).toBe("v1");
  });

  test("/dataset_v1.json convenience alias", async ({ request }) => {
    const res = await request.get("/dataset_v1.json");
    const body = await res.json();
    expect(body.version).toBe("v1");
  });

  test("/api/share-card.svg renders SVG", async ({ request }) => {
    const res = await request.get("/api/share-card.svg?c=steyer&p=77");
    expect(res.headers()["content-type"]).toContain("image/svg+xml");
    const body = await res.text();
    expect(body).toContain("<svg");
    expect(body).toContain("Tom Steyer");
    expect(body).toContain("77%");
  });

  // Validation rejections don't write to D1, so they're safe against any target.
  test("/api/flag rejects missing fields", async ({ request }) => {
    const res = await request.post("/api/flag", { data: { candidate_id: "x" } });
    expect(res.status()).toBe(400);
  });

  test("/api/event rejects an unknown kind", async ({ request }) => {
    const bad = await request.post("/api/event", { data: { kind: "nope", session_id: "playwright-test" } });
    expect(bad.status()).toBe(400);
  });

  test("/api/stats returns the expected shape", async ({ request }) => {
    const res = await request.get("/api/stats");
    const body = await res.json();
    expect(body).toHaveProperty("dataset_version");
    expect(body).toHaveProperty("completes");
    expect(body).toHaveProperty("by_issue_stance");
    expect(body).toHaveProperty("top_candidate_share");
  });
});

// Write endpoints insert rows into D1. Skip these unless TEST_URL points at a
// non-production target (e.g. a local `wrangler dev`), so the suite never
// pollutes the production analytics that the public /stats page reports.
// The insert/validation contract is also covered by infra/test_worker.mjs
// against a stubbed D1.
const target = process.env.TEST_URL ?? "";
const isLocalTarget = target !== "" && !/workers\.dev/.test(target);

test.describe("API write endpoints (local-only)", () => {
  test.skip(!isLocalTarget, "write tests run only against a non-production TEST_URL to avoid polluting prod D1");

  test("/api/flag accepts a valid submission", async ({ request }) => {
    const res = await request.post("/api/flag", {
      data: { candidate_id: "porter", issue_id: "housing_supply", reason: "playwright local test" },
    });
    expect(res.status()).toBe(200);
    expect((await res.json()).ok).toBe(true);
  });

  test("/api/event accepts all 4 kinds", async ({ request }) => {
    for (const kind of ["quiz_start", "policy_answer", "personal_answer", "quiz_complete"]) {
      const res = await request.post("/api/event", { data: { kind, session_id: "playwright-local-test" } });
      expect(res.status()).toBe(200);
    }
  });
});

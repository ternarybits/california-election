import { test, expect } from "@playwright/test";

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

  test("/api/flag accepts a valid submission", async ({ request }) => {
    const res = await request.post("/api/flag", {
      data: { candidate_id: "porter", issue_id: "housing_supply", reason: "playwright smoke test" },
    });
    expect(res.status()).toBe(200);
    expect((await res.json()).ok).toBe(true);
  });

  test("/api/flag rejects missing fields", async ({ request }) => {
    const res = await request.post("/api/flag", { data: { candidate_id: "x" } });
    expect(res.status()).toBe(400);
  });

  test("/api/event accepts all 4 kinds and rejects unknowns", async ({ request }) => {
    for (const kind of ["quiz_start", "policy_answer", "personal_answer", "quiz_complete"]) {
      const res = await request.post("/api/event", { data: { kind, session_id: "playwright-test" } });
      expect(res.status()).toBe(200);
    }
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

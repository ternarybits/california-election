// California 2026 Gubernatorial Candidate Matcher — Buildy backend module.
//
// Buildy runtime is Workers/WinterTC-shaped (fetch handler, env.storage KV, env.log).
// No outbound HTTP. The dataset is bundled into this module at deploy time;
// `deploy.mjs` substitutes the __DATASET__ placeholder with dataset_v1.json contents.

const DATASET = __DATASET__;

function json(body, init = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: { "content-type": "application/json", ...(init.headers || {}) },
  });
}

function notFound() {
  return json({ error: "not found" }, { status: 404 });
}

function badRequest(msg) {
  return json({ error: msg }, { status: 400 });
}

async function handleGetDataset() {
  return json(DATASET);
}

async function handleListCandidates() {
  return json(DATASET.candidates.map((c) => ({
    id: c.id,
    name: c.name,
    party: c.party,
    bio_short: c.bio_short,
  })));
}

async function handleListIssues() {
  return json(DATASET.issues.map((i) => ({
    id: i.id,
    name: i.name,
    short_description: i.short_description,
    stance_scale: i.stance_scale,
  })));
}

async function handleListQuestions() {
  // Default quiz: questions[] entries with default_quiz=true, ordered by rank.
  // Each entry is enriched with the corresponding issue fields the UI needs.
  const issuesById = new Map(DATASET.issues.map((i) => [i.id, i]));
  const ordered = (DATASET.questions || [])
    .filter((q) => q.default_quiz)
    .sort((a, b) => a.rank - b.rank);
  return json(
    ordered.map((q) => {
      const issue = issuesById.get(q.issue_id);
      if (!issue) return null;
      return {
        id: issue.id,
        name: issue.name,
        short_description: issue.short_description,
        stance_scale: issue.stance_scale,
        rank: q.rank,
        differentiation: q.differentiation,
      };
    }).filter(Boolean),
  );
}

async function handleListPersonalFitDimensions() {
  return json(DATASET.personal_fit_dimensions || []);
}

async function handleSaveResult(request, env) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return badRequest("invalid body");
  if (!Array.isArray(body.answers)) return badRequest("answers required");

  const id = crypto.randomUUID();
  const record = {
    id,
    answers: body.answers,
    ranking: body.ranking ?? null,
    dataset_version: DATASET.version,
    created_at: new Date().toISOString(),
  };

  if (env.storage) {
    await env.storage.put(`result:${id}`, JSON.stringify(record));
    await env.storage.put(`recent:${Date.now()}:${id}`, id, { expirationTtl: 60 * 60 * 24 * 30 });
  }

  return json({ id, url_suffix: `?r=${id}` });
}

async function handleGetResult(id, env) {
  if (!env.storage) return notFound();
  const raw = await env.storage.get(`result:${id}`);
  if (!raw) return notFound();
  return json(JSON.parse(raw));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "");

    if (env.log) env.log.info?.({ method: request.method, path });

    if (request.method === "GET" && path === "/api/dataset") return handleGetDataset();
    if (request.method === "GET" && path === "/api/candidates") return handleListCandidates();
    if (request.method === "GET" && path === "/api/issues") return handleListIssues();
    if (request.method === "GET" && path === "/api/questions") return handleListQuestions();
    if (request.method === "GET" && path === "/api/personal-fit-dimensions") return handleListPersonalFitDimensions();
    if (request.method === "POST" && path === "/api/result") return handleSaveResult(request, env);

    const resultMatch = path.match(/^\/api\/result\/([0-9a-f-]+)$/i);
    if (request.method === "GET" && resultMatch) return handleGetResult(resultMatch[1], env);

    if (request.method === "GET" && (path === "" || path === "/")) {
      return json({
        ok: true,
        name: "california-election-matcher",
        version: DATASET.version,
        snapshot_date: DATASET.snapshot_date,
        endpoints: [
          "GET  /api/dataset",
          "GET  /api/candidates",
          "GET  /api/issues",
          "GET  /api/questions",
          "GET  /api/personal-fit-dimensions",
          "POST /api/result",
          "GET  /api/result/:id",
        ],
      });
    }

    return notFound();
  },
};

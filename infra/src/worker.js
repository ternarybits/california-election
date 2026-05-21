// California 2026 Gubernatorial Candidate Matcher — Cloudflare Worker.
//
// Ported from buildy/module.js after the Buildy spike exceeded their size limits.
// Same WinterTC shape (Request/Response). Storage moves from Buildy KV to D1
// (env.DB); static UI assets are served from public/ via env.ASSETS.
//
// Dataset is imported and bundled into the Worker. Workers free-tier script
// budget is 1 MB compressed; dataset_v1.json is ~80 KB gzipped, code is ~5 KB.

import dataset from "../../dataset/dataset_v1.json";

const DATASET = dataset;

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

// ---------- Dataset read endpoints ----------

function handleGetDataset() {
  return json(DATASET);
}

function handleListCandidates() {
  return json(DATASET.candidates.map((c) => ({
    id: c.id,
    name: c.name,
    party: c.party,
    bio_short: c.bio_short,
  })));
}

function handleListIssues() {
  return json(DATASET.issues.map((i) => ({
    id: i.id,
    name: i.name,
    short_description: i.short_description,
    stance_scale: i.stance_scale,
  })));
}

function handleListQuestions() {
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
        voter_guide: issue.voter_guide ?? null,
        rank: q.rank,
        differentiation: q.differentiation,
      };
    }).filter(Boolean),
  );
}

function handleListPersonalFitDimensions() {
  return json(DATASET.personal_fit_dimensions || []);
}

// ---------- D1-backed write endpoints ----------

async function handlePostFlag(request, env) {
  if (!env.DB) return json({ error: "database not configured" }, { status: 503 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return badRequest("invalid body");
  const { candidate_id, issue_id, reason } = body;
  if (typeof candidate_id !== "string" || typeof issue_id !== "string") {
    return badRequest("candidate_id and issue_id are required strings");
  }
  if (reason != null && typeof reason !== "string") return badRequest("reason must be string");
  if (typeof reason === "string" && reason.length > 2000) return badRequest("reason too long");

  await env.DB.prepare(
    "INSERT INTO flags (candidate_id, issue_id, reason, dataset_version, created_at) VALUES (?, ?, ?, ?, ?)",
  )
    .bind(candidate_id, issue_id, reason ?? null, DATASET.version, Date.now())
    .run();

  return json({ ok: true });
}

async function handlePostEvent(request, env) {
  if (!env.DB) return json({ error: "database not configured" }, { status: 503 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return badRequest("invalid body");

  const {
    kind,
    session_id,
    issue_id = null,
    dimension_id = null,
    stance = null,
    importance = null,
    candidate_id = null,
    match_pct = null,
  } = body;

  const validKinds = new Set(["quiz_start", "policy_answer", "personal_answer", "quiz_complete"]);
  if (!validKinds.has(kind)) return badRequest("invalid kind");
  if (typeof session_id !== "string" || session_id.length > 128) return badRequest("session_id required");

  await env.DB.prepare(
    `INSERT INTO events
       (kind, session_id, issue_id, dimension_id, stance, importance, candidate_id, match_pct, dataset_version, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      kind,
      session_id,
      issue_id,
      dimension_id,
      stance == null ? null : Number(stance),
      importance == null ? null : Number(importance),
      candidate_id,
      match_pct == null ? null : Number(match_pct),
      DATASET.version,
      Date.now(),
    )
    .run();

  return json({ ok: true });
}

// ---------- Share card (SVG) ----------

function escapeSvg(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function handleShareCard(url) {
  const candidateId = url.searchParams.get("c");
  const pct = Number(url.searchParams.get("p"));
  const candidate = DATASET.candidates.find((c) => c.id === candidateId);
  if (!candidate || !Number.isFinite(pct)) return badRequest("c and p required");

  const title = `${candidate.name} — ${Math.round(pct)}% policy match`;
  const subtitle = "CA 2026 Candidate Matcher";
  const footer = `dataset_${DATASET.version} · snapshot ${DATASET.snapshot_date}`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f1115"/>
      <stop offset="100%" stop-color="#161a22"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="40" y="40" width="1120" height="550" rx="20" fill="#1d2230" stroke="#262c39" stroke-width="2"/>
  <text x="80" y="140" font-family="-apple-system, system-ui, sans-serif" font-size="32" fill="#97a3b6">${escapeSvg(subtitle)}</text>
  <text x="80" y="320" font-family="-apple-system, system-ui, sans-serif" font-size="84" font-weight="700" fill="#e7ecf3">${escapeSvg(title)}</text>
  <text x="80" y="400" font-family="-apple-system, system-ui, sans-serif" font-size="28" fill="#97a3b6">${escapeSvg(candidate.party)} · ${escapeSvg(candidate.bio_short ?? "")}</text>
  <text x="80" y="540" font-family="-apple-system, system-ui, sans-serif" font-size="22" fill="#5b9cf5">${escapeSvg(footer)}</text>
  <rect x="80" y="430" width="320" height="60" rx="8" fill="#f7c948"/>
  <text x="240" y="470" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="26" font-weight="600" fill="#000">Take the quiz →</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  });
}

// ---------- Stats endpoint (Phase 3 public stats page reads this) ----------

async function handleGetStats(env) {
  if (!env.DB) return json({ error: "database not configured" }, { status: 503 });

  const [completes, byIssue, byTopCandidate] = await Promise.all([
    env.DB.prepare("SELECT COUNT(*) AS n FROM events WHERE kind = 'quiz_complete'").first(),
    env.DB.prepare(
      `SELECT issue_id, stance, COUNT(*) AS n
         FROM events
        WHERE kind = 'policy_answer' AND issue_id IS NOT NULL AND stance IS NOT NULL
        GROUP BY issue_id, stance
        ORDER BY issue_id, stance`,
    ).all(),
    env.DB.prepare(
      `SELECT candidate_id, COUNT(*) AS n
         FROM events
        WHERE kind = 'quiz_complete' AND candidate_id IS NOT NULL
        GROUP BY candidate_id
        ORDER BY n DESC`,
    ).all(),
  ]);

  return json({
    dataset_version: DATASET.version,
    snapshot_date: DATASET.snapshot_date,
    completes: completes?.n ?? 0,
    by_issue_stance: byIssue?.results ?? [],
    top_candidate_share: byTopCandidate?.results ?? [],
  });
}

// ---------- Router ----------

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";
    const method = request.method;

    // API surface
    if (method === "GET" && path === "/api/dataset") return handleGetDataset();
    if (method === "GET" && path === "/api/candidates") return handleListCandidates();
    if (method === "GET" && path === "/api/issues") return handleListIssues();
    if (method === "GET" && path === "/api/questions") return handleListQuestions();
    if (method === "GET" && path === "/api/personal-fit-dimensions") return handleListPersonalFitDimensions();
    if (method === "POST" && path === "/api/flag") return handlePostFlag(request, env);
    if (method === "POST" && path === "/api/event") return handlePostEvent(request, env);
    if (method === "GET" && path === "/api/stats") return handleGetStats(env);
    if (method === "GET" && path === "/api/share-card.svg") return handleShareCard(url);

    // Convenience: serve the dataset file at a stable open URL for in-browser audit
    if (method === "GET" && path === "/dataset_v1.json") return handleGetDataset();

    // Health / discovery
    if (method === "GET" && path === "/api") {
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
          "GET  /api/stats",
          "GET  /api/share-card.svg?c=:candidate_id&p=:pct",
          "POST /api/flag",
          "POST /api/event",
        ],
      });
    }

    // Everything else → static assets (the UI lives in public/)
    if (env.ASSETS) return env.ASSETS.fetch(request);

    return notFound();
  },
};

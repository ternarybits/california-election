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
    detail = null,
  } = body;

  const validKinds = new Set(["quiz_start", "policy_answer", "personal_answer", "quiz_complete", "chat_opened"]);
  if (!validKinds.has(kind)) return badRequest("invalid kind");
  if (typeof session_id !== "string" || session_id.length > 128) return badRequest("session_id required");

  // Coerce optional fields defensively — D1 rejects NaN/non-finite binds, and a
  // bad value here would otherwise 500 a fire-and-forget analytics call silently.
  // Note the deliberate asymmetry with /api/flag: flags are user corrections, so
  // bad input is rejected (400); events are best-effort analytics, so bad input
  // is coerced to null rather than failing the request.
  const strOrNull = (v) => (typeof v === "string" && v.length <= 128 ? v : null);
  const numOrNull = (v) => {
    if (v == null) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };
  // detail holds free-text (the user's typed question on chat_opened). Truncate
  // rather than reject — it's best-effort analytics like the rest of this row.
  const detailOrNull = typeof detail === "string" && detail.trim() ? detail.trim().slice(0, 500) : null;

  await env.DB.prepare(
    `INSERT INTO events
       (kind, session_id, issue_id, dimension_id, stance, importance, candidate_id, match_pct, detail, dataset_version, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      kind,
      session_id,
      strOrNull(issue_id),
      strOrNull(dimension_id),
      numOrNull(stance),
      numOrNull(importance),
      strOrNull(candidate_id),
      numOrNull(match_pct),
      detailOrNull,
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

// SVG <text> has no auto-wrap, so greedily pack words into up to maxLines lines
// of ~maxChars each. If text remains after the last line, ellipsize it.
function wrapText(text, maxChars, maxLines) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [""];
  let truncated = false;
  for (const w of words) {
    const i = lines.length - 1;
    const candidate = lines[i] ? `${lines[i]} ${w}` : w;
    if (candidate.length <= maxChars) {
      lines[i] = candidate;
    } else if (lines.length < maxLines) {
      lines.push(w);
    } else {
      truncated = true;
      break;
    }
  }
  if (truncated) {
    const i = lines.length - 1;
    lines[i] = lines[i].replace(/[;,·\s]+$/, "") + "…";
  }
  return lines;
}

function handleShareCard(url, request) {
  const candidateId = url.searchParams.get("c");
  const pct = Number(url.searchParams.get("p"));
  const candidate = DATASET.candidates.find((c) => c.id === candidateId);
  if (!candidate || !Number.isFinite(pct)) return badRequest("c and p required");

  const pctRounded = Math.round(pct);
  const docTitle = `${candidate.name} — ${pctRounded}% policy match · CA 2026 Governor Primary`;
  const subtitle = "CA 2026 Governor Primary — Candidate Matcher";
  const matchLine = `${pctRounded}% policy match`;

  // SVG has no auto-wrap, so size the name to fit the ~1040px text column. Name
  // and match-percent go on separate lines (a long name plus the percent on one
  // line overflowed the card). The bio wraps to up to two lines.
  const FONT = "-apple-system, system-ui, sans-serif";
  const nameFont = Math.max(42, Math.min(76, Math.floor(1040 / Math.max(1, candidate.name.length * 0.6))));
  const bioFull = `${candidate.party} · ${candidate.bio_short ?? ""}`;
  const bioLines = wrapText(bioFull, 78, 2);
  const bioSvg = bioLines
    .map((line, i) => `<text x="80" y="${400 + i * 36}" font-family="${FONT}" font-size="26" fill="#97a3b6">${escapeSvg(line)}</text>`)
    .join("\n  ");
  // Push the button below however many bio lines rendered.
  const buttonY = 400 + bioLines.length * 36 + 12;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <title>${escapeSvg(docTitle)}</title>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f1115"/>
      <stop offset="100%" stop-color="#161a22"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="40" y="40" width="1120" height="550" rx="20" fill="#1d2230" stroke="#262c39" stroke-width="2"/>
  <text x="80" y="120" font-family="${FONT}" font-size="32" fill="#97a3b6">${escapeSvg(subtitle)}</text>
  <text x="80" y="265" font-family="${FONT}" font-size="${nameFont}" font-weight="700" fill="#e7ecf3">${escapeSvg(candidate.name)}</text>
  <text x="80" y="340" font-family="${FONT}" font-size="46" font-weight="700" fill="#f7c948">${escapeSvg(matchLine)}</text>
  ${bioSvg}
  <rect x="80" y="${buttonY}" width="300" height="58" rx="8" fill="#f7c948"/>
  <text x="230" y="${buttonY + 37}" text-anchor="middle" font-family="${FONT}" font-size="26" font-weight="600" fill="#000">Take the quiz →</text>
</svg>`;

  // When a browser navigates here directly (the "preview share card" link),
  // wrap the SVG in a centered HTML page on a full-bleed dark background and
  // give it a real document title. Image/social-embed fetches (Accept: image/*)
  // still get the raw SVG so it works as an OG/Twitter card.
  const accept = request?.headers.get("accept") ?? "";
  if (accept.includes("text/html")) {
    const cardUrl = `/api/share-card.svg?c=${encodeURIComponent(candidate.id)}&p=${pctRounded}`;
    const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeSvg(docTitle)}</title>
<meta property="og:title" content="${escapeSvg(`${candidate.name} — ${matchLine}`)}">
<meta property="og:description" content="${escapeSvg(subtitle)}">
<meta property="og:image" content="${escapeSvg(cardUrl)}">
<meta name="twitter:card" content="summary_large_image">
<style>
  html, body { margin: 0; padding: 0; min-height: 100%; }
  body {
    min-height: 100vh;
    box-sizing: border-box;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 18px;
    background: linear-gradient(135deg, #0f1115, #161a22);
    font-family: -apple-system, system-ui, sans-serif;
  }
  svg { width: min(1100px, 94vw); height: auto; display: block; }
  footer { max-width: min(1100px, 94vw); color: #97a3b6; font-size: 0.85rem; text-align: center; }
  footer a { color: #5b9cf5; }
</style>
</head>
<body>
${svg}
<footer>
  Open source: <a href="https://github.com/ternarybits/california-election" target="_blank" rel="noopener">ternarybits/california-election</a>.
  Dataset: <a href="/dataset_v1.json" target="_blank" rel="noopener">dataset_v1.json</a>.
  <a href="/stats">Live stats</a>.
  Snapshot date: ${escapeSvg(DATASET.snapshot_date)}.
</footer>
</body>
</html>`;
    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=300",
      },
    });
  }

  return new Response(svg, {
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  });
}

// ---------- Content-only per-topic page ----------

// Curated dataset prose can contain inline markdown links [label](https://…).
// Escape everything, then re-allow only http(s) anchors — same contract as the
// client's renderProse, so a bad URL can't inject markup.
function proseToHtml(s) {
  return escapeSvg(s).replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_m, label, url) => {
    return `<a href="${url}" target="_blank" rel="noopener">${label}</a>`;
  });
}

function handleTopicPage(issueId) {
  const issue = DATASET.issues.find((i) => i.id === issueId);
  if (!issue) return notFound();

  const vg = issue.voter_guide ?? {};
  const stanceLabel = new Map((issue.stance_scale ?? []).map((s) => [s.value, s.label]));
  const posByCandidate = new Map(
    DATASET.positions.filter((p) => p.issue_id === issueId).map((p) => [p.candidate_id, p]),
  );

  const section = (heading, inner) => inner
    ? `<section><h2>${escapeSvg(heading)}</h2>${inner}</section>` : "";
  const para = (prose) => (prose ? `<p>${proseToHtml(prose)}</p>` : "");

  const argsBlock = (vg.arguments_for_change || vg.arguments_against_change)
    ? `<div class="cols">
         <div class="col for"><h3>Arguments for change</h3>${para(vg.arguments_for_change ?? "")}</div>
         <div class="col against"><h3>Arguments against change</h3>${para(vg.arguments_against_change ?? "")}</div>
       </div>`
    : "";

  const keyFacts = Array.isArray(vg.key_facts) && vg.key_facts.length
    ? `<ul>${vg.key_facts.map((f) => `<li>${proseToHtml(f)}</li>`).join("")}</ul>` : "";

  const scaleList = Array.isArray(issue.stance_scale) && issue.stance_scale.length
    ? `<ol class="scale">${issue.stance_scale.map((s) => `<li>${escapeSvg(s.label)}</li>`).join("")}</ol>` : "";

  const sourcesList = Array.isArray(vg.sources) && vg.sources.length
    ? `<ul>${vg.sources.map((s) => `<li><a href="${escapeSvg(s.url)}" target="_blank" rel="noopener">${escapeSvg(s.title)}</a></li>`).join("")}</ul>` : "";

  // Candidate positions, in dataset candidate order. Unknown / missing positions
  // are shown honestly rather than omitted.
  const candidateCards = DATASET.candidates.map((c) => {
    const p = posByCandidate.get(c.id);
    const label = p && p.stance !== "unknown" && stanceLabel.has(p.stance)
      ? stanceLabel.get(p.stance)
      : "Position unknown";
    const summary = p && p.summary ? `<p>${proseToHtml(p.summary)}</p>` : "";
    const src = p && p.source_url
      ? `<p class="src"><a href="${escapeSvg(p.source_url)}" target="_blank" rel="noopener">Source${p.source_date ? ` (${escapeSvg(p.source_date)})` : ""}</a></p>`
      : "";
    return `<article class="cand">
      <h3>${escapeSvg(c.name)} <span class="party">${escapeSvg(c.party ?? "")}</span></h3>
      <p class="stance">${escapeSvg(label)}</p>
      ${summary}${src}
    </article>`;
  }).join("");

  const docTitle = `${issue.name} — CA 2026 Governor Primary`;
  const desc = issue.short_description ?? "Where the 2026 California governor candidates stand.";
  const FONT = "-apple-system, system-ui, sans-serif";

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeSvg(docTitle)}</title>
<meta name="description" content="${escapeSvg(desc)}">
<meta property="og:title" content="${escapeSvg(docTitle)}">
<meta property="og:description" content="${escapeSvg(desc)}">
<meta name="twitter:card" content="summary">
<script src="/theme.js"></script>
<style>
  :root { --bg:#0f1115; --panel:#161a22; --panel-2:#1d2230; --border:#262c39; --text:#e7ecf3;
          --muted:#97a3b6; --accent:#f7c948; --accent-2:#5b9cf5; --accent-3:#6ed29b; color-scheme:dark; }
  :root[data-theme="light"] { --bg:#f4f6fa; --panel:#ffffff; --panel-2:#f3f4f7; --border:#d7dde8;
          --text:#1a2230; --muted:#586273; --accent:#d99000; --accent-2:#2563c9; --accent-3:#138a4e; color-scheme:light; }
  html,body { margin:0; background:var(--bg); color:var(--text);
              font-family:${FONT}; line-height:1.55; transition:background-color .2s ease, color .2s ease; }
  .topbar { display:flex; align-items:center; justify-content:space-between; gap:16px; }
  .theme-toggle { flex:0 0 auto; width:36px; height:36px; padding:0; display:inline-flex; align-items:center;
          justify-content:center; border:1px solid var(--border); border-radius:50%; background:var(--panel-2);
          color:var(--muted); cursor:pointer; }
  .theme-toggle:hover { color:var(--accent-2); border-color:var(--accent-2); }
  :root[data-theme="dark"] .theme-toggle .icon-moon { display:none; }
  :root[data-theme="light"] .theme-toggle .icon-sun { display:none; }
  .wrap { max-width:760px; margin:0 auto; padding:32px 20px 64px; }
  .kicker { color:var(--muted); font-size:.85rem; text-transform:uppercase; letter-spacing:.04em; }
  h1 { font-size:1.9rem; margin:.2em 0 .1em; }
  .lede { color:var(--muted); font-size:1.05rem; margin-top:0; }
  h2 { font-size:1.15rem; margin:1.8em 0 .4em; color:var(--accent-2); }
  h3 { font-size:1rem; margin:.2em 0; }
  section { border-top:1px solid var(--border); padding-top:.2em; }
  .cols { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .col { background:var(--panel); border:1px solid var(--border); border-radius:10px; padding:12px 14px; }
  .col.for { border-left:3px solid var(--accent-3); } .col.for h3 { color:var(--accent-3); }
  .col.against { border-left:3px solid var(--accent); } .col.against h3 { color:var(--accent); }
  .scale li { margin:.25em 0; color:var(--muted); }
  .cand { background:var(--panel-2); border:1px solid var(--border); border-radius:10px;
          padding:12px 16px; margin:12px 0; }
  .cand .party { color:var(--muted); font-weight:400; font-size:.85rem; }
  .cand .stance { color:var(--accent); font-weight:600; margin:.2em 0; }
  .src a { color:var(--accent-2); font-size:.85rem; }
  a { color:var(--accent-2); }
  .cta { display:inline-block; margin-top:8px; background:var(--accent); color:#000;
         font-weight:600; padding:10px 16px; border-radius:8px; text-decoration:none; }
  footer { margin-top:2.5em; color:var(--muted); font-size:.8rem; border-top:1px solid var(--border); padding-top:1em; }
  @media (max-width:560px) { .cols { grid-template-columns:1fr; } }
</style>
</head>
<body>
<main class="wrap">
  <div class="topbar">
    <p class="kicker">CA 2026 Governor Primary · Candidate Matcher</p>
    <button id="theme-toggle" class="theme-toggle" type="button" aria-label="Switch color theme">
      <svg class="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 1.5v3M12 19.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1.5 12h3M19.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>
      <svg class="icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
    </button>
  </div>
  <h1>${escapeSvg(issue.name)}</h1>
  <p class="lede">${escapeSvg(desc)}</p>
  ${issue.ca_specific_context ? `<section><h2>California context</h2>${para(issue.ca_specific_context)}</section>` : ""}
  ${section("Current California policy", para(vg.current_policy))}
  ${argsBlock ? `<section><h2>The debate</h2>${argsBlock}</section>` : ""}
  ${section("Key facts", keyFacts)}
  ${section("How California compares", para(vg.comparison))}
  ${scaleList ? `<section><h2>The range of positions</h2>${scaleList}</section>` : ""}
  <section><h2>Where the candidates stand</h2>${candidateCards}</section>
  ${section("Sources", sourcesList)}
  <section style="border:0">
    <a class="cta" href="/">Take the 3-minute quiz →</a>
  </section>
  <footer>dataset_${escapeSvg(DATASET.version)} · snapshot ${escapeSvg(DATASET.snapshot_date)}.
    Every position links to a primary source. Spot an error? Flag it in the quiz.</footer>
</main>
</body>
</html>`;

  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=300" },
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
    if (method === "GET" && path === "/api/share-card.svg") return handleShareCard(url, request);

    // Content-only per-topic page: /topic/:issue_id
    if (method === "GET" && path.startsWith("/topic/")) {
      let issueId;
      // Malformed percent-encoding (e.g. /topic/%) throws — treat as not found.
      try { issueId = decodeURIComponent(path.slice("/topic/".length)); }
      catch { return notFound(); }
      return handleTopicPage(issueId);
    }

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
          "GET  /topic/:issue_id",
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

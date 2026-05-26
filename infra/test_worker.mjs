#!/usr/bin/env node
// Smoke test the Cloudflare Worker entrypoint locally — same pattern as
// scripts/test_quiz.mjs: substitute the JSON import with an inline assignment,
// dynamic-import the result, drive it with a mocked env.
//
// Usage: cd infra && node test_worker.mjs

import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";
import { tmpdir } from "node:os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const datasetPath = resolve(root, "dataset/dataset_v1.json");
const workerPath = resolve(__dirname, "src/worker.js");

const dataset = JSON.parse(readFileSync(datasetPath, "utf-8"));
const workerSrc = readFileSync(workerPath, "utf-8").replace(
  /^import dataset from .*?;$/m,
  `const dataset = ${JSON.stringify(dataset)};`,
);

const tmpDir = resolve(tmpdir(), `ca-worker-test-${process.pid}`);
mkdirSync(tmpDir, { recursive: true });
const tmpWorkerPath = resolve(tmpDir, "worker.mjs");
writeFileSync(tmpWorkerPath, workerSrc);
const mod = await import(pathToFileURL(tmpWorkerPath).href);
process.on("exit", () => rmSync(tmpDir, { recursive: true, force: true }));

// Stub D1 — records inserts for inspection
const d1Inserts = [];
function stubD1() {
  return {
    prepare(sql) {
      return {
        _sql: sql,
        _args: [],
        bind(...args) { this._args = args; return this; },
        async run() {
          d1Inserts.push({ sql, args: this._args });
          return { success: true };
        },
        async first() { return { n: 0 }; },
        async all() { return { results: [] }; },
      };
    },
  };
}

// Stub ASSETS — return 200 with placeholder for any GET
const ASSETS = {
  fetch: async (req) => new Response(`<html><body>stub asset for ${new URL(req.url).pathname}</body></html>`, {
    headers: { "content-type": "text/html" },
  }),
};

const env = { DB: stubD1(), ASSETS };

async function call(method, path, body) {
  const req = new Request("http://x" + path, {
    method,
    headers: body ? { "content-type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  const res = await mod.default.fetch(req, env);
  const text = await res.text();
  let parsed;
  try { parsed = JSON.parse(text); } catch { parsed = text; }
  return { status: res.status, body: parsed };
}

// 1) Dataset/read endpoints
const cands = await call("GET", "/api/candidates");
console.log(`✓ /api/candidates returned ${cands.body.length} candidates (expected 8)`);
if (cands.body.length !== 8) throw new Error("candidate count");

const issues = await call("GET", "/api/issues");
console.log(`✓ /api/issues returned ${issues.body.length} issues (expected 25)`);
if (issues.body.length !== 25) throw new Error("issue count");

const questions = await call("GET", "/api/questions");
console.log(`✓ /api/questions returned ${questions.body.length} questions (expected 13)`);
if (questions.body.length !== 13) throw new Error("question count");

const expectedDims = dataset.personal_fit_dimensions.filter((d) => d.default_quiz).length;
const dims = await call("GET", "/api/personal-fit-dimensions");
console.log(`✓ /api/personal-fit-dimensions returned ${dims.body.length} dimensions (expected ${expectedDims})`);
if (dims.body.length !== expectedDims) throw new Error("dimension count");

const ds = await call("GET", "/api/dataset");
console.log(`✓ /api/dataset returned ${ds.body.positions.length} positions (expected 200)`);
if (ds.body.positions.length !== 200) throw new Error("position count");

// 2) /dataset_v1.json (audit URL)
const audit = await call("GET", "/dataset_v1.json");
if (audit.body.version !== "v1") throw new Error("dataset_v1.json should expose version v1");
console.log(`✓ /dataset_v1.json serves the dataset (version ${audit.body.version})`);

// 3) /api root (discovery)
const root_ = await call("GET", "/api");
if (!root_.body.ok) throw new Error("/api should return ok");
console.log(`✓ /api discovery endpoint returned ${root_.body.endpoints.length} endpoints`);

// 4) POST /api/flag — D1 stub records the insert
const flagRes = await call("POST", "/api/flag", {
  candidate_id: "porter",
  issue_id: "housing_supply",
  reason: "missing 2025 statement on SB 423",
});
if (flagRes.status !== 200) throw new Error(`flag insert failed: ${flagRes.status}`);
if (!d1Inserts.find((i) => i.sql.startsWith("INSERT INTO flags"))) {
  throw new Error("flag did not hit D1");
}
console.log(`✓ POST /api/flag persisted (D1 args: ${JSON.stringify(d1Inserts.at(-1).args)})`);

// 5) POST /api/event with each kind
for (const kind of ["quiz_start", "policy_answer", "personal_answer", "quiz_complete", "chat_opened"]) {
  const e = await call("POST", "/api/event", { kind, session_id: "test123" });
  if (e.status !== 200) throw new Error(`event ${kind} failed: ${e.status}`);
}
console.log(`✓ POST /api/event accepts all 5 event kinds`);

// 5a) chat_opened captures the user's question in `detail`, trimmed and capped at 500 chars.
d1Inserts.length = 0;
const longQuestion = "x".repeat(900);
const chat = await call("POST", "/api/event", {
  kind: "chat_opened",
  session_id: "test123",
  issue_id: "housing_supply",
  detail: `  ${longQuestion}  `,
});
if (chat.status !== 200) throw new Error(`chat_opened should 200, got ${chat.status}`);
const chatInsert = d1Inserts.find((i) => i.sql.includes("INSERT INTO events"));
// bind order: kind, session_id, issue_id, dimension_id, stance, importance, candidate_id, match_pct, detail, ...
const detailArg = chatInsert.args[8];
if (typeof detailArg !== "string" || detailArg.length !== 500 || detailArg.startsWith(" ")) {
  throw new Error(`detail should be trimmed and capped to 500 chars; got len=${detailArg?.length}`);
}
console.log(`✓ POST /api/event chat_opened trims + caps the question to 500 chars`);

// 5b) Blank/whitespace detail coerces to null.
d1Inserts.length = 0;
await call("POST", "/api/event", { kind: "chat_opened", session_id: "test123", detail: "   " });
const blankInsert = d1Inserts.find((i) => i.sql.includes("INSERT INTO events"));
if (blankInsert.args[8] !== null) throw new Error("blank detail should bind null");
console.log(`✓ POST /api/event coerces blank chat detail to null`);

// 5c) Bad optional-field values are coerced to null (not bound as NaN / non-string),
// so the fire-and-forget analytics insert never 500s on malformed input.
d1Inserts.length = 0;
const coerce = await call("POST", "/api/event", {
  kind: "policy_answer",
  session_id: "test123",
  issue_id: { not: "a string" },   // non-string → null
  stance: "NaN",                    // non-finite → null
  match_pct: "abc",                 // non-finite → null
});
if (coerce.status !== 200) throw new Error(`event coercion case should 200, got ${coerce.status}`);
const eventInsert = d1Inserts.find((i) => i.sql.includes("INSERT INTO events"));
if (!eventInsert) throw new Error("event insert did not reach D1");
// bind order: kind, session_id, issue_id, dimension_id, stance, importance, candidate_id, match_pct, ...
const [, , issueArg, , stanceArg, , , matchArg] = eventInsert.args;
if (issueArg !== null || stanceArg !== null || matchArg !== null) {
  throw new Error(`bad fields should coerce to null; got issue=${JSON.stringify(issueArg)} stance=${JSON.stringify(stanceArg)} match=${JSON.stringify(matchArg)}`);
}
console.log(`✓ POST /api/event coerces non-string / non-finite optional fields to null`);

// 6) Validation: bad flag body returns 400
const badFlag = await call("POST", "/api/flag", { candidate_id: "x" });
if (badFlag.status !== 400) throw new Error("missing issue_id should 400");
console.log(`✓ /api/flag validates required fields`);

// 7) Validation: bad event kind returns 400
const badEvent = await call("POST", "/api/event", { kind: "junk", session_id: "abc" });
if (badEvent.status !== 400) throw new Error("invalid kind should 400");
console.log(`✓ /api/event validates kind enum`);

// 8) Static asset fallback
const staticReq = await call("GET", "/index.html");
if (staticReq.status !== 200) throw new Error("static fallback should 200");
console.log(`✓ Non-API paths fall through to env.ASSETS`);

// 9) Content-only topic page renders the issue + every candidate. The page
// HTML-escapes text, so compare against the escaped form (& → &amp;, etc).
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const sampleIssue = dataset.issues[0];
const topic = await call("GET", `/topic/${sampleIssue.id}`);
if (topic.status !== 200) throw new Error(`/topic/${sampleIssue.id} should 200, got ${topic.status}`);
if (typeof topic.body !== "string" || !topic.body.includes(escapeHtml(sampleIssue.name))) {
  throw new Error("topic page should contain the issue name");
}
for (const c of dataset.candidates) {
  if (!topic.body.includes(escapeHtml(c.name))) throw new Error(`topic page missing candidate ${c.name}`);
}
console.log(`✓ GET /topic/:id renders "${sampleIssue.name}" with all ${dataset.candidates.length} candidates`);

// 9b) Unknown topic id 404s.
const badTopic = await call("GET", "/topic/__nope__");
if (badTopic.status !== 404) throw new Error(`unknown topic should 404, got ${badTopic.status}`);
console.log(`✓ GET /topic/:id 404s on unknown issue id`);

// 9c) Malformed percent-encoding 404s rather than throwing an uncaught 500.
const malformedTopic = await call("GET", "/topic/%");
if (malformedTopic.status !== 404) throw new Error(`malformed topic id should 404, got ${malformedTopic.status}`);
console.log(`✓ GET /topic/:id 404s on malformed percent-encoding`);

// 10) quiz_complete fires a no-PII ntfy notification when NTFY_TOPIC is set,
// and stays silent when it isn't. Stub global fetch to capture the outbound POST.
{
  const fetchCalls = [];
  const realFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    fetchCalls.push({ url: String(url), body: init?.body });
    return new Response("ok");
  };
  const waited = [];
  const ctx = { waitUntil: (p) => waited.push(p) };
  const topCandidate = dataset.candidates[0];

  const ntfyEnv = { ...env, NTFY_TOPIC: "topic-abc", NTFY_SERVER: "https://ntfy.example" };
  const req = new Request("http://x/api/event", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ kind: "quiz_complete", session_id: "sess-PRIVATE", candidate_id: topCandidate.id, match_pct: 87 }),
  });
  const res = await mod.default.fetch(req, ntfyEnv, ctx);
  if (res.status !== 200) throw new Error(`quiz_complete should 200, got ${res.status}`);
  await Promise.all(waited);
  const ntfyCall = fetchCalls.find((c) => c.url.startsWith("https://ntfy.example/"));
  if (!ntfyCall) throw new Error("quiz_complete should POST to ntfy when NTFY_TOPIC set");
  if (ntfyCall.url !== "https://ntfy.example/topic-abc") throw new Error(`ntfy url should target the topic, got ${ntfyCall.url}`);
  if (!String(ntfyCall.body).includes(topCandidate.name)) throw new Error("ntfy message should name the top match");
  if (String(ntfyCall.body).includes("sess-PRIVATE")) throw new Error("ntfy message must not leak the session id (PII)");
  console.log(`✓ quiz_complete fires a no-PII ntfy notification (top match: ${topCandidate.name})`);

  fetchCalls.length = 0;
  waited.length = 0;
  const reqNoTopic = new Request("http://x/api/event", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ kind: "quiz_complete", session_id: "s", candidate_id: topCandidate.id, match_pct: 50 }),
  });
  await mod.default.fetch(reqNoTopic, env, ctx); // env has no NTFY_TOPIC
  await Promise.all(waited);
  if (fetchCalls.length !== 0) throw new Error("no ntfy call should fire when NTFY_TOPIC is unset");
  console.log("✓ quiz_complete stays silent when NTFY_TOPIC is unset");

  // Without a ctx (no execution context) the notify still fires via the detached
  // fallback path, and the request still 200s. Microtask flush lets it land.
  fetchCalls.length = 0;
  const reqNoCtx = new Request("http://x/api/event", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ kind: "quiz_complete", session_id: "s", candidate_id: topCandidate.id, match_pct: 60 }),
  });
  const resNoCtx = await mod.default.fetch(reqNoCtx, ntfyEnv); // no ctx arg
  if (resNoCtx.status !== 200) throw new Error(`quiz_complete (no ctx) should 200, got ${resNoCtx.status}`);
  await new Promise((r) => setTimeout(r, 0));
  if (!fetchCalls.some((c) => c.url.startsWith("https://ntfy.example/"))) {
    throw new Error("quiz_complete should still notify via the detached fallback when ctx is absent");
  }
  console.log("✓ quiz_complete notifies via the detached fallback when ctx is absent");

  globalThis.fetch = realFetch;
}

console.log("\n✓ all infra/test_worker.mjs checks passed.");

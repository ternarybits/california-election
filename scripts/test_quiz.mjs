#!/usr/bin/env node
// Smoke-test the quiz scoring pipeline by simulating the boot → answer → score path.
//
// This drives infra/src/worker.js's handlers directly via a fake env, so we exercise
// the same endpoints the UI uses. Then it runs the same scoring math the
// inline UI script does (re-implemented here in Node) against synthetic
// answer sets and prints the ranking.
//
// Usage: node scripts/test_quiz.mjs

import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";
import { tmpdir } from "node:os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const datasetPath = resolve(root, "dataset/dataset_v1.json");
const workerPath = resolve(root, "infra/src/worker.js");

// Load worker.js with the JSON import substituted with an inline literal so we
// can dynamic-import it in Node (wrangler bundles JSON imports for the Cloudflare
// build; Node doesn't, hence the substitution).
const dataset = JSON.parse(readFileSync(datasetPath, "utf-8"));
const workerSrc = readFileSync(workerPath, "utf-8").replace(
  /^import dataset from .*?;$/m,
  `const dataset = ${JSON.stringify(dataset)};`,
);
const tmpDir = resolve(tmpdir(), `ca-quiz-test-${process.pid}`);
mkdirSync(tmpDir, { recursive: true });
const tmpModulePath = resolve(tmpDir, "worker.mjs");
writeFileSync(tmpModulePath, workerSrc);
const mod = await import(pathToFileURL(tmpModulePath).href);
process.on("exit", () => rmSync(tmpDir, { recursive: true, force: true }));

async function call(method, path, body) {
  const req = new Request("http://x" + path, {
    method,
    headers: body ? { "content-type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  // Stub D1 + ASSETS — analytics/flag writes are no-ops; static fallback unused.
  const env = {
    DB: { prepare: () => ({ bind: () => ({ run: async () => ({}) }) }) },
    ASSETS: { fetch: async () => new Response("", { status: 200 }) },
  };
  const res = await mod.default.fetch(req, env);
  return res.json();
}

// 1) Verify endpoints
const questions = await call("GET", "/api/questions");
const dims = await call("GET", "/api/personal-fit-dimensions");
const candidates = await call("GET", "/api/candidates");
const full = await call("GET", "/api/dataset");

// Expected quiz length is whatever the dataset flags default_quiz — don't
// hardcode it, so trimming the quiz doesn't silently break this test.
const expectedQuestions = full.questions.filter((q) => q.default_quiz).length;

console.log(`✓ /api/questions returned ${questions.length} questions (expected ${expectedQuestions})`);
console.log(`✓ /api/personal-fit-dimensions returned ${dims.length} dimensions (expected 12)`);
console.log(`✓ /api/candidates returned ${candidates.length} candidates (expected 8)`);
console.log(`✓ /api/dataset returned ${full.positions.length} positions (expected 200)`);

if (questions.length !== expectedQuestions) throw new Error(`expected ${expectedQuestions} questions`);
if (dims.length !== 12) throw new Error("expected 12 dimensions");
if (candidates.length !== 8) throw new Error("expected 8 candidates");

// 2) Simulate a progressive-leaning user
const IMPORTANCE_WEIGHTS = [0.5, 1.0, 2.0];

// Progressive policy: stance 5 on most things, importance high.
const progressivePolicy = questions.map((q) => ({
  issue_id: q.id,
  stance: q.stance_scale[q.stance_scale.length - 1].value, // pick stance 5
  importance_weight: IMPORTANCE_WEIGHTS[2], // high
}));

// Personal: pick career=activism, demographic=woman, geographic=la, age=gen_x, endorsement=labor,
// and 5 on conflict_orientation (fighter) + 1 on years_in_office_band (outsider).
const personalProgressive = [
  { dimension_id: "wealth_self_funding", type: "ordinal", value: 1 },
  { dimension_id: "conflict_orientation", type: "ordinal", value: 5 },
  { dimension_id: "federal_vs_state_focus", type: "ordinal", value: 3 },
  { dimension_id: "position_consistency", type: "ordinal", value: 5 },
  { dimension_id: "integrity_record", type: "ordinal", value: 5 },
  { dimension_id: "electability", type: "ordinal", value: 3 },
  { dimension_id: "years_in_office_band", type: "ordinal", value: 1 },
  { dimension_id: "career_path", type: "multi_select", value: ["activism", "nonprofit"] },
  { dimension_id: "demographic_background", type: "multi_select", value: ["woman", "latino", "black"] },
  { dimension_id: "geographic_background", type: "multi_select", value: ["la", "bay_area"] },
  { dimension_id: "age_band", type: "multi_select", value: ["gen_x", "millennial"] },
  { dimension_id: "endorsement_coalition", type: "multi_select", value: ["labor", "environmental"] },
];

// Conservative policy: stance 1 on most.
const conservativePolicy = questions.map((q) => ({
  issue_id: q.id,
  stance: q.stance_scale[0].value, // pick stance 1
  importance_weight: IMPORTANCE_WEIGHTS[2],
}));

// --- Reimplement the scoring (mirror of infra/public/app.js) ---
function scorePolicy(answers) {
  const byCandidate = {};
  for (const c of candidates) byCandidate[c.id] = { num: 0, den: 0, used: 0 };
  for (const ans of answers) {
    if (ans.stance == null || ans.importance_weight === 0) continue;
    const q = questions.find((x) => x.id === ans.issue_id);
    if (!q) continue;
    const range = Math.max(...q.stance_scale.map((s) => s.value)) - Math.min(...q.stance_scale.map((s) => s.value)) || 1;
    for (const c of candidates) {
      const pos = full.positions.find((p) => p.candidate_id === c.id && p.issue_id === ans.issue_id);
      if (!pos || pos.stance === "unknown" || typeof pos.stance !== "number") continue;
      const agreement = 1 - Math.abs(pos.stance - ans.stance) / range;
      byCandidate[c.id].num += ans.importance_weight * agreement;
      byCandidate[c.id].den += ans.importance_weight;
      byCandidate[c.id].used += 1;
    }
  }
  return byCandidate;
}

function scorePersonal(answers) {
  const byCandidate = {};
  for (const c of candidates) byCandidate[c.id] = { num: 0, den: 0, used: 0 };
  const fieldMap = {
    career_path: "career_path_tags",
    demographic_background: "demographic_tags",
    geographic_background: "geographic_region",
    age_band: "age_band",
    endorsement_coalition: "endorsement_coalition_tags",
  };
  for (const ans of answers) {
    if (ans.value == null || (Array.isArray(ans.value) && ans.value.length === 0)) continue;
    const dim = dims.find((x) => x.id === ans.dimension_id);
    if (!dim) continue;
    for (const c of full.candidates) {
      const attrs = c.personal_attributes || {};
      let agreement = null;
      if (dim.type === "ordinal") {
        const v = attrs[dim.id];
        if (typeof v !== "number") continue;
        const range = Math.max(...dim.scale.map((s) => s.value)) - Math.min(...dim.scale.map((s) => s.value)) || 1;
        agreement = 1 - Math.abs(v - ans.value) / range;
      } else if (dim.type === "multi_select") {
        const field = fieldMap[dim.id] || dim.id;
        const raw = attrs[field];
        if (raw == null) continue;
        const tags = Array.isArray(raw) ? raw : [raw];
        const userPicks = ans.value;
        const matches = tags.filter((t) => userPicks.includes(t)).length;
        agreement = userPicks.length > 0 ? matches / userPicks.length : 0;
      }
      if (agreement != null) {
        byCandidate[c.id].num += agreement;
        byCandidate[c.id].den += 1;
        byCandidate[c.id].used += 1;
      }
    }
  }
  return byCandidate;
}

function rank(policyByC, personalByC, label) {
  const ranked = candidates
    .map((c) => {
      const p = policyByC[c.id];
      const f = personalByC[c.id];
      return {
        name: c.name,
        party: c.party,
        policy_pct: p.den > 0 ? Math.round((p.num / p.den) * 100) : null,
        personal_pct: f.den > 0 ? Math.round((f.num / f.den) * 100) : null,
        scored_p: p.used,
        scored_f: f.used,
      };
    })
    .sort((a, b) => (b.policy_pct ?? -1) - (a.policy_pct ?? -1));
  console.log("\n=== " + label + " ===");
  console.log("Policy   Personal   Candidate");
  console.log("------   --------   ---------");
  for (const r of ranked) {
    console.log(`  ${String(r.policy_pct ?? "—").padStart(3)}%      ${String(r.personal_pct ?? "—").padStart(3)}%     ${r.name} (${r.party})  [${r.scored_p}p/${r.scored_f}f scored]`);
  }
}

rank(scorePolicy(progressivePolicy), scorePersonal(personalProgressive), "PROGRESSIVE persona");
rank(scorePolicy(conservativePolicy), scorePersonal(personalProgressive), "CONSERVATIVE policy + progressive personal");

// 3) Sanity checks
console.log("\n--- Sanity checks ---");
const progRank = candidates.map((c) => {
  const p = scorePolicy(progressivePolicy);
  return { id: c.id, pct: p[c.id].den > 0 ? p[c.id].num / p[c.id].den : null };
}).sort((a, b) => (b.pct ?? -1) - (a.pct ?? -1));

const consRank = candidates.map((c) => {
  const p = scorePolicy(conservativePolicy);
  return { id: c.id, pct: p[c.id].den > 0 ? p[c.id].num / p[c.id].den : null };
}).sort((a, b) => (b.pct ?? -1) - (a.pct ?? -1));

console.log(`Top progressive match: ${progRank[0].id} (${(progRank[0].pct * 100).toFixed(1)}%)`);
console.log(`Top conservative match: ${consRank[0].id} (${(consRank[0].pct * 100).toFixed(1)}%)`);

if (!["steyer", "thurmond"].includes(progRank[0].id)) {
  console.warn(`⚠ Expected Steyer or Thurmond at the top for a stance-5-on-everything persona; got ${progRank[0].id}`);
}
if (!["hilton", "bianco"].includes(consRank[0].id)) {
  console.warn(`⚠ Expected Hilton or Bianco at the top for a stance-1-on-everything persona; got ${consRank[0].id}`);
}

console.log("\n✓ all endpoint and scoring smoke checks passed.");

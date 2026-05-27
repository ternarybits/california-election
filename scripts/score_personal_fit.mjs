#!/usr/bin/env node
// Score each personal-fit dimension by how strongly it differentiates the
// candidates, rank them, and flag the top N (default 7) as default_quiz so the
// web quiz's personal-fit phase shows only the dimensions that actually separate
// the field — the same differentiation-first rule used for policy questions
// (see score_questions.mjs).
//
// Two dimension types need two spread measures, both normalized to ~[0,1]:
//   - ordinal: population std of candidate values / 2 (max std on a 1-5 scale is
//     2.0), times n_resolved/n_total to penalize missing data — same shape as
//     the policy metric.
//   - multi_select: mean pairwise Jaccard distance between candidates' tag sets
//     (0 = identical sets, 1 = disjoint). Captures how distinct candidates'
//     backgrounds/coalitions are, which is what the matching actually compares.
// The two scales aren't perfectly commensurable (Jaccard runs high for sparse,
// high-cardinality tags), but the ranking matches intuition: factual background
// axes separate the field; clustered editorial-preference axes don't.
//
// Usage: node scripts/score_personal_fit.mjs [--top N]

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const datasetPath = resolve(root, "dataset/dataset_v1.json");

const argTop = process.argv.indexOf("--top");
const TOP_N = argTop >= 0 ? Number(process.argv[argTop + 1]) : 7;

// Maps a multi_select dimension id to the candidate attribute field holding its
// tags (mirrors FIELD_MAP in infra/public/app.js).
const FIELD_MAP = {
  career_path: "career_path_tags",
  demographic_background: "demographic_tags",
  geographic_background: "geographic_region",
  age_band: "age_band",
  endorsement_coalition: "endorsement_coalition_tags",
};

const dataset = JSON.parse(readFileSync(datasetPath, "utf-8"));
const candidates = dataset.candidates;
const nTotal = candidates.length;

function pstd(values) {
  const n = values.length;
  if (n === 0) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / n;
  const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / n;
  return Math.sqrt(variance);
}

function jaccardDistance(a, b) {
  const A = new Set(a);
  const B = new Set(b);
  if (A.size === 0 && B.size === 0) return 0;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter += 1;
  const union = A.size + B.size - inter;
  return union === 0 ? 0 : 1 - inter / union;
}

// geographic_background and age_band map to single-valued categorical fields,
// not tag arrays — wrapping them in a 1-element set makes Jaccard a plain
// "same category or not?" distance, which is the intent.
function tagsFor(candidate, dim) {
  const field = FIELD_MAP[dim.id] || dim.id;
  const raw = candidate.personal_attributes?.[field];
  if (raw == null) return [];
  return Array.isArray(raw) ? raw : [raw];
}

const scored = dataset.personal_fit_dimensions.map((dim) => {
  let score;
  let differentiation;
  if (dim.type === "ordinal") {
    const vals = candidates
      .map((c) => c.personal_attributes?.[dim.id])
      .filter((v) => typeof v === "number");
    const std = pstd(vals);
    const nResolved = vals.length;
    score = (std / 2) * (nResolved / nTotal);
    differentiation = {
      score: Number(score.toFixed(3)),
      measure: "ordinal_std",
      std: Number(std.toFixed(3)),
      n_distinct: new Set(vals).size,
      n_resolved: nResolved,
      n_total: nTotal,
    };
  } else {
    const sets = candidates.map((c) => tagsFor(c, dim));
    const dists = [];
    for (let i = 0; i < sets.length; i += 1) {
      for (let j = i + 1; j < sets.length; j += 1) {
        dists.push(jaccardDistance(sets[i], sets[j]));
      }
    }
    const mean = dists.length ? dists.reduce((a, b) => a + b, 0) / dists.length : 0;
    score = mean;
    differentiation = {
      score: Number(score.toFixed(3)),
      measure: "multiselect_jaccard",
      mean_pairwise_jaccard: Number(mean.toFixed(3)),
      n_distinct_tags: new Set(sets.flat()).size,
      n_total: nTotal,
    };
  }
  return { id: dim.id, name: dim.name, type: dim.type, score, differentiation };
});

scored.sort((a, b) => b.score - a.score);

const byId = new Map();
scored.forEach((s, i) => {
  byId.set(s.id, { rank: i + 1, default_quiz: i < TOP_N, differentiation: s.differentiation });
});

// Write rank / default_quiz / differentiation back onto each dimension in place
// (the array keeps its source order; the Worker sorts by rank when serving).
for (const dim of dataset.personal_fit_dimensions) {
  const r = byId.get(dim.id);
  dim.rank = r.rank;
  dim.default_quiz = r.default_quiz;
  dim.differentiation = r.differentiation;
}

writeFileSync(datasetPath, JSON.stringify(dataset, null, 2) + "\n");

console.log(`Ranked ${scored.length} personal-fit dimensions (top ${TOP_N} marked default_quiz=true).`);
console.log();
console.log("Rank  Score  Type          Dimension");
console.log("----  -----  ------------  ---------");
scored.forEach((s, i) => {
  const flag = i < TOP_N ? "★" : " ";
  console.log(`${String(i + 1).padStart(3)}${flag}  ${s.score.toFixed(3)}  ${s.type.padEnd(12)}  ${s.name}`);
});

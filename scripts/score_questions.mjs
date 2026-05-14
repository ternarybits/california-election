#!/usr/bin/env node
// Score each issue by how strongly it differentiates the candidates, then
// populate the dataset's questions[] array with a ranked ordering. The top
// N (default 15) get default_quiz: true so the Buildy quiz UI can pick them
// up automatically.
//
// Metric: score = (std / 2) * (n_resolved / 8)
//   - std is the sample standard deviation of researched stances on a 1-5 scale.
//     std/2 normalizes to [0,1] (max std for a 1/5 split is 2.0).
//   - n_resolved/8 penalizes issues where many candidates are silent — those
//     make weak quiz questions because most users would see "unknown" results.
//
// We also store range, n_distinct, and n_resolved per issue so the UI can
// display "this question splits the field 4 ways" type context.
//
// Usage: node scripts/score_questions.mjs [--top N]

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const datasetPath = resolve(root, "dataset/dataset_v0.json");

const argTop = process.argv.indexOf("--top");
const TOP_N = argTop >= 0 ? Number(process.argv[argTop + 1]) : 15;

const dataset = JSON.parse(readFileSync(datasetPath, "utf-8"));
const totalCandidates = dataset.candidates.length;

function stats(values) {
  const n = values.length;
  if (n === 0) return { mean: 0, std: 0, range: 0, n_distinct: 0 };
  const mean = values.reduce((a, b) => a + b, 0) / n;
  const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / n;
  const std = Math.sqrt(variance);
  const range = Math.max(...values) - Math.min(...values);
  const n_distinct = new Set(values).size;
  return { mean, std, range, n_distinct };
}

const scored = dataset.issues.map((issue) => {
  const positions = dataset.positions.filter((p) => p.issue_id === issue.id);
  const resolved = positions.filter((p) => typeof p.stance === "number");
  const stances = resolved.map((p) => p.stance);
  const { mean, std, range, n_distinct } = stats(stances);
  const n_resolved = resolved.length;
  const score = (std / 2) * (n_resolved / totalCandidates);
  return {
    issue_id: issue.id,
    issue_name: issue.name,
    tier: issue.tier,
    differentiation: {
      score: Number(score.toFixed(3)),
      std: Number(std.toFixed(3)),
      mean: Number(mean.toFixed(3)),
      range,
      n_distinct,
      n_resolved,
      n_total: totalCandidates,
    },
  };
});

scored.sort((a, b) => b.differentiation.score - a.differentiation.score);

scored.forEach((q, i) => {
  q.rank = i + 1;
  q.default_quiz = i < TOP_N;
});

dataset.questions = scored.map((q) => ({
  issue_id: q.issue_id,
  rank: q.rank,
  default_quiz: q.default_quiz,
  differentiation: q.differentiation,
}));

writeFileSync(datasetPath, JSON.stringify(dataset, null, 2) + "\n");

console.log(`Ranked ${scored.length} issues by differentiation score (top ${TOP_N} marked default_quiz=true).`);
console.log();
console.log("Rank  Score  Std   Range  Distinct  Resolved  Tier  Issue");
console.log("----  -----  ----  -----  --------  --------  ----  -----");
for (const q of scored) {
  const d = q.differentiation;
  const flag = q.default_quiz ? "★" : " ";
  console.log(
    `${String(q.rank).padStart(3)}${flag}  ` +
      `${d.score.toFixed(3)}  ${d.std.toFixed(2)}  ${String(d.range).padStart(3)}    ` +
      `${String(d.n_distinct).padStart(4)}      ${String(d.n_resolved).padStart(4)}/${d.n_total}    ` +
      `T${q.tier}    ${q.issue_name}`,
  );
}

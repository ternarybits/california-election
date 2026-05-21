#!/usr/bin/env node
// Merge voter_guide entries from dataset/research/voter_guides_*.json into
// dataset/dataset_v1.json. Each fillin file has shape:
//   { issues: { "<issue_id>": { current_policy, key_facts, ... } } }
// We attach each block to the matching issue's `voter_guide` field.
//
// Idempotent: re-running overwrites voter_guide with the latest fillin content.
//
// Usage: node scripts/merge_voter_guides.mjs

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const datasetPath = resolve(root, "dataset/dataset_v1.json");
const researchDir = resolve(root, "dataset/research");

const dataset = JSON.parse(readFileSync(datasetPath, "utf-8"));
const issuesById = new Map(dataset.issues.map((i) => [i.id, i]));

const REQUIRED_FIELDS = ["current_policy", "key_facts", "comparison", "arguments_for_change", "arguments_against_change", "sources"];

const fillinFiles = readdirSync(researchDir).filter((f) => /^voter_guides_.*\.json$/.test(f));
if (!fillinFiles.length) {
  console.error("No voter_guides_*.json files found in", researchDir);
  process.exit(1);
}

let applied = 0;
const warnings = [];

for (const file of fillinFiles.sort()) {
  const payload = JSON.parse(readFileSync(resolve(researchDir, file), "utf-8"));
  const issues = payload.issues || {};
  for (const [issueId, vg] of Object.entries(issues)) {
    const issue = issuesById.get(issueId);
    if (!issue) {
      warnings.push(`${file}: unknown issue_id "${issueId}" — skipped`);
      continue;
    }
    const missing = REQUIRED_FIELDS.filter((k) => vg[k] == null);
    if (missing.length) {
      warnings.push(`${file}: ${issueId} missing fields [${missing.join(", ")}] — applied anyway`);
    }
    // Validate sources are objects with title + url
    if (Array.isArray(vg.sources)) {
      for (const s of vg.sources) {
        if (!s.title || !s.url) warnings.push(`${file}: ${issueId} has a source missing title/url`);
      }
    }
    issue.voter_guide = vg;
    applied += 1;
    console.log(`✓ ${issueId.padEnd(22)} ← ${file}`);
  }
}

writeFileSync(datasetPath, JSON.stringify(dataset, null, 2) + "\n");

console.log(`\nApplied ${applied} voter_guide blocks.`);
if (warnings.length) {
  console.log("\nWarnings:");
  for (const w of warnings) console.log("  ⚠ " + w);
}

// Coverage report: which default-quiz issues still lack a voter_guide?
const defaultQuiz = (dataset.questions || []).filter((q) => q.default_quiz).sort((a, b) => a.rank - b.rank);
const missing = defaultQuiz.filter((q) => !issuesById.get(q.issue_id)?.voter_guide);
console.log(`\nDefault-quiz coverage: ${defaultQuiz.length - missing.length}/${defaultQuiz.length} have voter guides.`);
if (missing.length) {
  console.log("Still missing: " + missing.map((q) => q.issue_id).join(", "));
}

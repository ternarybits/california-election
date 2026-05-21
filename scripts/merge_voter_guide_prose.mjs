#!/usr/bin/env node
// Patch plain-language prose fields into each issue's voter_guide, preserving
// the existing `sources` and `note_on_options`. Reads any
// dataset/research/vg_prose_*.json fillin files of shape:
//   { issues: { "<issue_id>": { current_policy, key_facts, comparison,
//                               arguments_for_change, arguments_against_change,
//                               explainer? } } }
//
// Usage: node scripts/merge_voter_guide_prose.mjs

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const datasetPath = resolve(root, "dataset/dataset_v1.json");
const researchDir = resolve(root, "dataset/research");

const ds = JSON.parse(readFileSync(datasetPath, "utf-8"));
const issuesById = new Map(ds.issues.map((i) => [i.id, i]));

const PROSE_FIELDS = ["explainer", "current_policy", "key_facts", "comparison", "arguments_for_change", "arguments_against_change"];

const files = readdirSync(researchDir).filter((f) => /^vg_prose_.*\.json$/.test(f)).sort();
if (!files.length) { console.error("No vg_prose_*.json files found."); process.exit(1); }

let patched = 0;
const warnings = [];
// Count inline markdown links so we can sanity-check the rewrite added them.
let linkCount = 0;
const LINK_RE = /\[[^\]]+\]\((https?:\/\/[^\s)]+)\)/g;

for (const file of files) {
  const payload = JSON.parse(readFileSync(resolve(researchDir, file), "utf-8"));
  for (const [id, prose] of Object.entries(payload.issues || {})) {
    const issue = issuesById.get(id);
    if (!issue || !issue.voter_guide) { warnings.push(`${file}: unknown/voter_guide-less issue ${id}`); continue; }
    for (const field of PROSE_FIELDS) {
      if (prose[field] == null) continue;
      issue.voter_guide[field] = prose[field];
      const text = Array.isArray(prose[field]) ? prose[field].join(" ") : prose[field];
      linkCount += (String(text).match(LINK_RE) || []).length;
    }
    patched += 1;
    console.log(`✓ ${id.padEnd(20)} ← ${file}`);
  }
}

writeFileSync(datasetPath, JSON.stringify(ds, null, 2) + "\n");
console.log(`\nPatched prose for ${patched} issues; ${linkCount} inline markdown links total.`);
if (warnings.length) { console.log("\nWarnings:"); warnings.forEach((w) => console.log("  ⚠ " + w)); }

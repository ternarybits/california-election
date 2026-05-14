#!/usr/bin/env node
// Merge research scratch files into the canonical dataset_v1.json.
//
// Reads (if present):
//   - dataset/research/bios.json
//   - dataset/research/positions_<issue_id>.json   (any file matching this pattern)
//
// For bios: overwrites each candidate's bio + personal_attributes + bio_sources.
// For positions: replaces matching (candidate_id, issue_id) entries in dataset.positions[].
//
// Usage: node scripts/merge_research.mjs

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const datasetPath = resolve(root, "dataset/dataset_v1.json");
const researchDir = resolve(root, "dataset/research");

const dataset = JSON.parse(readFileSync(datasetPath, "utf-8"));

let mergedBios = 0;
const biosPath = resolve(researchDir, "bios.json");
if (existsSync(biosPath)) {
  const bios = JSON.parse(readFileSync(biosPath, "utf-8"));
  for (const b of bios.candidates) {
    const c = dataset.candidates.find((x) => x.id === b.id);
    if (!c) {
      console.error(`bios.json: unknown candidate id "${b.id}" — skipping`);
      continue;
    }
    c.bio = b.bio;
    c.personal_attributes = b.personal_attributes;
    c.bio_sources = b.sources;
    if (b.notes) c.bio_notes = b.notes;
    mergedBios += 1;
  }
}

let mergedPositions = 0;
const issueIds = new Set(dataset.issues.map((i) => i.id));
const candidateIds = new Set(dataset.candidates.map((c) => c.id));
const posFiles = readdirSync(researchDir).filter((f) => /^positions_.+\.json$/.test(f));
for (const f of posFiles) {
  const data = JSON.parse(readFileSync(resolve(researchDir, f), "utf-8"));
  for (const p of data.positions) {
    if (!issueIds.has(p.issue_id)) {
      console.error(`${f}: unknown issue_id "${p.issue_id}" — skipping`);
      continue;
    }
    if (!candidateIds.has(p.candidate_id)) {
      console.error(`${f}: unknown candidate_id "${p.candidate_id}" — skipping`);
      continue;
    }
    const i = dataset.positions.findIndex(
      (x) => x.candidate_id === p.candidate_id && x.issue_id === p.issue_id,
    );
    if (i >= 0) dataset.positions[i] = p;
    else dataset.positions.push(p);
    mergedPositions += 1;
  }
}

writeFileSync(datasetPath, JSON.stringify(dataset, null, 2) + "\n");

console.log(`Merged ${mergedBios} bios and ${mergedPositions} positions into ${datasetPath}`);
console.log(`Dataset now has ${dataset.candidates.length} candidates, ${dataset.issues.length} issues, ${dataset.positions.length} positions.`);

#!/usr/bin/env node
// Deploy the candidate matcher to Buildy.
//
// Usage:
//   node deploy.mjs                # first deploy — creates a new app, prints token
//   node deploy.mjs --pair         # request auto-pairing flow
//   node deploy.mjs --update <id>  # update an existing app (requires BUILDY_TOKEN env)
//
// The dataset is read from ../dataset/dataset_v0.json and inlined into module.js
// (Buildy modules can't read the filesystem and have no outbound HTTP, so the
// dataset must be bundled).

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const args = process.argv.slice(2);
const pair = args.includes("--pair");
const updateIdx = args.indexOf("--update");
const updateId = updateIdx >= 0 ? args[updateIdx + 1] : null;

const datasetPath = resolve(root, "dataset/dataset_v0.json");
const modulePath = resolve(__dirname, "module.js");
const uiPath = resolve(__dirname, "ui.html");
const stylesPath = resolve(__dirname, "styles.css");

const dataset = readFileSync(datasetPath, "utf-8").trim();
const moduleSrc = readFileSync(modulePath, "utf-8").replace("__DATASET__", dataset);
const ui = readFileSync(uiPath, "utf-8");
const styles = readFileSync(stylesPath, "utf-8");

const body = { module: moduleSrc, ui, styles };
if (pair) body.pair = true;

const url = updateId
  ? `https://app.buildy.so/app/${encodeURIComponent(updateId)}`
  : "https://app.buildy.so/app";

const headers = { "content-type": "application/json" };
if (updateId) {
  const token = process.env.BUILDY_TOKEN;
  if (!token) {
    console.error("--update requires BUILDY_TOKEN env var");
    process.exit(1);
  }
  headers.authorization = `Bearer ${token}`;
}

console.log(`${updateId ? "Updating" : "Creating"} Buildy app${pair ? " (paired)" : ""}…`);
console.log(`  module: ${moduleSrc.length} bytes`);
console.log(`  ui:     ${ui.length} bytes`);
console.log(`  styles: ${styles.length} bytes`);

const res = await fetch(url, {
  method: updateId ? "PUT" : "POST",
  headers,
  body: JSON.stringify(body),
});

const text = await res.text();
if (!res.ok) {
  console.error(`Buildy responded ${res.status}: ${text}`);
  process.exit(1);
}

let parsed;
try { parsed = JSON.parse(text); } catch { parsed = { raw: text }; }
console.log("\nResponse:");
console.log(JSON.stringify(parsed, null, 2));

if (parsed.token && !updateId) {
  const envPath = resolve(__dirname, ".env.local");
  writeFileSync(envPath, `BUILDY_APP_ID=${parsed.id}\nBUILDY_TOKEN=${parsed.token}\nBUILDY_URL=${parsed.url}\n`);
  console.log(`\nSaved token to ${envPath} — KEEP THIS FILE; the token is irrecoverable.`);
}

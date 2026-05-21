#!/usr/bin/env node
// One-shot migration: split `tax_top_wealth` into `tax_top` (income/corporate
// rate axis) + `tax_wealth` (state wealth tax axis). Idempotent-ish: refuses to
// run if tax_top already exists.
//
// Usage: node scripts/split_tax_issue.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const datasetPath = resolve(root, "dataset/dataset_v1.json");
const fillinPath = resolve(root, "dataset/research/tax_split_positions.json");

const ds = JSON.parse(readFileSync(datasetPath, "utf-8"));
const fillin = JSON.parse(readFileSync(fillinPath, "utf-8"));

if (ds.issues.some((i) => i.id === "tax_top")) {
  console.error("tax_top already exists — migration already ran. Aborting.");
  process.exit(1);
}

const oldIdx = ds.issues.findIndex((i) => i.id === "tax_top_wealth");
if (oldIdx < 0) {
  console.error("tax_top_wealth not found. Aborting.");
  process.exit(1);
}

// ---- New issue definitions ----

const taxTop = {
  id: "tax_top",
  name: "Top-bracket and corporate tax rates",
  tier: 1,
  category: "economy",
  short_description: "Should CA raise or cut income and corporate tax rates on top earners and businesses?",
  ca_specific_context: "Top marginal personal income rate is 13.3% (highest in the US); the corporate rate is 8.84%.",
  stance_scale: [
    { value: 1, label: "Cut top-bracket and corporate rates" },
    { value: 2, label: "Hold current rates" },
    { value: 3, label: "Modestly raise top-bracket and/or corporate rates" },
    { value: 4, label: "Substantially raise top-bracket and corporate rates" },
    { value: 5, label: "Substantially raise rates and add new higher brackets" },
  ],
  voter_guide: {
    current_policy:
      "California's top marginal personal income tax rate is 13.3% on taxable income above roughly $1 million — the highest of any state — made permanent by Prop 30 (2012) and Prop 55 (2016). A 1% Mental Health Services Tax (Prop 63, 2004) applies above $1 million, and a 2024 expansion of State Disability Insurance added 1.1% on wages above $1 million. The corporate income tax has been 8.84% (banks 10.84%) since 1997.",
    key_facts: [
      "Top marginal individual rate: 13.3% (highest in the US). Next closest: NY 10.9%, NJ 10.75%, OR 9.9%.",
      "The top 1% of filers contribute roughly half of personal-income-tax revenue (Legislative Analyst's Office).",
      "Corporate rate (8.84%) is mid-pack among states that levy a corporate income tax.",
      "Texas, Florida, Nevada, Washington and several other states levy no state income tax.",
      "Reliance on the top bracket makes revenue progressive but volatile — receipts swing sharply in downturns.",
    ],
    comparison:
      "California's structure is more progressive than most states, leaning heavily on top earners, but is also more revenue-volatile. Stacked with federal rates, the effective top marginal rate exceeds 50%.",
    arguments_for_change:
      "Proponents of higher top-bracket or corporate rates argue that the wealthiest residents and most profitable corporations captured most of the state's income growth, that recurring revenue is needed to avoid cutting safety-net programs, and that California can ask more of its highest earners without losing the revenue they generate.",
    arguments_against_change:
      "Opponents argue that California already has the nation's highest top rates, that IRS migration data shows net outflows of high-income filers to no-tax states since 2020, that over-reliance on top earners makes the budget extremely volatile, and that higher corporate rates accelerate headquarters relocations.",
    sources: [
      { title: "LAO — California's Tax System primer", url: "https://lao.ca.gov/Publications/Report/3724" },
      { title: "Franchise Tax Board — Personal Income Tax statistics", url: "https://www.ftb.ca.gov/about-ftb/data-reports-plans/california-personal-income-tax-statistics.html" },
      { title: "Tax Foundation — State Individual Income Tax Rates 2024", url: "https://taxfoundation.org/data/all/state/state-income-tax-rates-2024/" },
    ],
  },
};

const taxWealth = {
  id: "tax_wealth",
  name: "State wealth tax",
  tier: 1,
  category: "economy",
  short_description: "Should CA create a state wealth tax on the ultra-wealthy — taxing accumulated net worth, not just income?",
  ca_specific_context: "AB 259 (2023) and a November 2026 ballot initiative would tax billionaire net worth; none has been enacted.",
  stance_scale: [
    { value: 1, label: "Oppose any state wealth tax" },
    { value: 2, label: "Skeptical — no current support" },
    { value: 3, label: "Open or undecided" },
    { value: 4, label: "Support a wealth tax" },
    { value: 5, label: "Strongly support an aggressive wealth tax" },
  ],
  voter_guide: {
    current_policy:
      "California has no state-level wealth tax. A wealth tax levies an annual charge on a person's accumulated net worth (assets), distinct from taxes on income. AB 259 (2023–24) would have imposed 1% on net worth above $50 million and 1.5% above $1 billion; it stalled in committee. A separate billionaire wealth-tax initiative is slated for the November 2026 ballot.",
    key_facts: [
      "No US state currently operates a true wealth tax.",
      "AB 259 (2023) proposed 1% on net worth over $50M and 1.5% over $1B; it did not advance.",
      "Washington's 2022 capital-gains tax (a tax on investment income, not net worth) survived court challenge; broad wealth-tax proposals failed in WA, NY, MA, and IL.",
      "A wealth tax targets the stock of accumulated assets, which high earners can hold without realizing taxable income.",
      "Valuation of illiquid assets (private companies, art, real estate) is the central administrative challenge.",
    ],
    comparison:
      "California would be the first US state to operate a true net-worth tax. Several other high-tax states considered and rejected the idea, citing constitutional, valuation, and capital-flight concerns.",
    arguments_for_change:
      "Proponents argue that a wealth tax reaches fortunes that income taxes miss — billionaires can minimize taxable income while their net worth compounds — and that even a small annual rate on the very largest fortunes would fund schools, health care, and care work with a stable, narrowly targeted base.",
    arguments_against_change:
      "Opponents argue that a state wealth tax raises serious constitutional and administrative problems (valuing illiquid assets, federal direct-tax precedent), that the most mobile residents would relocate or restructure to avoid it, and that revenue would be unpredictable and concentrated among a handful of taxpayers.",
    sources: [
      { title: "AB 259 (Lee, 2023) — California Wealth Tax", url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB259" },
      { title: "CRS — Net Wealth Tax: Reviewing the Issues (IF11756)", url: "https://crsreports.congress.gov/product/pdf/IF/IF11756" },
      { title: "LAO — California's Tax System primer", url: "https://lao.ca.gov/Publications/Report/3724" },
    ],
  },
};

// Replace tax_top_wealth issue with tax_top, then insert tax_wealth right after.
ds.issues.splice(oldIdx, 1, taxTop, taxWealth);

// ---- Positions ----
// Drop old tax_top_wealth positions; build new ones from the fillin.
ds.positions = ds.positions.filter((p) => p.issue_id !== "tax_top_wealth");

function buildPositions(issueId) {
  const block = fillin.issues[issueId];
  const out = [];
  for (const c of ds.candidates) {
    const p = block[c.id];
    if (!p) {
      console.warn(`  ⚠ ${issueId}: no fillin for ${c.id}`);
      continue;
    }
    out.push({
      candidate_id: c.id,
      issue_id: issueId,
      stance: p.stance,
      summary: p.summary ?? "",
      source_quote: p.source_quote ?? null,
      source_url: p.source_url ?? null,
      source_date: p.source_date ?? null,
      confidence: p.confidence ?? "medium",
    });
  }
  return out;
}

const newPositions = [...buildPositions("tax_top"), ...buildPositions("tax_wealth")];
ds.positions.push(...newPositions);

// ---- Questions ----
// Remove the old tax_top_wealth question entry; add tax_top + tax_wealth.
// (differentiation + rank + default_quiz are recomputed by score_questions.mjs)
ds.questions = ds.questions.filter((q) => q.issue_id !== "tax_top_wealth");
for (const issueId of ["tax_top", "tax_wealth"]) {
  ds.questions.push({ issue_id: issueId, rank: 999, default_quiz: false, differentiation: null });
}

// ---- Schema note + counts ----
const nIssues = ds.issues.length;
const nPositions = ds.positions.length;
ds.$schema_note = `v1 — first complete research pass, then refined. ${ds.candidates.length} candidates × ${nIssues} issues = ${nPositions} candidate-issue positions. The tax_top_wealth issue was split into tax_top (income/corporate rates) and tax_wealth (state wealth tax) so the two independent axes score separately. Issues ranked by differentiation score in questions[]; top 15 flagged default_quiz=true. Corrections welcome via GitHub PR or in-app flag.`;

writeFileSync(datasetPath, JSON.stringify(ds, null, 2) + "\n");

console.log(`✓ Split complete.`);
console.log(`  Issues: ${nIssues} (was 24)`);
console.log(`  Positions: ${nPositions}`);
console.log(`  tax_top + tax_wealth issues added; tax_top_wealth removed.`);
console.log(`\nNext: run scripts/score_questions.mjs to recompute differentiation + ranking.`);

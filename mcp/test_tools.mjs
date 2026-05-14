#!/usr/bin/env node
// Smoke test the MCP server's scoring tools by connecting as a client over stdio.
//
// Spawns ./src/index.js, lists tools, calls get_differentiating_questions
// and score_user_positions with progressive and conservative personas, and
// checks the rankings against expected top candidates.
//
// Usage: cd mcp && node test_tools.mjs

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const serverPath = resolve(__dirname, "src", "index.js");

const transport = new StdioClientTransport({
  command: "node",
  args: [serverPath],
});

const client = new Client({ name: "test-client", version: "0.0.1" });
await client.connect(transport);

function parsePayload(result) {
  // Tool responses have content: [{ type: 'text', text: '...' }]
  const text = result?.content?.[0]?.text ?? "";
  try { return JSON.parse(text); } catch { return text; }
}

async function callTool(name, args) {
  const res = await client.callTool({ name, arguments: args ?? {} });
  return parsePayload(res);
}

// 1) List tools and verify the new ones are registered
const tools = await client.listTools();
const toolNames = tools.tools.map((t) => t.name).sort();
const expected = [
  "get_candidate_bio",
  "get_differentiating_questions",
  "get_positions",
  "list_candidates",
  "list_issues",
  "list_personal_fit_dimensions",
  "score_user_positions",
];
console.log(`Tools registered (${toolNames.length}): ${toolNames.join(", ")}`);
for (const e of expected) {
  if (!toolNames.includes(e)) throw new Error(`expected tool not found: ${e}`);
}
console.log("✓ all 7 expected tools registered");

// 2) get_differentiating_questions — default
const diff = await callTool("get_differentiating_questions");
console.log(`\n✓ get_differentiating_questions default returned ${diff.returned} of ${diff.total_issues} issues (expected 15 / 24)`);
if (diff.returned !== 15 || diff.total_issues !== 24) throw new Error("unexpected counts");
console.log(`  top 3: ${diff.questions.slice(0, 3).map((q) => `${q.name} (score ${q.differentiation.score})`).join(" | ")}`);

// 3) get_differentiating_questions — explicit top_n
const full = await callTool("get_differentiating_questions", { top_n: 24 });
if (full.returned !== 24) throw new Error("top_n=24 should return all 24");
console.log(`✓ top_n=24 returned all 24 issues`);

// 4) score_user_positions — progressive persona (stance 5 on every default-quiz issue, high importance)
const progressivePolicy = diff.questions.map((q) => ({
  issue_id: q.issue_id,
  stance: 5,
  importance: "high",
}));
const progressivePersonal = [
  { dimension_id: "wealth_self_funding", value: 1 },
  { dimension_id: "conflict_orientation", value: 5 },
  { dimension_id: "years_in_office_band", value: 1 },
  { dimension_id: "career_path", value: ["activism", "nonprofit"] },
  { dimension_id: "demographic_background", value: ["woman", "latino", "black"] },
  { dimension_id: "geographic_background", value: ["la", "bay_area"] },
  { dimension_id: "age_band", value: ["gen_x", "millennial"] },
  { dimension_id: "endorsement_coalition", value: ["labor", "environmental"] },
];
const progResult = await callTool("score_user_positions", {
  policy_answers: progressivePolicy,
  personal_fit_answers: progressivePersonal,
});

console.log("\n=== PROGRESSIVE persona (stance-5 everything, high importance) ===");
console.log("Policy   Personal   Candidate");
console.log("------   --------   ---------");
for (const r of progResult.ranking) {
  console.log(`  ${String(r.policy_match_pct ?? "—").padStart(3)}%      ${String(r.personal_fit_pct ?? "—").padStart(3)}%     ${r.candidate_name} (${r.party})`);
}

const top = progResult.ranking[0];
console.log(`\n✓ top match: ${top.candidate_name} (${top.policy_match_pct}% policy / ${top.personal_fit_pct}% personal fit)`);
if (!["Tom Steyer", "Tony Thurmond"].includes(top.candidate_name)) {
  console.warn(`⚠ expected Steyer or Thurmond at top; got ${top.candidate_name}`);
}

// Spot-check that top_agreements include real source quotes
console.log(`\n✓ ${top.candidate_name}'s top agreement: ${top.top_agreements[0].issue_name}`);
console.log(`  user ${top.top_agreements[0].user_stance} vs candidate ${top.top_agreements[0].candidate_stance} = ${(top.top_agreements[0].agreement * 100).toFixed(0)}% agreement`);
if (top.top_agreements[0].source_quote) {
  console.log(`  source: "${top.top_agreements[0].source_quote.slice(0, 80)}..."`);
} else {
  console.log(`  source quote missing (acceptable — not all positions have quotes)`);
}

// 5) score_user_positions — conservative
const conservativePolicy = diff.questions.map((q) => ({ issue_id: q.issue_id, stance: 1, importance: "high" }));
const consResult = await callTool("score_user_positions", { policy_answers: conservativePolicy });

console.log("\n=== CONSERVATIVE persona (stance-1 everything, high importance) ===");
console.log(`✓ top match: ${consResult.ranking[0].candidate_name} (${consResult.ranking[0].policy_match_pct}% policy)`);
if (!["Chad Bianco", "Steve Hilton"].includes(consResult.ranking[0].candidate_name)) {
  console.warn(`⚠ expected Bianco or Hilton at top; got ${consResult.ranking[0].candidate_name}`);
}

// 6) score_user_positions — invalid issue_id should be skipped, not crash
const badResult = await callTool("score_user_positions", {
  policy_answers: [
    { issue_id: "housing_supply", stance: 1, importance: "high" },
    { issue_id: "this_does_not_exist", stance: 3, importance: "high" },
  ],
});
console.log(`\n✓ invalid issue_id handled gracefully (skipped_issues: ${JSON.stringify(badResult.skipped_issues)})`);
if (!badResult.skipped_issues.includes("this_does_not_exist")) {
  throw new Error("expected unknown issue_id to appear in skipped_issues");
}

await client.close();
console.log("\n✓ all MCP scoring-tool checks passed.");

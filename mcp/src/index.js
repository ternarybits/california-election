#!/usr/bin/env node
// California 2026 Gubernatorial Candidate Matcher — MCP server (stdio).
//
// Tools exposed:
//   - list_candidates()                — roster summary
//   - list_issues()                    — all policy issues with stance scales
//   - get_positions(issue_id)          — every candidate's stance on one issue, with sources
//   - list_personal_fit_dimensions()   — non-policy axes (career, demographic, etc.)
//   - get_candidate_bio(candidate_id)  — bio + personal attributes
//
// Future tools (get_differentiating_questions, score_user_positions) will
// land when the quiz UI is wired up.

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const datasetPath = resolve(__dirname, "..", "..", "dataset", "dataset_v1.json");
const dataset = JSON.parse(readFileSync(datasetPath, "utf-8"));

const server = new McpServer({
  name: "california-election",
  version: "0.0.1",
});

function textContent(payload) {
  return {
    content: [
      { type: "text", text: typeof payload === "string" ? payload : JSON.stringify(payload, null, 2) },
    ],
  };
}

server.registerTool(
  "list_candidates",
  {
    title: "List candidates",
    description: "List all candidates in the California 2026 gubernatorial primary dataset. Returns id, name, party, and a one-sentence bio for each. Use this first to discover candidate IDs before calling other tools.",
    inputSchema: {},
  },
  async () => {
    return textContent({
      snapshot_date: dataset.snapshot_date,
      dataset_version: dataset.version,
      candidates: dataset.candidates.map((c) => ({
        id: c.id,
        name: c.name,
        party: c.party,
        bio_short: c.bio_short,
      })),
    });
  },
);

server.registerTool(
  "list_issues",
  {
    title: "List issues",
    description: "List all policy issues tracked in the dataset, with their stance scales. Use this to discover issue IDs before calling get_positions.",
    inputSchema: {},
  },
  async () => {
    return textContent({
      snapshot_date: dataset.snapshot_date,
      issues: dataset.issues.map((i) => ({
        id: i.id,
        name: i.name,
        tier: i.tier,
        category: i.category,
        short_description: i.short_description,
        stance_scale: i.stance_scale,
      })),
    });
  },
);

server.registerTool(
  "get_positions",
  {
    title: "Get positions on an issue",
    description: "Get every candidate's position on a single issue, including the source quote, URL, and confidence level. Use this to research where candidates differ on a specific topic. Returns 'unknown' (with confidence: 'insufficient_data') for the ~4% of candidate-issue pairs where the candidate has not publicly addressed the topic.",
    inputSchema: {
      issue_id: z.string().describe("The issue ID from list_issues, e.g. 'housing_supply' or 'public_safety'."),
    },
  },
  async ({ issue_id }) => {
    const issue = dataset.issues.find((i) => i.id === issue_id);
    if (!issue) {
      return textContent({ error: `unknown issue_id: ${issue_id}. Call list_issues to discover valid IDs.` });
    }
    const positions = dataset.candidates.map((candidate) => {
      const p = dataset.positions.find(
        (x) => x.issue_id === issue_id && x.candidate_id === candidate.id,
      );
      if (!p) {
        return {
          candidate_id: candidate.id,
          candidate_name: candidate.name,
          party: candidate.party,
          stance: "unknown",
          stance_label: null,
          summary: "Not yet researched.",
          source_quote: null,
          source_url: null,
          source_date: null,
          confidence: "scaffold",
        };
      }
      return {
        candidate_id: p.candidate_id,
        candidate_name: candidate.name,
        party: candidate.party,
        stance: p.stance,
        stance_label: typeof p.stance === "number"
          ? issue.stance_scale.find((s) => s.value === p.stance)?.label ?? null
          : null,
        summary: p.summary,
        source_quote: p.source_quote,
        source_url: p.source_url,
        source_date: p.source_date,
        confidence: p.confidence,
      };
    });
    return textContent({
      issue: {
        id: issue.id,
        name: issue.name,
        short_description: issue.short_description,
        ca_specific_context: issue.ca_specific_context,
        stance_scale: issue.stance_scale,
      },
      positions,
      snapshot_date: dataset.snapshot_date,
    });
  },
);

server.registerTool(
  "list_personal_fit_dimensions",
  {
    title: "List personal-fit dimensions",
    description: "List the non-policy dimensions used to score 'personal fit' — wealth, career background, conflict orientation, demographic background, etc. Personal fit is scored separately from policy alignment and never blended. Use this to help a user articulate non-policy preferences (e.g., 'I prefer outsiders' or 'I want a candidate from the Bay Area').",
    inputSchema: {},
  },
  async () => {
    return textContent({
      snapshot_date: dataset.snapshot_date,
      dimensions: dataset.personal_fit_dimensions,
    });
  },
);

server.registerTool(
  "get_candidate_bio",
  {
    title: "Get candidate biographical and personal attributes",
    description: "Return a candidate's biographical data (dob, birthplace, race/ethnicity, gender, religion, prior careers, years in elected office, net worth, self-funded campaign share, education) plus their tagged personal attributes used for personal-fit scoring. Returns 'TODO' / null fields for data not yet researched in this scaffold version.",
    inputSchema: {
      candidate_id: z.string().describe("The candidate ID from list_candidates."),
    },
  },
  async ({ candidate_id }) => {
    const c = dataset.candidates.find((x) => x.id === candidate_id);
    if (!c) {
      return textContent({ error: `unknown candidate_id: ${candidate_id}. Call list_candidates to discover valid IDs.` });
    }
    return textContent({
      id: c.id,
      name: c.name,
      party: c.party,
      bio_short: c.bio_short,
      bio: c.bio,
      personal_attributes: c.personal_attributes,
      campaign_url: c.campaign_url,
      declared_date: c.declared_date,
      polling_latest_pct: c.polling_latest_pct,
      money_raised_usd: c.money_raised_usd,
      endorsements: c.endorsements,
      snapshot_date: c.snapshot_date,
    });
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);

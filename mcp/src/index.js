#!/usr/bin/env node
// California 2026 Gubernatorial Candidate Matcher — MCP server (stdio).
//
// Tools exposed:
//   - list_candidates()                       — roster summary
//   - list_issues()                           — all policy issues with stance scales
//   - get_positions(issue_id)                 — every candidate's stance on one issue, with sources
//   - list_personal_fit_dimensions()          — non-policy axes (career, demographic, etc.)
//   - get_candidate_bio(candidate_id)         — bio + personal attributes
//   - get_differentiating_questions(top_n?)   — issues ranked by spread; the questions that actually divide the field
//   - score_user_positions(...)               — rank candidates against user-supplied policy + personal-fit answers

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const datasetPath = resolve(__dirname, "..", "..", "dataset", "dataset_v1.json");
const dataset = JSON.parse(readFileSync(datasetPath, "utf-8"));

// The web quiz's default length = however many issues are flagged default_quiz.
// Derive it so this server stays in lockstep with the quiz instead of hardcoding.
const DEFAULT_QUIZ_N = (dataset.questions || []).filter((q) => q.default_quiz).length;

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

server.registerTool(
  "get_differentiating_questions",
  {
    title: "Get questions ranked by how strongly they differentiate the candidates",
    description: `Return policy issues ranked by differentiation score — the questions where candidates actually differ. Score = (std of stances / 2) * (n_researched / n_total), so questions where the field is uniform or under-researched rank lower. Use this to sequence a deliberation conversation around the issues that matter most. Defaults to the ${DEFAULT_QUIZ_N} that make up the default web quiz; pass top_n=25 for the full ranking.`,
    inputSchema: {
      top_n: z.number().int().min(1).max(25).optional().describe(`How many top-ranked questions to return. Default ${DEFAULT_QUIZ_N} (matches the default web quiz). Max 25 (all issues).`),
    },
  },
  async ({ top_n }) => {
    const issuesById = new Map(dataset.issues.map((i) => [i.id, i]));
    const sorted = (dataset.questions || []).slice().sort((a, b) => a.rank - b.rank);
    // Default (no top_n) returns exactly the web quiz's default_quiz set — match
    // on the flag, not a rank cutoff, so the two modalities can't diverge if the
    // flagged subset ever stops being a contiguous top-N. An explicit top_n still
    // takes the top N by rank (e.g. top_n=25 for the full ranking).
    const selected = top_n == null ? sorted.filter((q) => q.default_quiz) : sorted.slice(0, top_n);
    const ranked = selected
      .map((q) => {
        const issue = issuesById.get(q.issue_id);
        if (!issue) return null;
        return {
          rank: q.rank,
          issue_id: issue.id,
          name: issue.name,
          tier: issue.tier,
          category: issue.category,
          short_description: issue.short_description,
          ca_specific_context: issue.ca_specific_context,
          stance_scale: issue.stance_scale,
          differentiation: q.differentiation,
          default_quiz: q.default_quiz,
        };
      })
      .filter(Boolean);
    return textContent({
      snapshot_date: dataset.snapshot_date,
      dataset_version: dataset.version,
      total_issues: dataset.issues.length,
      returned: ranked.length,
      questions: ranked,
    });
  },
);

// Importance string → weight (matches infra/public/app.js — keep in sync; tests pin both to the same persona outputs).
const IMPORTANCE_WEIGHTS = { low: 0.5, medium: 1.0, high: 2.0 };

// Multi-select dimension → candidate field name (matches infra/public/app.js scoring).
const MULTI_SELECT_FIELD = {
  career_path: "career_path_tags",
  demographic_background: "demographic_tags",
  geographic_background: "geographic_region",
  age_band: "age_band",
  endorsement_coalition: "endorsement_coalition_tags",
};

server.registerTool(
  "score_user_positions",
  {
    title: "Score a user's positions against every candidate",
    description: "Rank candidates against the user's stances. Pass policy_answers (issue_id, stance value, optional importance) and optional personal_fit_answers (dimension_id, value — number for ordinal, array for multi-select). Returns two separate scores per candidate (policy_match_pct and personal_fit_pct, never blended) plus the top 3 agreements and disagreements weighted by importance — use those to explain *why* each candidate matched or didn't, with verbatim source quotes.",
    inputSchema: {
      policy_answers: z.array(z.object({
        issue_id: z.string().describe("Issue ID from list_issues / get_differentiating_questions."),
        stance: z.number().int().min(1).max(5).describe("User's stance on this issue (1-5, matching the issue's stance_scale)."),
        importance: z.enum(["low", "medium", "high"]).optional().describe("How much this issue matters to the user. Default 'medium'."),
      })).describe("Required. The user's stances on policy issues. Issues not included are skipped in scoring."),
      personal_fit_answers: z.array(z.object({
        dimension_id: z.string().describe("Dimension ID from list_personal_fit_dimensions."),
        value: z.union([z.number().int(), z.array(z.string())]).describe("Number for ordinal dimensions; array of option IDs for multi-select dimensions."),
      })).optional().describe("Optional. Non-policy preferences. Dimensions not included are skipped."),
    },
  },
  async ({ policy_answers, personal_fit_answers }) => {
    const issuesById = new Map(dataset.issues.map((i) => [i.id, i]));
    const dimsById = new Map(dataset.personal_fit_dimensions.map((d) => [d.id, d]));

    // ---- policy scoring (same math as infra/public/app.js scorePolicyDetailed) ----
    const policyBy = {};
    const detailsBy = {}; // per-candidate per-issue detail for top agreements/disagreements
    for (const c of dataset.candidates) {
      policyBy[c.id] = { num: 0, den: 0, used: 0 };
      detailsBy[c.id] = [];
    }
    const skipped_issues = [];
    for (const ans of policy_answers) {
      const issue = issuesById.get(ans.issue_id);
      if (!issue) { skipped_issues.push(ans.issue_id); continue; }
      const weight = IMPORTANCE_WEIGHTS[ans.importance ?? "medium"];
      const stanceVals = issue.stance_scale.map((s) => s.value);
      const range = Math.max(...stanceVals) - Math.min(...stanceVals) || 1;
      for (const c of dataset.candidates) {
        const pos = dataset.positions.find((p) => p.candidate_id === c.id && p.issue_id === ans.issue_id);
        if (!pos || pos.stance === "unknown" || typeof pos.stance !== "number") continue;
        const agreement = 1 - Math.abs(pos.stance - ans.stance) / range;
        policyBy[c.id].num += weight * agreement;
        policyBy[c.id].den += weight;
        policyBy[c.id].used += 1;
        detailsBy[c.id].push({
          issue_id: ans.issue_id,
          issue_name: issue.name,
          user_stance: ans.stance,
          user_stance_label: issue.stance_scale.find((s) => s.value === ans.stance)?.label ?? null,
          candidate_stance: pos.stance,
          candidate_stance_label: issue.stance_scale.find((s) => s.value === pos.stance)?.label ?? null,
          candidate_summary: pos.summary,
          source_quote: pos.source_quote || null,
          source_url: pos.source_url || null,
          agreement: Number(agreement.toFixed(3)),
          importance: ans.importance ?? "medium",
          importance_weight: weight,
        });
      }
    }

    // ---- personal-fit scoring ----
    const personalBy = {};
    for (const c of dataset.candidates) personalBy[c.id] = { num: 0, den: 0, used: 0 };
    const skipped_dimensions = [];
    for (const ans of personal_fit_answers ?? []) {
      const dim = dimsById.get(ans.dimension_id);
      if (!dim) { skipped_dimensions.push(ans.dimension_id); continue; }
      // Empty arrays mean "no preference" — skip.
      if (Array.isArray(ans.value) && ans.value.length === 0) continue;
      for (const c of dataset.candidates) {
        const attrs = c.personal_attributes || {};
        let agreement = null;
        if (dim.type === "ordinal") {
          const v = attrs[dim.id];
          if (typeof v !== "number" || typeof ans.value !== "number") continue;
          const scaleVals = dim.scale.map((s) => s.value);
          const range = Math.max(...scaleVals) - Math.min(...scaleVals) || 1;
          agreement = 1 - Math.abs(v - ans.value) / range;
        } else if (dim.type === "multi_select") {
          if (!Array.isArray(ans.value)) continue;
          const field = MULTI_SELECT_FIELD[dim.id] || dim.id;
          const raw = attrs[field];
          if (raw == null) continue;
          const tags = Array.isArray(raw) ? raw : [raw];
          const matches = tags.filter((t) => ans.value.includes(t)).length;
          agreement = matches / ans.value.length;
        }
        if (agreement != null) {
          personalBy[c.id].num += agreement;
          personalBy[c.id].den += 1;
          personalBy[c.id].used += 1;
        }
      }
    }

    const ranking = dataset.candidates
      .map((c) => {
        const p = policyBy[c.id];
        const f = personalBy[c.id];
        const policy_pct = p.den > 0 ? Math.round((p.num / p.den) * 100) : null;
        const personal_pct = f.den > 0 ? Math.round((f.num / f.den) * 100) : null;
        const details = detailsBy[c.id];
        // Weight by importance_weight when ranking agreements/disagreements,
        // so high-importance issues bubble up regardless of agreement size.
        const byImpAgree = [...details].sort((a, b) => (b.importance_weight * b.agreement) - (a.importance_weight * a.agreement));
        const byImpDisagree = [...details].sort((a, b) => (b.importance_weight * (1 - b.agreement)) - (a.importance_weight * (1 - a.agreement)));
        return {
          candidate_id: c.id,
          candidate_name: c.name,
          party: c.party,
          bio_short: c.bio_short,
          policy_match_pct: policy_pct,
          policy_questions_scored: p.used,
          personal_fit_pct: personal_pct,
          personal_dimensions_scored: f.used,
          top_agreements: byImpAgree.slice(0, 3),
          top_disagreements: byImpDisagree.slice(0, 3),
        };
      })
      .sort((a, b) => (b.policy_match_pct ?? -1) - (a.policy_match_pct ?? -1));

    return textContent({
      snapshot_date: dataset.snapshot_date,
      dataset_version: dataset.version,
      policy_answers_used: policy_answers.length - skipped_issues.length,
      personal_fit_answers_used: (personal_fit_answers ?? []).length - skipped_dimensions.length,
      skipped_issues,
      skipped_dimensions,
      ranking,
      scoring_notes: [
        "policy_match_pct and personal_fit_pct are scored independently and never blended (project design rule).",
        "Importance weights: low=0.5, medium=1.0, high=2.0 (matches the web quiz).",
        "Multi-select scoring: agreement = (candidate tags that match user picks) / (user picks count).",
        "Unknown candidate positions ('insufficient_data') are skipped — they do not count for or against the candidate.",
      ],
    });
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);

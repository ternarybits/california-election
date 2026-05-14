# MCP server spike

stdio MCP server that exposes the California 2026 candidate dataset to Claude, ChatGPT, Cursor — any MCP-speaking client.

## Tools

| Tool | Returns |
|---|---|
| `list_candidates` | Roster summary (id, name, party, bio_short). |
| `list_issues` | Issue list with stance scales. |
| `get_positions(issue_id)` | Every candidate's stance on one issue with source citation. |
| `list_personal_fit_dimensions` | Non-policy axes (career, demographic, geographic, age, endorsement coalition, etc.). |
| `get_candidate_bio(candidate_id)` | Bio + personal_attributes for one candidate. |
| `get_differentiating_questions(top_n?)` | Issues ranked by differentiation score — the questions where candidates actually differ. Default top 15 (the default web quiz); max 24 (all issues). |
| `score_user_positions(policy_answers, personal_fit_answers?)` | Rank candidates against the user's stances. Returns **two separate scores** per candidate (policy match % and personal fit %, never blended) plus the top 3 agreements and disagreements per candidate, weighted by user importance, with verbatim source quotes — so the agent can explain *why* each candidate matched. |

Smoke test (covers both new tools end-to-end via the stdio transport):

```bash
cd mcp && node test_tools.mjs
```

## Install

```bash
cd mcp
npm install
```

## Try it locally

```bash
npm run inspect   # opens the MCP Inspector against this server
```

## Wire into Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "california-election": {
      "command": "node",
      "args": ["/Users/ted/dev/california-election/mcp/src/index.js"]
    }
  }
}
```

Restart Claude Desktop, then try:

> *Use the california-election tools to walk me through the issues and find the candidate who'd best match someone who prioritizes housing supply above all else.*

The dataset is `dataset_v1.json` — first complete research pass, 184 of 192 candidate-issue positions cited from primary sources, 8 honest "unknown" entries where the candidate has not publicly addressed the issue.

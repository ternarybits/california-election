# California 2026 Candidate Matcher — MCP server

A stdio MCP server that exposes the open-sourced candidate × issue dataset to any MCP-speaking agent (Claude Desktop, Cursor, and others). Lets the agent drive an open-ended "deliberation mode" matching conversation in plain English, then return a sourced recommendation.

## Tools

| Tool | Returns |
|---|---|
| `list_candidates` | Roster summary (id, name, party, bio_short). Call this first to learn IDs. |
| `list_issues` | All 24 policy issues with stance scales. |
| `get_positions(issue_id)` | Every candidate's stance on one issue with source citation. `confidence: "insufficient_data"` marks honest unknowns. |
| `list_personal_fit_dimensions` | Non-policy axes (career, demographic, geographic, age, endorsement coalition, etc.). |
| `get_candidate_bio(candidate_id)` | Bio + personal attributes for one candidate. |
| `get_differentiating_questions(top_n?)` | Issues ranked by differentiation score — the questions where candidates actually differ. Default top 15 (the default web quiz); max 24 (all issues). Start here if you want the agent to focus on what's decisive. |
| `score_user_positions(policy_answers, personal_fit_answers?)` | Rank candidates against the user's stances. Returns **two separate scores** per candidate (policy match % and personal fit %, never blended) plus the top 3 agreements and disagreements per candidate, weighted by user importance, with verbatim source quotes — so the agent can explain *why* each candidate matched. |

## Install (one-time)

```bash
cd mcp
npm install
```

Smoke test (covers all 7 tools end-to-end via the stdio transport):

```bash
node test_tools.mjs
```

Local inspector:

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
      "args": ["/ABSOLUTE/PATH/TO/california-election/mcp/src/index.js"]
    }
  }
}
```

Replace the path, then restart Claude Desktop.

## Wire into Cursor

Cursor reads MCP config from `~/.cursor/mcp.json` (or your project's `.cursor/mcp.json` for a per-repo setup). Same shape:

```json
{
  "mcpServers": {
    "california-election": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/california-election/mcp/src/index.js"]
    }
  }
}
```

## Wire into ChatGPT

ChatGPT's MCP currently expects an HTTP/SSE endpoint, not stdio. v1 of this project doesn't ship an HTTP transport — track [`#issues`](https://github.com/ternarybits/california-election/issues) if you want it. Workaround: use Claude Desktop or Cursor in the meantime.

## Sample prompts to try

Once the server is wired up, try these to test the agent + tools end-to-end:

1. **Quick recommendation** — `Use the california-election tools to find which 2026 CA gubernatorial candidate would best match a voter who prioritizes housing supply and public transit, leans pragmatic on public safety, and wants someone who's held statewide office. Cite primary sources.`

2. **Deliberation conversation** — `Walk me through the top 5 differentiating issues in the California 2026 governor's race one at a time. Ask me my stance and importance on each. After 5, score me against every candidate and show me my top 3 with the agreements/disagreements that made the difference.`

3. **Investigative read** — `What do the California 2026 gubernatorial candidates say about Proposition 13? Use the matcher dataset to summarize their positions with source quotes. Flag any "unknown" entries — those are candidates who have not publicly addressed it.`

4. **Issue-spread analysis** — `Show me the 3 policy issues in this race where the candidates are most uniformly aligned, and the 3 where they're most split. Use get_differentiating_questions to rank them.`

5. **Personal-fit comparison** — `I prefer candidates who are political outsiders (low years in office), come from labor/environmental coalitions, and are willing to fight rather than negotiate. Score the 2026 CA governor field on personal fit for me using list_personal_fit_dimensions and score_user_positions.`

## Dataset

Backing dataset is [`dataset/dataset_v1.json`](../dataset/dataset_v1.json) — first complete research pass, 184 of 192 candidate-issue positions cited from primary sources, 8 honest "unknown" entries where the candidate has not publicly addressed the issue (`confidence: "insufficient_data"`). Corrections welcome via PR or via the in-app flag button on the web quiz.

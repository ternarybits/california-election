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

`get_differentiating_questions` and `score_user_positions` are the next additions — they'll let the agent drive a deliberation conversation end to end, not just retrieve data.

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

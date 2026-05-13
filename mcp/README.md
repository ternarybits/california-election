# MCP server spike

stdio MCP server that exposes the California 2026 candidate dataset to Claude, ChatGPT, Cursor — any MCP-speaking client.

## Tools (v0)

| Tool | Returns |
|---|---|
| `list_candidates` | Roster summary (id, name, party, bio_short). |
| `list_issues` | Issue list with stance scales. |
| `get_positions(issue_id)` | Every candidate's stance on one issue with source citation. |

The full v1 toolset (`get_candidate`, `get_differentiating_questions`, `score_user_positions`) lands with `dataset_v1.json`.

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

(With the v0 scaffold, the agent will discover that all stances are `unknown` — which is the correct, honest signal that the dataset hasn't been researched yet.)

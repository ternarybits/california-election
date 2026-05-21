# CLAUDE.md — project context for AI assistants

This file orients a fresh Claude Code (or other AI) session. Read it first, then [`PLAN.md`](./PLAN.md) for the full design.

## What this is

A shareable web experience that helps Californians find the 2026 gubernatorial candidate they best align with — and *why*. Three modalities over one shared, openly-published dataset:

1. **Quick Quiz** — Cloudflare-Worker-hosted multiple-choice web app (~3 min, ranked results, share card)
2. **MCP Server** — Claude / ChatGPT / Cursor call our tools to drive a conversational matching experience using cited candidate/issue data
3. **Open dataset** — versioned JSON in this repo; every candidate position has a primary-source citation

The unifying claim: **every quiz question is one where the candidates *actually* differ.** Generic "do you support good things?" questions are banned by construction.

Target launch: **before the June 2026 California primary.**

## Current state (2026-05-21)

- ✅ Plan written (`PLAN.md`), updated for the Cloudflare pivot
- ✅ Repo public at `ternarybits/california-election`
- ✅ **Live** at <https://california-election.tedmao.workers.dev> (Cloudflare Workers + D1)
- ✅ **Phase 0 complete** — `dataset/dataset_v1.json` (8 candidates × 25 issues = 200 positions, 190 cited, 10 honest "unknown"s, ranked by differentiation; `tax_top_wealth` later split into `tax_top` + `tax_wealth`)
- ✅ **Phase 1 shipped** — Cloudflare Worker + D1; two-phase quiz, dual scoring, importance slider, back-nav, voter-guide context, "see why" receipts + flag button, share-link encoding, analytics events, mobile pass, landing FAQ
- ✅ **Phase 2 largely done** — MCP server, 7 tools, stdio, tuned descriptions + sample prompts + Claude Desktop/Cursor install docs (`mcp/test_tools.mjs`). ChatGPT SSE deferred.
- 🟡 **Phase 3 mostly shipped** — why-not, what-if, SVG share card, public `/stats`, Playwright suite (`infra/tests/`). Remaining: launch posts (drafted in `press/`), custom domain
- ✅ **Buildy spike** archived to `legacy/buildy/` after it outgrew Buildy's size limits

## Resolved decisions

Don't re-litigate these unless the user explicitly raises them. All are two-way doors unless noted.

| # | Decision | Resolution |
|---|---|---|
| 1 | Deliberation Mode hosting | **MCP-only.** No standalone hosted chat UI in v1. User brings their own Claude/ChatGPT/Cursor. Zero AI cost on our side. |
| 2 | Candidate count | **~8, threshold-driven.** Criterion: ≥2% in a credible recent poll OR ≥$1M raised OR holds/held major office. Tune polling threshold if the field comes in too wide/narrow. |
| 3 | Importance slider | **Per-question, visible inline, defaulted to medium.** |
| 4 | AI cost | **N/A** (resolved by #1). |
| 5 | Endorsements / donors | **Endorsements yes (dated), donors no.** Donor data deferred to v2. |
| 6 | Corrections workflow | **GitHub PRs + in-app flag button**, both feeding the same GitHub issue list. |
| 7 | Domain | **`*.workers.dev` URL only for v1.** Custom domain only if traction warrants it post-launch. |
| 8 | Analytics | **Yes, anonymized, with a public stats page** (Phase 3 deliverable). |
| 9 | Quiz hosting | **Cloudflare Workers + D1.** Replaced Buildy after the inlined-dataset app exceeded Buildy's size limits. |

## Architecture in one diagram

```
[ versioned dataset JSON ]   ← single source of truth, openly published
        |
   +----+--------+
   v             v
[ Cloudflare Worker ]   [ MCP server (stdio) ]
  - UI (static)              |
  - /api/* endpoints         v
  - D1 (flags/events)  Claude / Cursor / (future) ChatGPT
```

## Cloudflare runtime notes

- Workers free tier: 100k req/day, 1 MB compressed script size, unlimited bandwidth.
- D1 free tier: 5 GB storage, 5M reads/day, 100k writes/day, no expiration.
- WinterTC API surface — `Request`, `Response`, `crypto.subtle`, streams, `setTimeout`. Same surface our Buildy module used.
- Deploy via `wrangler deploy` from `infra/`. D1 provisioning: `wrangler d1 create california-election` once, paste database_id into `wrangler.toml`, then `wrangler d1 execute california-election --file=schema.sql`.
- Login (`wrangler login`) is interactive — Claude can prep the deploy but the user runs the final command.

## Key files

- [`PLAN.md`](./PLAN.md) — full design document; status snapshot near the top
- [`README.md`](./README.md) — short public-facing description
- [`dataset/dataset_v1.json`](./dataset/dataset_v1.json) — current dataset; 200 candidate-issue positions with citations
- `infra/` — **the live app**: Cloudflare Worker (`src/worker.js`) + static UI (`public/`) + D1 schema + Playwright tests (`tests/`). Deploy with `cd infra && npm run deploy`. See `infra/README.md`.
- `mcp/` — stdio MCP server with 7 tools. Smoke test: `cd mcp && node test_tools.mjs`.
- `legacy/buildy/` — archived original Buildy spike (outgrew Buildy's size cap on deploy).
- `scripts/` — `score_questions.mjs` (recompute differentiation + ranking), `merge_research.mjs` / `merge_voter_guides.mjs` (merge research scratch files), `split_tax_issue.mjs` (the tax-split migration), `test_quiz.mjs` (quiz scoring smoke test)

## Working style preferences

Distilled from the planning conversation:

- **Make reasonable calls and continue.** The user explicitly said "work without stopping for clarifying questions" — default to executing, flag decision points inline, let them redirect.
- **Be creative.** The user wants something genuinely interesting to share, not a clone of iSideWith. Differentiated angles include MCP integration, why-not analysis, public stats page.
- **No yak-shaving Gumnut ceremony.** This is a personal project, not Gumnut work. No Linear issues, no design-doc-in-`docs/design-docs/`, no PRs unless explicitly requested. PLAN.md at the repo root is the design doc.
- **Receipts and credibility matter.** Civic-tech tools rise or fall on trust. Never trust an LLM summary of a candidate position without source verification — set `"unknown"` rather than fabricate.
- **Use `git -C <path>`** for git ops on a different repo (per the user's global preferences).

## User context

- GitHub: `ternarybits`
- Repo: `ternarybits/california-election` (public)
- File last updated: 2026-05-21

# California 2026 Gubernatorial Candidate Matcher

A shareable web experience that helps Californians discover which candidate in the **June 2, 2026 gubernatorial primary** best aligns with their values — and *why*. Open dataset, cited sources, three modalities (web quiz, MCP server, AI-mediated deliberation).

**Status:** Live at **<https://california-election.tedmao.workers.dev>** (Cloudflare Workers + D1). See [`PLAN.md`](./PLAN.md) for the design document.

| Surface | Path | Status |
|---|---|---|
| Open dataset (v1) | [`dataset/dataset_v1.json`](./dataset/dataset_v1.json) | 8 candidates × 25 issues = 200 positions, 190 cited from primary sources (10 honest unknowns); questions ranked by differentiation score |
| Web quiz (Cloudflare) | [`infra/`](./infra/) | Live at <https://california-election.tedmao.workers.dev> — Worker + static assets + D1. Update with `cd infra && npm run deploy` (see [`infra/README.md`](./infra/README.md)) |
| MCP server (stdio) | [`mcp/`](./mcp/) | 7 tools, smoke test passes. Install instructions for Claude Desktop and Cursor in [`mcp/README.md`](./mcp/README.md) |
| Launch materials | [`press/`](./press/) | Draft thread + Substack note; tighten on launch day |
| Legacy Buildy spike | [`legacy/buildy/`](./legacy/buildy/) | Original platform; archived after deployed app outgrew Buildy's size limits |

## Modalities

1. **Quick Quiz** — multiple-choice web app. ~3 minutes, ranked results with receipts (per-position source quotes and URLs). Questions and options are written in plain language for the average voter. Each question carries an always-shown "Background & arguments" block — current CA policy, key facts, steelmanned arguments for/against, and sources — with bill and proposition names rendered as inline links to the bill text, plus a "The basics" explainer where a term needs defining (charter schools, single-payer, the Prop 13 cap, etc.). The landing page has a methodology FAQ. Results include a why-not runner-up panel, a what-if explorer, a per-position **⚑ flag this** button (the top match's "see why" opens by default), and a share link that encodes answers in the URL hash (no server state). A public [`/stats`](https://california-election.tedmao.workers.dev/stats) page shows anonymized aggregates.
2. **MCP Server** — exposes the candidate/issue knowledge base to Claude, Cursor (and ChatGPT, once SSE transport ships). Lets power users drive a conversational matching experience in their own agent. Sample prompts in `mcp/README.md`.
3. **Open dataset** — every candidate position is sourced and citable. PRs and in-app corrections welcome.

## Principles

- **Differentiation-first.** Every question we ask is one where the candidates actually differ. Issues are ranked by a differentiation score; the default quiz is the top 13.
- **Receipts on everything.** Primary-source links and verbatim quotes on every position; bills linked to their text.
- **One axis per real dimension.** Multi-dimensional topics are split into separate ordinal questions (e.g. income/corporate rates vs. a wealth tax) rather than force-fit onto one scale.
- **Two scores, never blended.** Policy match and personal fit shown separately.
- **Plain language, full context.** Questions read for an average voter; the background and both-sides arguments are shown by default, not hidden behind a toggle.
- **Transparent math.** No embeddings, no LLM ranking — auditable importance-weighted ordinal agreement. Hand-verifiable.
- **Open and correctable.** Dataset is public; corrections via PR or in-app flag button. When a candidate hasn't taken a public position, we mark it "unknown" rather than guess.

## Target

Live ahead of the **June 2, 2026 California gubernatorial primary**.

## Quick start (local)

```bash
# Smoke-test the Worker against stubbed D1 + ASSETS
node infra/test_worker.mjs

# Smoke-test the MCP server end-to-end
cd mcp && npm install && node test_tools.mjs

# Persona QA — runs the quiz scoring against progressive + conservative personas
node scripts/test_quiz.mjs

# End-to-end browser tests (Playwright) against the live deploy
cd infra && npm install --ignore-scripts && npm run test:install && npm test
```

## Deploy to production

See [`infra/README.md`](./infra/README.md) for the wrangler login → D1 provision → deploy flow.

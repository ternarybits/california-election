# California 2026 Gubernatorial Candidate Matcher

A shareable web experience that helps Californians discover which 2026 gubernatorial candidate best aligns with their values — and *why*. Open dataset, cited sources, three modalities (web quiz, MCP server, AI-mediated deliberation).

**Status:** Phase 1–3 code complete; awaiting first Cloudflare deploy. See [`PLAN.md`](./PLAN.md) for the design document.

| Surface | Path | Status |
|---|---|---|
| Open dataset (v1) | [`dataset/dataset_v1.json`](./dataset/dataset_v1.json) | 8 candidates × 24 issues = 192 positions, 184 cited from primary sources (8 honest unknowns); questions ranked by differentiation score |
| Web quiz (Cloudflare) | [`infra/`](./infra/) | Worker + Pages-style static + D1; deploy with `cd infra && npm install && npx wrangler login && npm run deploy` (see [`infra/README.md`](./infra/README.md)) |
| MCP server (stdio) | [`mcp/`](./mcp/) | 7 tools, smoke test passes. Install instructions for Claude Desktop and Cursor in [`mcp/README.md`](./mcp/README.md) |
| Launch materials | [`press/`](./press/) | Draft thread + Substack note; tighten on launch day |
| Legacy Buildy spike | [`legacy/buildy/`](./legacy/buildy/) | Original platform; archived after deployed app outgrew Buildy's size limits |

## Modalities

1. **Quick Quiz** — multiple-choice web app. ~3 minutes, ranked results with receipts (per-position source quotes and URLs), shareable via URL hash (no server state). Why-not panel; what-if explorer; per-position flag button.
2. **MCP Server** — exposes the candidate/issue knowledge base to Claude, Cursor (and ChatGPT, once SSE transport ships). Lets power users drive a conversational matching experience in their own agent. Sample prompts in `mcp/README.md`.
3. **Open dataset** — every candidate position is sourced and citable. PRs and in-app corrections welcome.

## Principles

- **Differentiation-first.** Every question we ask is one where the candidates actually differ.
- **Receipts on everything.** Primary-source links and verbatim quotes on every position.
- **Two scores, never blended.** Policy match and personal fit shown separately.
- **Transparent math.** No embeddings, no LLM ranking — auditable importance-weighted ordinal agreement. Hand-verifiable.
- **Open and correctable.** Dataset is public; corrections via PR or in-app flag button.

## Target

Live ahead of the **June 2026 California primary**.

## Quick start (local)

```bash
# Smoke-test the Worker against stubbed D1 + ASSETS
node infra/test_worker.mjs

# Smoke-test the MCP server end-to-end
cd mcp && npm install && node test_tools.mjs

# Persona QA — runs the quiz scoring against progressive + conservative personas
node scripts/test_quiz.mjs
```

## Deploy to production

See [`infra/README.md`](./infra/README.md) for the wrangler login → D1 provision → deploy flow.

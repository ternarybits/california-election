# California 2026 Gubernatorial Candidate Matcher

A shareable web experience that helps Californians discover which 2026 gubernatorial candidate best aligns with their values — and just as importantly, *why*. Open dataset, cited sources, three modalities (web quiz, MCP server, AI-mediated deliberation).

**Status:** Phase 0 scaffolding. See [`PLAN.md`](./PLAN.md) for the design document.

| Surface | Path | Status |
|---|---|---|
| Open dataset (v0) | [`dataset/dataset_v0.json`](./dataset/dataset_v0.json) | 8 candidates × 24 issues = 192 positions, 184 researched with primary-source quotes (8 honest unknowns); questions ranked by differentiation score |
| Buildy quiz spike | [`buildy/`](./buildy/) | code written; deploy with `node buildy/deploy.mjs` |
| MCP server spike | [`mcp/`](./mcp/) | working stdio server, 5 tools (list_candidates / list_issues / get_positions / list_personal_fit_dimensions / get_candidate_bio); `cd mcp && npm install && npm start` |

## Modalities

1. **Quick Quiz** — multiple-choice web app hosted on Buildy. ~3 minutes, ranked results with receipts, shareable.
2. **MCP Server** — exposes the candidate/issue knowledge base to Claude, ChatGPT, Cursor. Lets power users drive a deliberation conversation in their own agent.
3. **Open dataset** — every candidate position is sourced and citable. PRs and in-app corrections welcome.

## Principles

- **Differentiation-first.** Every question we ask is one where the candidates actually differ.
- **Receipts on everything.** Primary-source links on every position.
- **Transparent math.** No embeddings, no LLM ranking — auditable importance-weighted ordinal agreement.
- **Open and correctable.** Dataset is public; corrections via PR or in-app flag button.

## Target

Live ahead of the **June 2026 California primary**.

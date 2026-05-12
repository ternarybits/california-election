# California 2026 Gubernatorial Candidate Matcher

A shareable web experience that helps Californians discover which 2026 gubernatorial candidate best aligns with their values — and just as importantly, *why*. Open dataset, cited sources, three modalities (web quiz, MCP server, AI-mediated deliberation).

**Status:** planning. See [`PLAN.md`](./PLAN.md) for the design document.

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

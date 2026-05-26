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

## What is this?

A non-partisan way to find which candidate in California's June 2026 governor primary you actually line up with — and exactly why. A few things set it apart from the usual candidate quiz:

- **Only questions where the candidates actually differ.** No "do you support good schools?" filler — every question is one the field is genuinely split on, chosen by spread.
- **You can keep asking.** From any question you can hand the topic to ChatGPT or Claude — pre-loaded with that topic's sourced guide — to go deeper. It also works in agentic browsers like [Dia](https://www.diabrowser.com/), or copy the prompt into any AI agent.
- **An AI-researched, fully-cited dataset.** Every candidate position was researched and assembled by AI from primary sources — not hand-curated by a research team — and each one links to a dated quote you can open and check yourself.

AI runs through both the *making* of this and the product itself. The first version was built at an AI hack-day at [The General Partnership](https://thegp.com), then cleaned up for sharing.

## How it works

- **~20 questions, all skippable** — 13 policy questions (the highest-differentiation issues) plus a short personal-fit round (7 dimensions). Skip any you'd rather not answer.
- **Per-question importance slider**, defaulted to medium, so you can just answer.
- **Two separate scores per candidate** — policy match and personal fit — shown side by side, never blended into one number.
- **Receipts on the results** — every match links to the candidate's position with a verbatim primary-source quote; flag anything that looks wrong.
- **Transparent scoring** — importance-weighted ordinal agreement, no embeddings or black-box ranking. Your answers stay in your browser; your share link encodes them in the URL, not on a server.

## Modalities

1. **Quick Quiz** — the multiple-choice web app described above. Plain-language questions and options, each with an always-shown "Background & arguments" block (current CA policy, key facts, steelmanned both-sides arguments, sources, and a "The basics" explainer where a term needs defining), bill/proposition names linked to their text, and a per-question "ask an AI" hand-off. Results add a why-not runner-up panel, a what-if explorer, a per-position **⚑ flag this** button, light/dark themes, and a share link. A public [`/stats`](https://california-election.tedmao.workers.dev/stats) page shows anonymized aggregates.
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

## Changelog

- **2026-05-26** — Trimmed the quiz to the 13 highest-differentiation policy questions and 7 personal-fit dimensions (both derived from the dataset via `scripts/score_questions.mjs` / `scripts/score_personal_fit.mjs`); added per-question "ask ChatGPT / Claude / Dia" hand-offs and content-only `/topic/:id` pages; progress bar + question transitions; editorial typography (Newsreader headings + Inter body); light/dark theme toggle; intro share button; ntfy completion pings (no PII); and renamed the analytics endpoint to `/api/tally` so content blockers stop dropping it.
- **2026-05-21** — Dataset **v1** (8 candidates × 25 issues, 190 cited from primary sources); launched on Cloudflare Workers + D1; MCP server (7 tools); why-not / what-if / SVG share card / public stats page; Playwright suite. Ported off the Buildy spike (archived in `legacy/buildy/`) after the inlined dataset exceeded its size cap.

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

# CLAUDE.md — project context for AI assistants

This file orients a fresh Claude Code (or other AI) session. Read it first, then [`PLAN.md`](./PLAN.md) for the full design.

## What this is

A shareable web experience that helps Californians find the 2026 gubernatorial candidate they best align with — and *why*. Three modalities over one shared, openly-published dataset:

1. **Quick Quiz** — Buildy-hosted multiple-choice web app (~3 min, ranked results, share card)
2. **MCP Server** — Claude / ChatGPT / Cursor call our tools to drive a conversational matching experience using cited candidate/issue data
3. **Open dataset** — versioned JSON in this repo; every candidate position has a primary-source citation

The unifying claim: **every quiz question is one where the candidates *actually* differ.** Generic "do you support good things?" questions are banned by construction.

Target launch: **before the June 2026 California primary.**

## Current state (2026-05-12)

- ✅ Plan written (`PLAN.md`)
- ✅ Repo created (public, `ternarybits/california-election`)
- ⏳ No code yet
- ⏳ No dataset yet
- ⏳ Buildy and MCP "hello world" spikes not yet run

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
| 7 | Domain | **Buildy URL only for v1.** No custom domain. |
| 8 | Analytics | **Yes, anonymized, with a public stats page** (Phase 3 deliverable). |

## Architecture in one diagram

```
[ versioned dataset JSON ]   ← single source of truth, openly published
        |
   +----+--------+----------+
   v             v          v
[ Buildy quiz ] [ MCP server ] [ (v2) standalone chat UI? ]
                     |
                     v
              Claude / ChatGPT / Cursor
              (user's own agent)
```

## Critical platform constraint: Buildy has no outbound HTTP

This is the single most important thing for a new session to know.

- Buildy backend modules **cannot fetch external URLs.**
- Buildy UI iframe runs under `connect-src 'self'` — **cannot call third-party APIs either.**
- Buildy UI is **vanilla JS + Tailwind, no React/Vue/Svelte.** Inline small UMD libs only.
- Available runtime: Workers/WinterTC shape (`Request`, `Response`, `crypto.subtle`, `crypto.randomUUID`, streams, `setTimeout`). `env.storage` (KV, 10MB cap) and `env.log` if imported.
- Auth model: `bld_app_*` tokens (per-app, 7-day expiry if unclaimed). Auto-pairing supported via `pair: true` in the create call.
- Deploy: `POST https://app.buildy.so/app { module, ui, styles }` → returns `{ id, url, token }`. **Save the token immediately — it's irrecoverable.**
- Reference: `https://buildy.so/llms-full.txt`

Implications:
- The quiz works great on Buildy (static data + scoring).
- The MCP server should probably live on a Cloudflare Worker (or similar) with the dataset bundled or fetched from a public URL — Buildy can't serve it cleanly because MCP transport needs flexibility Buildy doesn't currently expose, and the dataset is published openly anyway.
- Any LLM-driven feature **must** happen in the user's own agent (via MCP), not inside Buildy.

## Recommended next steps

In rough priority order. #1 and #2 are independent and can run in parallel.

1. **Buildy hello-world spike** — POST a tiny ES module + UI to `/app`, verify deploy/storage/Tailwind work end-to-end. Goal: de-risk the platform with ~1 hour of effort.
2. **MCP hello-world spike** — one tool returning one issue, wired into Claude Desktop end-to-end. De-risks the second platform.
3. **Phase 0 research kickoff** — voter-priority research (PPIC, Berkeley IGS, recent journalism) and candidate roster lockdown against the threshold criteria. Produces `dataset_v0.json`.
4. After both spikes pass: start `dataset_v1.json` (full candidate × issue matrix with citations, two-pass verified).

## Working style preferences

Distilled from the planning conversation:

- **Make reasonable calls and continue.** The user explicitly said "work without stopping for clarifying questions" — default to executing, flag decision points inline, let them redirect. Exception: when the user explicitly says "let's walk through X," ask one question at a time with concrete options (`AskUserQuestion`).
- **Be creative.** The user wants something genuinely interesting to share, not a clone of iSideWith. Look for differentiated angles (MCP integration, why-not analysis, public stats page).
- **No yak-shaving Gumnut ceremony.** This is a personal project, not Gumnut work. No Linear issues, no Gumnut-style design-doc-in-`docs/design-docs/`, no PRs unless explicitly requested. PLAN.md at the repo root is the design doc.
- **Receipts and credibility matter.** Civic-tech tools rise or fall on trust. Never trust an LLM summary of a candidate position without source verification.
- **Use `git -C <path>`** for git ops on a different repo (per the user's global preferences).

## Key files

- [`PLAN.md`](./PLAN.md) — full design document
- [`README.md`](./README.md) — short public-facing description
- `dataset_vN.json` (future) — versioned candidate × issue dataset
- `buildy/` (future) — Buildy app source (manifest, module, UI)
- `mcp/` (future) — MCP server source
- `data-pipeline/` (future) — research / position elicitation tooling

## User context (for the AI's benefit)

- GitHub: `ternarybits`
- Repo: `ternarybits/california-election` (public)
- Date this file was written: 2026-05-12

# CLAUDE.md — project context for AI assistants

This file orients a fresh Claude Code (or other AI) session. Read it first, then [`PLAN.md`](./PLAN.md) for the full design.

## What this is

A shareable web experience that helps Californians find the 2026 gubernatorial candidate they best align with — and *why*. Three modalities over one shared, openly-published dataset:

1. **Quick Quiz** — Cloudflare-Worker-hosted multiple-choice web app (~3 min, ranked results, share card)
2. **MCP Server** — Claude / ChatGPT / Cursor call our tools to drive a conversational matching experience using cited candidate/issue data
3. **Open dataset** — versioned JSON in this repo; every candidate position has a primary-source citation

The unifying claim: **every quiz question is one where the candidates *actually* differ.** Generic "do you support good things?" questions are banned by construction.

Target launch: **before the June 2026 California primary.**

## Current state (2026-05-26)

- ✅ Plan written (`PLAN.md`), updated for the Cloudflare pivot
- ✅ Repo public at `ternarybits/california-election`
- ✅ **Live** at <https://california-election.tedmao.workers.dev> (Cloudflare Workers + D1)
- ✅ **Phase 0 complete** — `dataset/dataset_v1.json` (8 candidates × 25 issues = 200 positions, 190 cited, 10 honest "unknown"s, ranked by differentiation; `tax_top_wealth` later split into `tax_top` + `tax_wealth`)
- ✅ **Phase 1 shipped** — Cloudflare Worker + D1; two-phase quiz, dual scoring, importance slider, back-nav, voter-guide context, "see why" receipts + flag button, share-link encoding, analytics events, mobile pass, landing FAQ
- ✅ **Phase 2 largely done** — MCP server, 7 tools, stdio, tuned descriptions + sample prompts + Claude Desktop/Cursor install docs (`mcp/test_tools.mjs`). ChatGPT SSE deferred.
- 🟡 **Phase 3 mostly shipped** — why-not, what-if, SVG share card, public `/stats`, content-only `/topic/:id` pages, per-question "ask ChatGPT/Claude/Dia" hand-off, Playwright suite (`infra/tests/`). Remaining: launch posts (drafted in `press/`), custom domain
- ✅ **Buildy spike** archived to `legacy/buildy/` after it outgrew Buildy's size limits
- ✅ **Post-launch polish (2026-05-26)** — quiz trimmed to the **13** highest-differentiation policy questions + **7** personal-fit dimensions (flags computed by `score_questions.mjs` / `score_personal_fit.mjs`; the Worker filters on them); progress bar + question/results animations; editorial typography (Newsreader headings + Inter body, Google Fonts CDN); light/dark theme toggle; intro share button; ntfy completion notification (no PII, via `NTFY_TOPIC` secret); `/api/stats` is `no-store`. **Analytics endpoint is `/api/tally`, not `/api/event`** — the latter is Plausible's signature and was being dropped by content blockers; don't rename it back.
- ✅ **Localization (2026-05-26; Traditional Chinese added 2026-05-29)** — the app is translated into **en, es, zh (Simplified Chinese), zh-Hant (Traditional Chinese), vi, tl, ko** (California's largest language communities), covering **both the UI chrome and the dataset display content**. The `zh-Hant` content is *derived from* the Simplified `zh` content by `scripts/gen_zh_hant.mjs` (OpenCC, cn→tw, character-level) — `zh` stays the source of truth; re-run the script when the Simplified strings change. A header `#lang-select` switches language. Language resolution order (in `i18n.js`): an explicit `?locale=` (or `?lang=`) URL param wins and is persisted — so a shared `https://…/?locale=zh-CN` link opens in that language — then a previously stored `localStorage` choice, then the browser locale when supported, then English. `normalize()` maps any BCP-47 tag to one of the seven internal codes by primary subtag — **Chinese splits by *script***: `zh-Hant`/`zh-TW`/`zh-HK`/`zh-MO` → `zh-Hant` (Traditional), every other `zh*` (`zh-CN`/`zh-Hans`/bare `zh`) → `zh` (Simplified); `fil` → `tl` — tolerating both hyphen and underscore region separators (`es-MX` and `es_MX`) and bare codes (`es`). **What we *emit* is a full BCP-47 locale, not a bare language code** — `I18N_LOCALES`/`localeTag()` maps each internal code to a US-region locale (`en→en-US`, `es→es-US`, `vi→vi-US`, `tl→tl-US`, `ko→ko-US`), since every reader is US-based (a California election) — the region tags the *audience*, not the language's country of origin. **Chinese is the exception, tagged by script not audience:** `zh→zh-CN` (Simplified) and `zh-Hant→zh-TW` (Traditional), so the locale carries the script signal (`zh-US` would be ambiguous — US Chinese readers split between the two scripts). The region is otherwise purely a label (read-side `normalize()` discards it; only the Chinese script survives). **Deliberate choices propagate to shareable links:** when the language is set explicitly (via the selector, a `?locale=` link, or a stored prior choice — tracked by an `explicit` flag), `i18n.js` rewrites the address bar to `?locale=<full locale>` (`history.replaceState`, preserving path + `#r=` result hash) and `I18N.shareLocale()` returns that full locale; `app.js`'s `withLocale()` then pins `?locale=` onto the quiz share link (`quizShareUrl`) and the full-result link (`makeShareUrl`). The selector rewrites via `setLang→syncUrl`; link/stored arrivals are canonicalized once **on load** (`syncUrl(lang)` runs at script-eval time when `explicit`), so a bare/region-variant `?locale=`, a legacy `?lang=`, or a no-param stored choice all become `?locale=<full locale>`. Auto-detected/default-English visitors get locale-less links so each recipient auto-detects. (The server-rendered share-card SVG/OG at `/api/share-card.svg` stays English and carries no `?locale=`.) Two layers, both client-side static assets loaded in `<head>` before the `app.js` module:
  - **Chrome** — `infra/public/i18n.js`. Static markup carries `data-i18n` / `data-i18n-aria` / `data-i18n-placeholder`; `app.js` builds dynamic strings via `I18N.t(key, params)`. English is the source of truth (`TRANSLATIONS.en`); other languages are `TRANSLATIONS.<lang>` with the same keys (missing keys fall back to English).
  - **Dataset** — `infra/public/dataset_i18n.js` (`window.DATASET_I18N`). A per-language overlay supplies translated content in three keyed sections: `questions` (keyed by issue id — `name` / `short_description` / `stance_scale` labels / `voter_guide.*`: explainer, current_policy, arguments, key_facts, comparison, note_on_options), `dimensions` (keyed by dimension id — `name`/`description`/`scale`/`options`), and `candidates` (keyed by candidate id — `party` label + `bio_short` blurb). The English dataset (served by the Worker) stays the source of truth; `app.js`'s `localizeDataset()` merges the overlay onto it at render time (English fallback), producing `state.questions`/`state.dimensions`/`state.candidates`. **Citations are deliberately NOT translated** — verbatim `source_quote` and source `title`/`url` stay English so every position remains checkable against its primary source. **Candidate *names* are also NOT translated** (proper nouns — only `party` + `bio_short` carry an overlay, via `localizeCandidate()`). The intro carries a localized note about citations.
  - Switching language dispatches `i18n:change`; `app.js` re-runs `localizeDataset()` + re-renders the current view (results re-render rebuilds the ranking off the re-localized `state.candidates`).
  - **Not yet localized:** server-rendered pages (`/stats`, `/topic/:id`, share-card SVG/OG) and candidate names.
  - **Editing strings:** change English first (`TRANSLATIONS.en` for chrome, the dataset JSON for content), then update every language. Placeholders `{like_this}`, HTML tags, markdown-link URLs, numbers, and ballot/bill identifiers (Prop 13, AB 259, …) must be preserved verbatim in every language. **Don't hand-edit the `zh-Hant` blocks** (marked `generated by scripts/gen_zh_hant.mjs`) — edit Simplified `zh`, then re-run `node scripts/gen_zh_hant.mjs` to regenerate Traditional.

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
- `scripts/` — `score_questions.mjs` (rank policy issues by differentiation, flag the top-N `default_quiz`), `score_personal_fit.mjs` (same for personal-fit dimensions: std/2 for ordinal axes, mean pairwise Jaccard for multi-select), `merge_research.mjs` / `merge_voter_guides.mjs` (merge research scratch files), `split_tax_issue.mjs` (the tax-split migration), `test_quiz.mjs` (quiz scoring smoke test), `gen_zh_hant.mjs` (derive the Traditional Chinese `zh-Hant` translations from the Simplified `zh` ones via OpenCC — needs `cd scripts && npm install`)

## Working style preferences

Distilled from the planning conversation:

- **Make reasonable calls and continue.** The user explicitly said "work without stopping for clarifying questions" — default to executing, flag decision points inline, let them redirect.
- **Be creative.** The user wants something genuinely interesting to share, not a clone of iSideWith. Differentiated angles include MCP integration, why-not analysis, public stats page.
- **No yak-shaving Gumnut ceremony.** This is a personal project, not Gumnut work. No Linear issues, no design-doc-in-`docs/design-docs/`, no PRs unless explicitly requested. PLAN.md at the repo root is the design doc.
- **Receipts and credibility matter.** Civic-tech tools rise or fall on trust. Never trust an LLM summary of a candidate position without source verification — set `"unknown"` rather than fabricate.
- **Ground every ballot-proposal reference in verified facts.** Before writing/editing any voter-guide text, stance label, or context that names a ballot proposition or proposed/historic measure (AB 259, the 2026 "Billionaire Tax Act," Prop 13/15/19/36/47/4/98/2/38, Prop 1, …), verify that specific proposal's mechanism (one-time vs. annual, rates, thresholds), status, and sponsor against a primary/authoritative source and cite it. Don't conflate distinct proposals. (See `AGENTS.md`.)
- **Use `git -C <path>`** for git ops on a different repo (per the user's global preferences).

## User context

- GitHub: `ternarybits`
- Repo: `ternarybits/california-election` (public)
- File last updated: 2026-05-26

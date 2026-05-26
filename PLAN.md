---
title: California 2026 Gubernatorial Candidate Matcher
status: in-progress
created: 2026-05-12
last-updated: 2026-05-21
---

## Status snapshot (2026-05-21)

**Live at <https://california-election.tedmao.workers.dev>** (Cloudflare Workers + D1).

- **Phase 0 — Research & data**: ✅ Complete. `dataset_v1.json`: 8 candidates × 25 issues = 200 candidate-issue positions, 190 cited from primary sources, 10 honest `"unknown"` entries (`confidence: "insufficient_data"`). Issues ranked by differentiation score; top 13 flagged `default_quiz: true`. The original `tax_top_wealth` issue was later split into `tax_top` + `tax_wealth` (see "Multi-dimensional issue splits" below).
- **Phase 1 — Quiz MVP**: ✅ Shipped. Deployed on Cloudflare. Two-phase quiz (policy + personal-fit), dual scoring (policy / personal-fit, never blended), inline importance slider, back-navigation (scrolls to top), plain-language prompts/options, an always-shown "Background & arguments" block per question (current policy, key facts, both-sides arguments, sources, "The basics" explainers, and inline links from bill names to the bill text), "see why" receipts with source quotes + a per-position **⚑ flag this** button (top match opens by default), share-link encoding (answers in URL hash), anonymized analytics events (D1), mobile pass, and a landing-page methodology FAQ. The race is named explicitly throughout (June 2, 2026 gubernatorial primary).
- **Phase 2 — MCP server**: ✅ Largely complete. 7 tools (1 more than PLAN required), stdio transport, smoke test (`mcp/test_tools.mjs`). Tool descriptions tuned, sample prompts + Claude Desktop / Cursor install docs published. Remaining: HTTP/SSE transport for ChatGPT (deferred — small audience).
- **Phase 3 — Polish & launch**: 🟡 Most deliverables shipped. Done: why-not runner-up panel, what-if explorer, SVG share card, public stats page (D1-backed), voter-guide context on all 15 default questions, Playwright test suite. Remaining: launch posts (drafted in `press/`), custom-domain decision, optional per-result share-card image upgrade (SVG → PNG).

## Hosting pivot — Buildy → Cloudflare

After completing the Phase 1 code on the Buildy platform, the deployed app size exceeded Buildy's limits (inlined dataset + module + UI). PLAN.md decision #7 anticipated this risk; the dataset is portable JSON and the existing code is Workers-shaped, so the port is mostly cosmetic.

**New target stack:**

- **Cloudflare Workers** — API endpoints (former `buildy/module.js`)
- **Cloudflare Pages-style static assets** — UI + dataset JSON served from the same Worker (Workers Sites / Assets binding)
- **Cloudflare D1** — analytics events + correction flags (replaces Buildy KV)
- **MCP server** — stays stdio for v1; optional HTTP/SSE Worker deferred until ChatGPT demand surfaces

Free tier covers everything we need (100k req/day, 5GB D1, unlimited static bandwidth), with no time-limited DB cliff. Custom domain still deferred per decision #7 — launch on `*.workers.dev`.

The Buildy code is moved to `legacy/buildy/` rather than deleted; the deploy path was a working spike and may be useful if Buildy raises its limits later.

## Multi-dimensional issue splits (2026-05-21)

Per the design rule that each ordinal axis should represent one real policy dimension, we reviewed the issues that bundled two axes:

- **`tax_top_wealth` → split** into `tax_top` (income/corporate rate gradient) and `tax_wealth` (state wealth tax). This was the high-value split: re-scoring put `tax_wealth` at #1 differentiation (0.765) while `tax_top` fell to #23 (0.364). The field genuinely splits on a net-worth tax but not on raising the already-highest-in-US 13.3% income rate — the merged question had hidden that. `tax_wealth` is now in the default quiz; `tax_top` is not.
- **`housing_supply` → scale fixed, not split.** Relabeled to a monotonic "degree of state push for market-rate supply" axis so the previously off-axis option 5 (subsidies/tenant protections) sits coherently at the low-supply-push end. Kept as one question per the original "housing stays single" call.
- **`school_choice`, `school_funding`, `healthcare_funding` → wording tweaks only.** De-bundled labels (e.g. removed "(including vouchers)" from school_choice) where a sub-axis had near-zero differentiation in the actual field; not worth a separate question.
- **`homelessness` → left as-is.** Enforcement↔services is a genuine single recognized spectrum.

Several scales remain mildly multi-dimensional and carry a voter-facing `note_on_options` explaining the bundled axes (housing, school choice/funding, healthcare financing). Future splits are reversible if the field's differentiation warrants.

## Editorial & accessibility decisions (2026-05-21)

Decisions made while polishing the live quiz, in response to review feedback:

- **Plain language over precision-jargon.** Question prompts and answer options are written for an average voter, not a policy analyst — acronyms and bill shorthand are spelled out or dropped ("SB 54" → "the state's sanctuary law", "split-roll" → "tax at market value", "single-payer" defined inline). The underlying stance scales kept their meaning and order, so candidate codings were unchanged — these were label-only edits.
- **Context shown by default, not hidden.** The per-question "Background & arguments" block is always open (not a collapsible `<details>`). Rationale: everyone should read the context, so it shouldn't be one click away. The block carries a "The basics" explainer (what a charter school is, what single-payer means, how the Prop 13 cap works, etc.) before the policy detail.
- **Bills link to their text.** Voter-guide prose uses inline `[label](url)` links so every bill/proposition name is clickable to the actual bill text — verified leginfo / LAO URLs (70 links total). Rendered safely via a small markdown-link parser (`renderProse`, http(s)-only, escaped). Historical statutes predating California's online bill database (e.g. the 1989 Roberti-Roos Act, Prop 13) are left as plain text rather than linked to a fabricated URL.
- **Flag button surfaced.** The correction affordance lives per-position inside "see why you matched"; the top match's panel now opens by default and each cited position shows a "⚑ flag this" button, so the path the FAQ describes actually exists in front of the user.
- **Name the race.** Every surface states this is the June 2, 2026 gubernatorial primary, so no one mistakes it for the general election or a different office.
- **Scroll to top on navigation.** Because the always-open context makes question screens tall, every next/skip/back (and the phase/results transitions) resets scroll to the top.

Content pipeline for the above: research agents wrote per-issue prose into `dataset/research/vg_prose_*.json`; `scripts/merge_voter_guide_prose.mjs` field-patches it into the dataset, preserving `sources` and `note_on_options`. The tax split is reproduced by `scripts/split_tax_issue.mjs`. Differentiation ranking is recomputed by `scripts/score_questions.mjs`.

# California 2026 Gubernatorial Candidate Matcher

## Vision

A shareable web experience that helps a Californian discover which 2026 gubernatorial candidate best aligns with their values — and just as importantly, *why*. Not a horse-race poll, not a partisan endorsement engine: a credible, well-researched, fun-to-use tool that surfaces real policy differences and lets users explore them at the depth they want.

Three flavors of the same brain (shared data layer, three front doors):

1. **Quick Quiz** — 10–20 multiple-choice questions, instant ranked results, share card. The viral surface.
2. **Deliberation Mode** — open-ended, AI-mediated. User types in their own words; the AI clarifies, follows up, and produces a richer alignment map.
3. **MCP Server** — exposes the candidate/issue knowledge base to Claude and ChatGPT so power users can drive the whole experience from their preferred agent.

The unifying claim: **every question we ask is one where the candidates *actually* differ.** Generic "do you support good things?" questions are banned by construction.

---

## Why this is interesting (and not just another iSideWith)

- **Differentiation-first question design.** Questions are generated from the matrix of candidate positions, not from a pre-built issue taxonomy. If five candidates all agree on something, it's not a question — it's a footnote.
- **Receipts.** Every candidate position links to the primary source (campaign site, voting record, interview clip). Zero "the AI said so."
- **Confidence-weighted matching.** Some questions split the field 9-1, others 5-5. The matcher tells you not just *who* you match but *how confident* it is, and which questions were decisive for *your* result.
- **Why-not view.** "You matched Porter 84%. Here are the 2 questions where she fell short for you — and the candidate who'd have edged her on those." This is the part that makes people share.
- **Three modalities.** Most matchers are quizzes. We add a conversational mode and an MCP integration. Same data, three audiences.

---

## Scope

### In scope (v1)

- California 2026 gubernatorial primary race (top-two primary, June 2026)
- 6–10 candidates (criteria below)
- ~15–25 issue dimensions (e.g., housing supply, water policy, AI regulation, public safety, climate, CA-specific tax structure)
- Web quiz (multiple-choice) hosted on Buildy
- MCP server exposing issues/candidates/positions as tools
- AI-conversational mode (TBD: Buildy-hosted vs. driven from Claude/ChatGPT via the MCP)
- Source-cited candidate positions
- Share card (image or link) with results

### Explicitly out of scope (v1)

- Down-ballot races, propositions, federal races
- Live polling integration (we cite recent polls in research, we don't render them)
- Voter registration / GOTV
- Endorsements, predictions, "best" candidate framing
- Multi-language UI (English only for v1; flag Spanish for v2)
- Comments / user-generated content (moderation cost too high)
- Real-time updates to candidate positions (we version the dataset; users see the snapshot date)

> **Design decision — narrow candidate set over comprehensive.**
> Including obscure candidates dilutes the differentiation signal and makes the quiz feel like trivia. We'll pick candidates polling >2% or with >$1M raised by a cutoff date, capped at 10. The cutoff and threshold are reviewable each month leading up to the primary.

---

## User experiences

### 1. Quick Quiz (web, Buildy-hosted)

- Landing page: name the race, the stakes, the snapshot date, "Find your match in 3 minutes"
- 15–20 questions, one per screen, multiple choice (4–5 options including "unsure / skip")
- Each question shows: the policy question in plain language, the option, optional "why this matters" expand
- Importance slider per question (low / medium / high) — visible inline beneath each answer, defaulted to medium so users who don't care can just answer and move on
- Results screen: ranked candidates with match %, per-candidate breakdown (where you agree / disagree), receipts on every position
- "Why-not" panel: closest-runner-up analysis
- Share: copyable URL with results encoded; optional share-card image
- Persistent: user can come back and revisit their result; can retake

### 2. Deliberation Mode (open-ended, MCP-driven)

The user holds the conversation inside their own Claude / ChatGPT / Cursor session. Our MCP server (mode #3 below) provides the issue and candidate data; the user's agent does the conversation, clarification, and matching. Concretely:

- The agent asks open-ended questions, in whatever order makes sense for the user
- The user answers in their own words
- The agent calls our `score_user_positions` tool with a structured representation
- The agent presents a richer alignment map (not just "84% Porter" but "you're closest to Porter on housing and climate, closer to Bianco on public safety, and your education answer didn't match any candidate cleanly")

No standalone chat UI in v1 — we ship the MCP, the user brings their preferred agent. Zero AI cost on our side. We can add a standalone hosted chat UI in v2 if user feedback warrants it.

### 3. MCP Server

Tools exposed to Claude / ChatGPT:

- `list_candidates()` — returns the candidate roster with summaries
- `get_candidate(id)` — bio, top positions, money, recent press, endorsements
- `list_issues()` — issue dimensions with definitions
- `get_positions(issue_id)` — every candidate's stance on one issue, with source URLs
- `get_differentiating_questions(top_n=10)` — the questions where candidates spread most
- `score_user_positions(user_positions)` — given a user's stated positions, returns the match ranking

This turns a Claude or ChatGPT session into a candidate matcher: the user just talks, the agent calls the tools, and the agent presents a recommendation with citations. Buildy claims a single MCP connection works across Claude/ChatGPT/Codex/Cursor, so this is one integration that unlocks all of them.

> **Design decision — MCP is a real product surface, not a demo.**
> The MCP server is the most differentiated of the three modalities — almost nobody has shipped a civic MCP tool. We'll invest in it accordingly: good tool descriptions, good docs, good sample prompts.

---

## Data model

```
Candidate
  id, name, party, slug
  bio_short, bio_long
  campaign_url, photo_url
  declared_date, polling_avg_pct, money_raised_usd, endorsements[]
  snapshot_date

Issue
  id, name, slug, short_description, long_description
  category (economy / housing / climate / safety / etc.)
  ca_specific_context (e.g., for water policy: "California's water rights system dates to 1914...")

Position
  candidate_id, issue_id
  stance (one of 4–5 ordinal options for that issue)
  summary (1–2 sentences)
  source_quote, source_url, source_date
  confidence (high / medium / low — how sure are we?)

Question
  id, issue_id
  prompt (the actual quiz question)
  options[] (each maps to a stance value)
  differentiation_score (0–1, computed from candidate spread)
  importance_default (low / medium / high)
```

The dataset is **versioned** — `dataset_v1.json` shipped on date X, `dataset_v2.json` on date Y. The user's saved result includes the dataset version so revisiting later still makes sense.

---

## Candidate selection

**Target:** approximately 8 candidates, but as the *outcome* of a transparent threshold, not a quota. Selection criteria (any one is sufficient):

- Polling at ≥2% in a credible recent poll (UC Berkeley IGS, PPIC, Emerson, etc.)
- ≥$1M in cumulative campaign fundraising
- Holds or has held statewide/major office
- Has qualified or is on track to qualify for the primary ballot

If the threshold yields fewer than 6 or more than 10, we tighten or loosen *the polling threshold* (the most defensible knob), document the change, and move on. The rule is the criterion — 8 is just the calibration target.

As of early 2026, the field likely includes (subject to research at build time):

- Katie Porter (D)
- Antonio Villaraigosa (D)
- Toni Atkins (D)
- Eleni Kounalakis (D) — if still in
- Xavier Becerra (D) — if running
- Chad Bianco (R)
- Steve Hilton (R)
- Plus 1–2 more from R / NPP / minor parties for spectrum coverage

**This list MUST be re-verified during the research phase.** Names above are scaffolding only.

---

## Research methodology

This is where most "candidate matcher" projects quietly fail. The plan:

### Sources, in tier order

1. **Tier 1 (use first)**: Official campaign websites, candidate-authored op-eds, debate transcripts, candidate questionnaires (e.g., from LA Times, CalMatters, Sac Bee), official voting records (for incumbents/former officeholders), CalMatters policy trackers.
2. **Tier 2 (use to triangulate)**: Reputable journalism (LAT, SF Chronicle, Politico CA, CalMatters, Sac Bee, KQED), policy organization scorecards (where transparent).
3. **Tier 3 (last resort, flag explicitly)**: Aggregator sites, Wikipedia, partisan blogs.

### Position elicitation

For each (candidate × issue), the goal is one stance + one short summary + one citation. The process:

1. Start with the issue list (drafted from CA voter priority polling — housing, homelessness, public safety, water, climate, education, taxes, AI/tech regulation, immigration, healthcare).
2. For each issue, define 4–5 ordinal stance options (e.g., for housing supply: "build more aggressively even over local objection" → "preserve neighborhood character; build slowly").
3. For each candidate, research that issue and assign a stance with citation. If we can't find a citation, the position is marked `unknown` — not guessed.
4. **Two-pass review**: every position is double-checked by reading the cited source. We do not trust LLM summaries of policy positions without source verification.

### Bias mitigation

- Stance scales are written symmetrically — neither end is "the good answer"
- Issue descriptions are reviewed for loaded language
- Candidate position summaries quote the candidate's own framing where possible
- Source date matters: a 2024 statement is not the same as a 2025 walk-back; we cite both if relevant
- Disclose limitations in the UI ("our snapshot, as of Y; positions may have shifted")

### Question generation

Questions are derived *from* the position data, not authored independently:

1. For each issue, compute the spread of candidate stances
2. Issues where ≥3 candidates take meaningfully different positions become candidate questions
3. The actual question prompt is written to surface the cleanest 4–5-way split
4. Questions are scored by `differentiation_score` (how much they spread the field) — high-spread questions go into the default quiz, low-spread questions become optional deep-cuts

> **Design decision — questions follow the data, not the other way around.**
> Most matchers start with a pollster's pre-built issue list and force-fit candidate positions to it. We do it the other way: research first, structure second. This is more work but produces genuinely differentiating questions and avoids the "all candidates support clean water" problem.

---

## Matching algorithm

Simple, transparent, and explainable beats clever:

```
match_score(user, candidate) =
  sum over questions Q of:
    importance(Q) * agreement(user_answer_Q, candidate_position_Q)
  / sum over questions Q of:
    importance(Q) * max_agreement
```

Where:

- `agreement` is the normalized distance between the user's chosen stance and the candidate's stance on the ordinal scale (1.0 for exact match, decreasing linearly)
- `importance` is the user's slider value (default medium)
- Skipped questions are excluded from both numerator and denominator
- `unknown` candidate positions are excluded from that candidate's score (the question still counts for others)

The score is presented as a percentage match. Plus:

- **Per-question contribution**: show which questions most influenced the ranking
- **Confidence band**: candidates within ~5 percentage points are shown as a tie
- **What-if**: "if you'd answered Q5 differently, your top match would be X"

No collaborative filtering, no embeddings, no LLM ranking. The math is auditable in the UI on request.

---

## Architecture

### Component layout

```
[ Research artifacts ]    [ Web quiz (Worker) ]     [ MCP server ]     [ Deliberation mode ]
        |                          |                       |                     |
        v                          v                       v                     v
+----------------+      +----------------------+   +-------------+      +---------------+
| dataset_vN.json|      | Cloudflare Worker:   |   |  MCP server |      | Hosted agent  |
| (versioned    )|----->|  - /api/* endpoints  |---|  reads from |      | reads from    |
| (sources cited)|      |  - static assets     |   |  dataset    |      | dataset       |
+----------------+      |  - D1 (flags/events) |   +-------------+      +---------------+
                        +----------------------+         |                     |
                                                         v                     v
                                                  Claude / ChatGPT      Browser (chat UI)
```

**The dataset JSON is the single source of truth.** All three surfaces read from it. Builds happen offline, results are versioned.

### Why Cloudflare Workers for the quiz

- WinterTC runtime — same `Request`/`Response`/`crypto.subtle`/streams shape we used on Buildy, minimal porting
- Free tier: 100k requests/day, unlimited bandwidth, no expiration
- D1 free tier: 5 GB, 5M reads/day, 100k writes/day — covers analytics + correction-flag submissions with headroom; **no time-limited DB cliff** (unlike Render's 30-day Postgres trial)
- Workers Assets binding serves static UI + dataset JSON from the same deployable
- 1 MB compressed script size limit on free tier; our 400 KB dataset + ~10 KB of code gzips to ~80 KB. Plenty of room.
- Custom domain when wanted, free Workers SSL — but v1 launches on `*.workers.dev` (decision #7)

### Why Cloudflare does NOT host the MCP server (yet)

MCP stdio transport doesn't need a public endpoint — Claude Desktop and Cursor invoke the server as a local subprocess. ChatGPT's MCP wants SSE/HTTP, but ChatGPT MCP support is still gated and the audience is small for a US-state-specific tool.

v1 ships stdio-only with install instructions for Claude Desktop and Cursor. SSE-transport Worker is a reversible Phase 3+ add if ChatGPT demand materializes.

> **Design decision — MCP-only for v1, no standalone chat UI.**
> Shipping a real MCP-driven experience is the differentiated bet. A standalone hosted chat UI is well-trodden — many tools do it — and we can add it in v2 if there's demand. v1 gets viral leverage from "use this in your Claude app."

### Deployment plan

- **Quiz**: Cloudflare Worker at `https://<name>.workers.dev` — primary distribution URL. Same Worker serves static UI, dataset JSON, and `/api/*` endpoints. D1 binding for flags + events.
- **MCP server**: Stdio Node process, installed locally by users (Claude Desktop and Cursor configs published in `mcp/README.md`). No hosting required.
- **Dataset hosting**: Versioned JSON in this repo (public on GitHub) + served by the same Worker at `/dataset_v1.json` for in-browser audit.

#### Phase 1 hosting layout

```
infra/
  wrangler.toml          # Worker name, compatibility date, D1 binding, Assets binding
  schema.sql             # flags + events tables
  src/
    worker.js            # API endpoints (ported from buildy/module.js)
  public/
    index.html           # UI (ported from buildy/ui.html)
    styles.css
    dataset_v1.json      # statically served
```

> **Design decision — keep the dataset open and auditable.**
> Civic-tech tools rise or fall on credibility. We publish the dataset publicly, list every source, accept issues/PRs for corrections. That's the difference between "AI candidate matcher" (suspect) and "well-sourced candidate matcher with citations" (sharable to your mom).

---

## Phased rollout

**Phase 0 — Research & data** ✅ Complete (2026-05-14)

- [x] Voter-priority research: top 10–15 issues Californians actually care about (PPIC, IGS, recent journalism)
- [x] Candidate roster locked with selection criteria applied (8 candidates)
- [x] First pass: candidate × issue matrix populated with cited positions (200 cells after the tax split)
- [x] Two-pass review of every position with source verification (190 cited; 10 honest unknowns)
- [x] Stance scales finalized per issue
- [x] Question prompts drafted and ranked by differentiation score; top 13 flagged `default_quiz: true`
- [x] **Output**: `dataset/dataset_v1.json`, published openly

**Phase 1 — Quiz MVP** ✅ Shipped (live on Cloudflare)

- [x] ES module with fetch handler — ported to `infra/src/worker.js` (Cloudflare Worker)
- [x] UI: vanilla JS, quiz flow (policy phase + personal-fit phase) + results
- [x] Scoring algorithm with per-question importance weighting (inline, defaulted to medium)
- [x] Smoke tests cross-verifying worker and MCP scoring outputs (`scripts/test_quiz.mjs`, `mcp/test_tools.mjs`)
- [x] **Migrated to Cloudflare Worker** — `infra/` with wrangler.toml, D1 schema, deploy
- [x] Receipts (source links + verbatim quotes) on every position in the result row ("see why")
- [x] Per-position "flag this" button → POST `/api/flag` → D1 → manual sweep into GitHub Issues
- [x] Aggregate analytics: anonymized response counts → POST `/api/tally` (not `/api/event`, which content blockers drop) → D1; in-UI disclosure
- [x] Share-link encoding (answers in URL hash; client-side replay)
- [x] Back-navigation through questions (scrolls to top on every move)
- [x] Plain-language prompts + options for the average voter
- [x] Always-shown "Background & arguments" per question, with "The basics" explainers and inline bill-text links
- [x] Flag button surfaced (top match's "see why" opens by default; per-position "⚑ flag this")
- [x] Landing-page FAQ (methodology, sourcing, corrections, privacy)
- [x] Race named explicitly throughout (June 2, 2026 gubernatorial primary)
- [x] Mobile pass: iPhone one-handed (44pt targets, responsive breakpoint)
- [x] **Output**: live `*.workers.dev` URL, sharable

**Phase 2 — MCP server** ✅ Largely complete

- [x] MCP server with 7 tools (`list_candidates`, `list_issues`, `get_positions`, `list_personal_fit_dimensions`, `get_candidate_bio`, `get_differentiating_questions`, `score_user_positions`)
- [x] stdio transport working end-to-end; smoke test in `mcp/test_tools.mjs`
- [x] Tool descriptions tuned for agent discoverability
- [x] Sample prompts that show the agent how to drive a good matching conversation
- [x] Install instructions for Claude Desktop and Cursor
- [ ] HTTP/SSE transport Worker for ChatGPT — deferred (small audience, gated support)
- [x] **Output**: published install instructions across 2+ agent platforms

**Phase 3 — Polish & launch** 🟡 Most deliverables shipped

- [x] Share card generation — SVG endpoint (`/api/share-card.svg`); PNG upgrade (satori/resvg) optional later
- [x] "Why-not" runner-up analysis ("you matched X; here are the questions where Y would have edged X")
- [x] What-if explorer ("if you'd answered Q5 differently…")
- [x] Public stats page (`/stats`): most-divisive questions, response distributions, candidate match-share — D1-backed
- [x] Voter-guide context (current policy, key facts, comparison, steelmanned arguments, sources) on all 15 default questions — rewritten in plain language with inline bill-text links (70 links, all verified)
- [x] Playwright test suite (`infra/tests/`) — landing/FAQ, navigation, full flow, API, mobile, voter-guide (63 passing)
- [x] Re-research the remaining `"unknown"` positions (no new public statements found in the window; documented)
- [x] Persona QA + math hand-verification (Steyer 77% / Bianco 93%; hand-computed match confirmed)
- [ ] Press kit / launch post / Twitter & Bluesky threads — drafted in `press/launch_post.md`, pending launch
- [ ] Custom-domain decision (currently `*.workers.dev` per decision #7)
- [ ] **Output**: actual launch, ahead of June 2026 primary

> **Design decision — ship in time for the primary, not the general.**
> The primary is the higher-leverage moment: more candidates, more decisions, more confusion. Most matchers launch for the general; we'll launch before the primary.

---

## Decisions (resolved)

These were walked through and locked on 2026-05-12. All are two-way doors unless noted.

1. **Deliberation Mode — MCP-only.** v1 ships the MCP server; the user brings their own Claude/ChatGPT/Cursor as the chat UI. No standalone hosted chat app. Zero AI cost on our side. *Revisit after launch if user feedback shows a real need for a no-agent chat UI.*
2. **Candidate count — ~8, threshold-justified.** The rule is the criterion (≥2% in a credible recent poll, ≥$1M raised, or holds/held major office). The polling threshold is the tuning knob if the field comes in too wide or too narrow.
3. **Importance slider — per-question, visible inline, defaulted to medium.** Power users get full control; non-tuners just answer and never touch the slider. Same matching power as "hidden behind a toggle" with one less click.
4. **AI cost — N/A for v1.** Resolved by decision 1.
5. **Endorsements yes, donors no.** Endorsements (with date) are listed per candidate; donor data is deferred to v2. Endorsements are well-sourced; donor data is noisy and editorial to summarize.
6. **Corrections workflow — GitHub PRs + in-app flag button.** Both routes land in the same GitHub issue list. PR route signals seriousness and lets researchers/journalists fix directly; the flag button captures the 99% who won't open GitHub.
7. **Domain — `*.workers.dev` URL only for v1.** No custom domain (was "Buildy URL" pre-pivot). We grab a domain only if traction warrants it post-launch. *Easy to add later; favor speed now.*
8. **Analytics — yes, anonymized, with a public stats page.** Aggregate response counts per (question, answer) and per (user-result → candidate). In-UI disclosure ("we publish anonymized stats"). The public stats page itself is a Phase 3 deliverable and a press hook.

---

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| A candidate drops out or shifts a major position after launch | Dataset is versioned; we publish a `last_verified` date per position and an update cadence |
| Accusations of bias | Open dataset, cited sources, symmetric stance scales, public correction workflow |
| Stale positions during fast news cycles | Weekly review cadence in May–June 2026; auto-display "as of <date>" in results |
| Buildy outage / shutdown | Dataset is portable JSON; we can re-host the quiz on Cloudflare Pages in <1 day if needed |
| MCP server abuse (scraping for partisan reuse) | The dataset is openly licensed anyway, so this isn't really a risk — embrace it |
| User confusion at the difference between match % and "best candidate" | UI copy emphasizes "match" not "best"; results page explicitly says "this is alignment, not advice" |
| LLM hallucination in Deliberation Mode | The MCP path means the user's agent does the reasoning; our tools only return cited data — hallucination risk is on the agent, not us |

---

## Verification

How do we know it works?

- [ ] **Quiz functional**: take it as 3 personas (progressive D, moderate D, R) and verify the rankings make sense
- [ ] **Citations land**: every position links to a working source URL
- [ ] **Math is right**: hand-compute scores for one scenario, compare to UI output
- [ ] **Share works**: take the quiz, share the URL, open in a new browser, see the same result
- [ ] **MCP works in Claude**: install the MCP, ask "help me figure out who to vote for in CA 2026," verify the agent uses our tools and produces a sourced recommendation
- [ ] **MCP works in ChatGPT**: same as above on the ChatGPT endpoint
- [ ] **Storage persists**: take quiz, close browser, return to URL, results still load
- [ ] **Mobile-friendly**: the whole flow works one-handed on iPhone
- [ ] **Snapshot date visible**: user can always see when the dataset was last refreshed

---

## Next steps (immediate, post-pivot)

In execution order:

1. **Cloudflare migration** — scaffold `infra/`, port the Worker, set up D1, deploy to `*.workers.dev`. Unblocks every Phase 1 deliverable.
2. **Phase 1 polish** — "see why" receipts, share-link encoding, flag button, analytics events, mobile pass.
3. **Phase 2 polish** — MCP tool description tuning, sample prompts, Cursor install instructions.
4. **Phase 3** — why-not, what-if, share cards, public stats page, persona QA, re-research the 8 unknowns, press kit.

The Buildy port is moved to `legacy/buildy/` once Cloudflare is live (preserved in git history regardless). Everything downstream of the Cloudflare deploy is parallelizable.

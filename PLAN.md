---
title: California 2026 Gubernatorial Candidate Matcher
status: draft
created: 2026-05-12
last-updated: 2026-05-12
---

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
[ Research artifacts ]    [ Web quiz ]     [ MCP server ]     [ Deliberation mode ]
        |                       |                |                     |
        v                       v                v                     v
+----------------+      +-------------+   +-------------+      +---------------+
| dataset_vN.json|      |  Buildy app |   |  MCP server |      | Hosted agent  |
| (versioned    )|----->|  static    -|---|  reads from |      | reads from    |
| (sources cited)|      |  payload    |   |  dataset    |      | dataset       |
+----------------+      +-------------+   +-------------+      +---------------+
                                                |                     |
                                                v                     v
                                         Claude / ChatGPT      Browser (chat UI)
```

**The dataset JSON is the single source of truth.** All three surfaces read from it. Builds happen offline, results are versioned.

### Why Buildy works for the quiz

- Static dataset baked into the module — no outbound HTTP needed ✓
- Multiple choice + scoring — pure compute, no external services ✓
- Persistent storage for user results and aggregate stats — `buildy:storage/kv@1.0` ✓
- Public URL, real storage, mobile-friendly — Buildy's core promise ✓
- Vanilla JS + Tailwind UI — fine for a quiz app ✓

Buildy estimated cost: $0 (per their model). 10MB storage cap is fine — the dataset will be well under 1MB, and we don't store per-user data verbatim (just hashed result IDs + share counts).

### Why Buildy does NOT work for the AI mode

Buildy explicitly disallows outbound HTTP from both the backend and the UI iframe (`connect-src 'self'`). That means:

- No calling Claude/OpenAI APIs from inside Buildy
- No live polling lookups
- No web-search for fresh quotes at runtime

Resolved: Deliberation Mode is **driven entirely from Claude/ChatGPT via the MCP server**. No new hosting needed for the chat UI — the user's agent IS the chat UI. The MCP server returns JSON-ish responses, which means it can be Buildy itself (the dataset already lives there) or a tiny Cloudflare Worker / Vercel function. Zero AI cost on our side.

> **Design decision — MCP-only for v1, no standalone chat UI.**
> Shipping a real MCP-driven experience is the differentiated bet. A standalone hosted chat UI is well-trodden — many tools do it — and we can add it in v2 if there's demand. v1 gets viral leverage from "use this in your Claude app."

### Deployment plan

- **Quiz**: Buildy app at `https://app.buildy.so/app/<id>` — primary distribution URL
- **MCP server**: Either (a) Buildy app exposing JSON endpoints under `/api/*` (paired with the quiz; same dataset), proxied through a thin MCP shim hosted on Cloudflare Workers, OR (b) standalone Cloudflare Worker / Vercel function with the dataset bundled. Decision deferred to spike.
- **Dataset hosting**: Versioned JSON in this repo, mirrored to a static URL (raw GitHub or a Worker) so anyone can audit our source data.

> **Design decision — keep the dataset open and auditable.**
> Civic-tech tools rise or fall on credibility. We publish the dataset publicly, list every source, accept issues/PRs for corrections. That's the difference between "AI candidate matcher" (suspect) and "well-sourced candidate matcher with citations" (sharable to your mom).

---

## Phased rollout

**Phase 0 — Research & data (2026-05 → 2026-06)**

- [ ] Voter-priority research: top 10–15 issues Californians actually care about (PPIC, IGS, recent journalism)
- [ ] Candidate roster locked with selection criteria applied
- [ ] First pass: candidate × issue matrix populated with cited positions
- [ ] Two-pass review of every position with source verification
- [ ] Stance scales finalized per issue
- [ ] Question prompts drafted and reviewed
- [ ] **Output**: `dataset_v1.json`, published openly

**Phase 1 — Quiz MVP (2026-06)**

- [ ] Buildy ES module with manifest + fetch handler
- [ ] UI: vanilla JS + Tailwind, quiz flow + results + share
- [ ] Scoring algorithm with per-question importance weighting (inline, defaulted to medium)
- [ ] Receipts (source links) on every position
- [ ] Per-position "flag this" button → POST to a GitHub Issues integration (or a `corrections` KV bucket we sweep into GitHub)
- [ ] Aggregate analytics: anonymized response counts per (question, answer), match-distribution counts; disclosure copy in the UI
- [ ] Share-link encoding + result persistence in `buildy:storage/kv`
- [ ] **Output**: live Buildy URL, sharable

**Phase 2 — MCP server (2026-06 → 2026-07)**

- [ ] MCP server with the 6 tools above
- [ ] Tool descriptions tuned for Claude/ChatGPT discoverability
- [ ] Sample prompts that show the agent how to drive a good matching conversation
- [ ] README with install instructions for Claude / ChatGPT / Cursor
- [ ] **Output**: connection URL + onboarding docs

**Phase 3 — Polish & launch (2026-07 → 2026-08)**

- [ ] Share card image generation
- [ ] "Why-not" runner-up analysis
- [ ] What-if explorer ("if you'd answered Q5 differently…")
- [ ] Public stats page: most-divisive questions, response distributions, candidate match-share — refreshed live from `buildy:storage/kv`
- [ ] Press kit / launch post / Twitter & Bluesky threads
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
7. **Domain — Buildy URL only for v1.** No custom domain. We grab a domain only if traction warrants it post-launch. *Easy to add later; favor speed now.*
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

## Next steps (immediate)

1. **Confirm direction** — review this plan, flag changes to scope, candidates, or modalities. Especially the open decisions above.
2. **Set up the repo** — initialize git in `/Users/ted/dev/california-election`, push to GitHub as a private (or open!) repo, add a README pointing at this plan.
3. **Phase 0 kickoff** — start the research spike: voter priorities + candidate roster, leading to `dataset_v0.json` (rough first pass) inside a week.
4. **Buildy spike** — ship a "hello world" Buildy app to validate the deploy flow and Tailwind UI ergonomics before investing in the real UI. Takes maybe an hour.
5. **MCP spike** — similarly, get one tool returning one issue to one Claude session, end-to-end, before scaling out.

The two spikes (#4 and #5) de-risk the platform choices early. Phase 0 research runs in parallel.

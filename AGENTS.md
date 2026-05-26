# AGENTS.md — rules for AI agents working in this repo

Primary context lives in [`CLAUDE.md`](./CLAUDE.md) (project overview, current state, key files) and [`PLAN.md`](./PLAN.md) (full design). Read those first. This file collects the hard rules that any agent — Claude, Codex, Cursor, etc. — must follow.

## Hard rules

- **Ground every ballot-proposal reference in verified facts.** Any time the dataset or UI mentions a ballot proposition or a proposed/historic ballot measure (e.g. AB 259, the 2026 "Billionaire Tax Act," Prop 13/15/19/36/47/4/98/2/38, Prop 1), verify that *specific* proposal's name, mechanism (one-time vs. annual, rates, thresholds, who pays), status (passed / failed / qualified / which ballot), and sponsor against a primary or authoritative source (Ballotpedia, leginfo.legislature.ca.gov, LAO) before writing it, and cite it in `sources[]`. Never conflate two distinct proposals. *(This rule exists because the wealth-tax page once conflated AB 259 — a failed 2023 annual wealth-tax bill — with the live Nov 2026 one-time billionaire tax. Getting a measure's basic mechanism wrong destroys a civic tool's credibility.)*

- **Receipts and credibility over completeness.** Every candidate position needs a primary-source citation with a dated, verbatim quote. Never trust an LLM summary of a position without source verification — mark a position `"unknown"` (`confidence: "insufficient_data"`) rather than fabricate.

- **Analytics endpoint is `/api/tally`, not `/api/event`.** `/api/event` is Plausible's signature path and was being dropped by content blockers. Don't rename it back.

- **Verify with real tests, in-project.** Run `node infra/test_worker.mjs`, `node scripts/test_quiz.mjs`, `cd mcp && node test_tools.mjs`, and the Playwright suite (`cd infra && TEST_URL=http://localhost:8787 npx playwright test` against `wrangler dev`). Don't write throwaway verification scripts in `/tmp`.

- **The dataset is the source of truth.** Quiz length and the personal-fit set are derived from `default_quiz` flags (computed by `scripts/score_questions.mjs` and `scripts/score_personal_fit.mjs`); don't hardcode counts.

## Writing voter-guide context

- **Keep the question prompt and stance labels general; put specifics in the guide.** The stance scale captures a candidate's general *direction* (support↔oppose). Don't bake a specific proposal's mechanism (e.g. "annual") into the prompt or labels when real proposals differ on it — explain mechanism, rate, and status in the voter-guide prose instead. *(I wrongly relabeled the wealth-tax options "annual," which broke once the live measure turned out to be one-time.)*

- **When an issue maps to more than one real proposal, name and distinguish each** — mechanism, rate, status — rather than blurring them into "a similar measure." State status precisely: a failed/stalled bill, a qualified ballot measure, and enacted law are different things, and a proposed measure's status changes over time (re-verify near launch).

- **Treat reader-reported confusion as a possible factual error, not just unclear wording.** Re-verify the underlying facts *before* rewording — confusion often signals a real inaccuracy or two conflated proposals. Don't double down on the existing framing.

- **Prose rendering is restricted.** Voter-guide fields (`current_policy`, `explainer`, `arguments_for_change`, `arguments_against_change`, `key_facts`, `comparison`, `note_on_options`) support only `[label](https://url)` inline links — **no bold/italic** (asterisks render literally), and a link URL **cannot contain `)`** (the regex stops at the first paren). Put paren-containing URLs (e.g. Ballotpedia `..._(2026)`) in `sources[]` instead, where they render as a plain `href`. Same contract in `renderProse` (`infra/public/app.js`) and `proseToHtml` (`infra/src/worker.js`).

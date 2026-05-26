# AGENTS.md — rules for AI agents working in this repo

Primary context lives in [`CLAUDE.md`](./CLAUDE.md) (project overview, current state, key files) and [`PLAN.md`](./PLAN.md) (full design). Read those first. This file collects the hard rules that any agent — Claude, Codex, Cursor, etc. — must follow.

## Hard rules

- **Ground every ballot-proposal reference in verified facts.** Any time the dataset or UI mentions a ballot proposition or a proposed/historic ballot measure (e.g. AB 259, the 2026 "Billionaire Tax Act," Prop 13/15/19/36/47/4/98/2/38, Prop 1), verify that *specific* proposal's name, mechanism (one-time vs. annual, rates, thresholds, who pays), status (passed / failed / qualified / which ballot), and sponsor against a primary or authoritative source (Ballotpedia, leginfo.legislature.ca.gov, LAO) before writing it, and cite it in `sources[]`. Never conflate two distinct proposals. *(This rule exists because the wealth-tax page once conflated AB 259 — a failed 2023 annual wealth-tax bill — with the live Nov 2026 one-time billionaire tax. Getting a measure's basic mechanism wrong destroys a civic tool's credibility.)*

- **Receipts and credibility over completeness.** Every candidate position needs a primary-source citation with a dated, verbatim quote. Never trust an LLM summary of a position without source verification — mark a position `"unknown"` (`confidence: "insufficient_data"`) rather than fabricate.

- **Analytics endpoint is `/api/tally`, not `/api/event`.** `/api/event` is Plausible's signature path and was being dropped by content blockers. Don't rename it back.

- **Verify with real tests, in-project.** Run `node infra/test_worker.mjs`, `node scripts/test_quiz.mjs`, `cd mcp && node test_tools.mjs`, and the Playwright suite (`cd infra && TEST_URL=http://localhost:8787 npx playwright test` against `wrangler dev`). Don't write throwaway verification scripts in `/tmp`.

- **The dataset is the source of truth.** Quiz length and the personal-fit set are derived from `default_quiz` flags (computed by `scripts/score_questions.mjs` and `scripts/score_personal_fit.mjs`); don't hardcode counts.

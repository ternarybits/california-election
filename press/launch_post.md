# Launch post — draft

Drafted 2026-05-21. Tighten on the day of launch with the live URL.

## Twitter / Bluesky thread (short)

> [LINK] — I built a 2026 California governor matcher.
>
> Three things make it different from every other "who should I vote for" quiz:
>
> 1. Every question is one where the candidates actually differ. Differentiation-score ranked, not vibes.
> 2. Receipts on every position — primary-source quote + URL, no LLM summaries.
> 3. Three modalities, one dataset: a 3-min web quiz, an MCP server (works in Claude / Cursor), and the dataset itself is open on GitHub.
>
> Built before the June primary because the primary is the higher-leverage moment: more candidates, more decisions, more confusion. Most matchers launch for the general — this one ships now.
>
> v1 covers 8 candidates × 24 issues = 192 candidate-issue positions, 184 cited from primary sources. The 8 honest "unknown" entries are themselves a finding — the field has not yet spoken on those.
>
> Dataset: github.com/ternarybits/california-election
> Quiz: https://california-election.tedmao.workers.dev
> MCP: clone the repo, drop the config snippet into Claude Desktop or Cursor.
>
> Corrections welcome — PR the dataset, or hit the "flag" button on any position.

## Substack note (medium-length)

### Why I built this

Most candidate matchers ask "do you support good public schools?" and then ding you 1 point if your answer doesn't match the candidate. That's bad design — it's not a question, it's a softball. Every California gubernatorial candidate supports good public schools. The interesting question is *how*, and where they disagree, and how confident you can be in any of it.

This matcher inverts the design. It starts from the candidate × issue matrix — 192 positions, each backed by a verbatim primary-source quote — and *derives* the questions from where the field is most split. If five candidates take the same stance on something, it isn't a question; it's a footnote. That rule is enforced by the data, not by editorial taste.

### What's different

Three things:

**Differentiation-first questions.** The default 15-question quiz is the top 15 by *differentiation score* — a measure of how widely the field spreads on that issue, scaled by how well-researched the issue is. The lowest-spread issue (residential Prop 13) didn't even make the quiz; nearly every candidate defends it. That's a feature.

**Receipts.** Every candidate position links to a source quote and URL. The dataset is `dataset_v1.json` in the repo. Anyone can audit the research; corrections come as PRs or via an in-app flag button. No "the AI said so."

**Three modalities, one dataset.** Most matchers are a single web app. This ships:
- a 3-minute web quiz (Cloudflare Workers, free tier, no analytics cookies)
- an MCP server that plugs into Claude Desktop or Cursor so power users can drive a conversational matching experience from their own agent
- the dataset itself, openly licensed

### Two scores, never blended

Every candidate gets *two* match scores: policy match (where you agreed on the issues you weighted) and personal fit (background, career, demographic, geographic, coalition). They are shown separately on purpose. A union activist might match a candidate 90% on policy and 30% on personal fit; the matcher tells you both, and lets you decide which mattered more. Most matchers hide this in a single number. That's editorial.

### Honest unknowns

8 of 192 candidate-issue cells say `"unknown"` with `confidence: "insufficient_data"`. Becerra has no public position on K-12 funding. Porter has not made a statement on Prop 13 in this cycle. Thurmond has not spoken about Diablo Canyon or the Delta tunnel. Those are findings, not gaps — refusing to extrapolate from party affiliation is the whole credibility play.

### Live now ahead of the June primary

https://california-election.tedmao.workers.dev · github.com/ternarybits/california-election

Take it, share it, file corrections. Snapshot date is on every page.

## Press kit talking points

- **The headline number**: 192 candidate × issue positions, 184 cited from primary sources (95.8%), 8 honest unknowns.
- **The unifying claim**: every question is one where the candidates actually differ.
- **The dataset is the product**: anyone can audit, anyone can fork, corrections via PR or flag button.
- **MCP is the differentiator**: probably the first civic-tech MCP server.
- **Built for the primary, not the general** — and on `*.workers.dev` until a custom domain is warranted.

## Email subject lines (for journalists / civic-tech folks)

- "A California 2026 candidate matcher with receipts on every position"
- "Open-source candidate matcher for the June primary — corrections welcome"
- "An MCP server for the California 2026 governor's race"

# infra/ — Cloudflare Worker + D1

The web quiz lives here: a single Cloudflare Worker that serves the UI (static), the dataset, the JSON API, the SVG share card, and the public stats page. State is held in Cloudflare D1.

## Layout

```
infra/
  wrangler.toml       # Worker name, compatibility date, D1 binding, Assets binding
  schema.sql          # D1 tables (flags, events)
  package.json        # wrangler dev/deploy scripts
  src/
    worker.js         # Worker entrypoint — API + share-card + static-asset fallback
  public/
    index.html        # Quiz UI
    app.js            # Client app — boots, scores, renders, share-link encoding
    styles.css        # All styling, including mobile breakpoint
    stats.html        # /stats page
  test_worker.mjs     # Node smoke test (D1 + ASSETS stubbed)
```

## API surface

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/dataset` | Full `dataset_v1.json` |
| `GET` | `/dataset_v1.json` | Convenience alias for audit links |
| `GET` | `/api/candidates` | Roster summary |
| `GET` | `/api/issues` | All 25 issues with stance scales |
| `GET` | `/api/questions` | Default 15-question quiz (ranked by differentiation) |
| `GET` | `/api/personal-fit-dimensions` | 12 personal-fit dimensions |
| `GET` | `/api/stats` | Aggregated D1 stats (used by `/stats`) |
| `GET` | `/api/share-card.svg?c=...&p=...` | SVG share card |
| `POST` | `/api/flag` | Submit a position correction → D1 `flags` |
| `POST` | `/api/event` | Anonymized quiz event → D1 `events` |

## Local smoke test

```bash
node test_worker.mjs
```

Stubs D1 + ASSETS so the worker runs in plain Node. Validates all GET endpoints, flag/event insert paths, validation, and asset fallback.

## First-time deploy

The user must run these locally (interactive); they aren't sandbox-permitted from Claude.

```bash
# 1. Install wrangler
cd infra
npm install

# 2. Auth (browser flow)
npx wrangler login

# 3. Provision D1
npx wrangler d1 create california-election
# → paste the returned database_id into wrangler.toml ([[d1_databases]].database_id)

# 4. Apply schema to local + remote D1
npm run db:apply-local
npm run db:apply

# 5. Deploy
npm run deploy
# → returns https://california-election.<your-subdomain>.workers.dev
```

## Updating

```bash
npm run deploy
```

Cloudflare bundles `src/worker.js` (including the JSON import of `dataset_v1.json`) and uploads it; `public/` is uploaded as static assets accessible via `env.ASSETS.fetch(request)`.

## Verifying

After deploy:

```bash
URL=https://california-election.<subdomain>.workers.dev

curl "$URL/api"                       # discovery
curl "$URL/api/candidates" | jq .[0]  # one candidate
curl "$URL/api/questions" | jq length # should be 15
curl "$URL/dataset_v1.json" | jq .version
```

Then open `$URL` in a browser, take the quiz, verify a known persona (progressive → Steyer top match ~77%).

## Reading flagged corrections

```bash
npx wrangler d1 execute california-election --remote \
  --command="SELECT candidate_id, issue_id, reason, created_at FROM flags ORDER BY created_at DESC LIMIT 50"
```

Sweep these into GitHub Issues manually (or build a tiny cron Worker if volume grows).

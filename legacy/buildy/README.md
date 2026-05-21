# Buildy quiz spike

Vertical-slice quiz app for [Buildy](https://buildy.so). Loads the open dataset, walks the user through one question per issue, scores ordinal agreement against each candidate's stance, and persists results in Buildy's KV store.

> Now loading `dataset_v1.json` — 184 of 192 candidate-issue positions are researched with primary-source quotes. The UI shows real scores out of the box.

## Files

| File | Purpose |
|---|---|
| `module.js` | Buildy backend ES module. Exports `fetch(request, env)`. Inlines the dataset at deploy time. |
| `ui.html` | Single-page UI. Vanilla JS + CSS. No external scripts. |
| `styles.css` | Sent as the `styles` field on deploy. |
| `deploy.mjs` | Node script that bundles dataset + module, then POSTs to `https://app.buildy.so/app`. |

## Deploy

```bash
# from repo root
node buildy/deploy.mjs
```

On success, the script writes `buildy/.env.local` containing `BUILDY_APP_ID`, `BUILDY_TOKEN`, and `BUILDY_URL`. **The token is irrecoverable — back this up.**

Update an existing app:

```bash
BUILDY_TOKEN=$(grep ^BUILDY_TOKEN buildy/.env.local | cut -d= -f2) \
  node buildy/deploy.mjs --update "$(grep ^BUILDY_APP_ID buildy/.env.local | cut -d= -f2)"
```

## Endpoints

The deployed app exposes:

- `GET /` — health + endpoint list
- `GET /api/dataset` — full dataset JSON
- `GET /api/candidates` — candidate roster (id, name, party, bio_short)
- `GET /api/issues` — issue list with stance scales
- `POST /api/result` → `{ id, url_suffix }` — saves an anonymous result, returns share suffix
- `GET /api/result/:id` — load a saved result

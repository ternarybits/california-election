# Playwright tests

End-to-end browser tests for the CA 2026 Candidate Matcher Worker. Run on every change to catch regressions before they hit users.

## Layout

| File | What it covers |
|---|---|
| `landing.spec.ts` | Title, snapshot date, start button, footer link targets |
| `quiz-navigation.spec.ts` | Back-button behavior, layout (back-left / skip-next-right), answer pre-fill on back, importance slider persistence |
| `quiz-full-flow.spec.ts` | Full quiz → results screen, ranking count, see-why receipts, source links, why-not panel, what-if explorer |
| `api.spec.ts` | All `/api/*` endpoints against the live deployed Worker (complements `infra/test_worker.mjs` which stubs bindings) |
| `mobile.spec.ts` | iPhone-sized layout: no overflow, 44pt tap targets, nav row direction |

Projects (defined in `playwright.config.ts`):

- `chromium-desktop` — 1280×900 viewport
- `chromium-mobile` — 390×844 viewport, touch + isMobile (driven by chromium, not webkit, so no extra browser install needed)

## Running

```bash
# First-time setup
cd infra
npm install --ignore-scripts
npm run test:install            # downloads chromium

# Run against production
npm test

# Run a specific file
npm test tests/landing.spec.ts

# Run against a local wrangler dev server
TEST_URL=http://localhost:8787 npm test
```

## Writing new tests

When adding a feature, write the test in the same change. Use the existing files as templates:

- UI/visual checks → add to `landing.spec.ts` or `mobile.spec.ts`
- Quiz interaction → `quiz-navigation.spec.ts` or `quiz-full-flow.spec.ts`
- API contract → `api.spec.ts`

Selectors: prefer stable IDs (`#pq-back`, `#ranking > li`) over text content where the text might change. For receipts and other repeated structures, use direct-child selectors (`>`) to avoid matching descendants.

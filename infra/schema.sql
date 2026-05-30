-- D1 schema for the CA 2026 candidate matcher.
-- Apply locally:  npm run db:apply-local
-- Apply remote:   npm run db:apply

CREATE TABLE IF NOT EXISTS flags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidate_id TEXT NOT NULL,
  issue_id TEXT NOT NULL,
  reason TEXT,
  dataset_version TEXT,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS flags_by_target ON flags (candidate_id, issue_id);

CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  -- kind: 'quiz_start' | 'policy_answer' | 'personal_answer' | 'quiz_complete' | 'chat_opened'
  kind TEXT NOT NULL,
  session_id TEXT NOT NULL,
  issue_id TEXT,
  dimension_id TEXT,
  stance INTEGER,
  importance INTEGER,    -- 0=low 1=medium 2=high
  candidate_id TEXT,     -- for quiz_complete: the top match
  match_pct INTEGER,     -- for quiz_complete: the top match's %
  detail TEXT,           -- for chat_opened: the user's typed question (free text, capped)
  lang TEXT,             -- UI/dataset language the session was in (e.g. 'en','es','zh')
  dataset_version TEXT,
  created_at INTEGER NOT NULL
);
-- One-time migration for the existing remote D1 (the CREATE above only adds the
-- column on a fresh DB). D1 has no "ADD COLUMN IF NOT EXISTS"; run this once and
-- ignore the "duplicate column name" error on a DB that already has it:
--   wrangler d1 execute california-election --remote --command "ALTER TABLE events ADD COLUMN lang TEXT"
CREATE INDEX IF NOT EXISTS events_by_kind ON events (kind, created_at);
CREATE INDEX IF NOT EXISTS events_by_issue ON events (issue_id, kind);

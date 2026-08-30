-- NovaFlow stores one isolated fictional evaluation workspace per Clerk user.
-- Run this migration with a direct Neon connection before deploying the app.

CREATE TABLE IF NOT EXISTS novaflow_workspaces (
  user_id TEXT PRIMARY KEY,
  deals JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT novaflow_workspaces_deals_is_array
    CHECK (jsonb_typeof(deals) = 'array')
);

CREATE INDEX IF NOT EXISTS novaflow_workspaces_updated_at_idx
  ON novaflow_workspaces (updated_at DESC);

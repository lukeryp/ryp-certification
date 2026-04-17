-- ============================================================================
-- RYP Certification — Google Auth + Hours + Scores schema additions
-- Run this in the Supabase SQL editor (one-time migration)
-- Safe to re-run; all operations are idempotent.
-- ============================================================================

-- 1. Extend ryp_users to link to Supabase Auth + carry Google profile data ---

ALTER TABLE ryp_users
  ADD COLUMN IF NOT EXISTS auth_user_id uuid UNIQUE
    REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE ryp_users
  ADD COLUMN IF NOT EXISTS avatar_url text;

ALTER TABLE ryp_users
  ADD COLUMN IF NOT EXISTS provider text;

ALTER TABLE ryp_users
  ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();

-- Unique email (case-insensitive) for lookups
CREATE UNIQUE INDEX IF NOT EXISTS ryp_users_email_lower_idx
  ON ryp_users (lower(email));


-- 2. Cert attempts (L1 / L2 / L3) ------------------------------------------

CREATE TABLE IF NOT EXISTS ryp_cert_attempts (
  id          text PRIMARY KEY,
  user_id     text NOT NULL,
  cert_level  text NOT NULL,      -- 'l1' | 'l2' | 'l3'
  correct     int  NOT NULL,
  total       int  NOT NULL,
  score_pct   real NOT NULL,      -- 0..1
  passed      boolean NOT NULL,
  answers     jsonb,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ryp_cert_attempts_user_idx
  ON ryp_cert_attempts (user_id, cert_level, created_at DESC);


-- 3. Manual hours entries (no clock-in/out) --------------------------------

CREATE TABLE IF NOT EXISTS ryp_hours_entries (
  id          text PRIMARY KEY,
  user_id     text NOT NULL,
  work_date   date NOT NULL,
  hours       numeric(5,2) NOT NULL,     -- e.g. 3.50
  location    text DEFAULT 'Meadowbrook',
  notes       text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ryp_hours_entries_user_idx
  ON ryp_hours_entries (user_id, work_date DESC);


-- 4. RLS — mirror existing anon-write pattern used by ryp_users, ryp_quiz_attempts

ALTER TABLE ryp_cert_attempts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "allow anon all"   ON ryp_cert_attempts;
DROP POLICY IF EXISTS "allow anon read"  ON ryp_cert_attempts;
DROP POLICY IF EXISTS "allow anon write" ON ryp_cert_attempts;
CREATE POLICY "allow anon all" ON ryp_cert_attempts
  FOR ALL TO anon USING (true) WITH CHECK (true);

ALTER TABLE ryp_hours_entries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "allow anon all"   ON ryp_hours_entries;
DROP POLICY IF EXISTS "allow anon read"  ON ryp_hours_entries;
DROP POLICY IF EXISTS "allow anon write" ON ryp_hours_entries;
CREATE POLICY "allow anon all" ON ryp_hours_entries
  FOR ALL TO anon USING (true) WITH CHECK (true);


-- 5. Drop old clock-in/out table if it was created before the switch to manual entries

DROP TABLE IF EXISTS ryp_shifts;

-- Done.

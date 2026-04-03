-- RYP Certification — Supabase Schema
-- Paste this into the Supabase SQL Editor and run it once.
-- Tables use "ryp_" prefix to avoid conflicts with Supabase auth tables.

-- ─── Users ───────────────────────────────────────────────────────────────────

create table if not exists public.ryp_users (
  id        uuid        primary key,
  name      text        not null,
  email     text        not null unique,
  role      text        not null default 'student',
  created_at timestamptz default now()
);

-- ─── Quiz attempts ────────────────────────────────────────────────────────────

create table if not exists public.ryp_quiz_attempts (
  id         uuid        primary key,
  user_id    uuid        not null references public.ryp_users(id) on delete cascade,
  chapter    int         not null,
  score      int         not null,
  passed     boolean     not null,
  timestamp  timestamptz not null,
  created_at timestamptz default now()
);

create index if not exists ryp_quiz_user_chapter on public.ryp_quiz_attempts (user_id, chapter);

-- ─── Essay attempts ───────────────────────────────────────────────────────────

create table if not exists public.ryp_essay_attempts (
  id          uuid        primary key,
  user_id     uuid        not null references public.ryp_users(id) on delete cascade,
  chapter     int         not null,
  question_id text        not null,
  score       int         not null,
  feedback    text,
  suggestions text,
  timestamp   timestamptz not null,
  created_at  timestamptz default now()
);

create index if not exists ryp_essay_user_chapter on public.ryp_essay_attempts (user_id, chapter);

-- ─── Row-level security ───────────────────────────────────────────────────────
-- The app uses the anon key only — no auth required. Everyone can read and
-- write (users authenticate via the app's own name+email flow, not Supabase Auth).

alter table public.ryp_users         enable row level security;
alter table public.ryp_quiz_attempts  enable row level security;
alter table public.ryp_essay_attempts enable row level security;

-- Users
create policy "anon read users"   on public.ryp_users for select using (true);
create policy "anon insert users" on public.ryp_users for insert with check (true);
create policy "anon update users" on public.ryp_users for update using (true);

-- Quiz attempts
create policy "anon read quiz"    on public.ryp_quiz_attempts for select using (true);
create policy "anon insert quiz"  on public.ryp_quiz_attempts for insert with check (true);

-- Essay attempts
create policy "anon read essay"   on public.ryp_essay_attempts for select using (true);
create policy "anon insert essay" on public.ryp_essay_attempts for insert with check (true);

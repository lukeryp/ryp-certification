/**
 * Supabase-backed persistence for the cross-device leaderboard.
 * All functions are fire-and-forget safe — they never throw; failures are
 * logged silently so localStorage continues to work even if Supabase is down.
 */

import { getSupabase } from './supabase';
import { UserProfile, QuizAttempt, EssayAttempt, UserProgress, ChapterResult } from './types';

// ─── Write helpers ────────────────────────────────────────────────────────────

export async function syncUser(user: UserProfile): Promise<void> {
  const sb = getSupabase();
  if (!sb) return;
  try {
    await sb.from('ryp_users').upsert(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      { onConflict: 'id' }
    );
  } catch (e) {
    console.warn('[db] syncUser error:', e);
  }
}

export async function syncQuizAttempt(attempt: QuizAttempt): Promise<void> {
  const sb = getSupabase();
  if (!sb) return;
  try {
    await sb.from('ryp_quiz_attempts').upsert(
      {
        id: attempt.id,
        user_id: attempt.userId,
        chapter: attempt.chapter,
        score: attempt.score,
        passed: attempt.passed,
        timestamp: attempt.timestamp,
      },
      { onConflict: 'id' }
    );
  } catch (e) {
    console.warn('[db] syncQuizAttempt error:', e);
  }
}

export async function syncEssayAttempt(attempt: EssayAttempt): Promise<void> {
  const sb = getSupabase();
  if (!sb) return;
  try {
    await sb.from('ryp_essay_attempts').upsert(
      {
        id: attempt.id,
        user_id: attempt.userId,
        chapter: attempt.chapter,
        question_id: attempt.questionId,
        score: attempt.score,
        feedback: attempt.feedback,
        suggestions: attempt.suggestions,
        timestamp: attempt.timestamp,
      },
      { onConflict: 'id' }
    );
  } catch (e) {
    console.warn('[db] syncEssayAttempt error:', e);
  }
}

// ─── Read helpers ─────────────────────────────────────────────────────────────

/** Look up an existing user by email (for cross-device login continuity). */
export async function getUserByEmail(email: string): Promise<UserProfile | null> {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data, error } = await sb
      .from('ryp_users')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .maybeSingle();
    if (error || !data) return null;
    return { id: data.id, name: data.name, email: data.email, role: data.role };
  } catch (e) {
    console.warn('[db] getUserByEmail error:', e);
    return null;
  }
}

/** Admin: every registered user, ordered by name. */
export async function listAllUsers(): Promise<UserProfile[]> {
  const sb = getSupabase();
  if (!sb) return [];
  try {
    const { data, error } = await sb.from('ryp_users').select('*').order('name', { ascending: true });
    if (error) { console.warn('[db] listAllUsers', error); return []; }
    return (data ?? []).map((d: { id: string; name: string; email: string; role: UserProfile['role'] }) => ({
      id: d.id,
      name: d.name,
      email: d.email,
      role: d.role,
    }));
  } catch (e) {
    console.warn('[db] listAllUsers exception', e);
    return [];
  }
}

/**
 * Fetch all users + their best quiz/essay scores from Supabase and return
 * the same shape as `getAllProgress()` in storage.ts.
 */
export async function getAllProgressFromDB(): Promise<
  { user: UserProfile; progress: UserProgress }[]
> {
  const sb = getSupabase();
  if (!sb) return [];
  try {
    const [usersRes, quizRes, essayRes] = await Promise.all([
      sb.from('ryp_users').select('*'),
      sb.from('ryp_quiz_attempts').select('user_id, chapter, score, passed'),
      sb.from('ryp_essay_attempts').select('user_id, chapter, question_id, score'),
    ]);

    const users: UserProfile[] = (usersRes.data ?? []).map(r => ({
      id: r.id, name: r.name, email: r.email, role: r.role,
    }));

    const quizRows: { user_id: string; chapter: number; score: number; passed: boolean }[] =
      quizRes.data ?? [];
    const essayRows: { user_id: string; chapter: number; question_id: string; score: number }[] =
      essayRes.data ?? [];

    return users.map(user => {
      const chapterResults: Record<number, ChapterResult> = {};

      for (let ch = 0; ch <= 16; ch++) {
        const chAttempts = quizRows.filter(r => r.user_id === user.id && r.chapter === ch);
        const best = chAttempts.reduce<{ score: number; passed: boolean } | null>((b, c) => {
          if (!b || c.score > b.score) return c;
          return b;
        }, null);

        // Essay best per question
        const chEssays = essayRows.filter(r => r.user_id === user.id && r.chapter === ch);
        const bestByQ: Record<string, number> = {};
        for (const ea of chEssays) {
          if (!bestByQ[ea.question_id] || ea.score > bestByQ[ea.question_id]) {
            bestByQ[ea.question_id] = ea.score;
          }
        }
        const essayScores = Object.values(bestByQ);
        const essayCount = essayScores.length;
        const essayAvg = essayCount > 0 ? essayScores.reduce((s, v) => s + v, 0) / essayCount : 0;

        chapterResults[ch] = {
          chapter: ch,
          bestScore: best?.score ?? 0,
          passed: best?.passed ?? false,
          attempts: chAttempts.length,
          lastAttempt: null,
          essayAverageScore: Math.round(essayAvg * 10) / 10,
          essayCompletedCount: essayCount,
        };
      }

      return { user, progress: { userId: user.id, chapterResults } };
    });
  } catch (e) {
    console.warn('[db] getAllProgressFromDB error:', e);
    return [];
  }
}

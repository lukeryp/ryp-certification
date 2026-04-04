import { QuizAttempt, UserProfile, UserProgress, ChapterResult, EssayAttempt } from './types';
import { syncUser, syncQuizAttempt, syncEssayAttempt } from './db';

const STORAGE_PREFIX = 'ryp_cert_';

/**
 * Parse a localStorage value as JSON, returning `fallback` on any error.
 * Prevents a malformed/partial write from crashing the whole session (M-1).
 */
function safeParse<T>(data: string | null, fallback: T): T {
  if (data === null) return fallback;
  try {
    return JSON.parse(data) as T;
  } catch {
    return fallback;
  }
}

// User management

/** Returns the currently logged-in user profile, or null if not logged in. */
export function getCurrentUser(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  return safeParse<UserProfile | null>(
    localStorage.getItem(STORAGE_PREFIX + 'current_user'),
    null
  );
}

/** Persists the user profile to localStorage and syncs to Supabase. */
export function setCurrentUser(user: UserProfile): void {
  localStorage.setItem(STORAGE_PREFIX + 'current_user', JSON.stringify(user));
  // Also add to users list
  const users = getAllUsers();
  const existing = users.findIndex(u => u.id === user.id);
  if (existing >= 0) {
    users[existing] = user;
  } else {
    users.push(user);
  }
  localStorage.setItem(STORAGE_PREFIX + 'users', JSON.stringify(users));
  // Sync to Supabase (fire-and-forget)
  syncUser(user);
}

/** Returns all user profiles stored in localStorage. */
export function getAllUsers(): UserProfile[] {
  if (typeof window === 'undefined') return [];
  return safeParse<UserProfile[]>(
    localStorage.getItem(STORAGE_PREFIX + 'users'),
    []
  );
}

export function logout(): void {
  localStorage.removeItem(STORAGE_PREFIX + 'current_user');
}

// Quiz attempts

/** Appends a quiz attempt to localStorage and syncs to Supabase. */
export function saveQuizAttempt(attempt: QuizAttempt): void {
  const attempts = getQuizAttempts(attempt.userId);
  attempts.push(attempt);
  localStorage.setItem(
    STORAGE_PREFIX + 'attempts_' + attempt.userId,
    JSON.stringify(attempts)
  );
  // Sync to Supabase (fire-and-forget)
  syncQuizAttempt(attempt);
}

/** Returns all quiz attempts for the given user. */
export function getQuizAttempts(userId: string): QuizAttempt[] {
  if (typeof window === 'undefined') return [];
  return safeParse<QuizAttempt[]>(
    localStorage.getItem(STORAGE_PREFIX + 'attempts_' + userId),
    []
  );
}

// Essay attempts

/** Appends an essay attempt to localStorage and syncs to Supabase. */
export function saveEssayAttempt(attempt: EssayAttempt): void {
  const attempts = getEssayAttempts(attempt.userId);
  attempts.push(attempt);
  localStorage.setItem(
    STORAGE_PREFIX + 'essay_' + attempt.userId,
    JSON.stringify(attempts)
  );
  // Sync to Supabase (fire-and-forget)
  syncEssayAttempt(attempt);
}

/** Returns all essay attempts for the given user. */
export function getEssayAttempts(userId: string): EssayAttempt[] {
  if (typeof window === 'undefined') return [];
  return safeParse<EssayAttempt[]>(
    localStorage.getItem(STORAGE_PREFIX + 'essay_' + userId),
    []
  );
}

/**
 * Returns a map of questionId → best EssayAttempt for the given user and chapter.
 * "Best" is determined by highest score.
 */
export function getBestEssayAttempts(userId: string, chapter: number): Record<string, EssayAttempt> {
  const attempts = getEssayAttempts(userId).filter(a => a.chapter === chapter);
  const best: Record<string, EssayAttempt> = {};
  for (const attempt of attempts) {
    if (!best[attempt.questionId] || attempt.score > best[attempt.questionId].score) {
      best[attempt.questionId] = attempt;
    }
  }
  return best;
}

// Progress tracking

/** Computes full UserProgress from localStorage for the given user. */
export function getUserProgress(userId: string): UserProgress {
  const attempts = getQuizAttempts(userId);
  const essayAttempts = getEssayAttempts(userId);
  const chapterResults: Record<number, ChapterResult> = {};

  for (let ch = 0; ch <= 16; ch++) {
    const chapterAttempts = attempts.filter(a => a.chapter === ch);
    const bestAttempt = chapterAttempts.reduce<QuizAttempt | null>((best, curr) => {
      if (!best || curr.score > best.score) return curr;
      return best;
    }, null);

    // Essay stats: best score per question
    const chapterEssays = essayAttempts.filter(a => a.chapter === ch);
    const bestByQuestion: Record<string, number> = {};
    for (const ea of chapterEssays) {
      if (!bestByQuestion[ea.questionId] || ea.score > bestByQuestion[ea.questionId]) {
        bestByQuestion[ea.questionId] = ea.score;
      }
    }
    const completedQuestions = Object.values(bestByQuestion);
    const essayCompletedCount = completedQuestions.length;
    const essayAverageScore = essayCompletedCount > 0
      ? completedQuestions.reduce((sum, s) => sum + s, 0) / essayCompletedCount
      : 0;

    chapterResults[ch] = {
      chapter: ch,
      bestScore: bestAttempt?.score ?? 0,
      passed: bestAttempt?.passed ?? false,
      attempts: chapterAttempts.length,
      lastAttempt: bestAttempt?.timestamp ?? null,
      essayAverageScore: Math.round(essayAverageScore * 10) / 10,
      essayCompletedCount,
    };
  }

  return { userId, chapterResults };
}

/** Returns progress for all users stored in localStorage. */
export function getAllProgress(): { user: UserProfile; progress: UserProgress }[] {
  const users = getAllUsers();
  return users.map(user => ({
    user,
    progress: getUserProgress(user.id),
  }));
}

/** Returns the percentage of chapters passed (0–100). */
export function getCompletionPercentage(progress: UserProgress): number {
  const total = 17; // chapters 0-16
  const passed = Object.values(progress.chapterResults).filter(r => r.passed).length;
  return Math.round((passed / total) * 100);
}

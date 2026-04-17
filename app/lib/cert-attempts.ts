/**
 * Certification score tracking (L1 / L2 / L3).
 * Writes to `ryp_cert_attempts`. Fire-and-forget safe.
 */

import { getSupabase } from './supabase';

export type CertLevel = 'l1' | 'l2' | 'l3';

export interface CertAttempt {
  id: string;
  user_id: string;
  cert_level: CertLevel;
  correct: number;
  total: number;
  score_pct: number;   // 0..1
  passed: boolean;
  answers: Record<string, number> | Record<string, string> | null;
  created_at: string;
}

export interface SaveCertAttemptInput {
  userId: string;
  certLevel: CertLevel;
  correct: number;
  total: number;
  passed: boolean;
  answers?: Record<string, number> | Record<string, string>;
}

export async function saveCertAttempt(input: SaveCertAttemptInput): Promise<CertAttempt | null> {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const id = crypto.randomUUID();
    const score_pct = input.total > 0 ? input.correct / input.total : 0;
    const { data, error } = await sb
      .from('ryp_cert_attempts')
      .insert({
        id,
        user_id: input.userId,
        cert_level: input.certLevel,
        correct: input.correct,
        total: input.total,
        score_pct,
        passed: input.passed,
        answers: input.answers ?? null,
      })
      .select()
      .single();
    if (error) { console.warn('[cert-attempts] save', error); return null; }
    return data as CertAttempt;
  } catch (e) {
    console.warn('[cert-attempts] save exception', e);
    return null;
  }
}

export async function getCertAttempts(userId: string, certLevel?: CertLevel): Promise<CertAttempt[]> {
  const sb = getSupabase();
  if (!sb) return [];
  try {
    let q = sb.from('ryp_cert_attempts').select('*').eq('user_id', userId);
    if (certLevel) q = q.eq('cert_level', certLevel);
    const { data, error } = await q.order('created_at', { ascending: false });
    if (error) { console.warn('[cert-attempts] get', error); return []; }
    return (data as CertAttempt[]) ?? [];
  } catch (e) {
    console.warn('[cert-attempts] get exception', e);
    return [];
  }
}

/** Best (highest score_pct) attempt for a cert level, or null if none. */
export async function getBestCertAttempt(userId: string, certLevel: CertLevel): Promise<CertAttempt | null> {
  const attempts = await getCertAttempts(userId, certLevel);
  if (!attempts.length) return null;
  return attempts.reduce((best, curr) => (curr.score_pct > best.score_pct ? curr : best));
}

/** Admin: all attempts across all users, newest first. Optionally filter by level. */
export async function listAllCertAttempts(certLevel?: CertLevel): Promise<CertAttempt[]> {
  const sb = getSupabase();
  if (!sb) return [];
  try {
    let q = sb.from('ryp_cert_attempts').select('*');
    if (certLevel) q = q.eq('cert_level', certLevel);
    const { data, error } = await q.order('created_at', { ascending: false });
    if (error) { console.warn('[cert-attempts] listAll', error); return []; }
    return (data as CertAttempt[]) ?? [];
  } catch (e) {
    console.warn('[cert-attempts] listAll exception', e);
    return [];
  }
}

/** Reduce attempts to best-per-user for a given level. */
export function bestAttemptByUser(attempts: CertAttempt[]): Map<string, CertAttempt> {
  const map = new Map<string, CertAttempt>();
  for (const a of attempts) {
    const prev = map.get(a.user_id);
    if (!prev || a.score_pct > prev.score_pct) map.set(a.user_id, a);
  }
  return map;
}

/** Count attempts per user. */
export function attemptCountByUser(attempts: CertAttempt[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const a of attempts) map.set(a.user_id, (map.get(a.user_id) ?? 0) + 1);
  return map;
}

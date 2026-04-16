/**
 * Shift / hours-worked tracking. Writes to the `ryp_shifts` table.
 * All functions are fire-and-forget safe and never throw.
 */

import { getSupabase } from './supabase';

export interface Shift {
  id: string;
  user_id: string;
  clock_in: string;            // ISO
  clock_out: string | null;    // ISO or null (open shift)
  duration_minutes: number | null;
  location: string | null;
  notes: string | null;
  created_at: string;
}

/** Start a new shift for the given user. Fails silently if an open shift already exists. */
export async function clockIn(userId: string, location: string = 'Meadowbrook'): Promise<Shift | null> {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    // Guard: don't create a second open shift
    const open = await getOpenShift(userId);
    if (open) return open;

    const id = crypto.randomUUID();
    const clock_in = new Date().toISOString();
    const { data, error } = await sb
      .from('ryp_shifts')
      .insert({ id, user_id: userId, clock_in, location })
      .select()
      .single();
    if (error) { console.warn('[shifts] clockIn', error); return null; }
    return data as Shift;
  } catch (e) {
    console.warn('[shifts] clockIn exception', e);
    return null;
  }
}

/** Close the currently open shift for the given user. */
export async function clockOut(userId: string, notes?: string): Promise<Shift | null> {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const open = await getOpenShift(userId);
    if (!open) return null;
    const clock_out = new Date().toISOString();
    const minutes = Math.max(
      0,
      Math.round((new Date(clock_out).getTime() - new Date(open.clock_in).getTime()) / 60000),
    );
    const { data, error } = await sb
      .from('ryp_shifts')
      .update({
        clock_out,
        duration_minutes: minutes,
        ...(notes ? { notes } : {}),
      })
      .eq('id', open.id)
      .select()
      .single();
    if (error) { console.warn('[shifts] clockOut', error); return null; }
    return data as Shift;
  } catch (e) {
    console.warn('[shifts] clockOut exception', e);
    return null;
  }
}

/** Returns the user's currently open shift, or null. */
export async function getOpenShift(userId: string): Promise<Shift | null> {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data, error } = await sb
      .from('ryp_shifts')
      .select('*')
      .eq('user_id', userId)
      .is('clock_out', null)
      .order('clock_in', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) { console.warn('[shifts] getOpenShift', error); return null; }
    return (data as Shift) ?? null;
  } catch (e) {
    console.warn('[shifts] getOpenShift exception', e);
    return null;
  }
}

/** All shifts for a user, newest first. */
export async function getUserShifts(userId: string, limit: number = 200): Promise<Shift[]> {
  const sb = getSupabase();
  if (!sb) return [];
  try {
    const { data, error } = await sb
      .from('ryp_shifts')
      .select('*')
      .eq('user_id', userId)
      .order('clock_in', { ascending: false })
      .limit(limit);
    if (error) { console.warn('[shifts] getUserShifts', error); return []; }
    return (data as Shift[]) ?? [];
  } catch (e) {
    console.warn('[shifts] getUserShifts exception', e);
    return [];
  }
}

export interface ShiftStats {
  totalMinutes: number;
  weekMinutes: number;      // rolling 7 days
  monthMinutes: number;     // rolling 30 days
  openShift: Shift | null;
  completedCount: number;
}

/** Summary stats across a list of shifts + the open shift (if any). */
export function summarizeShifts(shifts: Shift[], open: Shift | null): ShiftStats {
  const now = Date.now();
  const weekMs = 7 * 24 * 3600 * 1000;
  const monthMs = 30 * 24 * 3600 * 1000;

  let totalMinutes = 0;
  let weekMinutes = 0;
  let monthMinutes = 0;
  let completedCount = 0;

  for (const s of shifts) {
    if (s.clock_out && s.duration_minutes != null) {
      totalMinutes += s.duration_minutes;
      completedCount++;
      const t = new Date(s.clock_in).getTime();
      if (now - t <= weekMs) weekMinutes += s.duration_minutes;
      if (now - t <= monthMs) monthMinutes += s.duration_minutes;
    }
  }

  // Count the currently open shift toward the running totals
  if (open) {
    const openMin = Math.max(0, Math.round((now - new Date(open.clock_in).getTime()) / 60000));
    totalMinutes += openMin;
    const t = new Date(open.clock_in).getTime();
    if (now - t <= weekMs) weekMinutes += openMin;
    if (now - t <= monthMs) monthMinutes += openMin;
  }

  return { totalMinutes, weekMinutes, monthMinutes, openShift: open, completedCount };
}

/** "2h 34m" */
export function formatDuration(minutes: number): string {
  if (!minutes || minutes < 0) return '0m';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

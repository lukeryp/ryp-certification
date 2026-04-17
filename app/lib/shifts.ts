/**
 * Hours-worked tracking via manual entries.
 * Writes to the `ryp_hours_entries` table.
 * All functions are fire-and-forget safe and never throw.
 */

import { getSupabase } from './supabase';

export interface HoursEntry {
  id: string;
  user_id: string;
  work_date: string;           // YYYY-MM-DD
  hours: number;               // decimal hours, e.g. 3.5
  location: string | null;
  notes: string | null;
  created_at: string;
}

export interface AddEntryInput {
  userId: string;
  workDate: string;            // YYYY-MM-DD
  hours: number;               // > 0
  location?: string;
  notes?: string;
}

/** Add a manual hours entry. Returns the row, or null on failure. */
export async function addHoursEntry(input: AddEntryInput): Promise<HoursEntry | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const hours = Math.max(0, Number(input.hours));
  if (!hours || !input.userId || !input.workDate) return null;
  try {
    const id = crypto.randomUUID();
    const { data, error } = await sb
      .from('ryp_hours_entries')
      .insert({
        id,
        user_id: input.userId,
        work_date: input.workDate,
        hours,
        location: input.location ?? 'Meadowbrook',
        notes: input.notes ?? null,
      })
      .select()
      .single();
    if (error) { console.warn('[hours] add', error); return null; }
    return data as HoursEntry;
  } catch (e) {
    console.warn('[hours] add exception', e);
    return null;
  }
}

/** Delete a manual hours entry owned by this user. */
export async function deleteHoursEntry(id: string, userId: string): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  try {
    const { error } = await sb
      .from('ryp_hours_entries')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);
    if (error) { console.warn('[hours] delete', error); return false; }
    return true;
  } catch (e) {
    console.warn('[hours] delete exception', e);
    return false;
  }
}

/** All entries for a user, newest work_date first. */
export async function getUserHoursEntries(userId: string, limit: number = 500): Promise<HoursEntry[]> {
  const sb = getSupabase();
  if (!sb) return [];
  try {
    const { data, error } = await sb
      .from('ryp_hours_entries')
      .select('*')
      .eq('user_id', userId)
      .order('work_date', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) { console.warn('[hours] get', error); return []; }
    return ((data ?? []) as HoursEntry[]).map((r) => ({ ...r, hours: Number(r.hours) }));
  } catch (e) {
    console.warn('[hours] get exception', e);
    return [];
  }
}

export interface HoursStats {
  totalHours: number;
  weekHours: number;           // rolling 7 days
  monthHours: number;          // rolling 30 days
  entryCount: number;
}

/** Summary totals across a list of entries. */
export function summarizeHours(entries: HoursEntry[]): HoursStats {
  const now = Date.now();
  const weekMs = 7 * 24 * 3600 * 1000;
  const monthMs = 30 * 24 * 3600 * 1000;

  let totalHours = 0;
  let weekHours = 0;
  let monthHours = 0;

  for (const e of entries) {
    const h = Number(e.hours) || 0;
    totalHours += h;
    const t = new Date(e.work_date + 'T12:00:00').getTime();
    if (now - t <= weekMs) weekHours += h;
    if (now - t <= monthMs) monthHours += h;
  }

  return {
    totalHours: round2(totalHours),
    weekHours: round2(weekHours),
    monthHours: round2(monthHours),
    entryCount: entries.length,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** "3.5h" or "3h 30m"-style display. Prefers decimal hours because that's how users enter them. */
export function formatHours(hours: number): string {
  if (!hours || hours < 0) return '0h';
  // If it's a clean integer, show "3h"
  if (Number.isInteger(hours)) return `${hours}h`;
  return `${round2(hours)}h`;
}

/** Today as a YYYY-MM-DD string in the user's local timezone. */
export function todayLocalISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Human-readable date from a YYYY-MM-DD string. */
export function formatWorkDate(iso: string): string {
  // Interpret as local calendar date (avoid UTC off-by-one)
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

/** Admin: all hours entries across all users, newest first. */
export async function listAllHoursEntries(): Promise<HoursEntry[]> {
  const sb = getSupabase();
  if (!sb) return [];
  try {
    const { data, error } = await sb
      .from('ryp_hours_entries')
      .select('*')
      .order('work_date', { ascending: false });
    if (error) { console.warn('[shifts] listAll', error); return []; }
    return (data as HoursEntry[]) ?? [];
  } catch (e) {
    console.warn('[shifts] listAll exception', e);
    return [];
  }
}

/** Total hours per user_id. */
export function totalHoursByUser(entries: HoursEntry[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const e of entries) {
    map.set(e.user_id, round2((map.get(e.user_id) ?? 0) + Number(e.hours || 0)));
  }
  return map;
}

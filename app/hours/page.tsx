'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Nav from '../components/Nav';
import { getCurrentUser } from '../lib/storage';
import { syncAuthSessionToProfile } from '../lib/auth';
import {
  addHoursEntry,
  deleteHoursEntry,
  getUserHoursEntries,
  summarizeHours,
  formatHours,
  formatWorkDate,
  todayLocalISO,
  type HoursEntry,
  type HoursStats,
} from '../lib/shifts';
import type { UserProfile } from '../lib/types';

export default function HoursPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<HoursEntry[]>([]);
  const [busy, setBusy] = useState(false);

  // Form state
  const [workDate, setWorkDate] = useState(todayLocalISO());
  const [hoursStr, setHoursStr] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const authProfile = await syncAuthSessionToProfile();
      const u = authProfile ?? getCurrentUser();
      if (cancelled) return;
      if (!u) {
        router.replace('/login?redirect=/hours');
        return;
      }
      setUser(u);
      const e = await getUserHoursEntries(u.id);
      if (cancelled) return;
      setEntries(e);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [router]);

  const stats: HoursStats = useMemo(() => summarizeHours(entries), [entries]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!user) return;
    const hoursNum = Number(hoursStr);
    if (!workDate) { setFormError('Pick a date.'); return; }
    if (!hoursNum || hoursNum <= 0) { setFormError('Enter hours worked (e.g. 3.5).'); return; }
    if (hoursNum > 24) { setFormError('That’s more than 24 hours in a day.'); return; }

    setBusy(true);
    const row = await addHoursEntry({
      userId: user.id,
      workDate,
      hours: hoursNum,
      notes: notes.trim() || undefined,
    });
    if (row) {
      setEntries((prev) => [row, ...prev]);
      setHoursStr('');
      setNotes('');
    } else {
      setFormError('Couldn’t save that entry — try again.');
    }
    setBusy(false);
  }, [user, workDate, hoursStr, notes]);

  const handleDelete = useCallback(async (id: string) => {
    if (!user) return;
    const ok = await deleteHoursEntry(id, user.id);
    if (ok) setEntries((prev) => prev.filter((e) => e.id !== id));
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-[#9ca3af] flex items-center justify-center"
        style={{ fontFamily: 'var(--font-work-sans)' }}>
        Loading your hours…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] relative overflow-hidden">
      <GridBackground />
      <Nav />

      <div className="relative z-10 max-w-3xl mx-auto px-5 py-10 sm:py-14">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#00af51] mb-1"
              style={{ fontFamily: 'var(--font-raleway)' }}>
              Hours Worked
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white"
              style={{ fontFamily: 'var(--font-raleway)' }}>
              {user?.name?.split(' ')[0] ?? 'Staff'} — Log Hours
            </h1>
            <p className="text-sm text-[#9ca3af] mt-1"
              style={{ fontFamily: 'var(--font-work-sans)' }}>
              Meadowbrook · ICC Junior League
            </p>
          </div>
          <Link href="/dashboard" className="text-xs text-[#9ca3af] hover:text-white transition-colors">
            Dashboard →
          </Link>
        </div>

        {/* Log hours form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6 sm:p-7 mb-8"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          <div className="text-xs uppercase tracking-[0.2em] text-[#9ca3af] mb-4"
            style={{ fontFamily: 'var(--font-raleway)' }}>
            Log a shift
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-3 mb-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] mb-1.5">
                Date
              </label>
              <input
                type="date"
                value={workDate}
                onChange={(e) => setWorkDate(e.target.value)}
                max={todayLocalISO()}
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontFamily: 'var(--font-work-sans)',
                  colorScheme: 'dark',
                }}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] mb-1.5">
                Hours
              </label>
              <input
                type="number"
                inputMode="decimal"
                step="0.25"
                min="0"
                max="24"
                placeholder="3.5"
                value={hoursStr}
                onChange={(e) => setHoursStr(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none placeholder-[#4b5563]"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontFamily: 'var(--font-work-sans)',
                }}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] mb-1.5">
              Notes (optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Tuesday session – 6 kids on the range"
              className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none placeholder-[#4b5563]"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                fontFamily: 'var(--font-work-sans)',
              }}
            />
          </div>

          {formError && (
            <p className="text-sm text-red-400 mb-3" style={{ fontFamily: 'var(--font-work-sans)' }}>
              {formError}
            </p>
          )}

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="text-xs text-[#6b7280]" style={{ fontFamily: 'var(--font-work-sans)' }}>
              Enter in 0.25 increments (e.g. 1.25, 1.5, 1.75, 2.0)
            </div>
            <button
              type="submit"
              disabled={busy}
              className="px-6 py-3 rounded-xl text-sm font-bold text-[#0d0d0d] transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
              style={{
                background: 'linear-gradient(135deg, #00af51, #00d466)',
                fontFamily: 'var(--font-raleway)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                boxShadow: '0 10px 40px -10px rgba(0,175,81,0.5)',
              }}
            >
              Save Hours
            </button>
          </div>
        </form>

        {/* Totals */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          <StatCard label="This week" value={formatHours(stats.weekHours)} />
          <StatCard label="Last 30 days" value={formatHours(stats.monthHours)} />
          <StatCard label="All time" value={formatHours(stats.totalHours)} accent />
        </div>

        {/* History */}
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#9ca3af]"
              style={{ fontFamily: 'var(--font-raleway)' }}>
              Logged Hours
            </h2>
            <span className="text-xs text-[#6b7280]">{stats.entryCount} entries</span>
          </div>

          {entries.length === 0 ? (
            <div
              className="rounded-xl p-6 text-sm text-[#9ca3af]"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px dashed rgba(255,255,255,0.1)',
                fontFamily: 'var(--font-work-sans)',
              }}
            >
              No hours logged yet. Use the form above to add your first shift.
            </div>
          ) : (
            <div className="space-y-2">
              {entries.map((e) => (
                <EntryRow key={e.id} entry={e} onDelete={() => handleDelete(e.id)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: accent
          ? 'linear-gradient(135deg, rgba(0,175,81,0.15), rgba(0,175,81,0.05))'
          : 'rgba(255,255,255,0.03)',
        border: accent ? '1px solid rgba(0,175,81,0.35)' : '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="text-[10px] uppercase tracking-[0.2em] text-[#9ca3af] mb-1"
        style={{ fontFamily: 'var(--font-raleway)' }}>
        {label}
      </div>
      <div className="text-2xl font-black text-white"
        style={{ fontFamily: 'var(--font-raleway)' }}>
        {value}
      </div>
    </div>
  );
}

function EntryRow({ entry, onDelete }: { entry: HoursEntry; onDelete: () => void }) {
  return (
    <div
      className="rounded-xl px-4 py-3 flex items-center justify-between gap-3"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        fontFamily: 'var(--font-work-sans)',
      }}
    >
      <div className="min-w-0 flex-1">
        <div className="text-sm text-white">
          {formatWorkDate(entry.work_date)}
          {entry.location ? <span className="text-[#6b7280]"> · {entry.location}</span> : null}
        </div>
        {entry.notes ? (
          <div className="text-xs text-[#9ca3af] mt-0.5 truncate">{entry.notes}</div>
        ) : null}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <div
          className="text-sm font-bold"
          style={{ color: '#00d466', fontFamily: 'var(--font-raleway)' }}
        >
          {formatHours(entry.hours)}
        </div>
        <button
          type="button"
          onClick={onDelete}
          aria-label="Delete entry"
          className="text-[11px] text-[#6b7280] hover:text-red-400 transition-colors px-2 py-1 rounded"
          style={{ fontFamily: 'var(--font-work-sans)' }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function GridBackground() {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,175,81,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,175,81,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div
        className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,175,81,0.06) 0%, transparent 70%)' }}
      />
    </>
  );
}

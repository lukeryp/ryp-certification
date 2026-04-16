'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Nav from '../components/Nav';
import { getCurrentUser } from '../lib/storage';
import { syncAuthSessionToProfile } from '../lib/auth';
import {
  clockIn,
  clockOut,
  getOpenShift,
  getUserShifts,
  summarizeShifts,
  formatDuration,
  type Shift,
  type ShiftStats,
} from '../lib/shifts';
import type { UserProfile } from '../lib/types';

export default function HoursPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [open, setOpen] = useState<Shift | null>(null);
  const [busy, setBusy] = useState(false);
  const [now, setNow] = useState<number>(() => Date.now());

  // Boot: pick up Supabase Auth if present, else fall back to local user
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
      const [s, o] = await Promise.all([getUserShifts(u.id), getOpenShift(u.id)]);
      if (cancelled) return;
      setShifts(s);
      setOpen(o);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  // Live timer while a shift is open
  useEffect(() => {
    if (!open) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [open]);

  const stats: ShiftStats = useMemo(
    () => summarizeShifts(shifts, open),
    // recompute every 60s while open via `now`
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [shifts, open, now],
  );

  const openElapsed = open
    ? formatDuration(Math.max(0, Math.round((now - new Date(open.clock_in).getTime()) / 60000)))
    : null;

  const handleClockIn = useCallback(async () => {
    if (!user) return;
    setBusy(true);
    const s = await clockIn(user.id);
    if (s) setOpen(s);
    setBusy(false);
  }, [user]);

  const handleClockOut = useCallback(async () => {
    if (!user) return;
    setBusy(true);
    const closed = await clockOut(user.id);
    if (closed) {
      setOpen(null);
      // Refresh list
      const s = await getUserShifts(user.id);
      setShifts(s);
    }
    setBusy(false);
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-[#9ca3af] flex items-center justify-center"
        style={{ fontFamily: 'var(--font-work-sans)' }}>
        Loading your shifts…
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
              {user?.name?.split(' ')[0] ?? 'Staff'} — Clock In / Out
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

        {/* Clock card */}
        <div
          className="rounded-2xl p-6 sm:p-8 mb-8"
          style={{
            background: open
              ? 'linear-gradient(135deg, rgba(0,175,81,0.18), rgba(0,175,81,0.08))'
              : 'rgba(255,255,255,0.03)',
            border: open ? '1px solid rgba(0,175,81,0.45)' : '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {open ? (
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#00d466] mb-2"
                style={{ fontFamily: 'var(--font-raleway)' }}>
                On the clock
              </div>
              <div className="text-5xl sm:text-6xl font-black text-white tracking-tight"
                style={{ fontFamily: 'var(--font-raleway)' }}>
                {openElapsed}
              </div>
              <div className="text-sm text-[#9ca3af] mt-2"
                style={{ fontFamily: 'var(--font-work-sans)' }}>
                Started {formatClockTime(open.clock_in)}
              </div>
              <button
                onClick={handleClockOut}
                disabled={busy}
                className="mt-6 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
                style={{
                  background: '#f4ee19',
                  color: '#0d0d0d',
                  fontFamily: 'var(--font-raleway)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                Clock Out
              </button>
            </div>
          ) : (
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#9ca3af] mb-2"
                style={{ fontFamily: 'var(--font-raleway)' }}>
                Not clocked in
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white"
                style={{ fontFamily: 'var(--font-raleway)' }}>
                Ready to start your shift?
              </div>
              <p className="text-sm text-[#9ca3af] mt-2"
                style={{ fontFamily: 'var(--font-work-sans)' }}>
                Hit Clock In when you arrive. Clock Out when you leave. Your totals update live.
              </p>
              <button
                onClick={handleClockIn}
                disabled={busy}
                className="mt-6 px-6 py-3 rounded-xl text-sm font-bold text-[#0d0d0d] transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
                style={{
                  background: 'linear-gradient(135deg, #00af51, #00d466)',
                  fontFamily: 'var(--font-raleway)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  boxShadow: '0 10px 40px -10px rgba(0,175,81,0.5)',
                }}
              >
                Clock In
              </button>
            </div>
          )}
        </div>

        {/* Totals */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          <StatCard label="This week" value={formatDuration(stats.weekMinutes)} />
          <StatCard label="Last 30 days" value={formatDuration(stats.monthMinutes)} />
          <StatCard label="All time" value={formatDuration(stats.totalMinutes)} accent />
        </div>

        {/* Shift history */}
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#9ca3af]"
              style={{ fontFamily: 'var(--font-raleway)' }}>
              Recent Shifts
            </h2>
            <span className="text-xs text-[#6b7280]">{stats.completedCount} completed</span>
          </div>

          {shifts.length === 0 && !open ? (
            <div
              className="rounded-xl p-6 text-sm text-[#9ca3af]"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px dashed rgba(255,255,255,0.1)',
                fontFamily: 'var(--font-work-sans)',
              }}
            >
              No shifts logged yet. Clock in above to start tracking.
            </div>
          ) : (
            <div className="space-y-2">
              {shifts.map((s) => (
                <ShiftRow key={s.id} shift={s} />
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

function ShiftRow({ shift }: { shift: Shift }) {
  const duration = shift.duration_minutes ?? 0;
  const open = !shift.clock_out;
  return (
    <div
      className="rounded-xl px-4 py-3 flex items-center justify-between"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        fontFamily: 'var(--font-work-sans)',
      }}
    >
      <div>
        <div className="text-sm text-white">
          {formatDate(shift.clock_in)}
        </div>
        <div className="text-xs text-[#9ca3af] mt-0.5">
          {formatClockTime(shift.clock_in)}
          {shift.clock_out ? ` → ${formatClockTime(shift.clock_out)}` : ' → open'}
          {shift.location ? ` · ${shift.location}` : ''}
        </div>
      </div>
      <div
        className="text-sm font-bold"
        style={{
          color: open ? '#f4ee19' : '#00d466',
          fontFamily: 'var(--font-raleway)',
        }}
      >
        {open ? 'OPEN' : formatDuration(duration)}
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

function formatClockTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

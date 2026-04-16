'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Nav from '../components/Nav';
import { getCurrentUser } from '../lib/storage';
import { signOutEverywhere, syncAuthSessionToProfile } from '../lib/auth';
import {
  getUserShifts,
  getOpenShift,
  summarizeShifts,
  formatDuration,
  type Shift,
  type ShiftStats,
} from '../lib/shifts';
import { getBestCertAttempt, type CertAttempt } from '../lib/cert-attempts';
import type { UserProfile } from '../lib/types';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [open, setOpen] = useState<Shift | null>(null);
  const [l1Best, setL1Best] = useState<CertAttempt | null>(null);
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const authProfile = await syncAuthSessionToProfile();
      const u = authProfile ?? getCurrentUser();
      if (cancelled) return;
      if (!u) {
        router.replace('/login?redirect=/dashboard');
        return;
      }
      setUser(u);
      const [s, o, l1] = await Promise.all([
        getUserShifts(u.id),
        getOpenShift(u.id),
        getBestCertAttempt(u.id, 'l1'),
      ]);
      if (cancelled) return;
      setShifts(s);
      setOpen(o);
      setL1Best(l1);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  useEffect(() => {
    if (!open) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [open]);

  const stats: ShiftStats = useMemo(
    () => summarizeShifts(shifts, open),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [shifts, open, now],
  );

  const openElapsed = open
    ? formatDuration(Math.max(0, Math.round((now - new Date(open.clock_in).getTime()) / 60000)))
    : null;

  if (loading) {
    return (
      <div
        className="min-h-screen bg-[#0d0d0d] text-[#9ca3af] flex items-center justify-center"
        style={{ fontFamily: 'var(--font-work-sans)' }}
      >
        Loading your dashboard…
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOutEverywhere();
    router.replace('/');
  };

  const l1Percent = l1Best ? Math.round(l1Best.score_pct * 100) : null;
  const l1Passed = l1Best?.passed ?? false;

  return (
    <div className="min-h-screen bg-[#0d0d0d] relative overflow-hidden">
      <GridBackground />
      <Nav />

      <div className="relative z-10 max-w-3xl mx-auto px-5 py-10 sm:py-14">
        <div className="flex items-start justify-between mb-10 flex-wrap gap-3">
          <div>
            <div
              className="text-[10px] uppercase tracking-[0.25em] text-[#00af51] mb-1"
              style={{ fontFamily: 'var(--font-raleway)' }}
            >
              Dashboard
            </div>
            <h1
              className="text-3xl sm:text-4xl font-black text-white"
              style={{ fontFamily: 'var(--font-raleway)' }}
            >
              Hi, {user?.name?.split(' ')[0] ?? 'Staff'}.
            </h1>
            <p
              className="text-sm text-[#9ca3af] mt-1"
              style={{ fontFamily: 'var(--font-work-sans)' }}
            >
              {user?.email}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="text-xs px-3 py-1.5 rounded-lg text-[#9ca3af] hover:text-white transition-colors"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            Sign out
          </button>
        </div>

        {/* Open shift banner */}
        {open && (
          <Link
            href="/hours"
            className="block mb-6 rounded-2xl p-5 transition-transform hover:scale-[1.01]"
            style={{
              background: 'linear-gradient(135deg, rgba(0,175,81,0.18), rgba(0,175,81,0.06))',
              border: '1px solid rgba(0,175,81,0.45)',
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div
                  className="text-[10px] uppercase tracking-[0.25em] text-[#00d466] mb-1"
                  style={{ fontFamily: 'var(--font-raleway)' }}
                >
                  On the clock
                </div>
                <div
                  className="text-2xl font-black text-white"
                  style={{ fontFamily: 'var(--font-raleway)' }}
                >
                  {openElapsed}
                </div>
              </div>
              <div className="text-xs text-[#9ca3af]">Tap to clock out →</div>
            </div>
          </Link>
        )}

        {/* Top row: hours + cert status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Link
            href="/hours"
            className="rounded-2xl p-5 transition-transform hover:scale-[1.01]"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div
              className="text-[10px] uppercase tracking-[0.25em] text-[#9ca3af] mb-2"
              style={{ fontFamily: 'var(--font-raleway)' }}
            >
              Hours this week
            </div>
            <div
              className="text-4xl font-black text-white"
              style={{ fontFamily: 'var(--font-raleway)' }}
            >
              {formatDuration(stats.weekMinutes)}
            </div>
            <div
              className="mt-3 text-xs text-[#9ca3af]"
              style={{ fontFamily: 'var(--font-work-sans)' }}
            >
              {formatDuration(stats.monthMinutes)} last 30 · {formatDuration(stats.totalMinutes)} all time
            </div>
            <div
              className="mt-4 text-xs font-bold text-[#00d466]"
              style={{ fontFamily: 'var(--font-raleway)', letterSpacing: '0.15em' }}
            >
              {open ? 'CLOCK OUT →' : 'CLOCK IN →'}
            </div>
          </Link>

          <div
            className="rounded-2xl p-5"
            style={{
              background: l1Passed
                ? 'linear-gradient(135deg, rgba(0,175,81,0.18), rgba(0,175,81,0.06))'
                : 'rgba(255,255,255,0.03)',
              border: l1Passed
                ? '1px solid rgba(0,175,81,0.45)'
                : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div
              className="text-[10px] uppercase tracking-[0.25em] text-[#9ca3af] mb-2"
              style={{ fontFamily: 'var(--font-raleway)' }}
            >
              L1 · ICC Junior League
            </div>

            {l1Best ? (
              <>
                <div
                  className="text-4xl font-black"
                  style={{
                    color: l1Passed ? '#00d466' : '#f4ee19',
                    fontFamily: 'var(--font-raleway)',
                  }}
                >
                  {l1Percent}%
                </div>
                <div
                  className="mt-1 text-xs text-[#9ca3af]"
                  style={{ fontFamily: 'var(--font-work-sans)' }}
                >
                  {l1Best.correct}/{l1Best.total} · {l1Passed ? 'Certified' : 'Not yet passing'} ·{' '}
                  {new Date(l1Best.created_at).toLocaleDateString()}
                </div>
              </>
            ) : (
              <>
                <div
                  className="text-2xl font-black text-white"
                  style={{ fontFamily: 'var(--font-raleway)' }}
                >
                  Not taken yet
                </div>
                <div
                  className="mt-1 text-xs text-[#9ca3af]"
                  style={{ fontFamily: 'var(--font-work-sans)' }}
                >
                  80% required to pass · No time limit
                </div>
              </>
            )}
            <Link
              href="/l1"
              className="inline-block mt-4 text-xs font-bold"
              style={{
                color: l1Passed ? '#00d466' : '#f4ee19',
                fontFamily: 'var(--font-raleway)',
                letterSpacing: '0.15em',
              }}
            >
              {l1Best ? 'RETAKE EXAM →' : 'TAKE THE EXAM →'}
            </Link>
          </div>
        </div>

        {/* Recent shifts */}
        <div className="mt-6">
          <div className="flex items-baseline justify-between mb-3">
            <h2
              className="text-xs font-bold uppercase tracking-[0.25em] text-[#9ca3af]"
              style={{ fontFamily: 'var(--font-raleway)' }}
            >
              Recent Shifts
            </h2>
            <Link href="/hours" className="text-xs text-[#9ca3af] hover:text-white transition-colors">
              View all →
            </Link>
          </div>

          {shifts.length === 0 ? (
            <div
              className="rounded-xl p-6 text-sm text-[#9ca3af]"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px dashed rgba(255,255,255,0.1)',
                fontFamily: 'var(--font-work-sans)',
              }}
            >
              No shifts logged yet. Head to{' '}
              <Link href="/hours" className="text-[#00d466] underline">
                /hours
              </Link>{' '}
              to clock in.
            </div>
          ) : (
            <div className="space-y-2">
              {shifts.slice(0, 5).map((s) => (
                <ShiftRow key={s.id} shift={s} />
              ))}
            </div>
          )}
        </div>
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
        <div className="text-sm text-white">{formatDate(shift.clock_in)}</div>
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

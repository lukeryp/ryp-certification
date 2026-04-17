'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Nav from '../components/Nav';
import { getCurrentUser } from '../lib/storage';
import { signOutEverywhere, syncAuthSessionToProfile } from '../lib/auth';
import {
  getUserHoursEntries,
  summarizeHours,
  formatHours,
  formatWorkDate,
  type HoursEntry,
  type HoursStats,
} from '../lib/shifts';
import { getBestCertAttempt, type CertAttempt } from '../lib/cert-attempts';
import type { UserProfile } from '../lib/types';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<HoursEntry[]>([]);
  const [l1Best, setL1Best] = useState<CertAttempt | null>(null);

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
      const [e, l1] = await Promise.all([
        getUserHoursEntries(u.id),
        getBestCertAttempt(u.id, 'l1'),
      ]);
      if (cancelled) return;
      setEntries(e);
      setL1Best(l1);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  const stats: HoursStats = useMemo(() => summarizeHours(entries), [entries]);

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
              {formatHours(stats.weekHours)}
            </div>
            <div
              className="mt-3 text-xs text-[#9ca3af]"
              style={{ fontFamily: 'var(--font-work-sans)' }}
            >
              {formatHours(stats.monthHours)} last 30 · {formatHours(stats.totalHours)} all time
            </div>
            <div
              className="mt-4 text-xs font-bold text-[#00d466]"
              style={{ fontFamily: 'var(--font-raleway)', letterSpacing: '0.15em' }}
            >
              LOG HOURS →
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

        {/* Recent entries */}
        <div className="mt-6">
          <div className="flex items-baseline justify-between mb-3">
            <h2
              className="text-xs font-bold uppercase tracking-[0.25em] text-[#9ca3af]"
              style={{ fontFamily: 'var(--font-raleway)' }}
            >
              Recent Hours
            </h2>
            <Link href="/hours" className="text-xs text-[#9ca3af] hover:text-white transition-colors">
              View all →
            </Link>
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
              No hours logged yet. Head to{' '}
              <Link href="/hours" className="text-[#00d466] underline">
                /hours
              </Link>{' '}
              to log your first shift.
            </div>
          ) : (
            <div className="space-y-2">
              {entries.slice(0, 5).map((e) => (
                <EntryRow key={e.id} entry={e} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EntryRow({ entry }: { entry: HoursEntry }) {
  return (
    <div
      className="rounded-xl px-4 py-3 flex items-center justify-between"
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
      <div
        className="text-sm font-bold shrink-0"
        style={{ color: '#00d466', fontFamily: 'var(--font-raleway)' }}
      >
        {formatHours(entry.hours)}
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

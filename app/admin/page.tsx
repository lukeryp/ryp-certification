'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Nav from '../components/Nav';
import { getCurrentUser } from '../lib/storage';
import { syncAuthSessionToProfile } from '../lib/auth';
import { listAllUsers } from '../lib/db';
import {
  listAllCertAttempts,
  bestAttemptByUser,
  attemptCountByUser,
  type CertAttempt,
} from '../lib/cert-attempts';
import {
  listAllHoursEntries,
  totalHoursByUser,
  formatHours,
  type HoursEntry,
} from '../lib/shifts';
import type { UserProfile } from '../lib/types';

type Row = {
  user: UserProfile;
  best: CertAttempt | null;
  attemptCount: number;
  totalHours: number;
};

type SortKey = 'name' | 'score' | 'hours' | 'date';

export default function AdminPage() {
  const router = useRouter();
  const [me, setMe] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Row[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>('score');
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const authProfile = await syncAuthSessionToProfile();
      const u = authProfile ?? getCurrentUser();
      if (cancelled) return;
      if (!u) {
        router.replace('/login?redirect=/admin');
        return;
      }
      if (u.role !== 'admin') {
        router.replace('/dashboard');
        return;
      }
      setMe(u);

      const [users, attempts, hours] = await Promise.all([
        listAllUsers(),
        listAllCertAttempts('l1'),
        listAllHoursEntries(),
      ]);
      if (cancelled) return;

      const bestMap = bestAttemptByUser(attempts);
      const countMap = attemptCountByUser(attempts);
      const hoursMap = totalHoursByUser(hours);

      const built: Row[] = users.map((user) => ({
        user,
        best: bestMap.get(user.id) ?? null,
        attemptCount: countMap.get(user.id) ?? 0,
        totalHours: hoursMap.get(user.id) ?? 0,
      }));

      setRows(built);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? rows.filter(
          (r) =>
            r.user.name.toLowerCase().includes(q) || r.user.email.toLowerCase().includes(q),
        )
      : rows;

    const sorted = [...base].sort((a, b) => {
      switch (sortKey) {
        case 'name':
          return a.user.name.localeCompare(b.user.name);
        case 'hours':
          return b.totalHours - a.totalHours;
        case 'date': {
          const aT = a.best ? new Date(a.best.created_at).getTime() : 0;
          const bT = b.best ? new Date(b.best.created_at).getTime() : 0;
          return bT - aT;
        }
        case 'score':
        default: {
          const aS = a.best?.score_pct ?? -1;
          const bS = b.best?.score_pct ?? -1;
          return bS - aS;
        }
      }
    });
    return sorted;
  }, [rows, query, sortKey]);

  const stats = useMemo(() => {
    const taken = rows.filter((r) => r.best).length;
    const passed = rows.filter((r) => r.best?.passed).length;
    const totalHrs = rows.reduce((sum, r) => sum + r.totalHours, 0);
    return { users: rows.length, taken, passed, totalHrs: Math.round(totalHrs * 100) / 100 };
  }, [rows]);

  if (loading) {
    return (
      <div
        className="min-h-screen bg-[#0d0d0d] text-[#9ca3af] flex items-center justify-center"
        style={{ fontFamily: 'var(--font-work-sans)' }}
      >
        Loading admin view…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] relative overflow-hidden">
      <GridBackground />
      <Nav />

      <div className="relative z-10 max-w-6xl mx-auto px-5 py-10 sm:py-14">
        <div className="flex items-start justify-between mb-10 flex-wrap gap-3">
          <div>
            <div
              className="text-[10px] uppercase tracking-[0.25em] text-[#f4ee19] mb-1"
              style={{ fontFamily: 'var(--font-raleway)' }}
            >
              Admin · Staff Results
            </div>
            <h1
              className="text-3xl sm:text-4xl font-black text-white"
              style={{ fontFamily: 'var(--font-raleway)' }}
            >
              L1 Certification & Hours
            </h1>
            <p
              className="text-sm text-[#9ca3af] mt-1"
              style={{ fontFamily: 'var(--font-work-sans)' }}
            >
              {me?.email}
            </p>
          </div>
          <Link
            href="/dashboard"
            className="text-xs px-3 py-1.5 rounded-lg text-[#9ca3af] hover:text-white transition-colors"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            ← Dashboard
          </Link>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <StatCard label="Staff" value={String(stats.users)} />
          <StatCard label="Took L1" value={String(stats.taken)} accent="#00d466" />
          <StatCard label="Passed" value={String(stats.passed)} accent="#00d466" />
          <StatCard label="Hours logged" value={formatHours(stats.totalHrs)} accent="#f4ee19" />
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Search name or email…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 min-w-[220px] px-4 py-2.5 rounded-xl text-white text-sm outline-none placeholder-[#4b5563]"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              fontFamily: 'var(--font-work-sans)',
            }}
          />
          <div className="flex items-center gap-1 text-xs">
            <SortButton active={sortKey === 'score'} onClick={() => setSortKey('score')}>
              Score
            </SortButton>
            <SortButton active={sortKey === 'name'} onClick={() => setSortKey('name')}>
              Name
            </SortButton>
            <SortButton active={sortKey === 'hours'} onClick={() => setSortKey('hours')}>
              Hours
            </SortButton>
            <SortButton active={sortKey === 'date'} onClick={() => setSortKey('date')}>
              Date
            </SortButton>
          </div>
        </div>

        {/* Table */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div
            className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-3 px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-[#6b7280] border-b"
            style={{
              borderColor: 'rgba(255,255,255,0.06)',
              fontFamily: 'var(--font-raleway)',
            }}
          >
            <div>Staff</div>
            <div>L1 Score</div>
            <div>Status</div>
            <div>Attempts</div>
            <div>Hours</div>
          </div>

          {filtered.length === 0 ? (
            <div
              className="px-5 py-8 text-sm text-[#9ca3af] text-center"
              style={{ fontFamily: 'var(--font-work-sans)' }}
            >
              No staff match that search.
            </div>
          ) : (
            filtered.map((row) => <ResultRow key={row.user.id} row={row} />)
          )}
        </div>

        <p
          className="mt-4 text-xs text-[#6b7280]"
          style={{ fontFamily: 'var(--font-work-sans)' }}
        >
          Shows best L1 attempt per staff member. 80% required to pass.
        </p>
      </div>
    </div>
  );
}

function ResultRow({ row }: { row: Row }) {
  const { user, best, attemptCount, totalHours } = row;
  const pct = best ? Math.round(best.score_pct * 100) : null;
  const passed = best?.passed ?? false;
  const taken = Boolean(best);

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-3 px-5 py-4 items-center border-b last:border-b-0"
      style={{
        borderColor: 'rgba(255,255,255,0.04)',
        fontFamily: 'var(--font-work-sans)',
      }}
    >
      <div className="col-span-2 sm:col-span-1 min-w-0">
        <div className="text-sm font-semibold text-white truncate">{user.name || 'Unnamed'}</div>
        <div className="text-xs text-[#9ca3af] truncate">{user.email}</div>
        {best && (
          <div className="text-[10px] text-[#6b7280] mt-0.5">
            Best: {new Date(best.created_at).toLocaleDateString()}
          </div>
        )}
      </div>

      <div>
        <div className="sm:hidden text-[10px] uppercase tracking-widest text-[#6b7280] mb-0.5">
          Score
        </div>
        {taken ? (
          <div
            className="text-xl font-black"
            style={{
              color: passed ? '#00d466' : '#f4ee19',
              fontFamily: 'var(--font-raleway)',
            }}
          >
            {pct}%
          </div>
        ) : (
          <div className="text-sm text-[#6b7280]">—</div>
        )}
        {best && (
          <div className="text-[10px] text-[#6b7280]">
            {best.correct}/{best.total}
          </div>
        )}
      </div>

      <div>
        <div className="sm:hidden text-[10px] uppercase tracking-widest text-[#6b7280] mb-0.5">
          Status
        </div>
        {taken ? (
          <span
            className="inline-block text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest"
            style={{
              background: passed ? 'rgba(0,212,102,0.15)' : 'rgba(244,238,25,0.12)',
              color: passed ? '#00d466' : '#f4ee19',
              border: `1px solid ${passed ? 'rgba(0,212,102,0.4)' : 'rgba(244,238,25,0.35)'}`,
              fontFamily: 'var(--font-raleway)',
            }}
          >
            {passed ? 'Certified' : 'Not passing'}
          </span>
        ) : (
          <span
            className="inline-block text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest text-[#6b7280]"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              fontFamily: 'var(--font-raleway)',
            }}
          >
            Not taken
          </span>
        )}
      </div>

      <div>
        <div className="sm:hidden text-[10px] uppercase tracking-widest text-[#6b7280] mb-0.5">
          Attempts
        </div>
        <div className="text-sm text-white">{attemptCount}</div>
      </div>

      <div>
        <div className="sm:hidden text-[10px] uppercase tracking-widest text-[#6b7280] mb-0.5">
          Hours
        </div>
        <div
          className="text-sm font-bold"
          style={{ color: '#00d466', fontFamily: 'var(--font-raleway)' }}
        >
          {formatHours(totalHours)}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent = '#ffffff',
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        className="text-[10px] uppercase tracking-[0.25em] text-[#9ca3af] mb-1.5"
        style={{ fontFamily: 'var(--font-raleway)' }}
      >
        {label}
      </div>
      <div
        className="text-2xl font-black"
        style={{ color: accent, fontFamily: 'var(--font-raleway)' }}
      >
        {value}
      </div>
    </div>
  );
}

function SortButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-lg font-bold uppercase tracking-widest transition-colors"
      style={{
        background: active ? 'rgba(0,175,81,0.18)' : 'rgba(255,255,255,0.04)',
        border: active ? '1px solid rgba(0,175,81,0.45)' : '1px solid rgba(255,255,255,0.08)',
        color: active ? '#00d466' : '#9ca3af',
        fontFamily: 'var(--font-raleway)',
        letterSpacing: '0.12em',
      }}
    >
      {children}
    </button>
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
        className="absolute top-[-150px] right-[-150px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(244,238,25,0.05) 0%, transparent 70%)' }}
      />
    </>
  );
}

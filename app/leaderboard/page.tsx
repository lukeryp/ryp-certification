'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Nav from '../components/Nav';
import { getCurrentUser, getAllProgress, getCompletionPercentage } from '../lib/storage';
import { getAllProgressFromDB } from '../lib/db';
import { supabaseConfigured } from '../lib/supabase';
import { CHAPTERS } from '../lib/chapters';
import { UserProfile, UserProgress } from '../lib/types';

export default function LeaderboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [allProgress, setAllProgress] = useState<{ user: UserProfile; progress: UserProgress }[]>([]);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  async function loadProgress() {
    if (supabaseConfigured) {
      const data = await getAllProgressFromDB();
      setAllProgress(data.length > 0 ? data : getAllProgress());
    } else {
      setAllProgress(getAllProgress());
    }
    setLastRefresh(new Date());
  }

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) { router.push('/login?redirect=/l3'); return; }
    setUser(u);
    loadProgress();

    // Auto-refresh every 30s when Supabase is configured
    if (supabaseConfigured) {
      const interval = setInterval(loadProgress, 30_000);
      return () => clearInterval(interval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  if (!user) return null;

  const sorted = [...allProgress].sort((a, b) =>
    getCompletionPercentage(b.progress) - getCompletionPercentage(a.progress)
  );

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <Nav level="l3" />
      <main className="max-w-4xl mx-auto px-4 py-6 pb-12">
        <div className="mb-6">
          <Link href="/l3" className="text-xs text-[#6b7280] hover:text-white transition-colors">← Dashboard</Link>
          <div className="flex items-center justify-between mt-2">
            <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-raleway)' }}>
              Interlachen Cohort
            </h1>
            {supabaseConfigured && (
              <button onClick={loadProgress}
                className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.08)' }}>
                ↻ Refresh
              </button>
            )}
          </div>
          <p className="text-[#6b7280] text-sm mt-1">
            Everyone sees everyone. Progress together.
            {lastRefresh && supabaseConfigured && (
              <span className="ml-2 text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
                · updated {lastRefresh.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </p>
        </div>

        {sorted.length === 0 ? (
          <div className="rounded-2xl p-8 text-center"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-[#6b7280]">No cohort members yet. Progress will appear as people log in and take quizzes.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sorted.map((entry, rank) => {
              const comp = getCompletionPercentage(entry.progress);
              const passedCount = Object.values(entry.progress.chapterResults).filter(r => r.passed).length;
              const isMe = entry.user.id === user.id;

              return (
                <div key={entry.user.id} className="rounded-2xl p-5 transition-all"
                  style={{
                    background: isMe ? 'rgba(244,238,25,0.05)' : 'rgba(255,255,255,0.02)',
                    border: isMe ? '1px solid rgba(244,238,25,0.2)' : '1px solid rgba(255,255,255,0.06)',
                  }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
                        style={{
                          background: rank === 0 ? 'rgba(244,238,25,0.15)' : rank === 1 ? 'rgba(156,163,175,0.15)' : rank === 2 ? 'rgba(180,120,60,0.15)' : 'rgba(255,255,255,0.05)',
                          color: rank === 0 ? '#f4ee19' : rank === 1 ? '#9ca3af' : rank === 2 ? '#b4783c' : '#6b7280',
                          border: rank < 3 ? '1px solid currentColor' : '1px solid rgba(255,255,255,0.08)',
                          fontFamily: 'var(--font-raleway)',
                        }}>
                        {rank + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-white text-sm" style={{ fontFamily: 'var(--font-raleway)' }}>
                          {entry.user.name}
                          {isMe && <span className="text-xs ml-2" style={{ color: '#f4ee19' }}>(you)</span>}
                        </p>
                        <p className="text-xs text-[#6b7280]">{entry.user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-white" style={{ fontFamily: 'var(--font-raleway)' }}>{comp}%</p>
                      <p className="text-xs text-[#6b7280]">{passedCount}/17 chapters</p>
                    </div>
                  </div>

                  {/* Chapter progress dots */}
                  <div className="flex gap-0.5">
                    {CHAPTERS.map(ch => {
                      const result = entry.progress.chapterResults[ch.number];
                      return (
                        <div key={ch.number}
                          title={`Ch ${ch.number}: ${ch.title} — ${result?.passed ? 'Passed' : result?.attempts > 0 ? `Best: ${result.bestScore}/10` : 'Not started'}`}
                          className="flex-1 h-1.5 rounded-full transition-all"
                          style={{
                            background: result?.passed ? '#f4ee19' : result?.attempts > 0 ? '#f59e0b' : 'rgba(255,255,255,0.08)',
                          }} />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

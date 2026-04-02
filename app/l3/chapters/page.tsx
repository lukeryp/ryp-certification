'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Nav from '../../components/Nav';
import { getCurrentUser, getUserProgress } from '../../lib/storage';
import { CHAPTERS } from '../../lib/chapters';
import { UserProfile, UserProgress } from '../../lib/types';

export default function ChaptersPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) { router.push('/login?redirect=/l3'); return; }
    setUser(u);
    setProgress(getUserProgress(u.id));
  }, [router]);

  if (!user || !progress) return null;

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <Nav level="l3" />
      <main className="max-w-4xl mx-auto px-4 py-6 pb-12">
        <div className="mb-6">
          <Link href="/l3" className="text-xs text-[#6b7280] hover:text-white transition-colors">← Dashboard</Link>
          <h1 className="text-2xl font-black text-white mt-2" style={{ fontFamily: 'var(--font-raleway)' }}>All Chapters</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {CHAPTERS.map(ch => {
            const result = progress.chapterResults[ch.number];
            const status = result?.passed ? 'passed' : result?.attempts > 0 ? 'attempted' : 'not_started';
            return (
              <Link key={ch.number} href={`/l3/chapters/${ch.number}`}>
                <div className="p-4 rounded-xl transition-all duration-200 hover:scale-[1.01]"
                  style={{
                    background: status === 'passed' ? 'rgba(244,238,25,0.05)' : status === 'attempted' ? 'rgba(251,191,36,0.04)' : 'rgba(255,255,255,0.02)',
                    border: status === 'passed' ? '1px solid rgba(244,238,25,0.2)' : status === 'attempted' ? '1px solid rgba(251,191,36,0.15)' : '1px solid rgba(255,255,255,0.06)',
                  }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#6b7280]">Chapter {ch.number}</span>
                    {status === 'passed' && <span style={{ color: '#f4ee19' }}>✓</span>}
                    {status === 'attempted' && result && <span className="text-amber-400 text-xs">{result.bestScore}/10</span>}
                  </div>
                  <p className="font-bold text-white" style={{ fontFamily: 'var(--font-raleway)' }}>{ch.title}</p>
                  <p className="text-xs text-[#6b7280] mt-1 line-clamp-2">{ch.summary}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

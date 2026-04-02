'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Nav from '../components/Nav';
import { getCurrentUser, getUserProgress, getCompletionPercentage } from '../lib/storage';
import { CHAPTERS } from '../lib/chapters';
import { UserProfile, UserProgress } from '../lib/types';

export default function L3Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) {
      router.push('/login?redirect=/l3');
      return;
    }
    setUser(u);
    setProgress(getUserProgress(u.id));
  }, [router]);

  if (!user || !progress) return null;

  const completion = getCompletionPercentage(progress);
  const passedCount = Object.values(progress.chapterResults).filter(r => r.passed).length;
  const nextChapter = CHAPTERS.find(ch => !progress.chapterResults[ch.number]?.passed);

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <Nav level="l3" />
      <main className="max-w-4xl mx-auto px-4 py-6 pb-12">
        {/* Header */}
        <div className="mb-8 mt-2">
          <div className="flex items-center gap-3 mb-1">
            <Link href="/" className="text-xs text-[#6b7280] hover:text-white transition-colors">← All Levels</Link>
          </div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-raleway)' }}>
            Welcome, {user.name.split(' ')[0]}
          </h1>
          <p className="text-[#6b7280] text-sm mt-1">Level 3 — Golf Textbook Certification</p>
        </div>

        {/* Textbook PDF link */}
        <div className="mb-6">
          <a
            href="https://rypgolf.com/textbook.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm transition-colors"
            style={{ color: '#f4ee19', opacity: 0.8 }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '1'}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '0.8'}
          >
            <span>↓</span>
            <span>Download The Golf Textbook (Latest Draft)</span>
          </a>
        </div>

        {/* Progress */}
        <div className="rounded-2xl p-6 mb-6"
          style={{ background: 'rgba(244,238,25,0.04)', border: '1px solid rgba(244,238,25,0.12)' }}>
          <div className="flex items-center gap-6">
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke="#f4ee19"
                  strokeWidth="8"
                  strokeDasharray={`${completion * 2.64} 264`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-black text-white">{completion}%</span>
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-white" style={{ fontFamily: 'var(--font-raleway)' }}>
                {passedCount}/17
              </div>
              <div className="text-[#6b7280] text-sm">Chapters Passed</div>
              <div className="text-[#6b7280] text-xs mt-1">90% pass standard per chapter</div>
            </div>
            {completion === 100 && (
              <div className="ml-auto">
                <div className="px-4 py-2 rounded-xl text-sm font-bold"
                  style={{ background: 'rgba(244,238,25,0.1)', border: '1px solid rgba(244,238,25,0.3)', color: '#f4ee19' }}>
                  ✓ Level 3 Certified
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Continue */}
        {nextChapter && (
          <Link href={`/l3/chapters/${nextChapter.number}`} className="block mb-6">
            <div className="rounded-2xl p-5 transition-all duration-200 hover:scale-[1.01]"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-xs font-bold tracking-widest mb-1" style={{ color: '#00af51' }}>CONTINUE</p>
              <p className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-raleway)' }}>
                Chapter {nextChapter.number}: {nextChapter.title}
              </p>
              <p className="text-sm text-[#6b7280] mt-1">{nextChapter.summary}</p>
            </div>
          </Link>
        )}

        {/* Chapter grid */}
        <h2 className="text-xs font-bold text-[#6b7280] uppercase tracking-widest mb-3">All Chapters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {CHAPTERS.map(ch => {
            const result = progress.chapterResults[ch.number];
            const status = result?.passed ? 'passed' : result?.attempts > 0 ? 'attempted' : 'not_started';
            return (
              <Link key={ch.number} href={`/l3/chapters/${ch.number}`}>
                <div className={`p-4 rounded-xl transition-all duration-200 hover:scale-[1.01] ${
                  status === 'passed' ? '' : 'hover:border-white/15'
                }`}
                style={{
                  background: status === 'passed' ? 'rgba(244,238,25,0.05)' : status === 'attempted' ? 'rgba(251,191,36,0.04)' : 'rgba(255,255,255,0.02)',
                  border: status === 'passed' ? '1px solid rgba(244,238,25,0.2)' : status === 'attempted' ? '1px solid rgba(251,191,36,0.15)' : '1px solid rgba(255,255,255,0.06)',
                }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#6b7280]">Ch. {ch.number}</span>
                    {status === 'passed' && <span style={{ color: '#f4ee19' }} className="text-sm">✓</span>}
                    {status === 'attempted' && result && <span className="text-amber-400 text-xs">{result.bestScore}/10</span>}
                  </div>
                  <p className="font-semibold text-white text-sm" style={{ fontFamily: 'var(--font-raleway)' }}>{ch.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Nav from './components/Nav';
import { getCurrentUser, getUserProgress, getCompletionPercentage } from './lib/storage';
import { CHAPTERS } from './lib/chapters';
import { UserProfile, UserProgress } from './lib/types';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) {
      router.push('/login');
      return;
    }
    setUser(u);
    setProgress(getUserProgress(u.id));
  }, [router]);

  if (!user || !progress) return null;

  const completion = getCompletionPercentage(progress);
  const passedCount = Object.values(progress.chapterResults).filter(r => r.passed).length;
  const totalAttempts = Object.values(progress.chapterResults).reduce((sum, r) => sum + r.attempts, 0);
  const nextChapter = CHAPTERS.find(ch => !progress.chapterResults[ch.number]?.passed);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Nav />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#e8e4de]">Welcome, {user.name.split(' ')[0]}</h1>
          <p className="text-[#6b6b6b] text-sm">Level 1 Certification Progress</p>
        </div>

        {/* Textbook PDF link */}
        <div className="mb-6">
          <a
            href="https://rypgolf.com/textbook.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#c9b99a] hover:text-[#e8e4de] transition-colors"
          >
            <span>↓</span>
            <span>Download The Golf Textbook (Latest Draft)</span>
          </a>
        </div>

        {/* Progress ring */}
        <div className="bg-[#141414] rounded-xl border border-[#2a2a2a] p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#2a2a2a" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke="#c9b99a"
                  strokeWidth="8"
                  strokeDasharray={`${completion * 2.64} 264`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{completion}%</span>
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#e8e4de]">{passedCount}/17</div>
              <div className="text-[#6b6b6b] text-sm">Chapters Passed</div>
              <div className="text-[#6b6b6b] text-xs mt-1">{totalAttempts} total quiz attempts</div>
            </div>
          </div>
          {completion === 100 && (
            <div className="mt-4 p-3 bg-[#c9b99a]/10 border border-[#c9b99a]/30 rounded-lg text-center">
              <span className="text-[#c9b99a] font-medium">Level 1 Certified</span>
            </div>
          )}
        </div>

        {nextChapter && (
          <Link href={`/chapters/${nextChapter.number}`} className="block mb-6">
            <div className="bg-[#141414] rounded-xl border border-[#2a2a2a] p-5 hover:border-[#c9b99a]/40 transition-colors">
              <p className="text-xs text-[#c9b99a] font-medium mb-1">CONTINUE</p>
              <p className="text-lg font-medium text-[#e8e4de]">
                Chapter {nextChapter.number}: {nextChapter.title}
              </p>
              <p className="text-sm text-[#6b6b6b] mt-1">{nextChapter.summary}</p>
            </div>
          </Link>
        )}

        <h2 className="text-sm font-medium text-[#6b6b6b] uppercase tracking-wider mb-3">All Chapters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CHAPTERS.map(ch => {
            const result = progress.chapterResults[ch.number];
            const status = result?.passed ? 'passed' : result?.attempts > 0 ? 'attempted' : 'not_started';
            return (
              <Link key={ch.number} href={`/chapters/${ch.number}`}>
                <div className={`p-4 rounded-lg border transition-colors ${
                  status === 'passed'
                    ? 'bg-[#c9b99a]/10 border-[#c9b99a]/30'
                    : status === 'attempted'
                    ? 'bg-amber-900/10 border-amber-800/30'
                    : 'bg-[#141414] border-[#2a2a2a] hover:border-[#3a3a3a]'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#6b6b6b]">Ch. {ch.number}</span>
                    {status === 'passed' && <span className="text-[#c9b99a] text-sm">&#10003;</span>}
                    {status === 'attempted' && result && <span className="text-amber-500 text-xs">{result.bestScore}/10</span>}
                  </div>
                  <p className="font-medium text-[#e8e4de] text-sm">{ch.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

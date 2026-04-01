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
          <h1 className="text-2xl font-bold text-gray-100">Welcome, {user.name.split(' ')[0]}</h1>
          <p className="text-gray-500 text-sm">Level 1 Certification Progress</p>
        </div>

        {/* Progress ring */}
        <div className="bg-[#111827] rounded-xl border border-gray-800 p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#1f2937" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke={completion === 100 ? '#22c55e' : '#3b82f6'}
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
              <div className="text-3xl font-bold text-gray-100">{passedCount}/17</div>
              <div className="text-gray-500 text-sm">Chapters Passed</div>
              <div className="text-gray-600 text-xs mt-1">{totalAttempts} total quiz attempts</div>
            </div>
          </div>
          {completion === 100 && (
            <div className="mt-4 p-3 bg-green-900/30 border border-green-800 rounded-lg text-center">
              <span className="text-green-400 font-medium">Level 1 Certified</span>
            </div>
          )}
        </div>

        {nextChapter && (
          <Link href={`/chapters/${nextChapter.number}`} className="block mb-6">
            <div className="bg-[#111827] rounded-xl border border-gray-800 p-5 hover:border-green-800 transition-colors">
              <p className="text-xs text-green-500 font-medium mb-1">CONTINUE</p>
              <p className="text-lg font-medium text-gray-200">
                Chapter {nextChapter.number}: {nextChapter.title}
              </p>
              <p className="text-sm text-gray-500 mt-1">{nextChapter.summary}</p>
            </div>
          </Link>
        )}

        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">All Chapters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CHAPTERS.map(ch => {
            const result = progress.chapterResults[ch.number];
            const status = result?.passed ? 'passed' : result?.attempts > 0 ? 'attempted' : 'not_started';
            return (
              <Link key={ch.number} href={`/chapters/${ch.number}`}>
                <div className={`p-4 rounded-lg border transition-colors ${
                  status === 'passed'
                    ? 'bg-green-900/20 border-green-800/50'
                    : status === 'attempted'
                    ? 'bg-amber-900/10 border-amber-800/30'
                    : 'bg-[#111827] border-gray-800 hover:border-gray-700'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Ch. {ch.number}</span>
                    {status === 'passed' && <span className="text-green-500 text-sm">&#10003;</span>}
                    {status === 'attempted' && result && <span className="text-amber-500 text-xs">{result.bestScore}/10</span>}
                  </div>
                  <p className="font-medium text-gray-200 text-sm">{ch.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

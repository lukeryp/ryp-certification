'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Nav from '../components/Nav';
import { getCurrentUser, getUserProgress } from '../lib/storage';
import { CHAPTERS } from '../lib/chapters';
import { UserProfile, UserProgress } from '../lib/types';

export default function ChaptersPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) { router.push('/login'); return; }
    setUser(u);
    setProgress(getUserProgress(u.id));
  }, [router]);

  if (!user || !progress) return null;

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Nav />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-100 mb-2">Chapters</h1>
        <p className="text-gray-500 text-sm mb-6">17 chapters. 90% to pass each. Complete all for Level 1 Certification.</p>

        <div className="space-y-3">
          {CHAPTERS.map(ch => {
            const result = progress.chapterResults[ch.number];
            const passed = result?.passed;
            const attempted = result?.attempts > 0;

            return (
              <Link key={ch.number} href={`/chapters/${ch.number}`}>
                <div className={`p-5 rounded-xl border transition-colors mb-3 ${
                  passed
                    ? 'bg-green-900/20 border-green-800/40'
                    : attempted
                    ? 'bg-[#111827] border-amber-800/30'
                    : 'bg-[#111827] border-gray-800 hover:border-gray-700'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-medium ${passed ? 'text-green-500' : 'text-gray-500'}`}>
                          Chapter {ch.number}
                        </span>
                        {passed && <span className="text-xs bg-green-900/50 text-green-400 px-2 py-0.5 rounded-full">Passed</span>}
                        {attempted && !passed && result && (
                          <span className="text-xs bg-amber-900/30 text-amber-400 px-2 py-0.5 rounded-full">
                            Best: {result.bestScore}/10
                          </span>
                        )}
                      </div>
                      <p className="font-medium text-gray-200">{ch.title}</p>
                      <p className="text-sm text-gray-500 mt-1">{ch.summary}</p>
                    </div>
                    <span className="text-gray-600 ml-4">&#8250;</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

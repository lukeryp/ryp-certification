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
        <h1 className="text-2xl font-bold text-[#e8e4de] mb-2">Chapters</h1>
        <p className="text-[#6b6b6b] text-sm mb-6">17 chapters. 90% to pass each. Complete all for Level 1 Certification.</p>

        <div className="space-y-3">
          {CHAPTERS.map(ch => {
            const result = progress.chapterResults[ch.number];
            const passed = result?.passed;
            const attempted = result?.attempts > 0;

            return (
              <Link key={ch.number} href={`/chapters/${ch.number}`}>
                <div className={`p-5 rounded-xl border transition-colors mb-3 ${
                  passed
                    ? 'bg-[#c9b99a]/10 border-[#c9b99a]/30'
                    : attempted
                    ? 'bg-[#141414] border-amber-800/30'
                    : 'bg-[#141414] border-[#2a2a2a] hover:border-[#3a3a3a]'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-medium ${passed ? 'text-[#c9b99a]' : 'text-[#6b6b6b]'}`}>
                          Chapter {ch.number}
                        </span>
                        {passed && <span className="text-xs bg-[#c9b99a]/15 text-[#c9b99a] px-2 py-0.5 rounded-full">Passed</span>}
                        {attempted && !passed && result && (
                          <span className="text-xs bg-amber-900/30 text-amber-400 px-2 py-0.5 rounded-full">
                            Best: {result.bestScore}/10
                          </span>
                        )}
                      </div>
                      <p className="font-medium text-[#e8e4de]">{ch.title}</p>
                      <p className="text-sm text-[#6b6b6b] mt-1">{ch.summary}</p>
                    </div>
                    <span className="text-[#6b6b6b] ml-4">&#8250;</span>
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

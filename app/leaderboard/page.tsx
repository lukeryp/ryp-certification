'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '../components/Nav';
import { getCurrentUser, getAllProgress, getCompletionPercentage } from '../lib/storage';
import { CHAPTERS } from '../lib/chapters';
import { UserProfile, UserProgress } from '../lib/types';

export default function LeaderboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [allProgress, setAllProgress] = useState<{ user: UserProfile; progress: UserProgress }[]>([]);

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) { router.push('/login'); return; }
    setUser(u);
    setAllProgress(getAllProgress());
  }, [router]);

  if (!user) return null;

  const sorted = [...allProgress].sort((a, b) => {
    const aComp = getCompletionPercentage(a.progress);
    const bComp = getCompletionPercentage(b.progress);
    return bComp - aComp;
  });

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Nav />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-100 mb-2">Interlachen Cohort</h1>
        <p className="text-gray-500 text-sm mb-6">Everyone sees everyone. Progress together.</p>

        {sorted.length === 0 ? (
          <div className="bg-[#111827] rounded-xl border border-gray-800 p-8 text-center">
            <p className="text-gray-500">No cohort members yet. Progress will appear as people log in and take quizzes.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sorted.map((entry, rank) => {
              const comp = getCompletionPercentage(entry.progress);
              const passedCount = Object.values(entry.progress.chapterResults).filter(r => r.passed).length;
              const isMe = entry.user.id === user.id;

              return (
                <div key={entry.user.id} className={`rounded-xl border p-5 ${
                  isMe ? 'bg-green-900/10 border-green-800/40' : 'bg-[#111827] border-gray-800'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        rank === 0 ? 'bg-yellow-600 text-yellow-100' :
                        rank === 1 ? 'bg-gray-500 text-gray-100' :
                        rank === 2 ? 'bg-amber-700 text-amber-100' :
                        'bg-gray-800 text-gray-400'
                      }`}>
                        {rank + 1}
                      </span>
                      <div>
                        <p className="font-medium text-gray-200">
                          {entry.user.name}
                          {isMe && <span className="text-green-500 text-xs ml-2">(you)</span>}
                        </p>
                        <p className="text-xs text-gray-600">{entry.user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-200">{comp}%</p>
                      <p className="text-xs text-gray-500">{passedCount}/17</p>
                    </div>
                  </div>

                  {/* Chapter progress dots */}
                  <div className="flex gap-1">
                    {CHAPTERS.map(ch => {
                      const result = entry.progress.chapterResults[ch.number];
                      return (
                        <div
                          key={ch.number}
                          title={`Ch ${ch.number}: ${ch.title} — ${result?.passed ? 'Passed' : result?.attempts > 0 ? `Best: ${result.bestScore}/10` : 'Not started'}`}
                          className={`flex-1 h-2 rounded-full ${
                            result?.passed ? 'bg-green-500' :
                            result?.attempts > 0 ? 'bg-amber-500' :
                            'bg-gray-800'
                          }`}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-gray-600">Ch 0</span>
                    <span className="text-[10px] text-gray-600">Ch 16</span>
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

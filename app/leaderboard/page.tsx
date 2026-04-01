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
        <h1 className="text-2xl font-bold text-[#e8e4de] mb-2">Interlachen Cohort</h1>
        <p className="text-[#6b6b6b] text-sm mb-6">Everyone sees everyone. Progress together.</p>

        {sorted.length === 0 ? (
          <div className="bg-[#141414] rounded-xl border border-[#2a2a2a] p-8 text-center">
            <p className="text-[#6b6b6b]">No cohort members yet. Progress will appear as people log in and take quizzes.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sorted.map((entry, rank) => {
              const comp = getCompletionPercentage(entry.progress);
              const passedCount = Object.values(entry.progress.chapterResults).filter(r => r.passed).length;
              const isMe = entry.user.id === user.id;

              return (
                <div key={entry.user.id} className={`rounded-xl border p-5 ${
                  isMe ? 'bg-[#c9b99a]/8 border-[#c9b99a]/30' : 'bg-[#141414] border-[#2a2a2a]'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        rank === 0 ? 'bg-yellow-600 text-yellow-100' :
                        rank === 1 ? 'bg-gray-500 text-gray-100' :
                        rank === 2 ? 'bg-amber-700 text-amber-100' :
                        'bg-[#2a2a2a] text-[#6b6b6b]'
                      }`}>
                        {rank + 1}
                      </span>
                      <div>
                        <p className="font-medium text-[#e8e4de]">
                          {entry.user.name}
                          {isMe && <span className="text-[#c9b99a] text-xs ml-2">(you)</span>}
                        </p>
                        <p className="text-xs text-[#6b6b6b]">{entry.user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#e8e4de]">{comp}%</p>
                      <p className="text-xs text-[#6b6b6b]">{passedCount}/17</p>
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
                            result?.passed ? 'bg-[#c9b99a]' :
                            result?.attempts > 0 ? 'bg-amber-500' :
                            'bg-[#2a2a2a]'
                          }`}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-[#6b6b6b]">Ch 0</span>
                    <span className="text-[10px] text-[#6b6b6b]">Ch 16</span>
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

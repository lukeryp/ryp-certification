'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Nav from '../../components/Nav';
import { getCurrentUser } from '../../lib/storage';
import {
  L2_QUESTIONS,
  L2_ESSAYS,
  L2_SECTIONS,
  L2_MC_POINTS,
  L2_PASS_THRESHOLD,
  L2_TIME_LIMIT,
} from '../../lib/l2-questions';
import { CertQuestion } from '../../lib/l1-questions';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffleQuestion(q: CertQuestion): CertQuestion {
  const correctText = q.options.find(o => o.label === q.correctAnswer)?.text ?? '';
  const shuffled = shuffle(q.options).map((opt, i) => ({
    ...opt,
    label: ['A', 'B', 'C', 'D'][i],
  }));
  const newCorrect = shuffled.find(o => o.text === correctText)?.label ?? 'A';
  return { ...q, options: shuffled, correctAnswer: newCorrect };
}

type Phase = 'intro' | 'mc' | 'essays' | 'results';

interface EssayState {
  text: string;
  wordCount: number;
  submitted: boolean;
  grading: boolean;
  score: number | null;
  feedback: string;
  suggestions: string;
  error: string;
}

function countWords(t: string): number {
  return t.trim() === '' ? 0 : t.trim().split(/\s+/).length;
}

export default function L2ExamPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const [phase, setPhase] = useState<Phase>('intro');
  const [questions, setQuestions] = useState<CertQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(L2_TIME_LIMIT);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const [essays, setEssays] = useState<EssayState[]>(
    L2_ESSAYS.map(() => ({ text: '', wordCount: 0, submitted: false, grading: false, score: null, feedback: '', suggestions: '', error: '' }))
  );
  const [currentEssay, setCurrentEssay] = useState(0);

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) { router.push('/login'); return; }
    setUser(u);
    setQuestions(L2_QUESTIONS.map(shuffleQuestion));
  }, [router]);

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remaining = Math.max(0, L2_TIME_LIMIT - elapsed);
      setTimeLeft(remaining);
      if (remaining === 0) { clearInterval(timerRef.current!); setPhase('essays'); }
    }, 1000);
  }, []);

  useEffect(() => { return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const mcScore = questions.reduce((sum, q) => sum + (answers[q.id] === q.correctAnswer ? L2_MC_POINTS : 0), 0);
  const essayTotalScore = essays.reduce((sum, e) => sum + (e.score ?? 0), 0);
  const totalScore = mcScore + essayTotalScore;
  const passed = totalScore >= L2_PASS_THRESHOLD;

  const sectionScores = L2_SECTIONS.map(sec => {
    const sqs = questions.filter(q => q.section === sec.id);
    const correct = sqs.filter(q => answers[q.id] === q.correctAnswer).length;
    return { ...sec, correct, total: sqs.length };
  });

  const handleSelectAnswer = (qId: string, label: string) => {
    if (revealed[qId]) return;
    setAnswers(prev => ({ ...prev, [qId]: label }));
    setRevealed(prev => ({ ...prev, [qId]: true }));
  };

  const handleNextQ = () => {
    if (currentQ < questions.length - 1) setCurrentQ(c => c + 1);
    else setPhase('essays');
  };

  const handleEssayChange = (idx: number, text: string) => {
    setEssays(prev => prev.map((e, i) => i === idx ? { ...e, text, wordCount: countWords(text) } : e));
  };

  const handleSubmitEssay = async (idx: number) => {
    const essay = L2_ESSAYS[idx];
    const state = essays[idx];
    if (state.submitted || state.grading || state.wordCount < 20) return;
    setEssays(prev => prev.map((e, i) => i === idx ? { ...e, grading: true } : e));
    try {
      const res = await fetch('/api/grade-cert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: 'l2', essayId: essay.id, title: essay.title, prompt: essay.prompt, gradingCriteria: essay.gradingCriteria, response: state.text }),
      });
      // M-3: wrap res.json() in try-catch — server may return non-JSON on errors
      let data: { score?: number; feedback?: string; suggestions?: string; error?: string };
      try {
        data = await res.json();
      } catch {
        throw new Error('The grading server returned an unexpected response. Please try again.');
      }
      if (!res.ok) {
        throw new Error(data.error || 'Grading failed. Please try again.');
      }
      setEssays(prev => prev.map((e, i) => i === idx ? { ...e, grading: false, submitted: true, score: data.score ?? 0, feedback: data.feedback ?? '', suggestions: data.suggestions ?? '', error: '' } : e));
    } catch (err) {
      // M-2: surface the error to the student instead of failing silently
      setEssays(prev => prev.map((e, i) => i === idx ? { ...e, grading: false, error: err instanceof Error ? err.message : 'Grading failed. Please try again.' } : e));
    }
  };

  const allEssaysSubmitted = essays.every(e => e.submitted);
  const q = questions[currentQ];
  if (!user) return null;

  // ─── INTRO ───────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-[#0d0d0d]">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(0,175,81,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,175,81,0.03) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <Nav level="l2" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
          <Link href="/l2" className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#00af51] transition-colors mb-8">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to L2 Overview
          </Link>

          <div className="rounded-2xl p-8" style={{ background: 'rgba(0,175,81,0.05)', border: '1px solid rgba(0,175,81,0.2)' }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5" style={{ background: 'rgba(0,175,81,0.1)', border: '1px solid rgba(0,175,81,0.25)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00af51]" />
              <span className="text-[#00af51] text-xs font-semibold tracking-widest uppercase">Level 2 Certification Exam</span>
            </div>
            <h1 className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'var(--font-raleway)' }}>Instructor Certification</h1>
            <p className="text-[#9ca3af] mb-8">Interlachen Country Club — ICC Full Program Certification</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Questions', value: '70 MC' },
                { label: 'Essays', value: '3' },
                { label: 'Time Limit', value: '90 min' },
                { label: 'Pass Score', value: '80 / 100' },
              ].map(stat => (
                <div key={stat.label} className="rounded-xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="text-xl font-black text-white mb-1" style={{ fontFamily: 'var(--font-raleway)' }}>{stat.value}</div>
                  <div className="text-xs text-[#6b7280]">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-8 text-sm text-[#9ca3af]">
              <div className="flex items-start gap-3"><span className="text-[#00af51] mt-0.5">•</span><span>Multiple choice: 70 questions × 1.0 pt = 70 points. Answer choices are randomized on each load.</span></div>
              <div className="flex items-start gap-3"><span className="text-[#00af51] mt-0.5">•</span><span>You will receive immediate feedback after each multiple choice question.</span></div>
              <div className="flex items-start gap-3"><span className="text-[#00af51] mt-0.5">•</span><span>Essays: 3 questions × 10 pts each = 30 points. AI-graded against the official rubric (7/10 pass threshold per essay).</span></div>
              <div className="flex items-start gap-3"><span className="text-[#00af51] mt-0.5">•</span><span>Retake policy: one retake after 72-hour review and co-observation with Director of Instruction. Second failure requires Director approval.</span></div>
            </div>

            <button
              onClick={() => { setPhase('mc'); startTimer(); }}
              className="w-full py-4 rounded-xl font-bold text-[#0d0d0d] text-lg transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #00af51, #00d466)' }}
            >
              Begin Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── MC PHASE ────────────────────────────────────────────────────────────────
  if (phase === 'mc' && q) {
    const isRevealed = revealed[q.id];
    const selectedAnswer = answers[q.id];
    const isCorrect = selectedAnswer === q.correctAnswer;
    const timeWarning = timeLeft < 600;

    return (
      <div className="min-h-screen bg-[#0d0d0d] pb-24">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(0,175,81,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,175,81,0.025) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <Nav level="l2" />

        <div className="fixed top-0 left-0 right-0 z-50" style={{ height: '3px', background: 'rgba(255,255,255,0.05)' }}>
          <div className="h-full transition-all duration-1000"
            style={{ width: `${(timeLeft / L2_TIME_LIMIT) * 100}%`, background: timeWarning ? '#ef4444' : 'linear-gradient(90deg, #00af51, #00d466)' }} />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#6b7280]">Q {currentQ + 1} / {questions.length}</span>
              <div className="h-3 w-px bg-[#2a2a2a]" />
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,175,81,0.1)', color: '#4ade80', border: '1px solid rgba(0,175,81,0.2)' }}>
                Section {q.section}
              </span>
            </div>
            <div className={`text-sm font-mono font-bold ${timeWarning ? 'text-red-400' : 'text-[#6b7280]'}`}>{formatTime(timeLeft)}</div>
          </div>

          {/* Compact progress */}
          <div className="flex gap-0.5 mb-5 flex-wrap">
            {questions.map((question, i) => (
              <div key={i} className="h-1 rounded-sm transition-all" style={{
                width: `${100 / questions.length}%`,
                minWidth: '3px',
                background: i === currentQ ? '#00af51' : revealed[question.id] ? (answers[question.id] === question.correctAnswer ? 'rgba(0,175,81,0.4)' : 'rgba(239,68,68,0.4)') : 'rgba(255,255,255,0.08)',
              }} />
            ))}
          </div>

          <div className="rounded-2xl p-6 mb-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-xs text-[#6b7280] mb-3 uppercase tracking-wider font-semibold">{q.sectionName}</p>
            <p className="text-[#e5e7eb] text-base leading-relaxed font-medium mb-5">{q.question}</p>
            <div className="space-y-2">
              {q.options.map(opt => {
                let style: React.CSSProperties = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#9ca3af' };
                if (isRevealed) {
                  if (opt.label === q.correctAnswer) style = { background: 'rgba(0,175,81,0.12)', border: '1px solid rgba(0,175,81,0.4)', color: '#4ade80' };
                  else if (opt.label === selectedAnswer) style = { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.4)', color: '#fca5a5' };
                } else if (opt.label === selectedAnswer) {
                  style = { background: 'rgba(0,175,81,0.08)', border: '1px solid rgba(0,175,81,0.3)', color: '#e5e7eb' };
                }
                return (
                  <button key={opt.label} onClick={() => handleSelectAnswer(q.id, opt.label)} disabled={isRevealed}
                    className="w-full text-left p-4 rounded-xl transition-all text-sm leading-relaxed" style={style}>
                    <span className="font-bold mr-3" style={{ color: isRevealed && opt.label === q.correctAnswer ? '#00af51' : undefined }}>{opt.label})</span>
                    {opt.text}
                  </button>
                );
              })}
            </div>
          </div>

          {isRevealed && (
            <div className="rounded-xl p-4 mb-4" style={{
              background: isCorrect ? 'rgba(0,175,81,0.08)' : 'rgba(239,68,68,0.08)',
              border: `1px solid ${isCorrect ? 'rgba(0,175,81,0.25)' : 'rgba(239,68,68,0.25)'}`,
            }}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-sm font-bold ${isCorrect ? 'text-[#4ade80]' : 'text-red-400'}`}>{isCorrect ? '✓ Correct' : '✗ Incorrect'}</span>
                {!isCorrect && <span className="text-xs text-[#6b7280]">Correct: <span className="text-[#4ade80] font-semibold">{q.correctAnswer}) {q.options.find(o => o.label === q.correctAnswer)?.text}</span></span>}
              </div>
              <p className="text-xs text-[#9ca3af] leading-relaxed">{q.explanation}</p>
            </div>
          )}

          {isRevealed && (
            <button onClick={handleNextQ}
              className="w-full py-3 rounded-xl font-semibold text-[#0d0d0d] transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #00af51, #00d466)' }}>
              {currentQ < questions.length - 1 ? 'Next Question →' : 'Continue to Essays →'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ─── ESSAYS ──────────────────────────────────────────────────────────────────
  if (phase === 'essays') {
    const essay = L2_ESSAYS[currentEssay];
    const state = essays[currentEssay];
    const overLimit = state.wordCount > essay.wordLimit;

    return (
      <div className="min-h-screen bg-[#0d0d0d] pb-24">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(0,175,81,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,175,81,0.025) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <Nav level="l2" />

        <div className="relative z-10 max-w-2xl mx-auto px-4 pt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-white">Essay {currentEssay + 1} of {L2_ESSAYS.length}</span>
              <div className="h-3 w-px bg-[#2a2a2a]" />
              <span className="text-xs text-[#6b7280]">MC Score: {mcScore.toFixed(0)} / 70</span>
            </div>
            <div className="flex gap-2">
              {L2_ESSAYS.map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: essays[i].submitted ? 'rgba(0,175,81,0.2)' : i === currentEssay ? 'rgba(0,175,81,0.1)' : 'rgba(255,255,255,0.05)',
                    border: i === currentEssay ? '1px solid rgba(0,175,81,0.4)' : '1px solid rgba(255,255,255,0.08)',
                    color: essays[i].submitted ? '#4ade80' : i === currentEssay ? '#00af51' : '#6b7280',
                  }}>
                  {essays[i].submitted ? '✓' : i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-6 mb-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{ background: 'rgba(0,175,81,0.1)', border: '1px solid rgba(0,175,81,0.2)' }}>
              <span className="text-[#00af51] text-xs font-semibold tracking-widest uppercase">Short Essay — {essay.wordLimit} Word Max</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-raleway)' }}>{essay.title}</h2>
            <p className="text-[#9ca3af] text-sm leading-relaxed">{essay.prompt}</p>
          </div>

          {!state.submitted ? (
            <>
              <div className="rounded-2xl overflow-hidden mb-3" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                <textarea
                  value={state.text}
                  onChange={e => handleEssayChange(currentEssay, e.target.value)}
                  placeholder="Write your response here..."
                  rows={10}
                  className="w-full bg-[#111] text-[#e5e7eb] p-5 text-sm leading-relaxed resize-none focus:outline-none"
                  style={{ fontFamily: 'var(--font-work-sans)' }}
                />
                <div className="flex items-center justify-between px-5 py-3" style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className={`text-xs font-medium ${overLimit ? 'text-red-400' : 'text-[#6b7280]'}`}>{state.wordCount} / {essay.wordLimit} words</span>
                  {overLimit && <span className="text-xs text-red-400">Only the first {essay.wordLimit} words will be graded</span>}
                </div>
              </div>
              {state.error && (
                <p className="text-red-400 text-sm mb-3 px-1">{state.error}</p>
              )}
              <button
                onClick={() => handleSubmitEssay(currentEssay)}
                disabled={state.grading || state.wordCount < 20}
                className="w-full py-3 rounded-xl font-semibold text-[#0d0d0d] transition-all hover:opacity-90 disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg, #00af51, #00d466)' }}>
                {state.grading ? 'Grading...' : state.error ? 'Retry Submission' : 'Submit Essay for AI Grading'}
              </button>
            </>
          ) : (
            <div className="space-y-4">
              <div className="rounded-2xl p-5 text-center" style={{
                background: (state.score ?? 0) >= 7 ? 'rgba(0,175,81,0.08)' : 'rgba(239,68,68,0.08)',
                border: `1px solid ${(state.score ?? 0) >= 7 ? 'rgba(0,175,81,0.25)' : 'rgba(239,68,68,0.25)'}`,
              }}>
                <div className="text-4xl font-black text-white mb-1" style={{ fontFamily: 'var(--font-raleway)' }}>{state.score} / 10</div>
                <div className={`text-sm font-semibold ${(state.score ?? 0) >= 7 ? 'text-[#4ade80]' : 'text-red-400'}`}>
                  {(state.score ?? 0) >= 7 ? 'Passed (7+ required)' : 'Below passing threshold'}
                </div>
              </div>
              <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <h3 className="text-sm font-bold text-white mb-3">Feedback</h3>
                <p className="text-[#9ca3af] text-sm leading-relaxed whitespace-pre-line">{state.feedback}</p>
              </div>
              {state.suggestions && (
                <div className="rounded-2xl p-5" style={{ background: 'rgba(0,175,81,0.04)', border: '1px solid rgba(0,175,81,0.15)' }}>
                  <h3 className="text-sm font-bold text-[#4ade80] mb-3">Suggestions for Improvement</h3>
                  <p className="text-[#9ca3af] text-sm leading-relaxed whitespace-pre-line">{state.suggestions}</p>
                </div>
              )}
              {currentEssay < L2_ESSAYS.length - 1 ? (
                <button onClick={() => setCurrentEssay(e => e + 1)}
                  className="w-full py-3 rounded-xl font-semibold text-[#0d0d0d] transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #00af51, #00d466)' }}>
                  Next Essay →
                </button>
              ) : (
                <button onClick={() => { if (timerRef.current) clearInterval(timerRef.current); setPhase('results'); }}
                  disabled={!allEssaysSubmitted}
                  className="w-full py-3 rounded-xl font-semibold text-[#0d0d0d] transition-all hover:opacity-90 disabled:opacity-40"
                  style={{ background: 'linear-gradient(135deg, #00af51, #00d466)' }}>
                  View Final Results →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── RESULTS ─────────────────────────────────────────────────────────────────
  if (phase === 'results') {
    return (
      <div className="min-h-screen bg-[#0d0d0d] pb-24">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(0,175,81,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,175,81,0.025) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <Nav level="l2" />

        <div className="relative z-10 max-w-2xl mx-auto px-4 pt-6">
          <div className="rounded-2xl p-8 text-center mb-6" style={{
            background: passed ? 'rgba(0,175,81,0.07)' : 'rgba(239,68,68,0.07)',
            border: `1px solid ${passed ? 'rgba(0,175,81,0.25)' : 'rgba(239,68,68,0.25)'}`,
          }}>
            <div className="text-7xl font-black mb-2" style={{
              fontFamily: 'var(--font-raleway)',
              background: passed ? 'linear-gradient(135deg, #00af51, #00d466)' : 'linear-gradient(135deg, #ef4444, #f87171)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              {totalScore.toFixed(1)}
            </div>
            <div className="text-[#9ca3af] text-sm mb-3">out of 100</div>
            <div className={`text-xl font-bold mb-1 ${passed ? 'text-[#4ade80]' : 'text-red-400'}`}>
              {passed ? '✓ Instructor Certification Passed' : '✗ Not Yet Certified'}
            </div>
            <p className="text-xs text-[#6b7280]">
              {passed
                ? 'You have met the 80-point minimum for Level 2 Instructor Certification.'
                : `You need ${(L2_PASS_THRESHOLD - totalScore).toFixed(1)} more points to pass. One retake allowed after 72-hour review.`}
            </p>
          </div>

          {/* Breakdown */}
          <div className="rounded-2xl p-6 mb-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Score Breakdown</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="text-sm text-[#9ca3af]">Multiple Choice (70 questions)</span>
                <span className="text-sm font-bold text-white">{mcScore.toFixed(0)} / 70</span>
              </div>
              {essays.map((e, i) => (
                <div key={i} className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="text-sm text-[#9ca3af]">Essay {i + 1}: {L2_ESSAYS[i].title}</span>
                  <span className={`text-sm font-bold ${(e.score ?? 0) >= 7 ? 'text-[#4ade80]' : 'text-red-400'}`}>{e.score ?? 0} / 10</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-bold text-white">Total Score</span>
                <span className={`text-lg font-black ${passed ? 'text-[#4ade80]' : 'text-red-400'}`}>{totalScore.toFixed(1)} / 100</span>
              </div>
            </div>
          </div>

          {/* Section diagnostic */}
          <div className="rounded-2xl p-6 mb-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Section Diagnostic</h2>
            <div className="space-y-3">
              {sectionScores.map(sec => {
                const pct = sec.total > 0 ? sec.correct / sec.total : 0;
                return (
                  <div key={sec.id}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#9ca3af]">§{sec.id} — {sec.name}</span>
                      <span className={`font-bold ${pct >= 0.8 ? 'text-[#4ade80]' : pct >= 0.5 ? 'text-yellow-400' : 'text-red-400'}`}>{sec.correct}/{sec.total}</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div className="h-1.5 rounded-full transition-all" style={{
                        width: `${pct * 100}%`,
                        background: pct >= 0.8 ? 'linear-gradient(90deg, #00af51, #00d466)' : pct >= 0.5 ? '#eab308' : '#ef4444',
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <Link href="/l2" className="flex-1">
              <button className="w-full py-3 rounded-xl font-semibold text-[#9ca3af] transition-all hover:text-white" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                Back to L2
              </button>
            </Link>
            <Link href="/" className="flex-1">
              <button className="w-full py-3 rounded-xl font-semibold text-[#0d0d0d] transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #00af51, #00d466)' }}>
                All Certifications
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

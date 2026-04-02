'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Nav from '../../../../components/Nav';
import { getCurrentUser, getUserProgress, saveEssayAttempt, getBestEssayAttempts } from '../../../../lib/storage';
import { getChapterEssayQuestions, ESSAY_PASS_THRESHOLD } from '../../../../lib/essay-questions';
import { gradeEssay } from '../../../../lib/ai-grading';
import { UserProfile, EssayAttempt, GradeResponse } from '../../../../lib/types';

type QuestionState = 'writing' | 'grading' | 'feedback';

export default function EssayPage() {
  const router = useRouter();
  const params = useParams();
  const chapterId = Number(params.id);

  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [response, setResponse] = useState('');
  const [questionState, setQuestionState] = useState<QuestionState>('writing');
  const [gradeResult, setGradeResult] = useState<GradeResponse | null>(null);
  const [gradeError, setGradeError] = useState<string | null>(null);
  const [bestAttempts, setBestAttempts] = useState<Record<string, EssayAttempt>>({});

  const questions = getChapterEssayQuestions(chapterId);
  const currentQuestion = questions[currentIndex];

  const loadBestAttempts = useCallback((userId: string) => {
    setBestAttempts(getBestEssayAttempts(userId, chapterId));
  }, [chapterId]);

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) { router.push('/login?redirect=/l3'); return; }

    // Ensure MC was passed before accessing essays
    const progress = getUserProgress(u.id);
    if (!progress.chapterResults[chapterId]?.passed) {
      router.push(`/l3/chapters/${chapterId}`);
      return;
    }

    setUser(u);
    loadBestAttempts(u.id);
  }, [router, chapterId, loadBestAttempts]);

  if (!user || !currentQuestion) return null;

  const wordCount = response.trim() === '' ? 0 : response.trim().split(/\s+/).length;
  const overLimit = wordCount > currentQuestion.wordLimit;
  const canSubmit = wordCount >= 10 && !overLimit && questionState === 'writing';

  const existingAttempt = bestAttempts[currentQuestion.id];

  const completedCount = Object.keys(bestAttempts).length;
  const averageScore = completedCount > 0
    ? Object.values(bestAttempts).reduce((sum, a) => sum + a.score, 0) / completedCount
    : 0;
  const isFullyCertified = completedCount >= questions.length && averageScore >= ESSAY_PASS_THRESHOLD;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setQuestionState('grading');
    setGradeError(null);

    try {
      const result = await gradeEssay({
        questionId: currentQuestion.id,
        question: currentQuestion.prompt,
        gradingCriteria: currentQuestion.gradingCriteria,
        response,
        chapter: chapterId,
      });

      const attempt: EssayAttempt = {
        id: crypto.randomUUID(),
        userId: user.id,
        chapter: chapterId,
        questionId: currentQuestion.id,
        response,
        score: result.score,
        feedback: result.feedback,
        suggestions: result.suggestions,
        timestamp: new Date().toISOString(),
      };

      saveEssayAttempt(attempt);
      loadBestAttempts(user.id);
      setGradeResult(result);
      setQuestionState('feedback');
    } catch (err) {
      setGradeError(err instanceof Error ? err.message : 'Grading failed. Please try again.');
      setQuestionState('writing');
    }
  };

  const handleNextQuestion = () => {
    setResponse('');
    setGradeResult(null);
    setGradeError(null);
    setQuestionState('writing');
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleRetry = () => {
    setGradeResult(null);
    setGradeError(null);
    setQuestionState('writing');
  };

  const scoreColor = (score: number) => {
    if (score >= 8) return 'text-[#c9b99a]';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const scoreBg = (score: number) => {
    if (score >= 8) return 'bg-[#c9b99a]/10 border-[#c9b99a]/30';
    if (score >= 6) return 'bg-yellow-900/20 border-yellow-800';
    return 'bg-red-900/20 border-red-800';
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Nav level="l3" />
      <main className="max-w-2xl mx-auto px-4 py-6">
        <Link href={`/l3/chapters/${chapterId}`} className="text-[#6b6b6b] text-sm hover:text-[#e8e4de] mb-4 block">
          &#8249; Back to Chapter
        </Link>

        {/* Header */}
        <div className="mb-6">
          <span className="text-xs text-[#6b6b6b]">Chapter {chapterId} — Discussion Questions</span>
          <div className="flex items-center justify-between mt-1">
            <h1 className="text-xl font-bold text-[#e8e4de]">{currentQuestion.title}</h1>
            {isFullyCertified && (
              <span className="text-xs bg-[#c9b99a]/15 text-[#c9b99a] px-3 py-1 rounded-full">Certified</span>
            )}
          </div>
        </div>

        {/* Progress summary */}
        <div className="flex items-center gap-4 mb-6 p-3 bg-[#141414] rounded-lg border border-[#2a2a2a]">
          <div className="text-center">
            <div className="text-lg font-bold text-[#e8e4de]">{completedCount}/{questions.length}</div>
            <div className="text-xs text-[#6b6b6b]">Completed</div>
          </div>
          {completedCount > 0 && (
            <div className="text-center">
              <div className={`text-lg font-bold ${scoreColor(averageScore)}`}>
                {averageScore.toFixed(1)}/10
              </div>
              <div className="text-xs text-[#6b6b6b]">Avg Score</div>
            </div>
          )}
          <div className="flex-1 text-right text-xs text-[#6b6b6b]">
            Need avg ≥ {ESSAY_PASS_THRESHOLD} on all {questions.length} questions for full certification
          </div>
        </div>

        {/* Question navigation */}
        <div className="flex gap-1.5 mb-6 flex-wrap">
          {questions.map((q, i) => {
            const attempt = bestAttempts[q.id];
            return (
              <button
                key={i}
                onClick={() => {
                  setCurrentIndex(i);
                  setResponse('');
                  setGradeResult(null);
                  setQuestionState('writing');
                }}
                className={`w-8 h-8 rounded-full text-xs font-medium flex items-center justify-center transition-colors ${
                  i === currentIndex
                    ? 'bg-[#c9b99a] text-[#0a0a0a]'
                    : attempt
                    ? attempt.score >= ESSAY_PASS_THRESHOLD
                      ? 'bg-[#c9b99a]/25 text-[#c9b99a] border border-[#c9b99a]/30'
                      : 'bg-yellow-900/30 text-yellow-400 border border-yellow-800/40'
                    : 'bg-[#2a2a2a] text-[#6b6b6b]'
                }`}
                title={attempt ? `Score: ${attempt.score}/10` : 'Not attempted'}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        {/* Current question card */}
        <div className="bg-[#141414] rounded-xl border border-[#2a2a2a] p-5 mb-4">
          <div className="flex items-start justify-between gap-3 mb-4">
            <h2 className="text-sm font-semibold text-[#6b6b6b] uppercase tracking-wider">
              Question {currentIndex + 1}
            </h2>
            {existingAttempt && questionState === 'writing' && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${scoreBg(existingAttempt.score)} ${scoreColor(existingAttempt.score)}`}>
                Best: {existingAttempt.score}/10
              </span>
            )}
          </div>
          <p className="text-[#e8e4de] text-sm leading-relaxed whitespace-pre-wrap">{currentQuestion.prompt}</p>
        </div>

        {/* Writing state */}
        {questionState === 'writing' && (
          <div>
            <div className="relative">
              <textarea
                value={response}
                onChange={e => setResponse(e.target.value)}
                placeholder="Write your response here..."
                rows={10}
                className="w-full bg-[#141414] border border-[#2a2a2a] rounded-xl p-4 text-[#e8e4de] text-sm leading-relaxed resize-none focus:outline-none focus:border-[#c9b99a] placeholder-[#6b6b6b]"
              />
            </div>
            <div className="flex items-center justify-between mt-2 mb-4">
              <span className={`text-xs ${overLimit ? 'text-red-400 font-medium' : wordCount > currentQuestion.wordLimit * 0.85 ? 'text-yellow-400' : 'text-[#6b6b6b]'}`}>
                {wordCount} / {currentQuestion.wordLimit} words{overLimit ? ' — over limit' : ''}
              </span>
              {gradeError && (
                <span className="text-xs text-red-400">{gradeError}</span>
              )}
            </div>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full py-3 bg-[#c9b99a] hover:bg-[#b5a48a] disabled:opacity-30 disabled:hover:bg-[#c9b99a] text-[#0a0a0a] font-medium rounded-lg transition-colors"
            >
              Submit for Grading
            </button>
            {existingAttempt && (
              <div className="mt-3 p-3 bg-[#141414] rounded-lg border border-[#2a2a2a] text-xs text-[#6b6b6b]">
                <span className="font-medium text-[#e8e4de]">Previous best:</span>{' '}
                {existingAttempt.score}/10 — submitting will replace your score if higher.
              </div>
            )}
          </div>
        )}

        {/* Grading state */}
        {questionState === 'grading' && (
          <div className="py-12 text-center">
            <div className="inline-flex items-center gap-3 text-[#6b6b6b]">
              <svg className="animate-spin h-5 w-5 text-[#c9b99a]" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Grading your response…
            </div>
            <p className="text-xs text-[#6b6b6b] mt-2">This usually takes 5–10 seconds</p>
          </div>
        )}

        {/* Feedback state */}
        {questionState === 'feedback' && gradeResult && (
          <div>
            <div className={`p-5 rounded-xl border mb-4 ${scoreBg(gradeResult.score)}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-[#e8e4de]">Your Score</span>
                <span className={`text-3xl font-bold ${scoreColor(gradeResult.score)}`}>
                  {gradeResult.score}/10
                </span>
              </div>
              <div className="text-xs text-[#6b6b6b]">
                {gradeResult.score >= 9 ? 'Deep mechanistic understanding'
                  : gradeResult.score >= 7 ? 'Solid understanding with minor gaps'
                  : gradeResult.score >= 4 ? 'Partially correct — key elements missing'
                  : 'Core mechanism needs review'}
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-[#141414] rounded-xl border border-[#2a2a2a]">
                <h3 className="text-xs font-semibold text-[#6b6b6b] uppercase tracking-wider mb-3">Feedback</h3>
                <p className="text-sm text-[#e8e4de] leading-relaxed whitespace-pre-wrap">{gradeResult.feedback}</p>
              </div>

              {gradeResult.suggestions && (
                <div className="p-4 bg-[#141414] rounded-xl border border-[#2a2a2a]">
                  <h3 className="text-xs font-semibold text-[#6b6b6b] uppercase tracking-wider mb-3">To Go Deeper</h3>
                  <p className="text-sm text-[#e8e4de] leading-relaxed whitespace-pre-wrap">{gradeResult.suggestions}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleRetry}
                className="flex-1 py-3 bg-[#141414] border border-[#2a2a2a] text-[#e8e4de] font-medium rounded-lg hover:border-[#3a3a3a] transition-colors text-sm"
              >
                Revise Answer
              </button>
              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="flex-1 py-3 bg-[#c9b99a] hover:bg-[#b5a48a] text-[#0a0a0a] font-medium rounded-lg transition-colors text-sm"
                >
                  Next Question &#8250;
                </button>
              ) : (
                <Link href={`/l3/chapters/${chapterId}`} className="flex-1">
                  <button className="w-full py-3 bg-[#c9b99a] hover:bg-[#b5a48a] text-[#0a0a0a] font-medium rounded-lg transition-colors text-sm">
                    Back to Chapter
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

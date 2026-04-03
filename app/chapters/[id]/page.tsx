'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Nav from '../../components/Nav';
import { getCurrentUser, getUserProgress, saveQuizAttempt } from '../../lib/storage';
import { CHAPTERS } from '../../lib/chapters';
import { getChapterQuestions, PASS_THRESHOLD } from '../../lib/questions';
import { getChapterEssayQuestions } from '../../lib/essay-questions';
import { UserProfile, Question } from '../../lib/types';

type Mode = 'study' | 'quiz' | 'results';

export default function ChapterPage() {
  const router = useRouter();
  const params = useParams();
  const chapterId = Number(params.id);

  const [user, setUser] = useState<UserProfile | null>(null);
  const [mode, setMode] = useState<Mode>('study');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const chapter = CHAPTERS.find(ch => ch.number === chapterId);
  const questions = getChapterQuestions(chapterId);
  const essayQuestions = getChapterEssayQuestions(chapterId);

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) { router.push('/login'); return; }
    setUser(u);
  }, [router]);

  if (!user || !chapter) return null;

  const progress = getUserProgress(user.id);
  const chResult = progress.chapterResults[chapterId];

  const handleAnswer = (questionId: string, answer: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    setScore(correct);
    setSubmitted(true);

    const passed = correct / questions.length >= PASS_THRESHOLD;
    saveQuizAttempt({
      id: crypto.randomUUID(),
      userId: user.id,
      chapter: chapterId,
      score: correct,
      passed,
      answers,
      timestamp: new Date().toISOString(),
    });

    setMode('results');
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentQ(0);
    setSubmitted(false);
    setScore(0);
    setMode('quiz');
  };

  const q = questions[currentQ];
  const allAnswered = questions.every(q => answers[q.id]);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Nav />
      <main className="max-w-2xl mx-auto px-4 py-6">
        <Link href="/chapters" className="text-[#6b6b6b] text-sm hover:text-[#e8e4de] mb-4 block">
          &#8249; All Chapters
        </Link>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs text-[#6b6b6b]">Chapter {chapter.number}</span>
            <h1 className="text-xl font-bold text-[#e8e4de]">{chapter.title}</h1>
          </div>
          {chResult?.passed && (
            <span className="text-xs bg-[#c9b99a]/15 text-[#c9b99a] px-3 py-1 rounded-full">Passed</span>
          )}
        </div>

        {/* Mode tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setMode('study')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              mode === 'study' ? 'bg-[#c9b99a] text-[#0a0a0a]' : 'bg-[#141414] text-[#6b6b6b] hover:text-[#e8e4de]'
            }`}
          >
            Manual
          </button>
          <button
            onClick={() => { if (!submitted) { setMode('quiz'); } else { handleRetake(); }}}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              mode === 'quiz' ? 'bg-[#c9b99a] text-[#0a0a0a]' : 'bg-[#141414] text-[#6b6b6b] hover:text-[#e8e4de]'
            }`}
          >
            {submitted ? 'Retake Quiz' : 'Take Quiz'}
          </button>
          {essayQuestions.length > 0 && chResult?.passed && (
            <Link href={`/chapters/${chapterId}/essay`}>
              <button className="px-4 py-2 rounded-lg text-sm bg-[#141414] text-[#c9b99a] border border-[#c9b99a]/20 hover:border-[#c9b99a]/50 transition-colors">
                Discussion Questions
              </button>
            </Link>
          )}
        </div>

        {/* Manual / Study mode */}
        {mode === 'study' && (
          <div className="space-y-4">
            <p className="text-[#6b6b6b] text-sm italic">{chapter.summary}</p>
            <a href="/golf_textbook.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[#c9b99a] hover:underline mb-2">
              📄 Golf Textbook (PDF)
            </a>
            {chapter.reading ? (
              <div className="space-y-4">
                {chapter.reading.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-sm text-[#e8e4de] leading-relaxed">{paragraph}</p>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {chapter.keyConcepts.map((concept, i) => (
                  <div key={i} className="p-4 bg-[#141414] rounded-lg border border-[#2a2a2a]">
                    <p className="text-sm text-[#e8e4de] leading-relaxed">{concept}</p>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => setMode('quiz')}
              className="w-full py-3 bg-[#c9b99a] hover:bg-[#b5a48a] text-[#0a0a0a] font-medium rounded-lg transition-colors mt-6"
            >
              Start Quiz
            </button>
          </div>
        )}

        {/* Quiz mode */}
        {mode === 'quiz' && q && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-[#6b6b6b]">Question {currentQ + 1} of {questions.length}</span>
              <span className="text-sm text-[#6b6b6b]">
                {Object.keys(answers).length}/{questions.length} answered
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-[#2a2a2a] rounded-full mb-6">
              <div
                className="h-1 bg-[#c9b99a] rounded-full transition-all"
                style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
              />
            </div>

            <div className="bg-[#141414] rounded-xl border border-[#2a2a2a] p-5 mb-4">
              <p className="text-[#e8e4de] font-medium mb-4 leading-relaxed">{q.question}</p>
              <div className="space-y-2">
                {q.options.map(opt => (
                  <button
                    key={opt.label}
                    onClick={() => handleAnswer(q.id, opt.label)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors text-sm ${
                      answers[q.id] === opt.label
                        ? 'border-[#c9b99a] bg-[#c9b99a]/10 text-[#e8e4de]'
                        : 'border-[#2a2a2a] hover:border-[#3a3a3a] text-[#6b6b6b]'
                    }`}
                  >
                    <span className="font-medium mr-2">{opt.label})</span>
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                disabled={currentQ === 0}
                className="px-4 py-2 text-sm text-[#6b6b6b] disabled:opacity-30"
              >
                &#8249; Previous
              </button>
              {currentQ < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQ(currentQ + 1)}
                  className="px-4 py-2 text-sm text-[#c9b99a] hover:text-[#e8e4de]"
                >
                  Next &#8250;
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  className="px-6 py-2 bg-[#c9b99a] hover:bg-[#b5a48a] disabled:opacity-30 disabled:hover:bg-[#c9b99a] text-[#0a0a0a] text-sm rounded-lg transition-colors"
                >
                  Submit Quiz
                </button>
              )}
            </div>

            {/* Question dots */}
            <div className="flex gap-1.5 justify-center mt-6 flex-wrap">
              {questions.map((question, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentQ(i)}
                  className={`w-6 h-6 rounded-full text-xs flex items-center justify-center transition-colors ${
                    i === currentQ
                      ? 'bg-[#c9b99a] text-[#0a0a0a]'
                      : answers[question.id]
                      ? 'bg-[#c9b99a]/25 text-[#c9b99a]'
                      : 'bg-[#2a2a2a] text-[#6b6b6b]'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results mode */}
        {mode === 'results' && (
          <div>
            <div className={`p-6 rounded-xl border text-center mb-6 ${
              score / questions.length >= PASS_THRESHOLD
                ? 'bg-[#c9b99a]/10 border-[#c9b99a]/30'
                : 'bg-red-900/20 border-red-800'
            }`}>
              <div className="text-4xl font-bold mb-2">
                {score}/{questions.length}
              </div>
              <div className={`text-lg font-medium ${
                score / questions.length >= PASS_THRESHOLD ? 'text-[#c9b99a]' : 'text-red-400'
              }`}>
                {score / questions.length >= PASS_THRESHOLD ? 'Passed!' : 'Not Yet — Keep Studying'}
              </div>
              <p className="text-[#6b6b6b] text-sm mt-1">90% required to pass ({Math.ceil(questions.length * PASS_THRESHOLD)}/{questions.length})</p>
            </div>

            {/* Review answers */}
            <div className="space-y-3">
              {questions.map((question, i) => {
                const userAnswer = answers[question.id];
                const correct = userAnswer === question.correctAnswer;
                return (
                  <div key={i} className={`p-4 rounded-lg border ${
                    correct ? 'border-[#c9b99a]/30 bg-[#c9b99a]/5' : 'border-red-800/40 bg-red-900/10'
                  }`}>
                    <div className="flex items-start gap-2">
                      <span className={`text-sm mt-0.5 ${correct ? 'text-[#c9b99a]' : 'text-red-500'}`}>
                        {correct ? '&#10003;' : '&#10007;'}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm text-[#e8e4de] mb-2">{question.question}</p>
                        {!correct && (
                          <div className="text-xs space-y-1">
                            <p className="text-red-400">Your answer: {userAnswer}) {question.options.find(o => o.label === userAnswer)?.text}</p>
                            <p className="text-[#c9b99a]">Correct: {question.correctAnswer}) {question.options.find(o => o.label === question.correctAnswer)?.text}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleRetake}
                className="flex-1 py-3 bg-[#141414] border border-[#2a2a2a] text-[#e8e4de] font-medium rounded-lg hover:border-[#3a3a3a] transition-colors"
              >
                Retake Quiz
              </button>
              <Link href="/chapters" className="flex-1">
                <button className="w-full py-3 bg-[#c9b99a] hover:bg-[#b5a48a] text-[#0a0a0a] font-medium rounded-lg transition-colors">
                  Back to Chapters
                </button>
              </Link>
            </div>

            {essayQuestions.length > 0 && (
              <div className="mt-4">
                {chResult?.passed ? (
                  <Link href={`/chapters/${chapterId}/essay`}>
                    <button className="w-full py-3 bg-[#141414] border border-[#c9b99a]/30 text-[#c9b99a] font-medium rounded-lg hover:bg-[#c9b99a]/10 transition-colors flex items-center justify-center gap-2">
                      <span>Discussion Questions</span>
                      <span className="text-xs text-[#6b6b6b]">({essayQuestions.length} questions · required for full certification)</span>
                    </button>
                  </Link>
                ) : (
                  <div className="w-full py-3 bg-[#141414] border border-[#2a2a2a] text-[#6b6b6b] font-medium rounded-lg text-center text-sm cursor-not-allowed">
                    Discussion Questions — pass the quiz to unlock
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

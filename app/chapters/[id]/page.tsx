'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Nav from '../../components/Nav';
import { getCurrentUser, getUserProgress, saveQuizAttempt } from '../../lib/storage';
import { CHAPTERS } from '../../lib/chapters';
import { getChapterQuestions, PASS_THRESHOLD } from '../../lib/questions';
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
        <Link href="/chapters" className="text-gray-500 text-sm hover:text-gray-400 mb-4 block">
          &#8249; All Chapters
        </Link>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs text-gray-500">Chapter {chapter.number}</span>
            <h1 className="text-xl font-bold text-gray-100">{chapter.title}</h1>
          </div>
          {chResult?.passed && (
            <span className="text-xs bg-green-900/50 text-green-400 px-3 py-1 rounded-full">Passed</span>
          )}
        </div>

        {/* Mode tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode('study')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              mode === 'study' ? 'bg-green-600 text-white' : 'bg-[#111827] text-gray-400 hover:text-gray-200'
            }`}
          >
            Study Guide
          </button>
          <button
            onClick={() => { if (!submitted) { setMode('quiz'); } else { handleRetake(); }}}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              mode === 'quiz' ? 'bg-green-600 text-white' : 'bg-[#111827] text-gray-400 hover:text-gray-200'
            }`}
          >
            {submitted ? 'Retake Quiz' : 'Take Quiz'}
          </button>
        </div>

        {/* Study mode */}
        {mode === 'study' && (
          <div className="space-y-4">
            <p className="text-gray-400">{chapter.summary}</p>
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mt-6">Key Concepts</h2>
            <div className="space-y-3">
              {chapter.keyConcepts.map((concept, i) => (
                <div key={i} className="p-4 bg-[#111827] rounded-lg border border-gray-800">
                  <p className="text-sm text-gray-300 leading-relaxed">{concept}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setMode('quiz')}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors mt-6"
            >
              Start Quiz
            </button>
          </div>
        )}

        {/* Quiz mode */}
        {mode === 'quiz' && q && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">Question {currentQ + 1} of {questions.length}</span>
              <span className="text-sm text-gray-600">
                {Object.keys(answers).length}/{questions.length} answered
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-gray-800 rounded-full mb-6">
              <div
                className="h-1 bg-green-600 rounded-full transition-all"
                style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
              />
            </div>

            <div className="bg-[#111827] rounded-xl border border-gray-800 p-5 mb-4">
              <p className="text-gray-200 font-medium mb-4 leading-relaxed">{q.question}</p>
              <div className="space-y-2">
                {q.options.map(opt => (
                  <button
                    key={opt.label}
                    onClick={() => handleAnswer(q.id, opt.label)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors text-sm ${
                      answers[q.id] === opt.label
                        ? 'border-green-600 bg-green-900/20 text-green-300'
                        : 'border-gray-700 hover:border-gray-600 text-gray-400'
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
                className="px-4 py-2 text-sm text-gray-400 disabled:opacity-30"
              >
                &#8249; Previous
              </button>
              {currentQ < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQ(currentQ + 1)}
                  className="px-4 py-2 text-sm text-green-500 hover:text-green-400"
                >
                  Next &#8250;
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-30 disabled:hover:bg-green-600 text-white text-sm rounded-lg transition-colors"
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
                      ? 'bg-green-600 text-white'
                      : answers[question.id]
                      ? 'bg-green-900/40 text-green-400'
                      : 'bg-gray-800 text-gray-500'
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
                ? 'bg-green-900/20 border-green-800'
                : 'bg-red-900/20 border-red-800'
            }`}>
              <div className="text-4xl font-bold mb-2">
                {score}/{questions.length}
              </div>
              <div className={`text-lg font-medium ${
                score / questions.length >= PASS_THRESHOLD ? 'text-green-400' : 'text-red-400'
              }`}>
                {score / questions.length >= PASS_THRESHOLD ? 'Passed!' : 'Not Yet — Keep Studying'}
              </div>
              <p className="text-gray-500 text-sm mt-1">90% required to pass ({Math.ceil(questions.length * PASS_THRESHOLD)}/{questions.length})</p>
            </div>

            {/* Review answers */}
            <div className="space-y-3">
              {questions.map((question, i) => {
                const userAnswer = answers[question.id];
                const correct = userAnswer === question.correctAnswer;
                return (
                  <div key={i} className={`p-4 rounded-lg border ${
                    correct ? 'border-green-800/40 bg-green-900/10' : 'border-red-800/40 bg-red-900/10'
                  }`}>
                    <div className="flex items-start gap-2">
                      <span className={`text-sm mt-0.5 ${correct ? 'text-green-500' : 'text-red-500'}`}>
                        {correct ? '&#10003;' : '&#10007;'}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-300 mb-2">{question.question}</p>
                        {!correct && (
                          <div className="text-xs space-y-1">
                            <p className="text-red-400">Your answer: {userAnswer}) {question.options.find(o => o.label === userAnswer)?.text}</p>
                            <p className="text-green-400">Correct: {question.correctAnswer}) {question.options.find(o => o.label === question.correctAnswer)?.text}</p>
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
                className="flex-1 py-3 bg-[#111827] border border-gray-700 text-gray-300 font-medium rounded-lg hover:border-gray-600 transition-colors"
              >
                Retake Quiz
              </button>
              <Link href="/chapters" className="flex-1">
                <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
                  Back to Chapters
                </button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

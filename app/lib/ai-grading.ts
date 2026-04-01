import { GradeResponse } from './types';

export async function gradeEssay(params: {
  questionId: string;
  question: string;
  gradingCriteria: string[];
  response: string;
  chapter: number;
}): Promise<GradeResponse> {
  const res = await fetch('/api/grade', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Grading failed' }));
    throw new Error(error.error || 'Grading failed');
  }

  return res.json();
}

export interface Question {
  id: string; // "ch0_q1"
  chapter: number;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string; // "A", "B", "C", or "D"
}

export interface ChapterInfo {
  number: number;
  title: string;
  summary: string;
  keyConcepts: string[];
}

export interface QuizAttempt {
  id: string;
  userId: string;
  chapter: number;
  score: number;
  passed: boolean;
  answers: Record<string, string>; // questionId -> selected answer
  timestamp: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
}

export interface UserProgress {
  userId: string;
  chapterResults: Record<number, ChapterResult>;
}

export interface ChapterResult {
  chapter: number;
  bestScore: number;
  passed: boolean;
  attempts: number;
  lastAttempt: string | null;
}

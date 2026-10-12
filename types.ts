export interface SubtitleItem {
  id: number;
  startTime: number;
  endTime: number;
  timeFormatted: string;
  spanish: string;
  armenian: string;
  context?: string;
}

export interface QuizOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  translation?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  questionArmenian: string;
  options: QuizOption[];
  correctOptionId: 'A' | 'B' | 'C' | 'D';
  explanationEs: string;
  explanationHy: string;
  relatedTimestamp?: number;
}

export interface UserAnswer {
  questionId: number;
  selectedOptionId: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
}

export type AppView = 'video' | 'quiz' | 'results';

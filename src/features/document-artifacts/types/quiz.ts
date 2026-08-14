export interface QuizQuestion {
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface QuizResponse {
  questions: QuizQuestion[];
}

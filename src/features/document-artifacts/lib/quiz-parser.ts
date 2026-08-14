import type { QuizQuestion, QuizResponse } from "../types/document-artifact";

interface QuizQuestionResponse {
  question: string;
  options: string[];
  correct_option_index: number;
  explanation: string;
}

interface QuizResponsePayload {
  questions: QuizQuestionResponse[];
}

export function parseQuiz(content: string): QuizResponse {
  const parsed: QuizResponsePayload = JSON.parse(content);

  return {
    questions: parsed.questions.map(
      (question): QuizQuestion => ({
        question: question.question,
        options: question.options,
        correctOptionIndex: question.correct_option_index,
        explanation: question.explanation,
      }),
    ),
  };
}

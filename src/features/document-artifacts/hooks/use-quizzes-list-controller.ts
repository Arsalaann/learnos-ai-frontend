"use client";

import { useEffect, useRef, useState } from "react";

import { useDocument } from "@/features/documents/hooks/use-document";
import { useDocumentId } from "@/features/documents/hooks/use-document-id";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import type { DocumentArtifact } from "../types/document-artifact";

import { parseQuiz } from "../lib/quiz-parser";

export interface QuizScore {
  correct: number;
  total: number;
  percentage: number;
}

export interface QuizListItem {
  quiz: DocumentArtifact;
  index: number;
  questionCount: number;
  attemptedCount: number;
  score: QuizScore;
  isComplete: boolean;
  isExpanded: boolean;
}

interface UseQuizzesListControllerProps {
  quizzes: DocumentArtifact[];
}

function calculateQuizScore(quiz: DocumentArtifact): QuizScore {
  const parsedQuiz = parseQuiz(quiz.content);

  let correct = 0;

  parsedQuiz.questions.forEach((question, questionIndex) => {
    const selectedOptionIndex = quiz.questionAttempts[String(questionIndex)];

    if (
      selectedOptionIndex !== undefined &&
      selectedOptionIndex === question.correctOptionIndex
    ) {
      correct += 1;
    }
  });

  const total = parsedQuiz.questions.length;

  return {
    correct,
    total,
    percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
  };
}

function calculateOverallScore(quizzes: DocumentArtifact[]): QuizScore {
  let correct = 0;
  let total = 0;

  quizzes.forEach((quiz) => {
    const score = calculateQuizScore(quiz);

    correct += score.correct;
    total += score.total;
  });

  return {
    correct,
    total,
    percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
  };
}

export function useQuizzesListController({
  quizzes,
}: UseQuizzesListControllerProps) {
  const workspaceId = useWorkspaceId();
  const documentId = useDocumentId();

  const { data: document } = useDocument(workspaceId, documentId);

  const orderedQuizzes = [...quizzes];

  const firstIncompleteQuiz =
    orderedQuizzes.find((quiz) => {
      const totalQuestions = parseQuiz(quiz.content).questions.length;
      const attemptedCount = Object.keys(quiz.questionAttempts).length;

      return attemptedCount < totalQuestions;
    }) ?? null;

  const [expandedQuizId, setExpandedQuizId] = useState<number | null>(null);

  const quizRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    if (firstIncompleteQuiz) {
      setExpandedQuizId(firstIncompleteQuiz.id);
    }
  }, [firstIncompleteQuiz?.id]);

  useEffect(() => {
    if (expandedQuizId === null) {
      return;
    }

    requestAnimationFrame(() => {
      quizRefs.current[expandedQuizId]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [expandedQuizId]);

  const overallScore = calculateOverallScore(orderedQuizzes);

  const quizItems: QuizListItem[] = orderedQuizzes.map((quiz, index) => {
    const questionCount = parseQuiz(quiz.content).questions.length;
    const attemptedCount = Object.keys(quiz.questionAttempts).length;

    return {
      quiz,
      index: orderedQuizzes.length - index,
      questionCount,
      attemptedCount,
      score: calculateQuizScore(quiz),
      isComplete: attemptedCount === questionCount,
      isExpanded: expandedQuizId === quiz.id,
    };
  });

  function toggleQuiz(quizId: number) {
    setExpandedQuizId((current) => (current === quizId ? null : quizId));
  }

  function setQuizRef(quizId: number, element: HTMLDivElement | null) {
    quizRefs.current[quizId] = element;
  }

  return {
    document,
    documentId,
    quizItems,
    overallScore,
    toggleQuiz,
    setQuizRef,
  };
}

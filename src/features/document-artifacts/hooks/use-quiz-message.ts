"use client";

import { useState } from "react";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import type { DocumentArtifact } from "../types/document-artifact";

import { useAnswerQuizQuestion } from "./use-answer-quiz-question";
import { parseQuiz } from "../lib/quiz-parser";

interface UseQuizMessageProps {
  quiz: DocumentArtifact;
  conversationId: number;
}

export function useQuizMessage({
  quiz: artifact,
  conversationId,
}: UseQuizMessageProps) {
  const workspaceId = useWorkspaceId();
  const answerQuizQuestionMutation = useAnswerQuizQuestion();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const parsedQuiz = parseQuiz(artifact.content);
  const totalQuestions = parsedQuiz.questions.length;
  const currentQuestion = parsedQuiz.questions[currentQuestionIndex];

  if (!currentQuestion) {
    return null;
  }

  const selectedOptionIndex =
    artifact.questionAttempts[String(currentQuestionIndex)];

  const attempted = selectedOptionIndex !== undefined;

  const isCorrect =
    attempted && selectedOptionIndex === currentQuestion.correctOptionIndex;

  const attemptedCount = Object.keys(artifact.questionAttempts).length;

  const isQuizComplete = attemptedCount === totalQuestions;

  const hasPreviousQuestion = currentQuestionIndex > 0;

  const hasNextQuestion = currentQuestionIndex < totalQuestions - 1;

  function handleAnswer(optionIndex: number) {
    if (artifact.questionAttempts[String(currentQuestionIndex)] !== undefined) {
      return;
    }

    if (answerQuizQuestionMutation.isPending) {
      return;
    }

    answerQuizQuestionMutation.mutate({
      workspaceId,
      documentId: artifact.documentId,
      artifactId: artifact.id,
      questionIndex: currentQuestionIndex,
      selectedOptionIndex: optionIndex,
      conversationId,
    });
  }

  function goToPreviousQuestion() {
    if (!hasPreviousQuestion) {
      return;
    }

    setCurrentQuestionIndex((current) => current - 1);
  }

  function goToNextQuestion() {
    if (!hasNextQuestion) {
      return;
    }

    setCurrentQuestionIndex((current) => current + 1);
  }

  return {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,

    attempted,
    attemptedCount,
    isQuizComplete,

    selectedOptionIndex,
    isCorrect,

    hasPreviousQuestion,
    hasNextQuestion,

    isAnswering: answerQuizQuestionMutation.isPending,

    handleAnswer,
    goToPreviousQuestion,
    goToNextQuestion,
  };
}

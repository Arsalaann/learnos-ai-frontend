"use client";

import { useState } from "react";

import type { Message } from "@/features/messages/types/message";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { useAnswerQuizQuestion } from "./use-answer-quiz-question";
import { parseQuiz } from "../lib/quiz-parser";

export function useQuizMessage(message: Message) {
  const workspaceId = useWorkspaceId();
  const answerQuizQuestionMutation = useAnswerQuizQuestion();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const artifact = message.artifact;

  if (!artifact) {
    return null;
  }

  const quiz = parseQuiz(artifact.content);
  const totalQuestions = quiz.questions.length;
  const currentQuestion = quiz.questions[currentQuestionIndex];

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
    if (!artifact) return;

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
      conversationId: message.conversationId,
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

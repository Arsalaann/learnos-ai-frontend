"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { answerQuizQuestion } from "../api/document-artifact-api";

interface AnswerQuizQuestionVariables {
  workspaceId: number;
  documentId: number;
  artifactId: number;
  questionIndex: number;
  selectedOptionIndex: number;
  conversationId: number;
}

export function useAnswerQuizQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      documentId,
      artifactId,
      questionIndex,
      selectedOptionIndex,
    }: AnswerQuizQuestionVariables) =>
      answerQuizQuestion(
        workspaceId,
        documentId,
        artifactId,
        questionIndex,
        selectedOptionIndex,
      ),

    onSuccess: (artifact, variables) => {
      queryClient.setQueryData(
        queryKeys.documentArtifacts.quizzes(
          variables.workspaceId,
          variables.documentId,
        ),
        (quizzes) => {
          if (!Array.isArray(quizzes)) {
            return quizzes;
          }

          return quizzes.map((quiz) =>
            quiz.id === artifact.id ? artifact : quiz,
          );
        },
      );

      queryClient.setQueryData(
        queryKeys.messages.all(variables.conversationId),
        (messages) => {
          if (!Array.isArray(messages)) {
            return messages;
          }

          return messages.map((message) =>
            message.artifactId === artifact.id
              ? {
                  ...message,
                  artifact,
                }
              : message,
          );
        },
      );
    },
  });
}

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { generateQuiz } from "../api/document-artifact-api";

interface GenerateQuizVariables {
  workspaceId: number;
  documentId: number;
}

export function useGenerateQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, documentId }: GenerateQuizVariables) =>
      generateQuiz(workspaceId, documentId),

    onSuccess: (message, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.messages.all(message.conversation_id),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.documentArtifacts.quizzes(
          variables.workspaceId,
          variables.documentId,
        ),
      });
    },
  });
}

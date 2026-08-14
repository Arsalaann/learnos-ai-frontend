"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { generateConversationSummary } from "../api/document-artifact-api";

import { type DocumentArtifact } from "../types/document-artifact";

export function useGenerateConversationSummary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      documentId,
    }: {
      workspaceId: number;
      documentId: number;
    }) => generateConversationSummary(workspaceId, documentId),

    onSuccess(summary, variables) {
      queryClient.setQueryData(
        queryKeys.documentArtifacts.conversationSummaries(
          variables.workspaceId,
          variables.documentId,
        ),
        (current: DocumentArtifact[] | undefined) => {
          if (!current) {
            return [summary];
          }

          const exists = current.some((item) => item.id === summary.id);

          if (exists) {
            return current.map((item) =>
              item.id === summary.id ? summary : item,
            );
          }

          return [...current, summary];
        },
      );
    },
  });
}

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { deleteConversationSummary } from "../api/document-artifact-api";

import { type DocumentArtifact } from "../types/document-artifact";

export function useDeleteConversationSummary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      documentId,
      artifactId,
    }: {
      workspaceId: number;
      documentId: number;
      artifactId: number;
    }) => deleteConversationSummary(workspaceId, documentId, artifactId),

    onSuccess(_, variables) {
      queryClient.setQueryData(
        queryKeys.documentArtifacts.conversationSummaries(
          variables.workspaceId,
          variables.documentId,
        ),
        (current: DocumentArtifact[] | undefined) =>
          current?.filter((summary) => summary.id !== variables.artifactId) ??
          [],
      );
    },
  });
}

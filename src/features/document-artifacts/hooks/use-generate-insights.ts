"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { generateInsights } from "../api/document-artifact-api";

export function useGenerateInsights() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      documentId,
    }: {
      workspaceId: number;
      documentId: number;
    }) => generateInsights(workspaceId, documentId),

    onSuccess(response, variables) {
      queryClient.setQueryData(
        queryKeys.documentArtifacts.insightsStatus(
          variables.workspaceId,
          variables.documentId,
        ),
        {
          status: response.status,
          error: null,
        },
      );
    },
  });
}

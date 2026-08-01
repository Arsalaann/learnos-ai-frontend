import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { generateSummary } from "../api/document-artifact-api";

export function useGenerateSummary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      documentId,
    }: {
      workspaceId: number;
      documentId: number;
    }) => generateSummary(workspaceId, documentId),

    onSuccess(summary, variables) {
      queryClient.setQueryData(
        queryKeys.documentArtifacts.summary(
          variables.workspaceId,
          variables.documentId,
        ),
        summary,
      );
    },
  });
}

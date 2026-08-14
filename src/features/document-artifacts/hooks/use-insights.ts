import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { getInsights } from "../api/document-artifact-api";

export function useInsights(workspaceId: number, documentId: number | null) {
  return useQuery({
    queryKey:
      documentId === null
        ? ["document-insights", workspaceId, "disabled"]
        : queryKeys.documentArtifacts.insights(workspaceId, documentId),

    queryFn: () => {
      if (documentId === null) {
        throw new Error("Document ID is required to fetch insights.");
      }

      return getInsights(workspaceId, documentId);
    },

    enabled: false,
    retry: false,
  });
}

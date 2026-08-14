import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

export type InsightsStatus = "generating" | "ready" | "failed";

export interface InsightsStatusState {
  status: InsightsStatus;
  error: string | null;
}

export function useInsightsStatus(
  workspaceId: number,
  documentId: number | null,
) {
  return useQuery<InsightsStatusState>({
    queryKey:
      documentId === null
        ? ["document-insights-status", workspaceId, "disabled"]
        : queryKeys.documentArtifacts.insightsStatus(workspaceId, documentId),

    queryFn: async () => {
      throw new Error("Insights status is managed by workspace SSE.");
    },

    enabled: false,

    staleTime: Infinity,

    gcTime: Infinity,
  });
}

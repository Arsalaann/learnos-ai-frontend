import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { getSummary } from "../api/document-artifact-api";

export function useSummary(workspaceId: number, documentId: number) {
  return useQuery({
    queryKey: queryKeys.documentArtifacts.summary(workspaceId, documentId),
    queryFn: () => getSummary(workspaceId, documentId),
    retry: false,
  });
}

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { getConversationSummaries } from "../api/document-artifact-api";

export function useConversationSummaries(
  workspaceId: number,
  documentId: number,
) {
  return useQuery({
    queryKey: queryKeys.documentArtifacts.conversationSummaries(
      workspaceId,
      documentId,
    ),
    queryFn: () => getConversationSummaries(workspaceId, documentId),
    retry: false,
  });
}

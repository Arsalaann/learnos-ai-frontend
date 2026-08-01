import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { getDocuments } from "../api/document-api";

export function useDocuments(workspaceId: number) {
  return useQuery({
    queryKey: queryKeys.documents.all(workspaceId),

    queryFn: () => getDocuments(workspaceId),
  });
}

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { getWorkspace } from "../api/workspace-api";

export function useWorkspace(workspaceId: number) {
  return useQuery({
    queryKey: queryKeys.workspaces.detail(workspaceId),
    queryFn: () => getWorkspace(workspaceId),
  });
}

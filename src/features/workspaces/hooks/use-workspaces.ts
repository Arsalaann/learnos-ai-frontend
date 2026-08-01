import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { getWorkspaces } from "../api/workspace-api";

export function useWorkspaces() {
  return useQuery({
    queryKey: queryKeys.workspaces.all(),
    queryFn: getWorkspaces,
  });
}

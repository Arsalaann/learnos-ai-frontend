import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { getWorkspaces } from "../api/workspace-api";

export function useWorkspaces() {
  const { isAuthenticated, isInitializing } = useAuth();

  return useQuery({
    queryKey: queryKeys.workspaces.all(),
    queryFn: getWorkspaces,
    enabled: isAuthenticated && !isInitializing,
  });
}

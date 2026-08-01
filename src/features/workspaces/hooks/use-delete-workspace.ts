import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { deleteWorkspace } from "../api/workspace-api";

export function useDeleteWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWorkspace,

    onSuccess: (_, workspaceId) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.workspaces.all(),
      });

      queryClient.removeQueries({
        queryKey: queryKeys.workspaces.detail(workspaceId),
      });
    },
  });
}

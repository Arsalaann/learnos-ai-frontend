import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { createWorkspace } from "../api/workspace-api";

export function useCreateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWorkspace,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.workspaces.all(),
      });
    },
  });
}

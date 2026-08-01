import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateWorkspace } from "../api/workspace-api";
import { queryKeys } from "@/lib/query-keys";

export function useUpdateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      title,
    }: {
      workspaceId: number;
      title: string;
    }) =>
      updateWorkspace(workspaceId, {
        title,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.workspaces.all(),
      });
    },
  });
}

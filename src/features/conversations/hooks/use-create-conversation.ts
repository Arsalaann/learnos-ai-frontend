import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { createConversation } from "../api/conversation-api";

export function useCreateConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createConversation,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.conversations.all(variables.workspaceId),
      });
    },
  });
}

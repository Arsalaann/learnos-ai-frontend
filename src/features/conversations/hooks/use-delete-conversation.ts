import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { deleteConversation } from "../api/conversation-api";

export interface DeleteConversationVariables {
  workspaceId: number;
  conversationId: number;
}

export function useDeleteConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      conversationId,
    }: DeleteConversationVariables) =>
      deleteConversation(workspaceId, conversationId),

    onSuccess: (_, { workspaceId, conversationId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.conversations.all(workspaceId),
      });

      queryClient.removeQueries({
        queryKey: queryKeys.messages.all(conversationId),
      });
    },
  });
}

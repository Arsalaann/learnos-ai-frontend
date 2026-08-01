import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { renameConversation } from "../api/conversation-api";

export interface RenameConversationVariables {
  workspaceId: number;
  conversationId: number;
  title: string;
}

export function useRenameConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      conversationId,
      title,
    }: RenameConversationVariables) =>
      renameConversation(workspaceId, conversationId, title),

    onSuccess: (_, { workspaceId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.conversations.all(workspaceId),
      });
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { sendMessage } from "../api/message-api";

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.messages.all(variables.conversationId),
      });
    },
  });
}

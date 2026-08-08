"use client";

import { useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { streamMessage } from "../api/message-api";

export function useStreamMessage() {
  const queryClient = useQueryClient();

  async function startStream(
    conversationId: number,
    content: string,
    onToken: (content: string) => void,
  ) {
    await streamMessage(conversationId, content, {
      onToken,

      onDone: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.messages.all(conversationId),
        });
      },

      onError: (message) => {
        throw new Error(message);
      },
    });
  }

  return {
    startStream,
  };
}

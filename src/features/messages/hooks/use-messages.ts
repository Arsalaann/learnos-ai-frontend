"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { getMessages } from "../api/message-api";

export function useMessages(conversationId: number | null) {
  return useQuery({
    queryKey: queryKeys.messages.all(conversationId ?? 0),

    queryFn: () => {
      if (conversationId === null) {
        throw new Error("Conversation ID is required.");
      }

      return getMessages(conversationId);
    },

    enabled: conversationId !== null,
  });
}

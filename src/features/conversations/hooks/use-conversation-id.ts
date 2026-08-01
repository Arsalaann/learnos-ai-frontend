"use client";

import { useParams } from "next/navigation";

export function useConversationId() {
  const params = useParams();

  if (!params.conversationId) {
    return null;
  }

  return Number(params.conversationId);
}

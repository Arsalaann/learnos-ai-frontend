import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { getConversations } from "../api/conversation-api";

export function useConversations(workspaceId: number) {
  return useQuery({
    queryKey: queryKeys.conversations.all(workspaceId),

    queryFn: () => getConversations(workspaceId),
  });
}

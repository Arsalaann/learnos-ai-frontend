"use client";
"use client";

import Chat from "@/features/messages/components/chat";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useConversationId } from "../hooks/use-conversation-id";

export default function WorkspaceConversationChat() {
  const workspaceId = useWorkspaceId();
  const conversationId = useConversationId();

  if (conversationId === null) {
    return null;
  }

  return (
    <Chat
      workspaceId={workspaceId}
      conversationId={conversationId}
      showContextSelector
    />
  );
}

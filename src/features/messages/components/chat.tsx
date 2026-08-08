"use client";

import ChatContent from "./chat-content";
import MessageForm from "./message-form";
import { ChatProvider } from "./chat-context";

interface ChatProps {
  workspaceId: number;
  conversationId: number | null;
  showContextSelector: boolean;
}

export default function Chat({
  workspaceId,
  conversationId,
  showContextSelector,
}: ChatProps) {
  return (
    <ChatProvider workspaceId={workspaceId} conversationId={conversationId}>
      <div className="mx-auto flex min-h-screen w-full flex-col items-start">
        <ChatContent conversationId={conversationId} />

        <div className="pb-6 sticky bottom-0 w-full z-9">
          <MessageForm
            workspaceId={workspaceId}
            conversationId={conversationId}
            showContextSelector={showContextSelector}
          />
        </div>
      </div>
    </ChatProvider>
  );
}

"use client";

import ChatContent from "./chat-content";
import MessageForm from "./message-form";

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
    <div className="mx-auto flex h-screen w-full flex-col items-start">
      <ChatContent conversationId={conversationId} />

      <div className="pb-6 sticky bottom-0 w-full">
        <MessageForm
          workspaceId={workspaceId}
          conversationId={conversationId}
          showContextSelector={showContextSelector}
        />
      </div>
    </div>
  );
}

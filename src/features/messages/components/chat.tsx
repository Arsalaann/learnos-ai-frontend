"use client";

import ChatContent from "./chat-content";
import MessageForm from "./message-form";
import { ChatProvider } from "./chat-context";

interface ChatProps {
  workspaceId: number;
  conversationId: number | null;
  showContextSelector: boolean;
  actions?: React.ReactNode;
  interactionLocked?: boolean;
}

export default function Chat({
  workspaceId,
  conversationId,
  showContextSelector,
  actions,
  interactionLocked = false,
}: ChatProps) {
  return (
    <ChatProvider workspaceId={workspaceId} conversationId={conversationId}>
      <div className="mx-auto flex min-h-screen w-full flex-col items-start">
        <ChatContent conversationId={conversationId} />

        {!interactionLocked && (
          <div className="sticky bottom-0 z-10 w-full pb-6">
            {actions}

            <MessageForm
              workspaceId={workspaceId}
              conversationId={conversationId}
              showContextSelector={showContextSelector}
            />
          </div>
        )}
      </div>
    </ChatProvider>
  );
}

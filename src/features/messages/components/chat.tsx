"use client";

import { type ReactNode } from "react";

import ChatContent from "./chat-content";
import MessageForm from "./message-form";
import { ChatProvider } from "./chat-context";

interface ChatProps {
  workspaceId: number;
  conversationId: number | null;
  showContextSelector: boolean;
  actions?: ReactNode;
  interactionLocked?: boolean;
}

interface ChatViewProps {
  workspaceId: number;
  conversationId: number | null;
  showContextSelector: boolean;
  actions?: ReactNode;
  interactionLocked?: boolean;
}

export function ChatView({
  workspaceId,
  conversationId,
  showContextSelector,
  actions,
  interactionLocked = false,
}: ChatViewProps) {
  return (
    <div className="mx-auto flex w-full flex-1 flex-col items-start">
      <ChatContent conversationId={conversationId} />

      <div className="sticky bottom-0 z-10 w-full pb-6">
        {interactionLocked ? (
          <div className="flex items-center justify-center py-4 text-sm text-muted-foreground">
            Complete the quiz first to continue chatting.
          </div>
        ) : (
          <>
            {actions}

            <MessageForm
              workspaceId={workspaceId}
              conversationId={conversationId}
              showContextSelector={showContextSelector}
            />
          </>
        )}
      </div>
    </div>
  );
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
      <ChatView
        workspaceId={workspaceId}
        conversationId={conversationId}
        showContextSelector={showContextSelector}
        actions={actions}
        interactionLocked={interactionLocked}
      />
    </ChatProvider>
  );
}

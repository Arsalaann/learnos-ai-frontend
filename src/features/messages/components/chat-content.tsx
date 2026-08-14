"use client";

import { MessageSquarePlus } from "lucide-react";

import { useMessages } from "../hooks/use-messages";

import { useChat } from "./chat-context";
import MessageList from "./message-list";
import MessageListSkeleton from "./message-list-skeleton";

interface ChatContentProps {
  conversationId: number | null;
}

function EmptyChatState() {
  return (
    <div className="flex -z-2 h-full w-full flex-1 flex-col items-center justify-center bg-background px-4 text-center">
      <div className="flex items-center gap-5">
        <div className="flex flex-col text-left">
          <h2 className="mb-2 text-2xl font-semibold tracking-tight text-foreground">
            Start a new conversation
          </h2>

          <p className="max-w-md text-sm text-muted-foreground">
            Ask anything from your provided context.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ChatContent({ conversationId }: ChatContentProps) {
  const { data: messages, isPending } = useMessages(conversationId);
  const { isStreaming, streamingContent } = useChat();

  if (conversationId === null) {
    return <EmptyChatState />;
  }

  if (isPending) {
    return <MessageListSkeleton />;
  }

  const chatMessages = (messages ?? []).filter(
    (message) => message.messageType !== "quiz",
  );

  if (!chatMessages.length) {
    return <EmptyChatState />;
  }

  return (
    <div className="w-full -z-2 flex-1 pt-12 pb-8">
      <MessageList
        messages={chatMessages}
        streamingContent={isStreaming ? streamingContent : ""}
      />
    </div>
  );
}

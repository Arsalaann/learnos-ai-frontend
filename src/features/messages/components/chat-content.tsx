"use client";
import { Button } from "@/components/ui/button";
import { useMessages } from "../hooks/use-messages";
import { MessageSquarePlus, Sparkles } from "lucide-react";

import { useChat } from "./chat-context";
import MessageList from "./message-list";
import MessageListSkeleton from "./message-list-skeleton";
import MessageItem from "./message-item";

interface ChatContentProps {
  conversationId: number | null;
}

export default function ChatContent({ conversationId }: ChatContentProps) {
  const { data: messages, isPending } = useMessages(conversationId);
  const { isStreaming, streamingContent } = useChat();

  if (conversationId === null || !messages?.length) {
    return (
      <div className="flex h-full w-full flex-1 flex-col items-center justify-center bg-background px-4 text-center">
        <div className="flex items-center gap-5">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 shadow-sm">
            <MessageSquarePlus className="h-10 w-10 text-primary" />
          </div>

          <div className="flex-col">
            <h2 className="mb-2 text-2xl font-semibold tracking-tight text-foreground">
              Start a new conversation
            </h2>

            <p className="mb-8 max-w-md text-sm text-muted-foreground">
              Ask anything from your provided context.
            </p>
          </div>
        </div>

        {/* Optional: Quick Start Prompts (Remove if not needed)
        <div className="grid w-full max-w-lg grid-cols-1 gap-3 sm:grid-cols-2">
          <Button
            variant="outline"
            className="h-10 group flex items-center justify-center gap-2  text-sm font-medium"
          >
            <Sparkles className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
            <span>Brainstorm ideas</span>
          </Button>
          <Button
            variant="outline"
            className="h-10 group flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Sparkles className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
            <span>Summarize context</span>
          </Button>
        </div> */}
      </div>
    );
  }

  if (isPending) {
    return <MessageListSkeleton />;
  }

  return (
    <div className="w-full flex-1 pt-12 pb-8">
      <MessageList
        messages={messages}
        streamingContent={isStreaming ? streamingContent : ""}
      />
    </div>
  );
}

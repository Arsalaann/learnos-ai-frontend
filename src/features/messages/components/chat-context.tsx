"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { conversationRoutes } from "@/features/conversations/lib/conversation-page-routes";
import { useCreateConversation } from "@/features/conversations/hooks/use-create-conversation";

import { streamMessage } from "../api/message-api";

interface ChatContextValue {
  isStreaming: boolean;
  streamingContent: string;
  sendMessage: (content: string) => Promise<void>;
}

interface ChatProviderProps {
  workspaceId: number;
  conversationId: number | null;
  children: ReactNode;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({
  workspaceId,
  conversationId,
  children,
}: ChatProviderProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createConversationMutation = useCreateConversation();

  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");

  async function sendMessage(content: string) {
    if (isStreaming) {
      return;
    }

    let currentConversationId = conversationId;

    setIsStreaming(true);
    setStreamingContent("");

    try {
      if (currentConversationId === null) {
        const conversation = await createConversationMutation.mutateAsync({
          workspaceId,
          title: content.length > 60 ? `${content.slice(0, 60)}...` : content,
        });

        currentConversationId = conversation.id;

        router.replace(
          conversationRoutes.detail(workspaceId, currentConversationId),
        );
      }

      await streamMessage(currentConversationId, content, {
        onToken: (token) => {
          setStreamingContent((current) => current + token);
        },

        onDone: () => {},

        onError: (message) => {
          throw new Error(message);
        },
      });

      await queryClient.refetchQueries({
        queryKey: queryKeys.messages.all(currentConversationId),
      });

      setStreamingContent("");
    } finally {
      setIsStreaming(false);
    }
  }

  return (
    <ChatContext.Provider
      value={{
        isStreaming,
        streamingContent,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat must be used within ChatProvider.");
  }

  return context;
}

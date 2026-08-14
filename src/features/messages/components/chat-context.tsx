"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { conversationRoutes } from "@/features/conversations/lib/conversation-page-routes";
import { useCreateConversation } from "@/features/conversations/hooks/use-create-conversation";

import { streamMessage } from "../api/message-api";
import type { Message } from "../types/message";

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

const STREAM_RENDER_INTERVAL_MS = 15;
const STREAM_RENDER_CHUNK_SIZE = 5;

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

  const pendingContentRef = useRef("");
  const renderIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function stopRenderInterval() {
    if (renderIntervalRef.current === null) {
      return;
    }

    clearInterval(renderIntervalRef.current);
    renderIntervalRef.current = null;
  }

  function renderNextChunk() {
    if (!pendingContentRef.current) {
      return;
    }

    const chunk = pendingContentRef.current.slice(0, STREAM_RENDER_CHUNK_SIZE);

    pendingContentRef.current = pendingContentRef.current.slice(
      STREAM_RENDER_CHUNK_SIZE,
    );

    setStreamingContent((current) => current + chunk);
  }

  function startRenderInterval() {
    stopRenderInterval();

    renderIntervalRef.current = setInterval(() => {
      renderNextChunk();
    }, STREAM_RENDER_INTERVAL_MS);
  }

  async function waitForPendingContent() {
    while (pendingContentRef.current) {
      renderNextChunk();

      await new Promise<void>((resolve) => {
        setTimeout(resolve, STREAM_RENDER_INTERVAL_MS);
      });
    }
  }

  async function addOptimisticUserMessage(
    currentConversationId: number,
    content: string,
  ) {
    const queryKey = queryKeys.messages.all(currentConversationId);

    await queryClient.cancelQueries({
      queryKey,
    });

    const optimisticMessage: Message = {
      id: -Date.now(),
      conversationId: currentConversationId,
      role: "user",
      messageType: "text",
      content: {
        text: content,
      },
      artifactId: null,
      artifact: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    queryClient.setQueryData<Message[]>(queryKey, (messages = []) => [
      ...messages,
      optimisticMessage,
    ]);
  }

  async function sendMessage(content: string) {
    if (isStreaming) {
      return;
    }

    let currentConversationId = conversationId;

    setIsStreaming(true);
    setStreamingContent("");
    pendingContentRef.current = "";

    startRenderInterval();

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

      await addOptimisticUserMessage(currentConversationId, content);

      await streamMessage(currentConversationId, content, {
        onToken: (token) => {
          pendingContentRef.current += token;
        },

        onDone: () => {},

        onError: (message) => {
          throw new Error(message);
        },
      });

      stopRenderInterval();

      await waitForPendingContent();

      await queryClient.refetchQueries({
        queryKey: queryKeys.messages.all(currentConversationId),
      });

      setStreamingContent("");
    } finally {
      stopRenderInterval();
      pendingContentRef.current = "";
      setIsStreaming(false);
    }
  }

  useEffect(() => {
    return () => {
      stopRenderInterval();
      pendingContentRef.current = "";
    };
  }, []);

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

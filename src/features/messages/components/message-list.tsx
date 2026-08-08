"use client";

import { useEffect, useRef } from "react";

import type { Message } from "../types/message";

import MessageItem from "./message-item";

interface MessageListProps {
  messages: Message[];
  streamingContent?: string;
}

export default function MessageList({
  messages,
  streamingContent = "",
}: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);

  function handleScroll() {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    shouldAutoScrollRef.current = distanceFromBottom < 100;
  }

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    container.scrollTop = container.scrollHeight;
  }, []);

  useEffect(() => {
    if (!shouldAutoScrollRef.current) {
      return;
    }

    bottomRef.current?.scrollIntoView({
      behavior: "auto",
    });
  }, [messages, streamingContent]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex h-full flex-col overflow-y-auto"
    >
      <div className="flex flex-col gap-4">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}

        {streamingContent && (
          <MessageItem
            message={{
              id: -1,
              conversationId: messages[0]?.conversationId ?? 0,
              role: "assistant",
              content: {
                text: streamingContent,
              },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }}
          />
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}

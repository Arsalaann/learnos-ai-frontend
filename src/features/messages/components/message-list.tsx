"use client";

import { useEffect, useRef } from "react";

import type { Message } from "../types/message";

import MessageItem from "./message-item";

interface MessageListProps {
  messages: Message[];
  streamingContent?: string;
}

const AUTO_SCROLL_THRESHOLD = 50;

export default function MessageList({
  messages,
  streamingContent = "",
}: MessageListProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);

  function getScrollContainer(): HTMLElement | null {
    let element = contentRef.current?.parentElement;

    while (element) {
      const style = window.getComputedStyle(element);

      if (style.overflowY === "auto" || style.overflowY === "scroll") {
        return element;
      }

      element = element.parentElement;
    }

    return null;
  }

  function isNearBottom(container: HTMLElement): boolean {
    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    return distanceFromBottom <= AUTO_SCROLL_THRESHOLD;
  }

  function handleScroll() {
    const container = getScrollContainer();

    if (!container) {
      return;
    }

    shouldAutoScrollRef.current = isNearBottom(container);
  }

  function scrollToBottom() {
    const container = getScrollContainer();

    if (!container) {
      return;
    }

    container.scrollTop = container.scrollHeight;
  }

  useEffect(() => {
    shouldAutoScrollRef.current = true;

    requestAnimationFrame(() => {
      scrollToBottom();
    });
  }, []);

  useEffect(() => {
    if (!shouldAutoScrollRef.current) {
      return;
    }

    requestAnimationFrame(() => {
      scrollToBottom();
    });
  }, [messages, streamingContent]);

  useEffect(() => {
    const container = getScrollContainer();

    if (!container) {
      return;
    }

    container.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={contentRef} className="w-full">
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
              messageType: "text",
              content: {
                text: streamingContent,
              },
              artifactId: null,
              artifact: null,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }}
          />
        )}
      </div>
    </div>
  );
}

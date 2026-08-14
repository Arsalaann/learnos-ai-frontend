import { cn } from "@/lib/utils";

import type { Message } from "../types/message";

import AssistantMessage from "./assistant-message";
import MessageBubble from "./message-bubble";

export default function MessageItem({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <MessageBubble isUser={isUser}>
        {isUser ? (
          <span className="whitespace-pre-wrap wrap-break-word">
            {message.content?.text ?? ""}
          </span>
        ) : (
          <AssistantMessage content={message.content?.text ?? ""} />
        )}
      </MessageBubble>
    </div>
  );
}

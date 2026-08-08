"use client";

import { SendHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import DocumentContextSelector from "./document-context-selector";
import { useChat } from "./chat-context";

import {
  messageSchema,
  type MessageFormValues,
} from "../schemas/message-schema";

interface MessageFormProps {
  workspaceId: number;
  conversationId: number | null;
  showContextSelector: boolean;
}

export default function MessageForm({ showContextSelector }: MessageFormProps) {
  const { isStreaming, sendMessage } = useChat();

  const form = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: MessageFormValues) {
    if (isStreaming) {
      return;
    }

    const text = values.text.trim();

    if (!text) {
      return;
    }

    form.reset();

    try {
      await sendMessage(text);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== "Enter") {
      return;
    }

    if (event.shiftKey) {
      return;
    }

    event.preventDefault();

    if (isStreaming) {
      return;
    }

    void form.handleSubmit(onSubmit)();
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="rounded-full border bg-background-default shadow-sm p-3 flex items-center"
    >
      <div className="flex items-center gap-2 w-full">
        {showContextSelector && <DocumentContextSelector />}

        <Textarea
          placeholder={
            isStreaming
              ? "Generating response..."
              : "Ask anything from the context you provided..."
          }
          disabled={isStreaming}
          className="min-h-10 max-h-48 flex-1 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          onKeyDown={handleKeyDown}
          {...form.register("text")}
        />

        <Button
          type="submit"
          size="icon"
          disabled={isStreaming || form.formState.isSubmitting}
          className="h-12 w-12 rounded-full bg-interactive"
        >
          <SendHorizontal />
        </Button>
      </div>
    </form>
  );
}

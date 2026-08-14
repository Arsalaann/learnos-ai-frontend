"use client";

import { useRef, useState } from "react";
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

  const [isMultiline, setIsMultiline] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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

    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
      setIsMultiline(false);
    }

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

  function handleTextareaInput(event: React.FormEvent<HTMLTextAreaElement>) {
    const textarea = event.currentTarget;

    if (!textarea.value) {
      textarea.style.height = "40px";
      setIsMultiline(false);
      return;
    }

    if (!isMultiline) {
      textarea.style.height = "40px";

      const isCurrentlyMultiline = textarea.scrollHeight > 40;

      setIsMultiline(isCurrentlyMultiline);

      textarea.style.height = `${Math.min(textarea.scrollHeight, 192)}px`;
    }
  }

  const textField = form.register("text");

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={[
        "rounded-full border bg-background-default p-2",
        isMultiline ? "flex flex-col rounded-none" : "flex items-center",
      ].join(" ")}
    >
      <div
        className={[
          "w-full",
          isMultiline ? "flex min-h-10 items-start" : "flex items-center gap-2",
        ].join(" ")}
      >
        <Textarea
          {...textField}
          ref={(element) => {
            textField.ref(element);
            textareaRef.current = element;
          }}
          placeholder={
            isStreaming
              ? "Generating response..."
              : "Ask anything from the context you provided..."
          }
          disabled={isStreaming}
          rows={1}
          className={[
            "min-h-10 max-h-48 flex-1 resize-none overflow-y-auto scrollbar-thin border-0 bg-transparent px-2 py-2 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
            isMultiline ? "w-full" : "",
          ].join(" ")}
          onInput={handleTextareaInput}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div
        className={[
          "flex items-center justify-between gap-2",
          isMultiline ? "mt-2 px-2" : "",
        ].join(" ")}
      >
        {showContextSelector ? <DocumentContextSelector /> : <div />}

        <Button
          type="submit"
          size="icon"
          disabled={isStreaming || form.formState.isSubmitting}
          className="h-10 w-10 shrink-0 rounded-full bg-interactive"
        >
          <SendHorizontal />
        </Button>
      </div>
    </form>
  );
}

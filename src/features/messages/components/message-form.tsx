"use client";

import { SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import DocumentContextSelector from "./document-context-selector";

import { useChatController } from "../hooks/use-chat-controller";

interface MessageFormProps {
  workspaceId: number;
  conversationId: number | null;
  showContextSelector: boolean;
}

export default function MessageForm({
  workspaceId,
  conversationId,
  showContextSelector,
}: MessageFormProps) {
  const { form, onSubmit, sendMessageMutation } = useChatController({
    workspaceId,
    conversationId,
  });

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key !== "Enter") {
      return;
    }

    if (event.shiftKey) {
      return;
    }

    event.preventDefault();

    form.handleSubmit(onSubmit)();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
        <Textarea
          placeholder="Ask anything from the context you provided..."
          className="resize-none border-0 px-4 pt-4 focus-visible:ring-0 focus-visible:ring-offset-0"
          onKeyDown={handleKeyDown}
          {...form.register("text")}
        />

        <div className="flex items-center justify-between px-3 pb-3 pt-2">
          <div className="flex items-center gap-2">
            {showContextSelector && <DocumentContextSelector />}
          </div>

          <Button
            type="submit"
            size="icon"
            disabled={sendMessageMutation.isPending}
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}

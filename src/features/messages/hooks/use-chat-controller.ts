"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { conversationRoutes } from "@/features/conversations/lib/conversation-page-routes";
import { useCreateConversation } from "@/features/conversations/hooks/use-create-conversation";

import { useSendMessage } from "./use-send-message";

import {
  messageSchema,
  type MessageFormValues,
} from "../schemas/message-schema";

interface UseChatControllerProps {
  workspaceId: number;
  conversationId: number | null;
}

export function useChatController({
  workspaceId,
  conversationId,
}: UseChatControllerProps) {
  const router = useRouter();

  const createConversationMutation = useCreateConversation();
  const sendMessageMutation = useSendMessage();

  const form = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: MessageFormValues) {
    let currentConversationId = conversationId;

    if (currentConversationId === null) {
      const conversation = await createConversationMutation.mutateAsync({
        workspaceId,
        title:
          values.text.length > 60
            ? `${values.text.slice(0, 60)}...`
            : values.text,
      });

      currentConversationId = conversation.id;
    }

    await sendMessageMutation.mutateAsync({
      conversationId: currentConversationId,
      content: values.text,
    });

    form.reset();

    if (conversationId === null) {
      router.replace(
        conversationRoutes.detail(workspaceId, currentConversationId),
      );
    }
  }

  return {
    form,
    onSubmit,
    sendMessageMutation,
  };
}

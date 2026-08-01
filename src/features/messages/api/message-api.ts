import { apiClient } from "@/lib/api-client";

import { messageRoutes } from "../lib/message-routes";

import type {
  Message,
  MessageResponse,
  SendMessageRequest,
} from "../types/message";

function mapMessage(message: MessageResponse): Message {
  return {
    id: message.id,
    conversationId: message.conversation_id,
    role: message.role,
    content: message.content,
    createdAt: message.created_at,
    updatedAt: message.updated_at,
  };
}

export async function getMessages(conversationId: number): Promise<Message[]> {
  const response = await apiClient.get<MessageResponse[]>(
    messageRoutes.all(conversationId),
  );

  return response.data.map(mapMessage);
}

export async function sendMessage({
  conversationId,
  content,
}: SendMessageRequest): Promise<Message> {
  const response = await apiClient.post<MessageResponse>(
    messageRoutes.all(conversationId),
    {
      content,
    },
  );

  return mapMessage(response.data);
}

export async function deleteMessage(
  conversationId: number,
  messageId: number,
): Promise<void> {
  await apiClient.delete(messageRoutes.detail(conversationId, messageId));
}

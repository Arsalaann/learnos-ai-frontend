import { apiClient } from "@/lib/api-client";

import { conversationApiRoutes } from "../lib/conversation-api-routes";

import type { Conversation, ConversationResponse } from "../types/conversation";

export interface CreateConversationRequest {
  workspaceId: number;
  title?: string;
}

function mapConversation(conversation: ConversationResponse): Conversation {
  return {
    id: conversation.id,
    documentId: conversation.document_id,
    conversationType: conversation.conversation_type,
    title: conversation.title,
    createdAt: conversation.created_at,
    updatedAt: conversation.updated_at,
  };
}

export async function getConversations(
  workspaceId: number,
): Promise<Conversation[]> {
  const response = await apiClient.get<ConversationResponse[]>(
    conversationApiRoutes.all(workspaceId),
  );

  return response.data.map(mapConversation);
}

export async function createConversation({
  workspaceId,
  title,
}: CreateConversationRequest): Promise<Conversation> {
  const response = await apiClient.post<ConversationResponse>(
    conversationApiRoutes.all(workspaceId),
    {
      title,
    },
  );

  return mapConversation(response.data);
}

export async function renameConversation(
  workspaceId: number,
  conversationId: number,
  title: string,
): Promise<Conversation> {
  const response = await apiClient.patch<ConversationResponse>(
    conversationApiRoutes.detail(workspaceId, conversationId),
    {
      title,
    },
  );

  return mapConversation(response.data);
}

export async function deleteConversation(
  workspaceId: number,
  conversationId: number,
): Promise<void> {
  await apiClient.delete(
    conversationApiRoutes.detail(workspaceId, conversationId),
  );
}

export type MessageRole = "user" | "assistant";

export interface MessageContent {
  text: string;
}

export interface MessageResponse {
  id: number;
  conversation_id: number;

  role: MessageRole;
  content: MessageContent;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: number;
  conversationId: number;
  role: MessageRole;
  content: MessageContent;
  createdAt: string;
  updatedAt: string;
}

export interface SendMessageRequest {
  conversationId: number;
  content: string;
}

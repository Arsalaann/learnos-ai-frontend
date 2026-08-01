export type ConversationType = "workspace" | "document";

export interface Conversation {
  id: number;
  documentId: number | null;
  conversationType: ConversationType;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationResponse {
  id: number;
  document_id: number | null;
  conversation_type: ConversationType;
  title: string;
  created_at: string;
  updated_at: string;
}

import type {
  DocumentArtifact,
  DocumentArtifactResponse,
} from "@/features/document-artifacts/types/document-artifact";

export type MessageRole = "user" | "assistant";

export type MessageType = "text" | "quiz" | "flashcards";

export interface MessageContent {
  text: string;
}

export interface MessageResponse {
  id: number;
  conversation_id: number;
  role: MessageRole;
  message_type: MessageType;
  content: MessageContent | null;
  artifact_id: number | null;
  artifact: DocumentArtifactResponse | null;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: number;
  conversationId: number;
  role: MessageRole;
  messageType: MessageType;
  content: MessageContent | null;
  artifactId: number | null;
  artifact: DocumentArtifact | null;
  createdAt: string;
  updatedAt: string;
}

export interface SendMessageRequest {
  conversationId: number;
  content: string;
}

export interface DocumentArtifact {
  id: number;
  documentId: number;
  type: string;
  content: string;
  provider: string;
  model: string;
  questionAttempts: Record<string, number>;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentArtifactResponse {
  id: number;
  document_id: number;
  type: string;
  content: string;
  provider: string;
  model: string;
  question_attempts: Record<string, number>;
  created_at: string;
  updated_at: string;
}

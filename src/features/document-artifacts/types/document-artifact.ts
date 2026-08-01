export interface DocumentArtifact {
  id: number;
  documentId: number;
  type: string;
  content: string;
  provider: string;
  model: string;
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
  created_at: string;
  updated_at: string;
}

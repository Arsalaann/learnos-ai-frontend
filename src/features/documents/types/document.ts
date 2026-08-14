export type DocumentStatus = "processing" | "ready" | "failed";

export type DocumentStage = "reading" | "preparing" | "analyzing" | "finishing";

export interface Document {
  id: number;
  conversationId: number | null;
  originalFilename: string;
  contentType: string;
  fileSize: number;
  status: DocumentStatus;
  stage: DocumentStage | null;
  progress: number | null;
  processingError: string | null;
  includeInWorkspaceContext: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentResponse {
  id: number;
  original_filename: string;
  content_type: string;
  conversation_id: number | null;
  file_size: number;
  status: DocumentStatus;
  stage: DocumentStage | null;
  progress: number | null;
  processing_error: string | null;
  include_in_workspace_context: boolean;
  created_at: string;
  updated_at: string;
}

export interface UploadDocumentRequest {
  workspaceId: number;
  file: File;
}

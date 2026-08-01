export interface Document {
  id: number;
  conversationId: number;
  originalFilename: string;
  contentType: string;
  fileSize: number;
  includeInWorkspaceContext: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentResponse {
  id: number;
  conversation_id: number;
  original_filename: string;
  content_type: string;
  file_size: number;
  include_in_workspace_context: boolean;
  created_at: string;
  updated_at: string;
}

export interface UploadDocumentRequest {
  workspaceId: number;
  file: File;
}

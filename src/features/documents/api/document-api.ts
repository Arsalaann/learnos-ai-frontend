import { apiClient } from "@/lib/api-client";

import { documentRoutes } from "../lib/document-routes";

import type {
  Document,
  DocumentResponse,
  UploadDocumentRequest,
} from "../types/document";

function mapDocument(document: DocumentResponse): Document {
  return {
    id: document.id,
    conversationId: document.conversation_id,
    originalFilename: document.original_filename,
    contentType: document.content_type,
    fileSize: document.file_size,
    status: document.status,
    stage: document.stage,
    progress: document.progress,
    processingError: document.processing_error,
    includeInWorkspaceContext: document.include_in_workspace_context,
    createdAt: document.created_at,
    updatedAt: document.updated_at,
  };
}

export async function getDocuments(workspaceId: number): Promise<Document[]> {
  const response = await apiClient.get<DocumentResponse[]>(
    `${documentRoutes.workspace(workspaceId)}/documents`,
  );

  return response.data.map(mapDocument);
}

export async function uploadDocument({
  workspaceId,
  file,
}: UploadDocumentRequest): Promise<Document> {
  const formData = new FormData();

  formData.append("file", file);

  const response = await apiClient.post<DocumentResponse>(
    `${documentRoutes.workspace(workspaceId)}/documents`,
    formData,
  );

  return mapDocument(response.data);
}

export async function reprocessDocument(
  workspaceId: number,
  documentId: number,
): Promise<Document> {
  const response = await apiClient.post<DocumentResponse>(
    documentRoutes.reprocess(workspaceId, documentId),
  );

  return mapDocument(response.data);
}

export async function getDocument(
  workspaceId: number,
  documentId: number,
): Promise<Document> {
  const response = await apiClient.get<DocumentResponse>(
    documentRoutes.detail(workspaceId, documentId),
  );

  return mapDocument(response.data);
}

export async function updateDocument(
  workspaceId: number,
  documentId: number,
  includeInWorkspaceContext: boolean,
): Promise<Document> {
  const response = await apiClient.patch<DocumentResponse>(
    `/workspaces/${workspaceId}/documents/${documentId}`,
    {
      include_in_workspace_context: includeInWorkspaceContext,
    },
  );

  return mapDocument(response.data);
}

export async function deleteDocument(
  workspaceId: number,
  documentId: number,
): Promise<void> {
  await apiClient.delete(documentRoutes.detail(workspaceId, documentId));
}

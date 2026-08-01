import { apiClient } from "@/lib/api-client";

import { documentArtifactRoutes } from "../lib/document-artifact-routes";

import type {
  DocumentArtifact,
  DocumentArtifactResponse,
} from "../types/document-artifact";

function mapDocumentArtifact(
  artifact: DocumentArtifactResponse,
): DocumentArtifact {
  return {
    id: artifact.id,
    documentId: artifact.document_id,
    type: artifact.type,
    content: artifact.content,
    provider: artifact.provider,
    model: artifact.model,
    createdAt: artifact.created_at,
    updatedAt: artifact.updated_at,
  };
}

export async function getSummary(
  workspaceId: number,
  documentId: number,
): Promise<DocumentArtifact> {
  const response = await apiClient.get<DocumentArtifactResponse>(
    documentArtifactRoutes.summary(workspaceId, documentId),
  );

  return mapDocumentArtifact(response.data);
}

export async function generateSummary(
  workspaceId: number,
  documentId: number,
): Promise<DocumentArtifact> {
  const response = await apiClient.post<DocumentArtifactResponse>(
    documentArtifactRoutes.summary(workspaceId, documentId),
  );

  return mapDocumentArtifact(response.data);
}

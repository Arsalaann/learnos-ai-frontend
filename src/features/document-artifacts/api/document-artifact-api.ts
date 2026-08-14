import { apiClient } from "@/lib/api-client";

import { documentArtifactRoutes } from "../lib/document-artifact-routes";

import type {
  DocumentArtifact,
  DocumentArtifactResponse,
} from "../types/document-artifact";

import type { MessageResponse } from "@/features/messages/types/message";

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
    questionAttempts: artifact.question_attempts,
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

export async function getConversationSummaries(
  workspaceId: number,
  documentId: number,
): Promise<DocumentArtifact[]> {
  const response = await apiClient.get<DocumentArtifactResponse[]>(
    documentArtifactRoutes.conversationSummaries(workspaceId, documentId),
  );

  return response.data.map(mapDocumentArtifact);
}

export async function generateConversationSummary(
  workspaceId: number,
  documentId: number,
): Promise<DocumentArtifact> {
  const response = await apiClient.post<DocumentArtifactResponse>(
    documentArtifactRoutes.conversationSummary(workspaceId, documentId),
  );

  return mapDocumentArtifact(response.data);
}

export async function deleteConversationSummary(
  workspaceId: number,
  documentId: number,
  artifactId: number,
): Promise<void> {
  await apiClient.delete(
    documentArtifactRoutes.deleteConversationSummary(
      workspaceId,
      documentId,
      artifactId,
    ),
  );
}

export async function generateQuiz(
  workspaceId: number,
  documentId: number,
): Promise<MessageResponse> {
  const response = await apiClient.post<MessageResponse>(
    documentArtifactRoutes.quiz(workspaceId, documentId),
  );

  return response.data;
}

export async function answerQuizQuestion(
  workspaceId: number,
  documentId: number,
  artifactId: number,
  questionIndex: number,
  selectedOptionIndex: number,
): Promise<DocumentArtifact> {
  const response = await apiClient.patch<DocumentArtifactResponse>(
    documentArtifactRoutes.answerQuizQuestion(
      workspaceId,
      documentId,
      artifactId,
      questionIndex,
    ),
    {
      selected_option_index: selectedOptionIndex,
    },
  );

  return mapDocumentArtifact(response.data);
}

export async function getQuizzes(
  workspaceId: number,
  documentId: number,
): Promise<DocumentArtifact[]> {
  const response = await apiClient.get<DocumentArtifactResponse[]>(
    documentArtifactRoutes.quizzes(workspaceId, documentId),
  );

  return response.data.map(mapDocumentArtifact);
}

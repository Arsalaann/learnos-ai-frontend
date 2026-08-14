"use client";

import { useRouter } from "next/navigation";

import { useGenerateConversationSummary } from "@/features/document-artifacts/hooks/use-generate-conversation-summary";
import { useGenerateQuiz } from "@/features/document-artifacts/hooks/use-generate-quiz";
import { useQuizzes } from "@/features/document-artifacts/hooks/use-quizzes";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { useDocument } from "./use-document";
import { useDocumentId } from "./use-document-id";
import { documentRoutes } from "../lib/document-routes";

export function useDocumentChatController() {
  const workspaceId = useWorkspaceId();
  const documentId = useDocumentId();
  const router = useRouter();

  const { data: document, isPending } = useDocument(workspaceId, documentId);

  const { data: quizzes = [] } = useQuizzes(workspaceId, documentId);

  const generateConversationSummary = useGenerateConversationSummary();
  const generateQuiz = useGenerateQuiz();

  const hasActiveQuiz = quizzes.some((quiz) => {
    try {
      const parsed = JSON.parse(quiz.content) as {
        questions?: unknown[];
      };

      const questionCount = parsed.questions?.length ?? 0;
      const attemptedCount = Object.keys(quiz.questionAttempts).length;

      return questionCount > 0 && attemptedCount < questionCount;
    } catch {
      return false;
    }
  });

  function handleGenerateSummary() {
    if (documentId === null) {
      return;
    }

    generateConversationSummary.mutate(
      {
        workspaceId,
        documentId,
      },
      {
        onSuccess() {
          router.push(documentRoutes.summary(workspaceId, documentId));
        },
      },
    );
  }

  function handleGenerateQuiz() {
    if (documentId === null) {
      return;
    }

    generateQuiz.mutate(
      {
        workspaceId,
        documentId,
      },
      {
        onSuccess() {
          router.push(
            `/workspaces/${workspaceId}/documents/${documentId}/quizzes`,
          );
        },
      },
    );
  }

  return {
    workspaceId,
    documentId,
    document,
    isPending,
    hasActiveQuiz,
    isGeneratingSummary: generateConversationSummary.isPending,
    isGeneratingQuiz: generateQuiz.isPending,
    handleGenerateSummary,
    handleGenerateQuiz,
  };
}

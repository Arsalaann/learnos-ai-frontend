"use client";

import { useRouter } from "next/navigation";

import { useGenerateConversationSummary } from "@/features/document-artifacts/hooks/use-generate-conversation-summary";
import { useGenerateQuiz } from "@/features/document-artifacts/hooks/use-generate-quiz";
import { useMessages } from "@/features/messages/hooks/use-messages";
import Chat from "@/features/messages/components/chat";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { useDocument } from "../hooks/use-document";
import { useDocumentId } from "../hooks/use-document-id";
import { documentRoutes } from "../lib/document-routes";

import DocumentChatActions from "./document-chat-actions";

export default function DocumentChat() {
  const workspaceId = useWorkspaceId();
  const documentId = useDocumentId();
  const router = useRouter();

  const { data: document, isPending } = useDocument(workspaceId, documentId);

  const generateConversationSummary = useGenerateConversationSummary();
  const generateQuiz = useGenerateQuiz();

  const { data: messages = [] } = useMessages(document?.conversationId);

  const activeQuizMessage = messages
    .filter(
      (message) => message.messageType === "quiz" && message.artifact !== null,
    )
    .find((message) => {
      const artifact = message.artifact;

      if (!artifact) {
        return false;
      }

      const questionCount = (() => {
        try {
          const parsed = JSON.parse(artifact.content) as {
            questions?: unknown[];
          };

          return parsed.questions?.length ?? 0;
        } catch {
          return 0;
        }
      })();

      const attemptedCount = Object.keys(artifact.questionAttempts).length;

      return questionCount > 0 && attemptedCount < questionCount;
    });

  const isQuizActive = activeQuizMessage !== undefined;

  function handleGenerateSummary() {
    if (!documentId) return;
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
    if (!documentId) return;
    generateQuiz.mutate({
      workspaceId,
      documentId,
    });
  }

  if (!document) return;

  return (
    <Chat
      workspaceId={workspaceId}
      conversationId={document.conversationId}
      showContextSelector={false}
      interactionLocked={isQuizActive}
      actions={
        <DocumentChatActions
          isGeneratingSummary={generateConversationSummary.isPending}
          isGeneratingQuiz={generateQuiz.isPending}
          onGenerateSummary={handleGenerateSummary}
          onGenerateQuiz={handleGenerateQuiz}
        />
      }
    />
  );
}

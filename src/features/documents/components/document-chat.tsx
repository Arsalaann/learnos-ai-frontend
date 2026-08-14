"use client";

import { ChatView } from "@/features/messages/components/chat";

import { useDocumentChatController } from "../hooks/use-document-chat-controller";

import DocumentChatActions from "./document-chat-actions";

export default function DocumentChat() {
  const {
    documentId,
    workspaceId,
    document,
    isPending,
    hasActiveQuiz,
    isGeneratingSummary,
    isGeneratingQuiz,
    handleGenerateSummary,
    handleGenerateQuiz,
  } = useDocumentChatController();

  if (documentId === null || isPending || !document) {
    return null;
  }

  return (
    <ChatView
      workspaceId={workspaceId}
      conversationId={document.conversationId}
      showContextSelector={false}
      interactionLocked={hasActiveQuiz}
      actions={
        <DocumentChatActions
          workspaceId={workspaceId}
          documentId={documentId}
          isGeneratingSummary={isGeneratingSummary}
          isGeneratingQuiz={isGeneratingQuiz}
          onGenerateSummary={handleGenerateSummary}
          onGenerateQuiz={handleGenerateQuiz}
        />
      }
    />
  );
}

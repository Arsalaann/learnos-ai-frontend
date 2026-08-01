"use client";

import Chat from "@/features/messages/components/chat";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { useDocument } from "../hooks/use-document";
import { useDocumentId } from "../hooks/use-document-id";

export default function DocumentChat() {
  const workspaceId = useWorkspaceId();
  const documentId = useDocumentId();

  if (documentId === null) {
    return null;
  }

  const { data: document, isPending } = useDocument(workspaceId, documentId);

  if (isPending || !document) {
    return null;
  }

  return (
    <Chat
      workspaceId={workspaceId}
      conversationId={document.conversationId}
      showContextSelector={false}
    />
  );
}

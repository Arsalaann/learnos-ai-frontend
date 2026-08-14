"use client";

import Topics from "@/features/document-artifacts/components/topics";
import DocumentChat from "@/features/documents/components/document-chat";
import DocumentHeader from "@/features/documents/components/document-header";
import { useDocumentChatController } from "@/features/documents/hooks/use-document-chat-controller";
import { useDocument } from "@/features/documents/hooks/use-document";
import { useDocumentId } from "@/features/documents/hooks/use-document-id";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { ChatProvider } from "@/features/messages/components/chat-context";

export default function DocumentPage() {
  const workspaceId = useWorkspaceId();
  const documentId = useDocumentId();

  const { hasActiveQuiz } = useDocumentChatController();
  const { data: document } = useDocument(workspaceId, documentId);

  if (!documentId || !document) {
    return null;
  }

  return (
    <ChatProvider
      workspaceId={workspaceId}
      conversationId={document.conversationId}
    >
      <div className="flex h-screen overflow-hidden">
        <section
          className={`flex min-w-0 flex-1 flex-col ${
            hasActiveQuiz ? "overflow-hidden" : "overflow-y-auto scrollbar-thin"
          }`}
        >
          <DocumentHeader />

          <div className="mx-4 flex flex-1">
            <DocumentChat />
          </div>
        </section>

        <aside className="h-screen w-90 shrink-0 overflow-y-auto bg-background-default p-4 scrollbar-thin">
          <h2 className="mb-6 text-lg font-semibold tracking-tight">Topics</h2>

          <Topics disabled={hasActiveQuiz} />
        </aside>
      </div>
    </ChatProvider>
  );
}

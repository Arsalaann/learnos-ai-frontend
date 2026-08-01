"use client";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useDocumentId } from "@/features/documents/hooks/use-document-id";
import { useDocuments } from "@/features/documents/hooks/use-documents";

import AddDocumentButton from "./add-document-button";
import DocumentSidebarItem from "./document-sidebar-item";

import WorkspaceSidebarSkeleton from "@/features/workspaces/components/workspace-sidebar-skeleton";

export default function WorkspaceDocumentList() {
  const workspaceId = useWorkspaceId();
  const documentId = useDocumentId();

  const { data: documents = [], isPending } = useDocuments(workspaceId);

  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Documents
        </h2>

        <AddDocumentButton />
      </div>

      {isPending ? (
        <WorkspaceSidebarSkeleton />
      ) : documents.length === 0 ? (
        <p className="px-2 text-sm text-muted-foreground">No documents yet.</p>
      ) : (
        <div className="space-y-[0.1rem]">
          {documents.map((document) => (
            <DocumentSidebarItem
              key={document.id}
              workspaceId={workspaceId}
              document={document}
              isActive={document.id === documentId}
            />
          ))}
        </div>
      )}
    </section>
  );
}

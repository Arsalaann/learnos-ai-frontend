"use client";

import { Separator } from "@/components/ui/separator";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { useDocument } from "../hooks/use-document";
import { useDocumentId } from "../hooks/use-document-id";

import DocumentTabs from "./document-tabs";

export default function DocumentHeader() {
  const workspaceId = useWorkspaceId();
  const documentId = useDocumentId();

  if (documentId === null) {
    return null;
  }

  const { data: document, isPending } = useDocument(workspaceId, documentId);

  if (isPending) {
    return (
      <header className="sticky top-0 w-full bg-background/10 backdrop-blur-md z-30 px-8 py-2">
        Loading...
      </header>
    );
  }

  if (!document) {
    return null;
  }

  return (
    <header className="sticky top-0 w-full bg-background/10 backdrop-blur-md px-8 z-30">
      <DocumentTabs />
    </header>
  );
}

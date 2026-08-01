"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { useRouter } from "next/navigation";

import { workspaceRoutes } from "@/features/workspaces/lib/workspace-routes";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { useDeleteDocument } from "./use-delete-document";

import type { Document } from "../types/document";

type DeleteDocumentController = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onDelete: () => Promise<void>;
  deleteDocumentMutation: ReturnType<typeof useDeleteDocument>;
};

export function useDeleteDocumentController({
  document,
}: {
  document: Document;
}): DeleteDocumentController {
  const workspaceId = useWorkspaceId();
  const documentId = document.id;

  const router = useRouter();

  const deleteDocumentMutation = useDeleteDocument();

  const [open, setOpen] = useState(false);

  async function onDelete() {
    if (!documentId) return;

    await deleteDocumentMutation.mutateAsync({
      workspaceId,
      documentId,
    });

    setOpen(false);

    router.replace(workspaceRoutes.detail(workspaceId));
  }

  return {
    open,
    setOpen,
    onDelete,
    deleteDocumentMutation,
  };
}

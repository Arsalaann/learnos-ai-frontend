"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

import ConfirmDialog from "@/components/dialogs/confirm-dialog";

import { useDeleteDocumentController } from "../hooks/use-delete-document-controller";

import type { Document } from "../types/document";

export default function DeleteDocumentDialog({
  document,
}: {
  document: Document;
}) {
  const { open, setOpen, onDelete, deleteDocumentMutation } =
    useDeleteDocumentController({
      document,
    });

  return (
    <>
      <Button
        variant="ghost"
        className={"text-ring hover:bg-transparent dark:hover:bg-transparent"}
        onClick={() => setOpen(true)}
      >
        <Trash />
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete Document"
        description="This action cannot be undone. All conversations for this document will be permanently deleted."
        actionLabel="Delete Document"
        loading={deleteDocumentMutation.isPending}
        onConfirm={onDelete}
      />
    </>
  );
}

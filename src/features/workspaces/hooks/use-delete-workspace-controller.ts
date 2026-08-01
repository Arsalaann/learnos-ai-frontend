"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useDeleteWorkspace } from "./use-delete-workspace";

export function useDeleteWorkspaceController({
  workspaceId,
}: {
  workspaceId: number;
}) {
  const router = useRouter();

  const deleteWorkspaceMutation = useDeleteWorkspace();

  const [open, setOpen] = useState(false);

  async function onDelete() {
    await deleteWorkspaceMutation.mutateAsync(workspaceId);

    setOpen(false);

    router.replace("/");
  }

  return {
    open,
    setOpen,
    onDelete,
    deleteWorkspaceMutation,
  };
}

"use client";

import { useParams } from "next/navigation";

export function useWorkspaceId(): number {
  const params = useParams();

  const workspaceId = Number(params.workspaceId);

  if (!Number.isInteger(workspaceId) || workspaceId <= 0) {
    throw new Error("Invalid workspace id.");
  }

  return workspaceId;
}

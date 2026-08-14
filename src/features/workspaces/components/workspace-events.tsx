"use client";

import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useWorkspaceEvents } from "../hooks/use-workspace-events";

export default function WorkspaceEvents() {
  const workspaceId = useWorkspaceId();

  useWorkspaceEvents(workspaceId);

  return null;
}

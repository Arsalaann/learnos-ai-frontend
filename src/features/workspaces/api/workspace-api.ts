import { apiClient } from "@/lib/api-client";

import type {
  Workspace,
  WorkspaceResponse,
  CreateWorkspaceRequest,
  UpdateWorkspaceRequest,
} from "../types/workspace";

function mapWorkspace(workspace: WorkspaceResponse): Workspace {
  return {
    id: workspace.id,
    title: workspace.title,
    isDefault: workspace.is_default,
    documentsCount: workspace.documents_count,
    createdAt: workspace.created_at,
    updatedAt: workspace.updated_at,
  };
}

export async function createWorkspace(
  data: CreateWorkspaceRequest,
): Promise<Workspace> {
  const response = await apiClient.post<WorkspaceResponse>("/workspaces", data);

  return mapWorkspace(response.data);
}

export async function getWorkspaces(): Promise<Workspace[]> {
  const response = await apiClient.get<WorkspaceResponse[]>("/workspaces");

  return response.data.map(mapWorkspace);
}

export async function getWorkspace(workspaceId: number): Promise<Workspace> {
  const response = await apiClient.get<WorkspaceResponse>(
    `/workspaces/${workspaceId}`,
  );

  return mapWorkspace(response.data);
}

export async function updateWorkspace(
  workspaceId: number,
  data: UpdateWorkspaceRequest,
): Promise<Workspace> {
  const response = await apiClient.patch<WorkspaceResponse>(
    `/workspaces/${workspaceId}`,
    data,
  );

  return mapWorkspace(response.data);
}

export async function deleteWorkspace(workspaceId: number): Promise<void> {
  await apiClient.delete(`/workspaces/${workspaceId}`);
}

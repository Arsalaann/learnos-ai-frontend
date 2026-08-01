export interface Workspace {
  id: number;
  documentsCount: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceResponse {
  id: number;
  title: string;
  documents_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateWorkspaceRequest {
  title: string;
}

export interface UpdateWorkspaceRequest {
  title?: string;
}

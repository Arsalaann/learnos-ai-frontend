export interface Workspace {
  id: number;
  title: string;
  isDefault: boolean;
  documentsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceResponse {
  id: number;
  title: string;
  is_default: boolean;
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

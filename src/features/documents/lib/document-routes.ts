export const documentRoutes = {
  workspace(workspaceId: number) {
    return `/workspaces/${workspaceId}`;
  },

  all(workspaceId: number) {
    return `${this.workspace(workspaceId)}/documents`;
  },

  detail(workspaceId: number, documentId: number) {
    return `${this.all(workspaceId)}/${documentId}`;
  },

  chat(workspaceId: number, documentId: number) {
    return this.detail(workspaceId, documentId);
  },

  summary(workspaceId: number, documentId: number) {
    return `${this.detail(workspaceId, documentId)}/summary`;
  },
} as const;

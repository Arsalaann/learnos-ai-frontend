export const documentArtifactRoutes = {
  summary(workspaceId: number, documentId: number) {
    return `/workspaces/${workspaceId}/documents/${documentId}/summary`;
  },
} as const;

export const conversationApiRoutes = {
  all(workspaceId: number) {
    return `/workspaces/${workspaceId}/conversations`;
  },

  detail(workspaceId: number, conversationId: number) {
    return `${this.all(workspaceId)}/${conversationId}`;
  },
} as const;

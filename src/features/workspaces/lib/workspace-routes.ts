export const workspaceRoutes = {
  all() {
    return "/workspaces";
  },

  detail(workspaceId: number) {
    return `/workspaces/${workspaceId}`;
  },

  create(workspaceId: number) {
    return `${this.detail(workspaceId)}?upload=true`;
  },
} as const;

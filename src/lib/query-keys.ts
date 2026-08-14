export const queryKeys = {
  auth: {
    user: () => ["auth", "user"] as const,
  },

  workspaces: {
    all: () => ["workspaces"] as const,

    detail: (workspaceId: number) => ["workspaces", workspaceId] as const,
  },

  documents: {
    all: (workspaceId: number) =>
      ["workspaces", workspaceId, "documents"] as const,

    detail: (workspaceId: number, documentId: number) =>
      ["workspaces", workspaceId, "documents", documentId] as const,
  },

  messages: {
    all: (conversationId: number) =>
      ["conversations", conversationId, "messages"] as const,
  },

  documentArtifacts: {
    summary: (workspaceId: number, documentId: number) =>
      ["workspaces", workspaceId, "documents", documentId, "summary"] as const,

    conversationSummaries: (workspaceId: number, documentId: number) =>
      [
        "workspaces",
        workspaceId,
        "documents",
        documentId,
        "conversation-summaries",
      ] as const,

    quizzes: (workspaceId: number, documentId: number) =>
      ["workspaces", workspaceId, "documents", documentId, "quizzes"] as const,
  },

  conversations: {
    all: (workspaceId: number) =>
      ["workspaces", workspaceId, "conversations"] as const,

    detail: (workspaceId: number, conversationId: number) =>
      ["workspaces", workspaceId, "conversations", conversationId] as const,
  },

  settings: {
    all: () => ["settings"] as const,
  },
} as const;

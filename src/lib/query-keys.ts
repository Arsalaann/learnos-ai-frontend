export const queryKeys = {
  auth: {
    user: () => ["auth", "user"] as const,
  },

  documents: {
    all: () => ["documents"] as const,
    detail: (documentId: number) => ["documents", documentId] as const,
  },

  chats: {
    all: () => ["chats"] as const,
    detail: (chatId: number) => ["chats", chatId] as const,
    messages: (chatId: number) => ["chats", chatId, "messages"] as const,
  },

  settings: {
    all: () => ["settings"] as const,
  },
} as const;

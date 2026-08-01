export const messageRoutes = {
  all(conversationId: number) {
    return `/conversations/${conversationId}/messages`;
  },

  detail(conversationId: number, messageId: number) {
    return `${this.all(conversationId)}/${messageId}`;
  },
} as const;

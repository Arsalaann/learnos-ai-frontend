export const documentArtifactRoutes = {
  insights(workspaceId: number, documentId: number) {
    return `/workspaces/${workspaceId}/documents/${documentId}/insights`;
  },

  conversationSummaries(workspaceId: number, documentId: number) {
    return `/workspaces/${workspaceId}/documents/${documentId}/conversation-summaries`;
  },

  conversationSummary(workspaceId: number, documentId: number) {
    return `/workspaces/${workspaceId}/documents/${documentId}/conversation-summary`;
  },

  deleteConversationSummary(
    workspaceId: number,
    documentId: number,
    artifactId: number,
  ) {
    return `/workspaces/${workspaceId}/documents/${documentId}/conversation-summary/${artifactId}`;
  },

  quizzes(workspaceId: number, documentId: number) {
    return `/workspaces/${workspaceId}/documents/${documentId}/quizzes`;
  },

  quiz(workspaceId: number, documentId: number) {
    return `/workspaces/${workspaceId}/documents/${documentId}/quiz`;
  },

  answerQuizQuestion(
    workspaceId: number,
    documentId: number,
    artifactId: number,
    questionIndex: number,
  ) {
    return `/workspaces/${workspaceId}/documents/${documentId}/quiz/${artifactId}/questions/${questionIndex}`;
  },
} as const;

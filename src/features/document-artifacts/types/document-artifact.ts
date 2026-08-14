export interface DocumentArtifact {
  id: number;
  documentId: number;
  type: string;
  content: string;
  provider: string;
  model: string;
  questionAttempts: Record<string, number>;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentArtifactResponse {
  id: number;
  document_id: number;
  type: string;
  content: string;
  provider: string;
  model: string;
  question_attempts: Record<string, number>;
  created_at: string;
  updated_at: string;
}

export interface DocumentInsightsResponse {
  summary: DocumentArtifactResponse;
  topics: DocumentArtifactResponse;
}

export interface DocumentInsights {
  summary: DocumentArtifact;
  topics: DocumentArtifact;
}

export interface InsightsGenerationResponse {
  status: "generating" | "ready";
}

export interface Topic {
  name: string;
  subtopics: string[];
}

export interface TopicsResponse {
  topics: Topic[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface QuizResponse {
  questions: QuizQuestion[];
}

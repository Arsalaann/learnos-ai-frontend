"use client";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useDocumentId } from "@/features/documents/hooks/use-document-id";

import { useQuizzes } from "@/features/document-artifacts/hooks/use-quizzes";

import QuizzesList from "@/features/document-artifacts/components/quizzes-list";

export default function QuizzesHome() {
  const workspaceId = useWorkspaceId();
  const documentId = useDocumentId();

  if (!documentId) return null;

  const {
    data: quizzes,
    isPending,
    isError,
  } = useQuizzes(workspaceId, documentId);

  if (isPending) {
    return (
      <div className="flex w-full flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading quizzes...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex w-full flex-1 items-center justify-center">
        <p className="text-sm text-destructive">Failed to load quizzes.</p>
      </div>
    );
  }

  return <QuizzesList quizzes={quizzes ?? []} />;
}

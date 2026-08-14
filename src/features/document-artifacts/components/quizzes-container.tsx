"use client";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useDocumentId } from "@/features/documents/hooks/use-document-id";

import { useQuizzes } from "../hooks/use-quizzes";

import QuizzesList from "./quizzes-list";

export default function QuizzesContainer() {
  const workspaceId = useWorkspaceId();
  const documentId = useDocumentId();

  if (!documentId) {
    return (
      <div className="flex w-full flex-1 items-center justify-center">
        <p className="text-muted-foreground">No document selected.</p>
      </div>
    );
  }

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

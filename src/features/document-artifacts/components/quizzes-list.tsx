"use client";

import type { DocumentArtifact } from "../types/document-artifact";

import { useQuizzesListController } from "../hooks/use-quizzes-list-controller";

import QuizListItem from "./quiz-list-item";

interface QuizzesListProps {
  quizzes: DocumentArtifact[];
}

export default function QuizzesList({ quizzes }: QuizzesListProps) {
  const {
    document,
    documentId,
    quizItems,
    overallScore,
    toggleQuiz,
    setQuizRef,
  } = useQuizzesListController({ quizzes });

  if (!documentId || !document) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full flex-col pb-20 flex-1 items-start ml-4 max-w-3xl">
      <header className="mb-8 w-full">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Quizzes</h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Practice and review quizzes generated from this document.
            </p>
          </div>

          {overallScore.total > 0 && (
            <div className="shrink-0 text-right">
              <p className="text-xs text-muted-foreground">Overall score</p>

              <p className="mt-1 text-2xl font-semibold tracking-tight">
                {overallScore.percentage}%
              </p>

              <p className="text-xs text-muted-foreground">
                {overallScore.correct}/{overallScore.total} correct
              </p>
            </div>
          )}
        </div>
      </header>

      {quizItems.length === 0 ? (
        <div className="w-full border-t py-10">
          <p className="text-center text-sm text-muted-foreground">
            No quizzes have been generated for this document yet.
          </p>
        </div>
      ) : (
        <div className="w-full border-t">
          {quizItems.map((item) => (
            <div
              key={item.quiz.id}
              ref={(element) => {
                setQuizRef(item.quiz.id, element);
              }}
              className="border-b"
            >
              <QuizListItem
                quiz={item.quiz}
                index={item.index}
                questionCount={item.questionCount}
                attemptedCount={item.attemptedCount}
                score={item.score}
                isComplete={item.isComplete}
                isExpanded={item.isExpanded}
                conversationId={document.conversationId}
                onToggle={() => toggleQuiz(item.quiz.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

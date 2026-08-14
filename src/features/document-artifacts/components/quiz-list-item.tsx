"use client";

import {
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type { DocumentArtifact } from "../types/document-artifact";

import { useQuizMessage } from "../hooks/use-quiz-message";

import type { QuizScore } from "../hooks/use-quizzes-list-controller";

interface QuizListItemProps {
  quiz: DocumentArtifact;
  index: number;
  questionCount: number;
  attemptedCount: number;
  score: QuizScore;
  isComplete: boolean;
  isExpanded: boolean;
  conversationId: number;
  onToggle: () => void;
}

export default function QuizListItem({
  quiz,
  index,
  questionCount,
  attemptedCount,
  score,
  isComplete,
  isExpanded,
  conversationId,
  onToggle,
}: QuizListItemProps) {
  const quizState = useQuizMessage({
    quiz,
    conversationId,
  });

  if (!quizState) {
    return null;
  }

  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    attempted,
    selectedOptionIndex,
    isCorrect,
    isAnswering,
    hasPreviousQuestion,
    hasNextQuestion,
    handleAnswer,
    goToPreviousQuestion,
    goToNextQuestion,
  } = quizState;

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-2 py-5 text-left transition-colors hover:bg-muted/40"
        aria-expanded={isExpanded}
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
          {index}
        </span>

        <div className="min-w-0 flex-1">
          <p className="font-medium">Quiz {index}</p>

          <p className="mt-1 text-xs text-muted-foreground">
            {questionCount} questions · {attemptedCount}/{questionCount}{" "}
            answered
          </p>
        </div>

        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold">{score.percentage}%</p>

          <p className="text-[11px] text-muted-foreground">
            {score.correct}/{score.total}
          </p>
        </div>

        <div className="shrink-0">
          {isComplete ? (
            <CheckCircle2 className="size-4 text-primary" />
          ) : (
            <CircleHelp className="size-4 text-muted-foreground" />
          )}
        </div>

        <ChevronDown
          className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="px-2 pb-7">
          <div className="mb-6 h-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{
                width: `${(attemptedCount / questionCount) * 100}%`,
              }}
            />
          </div>

          <div className="space-y-5">
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </p>

              <h2 className="text-base font-semibold leading-6">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="space-y-2">
              {currentQuestion.options.map((option, optionIndex) => {
                const isSelected = selectedOptionIndex === optionIndex;
                const isCorrectOption =
                  optionIndex === currentQuestion.correctOptionIndex;

                let className =
                  "h-auto min-h-12 w-full justify-between whitespace-normal rounded-none border-0 px-4 py-3 text-left font-medium transition-colors disabled:opacity-100";

                if (!attempted) {
                  className += " bg-muted text-foreground hover:bg-muted/70";
                } else if (isCorrectOption) {
                  className += " bg-primary text-white hover:bg-primary";
                } else if (isSelected) {
                  className +=
                    " bg-destructive/80 text-white hover:bg-destructive";
                } else {
                  className += " bg-muted/50 text-muted-foreground opacity-60";
                }

                return (
                  <Button
                    key={optionIndex}
                    type="button"
                    variant="ghost"
                    className={className}
                    disabled={attempted || isAnswering}
                    onClick={() => handleAnswer(optionIndex)}
                  >
                    <span>{option}</span>

                    {attempted && isCorrectOption && (
                      <Check className="ml-3 size-4 shrink-0" />
                    )}

                    {attempted && isSelected && !isCorrect && (
                      <X className="ml-3 size-4 shrink-0" />
                    )}
                  </Button>
                );
              })}
            </div>

            {attempted && (
              <div
                className={
                  isCorrect ? "bg-primary/10 p-4" : "bg-destructive/10 p-4"
                }
              >
                <p
                  className={
                    isCorrect
                      ? "text-sm font-semibold text-primary"
                      : "text-sm font-semibold text-destructive"
                  }
                >
                  {isCorrect ? "Correct" : "Incorrect"}
                </p>

                {!isCorrect && (
                  <p className="mt-1 text-sm">
                    Correct answer:{" "}
                    {
                      currentQuestion.options[
                        currentQuestion.correctOptionIndex
                      ]
                    }
                  </p>
                )}

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            <div className="flex items-center justify-center gap-2 pt-2">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={goToPreviousQuestion}
                disabled={!hasPreviousQuestion}
                className="rounded-full"
              >
                <ChevronLeft className="mr-1 size-4" />
                Previous
              </Button>

              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={goToNextQuestion}
                disabled={!hasNextQuestion}
                className="rounded-full"
              >
                Next
                <ChevronRight className="ml-1 size-4" />
              </Button>
            </div>

            {isComplete && (
              <p className="pt-1 text-center text-xs text-muted-foreground">
                Quiz completed · {score.percentage}% score
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

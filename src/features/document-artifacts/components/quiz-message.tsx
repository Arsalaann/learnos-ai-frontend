"use client";

import { useState } from "react";
import { Check, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { Message } from "@/features/messages/types/message";

import { useQuizMessage } from "../hooks/use-quiz-message";

interface QuizMessageProps {
  message: Message;
}

export default function QuizMessage({ message }: QuizMessageProps) {
  const quiz = useQuizMessage(message);

  const [expanded, setExpanded] = useState(false);

  if (!quiz) {
    return null;
  }

  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    attempted,
    attemptedCount,
    isQuizComplete,
    selectedOptionIndex,
    isCorrect,
    hasPreviousQuestion,
    hasNextQuestion,
    isAnswering,
    handleAnswer,
    goToPreviousQuestion,
    goToNextQuestion,
  } = quiz;

  const isActive = !isQuizComplete;

  function handleToggle() {
    if (isActive) {
      return;
    }

    setExpanded((current) => !current);
  }

  return (
    <div className="my-6 w-full overflow-hidden border bg-background-default px-3 py-6">
      <button
        type="button"
        onClick={handleToggle}
        className="flex w-full items-center justify-between gap-4 text-left cursor-pointer"
        aria-expanded={expanded}
        disabled={isActive}
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Quiz
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            {isQuizComplete
              ? `${totalQuestions} questions completed`
              : `Question ${currentQuestionIndex + 1} of ${totalQuestions}`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-muted-foreground">
            {attemptedCount}/{totalQuestions}
          </span>

          <ChevronDown
            className={[
              "size-4 text-muted-foreground transition-transform duration-200",
              expanded ? "rotate-180" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          />
        </div>
      </button>

      {expanded && (
        <div className="mt-6">
          <div className="mb-6">
            <div className="h-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{
                  width: `${(attemptedCount / totalQuestions) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-base font-semibold leading-6">
              {currentQuestion.question}
            </h3>

            <div className="space-y-2">
              {currentQuestion.options.map((option, optionIndex) => {
                const isSelected = selectedOptionIndex === optionIndex;

                const isCorrectOption =
                  optionIndex === currentQuestion.correctOptionIndex;

                let className =
                  "h-auto min-h-12 w-full font-bold justify-between whitespace-normal rounded-none border-0 px-4 py-3 text-left transition-all disabled:opacity-100";

                if (!attempted) {
                  className +=
                    " bg-border text-foreground hover:bg-border/70 active:scale-[0.99]";
                } else if (isCorrectOption) {
                  className += " bg-primary text-white hover:bg-primary";
                } else if (isSelected) {
                  className +=
                    " bg-destructive/80 text-white hover:bg-destructive";
                } else {
                  className += " bg-muted text-muted-foreground opacity-60";
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

            {attempted && (
              <div className="flex items-center justify-center gap-3 pt-2">
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
            )}

            {isQuizComplete && (
              <div className="pt-2 text-center">
                <p className="text-sm font-medium">Quiz completed</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  You have attempted all {totalQuestions} questions.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

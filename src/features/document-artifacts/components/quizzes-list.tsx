"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronDown, CircleHelp } from "lucide-react";
import { useState } from "react";

import type { DocumentArtifact } from "../types/document-artifact";
import { parseQuiz } from "../lib/quiz-parser";

interface QuizzesListProps {
  quizzes: DocumentArtifact[];
}

export default function QuizzesList({ quizzes }: QuizzesListProps) {
  const orderedQuizzes = [...quizzes].reverse();

  return (
    <div className="w-full">
      <header className="mb-10 pt-8">
        <p className="mb-3 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-primary">
          Practice history
        </p>

        <h1 className="text-2xl font-semibold tracking-tight">Quizzes</h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Review every quiz generated from this document.
        </p>
      </header>

      {orderedQuizzes.length === 0 ? (
        <div className="py-10">
          <p className="text-sm text-muted-foreground">
            No quizzes have been generated for this document yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orderedQuizzes.map((quiz) => (
            <QuizListItem key={quiz.id} quiz={quiz} />
          ))}
        </div>
      )}
    </div>
  );
}

function QuizListItem({ quiz }: { quiz: DocumentArtifact }) {
  const [expanded, setExpanded] = useState(false);

  const parsedQuiz = parseQuiz(quiz.content);

  const questionCount = parsedQuiz.questions.length;

  const attemptedCount = Object.keys(quiz.questionAttempts).length;

  const isComplete = attemptedCount === questionCount;

  return (
    <article className="group mb-6">
      <Button
        variant="ghost"
        onClick={() => setExpanded((current) => !current)}
        className="flex rounded-none w-full items-center justify-between gap-6 py-8 px-4 text-left bg-primary/10"
        aria-expanded={expanded}
      >
        <div className="min-w-0">
          <h2 className="mt-2 text-base font-semibold">
            {questionCount} {questionCount === 1 ? "question" : "questions"}
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            {new Date(quiz.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {isComplete ? (
              <CheckCircle2 className="size-4 text-primary" />
            ) : (
              <CircleHelp className="size-4" />
            )}

            <span>
              {attemptedCount}/{questionCount}
            </span>
          </div>

          <ChevronDown
            className={`size-4 text-muted-foreground transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </Button>

      {expanded && (
        <div className="pb-8 pt-2">
          <div className="space-y-8">
            {parsedQuiz.questions.map((question, questionIndex) => {
              const selectedOptionIndex =
                quiz.questionAttempts[String(questionIndex)];

              const attempted = selectedOptionIndex !== undefined;

              const isCorrect =
                attempted &&
                selectedOptionIndex === question.correctOptionIndex;

              return (
                <div key={questionIndex} className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold leading-6">
                      {questionIndex + 1}. {question.question}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = selectedOptionIndex === optionIndex;

                      const isCorrectOption =
                        optionIndex === question.correctOptionIndex;

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
                        className +=
                          " bg-muted text-muted-foreground opacity-60";
                      }

                      return (
                        <div key={optionIndex} className={className}>
                          {option}
                        </div>
                      );
                    })}
                  </div>

                  {attempted && (
                    <div
                      className={
                        isCorrect
                          ? "bg-primary/10 p-4"
                          : "bg-destructive/10 p-4"
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
                          {question.options[question.correctOptionIndex]}
                        </p>
                      )}

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
}

"use client";

import { ChevronRight, LoaderCircle } from "lucide-react";

import { useDocumentId } from "@/features/documents/hooks/use-document-id";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useInsightsController } from "@/features/document-artifacts/hooks/use-insights-controller";
import { useChat } from "@/features/messages/components/chat-context";

import type { TopicsResponse } from "../types/document-artifact";

interface TopicsProps {
  disabled?: boolean;
}

export default function Topics({ disabled = false }: TopicsProps) {
  const workspaceId = useWorkspaceId();
  const documentId = useDocumentId();

  const { sendMessage, isStreaming } = useChat();

  const { insights, status, isGeneratingInsights, insightsError } =
    useInsightsController({
      workspaceId,
      documentId,
    });

  async function handleTopicClick(topic: string) {
    if (disabled || isStreaming) {
      return;
    }

    try {
      await sendMessage(`Explain ${topic}`);
    } catch (error) {
      console.error("Failed to send topic message:", error);
    }
  }

  if (isGeneratingInsights || status === "generating") {
    return (
      <div className="mb-12 w-full">
        <div className="flex items-center gap-3">
          <LoaderCircle className="size-4 animate-spin text-muted-foreground" />

          <p className="text-sm font-medium">Generating document insights</p>
        </div>
      </div>
    );
  }

  if (status === "failed" || insightsError) {
    return (
      <div className="mb-12 w-full">
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-5">
          <p className="text-sm font-medium text-destructive">
            Failed to generate topics.
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            We couldn't generate the topics for this document.
          </p>
        </div>
      </div>
    );
  }

  if (status !== "ready" || !insights) {
    return null;
  }

  let topics: TopicsResponse;

  try {
    topics = JSON.parse(insights.topics.content) as TopicsResponse;
  } catch {
    return null;
  }

  if (!topics.topics?.length) {
    return null;
  }

  const interactionDisabled = disabled || isStreaming;

  return (
    <div className="mb-12 w-full">
      <div
        className={interactionDisabled ? "pointer-events-none opacity-50" : ""}
      >
        <div className="space-y-3">
          {topics.topics.map((topic, topicIndex) => (
            <div key={`${topic.name}-${topicIndex}`}>
              <div className="flex items-center gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {topicIndex + 1}
                </div>

                <h3 className="text-sm font-semibold">{topic.name}</h3>
              </div>

              {topic.subtopics.length > 0 && (
                <div className="relative ml-4 mt-4 border-l pl-7">
                  <div className="space-y-1">
                    {topic.subtopics.map((subtopic, subtopicIndex) => (
                      <button
                        key={`${subtopic}-${subtopicIndex}`}
                        type="button"
                        disabled={interactionDisabled}
                        onClick={() => void handleTopicClick(subtopic)}
                        className="relative flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground disabled:cursor-default"
                      >
                        <span className="absolute -left-[31px] h-px w-5 bg-border" />

                        <ChevronRight className="size-4 shrink-0 text-muted-foreground" />

                        <span>{subtopic}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

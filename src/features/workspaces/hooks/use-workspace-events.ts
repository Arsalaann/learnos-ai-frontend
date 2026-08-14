"use client";

import { useEffect } from "react";

import { authStorage } from "@/features/auth/lib/auth-storage";
import type { Document } from "@/features/documents/types/document";
import { getInsights } from "@/features/document-artifacts/api/document-artifact-api";
import { env } from "@/lib/env";
import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";

interface DocumentStatusEvent {
  document_id: number;
  status: Document["status"];
  stage: Document["stage"];
  progress: Document["progress"];
  processing_error?: string | null;
}

type InsightsStatus = "generating" | "ready" | "failed";

interface InsightsStatusEvent {
  document_id: number;
  status: InsightsStatus;
  error: string | null;
}

export function useWorkspaceEvents(workspaceId: number) {
  useEffect(() => {
    const token = authStorage.getAccessToken();

    if (!token) {
      return;
    }

    const controller = new AbortController();

    async function connect(): Promise<void> {
      try {
        const response = await fetch(
          `${env.API_URL}/workspaces/${workspaceId}/events`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "text/event-stream",
            },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`SSE connection failed: ${response.status}`);
        }

        if (!response.body) {
          throw new Error("SSE response body is unavailable.");
        }

        await queryClient.refetchQueries({
          queryKey: queryKeys.documents.all(workspaceId),
          type: "active",
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let buffer = "";

        while (!controller.signal.aborted) {
          const { value, done } = await reader.read();

          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });

          const events = buffer.split("\n\n");
          buffer = events.pop() ?? "";

          for (const rawEvent of events) {
            handleEvent(rawEvent);
          }
        }
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        console.error("Workspace SSE connection error:", error);
      }
    }

    function handleEvent(rawEvent: string): void {
      const { eventName, data } = parseEvent(rawEvent);

      if (!eventName || !data) {
        return;
      }

      switch (eventName) {
        case "document.status":
          handleDocumentStatus(data);
          break;

        case "insights.status":
          handleInsightsStatus(data);
          break;
      }
    }

    function parseEvent(rawEvent: string): {
      eventName: string;
      data: string;
    } {
      const lines = rawEvent.split("\n");

      let eventName = "";
      let data = "";

      for (const line of lines) {
        if (line.startsWith("event:")) {
          eventName = line.slice(6).trim();
          continue;
        }

        if (line.startsWith("data:")) {
          data += line.slice(5).trim();
        }
      }

      return {
        eventName,
        data,
      };
    }

    function handleDocumentStatus(rawData: string): void {
      try {
        const event = JSON.parse(rawData) as DocumentStatusEvent;

        queryClient.setQueryData<Document[]>(
          queryKeys.documents.all(workspaceId),
          (documents) => {
            if (!documents) {
              return documents;
            }

            return documents.map((document) =>
              document.id === event.document_id
                ? {
                    ...document,
                    status: event.status,
                    stage: event.stage,
                    progress: event.progress,
                    processingError:
                      event.processing_error ?? document.processingError,
                  }
                : document,
            );
          },
        );
      } catch (error) {
        console.error("Failed to parse document status SSE event:", error);
      }
    }

    function handleInsightsStatus(rawData: string): void {
      try {
        const event = JSON.parse(rawData) as InsightsStatusEvent;

        queryClient.setQueryData(
          queryKeys.documentArtifacts.insightsStatus(
            workspaceId,
            event.document_id,
          ),
          {
            status: event.status,
            error: event.error,
          },
        );

        if (event.status === "ready") {
          void queryClient.fetchQuery({
            queryKey: queryKeys.documentArtifacts.insights(
              workspaceId,
              event.document_id,
            ),
            queryFn: () => getInsights(workspaceId, event.document_id),
          });
        }
      } catch (error) {
        console.error("Failed to parse insights status SSE event:", error);
      }
    }

    void connect();

    return () => {
      controller.abort();
    };
  }, [workspaceId]);
}

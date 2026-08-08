import { authStorage } from "@/features/auth/lib/auth-storage";
import { env } from "@/lib/env";
import { apiClient } from "@/lib/api-client";

import { messageRoutes } from "../lib/message-routes";

import type {
  Message,
  MessageResponse,
  SendMessageRequest,
} from "../types/message";

function mapMessage(message: MessageResponse): Message {
  return {
    id: message.id,
    conversationId: message.conversation_id,
    role: message.role,
    content: message.content,
    createdAt: message.created_at,
    updatedAt: message.updated_at,
  };
}

export interface StreamMessageCallbacks {
  onToken: (content: string) => void;
  onDone: () => void;
  onError: (message: string) => void;
}

export async function streamMessage(
  conversationId: number,
  content: string,
  callbacks: StreamMessageCallbacks,
): Promise<void> {
  const token = authStorage.getAccessToken();

  const response = await fetch(
    `${env.API_URL}${messageRoutes.stream(conversationId)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        content,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to start message stream.");
  }

  if (!response.body) {
    throw new Error("Streaming is not supported by this response.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let buffer = "";
  let streamCompleted = false;

  try {
    while (!streamCompleted) {
      const { value, done } = await reader.read();

      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });

      const events = buffer.split("\n\n");

      buffer = events.pop() ?? "";

      for (const event of events) {
        if (!event.trim()) {
          continue;
        }

        let eventType = "";
        let data = "";

        for (const line of event.split("\n")) {
          if (line.startsWith("event:")) {
            eventType = line.slice(6).trim();
          }

          if (line.startsWith("data:")) {
            data += line.slice(5).trim();
          }
        }

        if (!data) {
          continue;
        }

        const parsed = JSON.parse(data);

        if (eventType === "token") {
          callbacks.onToken(parsed.content);
          continue;
        }

        if (eventType === "error") {
          callbacks.onError(parsed.message);
          streamCompleted = true;
          break;
        }

        if (eventType === "done") {
          callbacks.onDone();
          streamCompleted = true;
          break;
        }
      }
    }

    if (!streamCompleted) {
      throw new Error("Message stream ended unexpectedly.");
    }
  } finally {
    reader.releaseLock();
  }
}
export async function getMessages(conversationId: number): Promise<Message[]> {
  const response = await apiClient.get<MessageResponse[]>(
    messageRoutes.all(conversationId),
  );

  return response.data.map(mapMessage);
}

export async function sendMessage({
  conversationId,
  content,
}: SendMessageRequest): Promise<Message> {
  const response = await apiClient.post<MessageResponse>(
    messageRoutes.all(conversationId),
    {
      content,
    },
  );

  return mapMessage(response.data);
}

export async function deleteMessage(
  conversationId: number,
  messageId: number,
): Promise<void> {
  await apiClient.delete(messageRoutes.detail(conversationId, messageId));
}

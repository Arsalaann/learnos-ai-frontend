import { z } from "zod";

export const messageSchema = z.object({
  text: z.string().trim().min(1, "Message is required."),
});

export type MessageFormValues = z.infer<typeof messageSchema>;

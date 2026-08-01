import { z } from "zod";

export const createWorkspaceSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Workspace name is required.")
    .max(255, "Workspace name must not exceed 255 characters."),
});

export type CreateWorkspaceFormValues = z.infer<typeof createWorkspaceSchema>;

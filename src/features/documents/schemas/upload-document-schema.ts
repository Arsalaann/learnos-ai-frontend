import { z } from "zod";

export const uploadDocumentSchema = z.object({
  file: z
    .instanceof(File, {
      message: "Please select a PDF.",
    })
    .refine(
      (file) => file.type === "application/pdf",
      "Only PDF files are allowed.",
    ),
});

export type UploadDocumentFormValues = z.infer<typeof uploadDocumentSchema>;

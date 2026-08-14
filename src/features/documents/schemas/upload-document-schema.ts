import { z } from "zod";

const allowedDocumentTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const uploadDocumentSchema = z.object({
  file: z
    .instanceof(File, {
      message: "Please select a PDF or DOCX file.",
    })
    .refine(
      (file) =>
        allowedDocumentTypes.includes(
          file.type as (typeof allowedDocumentTypes)[number],
        ),
      "Only PDF and DOCX files are allowed.",
    ),
});

export type UploadDocumentFormValues = z.infer<typeof uploadDocumentSchema>;

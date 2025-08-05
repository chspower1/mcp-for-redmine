import { z } from "zod";
import { RedmineReferenceSchema } from "./reference.schema";

// Base Attachment Schema for Redmine
export const RedmineAttachmentSchema = z.object({
  id: z.number(),
  filename: z.string(),
  filesize: z.number(),
  content_type: z.string(),
  description: z.string().nullable(),
  content_url: z.string(),
  author: RedmineReferenceSchema,
  created_on: z.string().datetime(),
});
export type RedmineAttachment = z.infer<typeof RedmineAttachmentSchema>;

// Tool Parameter Schemas
export const GetAttachmentToolSchema = z.object({
  id: z.string().describe("The numeric ID of the attachment."),
});

export const DeleteAttachmentToolSchema = z.object({
  id: z.string().describe("The numeric ID of the attachment to delete."),
});

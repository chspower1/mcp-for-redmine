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

// Upload Attachment Tool Schema
// Docs: https://www.redmine.org/projects/redmine/wiki/Rest_api#Attaching-files
// Endpoint: POST /uploads.json?filename=<FILENAME>
// Request body: raw binary (application/octet-stream)
// Response: { upload: { token: string } }
export const UploadAttachmentToolSchema = z
  .object({
    filename: z.string().describe("Filename to associate with the uploaded binary data"),
    file_base64: z
      .string()
      .describe("Base64-encoded file content. Will be decoded to raw bytes before upload."),
    content_type: z
      .string()
      .default("application/octet-stream")
      .describe("MIME type of the file. Redmine expects application/octet-stream for raw uploads."),
  })
  .describe("Upload a file to Redmine to obtain a token for later attachment to issues/wiki/etc.");

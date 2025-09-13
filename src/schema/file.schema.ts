import { z } from "zod";
import { RedmineReferenceSchema } from "./reference.schema";

// Base File Schema for Redmine (v3.4 Alpha)
// Based on typical file-related fields in Redmine REST API
export const RedmineFileSchema = z.object({
  id: z.number().describe("Unique numeric identifier for the file"),
  filename: z.string().describe("Original filename with extension"),
  filesize: z.number().describe("File size in bytes"),
  content_type: z.string().describe("MIME type of the file (e.g., 'application/pdf', 'image/png')"),
  description: z.string().optional().describe("Optional file description provided during upload"),
  // Per Redmine REST Files: Response includes <content_url> for direct download URL
  // https://www.redmine.org/projects/redmine/wiki/Rest_Files#GET
  content_url: z
    .string()
    .url()
    .describe("Direct download URL for the file (content_url from Redmine REST)"),
  digest: z.string().describe("File hash/digest for integrity verification"),
  downloads: z.number().describe("Number of times this file has been downloaded"),
  author: RedmineReferenceSchema.describe("User who uploaded the file"),
  created_on: z.string().datetime().describe("File upload timestamp"),
  version: RedmineReferenceSchema.optional().describe(
    "Optional version this file is associated with"
  ),
});

export type RedmineFile = z.infer<typeof RedmineFileSchema>;

// Tool Parameter Schemas for Files API (v3.4 Alpha)
export const ListFilesToolSchema = z
  .object({
    project_id: z
      .union([z.string(), z.number()])
      .describe("The numeric ID or string identifier of the project to list files for"),
  })
  .describe("Retrieve all files uploaded to a project's Files section with metadata");

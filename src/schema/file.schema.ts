import { z } from "zod";
import { RedmineReferenceSchema } from "./reference.schema";

// Based on typical file-related fields in Redmine.
// See https://www.redmine.org/projects/redmine/wiki/Rest_Files
export const RedmineFileSchema = z.object({
  id: z.number(),
  filename: z.string(),
  filesize: z.number(),
  content_type: z.string(),
  description: z.string().optional(),
  digest: z.string(),
  downloads: z.number(),
  author: RedmineReferenceSchema,
  created_on: z.string().datetime(),
  version: RedmineReferenceSchema.optional(),
});

export type RedmineFile = z.infer<typeof RedmineFileSchema>;

export const ListFilesToolSchema = z.object({
  project_id: z.union([z.string(), z.number()]).describe("The ID or identifier of the project."),
});

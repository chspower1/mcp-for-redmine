import { z } from "zod";
import { RedmineReferenceSchema } from "./reference.schema";

// Base Version Schema for Redmine
export const RedmineVersionSchema = z.object({
  id: z.number(),
  project: RedmineReferenceSchema,
  name: z.string(),
  description: z.string(),
  status: z.enum(["open", "locked", "closed"]),
  due_date: z.string().nullable(), // date
  sharing: z.string(),
  created_on: z.string().datetime(),
  updated_on: z.string().datetime(),
});
export type RedmineVersion = z.infer<typeof RedmineVersionSchema>;

// API Request Schemas
const VersionRequestObjectSchema = z.object({
  name: z.string(),
  status: z.enum(["open", "locked", "closed"]).optional(),
  sharing: z.enum(["none", "descendants", "hierarchy", "tree", "system"]).optional(),
  due_date: z.string().optional().describe("The version due date, e.g., 'YYYY-MM-DD'."),
  description: z.string().optional(),
});

export const CreateVersionRequestSchema = z.object({
  version: VersionRequestObjectSchema,
});
export type CreateVersionPayload = z.infer<typeof CreateVersionRequestSchema>;

export const UpdateVersionRequestSchema = z.object({
  version: VersionRequestObjectSchema.partial(),
});
export type UpdateVersionPayload = z.infer<typeof UpdateVersionRequestSchema>;

// Tool Parameter Schemas
export const ListVersionsToolSchema = z.object({
  project_id: z
    .union([z.string(), z.number()])
    .describe("The ID or identifier of the project to list versions for."),
});

export const GetVersionToolSchema = z.object({
  id: z.string().describe("The numeric ID of the version."),
});

export const CreateVersionToolSchema = VersionRequestObjectSchema.extend({
  project_id: z
    .union([z.string(), z.number()])
    .describe("The ID or identifier of the project to create the version in."),
}).describe("Creates a new version for a project.");

export const UpdateVersionToolSchema = UpdateVersionRequestSchema.shape.version
  .extend({
    id: z.string().describe("The ID of the version to update."),
  })
  .describe("Updates an existing version.");

export const DeleteVersionToolSchema = z.object({
  id: z.string().describe("The ID of the version to delete."),
});

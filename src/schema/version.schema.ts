import { z } from "zod";
import { RedmineReferenceSchema } from "./reference.schema";

// Base Version Schema for Redmine (see: https://www.redmine.org/projects/redmine/wiki/Rest_Versions)
export const RedmineVersionSchema = z.object({
  id: z.number().describe("Unique numeric identifier for the version"),
  project: RedmineReferenceSchema.describe("Project this version belongs to"),
  name: z.string().describe("Human-readable version name (must be unique within project)"),
  description: z.string().describe("Version description and release notes"),
  status: z
    .enum(["open", "locked", "closed"])
    .describe("Version status: open (active), locked (read-only), closed (completed)"),
  due_date: z.string().nullable().describe("Target completion date in YYYY-MM-DD format"),
  sharing: z
    .enum(["none", "descendants", "hierarchy", "tree", "system"])
    .describe("Sharing scope: none, descendants, hierarchy, tree, or system"),
  wiki_page_title: z.string().nullable().optional().describe("Associated wiki page title if set"),
  created_on: z.string().datetime().describe("Version creation timestamp"),
  updated_on: z.string().datetime().describe("Last modification timestamp"),
});
export type RedmineVersion = z.infer<typeof RedmineVersionSchema>;

// API Request Schemas for Versions (Redmine REST API)
const VersionRequestObjectSchema = z.object({
  name: z.string().describe("Version name (required, must be unique within project)"),
  status: z
    .enum(["open", "locked", "closed"])
    .optional()
    .describe("Version status (default: open)"),
  sharing: z
    .enum(["none", "descendants", "hierarchy", "tree", "system"])
    .optional()
    .describe("Version sharing scope (default: none)"),
  due_date: z.string().optional().describe("Target completion date in YYYY-MM-DD format"),
  description: z.string().optional().describe("Version description and release notes"),
  wiki_page_title: z.string().optional().describe("Associated wiki page title"),
});

export const CreateVersionRequestSchema = z.object({
  version: VersionRequestObjectSchema,
});
export type CreateVersionPayload = z.infer<typeof CreateVersionRequestSchema>;

export const UpdateVersionRequestSchema = z.object({
  version: VersionRequestObjectSchema.partial(),
});
export type UpdateVersionPayload = z.infer<typeof UpdateVersionRequestSchema>;

// Tool Parameter Schemas for Versions API (v1.3 Alpha)
export const ListVersionsToolSchema = z
  .object({
    project_id: z.coerce
      .string()
      .describe("The numeric ID or string identifier of the project to list versions for"),
  })
  .describe("Retrieve all versions for a project including shared versions from other projects");

export const GetVersionToolSchema = z
  .object({
    id: z.coerce.string().describe("The numeric ID of the version to retrieve detailed information for"),
  })
  .describe("Retrieve detailed information about a specific version including sharing settings");

export const CreateVersionToolSchema = VersionRequestObjectSchema.extend({
  project_id: z.coerce
    .string()
    .describe("The numeric ID or string identifier of the project to create the version in"),
}).describe("Create a new version for project milestone tracking and issue organization");

export const UpdateVersionToolSchema = UpdateVersionRequestSchema.shape.version
  .extend({
    id: z.string().describe("The numeric ID of the version to update"),
  })
  .describe("Update an existing version's status, dates, description, or sharing settings");

export const DeleteVersionToolSchema = z
  .object({
    id: z.string().describe("The numeric ID of the version to delete"),
  })
  .describe("Delete a version and unassign it from all related issues");

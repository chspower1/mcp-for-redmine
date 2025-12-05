import { z } from "zod";
import { RedmineReferenceSchema } from "./reference.schema";
import { RedmineTrackerSchema } from "./tracker.schema";
import { RedmineIssueCategorySchema } from "./issue-category.schema";
import { RedmineEnumerationSchema } from "./enumerations.schema";

// Base Project Schema for Redmine
export const RedmineProjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  identifier: z.string(),
  description: z.string(),
  status: z.number(),
  is_public: z.boolean(),
  created_on: z.string().datetime(),
  updated_on: z.string().datetime(),
  parent: RedmineReferenceSchema.optional(),
  // For 'include' parameter
  trackers: z.array(RedmineTrackerSchema).optional(),
  issue_categories: z.array(RedmineIssueCategorySchema).optional(),
  enabled_modules: z
    .array(
      z.object({
        name: z.string().describe("Enabled module name for this project"),
      })
    )
    .optional(),
  time_entry_activities: z.array(RedmineEnumerationSchema).optional(),
});
export type RedmineProject = z.infer<typeof RedmineProjectSchema>;

// API Request Schemas
export const CreateProjectRequestSchema = z.object({
  project: z.object({
    name: z.string(),
    identifier: z.string(),
    description: z.string().optional(),
    is_public: z.boolean().optional(),
    parent_id: z.number().optional(),
    inherit_members: z.boolean().optional(),
    enabled_module_names: z.array(z.string()).optional(),
    tracker_ids: z.array(z.number()).optional(),
  }),
});
export type CreateProjectPayload = z.infer<typeof CreateProjectRequestSchema>;

export const UpdateProjectRequestSchema = z.object({
  project: CreateProjectRequestSchema.shape.project.partial(),
});
export type UpdateProjectPayload = z.infer<typeof UpdateProjectRequestSchema>;

// Tool Parameter Schemas
export const GetProjectToolSchema = z.object({
  id: z.coerce.string().describe("The numeric ID or string identifier of the project."),
  include: z
    .string()
    .optional()
    .describe(
      "Comma-separated list of associations to include: 'trackers' (issue trackers), 'issue_categories' (categories), 'enabled_modules' (enabled modules), 'time_entry_activities' (time activities)."
    ),
});

export const CreateProjectToolSchema = CreateProjectRequestSchema.shape.project.extend({
  identifier: z.string().describe("The unique identifier for the project."),
  name: z.string().describe("The name of the project."),
  description: z.string().optional().describe("A short description of the project."),
  is_public: z.boolean().optional().describe("Whether the project is public or not."),
  parent_id: z.number().optional().describe("The ID of the parent project."),
  inherit_members: z
    .boolean()
    .optional()
    .describe("Whether to inherit members from the parent project."),
});

export const UpdateProjectToolSchema = CreateProjectToolSchema.partial().extend({
  id: z.coerce.string().describe("The ID or identifier of the project to update."),
});

export const ArchiveProjectToolSchema = z.object({
  id: z.coerce.string().describe("The ID or identifier of the project to archive."),
});

export const UnarchiveProjectToolSchema = z.object({
  id: z.coerce.string().describe("The ID or identifier of the project to unarchive."),
});

export const DeleteProjectToolSchema = z.object({
  id: z.coerce.string().describe("The ID or identifier of the project to delete."),
});

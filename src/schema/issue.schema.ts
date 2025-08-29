import { z } from "zod";
import { RedmineReference, RedmineReferenceSchema } from "./reference.schema";

const RedmineCustomFieldSchema = z.object({
  id: z.number(),
  name: z.string(),
  value: z.any(),
});

const RedmineAttachmentSchema = z.object({
  id: z.number(),
  filename: z.string(),
  filesize: z.number(),
  content_type: z.string(),
  description: z.string(),
  content_url: z.string(),
  author: RedmineReferenceSchema,
  created_on: z.string().datetime(),
});

const RedmineJournalSchema = z.object({
  id: z.number(),
  user: RedmineReferenceSchema,
  notes: z.string(),
  created_on: z.string().datetime(),
  details: z
    .array(
      z.object({
        property: z.string(),
        name: z.string(),
        old_value: z.any().nullable(),
        new_value: z.any().nullable(),
      })
    )
    .optional(),
});

const BaseRedmineIssueSchema = z.object({
  id: z.number(),
  subject: z.string(),
  description: z.string().nullable(),
  project: RedmineReferenceSchema,
  tracker: RedmineReferenceSchema,
  status: RedmineReferenceSchema,
  priority: RedmineReferenceSchema,
  author: RedmineReferenceSchema,
  assigned_to: RedmineReferenceSchema.optional(),
  category: RedmineReferenceSchema.optional(),
  fixed_version: RedmineReferenceSchema.optional(),
  parent: z.object({ id: z.number() }).optional(),
  done_ratio: z.number(),
  is_private: z.boolean(),
  estimated_hours: z.number().nullable(),
  total_estimated_hours: z.number().nullable().optional(),
  spent_hours: z.number(),
  total_spent_hours: z.number().optional(),
  created_on: z.string().datetime(),
  updated_on: z.string().datetime(),
  start_date: z.string().nullable(),
  due_date: z.string().nullable(),
  closed_on: z.string().datetime().nullable(),
  custom_fields: z.array(RedmineCustomFieldSchema).optional(),
  attachments: z.array(RedmineAttachmentSchema).optional(),
  journals: z.array(RedmineJournalSchema).optional(),
  watchers: z.array(RedmineReferenceSchema).optional(),
});

export type RedmineIssue = z.infer<typeof BaseRedmineIssueSchema> & {
  children?: RedmineIssue[];
};

export const RedmineIssueSchema: z.ZodType<RedmineIssue> = BaseRedmineIssueSchema.extend({
  children: z.lazy(() => z.array(RedmineIssueSchema)).optional(),
});

const CreateIssueRequestObjectSchema = z.object({
  project_id: z.union([z.string(), z.number()]),
  subject: z.string(),
  description: z.string().optional(),
  tracker_id: z.number().optional(),
  status_id: z.number().optional(),
  priority_id: z.number().optional(),
  assigned_to_id: z.number().optional(),
  category_id: z.number().optional(),
  fixed_version_id: z.number().optional(),
  parent_issue_id: z.number().optional(),
  is_private: z.boolean().optional(),
  estimated_hours: z.number().optional(),
  start_date: z.string().optional(),
  due_date: z.string().optional(),
});

export const CreateIssueRequestSchema = z.object({
  issue: CreateIssueRequestObjectSchema,
});

export const UpdateIssueRequestSchema = z.object({
  issue: CreateIssueRequestObjectSchema.partial().extend({
    notes: z.string().optional().describe("Add a journal note to the issue update."),
  }),
});

export type CreateIssuePayload = z.infer<typeof CreateIssueRequestSchema>;
export type UpdateIssuePayload = z.infer<typeof UpdateIssueRequestSchema>;

export const GetIssueToolSchema = z.object({
  id: z.string().describe("The numeric ID of the issue to retrieve."),
  include: z
    .string()
    .optional()
    .describe("Comma-separated list of related data to include, e.g., 'journals,attachments'."),
});

export const ListIssuesToolSchema = z.object({
  project_id: z
    .union([z.string(), z.number()])
    .optional()
    .describe("Filter by project ID or identifier."),
  tracker_id: z.number().optional().describe("Filter by tracker ID."),
  status_id: z
    .union([z.string(), z.number()])
    .optional()
    .describe("Filter by status ID. Can be a specific ID or 'open', 'closed', or '*' for all."),
  assigned_to_id: z
    .union([z.string(), z.number()])
    .optional()
    .describe("Filter by assigned user ID. Can be a specific ID or 'me' for the current user."),
  priority_id: z.number().optional().describe("Filter by priority ID."),
  category_id: z.number().optional().describe("Filter by issue category ID."),
  fixed_version_id: z.number().optional().describe("Filter by target version ID."),
  parent_id: z.number().optional().describe("Filter by parent issue ID (for subtasks)."),
  created_on: z
    .string()
    .optional()
    .describe("Filter by creation date. Use '>=' or '<=' followed by date (YYYY-MM-DD)."),
  updated_on: z
    .string()
    .optional()
    .describe("Filter by update date. Use '>=' or '<=' followed by date (YYYY-MM-DD)."),
  closed_on: z
    .string()
    .optional()
    .describe("Filter by closed date. Use '>=' or '<=' followed by date (YYYY-MM-DD)."),
  limit: z.number().optional().describe("Number of issues to return (default 25, max 100)."),
  offset: z.number().optional().describe("Offset for pagination."),
  sort: z
    .string()
    .optional()
    .describe("Comma-separated list of fields for sorting, e.g., 'priority:desc,updated_on:desc'."),
  include: z
    .string()
    .optional()
    .describe("Comma-separated list of associations to include in the response."),
});

export const CreateIssueToolSchema = CreateIssueRequestObjectSchema.extend({
  project_id: z
    .union([z.string(), z.number()])
    .describe("The numeric ID or string identifier of the project."),
}).describe("Creates a new issue.");

export const UpdateIssueToolSchema = UpdateIssueRequestSchema.shape.issue
  .extend({
    id: z.string().describe("The ID of the issue to update."),
  })
  .describe("Updates an existing issue.");

export const DeleteIssueToolSchema = z.object({
  id: z.string().describe("The ID of the issue to delete."),
});

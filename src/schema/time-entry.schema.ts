import { z } from "zod";
import { RedmineReferenceSchema } from "./reference.schema";

// Base Time Entry Schema for Redmine
export const RedmineTimeEntrySchema = z.object({
  id: z.number(),
  project: RedmineReferenceSchema,
  issue: RedmineReferenceSchema.optional(),
  user: RedmineReferenceSchema,
  activity: RedmineReferenceSchema,
  hours: z.number(),
  comments: z.string(),
  spent_on: z.string(), // date
  created_on: z.string().datetime(),
  updated_on: z.string().datetime(),
});
export type RedmineTimeEntry = z.infer<typeof RedmineTimeEntrySchema>;

// API Request Schemas
const TimeEntryRequestObjectSchema = z.object({
  issue_id: z.number().optional(),
  project_id: z.union([z.string(), z.number()]).optional(),
  spent_on: z.string().optional().describe("Date the time was spent, e.g., 'YYYY-MM-DD'."),
  hours: z.number(),
  activity_id: z.number().optional(),
  comments: z.string().optional(),
});

export const CreateTimeEntryRequestSchema = z.object({
  time_entry: TimeEntryRequestObjectSchema.refine((data) => data.issue_id || data.project_id, {
    message: "Either 'issue_id' or 'project_id' must be provided.",
    path: ["issue_id | project_id"],
  }),
});
export type CreateTimeEntryPayload = z.infer<typeof CreateTimeEntryRequestSchema>;

export const UpdateTimeEntryRequestSchema = z.object({
  time_entry: TimeEntryRequestObjectSchema.partial(),
});
export type UpdateTimeEntryPayload = z.infer<typeof UpdateTimeEntryRequestSchema>;

// Tool Parameter Schemas
export const ListTimeEntriesToolSchema = z.object({
  project_id: z
    .union([z.string(), z.number()])
    .optional()
    .describe("Filter by project ID or identifier."),
  user_id: z.union([z.string(), z.number()]).optional().describe("Filter by user ID or 'me'."),
  issue_id: z.string().optional().describe("Filter by issue ID."),
  limit: z.number().optional().describe("Number of entries to return (default 25, max 100)."),
  offset: z.number().optional().describe("Offset for pagination."),
});

export const GetTimeEntryToolSchema = z.object({
  id: z.string().describe("The numeric ID of the time entry."),
});

export const CreateTimeEntryToolSchema = TimeEntryRequestObjectSchema.extend({
  spent_on: z.string().describe("Date the time was spent, e.g., 'YYYY-MM-DD'."),
}).describe("Creates a new time entry.");

export const UpdateTimeEntryToolSchema = UpdateTimeEntryRequestSchema.shape.time_entry
  .extend({
    id: z.string().describe("The ID of the time entry to update."),
  })
  .describe("Updates an existing time entry.");

export const DeleteTimeEntryToolSchema = z.object({
  id: z.string().describe("The ID of the time entry to delete."),
});

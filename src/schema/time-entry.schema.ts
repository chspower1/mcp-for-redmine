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
  user_id: z.union([z.string(), z.number()]).optional().describe("Filter by user ID or 'me' for current user."),
  issue_id: z.string().optional().describe("Filter by issue ID."),
  spent_on: z
    .string()
    .optional()
    .describe("Filter by specific date when time was spent (YYYY-MM-DD format)."),
  from: z
    .string()
    .optional()
    .describe("Filter entries from this date onwards (YYYY-MM-DD format)."),
  to: z
    .string()
    .optional()
    .describe("Filter entries up to this date (YYYY-MM-DD format)."),
  activity_id: z.number().optional().describe("Filter by time tracking activity ID."),
  limit: z.number().optional().describe("Number of entries to return (default 25, max 100)."),
  offset: z.number().optional().describe("Offset for pagination."),
});

export const GetTimeEntryToolSchema = z.object({
  id: z.string().describe("The numeric ID of the time entry."),
});

export const CreateTimeEntryToolSchema = TimeEntryRequestObjectSchema.extend({
  spent_on: z
    .string()
    .describe("Date the time was spent in YYYY-MM-DD format. Defaults to current date if not provided."),
  hours: z
    .number()
    .positive()
    .describe("Number of hours spent. Use decimal format for partial hours (e.g., 1.5 for 1 hour 30 minutes)."),
  comments: z
    .string()
    .max(255)
    .optional()
    .describe("Description of the work performed. Maximum 255 characters."),
  activity_id: z
    .number()
    .optional()
    .describe("Time tracking activity ID. If not provided, default activity will be used."),
  user_id: z
    .number()
    .optional()
    .describe("User ID for logging time on behalf of another user (requires permissions)."),
}).describe("Creates a new time entry. Requires either issue_id or project_id, plus hours.");

export const UpdateTimeEntryToolSchema = UpdateTimeEntryRequestSchema.shape.time_entry
  .extend({
    id: z.string().describe("The ID of the time entry to update."),
  })
  .describe("Updates an existing time entry.");

export const DeleteTimeEntryToolSchema = z.object({
  id: z.string().describe("The ID of the time entry to delete."),
});

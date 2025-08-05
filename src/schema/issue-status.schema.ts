import { z } from "zod";

// Base Issue Status Schema for Redmine
export const RedmineIssueStatusSchema = z.object({
  id: z.number(),
  name: z.string(),
  is_closed: z.boolean(),
});
export type RedmineIssueStatus = z.infer<typeof RedmineIssueStatusSchema>;

// Tool Parameter Schemas
export const ListIssueStatusesToolSchema = z.object({});

import { z } from "zod";

// Base Query Schema for Redmine (v1.3 Alpha)
export const RedmineQuerySchema = z.object({
  id: z.number().describe("Unique numeric identifier for the custom query"),
  name: z.string().describe("Human-readable query name"),
  is_public: z.boolean().describe("Whether query is visible to all users (true) or private to creator (false)"),
  project_id: z.number().nullable().describe("Associated project ID (null for global queries available across all projects)"),
});
export type RedmineQuery = z.infer<typeof RedmineQuerySchema>;

// Tool Parameter Schemas for Queries API (v1.3 Alpha)
export const ListQueriesToolSchema = z.object({
  // No parameters needed - returns all queries visible to current user
}).describe("Retrieve all custom queries (public and private) accessible to the current user");

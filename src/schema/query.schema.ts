import { z } from "zod";

// Base Query Schema for Redmine (v1.3 Alpha)
export const RedmineQuerySchema = z.object({
  id: z.number().describe("Unique numeric identifier for the custom query"),
  name: z.string().describe("Human-readable query name"),
  is_public: z
    .boolean()
    .describe("Whether query is visible to all users (true) or private to creator (false)"),
  project_id: z
    .number()
    .nullable()
    .describe("Associated project ID (null for global queries available across all projects)"),
});
export type RedmineQuery = z.infer<typeof RedmineQuerySchema>;

// Tool Parameter Schemas for Queries API (v1.3 Alpha)
export const ListQueriesToolSchema = z
  .object({
    project_id: z
      .number()
      .int()
      .positive()
      .optional()
      .describe("Filter queries for specific project by numeric ID"),
    limit: z
      .number()
      .int()
      .positive()
      .max(100)
      .optional()
      .describe("Pagination: max number of items to return"),
    offset: z
      .number()
      .int()
      .nonnegative()
      .optional()
      .describe("Pagination: number of items to skip before starting to return results"),
  })
  .describe(
    "Retrieve custom queries visible to the current user. Supports project_id, limit, and offset as per Redmine Rest_Queries."
  );

import { z } from "zod";

// Base Query Schema for Redmine
export const RedmineQuerySchema = z.object({
  id: z.number(),
  name: z.string(),
  is_public: z.boolean(),
  project_id: z.number().nullable(),
});
export type RedmineQuery = z.infer<typeof RedmineQuerySchema>;

// Tool Parameter Schemas
export const ListQueriesToolSchema = z.object({});

import { z } from "zod";

// Base Search Result Schema for Redmine
export const RedmineSearchResultSchema = z.object({
  id: z.number(),
  title: z.string(),
  type: z.string(),
  url: z.string(),
  description: z.string(),
});
export type RedmineSearchResult = z.infer<typeof RedmineSearchResultSchema>;

// Tool Parameter Schemas
export const SearchToolSchema = z.object({
  q: z.string().describe("The search query."),
  scope: z
    .string()
    .optional()
    .describe("Limit search to a specific project (identifier). Can be null for all projects."),
  all_words: z.boolean().optional().describe("If true, all words in the query must be present."),
  titles_only: z.boolean().optional().describe("If true, only search in titles."),
  open_issues: z.boolean().optional().describe("If true, only search in open issues."),
  offset: z.number().optional().describe("Offset for pagination."),
  limit: z.number().optional().describe("Number of results to return (default 25, max 100)."),
});
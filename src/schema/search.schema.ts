import { z } from "zod";

// Base Search Result Schema for Redmine
// According to Redmine REST API Search docs, each result includes common fields
// such as title, type, url, description. Some items have id, datetime and project.
// project is returned as an object with at least id and name.
export const RedmineSearchResultSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  type: z.string(),
  url: z.string(),
  description: z.string().optional(),
  datetime: z.string().optional(),
  project: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .optional(),
});
export type RedmineSearchResult = z.infer<typeof RedmineSearchResultSchema>;

// Tool Parameter Schemas (aligned with Redmine Search API)
export const SearchToolSchema = z.object({
  q: z.string().describe("Search query string (required)."),
  // Project path scoping: /projects/:project/search.json
  project: z
    .string()
    .optional()
    .describe("Project identifier or numeric id for path-scoped search."),
  // Search scope within the chosen context
  scope: z
    .enum(["all", "my_projects", "subprojects"]) // per Redmine Search parameters
    .optional()
    .describe("Search scope: all, my_projects, or subprojects."),
  all_words: z.boolean().optional().describe("If true, all words in the query must be present."),
  titles_only: z.boolean().optional().describe("If true, only search in titles."),
  open_issues: z.boolean().optional().describe("If true, only search in open issues."),
  // Resource filters (all optional, true to include)
  issues: z.boolean().optional().describe("Include issues in results."),
  news: z.boolean().optional().describe("Include news in results."),
  documents: z.boolean().optional().describe("Include documents in results."),
  changesets: z.boolean().optional().describe("Include changesets in results."),
  wiki_pages: z.boolean().optional().describe("Include wiki pages in results."),
  messages: z.boolean().optional().describe("Include forum messages in results."),
  projects: z.boolean().optional().describe("Include projects in results."),
  attachments: z.boolean().optional().describe("Include attachments in results."),
  // Pagination
  offset: z.number().optional().describe("Offset for pagination."),
  limit: z.number().optional().describe("Number of results to return (default 25, max 100)."),
});

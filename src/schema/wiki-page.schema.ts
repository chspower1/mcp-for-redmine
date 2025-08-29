import { z } from "zod";
import { RedmineReferenceSchema } from "./reference.schema";

// Base Wiki Page Schema for Redmine (v2.2 Alpha)
export const RedmineWikiPageSchema = z.object({
  title: z.string().describe("Wiki page title (used in URLs and navigation)"),
  text: z.string().describe("Wiki page content in textile/markdown format"),
  version: z.number().describe("Current version number for change tracking"),
  author: RedmineReferenceSchema.describe("User who created or last modified the page"),
  comments: z.string().optional().describe("Version change description or edit summary"),
  created_on: z.string().datetime().describe("Page creation timestamp"),
  updated_on: z.string().datetime().describe("Last modification timestamp"),
});
export type RedmineWikiPage = z.infer<typeof RedmineWikiPageSchema>;

// API Request Schemas for Wiki Pages (v2.2 Alpha)
const WikiPageRequestObjectSchema = z.object({
  text: z.string().describe("Wiki page content in textile/markdown format (required)"),
  comments: z.string().optional().describe("Change description for version history"),
  version: z.number().optional().describe("Current version number for optimistic locking to prevent conflicts"),
});

export const CreateOrUpdateWikiPageRequestSchema = z.object({
  wiki_page: WikiPageRequestObjectSchema,
});
export type CreateOrUpdateWikiPagePayload = z.infer<typeof CreateOrUpdateWikiPageRequestSchema>;

// Tool Parameter Schemas for Wiki Pages API (v2.2 Alpha)
export const ListWikiPagesToolSchema = z.object({
  project_id: z.union([z.string(), z.number()]).describe("The numeric ID or string identifier of the project to list wiki pages for"),
}).describe("Retrieve all wiki page titles for a project");

export const GetWikiPageToolSchema = z.object({
  project_id: z.union([z.string(), z.number()]).describe("The numeric ID or string identifier of the project"),
  title: z.string().describe("The title of the wiki page to retrieve"),
  version: z.number().optional().describe("Optional specific version number to retrieve from history"),
}).describe("Retrieve a specific wiki page with full content and metadata");

export const CreateOrUpdateWikiPageToolSchema = WikiPageRequestObjectSchema.extend({
  project_id: z.union([z.string(), z.number()]).describe("The numeric ID or string identifier of the project"),
  title: z.string().describe("The title of the wiki page to create or update"),
}).describe("Create a new wiki page or update existing page content with version control");

export const DeleteWikiPageToolSchema = z.object({
  project_id: z.union([z.string(), z.number()]).describe("The numeric ID or string identifier of the project"),
  title: z.string().describe("The title of the wiki page to permanently delete"),
}).describe("Delete a wiki page and all its version history permanently");

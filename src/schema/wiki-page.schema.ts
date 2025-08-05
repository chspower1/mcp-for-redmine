import { z } from "zod";
import { RedmineReferenceSchema } from "./reference.schema";

// Base Wiki Page Schema for Redmine
export const RedmineWikiPageSchema = z.object({
  title: z.string(),
  text: z.string(),
  version: z.number(),
  author: RedmineReferenceSchema,
  comments: z.string().optional(),
  created_on: z.string().datetime(),
  updated_on: z.string().datetime(),
});
export type RedmineWikiPage = z.infer<typeof RedmineWikiPageSchema>;

// API Request Schemas
const WikiPageRequestObjectSchema = z.object({
  text: z.string(),
  comments: z.string().optional(),
  version: z.number().optional().describe("For optimistic locking."),
});

export const CreateOrUpdateWikiPageRequestSchema = z.object({
  wiki_page: WikiPageRequestObjectSchema,
});
export type CreateOrUpdateWikiPagePayload = z.infer<typeof CreateOrUpdateWikiPageRequestSchema>;

// Tool Parameter Schemas
export const ListWikiPagesToolSchema = z.object({
  project_id: z.union([z.string(), z.number()]).describe("The ID or identifier of the project."),
});

export const GetWikiPageToolSchema = z.object({
  project_id: z.union([z.string(), z.number()]).describe("The ID or identifier of the project."),
  title: z.string().describe("The title of the wiki page."),
  version: z.number().optional().describe("The version of the wiki page to retrieve."),
});

export const CreateOrUpdateWikiPageToolSchema = WikiPageRequestObjectSchema.extend({
  project_id: z.union([z.string(), z.number()]).describe("The ID or identifier of the project."),
  title: z.string().describe("The title of the wiki page."),
}).describe("Creates or updates a wiki page.");

export const DeleteWikiPageToolSchema = z.object({
  project_id: z.union([z.string(), z.number()]).describe("The ID or identifier of the project."),
  title: z.string().describe("The title of the wiki page to delete."),
});

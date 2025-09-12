import { z } from "zod";
import { RedmineReferenceSchema } from "./reference.schema";
import { RedmineAttachmentSchema } from "./attachment.schema";

// Base Wiki Page Schema for Redmine (v2.2 Alpha)
export const RedmineWikiPageSchema = z
  .object({
    title: z.string().describe("Wiki page title (used in URLs and navigation)"),
    // Redmine returns raw wiki text as 'text'. It may be absent when using include filtering.
    text: z.string().describe("Wiki page content in textile/markdown format"),
    version: z.number().describe("Current version number for change tracking"),
    author: RedmineReferenceSchema.describe(
      "User who created or last modified the page (author element)"
    ),
    // Present on show endpoints; not part of list index items
    comments: z
      .string()
      .optional()
      .describe("Version change description or edit summary for this version"),
    created_on: z.string().datetime().describe("Page creation timestamp"),
    updated_on: z.string().datetime().describe("Last modification timestamp"),
    // Optional parent reference (appears in page show responses): <parent title="..."/>
    parent: z
      .object({ title: z.string() })
      .optional()
      .describe("Parent page reference by title if the page has a parent"),
    // attachments are includable on GET with include=attachments (and on old version GET)
    attachments: z
      .array(RedmineAttachmentSchema)
      .optional()
      .describe("List of attachments when include=attachments is specified"),
  })
  .describe(
    "Redmine wiki_page response (https://www.redmine.org/projects/redmine/wiki/Rest_WikiPages)."
  );
export type RedmineWikiPage = z.infer<typeof RedmineWikiPageSchema>;

// API Request Schemas for Wiki Pages (v2.2 Alpha)
const WikiPageRequestObjectSchema = z
  .object({
    text: z
      .string()
      .describe("Wiki page content in textile/markdown format (required by Redmine; 422 if blank)"),
    comments: z.string().optional().describe("Change description for version history"),
    version: z
      .number()
      .optional()
      .describe(
        "Current version number for optimistic locking; server returns 409 on stale update"
      ),
    // Redmine 'uploads' payload: array of { token, filename?, description?, content_type? }
    uploads: z
      .array(
        z.object({
          token: z.string().describe("Upload token returned by POST /uploads.json"),
          filename: z.string().optional().describe("Original filename; optional, server can infer"),
          description: z.string().optional().describe("Attachment description to be shown in UI"),
          content_type: z
            .string()
            .optional()
            .describe("MIME type (e.g., image/png, application/pdf)"),
        })
      )
      .optional()
      .describe("Files to attach to the page using previously obtained upload tokens"),
  })
  .describe(
    "Request body for PUT /projects/:identifier/wiki/:title (.json); wraps in { wiki_page: ... }"
  );

export const CreateOrUpdateWikiPageRequestSchema = z.object({
  wiki_page: WikiPageRequestObjectSchema,
});
export type CreateOrUpdateWikiPagePayload = z.infer<typeof CreateOrUpdateWikiPageRequestSchema>;

// Tool Parameter Schemas for Wiki Pages API (v2.2 Alpha)
export const ListWikiPagesToolSchema = z
  .object({
    project_id: z
      .union([z.string(), z.number()])
      .describe("The numeric ID or string identifier of the project to list wiki pages for"),
  })
  .describe("Retrieve all wiki page titles for a project");

export const GetWikiPageToolSchema = z
  .object({
    project_id: z
      .union([z.string(), z.number()])
      .describe("The numeric ID or string identifier of the project"),
    title: z.string().describe("The title of the wiki page to retrieve"),
    version: z
      .number()
      .optional()
      .describe("Optional specific version number to retrieve from history"),
    include: z
      .enum(["attachments"])
      .optional()
      .describe("Include related resources; currently supports 'attachments'"),
  })
  .describe("Retrieve a specific wiki page with full content and metadata");

export const CreateOrUpdateWikiPageToolSchema = WikiPageRequestObjectSchema.extend({
  project_id: z
    .union([z.string(), z.number()])
    .describe("The numeric ID or string identifier of the project"),
  title: z.string().describe("The title of the wiki page to create or update"),
}).describe("Create a new wiki page or update existing page content with version control");

export const DeleteWikiPageToolSchema = z
  .object({
    project_id: z
      .union([z.string(), z.number()])
      .describe("The numeric ID or string identifier of the project"),
    title: z.string().describe("The title of the wiki page to permanently delete"),
  })
  .describe("Delete a wiki page and all its version history permanently");

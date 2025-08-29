import {
  createOrUpdateWikiPage,
  deleteWikiPage,
  getWikiPage,
  listWikiPages,
} from "@/api/wiki-pages.api";
import {
  CreateOrUpdateWikiPageToolSchema,
  DeleteWikiPageToolSchema,
  GetWikiPageToolSchema,
  ListWikiPagesToolSchema,
} from "@/schema/wiki-page.schema";
import { McpTool } from "@/types/types";

export const listWikiPagesTool: McpTool<typeof ListWikiPagesToolSchema.shape> = {
  name: "wiki_pages_list",
  config: {
    description: "Retrieves all wiki page titles for a project. Shows available documentation pages without content. API Status: Alpha (v2.2).",
    inputSchema: ListWikiPagesToolSchema.shape,
  },
  execute: async ({ project_id }) => {
    try {
      const result = await listWikiPages(project_id);
      return {
        content: [{ type: "text", text: JSON.stringify(result.wiki_pages) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list wiki pages: ${errorMessage}`);
    }
  },
};

export const getWikiPageTool: McpTool<typeof GetWikiPageToolSchema.shape> = {
  name: "wiki_pages_get",
  config: {
    description: "Retrieves a specific wiki page with full content and metadata. Can fetch historical versions and includes author information. API Status: Alpha (v2.2).",
    inputSchema: GetWikiPageToolSchema.shape,
  },
  execute: async ({ project_id, title, version }) => {
    try {
      const result = await getWikiPage(project_id, title, version);
      return {
        content: [{ type: "text", text: JSON.stringify(result.wiki_page) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to retrieve wiki page: ${errorMessage}`);
    }
  },
};

export const createOrUpdateWikiPageTool: McpTool<typeof CreateOrUpdateWikiPageToolSchema.shape> = {
  name: "wiki_pages_create_or_update",
  config: {
    description: "Creates or updates wiki page content with version control. Supports optimistic locking and change tracking. Use version parameter to prevent conflicts. API Status: Alpha (v2.2).",
    inputSchema: CreateOrUpdateWikiPageToolSchema.shape,
  },
  execute: async ({ project_id, title, ...pageData }) => {
    const payload = { wiki_page: pageData };
    try {
      const result = await createOrUpdateWikiPage(project_id, title, payload);
      return {
        content: [{ type: "text", text: JSON.stringify(result.wiki_page) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to create or update wiki page: ${errorMessage}`);
    }
  },
};

export const deleteWikiPageTool: McpTool<typeof DeleteWikiPageToolSchema.shape> = {
  name: "wiki_pages_delete",
  config: {
    description: "Permanently deletes a wiki page and all its version history. Warning: This action removes all page data and attachments irreversibly. API Status: Alpha (v2.2).",
    inputSchema: DeleteWikiPageToolSchema.shape,
  },
  execute: async ({ project_id, title }) => {
    try {
      await deleteWikiPage(project_id, title);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              message: `Wiki page '${title}' deleted successfully.`,
            }),
          },
        ],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to delete wiki page: ${errorMessage}`);
    }
  },
};

import {
  createOrUpdateWikiPage,
  deleteWikiPage,
  getWikiPage,
  listWikiPages,
} from "../api/wiki-pages.api";
import {
  CreateOrUpdateWikiPageToolSchema,
  DeleteWikiPageToolSchema,
  GetWikiPageToolSchema,
  ListWikiPagesToolSchema,
} from "../schema/wiki-page.schema";
import { McpTool } from "../types/types";

export const listWikiPagesTool: McpTool<typeof ListWikiPagesToolSchema.shape> = {
  name: "wiki_pages_list",
  config: {
    description: "Retrieves a list of all wiki pages for a given project.",
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
    description: "Retrieves a specific wiki page from a project.",
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
    description: "Creates or updates a wiki page.",
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
    description: "Deletes a wiki page.",
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

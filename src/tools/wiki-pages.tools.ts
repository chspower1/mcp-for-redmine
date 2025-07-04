import { z } from "zod";
import { listWikiPages, getWikiPage, updateWikiPage, deleteWikiPage } from "../api/wiki-pages.api";
import { Tool } from "../types/types";

export const listWikiPagesTool: Tool = {
  name: "redmine_list-wiki-pages",
  description: "Retrieves the list of all pages in a project wiki.",
  parameters: z.object({
    projectId: z.union([z.string(), z.number()]).describe("The ID or identifier of the project."),
  }),
  execute: async ({ projectId }) => {
    try {
      const result = await listWikiPages(projectId);
      return result.wiki_pages;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list wiki pages for project ${projectId}: ${errorMessage}`);
    }
  },
};

export const getWikiPageTool: Tool = {
  name: "redmine_get-wiki-page",
  description: "Retrieves a wiki page with its content, including a specific version.",
  parameters: z.object({
    projectId: z.union([z.string(), z.number()]).describe("The ID or identifier of the project."),
    title: z.string().describe("The title of the wiki page."),
    version: z.number().optional().describe("Optional version of the page to retrieve."),
  }),
  execute: async ({ projectId, title, version }) => {
    try {
      const result = await getWikiPage(projectId, title, version);
      return result.wiki_page;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to retrieve wiki page '${title}': ${errorMessage}`);
    }
  },
};

export const updateWikiPageTool: Tool = {
  name: "redmine_update-wiki-page",
  description: "Creates or updates a wiki page.",
  parameters: z.object({
    projectId: z.union([z.string(), z.number()]).describe("The ID or identifier of the project."),
    title: z.string().describe("The title of the wiki page."),
    text: z.string().describe("The content of the wiki page."),
    comments: z.string().optional().describe("Comments for the update."),
  }),
  execute: async ({ projectId, title, text, comments }) => {
    try {
      const result = await updateWikiPage(projectId, title, {
        wiki_page: { text, comments },
      });
      return result.wiki_page;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to update wiki page '${title}': ${errorMessage}`);
    }
  },
};

export const deleteWikiPageTool: Tool = {
  name: "redmine_delete-wiki-page",
  description: "Deletes a wiki page.",
  parameters: z.object({
    projectId: z.union([z.string(), z.number()]).describe("The ID or identifier of the project."),
    title: z.string().describe("The title of the wiki page to delete."),
  }),
  execute: async ({ projectId, title }) => {
    try {
      await deleteWikiPage(projectId, title);
      return { success: true, message: `Wiki page '${title}' deleted successfully.` };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to delete wiki page '${title}': ${errorMessage}`);
    }
  },
};

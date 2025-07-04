import { z } from "zod";
import {
  listProjectIssueCategories,
  createIssueCategory,
  getIssueCategory,
  updateIssueCategory,
  deleteIssueCategory,
} from "../api/issue-categories.api";
import { Tool } from "../types/types";

export const listProjectIssueCategoriesTool: Tool = {
  name: "redmine_list-project-issue-categories",
  description: "Returns the list of issue categories for a given project.",
  parameters: z.object({
    projectId: z.union([z.string(), z.number()]).describe("The ID or identifier of the project."),
  }),
  execute: async ({ projectId }) => {
    try {
      const result = await listProjectIssueCategories(projectId);
      return result.issue_categories;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list issue categories for project ${projectId}: ${errorMessage}`);
    }
  },
};

export const createIssueCategoryTool: Tool = {
  name: "redmine_create-issue-category",
  description: "Creates an issue category for a project.",
  parameters: z.object({
    projectId: z.union([z.string(), z.number()]).describe("The ID or identifier of the project."),
    name: z.string().describe("The name of the new category."),
    assigned_to_id: z
      .number()
      .optional()
      .describe("The ID of the user to assign to this category by default."),
  }),
  execute: async ({ projectId, ...categoryData }) => {
    try {
      const result = await createIssueCategory(projectId, { issue_category: categoryData });
      return result.issue_category;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to create issue category in project ${projectId}: ${errorMessage}`);
    }
  },
};

export const getIssueCategoryTool: Tool = {
  name: "redmine_get-issue-category",
  description: "Returns a single issue category by its ID.",
  parameters: z.object({
    id: z.number().describe("The ID of the issue category."),
  }),
  execute: async ({ id }) => {
    try {
      const result = await getIssueCategory(id);
      return result.issue_category;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to retrieve issue category ${id}: ${errorMessage}`);
    }
  },
};

export const updateIssueCategoryTool: Tool = {
  name: "redmine_update-issue-category",
  description: "Updates an issue category.",
  parameters: z.object({
    id: z.number().describe("The ID of the issue category to update."),
    name: z.string().optional().describe("The new name for the category."),
  }),
  execute: async ({ id, ...categoryData }) => {
    try {
      await updateIssueCategory(id, { issue_category: categoryData });
      return { success: true, message: `Issue category ${id} updated successfully.` };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to update issue category ${id}: ${errorMessage}`);
    }
  },
};

export const deleteIssueCategoryTool: Tool = {
  name: "redmine_delete-issue-category",
  description: "Deletes an issue category.",
  parameters: z.object({
    id: z.number().describe("The ID of the issue category to delete."),
  }),
  execute: async ({ id }) => {
    try {
      await deleteIssueCategory(id);
      return { success: true, message: `Issue category ${id} deleted successfully.` };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to delete issue category ${id}: ${errorMessage}`);
    }
  },
};

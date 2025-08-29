import {
  createIssueCategory,
  deleteIssueCategory,
  getIssueCategory,
  listIssueCategories,
  updateIssueCategory,
} from "@/api/issue-categories.api";
import {
  CreateIssueCategoryToolSchema,
  DeleteIssueCategoryToolSchema,
  GetIssueCategoryToolSchema,
  ListIssueCategoriesToolSchema,
  UpdateIssueCategoryToolSchema,
} from "@/schema/issue-category.schema";
import { McpTool } from "@/types/types";

export const listIssueCategoriesTool: McpTool<typeof ListIssueCategoriesToolSchema.shape> = {
  name: "issue_categories_list",
  config: {
    description: "Retrieves a list of issue categories for a project. Shows category names, assigned users, and organization structure. API Status: Alpha (v1.3).",
    inputSchema: ListIssueCategoriesToolSchema.shape,
  },
  execute: async ({ project_id }) => {
    try {
      const result = await listIssueCategories(project_id);
      return {
        content: [{ type: "text", text: JSON.stringify(result.issue_categories) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list issue categories: ${errorMessage}`);
    }
  },
};

export const createIssueCategoryTool: McpTool<typeof CreateIssueCategoryToolSchema.shape> = {
  name: "issue_categories_create",
  config: {
    description: "Creates a new issue category for project organization. Requires project admin permissions. Category names must be unique within project. API Status: Alpha (v1.3).",
    inputSchema: CreateIssueCategoryToolSchema.shape,
  },
  execute: async ({ project_id, ...categoryData }) => {
    const payload = { issue_category: categoryData };
    try {
      const result = await createIssueCategory(project_id, payload);
      return {
        content: [{ type: "text", text: JSON.stringify(result.issue_category) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to create issue category: ${errorMessage}`);
    }
  },
};

export const getIssueCategoryTool: McpTool<typeof GetIssueCategoryToolSchema.shape> = {
  name: "issue_categories_get",
  config: {
    description: "Retrieves detailed information about a specific issue category. Shows project association, assigned user, and category configuration. API Status: Alpha (v1.3).",
    inputSchema: GetIssueCategoryToolSchema.shape,
  },
  execute: async ({ id }) => {
    try {
      const result = await getIssueCategory(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result.issue_category) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to retrieve issue category ${id}: ${errorMessage}`);
    }
  },
};

export const updateIssueCategoryTool: McpTool<typeof UpdateIssueCategoryToolSchema.shape> = {
  name: "issue_categories_update",
  config: {
    description: "Updates an existing issue category's name or assigned user. Requires project admin permissions. Category names must remain unique within project. API Status: Alpha (v1.3).",
    inputSchema: UpdateIssueCategoryToolSchema.shape,
  },
  execute: async ({ id, ...categoryData }) => {
    const payload = { issue_category: categoryData };
    try {
      await updateIssueCategory(id, payload);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              message: `Issue category ${id} updated successfully.`,
            }),
          },
        ],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to update issue category ${id}: ${errorMessage}`);
    }
  },
};

export const deleteIssueCategoryTool: McpTool<typeof DeleteIssueCategoryToolSchema.shape> = {
  name: "issue_categories_delete",
  config: {
    description: "Deletes an issue category with optional issue reassignment. Requires project admin permissions. Warning: Affects all issues in this category. API Status: Alpha (v1.3).",
    inputSchema: DeleteIssueCategoryToolSchema.shape,
  },
  execute: async ({ id }) => {
    try {
      await deleteIssueCategory(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              message: `Issue category ${id} deleted successfully.`,
            }),
          },
        ],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to delete issue category ${id}: ${errorMessage}`);
    }
  },
};

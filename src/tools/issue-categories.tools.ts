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
    description:
      "Retrieves a list of issue categories for a project. Shows category names and assigned users. API Status: Alpha (v1.3). Docs: https://www.redmine.org/projects/redmine/wiki/Rest_IssueCategories",
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
    description:
      "Creates a new issue category. Requires project admin permissions. Unique name within project. API Status: Alpha (v1.3). Docs: https://www.redmine.org/projects/redmine/wiki/Rest_IssueCategories#POST",
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
    description:
      "Retrieves a specific issue category by numeric id. API Status: Alpha (v1.3). Docs: https://www.redmine.org/projects/redmine/wiki/Rest_IssueCategories#GET",
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
    description:
      "Updates an issue category's name or assigned user. Requires project admin. API Status: Alpha (v1.3). Docs: https://www.redmine.org/projects/redmine/wiki/Rest_IssueCategories#PUT",
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
    description:
      "Deletes an issue category with optional reassignment. Requires project admin. Warning: affects issues in this category. API Status: Alpha (v1.3). Docs: https://www.redmine.org/projects/redmine/wiki/Rest_IssueCategories#DELETE",
    inputSchema: DeleteIssueCategoryToolSchema.shape,
  },
  execute: async ({ id, reassign_to_id }) => {
    try {
      await deleteIssueCategory(id, reassign_to_id);
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

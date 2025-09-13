import { createIssue, deleteIssue, getIssue, listIssues, updateIssue } from "@/api/issues.api";
import {
  CreateIssueToolSchema,
  DeleteIssueToolSchema,
  GetIssueToolSchema,
  ListIssuesToolSchema,
  UpdateIssueToolSchema,
} from "@/schema/issue.schema";
import { McpTool } from "@/types/types";

export const listIssuesTool: McpTool<typeof ListIssuesToolSchema.shape> = {
  name: "issues_list",
  config: {
    description:
      "Retrieves a list of issues with rich filtering and pagination. Supports project, tracker, status ('open'|'closed'|'*' or ID), assignee ('me' or ID), dates with comparisons ('>=YYYY-MM-DD'|'<=YYYY-MM-DD'), sorting (e.g., 'priority:desc,updated_on'), and 'include' expansions.",
    inputSchema: ListIssuesToolSchema.shape,
  },
  execute: async (params) => {
    try {
      const result = await listIssues(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result.issues) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list issues: ${errorMessage}`);
    }
  },
};

export const getIssueTool: McpTool<typeof GetIssueToolSchema.shape> = {
  name: "issues_get",
  config: {
    description:
      "Retrieves a single issue by ID. Use 'include' to expand 'children', 'attachments', 'relations', 'changesets', 'journals', 'watchers', or 'allowed_statuses'.",
    inputSchema: GetIssueToolSchema.shape,
  },
  execute: async ({ id, include }) => {
    try {
      const result = await getIssue(id, { include });
      return {
        content: [{ type: "text", text: JSON.stringify(result.issue) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to retrieve issue ${id}: ${errorMessage}`);
    }
  },
};

export const createIssueTool: McpTool<typeof CreateIssueToolSchema.shape> = {
  name: "issues_create",
  config: {
    description:
      "Creates a new issue. Requires 'project_id' and 'subject'. Supports 'custom_fields', 'uploads' (tokens from /uploads.json), 'watcher_user_ids', 'done_ratio', and other Redmine fields.",
    inputSchema: CreateIssueToolSchema.shape,
  },
  execute: async (args) => {
    const payload = { issue: args };
    try {
      const result = await createIssue(payload);
      return {
        content: [{ type: "text", text: JSON.stringify(result.issue) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to create issue: ${errorMessage}`);
    }
  },
};

export const updateIssueTool: McpTool<typeof UpdateIssueToolSchema.shape> = {
  name: "issues_update",
  config: {
    description:
      "Updates an existing issue. All fields optional. Use 'notes' to add a journal; set 'private_notes' to mark it private.",
    inputSchema: UpdateIssueToolSchema.shape,
  },
  execute: async ({ id, ...updateData }) => {
    const payload = {
      issue: updateData,
    };
    try {
      await updateIssue(id, payload);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              message: `Issue ${id} updated successfully.`,
            }),
          },
        ],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to update issue ${id}: ${errorMessage}`);
    }
  },
};

export const deleteIssueTool: McpTool<typeof DeleteIssueToolSchema.shape> = {
  name: "issues_delete",
  config: {
    description:
      "Deletes an issue from Redmine. Requires deletion permissions. Warning: This action is permanent and cannot be undone.",
    inputSchema: DeleteIssueToolSchema.shape,
  },
  execute: async ({ id }) => {
    try {
      await deleteIssue(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              message: `Issue ${id} deleted successfully.`,
            }),
          },
        ],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to delete issue ${id}: ${errorMessage}`);
    }
  },
};

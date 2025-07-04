import { z } from "zod";
import {
  listIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue,
  addWatcher,
  removeWatcher,
} from "../api/issues.api";
import { Tool } from "../types/types";

export const listIssuesTool: Tool = {
  name: "redmine_list-issues",
  description: "Retrieves a paginated list of issues, with optional filters.",
  parameters: z.object({
    project_id: z.number().optional().describe("Filter by project ID."),
    status_id: z.number().optional().describe("Filter by status ID. Use '*' for any status."),
    assigned_to_id: z.number().optional().describe("Filter by assigned user ID."),
    offset: z.number().optional().describe("Offset for pagination."),
    limit: z.number().optional().describe("Limit for pagination (max 100)."),
  }),
  execute: async (params) => {
    try {
      return await listIssues(params);
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list issues: ${errorMessage}`);
    }
  },
};

export const getIssueTool: Tool = {
  name: "redmine_get-issue",
  description: "Retrieves a single issue by its ID.",
  parameters: z.object({
    id: z.number().describe("The ID of the issue."),
    include: z
      .string()
      .optional()
      .describe("Comma-separated list of associations to include (e.g., 'journals,attachments')."),
  }),
  execute: async ({ id, include }) => {
    try {
      const result = await getIssue(id, { include });
      return result.issue;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to retrieve issue ${id}: ${errorMessage}`);
    }
  },
};

export const createIssueTool: Tool = {
  name: "redmine_create-issue",
  description: "Creates a new issue.",
  parameters: z.object({
    project_id: z.number().describe("The ID of the project."),
    subject: z.string().describe("The subject of the issue."),
    description: z.string().optional().describe("The description of the issue."),
    tracker_id: z.number().optional().describe("The ID of the tracker."),
    status_id: z.number().optional().describe("The ID of the status."),
    priority_id: z.number().optional().describe("The ID of the priority."),
    assigned_to_id: z.number().optional().describe("The ID of the user to assign the issue to."),
  }),
  execute: async (issueData) => {
    try {
      const result = await createIssue({ issue: issueData });
      return result.issue;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to create issue: ${errorMessage}`);
    }
  },
};

export const updateIssueTool: Tool = {
  name: "redmine_update-issue",
  description: "Updates an existing issue.",
  parameters: z.object({
    id: z.number().describe("The ID of the issue to update."),
    subject: z.string().optional().describe("The new subject."),
    description: z.string().optional().describe("The new description."),
    status_id: z.number().optional().describe("The new status ID."),
    assigned_to_id: z.number().optional().describe("The new assignee ID."),
    notes: z.string().optional().describe("Private notes to add with the update."),
  }),
  execute: async ({ id, ...updateData }) => {
    try {
      await updateIssue(id, { issue: updateData });
      return { success: true, message: `Issue ${id} updated successfully.` };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to update issue ${id}: ${errorMessage}`);
    }
  },
};

export const deleteIssueTool: Tool = {
  name: "redmine_delete-issue",
  description: "Deletes an issue.",
  parameters: z.object({
    id: z.number().describe("The ID of the issue to delete."),
  }),
  execute: async ({ id }) => {
    try {
      await deleteIssue(id);
      return { success: true, message: `Issue ${id} deleted successfully.` };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to delete issue ${id}: ${errorMessage}`);
    }
  },
};

export const addWatcherTool: Tool = {
  name: "redmine_add-watcher",
  description: "Adds a watcher to an issue.",
  parameters: z.object({
    issueId: z.number().describe("The ID of the issue."),
    userId: z.number().describe("The ID of the user to add as a watcher."),
  }),
  execute: async ({ issueId, userId }) => {
    try {
      await addWatcher(issueId, userId);
      return { success: true, message: `User ${userId} is now watching issue ${issueId}.` };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to add watcher to issue ${issueId}: ${errorMessage}`);
    }
  },
};

export const removeWatcherTool: Tool = {
  name: "redmine_remove-watcher",
  description: "Removes a watcher from an issue.",
  parameters: z.object({
    issueId: z.number().describe("The ID of the issue."),
    userId: z.number().describe("The ID of the user to remove."),
  }),
  execute: async ({ issueId, userId }) => {
    try {
      await removeWatcher(issueId, userId);
      return { success: true, message: `User ${userId} is no longer watching issue ${issueId}.` };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to remove watcher from issue ${issueId}: ${errorMessage}`);
    }
  },
};

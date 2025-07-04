import { z } from "zod";
import {
  listProjectVersions,
  createProjectVersion,
  getVersion,
  updateVersion,
  deleteVersion,
} from "../api/versions.api";
import { Tool } from "../types/types";

export const listProjectVersionsTool: Tool = {
  name: "redmine_list-project-versions",
  description: "Lists versions available for a given project.",
  parameters: z.object({
    projectId: z.union([z.string(), z.number()]).describe("The ID or identifier of the project."),
  }),
  execute: async ({ projectId }) => {
    try {
      const result = await listProjectVersions(projectId);
      return result.versions;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list versions for project ${projectId}: ${errorMessage}`);
    }
  },
};

export const createProjectVersionTool: Tool = {
  name: "redmine_create-project-version",
  description: "Creates a new version for a project.",
  parameters: z.object({
    projectId: z.union([z.string(), z.number()]).describe("The ID or identifier of the project."),
    name: z.string().describe("The name of the version."),
    status: z.enum(["open", "locked", "closed"]).optional().describe("The status of the version."),
    due_date: z.string().optional().describe("The due date in YYYY-MM-DD format."),
  }),
  execute: async ({ projectId, ...versionData }) => {
    try {
      const result = await createProjectVersion(projectId, { version: versionData });
      return result.version;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to create version for project ${projectId}: ${errorMessage}`);
    }
  },
};

export const getVersionTool: Tool = {
  name: "redmine_get-version",
  description: "Retrieves a single version by its ID.",
  parameters: z.object({
    id: z.number().describe("The ID of the version."),
  }),
  execute: async ({ id }) => {
    try {
      const result = await getVersion(id);
      return result.version;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to retrieve version ${id}: ${errorMessage}`);
    }
  },
};

export const updateVersionTool: Tool = {
  name: "redmine_update-version",
  description: "Updates a version.",
  parameters: z.object({
    id: z.number().describe("The ID of the version to update."),
    name: z.string().optional().describe("The new name of the version."),
    status: z
      .enum(["open", "locked", "closed"])
      .optional()
      .describe("The new status of the version."),
    due_date: z.string().optional().describe("The new due date in YYYY-MM-DD format."),
  }),
  execute: async ({ id, ...versionData }) => {
    try {
      await updateVersion(id, { version: versionData });
      return { success: true, message: `Version ${id} updated successfully.` };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to update version ${id}: ${errorMessage}`);
    }
  },
};

export const deleteVersionTool: Tool = {
  name: "redmine_delete-version",
  description: "Deletes a version.",
  parameters: z.object({
    id: z.number().describe("The ID of the version to delete."),
  }),
  execute: async ({ id }) => {
    try {
      await deleteVersion(id);
      return { success: true, message: `Version ${id} deleted successfully.` };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to delete version ${id}: ${errorMessage}`);
    }
  },
};

import { z } from "zod";
import {
  listProjects,
  getProject,
  createProject,
  updateProject,
  archiveProject,
  unarchiveProject,
  deleteProject,
} from "../api/projects.api";
import { Tool } from "../types/types";

export const listProjectsTool: Tool = {
  name: "redmine_list-projects",
  description: "Retrieves a list of all projects.",
  parameters: z.object({}),
  execute: async () => {
    try {
      const result = await listProjects();
      return result.projects;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list projects: ${errorMessage}`);
    }
  },
};

export const getProjectTool: Tool = {
  name: "redmine_get-project",
  description: "Retrieves a single project by its ID or identifier.",
  parameters: z.object({
    id: z
      .union([z.string(), z.number()])
      .describe("The numeric ID or string identifier of the project."),
    include: z
      .string()
      .optional()
      .describe(
        "Comma-separated list of associations to include (e.g., 'trackers,issue_categories')."
      ),
  }),
  execute: async ({ id, include }) => {
    try {
      const result = await getProject(id, { include });
      return result.project;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to retrieve project ${id}: ${errorMessage}`);
    }
  },
};

export const createProjectTool: Tool = {
  name: "redmine_create-project",
  description: "Creates a new project.",
  parameters: z.object({
    name: z.string().describe("The name of the project."),
    identifier: z.string().describe("The identifier of the project."),
    description: z.string().optional().describe("A description for the project."),
    is_public: z.boolean().optional().describe("Whether the project is public."),
  }),
  execute: async (projectData) => {
    try {
      const result = await createProject({ project: projectData });
      return result.project;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to create project: ${errorMessage}`);
    }
  },
};

export const updateProjectTool: Tool = {
  name: "redmine_update-project",
  description: "Updates an existing project.",
  parameters: z.object({
    id: z
      .union([z.string(), z.number()])
      .describe("The ID or identifier of the project to update."),
    name: z.string().optional().describe("The new name of the project."),
    description: z.string().optional().describe("The new description for the project."),
    is_public: z.boolean().optional().describe("The new visibility for the project."),
  }),
  execute: async ({ id, ...updateData }) => {
    try {
      await updateProject(id, { project: updateData });
      return { success: true, message: `Project ${id} updated successfully.` };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to update project ${id}: ${errorMessage}`);
    }
  },
};

export const deleteProjectTool: Tool = {
  name: "redmine_delete-project",
  description: "Deletes a project.",
  parameters: z.object({
    id: z
      .union([z.string(), z.number()])
      .describe("The ID or identifier of the project to delete."),
  }),
  execute: async ({ id }) => {
    try {
      await deleteProject(id);
      return { success: true, message: `Project ${id} deleted successfully.` };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to delete project ${id}: ${errorMessage}`);
    }
  },
};

export const archiveProjectTool: Tool = {
  name: "redmine_archive-project",
  description: "Archives a project.",
  parameters: z.object({
    id: z
      .union([z.string(), z.number()])
      .describe("The ID or identifier of the project to archive."),
  }),
  execute: async ({ id }) => {
    try {
      await archiveProject(id);
      return { success: true, message: `Project ${id} archived successfully.` };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to archive project ${id}: ${errorMessage}`);
    }
  },
};

export const unarchiveProjectTool: Tool = {
  name: "redmine_unarchive-project",
  description: "Unarchives a project.",
  parameters: z.object({
    id: z
      .union([z.string(), z.number()])
      .describe("The ID or identifier of the project to unarchive."),
  }),
  execute: async ({ id }) => {
    try {
      await unarchiveProject(id);
      return { success: true, message: `Project ${id} unarchived successfully.` };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to unarchive project ${id}: ${errorMessage}`);
    }
  },
};

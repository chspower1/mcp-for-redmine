import {
  archiveProject,
  createProject,
  deleteProject,
  getProject,
  listProjects,
  unarchiveProject,
  updateProject,
} from "../api/projects.api";
import {
  ArchiveProjectToolSchema,
  CreateProjectToolSchema,
  DeleteProjectToolSchema,
  GetProjectToolSchema,
  UnarchiveProjectToolSchema,
  UpdateProjectToolSchema,
} from "../schema/project.schema";
import { McpTool } from "../types/types";
import { z } from "zod";

export const listProjectsTool: McpTool<any> = {
  name: "projects_list",
  config: {
    description: "Retrieves a list of all projects.",
    inputSchema: z.object({}).shape,
  },
  execute: async () => {
    const result = await listProjects();
    return { content: [{ type: "text", text: JSON.stringify(result.projects) }] };
  },
};

export const getProjectTool: McpTool<typeof GetProjectToolSchema.shape> = {
  name: "projects_get",
  config: {
    description: "Retrieves a single project by its ID or identifier.",
    inputSchema: GetProjectToolSchema.shape,
  },
  execute: async ({ id, include }) => {
    const result = await getProject(id, { include });
    return { content: [{ type: "text", text: JSON.stringify(result.project) }] };
  },
};

export const createProjectTool: McpTool<typeof CreateProjectToolSchema.shape> = {
  name: "projects_create",
  config: {
    description: "Creates a new project.",
    inputSchema: CreateProjectToolSchema.shape,
  },
  execute: async (args) => {
    const result = await createProject({ project: args });
    return { content: [{ type: "text", text: JSON.stringify(result.project) }] };
  },
};

export const updateProjectTool: McpTool<typeof UpdateProjectToolSchema.shape> = {
  name: "projects_update",
  config: {
    description: "Updates an existing project.",
    inputSchema: UpdateProjectToolSchema.shape,
  },
  execute: async ({ id, ...updateData }) => {
    await updateProject(id, { project: updateData });
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            success: true,
            message: `Project ${id} updated successfully.`,
          }),
        },
      ],
    };
  },
};

export const archiveProjectTool: McpTool<typeof ArchiveProjectToolSchema.shape> = {
  name: "projects_archive",
  config: {
    description: "Archives a project.",
    inputSchema: ArchiveProjectToolSchema.shape,
  },
  execute: async ({ id }) => {
    await archiveProject(id);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            success: true,
            message: `Project ${id} archived successfully.`,
          }),
        },
      ],
    };
  },
};

export const unarchiveProjectTool: McpTool<typeof UnarchiveProjectToolSchema.shape> = {
  name: "projects_unarchive",
  config: {
    description: "Unarchives a project.",
    inputSchema: UnarchiveProjectToolSchema.shape,
  },
  execute: async ({ id }) => {
    await unarchiveProject(id);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            success: true,
            message: `Project ${id} unarchived successfully.`,
          }),
        },
      ],
    };
  },
};

export const deleteProjectTool: McpTool<typeof DeleteProjectToolSchema.shape> = {
  name: "projects_delete",
  config: {
    description: "Deletes a project.",
    inputSchema: DeleteProjectToolSchema.shape,
  },
  execute: async ({ id }) => {
    await deleteProject(id);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            success: true,
            message: `Project ${id} deleted successfully.`,
          }),
        },
      ],
    };
  },
};

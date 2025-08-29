import {
  archiveProject,
  createProject,
  deleteProject,
  getProject,
  listProjects,
  unarchiveProject,
  updateProject,
} from "@/api/projects.api";
import {
  ArchiveProjectToolSchema,
  CreateProjectToolSchema,
  DeleteProjectToolSchema,
  GetProjectToolSchema,
  UnarchiveProjectToolSchema,
  UpdateProjectToolSchema,
} from "@/schema/project.schema";
import { McpTool } from "@/types/types";
import { z } from "zod";

export const listProjectsTool: McpTool<any> = {
  name: "projects_list",
  config: {
    description: "Retrieves a list of all projects visible to the user. Returns public projects and private projects where user has access. Supports filtering and pagination.",
    inputSchema: z.object({
      include: z.string().optional().describe("Comma-separated list of associations to include: 'trackers', 'issue_categories', 'enabled_modules'."),
      offset: z.number().optional().describe("Number of projects to skip for pagination."),
      limit: z.number().optional().describe("Maximum number of projects to return (default: 25, max: 100).")
    }).shape,
  },
  execute: async (params) => {
    const result = await listProjects(params);
    return { content: [{ type: "text", text: JSON.stringify(result.projects) }] };
  },
};

export const getProjectTool: McpTool<typeof GetProjectToolSchema.shape> = {
  name: "projects_get",
  config: {
    description: "Retrieves a single project by its ID or identifier. Can include additional project data like trackers, categories, and enabled modules.",
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
    description: "Creates a new project in Redmine. Requires project creation permissions. Name and identifier are required fields.",
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
    description: "Updates an existing project's information. Requires project administration permissions. All fields are optional.",
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
    description: "Archives a project, making it read-only. Requires administration permissions. Available since Redmine 5.0.",
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
    description: "Unarchives a previously archived project, restoring full access. Requires administration permissions. Available since Redmine 5.0.",
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
    description: "Permanently deletes a project and all its contents. Requires administration permissions. Warning: This action is permanent and cannot be undone.",
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

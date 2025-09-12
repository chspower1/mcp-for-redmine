import {
  createVersion,
  deleteVersion,
  getVersion,
  listVersions,
  updateVersion,
} from "@/api/versions.api";
import {
  CreateVersionToolSchema,
  DeleteVersionToolSchema,
  GetVersionToolSchema,
  ListVersionsToolSchema,
  UpdateVersionToolSchema,
} from "@/schema/version.schema";
import { McpTool } from "@/types/types";

export const listVersionsTool: McpTool<typeof ListVersionsToolSchema.shape> = {
  name: "versions_list",
  config: {
    description:
      "Retrieves a list of versions for a project including shared versions. Shows status, due dates, and sharing scope. (Ref: https://www.redmine.org/projects/redmine/wiki/Rest_Versions)",
    inputSchema: ListVersionsToolSchema.shape,
  },
  execute: async ({ project_id }) => {
    try {
      const result = await listVersions(project_id);
      return {
        content: [{ type: "text", text: JSON.stringify(result.versions) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list versions: ${errorMessage}`);
    }
  },
};

export const getVersionTool: McpTool<typeof GetVersionToolSchema.shape> = {
  name: "versions_get",
  config: {
    description:
      "Retrieves detailed information about a specific version. Shows project association, sharing settings, and timeline information. (Ref: https://www.redmine.org/projects/redmine/wiki/Rest_Versions)",
    inputSchema: GetVersionToolSchema.shape,
  },
  execute: async ({ id }) => {
    try {
      const result = await getVersion(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result.version) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to retrieve version ${id}: ${errorMessage}`);
    }
  },
};

export const createVersionTool: McpTool<typeof CreateVersionToolSchema.shape> = {
  name: "versions_create",
  config: {
    description:
      "Creates a new version for project milestone tracking. Requires project admin permissions. Can configure sharing scope and due dates. (Ref: https://www.redmine.org/projects/redmine/wiki/Rest_Versions)",
    inputSchema: CreateVersionToolSchema.shape,
  },
  execute: async ({ project_id, ...versionData }) => {
    const payload = { version: versionData };
    try {
      const result = await createVersion(project_id, payload);
      return {
        content: [{ type: "text", text: JSON.stringify(result.version) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to create version: ${errorMessage}`);
    }
  },
};

export const updateVersionTool: McpTool<typeof UpdateVersionToolSchema.shape> = {
  name: "versions_update",
  config: {
    description:
      "Updates an existing version's status, dates, or sharing settings. Requires project admin permissions. Version name changes must remain unique. (Ref: https://www.redmine.org/projects/redmine/wiki/Rest_Versions)",
    inputSchema: UpdateVersionToolSchema.shape,
  },
  execute: async ({ id, ...updateData }) => {
    const payload = { version: updateData };
    try {
      await updateVersion(id, payload);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              message: `Version ${id} updated successfully.`,
            }),
          },
        ],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to update version ${id}: ${errorMessage}`);
    }
  },
};

export const deleteVersionTool: McpTool<typeof DeleteVersionToolSchema.shape> = {
  name: "versions_delete",
  config: {
    description:
      "Deletes a version and unassigns it from all related issues. Requires project admin permissions. Warning: Affects all issues assigned to this version. (Ref: https://www.redmine.org/projects/redmine/wiki/Rest_Versions)",
    inputSchema: DeleteVersionToolSchema.shape,
  },
  execute: async ({ id }) => {
    try {
      await deleteVersion(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              message: `Version ${id} deleted successfully.`,
            }),
          },
        ],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to delete version ${id}: ${errorMessage}`);
    }
  },
};

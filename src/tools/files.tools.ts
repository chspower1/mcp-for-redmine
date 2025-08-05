import { listFiles } from "../api/files.api";
import { ListFilesToolSchema } from "../schema/file.schema";
import { McpTool } from "../types/types";

export const listFilesTool: McpTool<typeof ListFilesToolSchema.shape> = {
  name: "files_list",
  config: {
    description: "Retrieves a list of files for a given project from Redmine.",
    inputSchema: ListFilesToolSchema.shape,
  },
  execute: async ({ project_id }) => {
    try {
      const result = await listFiles(project_id);
      return {
        content: [{ type: "text", text: JSON.stringify(result.files) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list files for project ${project_id}: ${errorMessage}`);
    }
  },
};

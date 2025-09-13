import { listFiles } from "@/api/files.api";
import { ListFilesToolSchema } from "@/schema/file.schema";
import { McpTool } from "@/types/types";

export const listFilesTool: McpTool<typeof ListFilesToolSchema.shape> = {
  name: "files_list",
  config: {
    description:
      "Retrieves all files uploaded to a project's Files section. Includes id, filename, filesize, content_type, description, content_url, author, created_on, version, digest, downloads. Docs: https://www.redmine.org/projects/redmine/wiki/Rest_Files#GET. Pagination meta (total_count/offset/limit) is not documented for this endpoint. API Status: Alpha (v3.4).",
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

import { search } from "@/api/search.api";
import { SearchToolSchema } from "@/schema/search.schema";
import { McpTool } from "@/types/types";

export const searchTool: McpTool<typeof SearchToolSchema.shape> = {
  name: "search",
  config: {
    description:
      "Performs a global search across Redmine resources including issues, projects, wiki pages, documents, and forum messages. Supports project-scoped search and various filtering options.",
    inputSchema: SearchToolSchema.shape,
  },
  execute: async (params) => {
    try {
      const result = await search(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to perform search: ${errorMessage}`);
    }
  },
};

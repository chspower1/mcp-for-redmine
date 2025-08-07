import { search } from "@/api/search.api";
import { SearchToolSchema } from "@/schema/search.schema";
import { McpTool } from "@/types/types";

export const searchTool: McpTool<typeof SearchToolSchema.shape> = {
  name: "search",
  config: {
    description: "Performs a search across Redmine.",
    inputSchema: SearchToolSchema.shape,
  },
  execute: async (params) => {
    try {
      const result = await search(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result.results) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to perform search: ${errorMessage}`);
    }
  },
};

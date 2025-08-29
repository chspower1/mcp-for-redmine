import { listQueries } from "@/api/queries.api";
import { ListQueriesToolSchema } from "@/schema/query.schema";
import { McpTool } from "@/types/types";

export const listQueriesTool: McpTool<typeof ListQueriesToolSchema.shape> = {
  name: "queries_list",
  config: {
    description: "Retrieves all custom queries visible to the user including public and private queries. Use query IDs with Issues API for filtered results. API Status: Alpha (v1.3).",
    inputSchema: ListQueriesToolSchema.shape,
  },
  execute: async () => {
    try {
      const result = await listQueries();
      return {
        content: [{ type: "text", text: JSON.stringify(result.queries) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list queries: ${errorMessage}`);
    }
  },
};

import { listQueries } from "@/api/queries.api";
import { ListQueriesToolSchema } from "@/schema/query.schema";
import { McpTool } from "@/types/types";

export const listQueriesTool: McpTool<typeof ListQueriesToolSchema.shape> = {
  name: "queries_list",
  config: {
    description:
      "Retrieves custom queries visible to current user (public and private). Supports project_id, limit, offset. Ref: https://www.redmine.org/projects/redmine/wiki/Rest_Queries",
    inputSchema: ListQueriesToolSchema.shape,
  },
  execute: async (params) => {
    try {
      const result = await listQueries(params);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              queries: result.queries,
              total_count: result.total_count,
              limit: result.limit,
              offset: result.offset,
            }),
          },
        ],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list queries: ${errorMessage}`);
    }
  },
};

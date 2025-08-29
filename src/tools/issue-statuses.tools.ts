import { listIssueStatuses } from "@/api/issue-statuses.api";
import { ListIssueStatusesToolSchema } from "@/schema/issue-status.schema";
import { McpTool } from "@/types/types";

export const listIssueStatusesTool: McpTool<typeof ListIssueStatusesToolSchema.shape> = {
  name: "issue_statuses_list",
  config: {
    description: "Retrieves a list of all system issue statuses with workflow properties. Shows status names, closed state indicators, and transition rules. API Status: Alpha (v1.3).",
    inputSchema: ListIssueStatusesToolSchema.shape,
  },
  execute: async () => {
    try {
      const result = await listIssueStatuses();
      return {
        content: [{ type: "text", text: JSON.stringify(result.issue_statuses) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list issue statuses: ${errorMessage}`);
    }
  },
};

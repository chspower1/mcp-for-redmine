import { z } from "zod";
import { listIssueStatuses } from "../api/issue-statuses.api";
import { Tool } from "../types/types";

export const listIssueStatusesTool: Tool = {
  name: "redmine_list-issue-statuses",
  description: "Retrieves the list of all available issue statuses.",
  parameters: z.object({}),
  execute: async () => {
    try {
      const result = await listIssueStatuses();
      return result.issue_statuses;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list issue statuses: ${errorMessage}`);
    }
  },
};

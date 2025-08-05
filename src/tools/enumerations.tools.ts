import { listIssuePriorities, listTimeEntryActivities } from "../api/enumerations.api";
import {
  ListIssuePrioritiesToolSchema,
  ListTimeEntryActivitiesToolSchema,
} from "../schema/enumerations.schema";
import { McpTool } from "../types/types";

export const listIssuePrioritiesTool: McpTool<typeof ListIssuePrioritiesToolSchema.shape> = {
  name: "enumerations_issue_priorities_list",
  config: {
    description: "Retrieves a list of all issue priorities.",
    inputSchema: ListIssuePrioritiesToolSchema.shape,
  },
  execute: async () => {
    try {
      const result = await listIssuePriorities();
      return {
        content: [{ type: "text", text: JSON.stringify(result.issue_priorities) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list issue priorities: ${errorMessage}`);
    }
  },
};

export const listTimeEntryActivitiesTool: McpTool<typeof ListTimeEntryActivitiesToolSchema.shape> =
  {
    name: "enumerations_time_entry_activities_list",
    config: {
      description: "Retrieves a list of all time entry activities.",
      inputSchema: ListTimeEntryActivitiesToolSchema.shape,
    },
    execute: async () => {
      try {
        const result = await listTimeEntryActivities();
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result.time_entry_activities),
            },
          ],
        };
      } catch (error: any) {
        const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
        throw new Error(`Failed to list time entry activities: ${errorMessage}`);
      }
    },
  };

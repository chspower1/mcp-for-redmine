import {
  listIssuePriorities,
  listTimeEntryActivities,
  listDocumentCategories,
} from "@/api/enumerations.api";
import {
  ListIssuePrioritiesToolSchema,
  ListTimeEntryActivitiesToolSchema,
  ListDocumentCategoriesToolSchema,
} from "@/schema/enumerations.schema";
import { McpTool } from "@/types/types";

/**
 * MCP Tools exposing Redmine enumerations per official REST API.
 *
 * References (REST):
 * - GET /enumerations/issue_priorities.json         -> Issue priorities list
 * - GET /enumerations/time_entry_activities.json    -> Time entry activities list
 * - GET /enumerations/document_categories.json      -> Document categories list
 *
 * Each tool returns the array value inside the top-level envelope
 * (issue_priorities, time_entry_activities, document_categories) to
 * make it convenient for clients to consume.
 */

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

export const listDocumentCategoriesTool: McpTool<typeof ListDocumentCategoriesToolSchema.shape> = {
  name: "enumerations_document_categories_list",
  config: {
    description: "Retrieves a list of all document categories.",
    inputSchema: ListDocumentCategoriesToolSchema.shape,
  },
  execute: async () => {
    try {
      const result = await listDocumentCategories();
      return {
        content: [{ type: "text", text: JSON.stringify(result.document_categories) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list document categories: ${errorMessage}`);
    }
  },
};

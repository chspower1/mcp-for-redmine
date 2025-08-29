import {
  createTimeEntry,
  deleteTimeEntry,
  getTimeEntry,
  listTimeEntries,
  updateTimeEntry,
} from "@/api/time-entries.api";
import {
  CreateTimeEntryToolSchema,
  DeleteTimeEntryToolSchema,
  GetTimeEntryToolSchema,
  ListTimeEntriesToolSchema,
  UpdateTimeEntryToolSchema,
} from "@/schema/time-entry.schema";
import { McpTool } from "@/types/types";

export const listTimeEntriesTool: McpTool<typeof ListTimeEntriesToolSchema.shape> = {
  name: "time_entries_list",
  config: {
    description: "Retrieves a list of time entries with optional filtering by project, user, issue, date ranges, and activity. Supports pagination.",
    inputSchema: ListTimeEntriesToolSchema.shape,
  },
  execute: async (params) => {
    try {
      const result = await listTimeEntries(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result.time_entries) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list time entries: ${errorMessage}`);
    }
  },
};

export const getTimeEntryTool: McpTool<typeof GetTimeEntryToolSchema.shape> = {
  name: "time_entries_get",
  config: {
    description: "Retrieves a single time entry by its ID. Returns detailed information about time spent, activity, and comments.",
    inputSchema: GetTimeEntryToolSchema.shape,
  },
  execute: async ({ id }) => {
    try {
      const result = await getTimeEntry(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result.time_entry) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to retrieve time entry ${id}: ${errorMessage}`);
    }
  },
};

export const createTimeEntryTool: McpTool<typeof CreateTimeEntryToolSchema.shape> = {
  name: "time_entries_create",
  config: {
    description: "Creates a new time entry in Redmine. Requires either project_id or issue_id, plus hours spent. Can include activity, comments (max 255 chars), and specific date.",
    inputSchema: CreateTimeEntryToolSchema.shape,
  },
  execute: async (args) => {
    const payload = { time_entry: args };
    try {
      const result = await createTimeEntry(payload);
      return {
        content: [{ type: "text", text: JSON.stringify(result.time_entry) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to create time entry: ${errorMessage}`);
    }
  },
};

export const updateTimeEntryTool: McpTool<typeof UpdateTimeEntryToolSchema.shape> = {
  name: "time_entries_update",
  config: {
    description: "Updates an existing time entry. All fields are optional. Can modify hours, activity, comments, or date. Comments are limited to 255 characters.",
    inputSchema: UpdateTimeEntryToolSchema.shape,
  },
  execute: async ({ id, ...updateData }) => {
    const payload = {
      time_entry: updateData,
    };
    try {
      await updateTimeEntry(id, payload);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              message: `Time entry ${id} updated successfully.`,
            }),
          },
        ],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to update time entry ${id}: ${errorMessage}`);
    }
  },
};

export const deleteTimeEntryTool: McpTool<typeof DeleteTimeEntryToolSchema.shape> = {
  name: "time_entries_delete",
  config: {
    description: "Deletes a time entry from Redmine. Users can typically only delete their own entries. Warning: This action is permanent.",
    inputSchema: DeleteTimeEntryToolSchema.shape,
  },
  execute: async ({ id }) => {
    try {
      await deleteTimeEntry(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              message: `Time entry ${id} deleted successfully.`,
            }),
          },
        ],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to delete time entry ${id}: ${errorMessage}`);
    }
  },
};

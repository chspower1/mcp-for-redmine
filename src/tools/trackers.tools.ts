import { listTrackers } from "../api/trackers.api";
import { ListTrackersToolSchema } from "../schema/tracker.schema";
import { McpTool } from "../types/types";

export const listTrackersTool: McpTool<typeof ListTrackersToolSchema.shape> = {
  name: "trackers_list",
  config: {
    description: "Retrieves a list of all trackers.",
    inputSchema: ListTrackersToolSchema.shape,
  },
  execute: async () => {
    try {
      const result = await listTrackers();
      return {
        content: [{ type: "text", text: JSON.stringify(result.trackers) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list trackers: ${errorMessage}`);
    }
  },
};

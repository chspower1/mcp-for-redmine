import { z } from "zod";
import { listTrackers } from "../api/trackers.api";
import { Tool } from "../types/types";

export const listTrackersTool: Tool = {
  name: "redmine_list-trackers",
  description: "Retrieves the list of all available trackers (issue types).",
  parameters: z.object({}),
  execute: async () => {
    try {
      const result = await listTrackers();
      return result.trackers;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list trackers: ${errorMessage}`);
    }
  },
};

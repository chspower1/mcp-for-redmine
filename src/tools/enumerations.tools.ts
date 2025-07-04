import { z } from "zod";
import { listIssuePriorities, listTimeEntryActivities } from "../api/enumerations.api";
import { Tool } from "../types/types";

export const listIssuePrioritiesTool: Tool = {
  name: "redmine_list-issue-priorities",
  description: "Retrieves the list of all available issue priorities.",
  parameters: z.object({}),
  execute: async () => {
    try {
      const result = await listIssuePriorities();
      return result.issue_priorities;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list issue priorities: ${errorMessage}`);
    }
  },
};

export const listTimeEntryActivitiesTool: Tool = {
  name: "redmine_list-time-entry-activities",
  description: "Retrieves the list of all available time entry activities.",
  parameters: z.object({}),
  execute: async () => {
    try {
      const result = await listTimeEntryActivities();
      return result.time_entry_activities;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list time entry activities: ${errorMessage}`);
    }
  },
};

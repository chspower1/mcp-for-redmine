import { axiosInstance } from "../utils/axios.util";
import { RedminePriority, RedmineActivity } from "../types/types";

// Responses
interface PriorityListResponse {
  issue_priorities: RedminePriority[];
}

interface ActivityListResponse {
  time_entry_activities: RedmineActivity[];
}

/**
 * Retrieves the list of all issue priorities.
 */
export const listIssuePriorities = async (): Promise<PriorityListResponse> => {
  const response = await axiosInstance.get("/enumerations/issue_priorities.json");
  return response.data;
};

/**
 * Retrieves the list of all time entry activities.
 */
export const listTimeEntryActivities = async (): Promise<ActivityListResponse> => {
  const response = await axiosInstance.get("/enumerations/time_entry_activities.json");
  return response.data;
};

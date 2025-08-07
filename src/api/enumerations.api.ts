import { axiosInstance } from "@/utils/axios.util";
import { RedmineEnumeration } from "@/schema/enumerations.schema";

interface IssuePrioritiesResponse {
  issue_priorities: RedmineEnumeration[];
}

interface TimeEntryActivitiesResponse {
  time_entry_activities: RedmineEnumeration[];
}

/**
 * Retrieves a list of issue priorities.
 */
export const listIssuePriorities = async (): Promise<IssuePrioritiesResponse> => {
  const response = await axiosInstance.get("/enumerations/issue_priorities.json");
  return response.data;
};

/**
 * Retrieves a list of time entry activities.
 */
export const listTimeEntryActivities = async (): Promise<TimeEntryActivitiesResponse> => {
  const response = await axiosInstance.get("/enumerations/time_entry_activities.json");
  return response.data;
};

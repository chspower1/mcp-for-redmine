import { axiosInstance } from "@/utils/axios.util";
import { RedmineEnumeration } from "@/schema/enumerations.schema";

/**
 * Response envelope for GET /enumerations/issue_priorities.json
 * Official Redmine REST:
 * - Endpoint: /enumerations/issue_priorities.json
 * - Body: { "issue_priorities": Array<{ id, name, is_default, ... }> }
 */
interface IssuePrioritiesResponse {
  issue_priorities: RedmineEnumeration[];
}

/**
 * Response envelope for GET /enumerations/time_entry_activities.json
 * Official Redmine REST:
 * - Endpoint: /enumerations/time_entry_activities.json
 * - Body: { "time_entry_activities": Array<{ id, name, active, ... }> }
 */
interface TimeEntryActivitiesResponse {
  time_entry_activities: RedmineEnumeration[];
}

/**
 * Response envelope for GET /enumerations/document_categories.json
 * Official Redmine REST:
 * - Endpoint: /enumerations/document_categories.json
 * - Body: { "document_categories": Array<{ id, name, ... }> }
 */
interface DocumentCategoriesResponse {
  document_categories: RedmineEnumeration[];
}

/** Retrieves a list of issue priorities. */
export const listIssuePriorities = async (): Promise<IssuePrioritiesResponse> => {
  const response = await axiosInstance.get("/enumerations/issue_priorities.json");
  return response.data;
};

/** Retrieves a list of time entry activities. */
export const listTimeEntryActivities = async (): Promise<TimeEntryActivitiesResponse> => {
  const response = await axiosInstance.get("/enumerations/time_entry_activities.json");
  return response.data;
};

/** Retrieves a list of document categories. */
export const listDocumentCategories = async (): Promise<DocumentCategoriesResponse> => {
  const response = await axiosInstance.get("/enumerations/document_categories.json");
  return response.data;
};

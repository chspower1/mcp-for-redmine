import { axiosInstance } from "@/utils/axios.util";
import {
  CreateTimeEntryPayload,
  RedmineTimeEntry,
  UpdateTimeEntryPayload,
} from "@/schema/time-entry.schema";

interface TimeEntryResponse {
  time_entry: RedmineTimeEntry;
}

interface TimeEntryListResponse {
  time_entries: RedmineTimeEntry[];
  total_count: number;
  offset: number;
  limit: number;
}

/**
 * Retrieves a list of time entries with optional filtering.
 * 
 * @param params - Optional query parameters for filtering and pagination
 * @param params.project_id - Filter by project (ID or identifier)
 * @param params.user_id - Filter by user ('me' for current user, or user ID)
 * @param params.issue_id - Filter by issue ID
 * @param params.spent_on - Filter by specific date (YYYY-MM-DD format)
 * @param params.from - Filter entries from this date onwards (YYYY-MM-DD)
 * @param params.to - Filter entries up to this date (YYYY-MM-DD)
 * @param params.activity_id - Filter by time tracking activity ID
 * @param params.limit - Maximum number of entries to return (default: 25, max: 100)
 * @param params.offset - Number of entries to skip (for pagination)
 * @returns Promise containing the list of time entries with pagination metadata
 */
export const listTimeEntries = async (params?: {
  project_id?: string | number;
  user_id?: string | number;
  issue_id?: string;
  spent_on?: string;
  from?: string;
  to?: string;
  activity_id?: number;
  limit?: number;
  offset?: number;
}): Promise<TimeEntryListResponse> => {
  const response = await axiosInstance.get("/time_entries.json", { params });
  return response.data;
};

/**
 * Retrieves a single time entry by its ID.
 * 
 * @param id - The numeric ID of the time entry
 * @returns Promise containing the time entry information
 */
export const getTimeEntry = async (id: string): Promise<TimeEntryResponse> => {
  const response = await axiosInstance.get(`/time_entries/${id}.json`);
  return response.data;
};

/**
 * Creates a new time entry in Redmine.
 * 
 * Required fields:
 * - Either issue_id OR project_id must be provided
 * - hours: The time spent (decimal format, e.g., 1.5 for 1 hour 30 minutes)
 * 
 * @param entryData - The time entry data payload
 * @param entryData.time_entry.spent_on - Date when time was spent (defaults to current date)
 * @param entryData.time_entry.hours - Time spent in hours (required)
 * @param entryData.time_entry.activity_id - Time tracking activity ID
 * @param entryData.time_entry.comments - Description of work done (max 255 characters)
 * @param entryData.time_entry.user_id - User ID (for logging time on behalf of another user)
 * @returns Promise containing the created time entry's information
 * @throws 422 Unprocessable Entity if validation fails
 */
export const createTimeEntry = async (
  entryData: CreateTimeEntryPayload
): Promise<TimeEntryResponse> => {
  const response = await axiosInstance.post("/time_entries.json", entryData);
  return response.data;
};

/**
 * Updates an existing time entry.
 * 
 * All fields are optional - only provide fields that need to be updated.
 * 
 * @param id - The numeric ID of the time entry to update
 * @param entryData - The time entry data payload containing fields to update
 * @param entryData.time_entry.comments - Updated description (max 255 characters)
 * @returns Promise that resolves when the update is successful
 * @throws 422 Unprocessable Entity if validation fails
 */
export const updateTimeEntry = async (
  id: string,
  entryData: UpdateTimeEntryPayload
): Promise<void> => {
  await axiosInstance.put(`/time_entries/${id}.json`, entryData);
};

/**
 * Deletes a time entry from Redmine.
 * 
 * **Note**: Users can only delete their own time entries unless they have
 * appropriate permissions.
 * 
 * **Warning**: This action is permanent and cannot be undone.
 * 
 * @param id - The numeric ID of the time entry to delete
 * @returns Promise that resolves when the deletion is successful
 */
export const deleteTimeEntry = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/time_entries/${id}.json`);
};

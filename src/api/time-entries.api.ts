import { axiosInstance } from "../utils/axios.util";
import { RedmineTimeEntry } from "../types/types";

// Payloads
interface TimeEntryCreatePayload {
  time_entry: {
    issue_id?: number;
    project_id?: number;
    spent_on?: string; // Date in YYYY-MM-DD format
    hours: number;
    activity_id?: number;
    comments?: string;
  };
}

interface TimeEntryUpdatePayload {
  time_entry: Partial<TimeEntryCreatePayload["time_entry"]>;
}

// Responses
interface TimeEntryListResponse {
  time_entries: RedmineTimeEntry[];
  total_count: number;
  offset: number;
  limit: number;
}

interface TimeEntryResponse {
  time_entry: RedmineTimeEntry;
}

/**
 * Retrieves a list of time entries.
 * Can be filtered by user_id, project_id, issue_id.
 * @param params Query parameters for filtering.
 */
export const listTimeEntries = async (
  params?: Record<string, string | number>
): Promise<TimeEntryListResponse> => {
  const response = await axiosInstance.get("/time_entries.json", { params });
  return response.data;
};

/**
 * Retrieves a single time entry by its ID.
 * @param id The ID of the time entry.
 */
export const getTimeEntry = async (id: number): Promise<TimeEntryResponse> => {
  const response = await axiosInstance.get(`/time_entries/${id}.json`);
  return response.data;
};

/**
 * Creates a new time entry.
 * @param timeEntryData The data for the new time entry.
 */
export const createTimeEntry = async (
  timeEntryData: TimeEntryCreatePayload
): Promise<TimeEntryResponse> => {
  const response = await axiosInstance.post("/time_entries.json", timeEntryData);
  return response.data;
};

/**
 * Updates a time entry.
 * @param id The ID of the time entry to update.
 * @param timeEntryData The data to update.
 */
export const updateTimeEntry = async (
  id: number,
  timeEntryData: TimeEntryUpdatePayload
): Promise<void> => {
  await axiosInstance.put(`/time_entries/${id}.json`, timeEntryData);
};

/**
 * Deletes a time entry.
 * @param id The ID of the time entry to delete.
 */
export const deleteTimeEntry = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/time_entries/${id}.json`);
};

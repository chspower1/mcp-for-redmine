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

export const listTimeEntries = async (params?: {
  project_id?: string | number;
  user_id?: string | number;
  issue_id?: string;
  limit?: number;
  offset?: number;
}): Promise<TimeEntryListResponse> => {
  const response = await axiosInstance.get("/time_entries.json", { params });
  return response.data;
};

export const getTimeEntry = async (id: string): Promise<TimeEntryResponse> => {
  const response = await axiosInstance.get(`/time_entries/${id}.json`);
  return response.data;
};

export const createTimeEntry = async (
  entryData: CreateTimeEntryPayload
): Promise<TimeEntryResponse> => {
  const response = await axiosInstance.post("/time_entries.json", entryData);
  return response.data;
};

export const updateTimeEntry = async (
  id: string,
  entryData: UpdateTimeEntryPayload
): Promise<void> => {
  await axiosInstance.put(`/time_entries/${id}.json`, entryData);
};

export const deleteTimeEntry = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/time_entries/${id}.json`);
};

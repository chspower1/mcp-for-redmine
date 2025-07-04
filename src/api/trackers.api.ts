import { axiosInstance } from "../utils/axios.util";
import { RedmineTracker } from "../types/types";

// Response
interface TrackerListResponse {
  trackers: RedmineTracker[];
}

/**
 * Retrieves the list of all trackers.
 */
export const listTrackers = async (): Promise<TrackerListResponse> => {
  const response = await axiosInstance.get("/trackers.json");
  return response.data;
};

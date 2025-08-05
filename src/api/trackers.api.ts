import { axiosInstance } from "../utils/axios.util";
import { RedmineTracker } from "../schema/tracker.schema";

interface TrackerListResponse {
  trackers: RedmineTracker[];
}

/**
 * Retrieves a list of all trackers.
 */
export const listTrackers = async (): Promise<TrackerListResponse> => {
  const response = await axiosInstance.get("/trackers.json");
  return response.data;
};

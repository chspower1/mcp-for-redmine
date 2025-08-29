import { axiosInstance } from "@/utils/axios.util";
import { RedmineTracker } from "@/schema/tracker.schema";

interface TrackerListResponse {
  trackers: RedmineTracker[];
}

/**
 * Retrieves a list of all available trackers in Redmine.
 * 
 * **Note**: 
 * - API Status: Alpha (v1.3) - Major functionality in place, may change
 * - Returns basic tracker information including ID, name, and default status
 * - Includes description field (available since Redmine v4.2.0)
 * - Includes enabled standard fields (available since Redmine v5.0.0)
 * 
 * Response includes:
 * - Tracker ID and name (e.g., "Defect", "Feature")
 * - Default status assigned to new issues for this tracker
 * - Description text (if configured)
 * - List of enabled standard fields (assigned_to, category, fixed_version, etc.)
 * 
 * @returns Promise containing the complete list of system trackers
 */
export const listTrackers = async (): Promise<TrackerListResponse> => {
  const response = await axiosInstance.get("/trackers.json");
  return response.data;
};

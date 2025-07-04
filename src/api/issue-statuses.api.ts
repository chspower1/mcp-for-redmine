import { axiosInstance } from "../utils/axios.util";
import { RedmineStatus } from "../types/types";

// Response
interface StatusListResponse {
  issue_statuses: RedmineStatus[];
}

/**
 * Retrieves the list of all issue statuses.
 */
export const listIssueStatuses = async (): Promise<StatusListResponse> => {
  const response = await axiosInstance.get("/issue_statuses.json");
  return response.data;
};

import { axiosInstance } from "@/utils/axios.util";
import { RedmineIssueStatus } from "@/schema/issue-status.schema";

interface IssueStatusListResponse {
  issue_statuses: RedmineIssueStatus[];
}

/**
 * Retrieves a list of all issue statuses available in Redmine.
 * 
 * **Note**: 
 * - API Status: Alpha (v1.3) - Major functionality in place, may change
 * - Returns all system-defined issue statuses
 * - Status configuration affects workflow and issue lifecycle
 * 
 * Response includes:
 * - Status ID and name (e.g., "New", "In Progress", "Resolved", "Closed")
 * - is_closed flag indicating whether status represents a closed state
 * - Workflow transition rules (may vary by tracker and role)
 * 
 * @returns Promise containing the complete list of system issue statuses
 */
export const listIssueStatuses = async (): Promise<IssueStatusListResponse> => {
  const response = await axiosInstance.get("/issue_statuses.json");
  return response.data;
};

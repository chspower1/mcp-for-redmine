import { axiosInstance } from "@/utils/axios.util";
import { RedmineIssueStatus } from "@/schema/issue-status.schema";

interface IssueStatusListResponse {
  issue_statuses: RedmineIssueStatus[];
}

/**
 * Retrieves a list of all issue statuses.
 */
export const listIssueStatuses = async (): Promise<IssueStatusListResponse> => {
  const response = await axiosInstance.get("/issue_statuses.json");
  return response.data;
};

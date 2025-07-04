import { axiosInstance } from "../utils/axios.util";
import { RedmineIssue } from "../types/types";

// Payloads
interface IssueCreatePayload {
  issue: {
    project_id: number;
    subject: string;
    tracker_id?: number;
    status_id?: number;
    priority_id?: number;
    description?: string;
    category_id?: number;
    fixed_version_id?: number;
    assigned_to_id?: number;
    parent_issue_id?: number;
    custom_fields?: Array<{ id: number; value: any }>;
    watcher_user_ids?: number[];
    is_private?: boolean;
    estimated_hours?: number;
  };
}

interface IssueUpdatePayload {
  issue: Partial<IssueCreatePayload["issue"]> & { notes?: string };
}

// Responses
interface IssueListResponse {
  issues: RedmineIssue[];
  total_count: number;
  offset: number;
  limit: number;
}

interface IssueResponse {
  issue: RedmineIssue;
}

/**
 * Retrieves a paginated list of issues.
 * @param params Query parameters for filtering and pagination (e.g., project_id, status_id).
 */
export const listIssues = async (
  params?: Record<string, string | number>
): Promise<IssueListResponse> => {
  const response = await axiosInstance.get("/issues.json", { params });
  return response.data;
};

/**
 * Retrieves a single issue by its ID.
 * @param id The ID of the issue.
 * @param params Optional parameters like 'include' to fetch related data.
 */
export const getIssue = async (
  id: number,
  params?: { include?: string }
): Promise<IssueResponse> => {
  const response = await axiosInstance.get(`/issues/${id}.json`, { params });
  return response.data;
};

/**
 * Creates a new issue.
 * @param issueData The data for the new issue.
 */
export const createIssue = async (issueData: IssueCreatePayload): Promise<IssueResponse> => {
  const response = await axiosInstance.post("/issues.json", issueData);
  return response.data;
};

/**
 * Updates an existing issue.
 * @param id The ID of the issue to update.
 * @param issueData The data to update.
 */
export const updateIssue = async (id: number, issueData: IssueUpdatePayload): Promise<void> => {
  await axiosInstance.put(`/issues/${id}.json`, issueData);
};

/**
 * Deletes an issue.
 * @param id The ID of the issue to delete.
 */
export const deleteIssue = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/issues/${id}.json`);
};

/**
 * Adds a watcher to an issue.
 * @param issueId The ID of the issue.
 * @param userId The ID of the user to add as a watcher.
 */
export const addWatcher = async (issueId: number, userId: number): Promise<void> => {
  await axiosInstance.post(`/issues/${issueId}/watchers.json`, { user_id: userId });
};

/**
 * Removes a watcher from an issue.
 * @param issueId The ID of the issue.
 * @param userId The ID of the user to remove.
 */
export const removeWatcher = async (issueId: number, userId: number): Promise<void> => {
  await axiosInstance.delete(`/issues/${issueId}/watchers/${userId}.json`);
};

import { axiosInstance } from "@/utils/axios.util";
import { CreateIssuePayload, RedmineIssue, UpdateIssuePayload } from "@/schema/issue.schema";

interface IssueResponse {
  issue: RedmineIssue;
}

interface IssueListResponse {
  issues: RedmineIssue[];
  total_count: number;
  offset: number;
  limit: number;
}

/**
 * Retrieves a list of issues with optional filtering.
 * 
 * @param params - Optional query parameters for filtering and pagination
 * @param params.project_id - Filter by project (ID or identifier)
 * @param params.tracker_id - Filter by tracker ID
 * @param params.status_id - Filter by status ('open', 'closed', '*' for all, or specific ID)
 * @param params.assigned_to_id - Filter by assignee ('me' for current user, or user ID)
 * @param params.priority_id - Filter by priority ID
 * @param params.category_id - Filter by category ID
 * @param params.fixed_version_id - Filter by target version ID
 * @param params.parent_id - Filter by parent issue ID (for subtasks)
 * @param params.created_on - Filter by creation date ('>=' or '<=' followed by date)
 * @param params.updated_on - Filter by update date ('>=' or '<=' followed by date)
 * @param params.closed_on - Filter by closed date ('>=' or '<=' followed by date)
 * @param params.limit - Maximum number of issues to return (default: 25, max: 100)
 * @param params.offset - Number of issues to skip (for pagination)
 * @param params.sort - Column to sort by, optionally followed by :desc (e.g., 'priority:desc,updated_on')
 * @param params.include - Comma-separated list of associations to include
 * @returns Promise containing the list of issues with pagination metadata
 */
export const listIssues = async (params?: {
  project_id?: string | number;
  tracker_id?: number;
  status_id?: string | number;
  assigned_to_id?: string | number;
  priority_id?: number;
  category_id?: number;
  fixed_version_id?: number;
  parent_id?: number;
  created_on?: string;
  updated_on?: string;
  closed_on?: string;
  limit?: number;
  offset?: number;
  sort?: string;
  include?: string;
}): Promise<IssueListResponse> => {
  const response = await axiosInstance.get("/issues.json", { params });
  return response.data;
};

/**
 * Retrieves a single issue by its ID.
 * 
 * @param id - The numeric ID of the issue
 * @param params - Optional parameters
 * @param params.include - Comma-separated list of associations to include:
 *   - 'children': Child issues (subtasks)
 *   - 'attachments': File attachments
 *   - 'relations': Related issues
 *   - 'changesets': Associated repository changesets
 *   - 'journals': Issue history/comments
 *   - 'watchers': Users watching this issue
 *   - 'allowed_statuses': Statuses the issue can be changed to
 * @returns Promise containing the issue information
 */
export const getIssue = async (
  id: string,
  params?: { include?: string }
): Promise<IssueResponse> => {
  const response = await axiosInstance.get(`/issues/${id}.json`, { params });
  return response.data;
};

/**
 * Creates a new issue in Redmine.
 * 
 * Required fields:
 * - project_id: The project where the issue will be created
 * - subject: The issue title/summary
 * 
 * @param issueData - The issue data payload containing required and optional fields
 * @returns Promise containing the created issue's information
 * @throws 422 Unprocessable Entity if validation fails
 */
export const createIssue = async (issueData: CreateIssuePayload): Promise<IssueResponse> => {
  const response = await axiosInstance.post("/issues.json", issueData);
  return response.data;
};

/**
 * Updates an existing issue.
 * 
 * All fields are optional - only provide fields that need to be updated.
 * Use the 'notes' field to add a comment with the update.
 * 
 * @param id - The numeric ID of the issue to update
 * @param issueData - The issue data payload containing fields to update
 * @returns Promise that resolves when the update is successful
 * @throws 422 Unprocessable Entity if validation fails
 */
export const updateIssue = async (id: string, issueData: UpdateIssuePayload): Promise<void> => {
  await axiosInstance.put(`/issues/${id}.json`, issueData);
};

/**
 * Deletes an issue from Redmine.
 * 
 * **Note**: Requires issue deletion permissions.
 * 
 * **Warning**: This action is permanent and cannot be undone.
 * All associated data (attachments, comments, time entries) will be affected.
 * 
 * @param id - The numeric ID of the issue to delete
 * @returns Promise that resolves when the deletion is successful
 */
export const deleteIssue = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/issues/${id}.json`);
};

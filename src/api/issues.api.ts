import { axiosInstance } from "../utils/axios.util";
import { CreateIssuePayload, RedmineIssue, UpdateIssuePayload } from "../schema/issue.schema";

interface IssueResponse {
  issue: RedmineIssue;
}

interface IssueListResponse {
  issues: RedmineIssue[];
  total_count: number;
  offset: number;
  limit: number;
}

export const listIssues = async (params?: {
  project_id?: string | number;
  tracker_id?: number;
  status_id?: string | number;
  assigned_to_id?: string | number;
  limit?: number;
  offset?: number;
  sort?: string;
}): Promise<IssueListResponse> => {
  const response = await axiosInstance.get("/issues.json", { params });
  return response.data;
};

export const getIssue = async (
  id: string,
  params?: { include?: string }
): Promise<IssueResponse> => {
  const response = await axiosInstance.get(`/issues/${id}.json`, { params });
  return response.data;
};

export const createIssue = async (issueData: CreateIssuePayload): Promise<IssueResponse> => {
  const response = await axiosInstance.post("/issues.json", issueData);
  return response.data;
};

export const updateIssue = async (id: string, issueData: UpdateIssuePayload): Promise<void> => {
  await axiosInstance.put(`/issues/${id}.json`, issueData);
};

export const deleteIssue = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/issues/${id}.json`);
};

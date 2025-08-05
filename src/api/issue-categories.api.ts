import { axiosInstance } from "../utils/axios.util";
import {
  CreateIssueCategoryPayload,
  RedmineIssueCategory,
  UpdateIssueCategoryPayload,
} from "../schema/issue-category.schema";

interface IssueCategoryListResponse {
  issue_categories: RedmineIssueCategory[];
}

interface IssueCategoryResponse {
  issue_category: RedmineIssueCategory;
}

/**
 * Retrieves a list of all issue categories for a given project.
 * @param projectId The ID or identifier of the project.
 */
export const listIssueCategories = async (
  projectId: string | number
): Promise<IssueCategoryListResponse> => {
  const response = await axiosInstance.get(`/projects/${projectId}/issue_categories.json`);
  return response.data;
};

/**
 * Creates a new issue category for a project.
 * @param projectId The ID or identifier of the project.
 * @param categoryData The data for the new category.
 */
export const createIssueCategory = async (
  projectId: string | number,
  categoryData: CreateIssueCategoryPayload
): Promise<IssueCategoryResponse> => {
  const response = await axiosInstance.post(
    `/projects/${projectId}/issue_categories.json`,
    categoryData
  );
  return response.data;
};

/**
 * Retrieves a single issue category by its ID.
 * @param id The ID of the issue category.
 */
export const getIssueCategory = async (id: string): Promise<IssueCategoryResponse> => {
  const response = await axiosInstance.get(`/issue_categories/${id}.json`);
  return response.data;
};

/**
 * Updates an issue category.
 * @param id The ID of the issue category.
 * @param categoryData The data to update.
 */
export const updateIssueCategory = async (
  id: string,
  categoryData: UpdateIssueCategoryPayload
): Promise<void> => {
  await axiosInstance.put(`/issue_categories/${id}.json`, categoryData);
};

/**
 * Deletes an issue category.
 * @param id The ID of the issue category.
 */
export const deleteIssueCategory = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/issue_categories/${id}.json`);
};

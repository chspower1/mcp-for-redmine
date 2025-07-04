import { axiosInstance } from "../utils/axios.util";
import { RedmineIssueCategory } from "../types/types";

// Payloads
interface CategoryCreatePayload {
  issue_category: {
    name: string;
    assigned_to_id?: number;
  };
}

type CategoryUpdatePayload = Partial<CategoryCreatePayload>;

// Responses
interface CategoryListResponse {
  issue_categories: RedmineIssueCategory[];
  total_count: number;
  offset: number;
  limit: number;
}

interface CategoryResponse {
  issue_category: RedmineIssueCategory;
}

/**
 * Returns the list of issue categories for a given project.
 * @param projectId The ID or identifier of the project.
 */
export const listProjectIssueCategories = async (
  projectId: string | number
): Promise<CategoryListResponse> => {
  const response = await axiosInstance.get(`/projects/${projectId}/issue_categories.json`);
  return response.data;
};

/**
 * Creates an issue category for a project.
 * @param projectId The ID or identifier of the project.
 * @param categoryData The data for the new category.
 */
export const createIssueCategory = async (
  projectId: string | number,
  categoryData: CategoryCreatePayload
): Promise<CategoryResponse> => {
  const response = await axiosInstance.post(
    `/projects/${projectId}/issue_categories.json`,
    categoryData
  );
  return response.data;
};

/**
 * Returns a single issue category.
 * @param id The ID of the issue category.
 */
export const getIssueCategory = async (id: number): Promise<CategoryResponse> => {
  const response = await axiosInstance.get(`/issue_categories/${id}.json`);
  return response.data;
};

/**
 * Updates an issue category.
 * @param id The ID of the issue category.
 * @param categoryData The data to update.
 */
export const updateIssueCategory = async (
  id: number,
  categoryData: CategoryUpdatePayload
): Promise<void> => {
  await axiosInstance.put(`/issue_categories/${id}.json`, categoryData);
};

/**
 * Deletes an issue category.
 * @param id The ID of the issue category.
 */
export const deleteIssueCategory = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/issue_categories/${id}.json`);
};

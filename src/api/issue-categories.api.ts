import { axiosInstance } from "@/utils/axios.util";
import {
  CreateIssueCategoryPayload,
  RedmineIssueCategory,
  UpdateIssueCategoryPayload,
} from "@/schema/issue-category.schema";

interface IssueCategoryListResponse {
  issue_categories: RedmineIssueCategory[];
  // Redmine returns total_count attribute in XML; JSON may include it as a top-level field
  total_count?: number;
}

interface IssueCategoryResponse {
  issue_category: RedmineIssueCategory;
}

/**
 * Retrieves a list of all issue categories for a given project.
 *
 * **Note**:
 * - API Status: Alpha (v1.3) - Major functionality in place, may change
 * - Categories help organize and classify issues within projects
 * - Categories can have assigned users for automatic issue assignment
 *
 * Response includes:
 * - Category ID and name
 * - Project reference information
 * - Optional assigned user (if configured for automatic assignment)
 *
 * Docs: https://www.redmine.org/projects/redmine/wiki/Rest_IssueCategories
 * Index: https://www.redmine.org/projects/redmine/wiki/Rest_api
 *
 * @param projectId - The numeric ID or string identifier of the project
 * @returns Promise containing the list of project-specific issue categories
 */
export const listIssueCategories = async (
  projectId: string | number
): Promise<IssueCategoryListResponse> => {
  const response = await axiosInstance.get(`/projects/${projectId}/issue_categories.json`);
  return response.data;
};

/**
 * Creates a new issue category for a project.
 *
 * **Note**:
 * - API Status: Alpha (v1.3) - Major functionality in place, may change
 * - Requires project administration permissions
 * - Category names must be unique within the project
 *
 * Required fields:
 * - name: Category name (must be unique within project)
 *
 * Optional fields:
 * - assigned_to_id: User ID for automatic issue assignment
 *
 * Docs: https://www.redmine.org/projects/redmine/wiki/Rest_IssueCategories#POST
 * Index: https://www.redmine.org/projects/redmine/wiki/Rest_api
 *
 * @param projectId - The numeric ID or string identifier of the project
 * @param categoryData - The issue category data containing name and optional assigned user
 * @returns Promise containing the created issue category information
 * @throws 422 Unprocessable Entity if validation fails (e.g., duplicate name)
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
 * Retrieves detailed information about a specific issue category.
 *
 * **Note**:
 * - API Status: Alpha (v1.3) - Major functionality in place, may change
 * - Returns complete category information including project and assigned user
 * - Cross-project category access depending on user permissions
 *
 * Docs: https://www.redmine.org/projects/redmine/wiki/Rest_IssueCategories#GET
 * Index: https://www.redmine.org/projects/redmine/wiki/Rest_api
 *
 * @param id - The numeric ID of the issue category to retrieve
 * @returns Promise containing detailed issue category information
 */
export const getIssueCategory = async (id: string | number): Promise<IssueCategoryResponse> => {
  const response = await axiosInstance.get(`/issue_categories/${id}.json`);
  return response.data;
};

/**
 * Updates an existing issue category's properties.
 *
 * **Note**:
 * - API Status: Alpha (v1.3) - Major functionality in place, may change
 * - Requires project administration permissions
 * - Can update category name and assigned user
 * - Category name must remain unique within project
 *
 * Docs: https://www.redmine.org/projects/redmine/wiki/Rest_IssueCategories#PUT
 * Index: https://www.redmine.org/projects/redmine/wiki/Rest_api
 *
 * @param id - The numeric ID of the issue category to update
 * @param categoryData - The issue category data with fields to update
 * @returns Promise that resolves when the update is successful
 * @throws 422 Unprocessable Entity if validation fails
 */
export const updateIssueCategory = async (
  id: string | number,
  categoryData: UpdateIssueCategoryPayload
): Promise<void> => {
  await axiosInstance.put(`/issue_categories/${id}.json`, categoryData);
};

/**
 * Deletes an issue category from the system.
 *
 * **Note**:
 * - API Status: Alpha (v1.3) - Major functionality in place, may change
 * - Requires project administration permissions
 * - Optional reassign_to_id parameter can redirect existing issues to another category
 * - Without reassignment, issues lose their category assignment
 *
 * **Warning**: This action affects all issues currently assigned to this category.
 *
 * Docs: https://www.redmine.org/projects/redmine/wiki/Rest_IssueCategories#DELETE
 * Index: https://www.redmine.org/projects/redmine/wiki/Rest_api
 *
 * @param id - The numeric ID of the issue category to delete
 * @param reassignToId - Optional category ID to reassign existing issues to
 * @returns Promise that resolves when the deletion is successful
 */
export const deleteIssueCategory = async (
  id: string | number,
  reassignToId?: number
): Promise<void> => {
  const params = reassignToId ? { reassign_to_id: reassignToId } : {};
  await axiosInstance.delete(`/issue_categories/${id}.json`, { params });
};

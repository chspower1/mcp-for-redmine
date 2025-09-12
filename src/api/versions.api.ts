import { axiosInstance } from "@/utils/axios.util";
import {
  CreateVersionPayload,
  RedmineVersion,
  UpdateVersionPayload,
} from "@/schema/version.schema";

interface VersionListResponse {
  versions: RedmineVersion[];
}

interface VersionResponse {
  version: RedmineVersion;
}

/**
 * Retrieves a list of all versions for a given project.
 *
 * Reference: https://www.redmine.org/projects/redmine/wiki/Rest_Versions
 *
 * - Returns both project-specific and shared versions
 * - Versions can be shared across multiple projects based on sharing settings
 *
 * Response includes:
 * - Version ID, name, and description
 * - Status (open, locked, closed) and due date
 * - Sharing scope (none, descendants, hierarchy, tree, system)
 * - Project association and metadata timestamps
 *
 * @param projectId - The numeric ID or string identifier of the project
 * @returns Promise containing the list of project versions
 */
export const listVersions = async (projectId: string | number): Promise<VersionListResponse> => {
  const response = await axiosInstance.get(`/projects/${projectId}/versions.json`);
  return response.data;
};

/**
 * Retrieves detailed information about a specific version.
 *
 * Reference: https://www.redmine.org/projects/redmine/wiki/Rest_Versions
 *
 * - Returns complete version details including project association
 * - Shows sharing settings and access scope
 *
 * @param id - The numeric ID of the version to retrieve
 * @returns Promise containing detailed version information
 */
export const getVersion = async (id: string): Promise<VersionResponse> => {
  const response = await axiosInstance.get(`/versions/${id}.json`);
  return response.data;
};

/**
 * Creates a new version for a project.
 *
 * Reference: https://www.redmine.org/projects/redmine/wiki/Rest_Versions
 *
 * - Requires project administration permissions
 * - Version names must be unique within the project
 *
 * Required fields:
 * - name: Version name (must be unique within project)
 *
 * Optional fields:
 * - status: Version status (open, locked, closed)
 * - sharing: Sharing scope (none, descendants, hierarchy, tree, system)
 * - due_date: Target completion date
 * - description: Version description and notes
 * - wiki_page_title: Associated wiki page
 *
 * @param projectId - The numeric ID or string identifier of the project
 * @param versionData - The version data containing name and optional properties
 * @returns Promise containing the created version information
 * @throws 422 Unprocessable Entity if validation fails
 */
export const createVersion = async (
  projectId: string | number,
  versionData: CreateVersionPayload
): Promise<VersionResponse> => {
  const response = await axiosInstance.post(`/projects/${projectId}/versions.json`, versionData);
  return response.data;
};

/**
 * Updates an existing version's properties.
 *
 * Reference: https://www.redmine.org/projects/redmine/wiki/Rest_Versions
 *
 * - Requires project administration permissions
 * - Can update status, sharing settings, dates, and description
 * - Version name changes must maintain uniqueness within project
 *
 * @param id - The numeric ID of the version to update
 * @param versionData - The version data with fields to update
 * @returns Promise that resolves when the update is successful
 * @throws 422 Unprocessable Entity if validation fails
 */
export const updateVersion = async (
  id: string,
  versionData: UpdateVersionPayload
): Promise<void> => {
  await axiosInstance.put(`/versions/${id}.json`, versionData);
};

/**
 * Deletes a version from the system.
 *
 * Reference: https://www.redmine.org/projects/redmine/wiki/Rest_Versions
 *
 * - Requires project administration permissions
 * - Issues assigned to this version will lose their version assignment
 * - Shared versions affect multiple projects
 *
 * **Warning**: This action affects all issues assigned to this version.
 *
 * @param id - The numeric ID of the version to delete
 * @returns Promise that resolves when the deletion is successful
 */
export const deleteVersion = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/versions/${id}.json`);
};

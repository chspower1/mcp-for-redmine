import { axiosInstance } from "@/utils/axios.util";
import {
  CreateProjectPayload,
  RedmineProject,
  UpdateProjectPayload,
} from "@/schema/project.schema";

interface ProjectListResponse {
  projects: RedmineProject[];
  total_count: number;
  offset: number;
  limit: number;
}

interface ProjectResponse {
  project: RedmineProject;
}

/**
 * Retrieves a list of all projects visible to the user.
 * 
 * Returns public projects and private projects where the user has access.
 * 
 * @param params - Optional query parameters
 * @param params.include - Comma-separated list of associations to include:
 *   - 'trackers': Issue trackers available in the project
 *   - 'issue_categories': Issue categories defined in the project
 *   - 'enabled_modules': Modules enabled for the project
 * @param params.offset - Number of projects to skip (for pagination)
 * @param params.limit - Maximum number of projects to return (default: 25, max: 100)
 * @returns Promise containing the list of projects with pagination metadata
 */
export const listProjects = async (params?: {
  include?: string;
  offset?: number;
  limit?: number;
}): Promise<ProjectListResponse> => {
  const response = await axiosInstance.get("/projects.json", { params });
  return response.data;
};

/**
 * Retrieves a single project by its ID or identifier.
 * 
 * @param id - The numeric ID or string identifier of the project
 * @param params - Optional parameters
 * @param params.include - Comma-separated list of associations to include:
 *   - 'trackers': Issue trackers available in the project
 *   - 'issue_categories': Issue categories defined in the project
 *   - 'enabled_modules': Modules enabled for the project
 *   - 'time_entry_activities': Time tracking activities
 * @returns Promise containing the project information
 */
export const getProject = async (
  id: string | number,
  params?: { include?: string }
): Promise<ProjectResponse> => {
  const response = await axiosInstance.get(`/projects/${id}.json`, { params });
  return response.data;
};

/**
 * Creates a new project in Redmine.
 * 
 * **Note**: Requires project creation permissions.
 * 
 * Required fields:
 * - name: The project name
 * - identifier: Unique identifier used in URLs (lowercase letters, numbers, dashes only)
 * 
 * @param projectData - The project data payload containing required and optional fields
 * @returns Promise containing the created project's information
 * @throws 422 Unprocessable Entity if validation fails
 */
export const createProject = async (
  projectData: CreateProjectPayload
): Promise<ProjectResponse> => {
  const response = await axiosInstance.post("/projects.json", projectData);
  return response.data;
};

/**
 * Updates an existing project's information.
 * 
 * **Note**: Requires project administration permissions.
 * 
 * All fields are optional - only provide fields that need to be updated.
 * 
 * @param id - The numeric ID or string identifier of the project to update
 * @param projectData - The project data payload containing fields to update
 * @returns Promise that resolves when the update is successful
 * @throws 422 Unprocessable Entity if validation fails
 */
export const updateProject = async (
  id: string | number,
  projectData: UpdateProjectPayload
): Promise<void> => {
  await axiosInstance.put(`/projects/${id}.json`, projectData);
};

/**
 * Archives a project, making it read-only.
 * 
 * **Note**: 
 * - Requires project administration permissions
 * - Available since Redmine 5.0
 * - Archived projects and their contents become read-only
 * - Archived projects are hidden from the project list by default
 * 
 * @param id - The numeric ID or string identifier of the project to archive
 * @returns Promise that resolves when the project is archived
 */
export const archiveProject = async (id: string | number): Promise<void> => {
  await axiosInstance.put(`/projects/${id}/archive.json`);
};

/**
 * Unarchives a previously archived project, making it active again.
 * 
 * **Note**: 
 * - Requires project administration permissions
 * - Available since Redmine 5.0
 * - Restores full read/write access to the project
 * 
 * @param id - The numeric ID or string identifier of the project to unarchive
 * @returns Promise that resolves when the project is unarchived
 */
export const unarchiveProject = async (id: string | number): Promise<void> => {
  await axiosInstance.put(`/projects/${id}/unarchive.json`);
};

/**
 * Permanently deletes a project and all its contents.
 * 
 * **Note**: Requires project administration permissions.
 * 
 * **Warning**: This action is permanent and cannot be undone.
 * All project data including issues, wiki pages, files, etc. will be deleted.
 * 
 * @param id - The numeric ID or string identifier of the project to delete
 * @returns Promise that resolves when the deletion is successful
 */
export const deleteProject = async (id: string | number): Promise<void> => {
  await axiosInstance.delete(`/projects/${id}.json`);
};

import { axiosInstance } from "../utils/axios.util";
import { RedmineProject } from "../types/types";

// Payloads
interface ProjectCreatePayload {
  project: {
    name: string;
    identifier: string;
    description?: string;
    is_public?: boolean;
    parent_id?: number;
    inherit_members?: boolean;
    enabled_module_names?: string[];
    tracker_ids?: number[];
  };
}

interface ProjectUpdatePayload {
  project: Partial<ProjectCreatePayload["project"]>;
}

// Responses
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
 * Retrieves a list of all projects.
 */
export const listProjects = async (): Promise<ProjectListResponse> => {
  const response = await axiosInstance.get("/projects.json");
  return response.data;
};

/**
 * Retrieves a single project by its ID or identifier.
 * @param id The numeric ID or string identifier of the project.
 * @param params Optional parameters like 'include' to fetch related data (e.g., 'trackers,issue_categories').
 */
export const getProject = async (
  id: string | number,
  params?: { include?: string }
): Promise<ProjectResponse> => {
  const response = await axiosInstance.get(`/projects/${id}.json`, { params });
  return response.data;
};

/**
 * Creates a new project.
 * @param projectData The data for the new project.
 */
export const createProject = async (
  projectData: ProjectCreatePayload
): Promise<ProjectResponse> => {
  const response = await axiosInstance.post("/projects.json", projectData);
  return response.data;
};

/**
 * Updates an existing project.
 * @param id The numeric ID or string identifier of the project.
 * @param projectData The data to update.
 */
export const updateProject = async (
  id: string | number,
  projectData: ProjectUpdatePayload
): Promise<void> => {
  await axiosInstance.put(`/projects/${id}.json`, projectData);
};

/**
 * Archives a project.
 * @param id The numeric ID or string identifier of the project.
 */
export const archiveProject = async (id: string | number): Promise<void> => {
  await axiosInstance.put(`/projects/${id}/archive.json`, null);
};

/**
 * Unarchives a project.
 * @param id The numeric ID or string identifier of the project.
 */
export const unarchiveProject = async (id: string | number): Promise<void> => {
  await axiosInstance.put(`/projects/${id}/unarchive.json`, null);
};

/**
 * Deletes a project.
 * @param id The numeric ID or string identifier of the project.
 */
export const deleteProject = async (id: string | number): Promise<void> => {
  await axiosInstance.delete(`/projects/${id}.json`);
};

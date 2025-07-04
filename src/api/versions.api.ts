import { axiosInstance } from "../utils/axios.util";
import { RedmineVersion } from "../types/types";

// Payloads
interface VersionCreatePayload {
  version: {
    name: string;
    status?: "open" | "locked" | "closed";
    sharing?: "none" | "descendants" | "hierarchy" | "tree" | "system";
    due_date?: string; // YYYY-MM-DD
    description?: string;
  };
}

interface VersionUpdatePayload {
  version: Partial<VersionCreatePayload["version"]>;
}

// Responses
interface VersionListResponse {
  versions: RedmineVersion[];
}

interface VersionResponse {
  version: RedmineVersion;
}

/**
 * Lists versions available for a given project.
 * @param projectId The numeric ID or string identifier of the project.
 */
export const listProjectVersions = async (
  projectId: string | number
): Promise<VersionListResponse> => {
  const response = await axiosInstance.get(`/projects/${projectId}/versions.json`);
  return response.data;
};

/**
 * Creates a new version for a project.
 * @param projectId The numeric ID or string identifier of the project.
 * @param versionData The data for the new version.
 */
export const createProjectVersion = async (
  projectId: string | number,
  versionData: VersionCreatePayload
): Promise<VersionResponse> => {
  const response = await axiosInstance.post(`/projects/${projectId}/versions.json`, versionData);
  return response.data;
};

/**
 * Retrieves a single version by its ID.
 * @param id The ID of the version.
 */
export const getVersion = async (id: number): Promise<VersionResponse> => {
  const response = await axiosInstance.get(`/versions/${id}.json`);
  return response.data;
};

/**
 * Updates a version.
 * @param id The ID of the version to update.
 * @param versionData The data to update.
 */
export const updateVersion = async (
  id: number,
  versionData: VersionUpdatePayload
): Promise<void> => {
  await axiosInstance.put(`/versions/${id}.json`, versionData);
};

/**
 * Deletes a version.
 * @param id The ID of the version to delete.
 */
export const deleteVersion = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/versions/${id}.json`);
};

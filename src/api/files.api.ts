import { axiosInstance } from "@/utils/axios.util";
import { RedmineFile } from "@/schema/file.schema";

interface FileListResponse {
  files: RedmineFile[];
}

/**
 * Retrieves a list of all files attached to a project.
 * 
 * **Note**: 
 * - API Status: Alpha (v3.4) - Major functionality in place, may change
 * - Returns files uploaded to the project's Files section
 * - Includes file metadata, download information, and version associations
 * 
 * Response includes:
 * - File ID, filename, and size information
 * - Content type and download statistics
 * - Author information and upload timestamp
 * - Optional description and version association
 * - File digest/hash for integrity verification
 * 
 * @param projectId - The numeric ID or string identifier of the project
 * @returns Promise containing the list of project files with metadata
 */
export const listFiles = async (projectId: string | number): Promise<FileListResponse> => {
  const response = await axiosInstance.get(`/projects/${projectId}/files.json`);
  return response.data;
};

import { axiosInstance } from "@/utils/axios.util";
import { RedmineFile } from "@/schema/file.schema";

interface FileListResponse {
  files: RedmineFile[];
}

/**
 * Retrieves a list of all files attached to a project.
 *
 * Source: Redmine REST Files (GET /projects/:project_id/files.json)
 * - Docs: https://www.redmine.org/projects/redmine/wiki/Rest_Files#GET
 * - Returns files available for the project
 * - Each file includes: id, filename, filesize, content_type, description, content_url,
 *   author{id,name}, created_on, version{id,name}, digest, downloads
 * - Pagination metadata (total_count/offset/limit) is NOT documented for this endpoint
 *
 * @param projectId - The numeric ID or string identifier of the project
 * @returns Promise containing the list of project files with metadata
 */
export const listFiles = async (projectId: string | number): Promise<FileListResponse> => {
  const response = await axiosInstance.get(`/projects/${projectId}/files.json`);
  return response.data;
};

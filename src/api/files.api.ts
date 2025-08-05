import { axiosInstance } from "../utils/axios.util";
import { RedmineFile } from "../schema/file.schema";

interface FileListResponse {
  files: RedmineFile[];
}

/**
 * Retrieves a list of files for a given project.
 * @param projectId The ID or identifier of the project.
 */
export const listFiles = async (projectId: string | number): Promise<FileListResponse> => {
  const response = await axiosInstance.get(`/projects/${projectId}/files.json`);
  return response.data;
};

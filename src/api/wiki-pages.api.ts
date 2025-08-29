import { axiosInstance } from "@/utils/axios.util";
import { CreateOrUpdateWikiPagePayload, RedmineWikiPage } from "@/schema/wiki-page.schema";

interface WikiPageListResponse {
  wiki_pages: { title: string }[];
}

interface WikiPageResponse {
  wiki_page: RedmineWikiPage;
}

/**
 * Retrieves a list of all wiki pages for a given project.
 * 
 * **Note**: 
 * - API Status: Alpha (v2.2) - Major functionality in place, may change
 * - Returns wiki page titles and basic information
 * - Does not include page content (use getWikiPage for full content)
 * 
 * @param projectId - The numeric ID or string identifier of the project
 * @returns Promise containing the list of wiki page titles
 */
export const listWikiPages = async (projectId: string | number): Promise<WikiPageListResponse> => {
  const response = await axiosInstance.get(`/projects/${projectId}/wiki/index.json`);
  return response.data;
};

/**
 * Retrieves a specific wiki page with full content and metadata.
 * 
 * **Note**: 
 * - API Status: Alpha (v2.2) - Major functionality in place, may change
 * - Returns complete page content, version history, and author information
 * - Can retrieve specific historical versions
 * - Supports attachment inclusion with include parameter
 * 
 * @param projectId - The numeric ID or string identifier of the project
 * @param title - The title of the wiki page to retrieve
 * @param version - Optional version number to retrieve specific historical version
 * @returns Promise containing the wiki page content and metadata
 */
export const getWikiPage = async (
  projectId: string | number,
  title: string,
  version?: number
): Promise<WikiPageResponse> => {
  const url = version
    ? `/projects/${projectId}/wiki/${title}/${version}.json`
    : `/projects/${projectId}/wiki/${title}.json`;
  const response = await axiosInstance.get(url);
  return response.data;
};

/**
 * Creates a new wiki page or updates an existing one.
 * 
 * **Note**: 
 * - API Status: Alpha (v2.2) - Major functionality in place, may change
 * - Uses HTTP PUT method for both create and update operations
 * - Supports optimistic locking with version parameter
 * - Can attach files using upload tokens
 * 
 * Required fields:
 * - text: Wiki page content in textile/markdown format
 * 
 * Optional fields:
 * - comments: Change description for version history
 * - version: Current version number for optimistic locking
 * 
 * **Warning**: Without version parameter, concurrent edits may be overwritten.
 * 
 * @param projectId - The numeric ID or string identifier of the project
 * @param title - The title of the wiki page to create or update
 * @param pageData - The wiki page data containing text and optional metadata
 * @returns Promise containing the created or updated wiki page information
 * @throws 409 Conflict if page was modified by another user (stale version)
 * @throws 422 Unprocessable Entity if validation fails
 */
export const createOrUpdateWikiPage = async (
  projectId: string | number,
  title: string,
  pageData: CreateOrUpdateWikiPagePayload
): Promise<WikiPageResponse> => {
  const response = await axiosInstance.put(`/projects/${projectId}/wiki/${title}.json`, pageData);
  return response.data;
};

/**
 * Deletes a wiki page and all its history.
 * 
 * **Note**: 
 * - API Status: Alpha (v2.2) - Major functionality in place, may change
 * - Removes page content, version history, and attachments
 * - Action is irreversible
 * 
 * **Warning**: This permanently removes all page data and history.
 * 
 * @param projectId - The numeric ID or string identifier of the project
 * @param title - The title of the wiki page to delete
 * @returns Promise that resolves when the deletion is successful
 */
export const deleteWikiPage = async (projectId: string | number, title: string): Promise<void> => {
  await axiosInstance.delete(`/projects/${projectId}/wiki/${title}.json`);
};

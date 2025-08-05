import { axiosInstance } from "../utils/axios.util";
import { CreateOrUpdateWikiPagePayload, RedmineWikiPage } from "../schema/wiki-page.schema";

interface WikiPageListResponse {
  wiki_pages: { title: string }[];
}

interface WikiPageResponse {
  wiki_page: RedmineWikiPage;
}

/**
 * Retrieves a list of all wiki pages for a given project.
 * @param projectId The ID or identifier of the project.
 */
export const listWikiPages = async (projectId: string | number): Promise<WikiPageListResponse> => {
  const response = await axiosInstance.get(`/projects/${projectId}/wiki/index.json`);
  return response.data;
};

/**
 * Retrieves a specific wiki page from a project.
 * @param projectId The ID or identifier of the project.
 * @param title The title of the wiki page.
 * @param version Optional. The version of the wiki page to retrieve.
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
 * Creates or updates a wiki page.
 * @param projectId The ID or identifier of the project.
 * @param title The title of the wiki page.
 * @param pageData The data for the wiki page.
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
 * Deletes a wiki page.
 * @param projectId The ID or identifier of the project.
 * @param title The title of the wiki page to delete.
 */
export const deleteWikiPage = async (projectId: string | number, title: string): Promise<void> => {
  await axiosInstance.delete(`/projects/${projectId}/wiki/${title}.json`);
};

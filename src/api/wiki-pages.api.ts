import { axiosInstance } from "../utils/axios.util";
import { RedmineWikiPage, RedmineAttachment } from "../types/types";

// Payloads
interface WikiPageCreatePayload {
  wiki_page: {
    text: string;
    comments?: string;
    version?: number;
    attachments?: Array<{
      token: string;
      filename: string;
      content_type: string;
    }>;
  };
}

type WikiPageUpdatePayload = WikiPageCreatePayload;

// Responses
interface WikiPageListResponse {
  wiki_pages: Pick<RedmineWikiPage, "title" | "version" | "created_on" | "updated_on">[];
}

interface WikiPageResponse {
  wiki_page: RedmineWikiPage;
}

/**
 * Retrieves the list of all pages in a project wiki.
 * @param projectId The ID or identifier of the project.
 */
export const listWikiPages = async (projectId: string | number): Promise<WikiPageListResponse> => {
  const response = await axiosInstance.get(`/projects/${projectId}/wiki/index.json`);
  return response.data;
};

/**
 * Retrieves a wiki page with its content.
 * @param projectId The ID or identifier of the project.
 * @param title The title of the wiki page.
 * @param version Optional version of the page to retrieve.
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
 * @param pageData The content and other details of the page.
 */
export const updateWikiPage = async (
  projectId: string | number,
  title: string,
  pageData: WikiPageUpdatePayload
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

import { axiosInstance } from "@/utils/axios.util";
import { RedmineSearchResult } from "@/schema/search.schema";

// Redmine Search JSON response is root-level, not nested under "search"
interface SearchResponse {
  results: RedmineSearchResult[];
  total_count: number;
  offset: number;
  limit: number;
}

/**
 * Performs a global search across Redmine resources.
 *
 * Searches through issues, news, documents, wiki pages, forum messages,
 * projects, and other searchable content based on permissions.
 *
 * @param params - Search parameters
 * @param params.q - The search query string (required)
 * @param params.project - Optional project identifier for path-scoped search (/projects/:id/search.json)
 * @param params.scope - Optional search scope within context: all | my_projects | subprojects
 * @param params.all_words - If true, all words in the query must be present in results
 * @param params.titles_only - If true, only search in titles/subjects, not content
 * @param params.open_issues - If true, only search in open issues (excludes closed issues)
 * @param params.issues - Include issues results
 * @param params.news - Include news results
 * @param params.documents - Include documents results
 * @param params.changesets - Include changesets results
 * @param params.wiki_pages - Include wiki pages results
 * @param params.messages - Include forum messages results
 * @param params.projects - Include projects results
 * @param params.attachments - Include attachments results
 * @param params.offset - Number of results to skip (for pagination)
 * @param params.limit - Maximum number of results to return (default: 25, max: 100)
 * @returns Promise containing search results with pagination metadata
 */
export const search = async (params: {
  q: string;
  project?: string;
  scope?: "all" | "my_projects" | "subprojects";
  all_words?: boolean;
  titles_only?: boolean;
  open_issues?: boolean;
  issues?: boolean;
  news?: boolean;
  documents?: boolean;
  changesets?: boolean;
  wiki_pages?: boolean;
  messages?: boolean;
  projects?: boolean;
  attachments?: boolean;
  offset?: number;
  limit?: number;
}): Promise<SearchResponse> => {
  const { project, ...queryParams } = params;
  const url = project ? `/projects/${project}/search.json` : "/search.json";
  const response = await axiosInstance.get(url, { params: queryParams });
  return response.data;
};

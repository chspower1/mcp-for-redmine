import { axiosInstance } from "@/utils/axios.util";
import { RedmineSearchResult } from "@/schema/search.schema";

interface SearchResponse {
  search: {
    results: RedmineSearchResult[];
    total_count: number;
    offset: number;
    limit: number;
  };
}

/**
 * Performs a global search across Redmine resources.
 * 
 * Searches through issues, news, documents, wiki pages, forum messages,
 * projects, and other searchable content based on permissions.
 * 
 * @param params - Search parameters
 * @param params.q - The search query string (required)
 * @param params.scope - Limit search to a specific project (project identifier).
 *                       If not provided, searches across all accessible projects
 * @param params.all_words - If true, all words in the query must be present in results
 * @param params.titles_only - If true, only search in titles/subjects, not content
 * @param params.open_issues - If true, only search in open issues (excludes closed issues)
 * @param params.offset - Number of results to skip (for pagination)
 * @param params.limit - Maximum number of results to return (default: 25, max: 100)
 * @returns Promise containing search results with pagination metadata
 */
export const search = async (params: {
  q: string;
  scope?: string;
  all_words?: boolean;
  titles_only?: boolean;
  open_issues?: boolean;
  offset?: number;
  limit?: number;
}): Promise<SearchResponse["search"]> => {
  const { scope, ...otherParams } = params;
  const url = scope ? `/projects/${scope}/search.json` : "/search.json";
  const response = await axiosInstance.get(url, { params: otherParams });
  return response.data;
};

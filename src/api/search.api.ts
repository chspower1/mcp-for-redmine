import { axiosInstance } from "../utils/axios.util";
import { RedmineSearchResult } from "../schema/search.schema";

interface SearchResponse {
  search: {
    results: RedmineSearchResult[];
    total_count: number;
    offset: number;
    limit: number;
  };
}

/**
 * Performs a search across Redmine.
 * @param params The search parameters.
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

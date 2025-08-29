import { axiosInstance } from "@/utils/axios.util";
import { RedmineQuery } from "@/schema/query.schema";

interface QueryListResponse {
  queries: RedmineQuery[];
}

/**
 * Retrieves a list of all custom queries visible to the current user.
 * 
 * **Note**: 
 * - API Status: Alpha (v1.3) - Major functionality in place, may change
 * - Returns both public and private queries accessible by the user
 * - Queries can be used with Issues API for filtered issue lists
 * 
 * Response includes:
 * - Query ID and name
 * - Public/private visibility status
 * - Associated project ID (null for global queries)
 * - Pagination metadata (total_count, limit, offset)
 * 
 * Usage:
 * - Use query IDs with Issues API: GET /issues.json?query_id={id}
 * - Filter by project: GET /issues.json?query_id={id}&project_id={project}
 * 
 * @returns Promise containing the list of accessible custom queries
 */
export const listQueries = async (): Promise<QueryListResponse> => {
  const response = await axiosInstance.get("/queries.json");
  return response.data;
};

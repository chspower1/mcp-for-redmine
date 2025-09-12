import { axiosInstance } from "@/utils/axios.util";
import { RedmineQuery } from "@/schema/query.schema";

// Response shape for GET /queries.json
// Ref: https://www.redmine.org/projects/redmine/wiki/Rest_Queries
interface QueryListResponse {
  queries: RedmineQuery[];
  total_count?: number;
  offset?: number;
  limit?: number;
}

// Supported request parameters for GET /queries.json
// Ref: https://www.redmine.org/projects/redmine/wiki/Rest_Queries
export interface ListQueriesParams {
  /** Filter queries visible for a specific project */
  project_id?: number;
  /** Pagination offset */
  offset?: number;
  /** Pagination items per page */
  limit?: number;
}

/**
 * Retrieves a list of custom queries visible to the current user.
 *
 * Ref: https://www.redmine.org/projects/redmine/wiki/Rest_Queries
 * - Endpoint: GET /queries.json
 * - Optional params: project_id, limit, offset
 * - Returns public and private queries accessible to current user
 * - Pagination metadata may be included: total_count, limit, offset
 *
 * Usage examples:
 * - List all visible queries: GET /queries.json
 * - Restrict to a project: GET /queries.json?project_id=5
 * - With pagination: GET /queries.json?limit=25&offset=50
 */
export const listQueries = async (params?: ListQueriesParams): Promise<QueryListResponse> => {
  const response = await axiosInstance.get("/queries.json", { params });
  return response.data;
};

import { axiosInstance } from "@/utils/axios.util";
import { RedmineQuery } from "@/schema/query.schema";

interface QueryListResponse {
  queries: RedmineQuery[];
}

/**
 * Retrieves a list of all available custom queries.
 */
export const listQueries = async (): Promise<QueryListResponse> => {
  const response = await axiosInstance.get("/queries.json");
  return response.data;
};

import { axiosInstance } from "@/utils/axios.util";
import { RedmineUser } from "@/schema/user.schema";

interface MyAccountResponse {
  user: RedmineUser;
}

/**
 * Retrieves the currently authenticated user's account information.
 * 
 * **Note**: 
 * - API Status: Alpha (v4.1) - Major functionality in place, may change
 * - Returns detailed account information for the authenticated user
 * - Supports include parameter for additional data (memberships, groups)
 * - Shows user profile, API key, permissions, and custom field values
 * 
 * Response includes:
 * - User ID, login name, and admin status
 * - Personal information (first/last name, email)
 * - Account timestamps (created, last login)
 * - API key for REST API access
 * - Custom field values (if configured)
 * - Optional: project memberships and group associations
 * 
 * @param params - Optional parameters
 * @param params.include - Comma-separated associations (memberships, groups)
 * @returns Promise containing the current user's account information
 */
export const getMyAccount = async (params?: { include?: string }): Promise<MyAccountResponse> => {
  const response = await axiosInstance.get("/my/account.json", { params });
  return response.data;
};

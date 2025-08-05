import { axiosInstance } from "../utils/axios.util";
import { RedmineUser } from "../schema/user.schema";

interface MyAccountResponse {
  user: RedmineUser;
}

/**
 * Retrieves the currently logged-in user account.
 */
export const getMyAccount = async (params?: { include?: string }): Promise<MyAccountResponse> => {
  const response = await axiosInstance.get("/my/account.json", { params });
  return response.data;
};

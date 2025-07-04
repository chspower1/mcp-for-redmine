import { axiosInstance } from "../utils/axios.util";
import { RedmineRole } from "../types/types";

// Responses
interface RoleListResponse {
  roles: RedmineRole[];
}

interface RoleResponse {
  role: RedmineRole;
}

/**
 * Retrieves a list of all roles.
 */
export const listRoles = async (): Promise<RoleListResponse> => {
  const response = await axiosInstance.get("/roles.json");
  return response.data;
};

/**
 * Retrieves a single role by its ID.
 * @param id The ID of the role to retrieve.
 */
export const getRole = async (id: number): Promise<RoleResponse> => {
  const response = await axiosInstance.get(`/roles/${id}.json`);
  return response.data;
};

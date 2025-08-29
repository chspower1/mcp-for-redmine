import { axiosInstance } from "@/utils/axios.util";
import { RedmineRole } from "@/schema/role.schema";

interface RoleListResponse {
  roles: RedmineRole[];
}

interface RoleResponse {
  role: RedmineRole;
}

/**
 * Retrieves a list of all roles in Redmine.
 * 
 * **Note**: 
 * - API Status: Alpha (v1.4) - Major functionality in place, may change
 * - Returns basic role information (ID and name)
 * 
 * @returns Promise containing the list of all system roles
 */
export const listRoles = async (): Promise<RoleListResponse> => {
  const response = await axiosInstance.get("/roles.json");
  return response.data;
};

/**
 * Retrieves detailed information about a single role by its ID.
 * 
 * **Note**: 
 * - API Status: Alpha (v1.4) - Major functionality in place, may change
 * - Detailed permissions available since Redmine v2.2.0
 * - Returns comprehensive role data including all permissions
 * 
 * Response includes:
 * - Role ID and name
 * - Assignability status
 * - Visibility settings (issues, time entries, users)
 * - Complete list of permissions (view_issues, edit_issues, etc.)
 * 
 * @param id - The numeric ID of the role to retrieve
 * @returns Promise containing detailed role information with permissions
 */
export const getRole = async (id: string): Promise<RoleResponse> => {
  const response = await axiosInstance.get(`/roles/${id}.json`);
  return response.data;
};

import { axiosInstance } from "@/utils/axios.util";
import { RedmineRole } from "@/schema/roles.schema";

interface RoleListResponse {
  roles: Pick<RedmineRole, "id" | "name">[];
}

interface RoleResponse {
  role: RedmineRole;
}

/**
 * Retrieves a list of all roles in Redmine.
 *
 * Reference: https://www.redmine.org/projects/redmine/wiki/Rest_Roles
 * Endpoint: GET /roles.json
 *
 * Notes:
 * - Returns basic role attributes only: id and name
 * - For permissions and visibility settings, use the show endpoint (getRole)
 *
 * @returns Promise containing the list of all system roles (id, name)
 */
export const listRoles = async (): Promise<RoleListResponse> => {
  const response = await axiosInstance.get("/roles.json");
  return response.data;
};

/**
 * Retrieves detailed information about a single role by its ID.
 *
 * Reference: https://www.redmine.org/projects/redmine/wiki/Rest_Roles
 * Endpoint: GET /roles/:id.json
 *
 * Notes:
 * - Returns comprehensive role data including permissions and visibility settings
 * - Detailed permissions available since Redmine v2.2.0
 *
 * Response includes:
 * - id, name
 * - assignable
 * - visibility settings: issues_visibility, time_entries_visibility, users_visibility
 * - permissions: string[] (e.g., "view_issues", "edit_issues")
 *
 * @param id - The numeric ID of the role to retrieve
 * @returns Promise containing detailed role information with permissions
 */
export const getRole = async (id: number): Promise<RoleResponse> => {
  const response = await axiosInstance.get(`/roles/${id}.json`);
  return response.data;
};

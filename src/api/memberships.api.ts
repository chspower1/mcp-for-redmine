import { RedmineMembership } from "@/schema";
import { axiosInstance } from "@/utils/axios.util";

// Payloads
interface MembershipCreatePayload {
  membership: {
    user_id: number;
    role_ids: number[];
  };
}

interface MembershipUpdatePayload {
  membership: {
    role_ids: number[];
  };
}

// Responses
interface MembershipListResponse {
  memberships: RedmineMembership[];
  total_count: number;
  offset: number;
  limit: number;
}

interface MembershipResponse {
  membership: RedmineMembership;
}

/**
 * Retrieves the list of memberships for a given project.
 * 
 * **Note**: 
 * - API Status: Alpha (v1.4) - Major functionality in place, may change
 * - Returns both user and group memberships for the project
 * - Supports pagination for large membership lists
 * 
 * @param projectId - The numeric ID or string identifier of the project
 * @param params - Optional query parameters
 * @param params.offset - Number of memberships to skip (for pagination)
 * @param params.limit - Maximum number of memberships to return (default: 25, max: 100)
 * @returns Promise containing the list of project memberships with pagination metadata
 */
export const listProjectMemberships = async (
  projectId: string | number,
  params?: { offset?: number; limit?: number }
): Promise<MembershipListResponse> => {
  const response = await axiosInstance.get(`/projects/${projectId}/memberships.json`, { params });
  return response.data;
};

/**
 * Adds a member (user or group) to a project with specified roles.
 * 
 * **Note**: 
 * - API Status: Alpha (v1.4) - Major functionality in place, may change
 * - Requires project administration permissions
 * - Can assign multiple roles to a single membership
 * 
 * Required fields:
 * - user_id: The user or group ID to add as a member
 * - role_ids: Array of role IDs to assign to the member
 * 
 * @param projectId - The numeric ID or string identifier of the project
 * @param membershipData - The membership data containing user_id and role_ids
 * @returns Promise containing the created membership information
 * @throws 422 Unprocessable Entity if validation fails
 */
export const createProjectMembership = async (
  projectId: string | number,
  membershipData: MembershipCreatePayload
): Promise<MembershipResponse> => {
  const response = await axiosInstance.post(
    `/projects/${projectId}/memberships.json`,
    membershipData
  );
  return response.data;
};

/**
 * Retrieves detailed information about a specific membership.
 * 
 * **Note**: 
 * - API Status: Alpha (v1.4) - Major functionality in place, may change
 * - Returns membership details including project, user/group, and assigned roles
 * - Shows whether roles are inherited from groups
 * 
 * @param id - The numeric ID of the membership to retrieve
 * @returns Promise containing detailed membership information
 */
export const getMembership = async (id: number): Promise<MembershipResponse> => {
  const response = await axiosInstance.get(`/memberships/${id}.json`);
  return response.data;
};

/**
 * Updates the roles assigned to an existing membership.
 * 
 * **Note**: 
 * - API Status: Alpha (v1.4) - Major functionality in place, may change
 * - Requires project administration permissions
 * - Can only update role assignments, not the user or project
 * - Cannot modify inherited group memberships
 * 
 * @param id - The numeric ID of the membership to update
 * @param membershipData - The membership data containing new role_ids array
 * @returns Promise that resolves when the update is successful
 * @throws 422 Unprocessable Entity if validation fails
 */
export const updateMembership = async (
  id: number,
  membershipData: MembershipUpdatePayload
): Promise<void> => {
  await axiosInstance.put(`/memberships/${id}.json`, membershipData);
};

/**
 * Removes a member from a project by deleting their membership.
 * 
 * **Note**: 
 * - API Status: Alpha (v1.4) - Major functionality in place, may change
 * - Requires project administration permissions
 * - Cannot delete inherited group memberships (must remove from group instead)
 * 
 * **Warning**: This action removes all project access for the user/group.
 * 
 * @param id - The numeric ID of the membership to delete
 * @returns Promise that resolves when the deletion is successful
 */
export const deleteMembership = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/memberships/${id}.json`);
};

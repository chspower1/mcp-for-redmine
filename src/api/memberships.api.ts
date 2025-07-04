import { axiosInstance } from "../utils/axios.util";
import { RedmineMembership } from "../types/types";

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
 * Returns the list of memberships for a given project.
 * @param projectId The ID or identifier of the project.
 */
export const listProjectMemberships = async (
  projectId: string | number
): Promise<MembershipListResponse> => {
  const response = await axiosInstance.get(`/projects/${projectId}/memberships.json`);
  return response.data;
};

/**
 * Adds a member to a project.
 * @param projectId The ID or identifier of the project.
 * @param membershipData The membership data including user ID and role IDs.
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
 * Returns a membership details.
 * @param id The ID of the membership.
 */
export const getMembership = async (id: number): Promise<MembershipResponse> => {
  const response = await axiosInstance.get(`/memberships/${id}.json`);
  return response.data;
};

/**
 * Updates a membership.
 * @param id The ID of the membership to update.
 * @param membershipData The membership data with new role IDs.
 */
export const updateMembership = async (
  id: number,
  membershipData: MembershipUpdatePayload
): Promise<void> => {
  await axiosInstance.put(`/memberships/${id}.json`, membershipData);
};

/**
 * Deletes a membership.
 * @param id The ID of the membership to delete.
 */
export const deleteMembership = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/memberships/${id}.json`);
};

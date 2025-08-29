import { axiosInstance } from "@/utils/axios.util";
import {
  AddUserToGroupPayload,
  CreateGroupPayload,
  RedmineGroup,
  UpdateGroupPayload,
} from "@/schema/group.schema";

interface GroupListResponse {
  groups: RedmineGroup[];
}

interface GroupResponse {
  group: RedmineGroup;
}

/**
 * Retrieves a list of all groups in Redmine.
 * 
 * **Note**: 
 * - This endpoint requires administrator privileges
 * - API Status: Alpha (v2.1) - Major functionality in place, may change
 * 
 * @param params - Optional query parameters
 * @param params.include - Comma-separated list of associations to include:
 *   - 'users': Include group members
 *   - 'memberships': Include project memberships for the group
 * @returns Promise containing the list of all groups
 */
export const listGroups = async (params?: { include?: string }): Promise<GroupListResponse> => {
  const response = await axiosInstance.get("/groups.json", { params });
  return response.data;
};

/**
 * Retrieves a single group by its ID.
 * 
 * **Note**: 
 * - This endpoint requires administrator privileges
 * - API Status: Alpha (v2.1) - Major functionality in place, may change
 * 
 * @param id - The numeric ID of the group to retrieve
 * @param params - Optional parameters
 * @param params.include - Comma-separated list of associations to include:
 *   - 'users': Include group members with their details
 *   - 'memberships': Include project memberships for the group
 * @returns Promise containing the group information
 */
export const getGroup = async (
  id: string,
  params?: { include?: string }
): Promise<GroupResponse> => {
  const response = await axiosInstance.get(`/groups/${id}.json`, { params });
  return response.data;
};

/**
 * Creates a new group in Redmine.
 * 
 * **Note**: 
 * - This endpoint requires administrator privileges
 * - API Status: Alpha (v2.1) - Major functionality in place, may change
 * 
 * Required fields:
 * - name: The group name (must be unique)
 * 
 * @param groupData - The group data payload containing required and optional fields
 * @returns Promise containing the created group's information
 * @throws 422 Unprocessable Entity if validation fails (e.g., duplicate name)
 */
export const createGroup = async (groupData: CreateGroupPayload): Promise<GroupResponse> => {
  const response = await axiosInstance.post("/groups.json", groupData);
  return response.data;
};

/**
 * Updates an existing group's information.
 * 
 * **Note**: 
 * - This endpoint requires administrator privileges
 * - API Status: Alpha (v2.1) - Major functionality in place, may change
 * 
 * All fields are optional - only provide fields that need to be updated.
 * 
 * @param id - The numeric ID of the group to update
 * @param groupData - The group data payload containing fields to update
 * @returns Promise that resolves when the update is successful
 * @throws 422 Unprocessable Entity if validation fails
 */
export const updateGroup = async (id: string, groupData: UpdateGroupPayload): Promise<void> => {
  await axiosInstance.put(`/groups/${id}.json`, groupData);
};

/**
 * Deletes a group from Redmine.
 * 
 * **Note**: 
 * - This endpoint requires administrator privileges
 * - API Status: Alpha (v2.1) - Major functionality in place, may change
 * 
 * **Warning**: This action is permanent and cannot be undone.
 * Group members will lose their group-based permissions.
 * 
 * @param id - The numeric ID of the group to delete
 * @returns Promise that resolves when the deletion is successful
 */
export const deleteGroup = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/groups/${id}.json`);
};

/**
 * Adds a user to a group.
 * 
 * **Note**: 
 * - This endpoint requires administrator privileges
 * - API Status: Alpha (v2.1) - Major functionality in place, may change
 * 
 * @param groupId - The numeric ID of the group
 * @param userData - The user data containing user_id to add to the group
 * @returns Promise that resolves when the user is added to the group
 */
export const addUserToGroup = async (
  groupId: string,
  userData: AddUserToGroupPayload
): Promise<void> => {
  await axiosInstance.post(`/groups/${groupId}/users.json`, userData);
};

/**
 * Removes a user from a group.
 * 
 * **Note**: 
 * - This endpoint requires administrator privileges
 * - API Status: Alpha (v2.1) - Major functionality in place, may change
 * 
 * **Warning**: The user will lose all group-based permissions when removed.
 * 
 * @param groupId - The numeric ID of the group
 * @param userId - The numeric ID of the user to remove from the group
 * @returns Promise that resolves when the user is removed from the group
 */
export const removeUserFromGroup = async (groupId: string, userId: string): Promise<void> => {
  await axiosInstance.delete(`/groups/${groupId}/users/${userId}.json`);
};

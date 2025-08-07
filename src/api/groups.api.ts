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
 * Retrieves a list of all groups.
 */
export const listGroups = async (): Promise<GroupListResponse> => {
  const response = await axiosInstance.get("/groups.json");
  return response.data;
};

/**
 * Retrieves a single group by its ID.
 * @param id The ID of the group.
 * @param params Optional parameters (e.g., include).
 */
export const getGroup = async (
  id: string,
  params?: { include?: string }
): Promise<GroupResponse> => {
  const response = await axiosInstance.get(`/groups/${id}.json`, { params });
  return response.data;
};

/**
 * Creates a new group.
 * @param groupData The data for the new group.
 */
export const createGroup = async (groupData: CreateGroupPayload): Promise<GroupResponse> => {
  const response = await axiosInstance.post("/groups.json", groupData);
  return response.data;
};

/**
 * Updates an existing group.
 * @param id The ID of the group.
 * @param groupData The data to update.
 */
export const updateGroup = async (id: string, groupData: UpdateGroupPayload): Promise<void> => {
  await axiosInstance.put(`/groups/${id}.json`, groupData);
};

/**
 * Deletes a group.
 * @param id The ID of the group.
 */
export const deleteGroup = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/groups/${id}.json`);
};

/**
 * Adds a user to a group.
 * @param groupId The ID of the group.
 * @param userData The user ID to add.
 */
export const addUserToGroup = async (
  groupId: string,
  userData: AddUserToGroupPayload
): Promise<void> => {
  await axiosInstance.post(`/groups/${groupId}/users.json`, userData);
};

/**
 * Removes a user from a group.
 * @param groupId The ID of the group.
 * @param userId The ID of the user to remove.
 */
export const removeUserFromGroup = async (groupId: string, userId: string): Promise<void> => {
  await axiosInstance.delete(`/groups/${groupId}/users/${userId}.json`);
};

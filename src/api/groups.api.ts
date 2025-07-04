import { axiosInstance } from "../utils/axios.util";
import { RedmineGroup } from "../types/types";

// Payloads
interface GroupCreatePayload {
  group: {
    name: string;
    user_ids?: number[];
  };
}

interface GroupUpdatePayload {
  group: Partial<GroupCreatePayload["group"]>;
}

// Responses
interface GroupListResponse {
  groups: RedmineGroup[];
  total_count: number;
  offset: number;
  limit: number;
}

interface GroupResponse {
  group: RedmineGroup;
}

/**
 * Retrieves a list of all groups. Admin only.
 */
export const listGroups = async (): Promise<GroupListResponse> => {
  const response = await axiosInstance.get("/groups.json");
  return response.data;
};

/**
 * Retrieves a single group by its ID. Admin only.
 * @param id The ID of the group.
 * @param params Optional parameters like 'include' to fetch users.
 */
export const getGroup = async (
  id: number,
  params?: { include?: string }
): Promise<GroupResponse> => {
  const response = await axiosInstance.get(`/groups/${id}.json`, { params });
  return response.data;
};

/**
 * Creates a new group. Admin only.
 * @param groupData The data for the new group.
 */
export const createGroup = async (groupData: GroupCreatePayload): Promise<GroupResponse> => {
  const response = await axiosInstance.post("/groups.json", groupData);
  return response.data;
};

/**
 * Updates a group. Admin only.
 * @param id The ID of the group to update.
 * @param groupData The data to update.
 */
export const updateGroup = async (id: number, groupData: GroupUpdatePayload): Promise<void> => {
  await axiosInstance.put(`/groups/${id}.json`, groupData);
};

/**
 * Deletes a group. Admin only.
 * @param id The ID of the group to delete.
 */
export const deleteGroup = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/groups/${id}.json`);
};

/**
 * Adds a user to a group. Admin only.
 * @param groupId The ID of the group.
 * @param userId The ID of the user to add.
 */
export const addUserToGroup = async (groupId: number, userId: number): Promise<void> => {
  await axiosInstance.post(`/groups/${groupId}/users.json`, { user_id: userId });
};

/**
 * Removes a user from a group. Admin only.
 * @param groupId The ID of the group.
 * @param userId The ID of the user to remove.
 */
export const removeUserFromGroup = async (groupId: number, userId: number): Promise<void> => {
  await axiosInstance.delete(`/groups/${groupId}/users/${userId}.json`);
};

import { z } from "zod";
import {
  listGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  addUserToGroup,
  removeUserFromGroup,
} from "../api/groups.api";
import { Tool } from "../types/types";

export const listGroupsTool: Tool = {
  name: "redmine_list-groups",
  description: "Retrieves a list of all groups. Admin only.",
  parameters: z.object({}),
  execute: async () => {
    try {
      const result = await listGroups();
      return result.groups;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list groups: ${errorMessage}`);
    }
  },
};

export const getGroupTool: Tool = {
  name: "redmine_get-group",
  description:
    "Retrieves a single group by its ID. Includes users if 'include' is set to 'users'. Admin only.",
  parameters: z.object({
    id: z.number().describe("The ID of the group."),
    include: z.string().optional().describe("Set to 'users' to include user details."),
  }),
  execute: async ({ id, include }) => {
    try {
      const result = await getGroup(id, { include });
      return result.group;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to retrieve group ${id}: ${errorMessage}`);
    }
  },
};

export const createGroupTool: Tool = {
  name: "redmine_create-group",
  description: "Creates a new group. Admin only.",
  parameters: z.object({
    name: z.string().describe("The name of the new group."),
    user_ids: z.array(z.number()).optional().describe("An array of user IDs to add to the group."),
  }),
  execute: async (groupData) => {
    try {
      const result = await createGroup({ group: groupData });
      return result.group;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to create group: ${errorMessage}`);
    }
  },
};

export const updateGroupTool: Tool = {
  name: "redmine_update-group",
  description: "Updates a group. Admin only.",
  parameters: z.object({
    id: z.number().describe("The ID of the group to update."),
    name: z.string().optional().describe("The new name for the group."),
  }),
  execute: async ({ id, ...updateData }) => {
    try {
      await updateGroup(id, { group: updateData });
      return { success: true, message: `Group ${id} updated successfully.` };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to update group ${id}: ${errorMessage}`);
    }
  },
};

export const deleteGroupTool: Tool = {
  name: "redmine_delete-group",
  description: "Deletes a group. Admin only.",
  parameters: z.object({
    id: z.number().describe("The ID of the group to delete."),
  }),
  execute: async ({ id }) => {
    try {
      await deleteGroup(id);
      return { success: true, message: `Group ${id} deleted successfully.` };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to delete group ${id}: ${errorMessage}`);
    }
  },
};

export const addUserToGroupTool: Tool = {
  name: "redmine_add-user-to-group",
  description: "Adds a user to a group. Admin only.",
  parameters: z.object({
    groupId: z.number().describe("The ID of the group."),
    userId: z.number().describe("The ID of the user to add."),
  }),
  execute: async ({ groupId, userId }) => {
    try {
      await addUserToGroup(groupId, userId);
      return { success: true, message: `User ${userId} added to group ${groupId}.` };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to add user to group: ${errorMessage}`);
    }
  },
};

export const removeUserFromGroupTool: Tool = {
  name: "redmine_remove-user-from-group",
  description: "Removes a user from a group. Admin only.",
  parameters: z.object({
    groupId: z.number().describe("The ID of the group."),
    userId: z.number().describe("The ID of the user to remove."),
  }),
  execute: async ({ groupId, userId }) => {
    try {
      await removeUserFromGroup(groupId, userId);
      return { success: true, message: `User ${userId} removed from group ${groupId}.` };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to remove user from group: ${errorMessage}`);
    }
  },
};

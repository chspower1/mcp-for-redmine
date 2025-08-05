import {
  addUserToGroup,
  createGroup,
  deleteGroup,
  getGroup,
  listGroups,
  removeUserFromGroup,
  updateGroup,
} from "../api/groups.api";
import {
  AddUserToGroupToolSchema,
  CreateGroupToolSchema,
  DeleteGroupToolSchema,
  GetGroupToolSchema,
  ListGroupsToolSchema,
  RemoveUserFromGroupToolSchema,
  UpdateGroupToolSchema,
} from "../schema/group.schema";
import { McpTool } from "../types/types";

export const listGroupsTool: McpTool<typeof ListGroupsToolSchema.shape> = {
  name: "groups_list",
  config: {
    description: "Retrieves a list of all groups.",
    inputSchema: ListGroupsToolSchema.shape,
  },
  execute: async () => {
    try {
      const result = await listGroups();
      return {
        content: [{ type: "text", text: JSON.stringify(result.groups) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list groups: ${errorMessage}`);
    }
  },
};

export const getGroupTool: McpTool<typeof GetGroupToolSchema.shape> = {
  name: "groups_get",
  config: {
    description: "Retrieves a single group by its ID.",
    inputSchema: GetGroupToolSchema.shape,
  },
  execute: async ({ id, include }) => {
    try {
      const result = await getGroup(id, { include });
      return {
        content: [{ type: "text", text: JSON.stringify(result.group) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to retrieve group ${id}: ${errorMessage}`);
    }
  },
};

export const createGroupTool: McpTool<typeof CreateGroupToolSchema.shape> = {
  name: "groups_create",
  config: {
    description: "Creates a new group.",
    inputSchema: CreateGroupToolSchema.shape,
  },
  execute: async (groupData) => {
    const payload = { group: groupData };
    try {
      const result = await createGroup(payload);
      return {
        content: [{ type: "text", text: JSON.stringify(result.group) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to create group: ${errorMessage}`);
    }
  },
};

export const updateGroupTool: McpTool<typeof UpdateGroupToolSchema.shape> = {
  name: "groups_update",
  config: {
    description: "Updates an existing group.",
    inputSchema: UpdateGroupToolSchema.shape,
  },
  execute: async ({ id, ...groupData }) => {
    const payload = { group: groupData };
    try {
      await updateGroup(id, payload);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              message: `Group ${id} updated successfully.`,
            }),
          },
        ],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to update group ${id}: ${errorMessage}`);
    }
  },
};

export const deleteGroupTool: McpTool<typeof DeleteGroupToolSchema.shape> = {
  name: "groups_delete",
  config: {
    description: "Deletes a group.",
    inputSchema: DeleteGroupToolSchema.shape,
  },
  execute: async ({ id }) => {
    try {
      await deleteGroup(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              message: `Group ${id} deleted successfully.`,
            }),
          },
        ],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to delete group ${id}: ${errorMessage}`);
    }
  },
};

export const addUserToGroupTool: McpTool<typeof AddUserToGroupToolSchema.shape> = {
  name: "groups_add_user",
  config: {
    description: "Adds a user to a group.",
    inputSchema: AddUserToGroupToolSchema.shape,
  },
  execute: async ({ group_id, user_id }) => {
    const payload = { user_id };
    try {
      await addUserToGroup(group_id, payload);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              message: `User ${user_id} added to group ${group_id} successfully.`,
            }),
          },
        ],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to add user to group: ${errorMessage}`);
    }
  },
};

export const removeUserFromGroupTool: McpTool<typeof RemoveUserFromGroupToolSchema.shape> = {
  name: "groups_remove_user",
  config: {
    description: "Removes a user from a group.",
    inputSchema: RemoveUserFromGroupToolSchema.shape,
  },
  execute: async ({ group_id, user_id }) => {
    try {
      await removeUserFromGroup(group_id, user_id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              message: `User ${user_id} removed from group ${group_id} successfully.`,
            }),
          },
        ],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to remove user from group: ${errorMessage}`);
    }
  },
};

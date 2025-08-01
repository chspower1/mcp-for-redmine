import { createUser, deleteUser, getUser, listUsers, updateUser } from "../api/users.api";
import {
  CreateUserToolSchema,
  DeleteUserToolSchema,
  GetUserToolSchema,
  ListUsersToolSchema,
  UpdateUserToolSchema,
} from "../schema/user.schema";
import { McpTool } from "../types/types";

export const createUserTool: McpTool<typeof CreateUserToolSchema.shape> = {
  name: "redmine_create-user",
  config: {
    description: "Creates a new user in Redmine.",
    inputSchema: CreateUserToolSchema.shape,
  },
  execute: async (args) => {
    if (args.password && args.generate_password) {
      throw new Error("Cannot use 'password' and 'generate_password' at the same time.");
    }
    if (!args.password && !args.generate_password) {
      throw new Error("Either 'password' or 'generate_password' must be provided.");
    }

    const payload = { user: args };

    try {
      const result = await createUser(payload);
      return { content: [{ type: "text", text: JSON.stringify(result.user) }] };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to create user: ${errorMessage}`);
    }
  },
};

export const getUserTool: McpTool<typeof GetUserToolSchema.shape> = {
  name: "redmine_get-user",
  config: {
    description: "Retrieves a single user from Redmine by their ID.",
    inputSchema: GetUserToolSchema.shape,
  },
  execute: async ({ id }) => {
    try {
      const result = await getUser(id);
      return { content: [{ type: "text", text: JSON.stringify(result.user) }] };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to retrieve user ${id}: ${errorMessage}`);
    }
  },
};

export const listUsersTool: McpTool<typeof ListUsersToolSchema.shape> = {
  name: "redmine_list-users",
  config: {
    description: "Retrieves a list of users from Redmine. This is an admin-only function.",
    inputSchema: ListUsersToolSchema.shape,
  },
  execute: async () => {
    try {
      const result = await listUsers();
      return {
        content: [{ type: "text", text: JSON.stringify(result.users) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list users: ${errorMessage}`);
    }
  },
};

export const updateUserTool: McpTool<typeof UpdateUserToolSchema.shape> = {
  name: "redmine_update-user",
  config: {
    description: "Updates an existing user in Redmine.",
    inputSchema: UpdateUserToolSchema.shape,
  },
  execute: async ({ id, ...updateData }) => {
    const payload = {
      user: updateData,
    };
    try {
      await updateUser(id, payload);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              message: `User ${id} updated successfully.`,
            }),
          },
        ],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to update user ${id}: ${errorMessage}`);
    }
  },
};

export const deleteUserTool: McpTool<typeof DeleteUserToolSchema.shape> = {
  name: "redmine_delete-user",
  config: {
    description: "Deletes a user from Redmine.",
    inputSchema: DeleteUserToolSchema.shape,
  },
  execute: async ({ id }) => {
    try {
      await deleteUser(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              message: `User ${id} deleted successfully.`,
            }),
          },
        ],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to delete user ${id}: ${errorMessage}`);
    }
  },
};

import { createUser, deleteUser, getCurrentUser, getUser, listUsers, updateUser } from "@/api/users.api";
import {
  CreateUserToolSchema,
  DeleteUserToolSchema,
  GetCurrentUserToolSchema,
  GetUserToolSchema,
  ListUsersToolSchema,
  UpdateUserToolSchema,
} from "@/schema/user.schema";
import { McpTool } from "@/types/types";

export const createUserTool: McpTool<typeof CreateUserToolSchema.shape> = {
  name: "users_create",
  config: {
    description: "Creates a new user in Redmine. Requires administrator privileges. Either 'password' or 'generate_password' must be provided.",
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
  name: "users_get",
  config: {
    description: "Retrieves a single user from Redmine by their ID. Admins see full details, non-admins see limited info. Can include memberships and groups.",
    inputSchema: GetUserToolSchema.shape,
  },
  execute: async ({ id, include }) => {
    try {
      const params = include ? { include } : undefined;
      const result = await getUser(id, params);
      return { content: [{ type: "text", text: JSON.stringify(result.user) }] };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to retrieve user ${id}: ${errorMessage}`);
    }
  },
};

export const getCurrentUserTool: McpTool<typeof GetCurrentUserToolSchema.shape> = {
  name: "users_current",
  config: {
    description: "Retrieves the currently authenticated user's account information. Returns details about the user associated with the current API key or session.",
    inputSchema: GetCurrentUserToolSchema.shape,
  },
  execute: async ({ include }) => {
    try {
      const params = include ? { include } : undefined;
      const result = await getCurrentUser(params);
      return { content: [{ type: "text", text: JSON.stringify(result.user) }] };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to retrieve current user: ${errorMessage}`);
    }
  },
};

export const listUsersTool: McpTool<typeof ListUsersToolSchema.shape> = {
  name: "users_list",
  config: {
    description: "Retrieves a list of users from Redmine. Requires administrator privileges. Supports filtering by status, name, and group membership.",
    inputSchema: ListUsersToolSchema.shape,
  },
  execute: async (params) => {
    try {
      const result = await listUsers(params);
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
  name: "users_update",
  config: {
    description: "Updates an existing user in Redmine. Requires administrator privileges. All fields are optional - only provide fields to update.",
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
  name: "users_delete",
  config: {
    description: "Deletes a user from Redmine. Requires administrator privileges. Warning: This action is permanent and cannot be undone.",
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

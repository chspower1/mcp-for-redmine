import { listRoles, getRole } from "../api/roles.api";
import { ListRolesToolSchema, GetRoleToolSchema } from "../schema/role.schema";
import { McpTool } from "../types/types";

export const listRolesTool: McpTool<typeof ListRolesToolSchema.shape> = {
  name: "roles_list",
  config: {
    description: "Retrieves a list of all roles.",
    inputSchema: ListRolesToolSchema.shape,
  },
  execute: async () => {
    try {
      const result = await listRoles();
      return {
        content: [{ type: "text", text: JSON.stringify(result.roles) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list roles: ${errorMessage}`);
    }
  },
};

export const getRoleTool: McpTool<typeof GetRoleToolSchema.shape> = {
  name: "roles_get",
  config: {
    description: "Retrieves a single role by its ID.",
    inputSchema: GetRoleToolSchema.shape,
  },
  execute: async ({ id }) => {
    try {
      const result = await getRole(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result.role) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to retrieve role ${id}: ${errorMessage}`);
    }
  },
};

import { z } from "zod";
import { listRoles, getRole } from "../api/roles.api";
import { Tool } from "../types/types";

export const listRolesTool: Tool = {
  name: "redmine_list-roles",
  description: "Retrieves a list of all roles.",
  parameters: z.object({}),
  execute: async () => {
    try {
      const result = await listRoles();
      return result.roles;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list roles: ${errorMessage}`);
    }
  },
};

export const getRoleTool: Tool = {
  name: "redmine_get-role",
  description: "Retrieves a single role by its ID.",
  parameters: z.object({
    id: z.number().describe("The ID of the role to retrieve."),
  }),
  execute: async ({ id }) => {
    try {
      const result = await getRole(id);
      return result.role;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to retrieve role ${id}: ${errorMessage}`);
    }
  },
};

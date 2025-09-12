import {
  listProjectMemberships,
  createProjectMembership,
  updateMembership,
  deleteMembership,
  getMembership,
} from "@/api/memberships.api";
import {
  CreateProjectMembershipToolSchema,
  DeleteMembershipToolSchema,
  GetMembershipToolSchema,
  ListProjectMembershipsToolSchema,
  UpdateMembershipToolSchema,
} from "../schema/membership.schema";
import { McpTool } from "../types/types";

export const listProjectMembershipsTool: McpTool<typeof ListProjectMembershipsToolSchema.shape> = {
  name: "memberships_list_project_memberships",
  config: {
    description: "Returns the list of memberships for a given project.",
    inputSchema: ListProjectMembershipsToolSchema.shape,
  },
  execute: async ({ projectId, offset, limit }) => {
    try {
      const result = await listProjectMemberships(projectId, { offset, limit });
      return { content: [{ type: "text", text: JSON.stringify(result.memberships) }] };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list memberships for project ${projectId}: ${errorMessage}`);
    }
  },
};

export const getMembershipTool: McpTool<typeof GetMembershipToolSchema.shape> = {
  name: "memberships_get",
  config: {
    description: "Retrieves a single membership by its ID.",
    inputSchema: GetMembershipToolSchema.shape,
  },
  execute: async ({ membershipId }) => {
    try {
      const result = await getMembership(membershipId);
      return { content: [{ type: "text", text: JSON.stringify(result.membership) }] };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to retrieve membership ${membershipId}: ${errorMessage}`);
    }
  },
};

export const createProjectMembershipTool: McpTool<typeof CreateProjectMembershipToolSchema.shape> =
  {
    name: "memberships_create",
    config: {
      description: "Adds a member to a project.",
      inputSchema: CreateProjectMembershipToolSchema.shape,
    },
    execute: async ({ projectId, userId, roleIds }) => {
      try {
        const result = await createProjectMembership(projectId, {
          membership: { user_id: userId, role_ids: roleIds },
        });
        return { content: [{ type: "text", text: JSON.stringify(result.membership) }] };
      } catch (error: any) {
        const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
        throw new Error(`Failed to add member to project ${projectId}: ${errorMessage}`);
      }
    },
  };

export const updateMembershipTool: McpTool<typeof UpdateMembershipToolSchema.shape> = {
  name: "memberships_update",
  config: {
    description: "Updates a membership with new roles.",
    inputSchema: UpdateMembershipToolSchema.shape,
  },
  execute: async ({ membershipId, roleIds }) => {
    try {
      await updateMembership(membershipId, {
        membership: { role_ids: roleIds },
      });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              message: `Membership ${membershipId} updated successfully.`,
            }),
          },
        ],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to update membership ${membershipId}: ${errorMessage}`);
    }
  },
};

export const deleteMembershipTool: McpTool<typeof DeleteMembershipToolSchema.shape> = {
  name: "memberships_delete",
  config: {
    description: "Deletes a membership.",
    inputSchema: DeleteMembershipToolSchema.shape,
  },
  execute: async ({ membershipId }) => {
    try {
      await deleteMembership(membershipId);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              message: `Membership ${membershipId} deleted successfully.`,
            }),
          },
        ],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to delete membership ${membershipId}: ${errorMessage}`);
    }
  },
};

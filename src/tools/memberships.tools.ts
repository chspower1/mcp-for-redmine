import { z } from "zod";
import {
  listProjectMemberships,
  createProjectMembership,
  updateMembership,
  deleteMembership,
} from "../api/memberships.api";
import { Tool } from "../types/types";

export const listProjectMembershipsTool: Tool = {
  name: "redmine_list-project-memberships",
  description: "Returns the list of memberships for a given project.",
  parameters: z.object({
    projectId: z.union([z.string(), z.number()]).describe("The ID or identifier of the project."),
  }),
  execute: async ({ projectId }) => {
    try {
      const result = await listProjectMemberships(projectId);
      return result.memberships;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list memberships for project ${projectId}: ${errorMessage}`);
    }
  },
};

export const createProjectMembershipTool: Tool = {
  name: "redmine_create-project-membership",
  description: "Adds a member to a project.",
  parameters: z.object({
    projectId: z.union([z.string(), z.number()]).describe("The ID or identifier of the project."),
    userId: z.number().describe("The ID of the user to add."),
    roleIds: z.array(z.number()).describe("An array of role IDs to assign to the user."),
  }),
  execute: async ({ projectId, userId, roleIds }) => {
    try {
      const result = await createProjectMembership(projectId, {
        membership: { user_id: userId, role_ids: roleIds },
      });
      return result.membership;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to add member to project ${projectId}: ${errorMessage}`);
    }
  },
};

export const updateMembershipTool: Tool = {
  name: "redmine_update-membership",
  description: "Updates a membership with new roles.",
  parameters: z.object({
    membershipId: z.number().describe("The ID of the membership to update."),
    roleIds: z.array(z.number()).describe("The new array of role IDs."),
  }),
  execute: async ({ membershipId, roleIds }) => {
    try {
      await updateMembership(membershipId, {
        membership: { role_ids: roleIds },
      });
      return { success: true, message: `Membership ${membershipId} updated successfully.` };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to update membership ${membershipId}: ${errorMessage}`);
    }
  },
};

export const deleteMembershipTool: Tool = {
  name: "redmine_delete-membership",
  description: "Deletes a membership.",
  parameters: z.object({
    membershipId: z.number().describe("The ID of the membership to delete."),
  }),
  execute: async ({ membershipId }) => {
    try {
      await deleteMembership(membershipId);
      return { success: true, message: `Membership ${membershipId} deleted successfully.` };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to delete membership ${membershipId}: ${errorMessage}`);
    }
  },
};

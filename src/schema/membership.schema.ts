import { z } from "zod";
import { RedmineReferenceSchema, RedmineReference } from "./reference.schema";

// Base Membership Schema
export const RedmineMembershipSchema = z.object({
  id: z.number(),
  project: RedmineReferenceSchema,
  user: RedmineReferenceSchema.optional(),
  group: RedmineReferenceSchema.optional(),
  roles: z.array(RedmineReferenceSchema),
});

export type RedmineMembership = z.infer<typeof RedmineMembershipSchema>;

// Tool Parameter Schemas
export const ListProjectMembershipsToolSchema = z.object({
  projectId: z.union([z.string(), z.number()]).describe("The ID or identifier of the project."),
  offset: z.number().optional().describe("Offset for pagination."),
  limit: z.number().optional().describe("Number of memberships to return (default 25, max 100)."),
});

export const GetMembershipToolSchema = z.object({
  membershipId: z.number().describe("The ID of the membership to retrieve."),
});

export const CreateProjectMembershipToolSchema = z.object({
  projectId: z.union([z.string(), z.number()]).describe("The ID or identifier of the project."),
  userId: z.number().describe("The ID of the user to add."),
  roleIds: z.array(z.number()).describe("An array of role IDs to assign to the user."),
});

export const UpdateMembershipToolSchema = z.object({
  membershipId: z.number().describe("The ID of the membership to update."),
  roleIds: z.array(z.number()).describe("The new array of role IDs."),
});

export const DeleteMembershipToolSchema = z.object({
  membershipId: z.number().describe("The ID of the membership to delete."),
});

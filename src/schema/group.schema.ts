import { z } from "zod";
import { RedmineUser, RedmineUserSchema } from "./user.schema";
import { RedmineMembership, RedmineMembershipSchema } from "./membership.schema";

const BaseRedmineGroupSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type RedmineGroup = z.infer<typeof BaseRedmineGroupSchema> & {
  users?: RedmineUser[];
  memberships?: RedmineMembership[];
};

export const RedmineGroupSchema: z.ZodType<RedmineGroup> = BaseRedmineGroupSchema.extend({
  users: z.lazy(() => z.array(RedmineUserSchema)).optional(),
  memberships: z.lazy(() => z.array(RedmineMembershipSchema)).optional(),
});

// API Request Schemas
const GroupRequestObjectSchema = z.object({
  name: z.string(),
  user_ids: z.array(z.number()).optional(),
});

export const CreateGroupRequestSchema = z.object({
  group: GroupRequestObjectSchema,
});
export type CreateGroupPayload = z.infer<typeof CreateGroupRequestSchema>;

export const UpdateGroupRequestSchema = z.object({
  group: GroupRequestObjectSchema.partial(),
});
export type UpdateGroupPayload = z.infer<typeof UpdateGroupRequestSchema>;

export const AddUserToGroupRequestSchema = z.object({
  user_id: z.number(),
});
export type AddUserToGroupPayload = z.infer<typeof AddUserToGroupRequestSchema>;

// Tool Parameter Schemas
export const ListGroupsToolSchema = z.object({
  include: z
    .string()
    .optional()
    .describe("Comma-separated list of associations to include: 'users' (group members), 'memberships' (project memberships). Example: 'users,memberships'."),
});

export const GetGroupToolSchema = z.object({
  id: z.string().describe("The numeric ID of the group to retrieve."),
  include: z
    .string()
    .optional()
    .describe("Comma-separated list of associations to include: 'users' (group members with details), 'memberships' (project memberships). Example: 'users,memberships'."),
});

export const CreateGroupToolSchema = GroupRequestObjectSchema.extend({
  name: z.string().describe("The name of the new group. Must be unique across the system."),
  user_ids: z.array(z.number()).optional().describe("Array of user IDs to add to the group during creation. Users can also be added later using add_user_to_group."),
}).describe("Creates a new group. Requires administrator privileges. API Status: Alpha (v2.1).");

export const UpdateGroupToolSchema = UpdateGroupRequestSchema.shape.group
  .extend({
    id: z.string().describe("The numeric ID of the group to update."),
  })
  .describe("Updates an existing group. Requires administrator privileges. API Status: Alpha (v2.1).");

export const DeleteGroupToolSchema = z.object({
  id: z.string().describe("The numeric ID of the group to delete. Warning: This action is permanent and affects user permissions."),
});

export const AddUserToGroupToolSchema = z.object({
  group_id: z.string().describe("The numeric ID of the group to add the user to."),
  user_id: z.number().describe("The numeric ID of the user to add to the group."),
});

export const RemoveUserFromGroupToolSchema = z.object({
  group_id: z.string().describe("The numeric ID of the group to remove the user from."),
  user_id: z.string().describe("The numeric ID of the user to remove from the group."),
});

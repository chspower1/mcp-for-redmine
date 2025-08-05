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
export const ListGroupsToolSchema = z.object({});

export const GetGroupToolSchema = z.object({
  id: z.string().describe("The numeric ID of the group."),
  include: z
    .string()
    .optional()
    .describe("Comma-separated list of associations to include (e.g., 'users,memberships')."),
});

export const CreateGroupToolSchema = GroupRequestObjectSchema.extend({
  name: z.string().describe("The name of the new group."),
  user_ids: z.array(z.number()).optional().describe("Array of user IDs to add to the group."),
}).describe("Creates a new group.");

export const UpdateGroupToolSchema = UpdateGroupRequestSchema.shape.group
  .extend({
    id: z.string().describe("The ID of the group to update."),
  })
  .describe("Updates an existing group.");

export const DeleteGroupToolSchema = z.object({
  id: z.string().describe("The ID of the group to delete."),
});

export const AddUserToGroupToolSchema = z.object({
  group_id: z.string().describe("The ID of the group."),
  user_id: z.number().describe("The ID of the user to add."),
});

export const RemoveUserFromGroupToolSchema = z.object({
  group_id: z.string().describe("The ID of the group."),
  user_id: z.string().describe("The ID of the user to remove."),
});

import { z } from "zod";
import { RedmineReference, RedmineReferenceSchema } from "./reference.schema";
import { RedmineUser, RedmineUserSchema } from "./user.schema";
import { RedmineGroup, RedmineGroupSchema } from "./group.schema";
import { RedmineRole, RedmineRoleSchema } from "./role.schema";

const BaseRedmineMembershipSchema = z.object({
  id: z.number(),
  project: RedmineReferenceSchema,
  roles: z.array(RedmineRoleSchema),
});

export type RedmineMembership = z.infer<typeof BaseRedmineMembershipSchema> & {
  user?: RedmineUser;
  group?: RedmineGroup;
};

export const RedmineMembershipSchema: z.ZodType<RedmineMembership> =
  BaseRedmineMembershipSchema.extend({
    user: z.lazy(() => RedmineUserSchema).optional(),
    group: z.lazy(() => RedmineGroupSchema).optional(),
  });

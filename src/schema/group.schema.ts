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

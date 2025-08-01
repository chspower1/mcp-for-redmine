import { z } from "zod";

export const RedmineRoleSchema = z.object({
  id: z.number(),
  name: z.string(),
  inherited: z.boolean().optional(),
  assignable: z.boolean().optional(),
  permissions: z.array(z.string()).optional(),
});

export type RedmineRole = z.infer<typeof RedmineRoleSchema>;

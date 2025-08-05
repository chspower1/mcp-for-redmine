import { z } from "zod";

export const RedmineRoleSchema = z.object({
  id: z.number(),
  name: z.string(),
  inherited: z.boolean().optional(),
  assignable: z.boolean().optional(),
  permissions: z.array(z.string()).optional(),
});

export type RedmineRole = z.infer<typeof RedmineRoleSchema>;

// Tool Parameter Schemas
export const ListRolesToolSchema = z.object({});

export const GetRoleToolSchema = z.object({
  id: z.string().describe("The numeric ID of the role."),
});

import { z } from "zod";

export const RedmineRoleSchema = z.object({
  id: z.number(),
  name: z.string(),
  inherited: z.boolean().optional(),
  assignable: z.boolean().optional(),
  permissions: z.array(z.string()).optional(),
  // Visibility settings (available in detailed role view)
  issues_visibility: z.string().optional(),
  time_entries_visibility: z.string().optional(),
  users_visibility: z.string().optional(),
});

export type RedmineRole = z.infer<typeof RedmineRoleSchema>;

// Tool Parameter Schemas
export const ListRolesToolSchema = z.object({
  // No parameters needed for listing all roles
});

export const GetRoleToolSchema = z.object({
  id: z.string().describe("The numeric ID of the role to retrieve. Returns detailed permissions and visibility settings."),
});

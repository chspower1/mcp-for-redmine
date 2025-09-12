import { z } from "zod";

/**
 * Redmine Role schema (aligned with official REST API)
 *
 * Reference: https://www.redmine.org/projects/redmine/wiki/Rest_Roles
 * Endpoints:
 * - GET /roles.json           → returns list of roles (id, name only)
 * - GET /roles/:id.json       → returns detailed role including permissions and visibility settings
 *
 * Notes:
 * - The list endpoint returns only id and name; other fields are available on the show endpoint.
 * - The "inherited" flag is used in Memberships responses, not in Role objects; excluded here by design.
 */
export const RedmineRoleSchema = z.object({
  id: z.number(),
  name: z.string(),
  assignable: z.boolean().optional(),
  permissions: z.array(z.string()).optional(),
  // Visibility settings (available in detailed role view)
  issues_visibility: z
    .enum(["all", "default", "own"])
    .optional()
    .describe("Which issues are visible to this role: all, default, or own"),
  time_entries_visibility: z
    .enum(["all", "own"])
    .optional()
    .describe("Which time entries are visible: all or own"),
  users_visibility: z
    .enum(["all", "members_of_visible_projects", "own"])
    .optional()
    .describe("Which users are visible: all, members_of_visible_projects, or own"),
});

export type RedmineRole = z.infer<typeof RedmineRoleSchema>;

// Tool Parameter Schemas
export const ListRolesToolSchema = z
  .object({
    // No parameters needed for listing all roles
  })
  .describe("Retrieve all roles (list view returns id and name only)");

export const GetRoleToolSchema = z.object({
  id: z
    .number()
    .describe(
      "The numeric ID of the role to retrieve. Returns detailed permissions and visibility settings (show endpoint)."
    ),
});

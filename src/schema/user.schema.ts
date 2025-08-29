import { z } from "zod";
import { RedmineMembership, RedmineMembershipSchema } from "./membership.schema";
import { RedmineReference, RedmineReferenceSchema } from "./reference.schema";

// Base User Schema
const BaseRedmineUserSchema = z.object({
  id: z.number(),
  login: z.string(),
  admin: z.boolean().optional(),
  firstname: z.string(),
  lastname: z.string(),
  mail: z.string().email().optional(),
  created_on: z.string().datetime(),
  updated_on: z.string().datetime().optional(),
  last_login_on: z.string().datetime().optional().nullable(),
  passwd_changed_on: z.string().datetime().optional(),
  twofa_scheme: z.string().nullable().optional(),
  api_key: z.string().optional(),
  status: z.number().optional(),
  name: z.string().optional(),
});

export type RedmineUser = z.infer<typeof BaseRedmineUserSchema> & {
  memberships?: RedmineMembership[];
  groups?: RedmineReference[];
};

export const RedmineUserSchema: z.ZodType<RedmineUser> = BaseRedmineUserSchema.extend({
  memberships: z.lazy(() => z.array(RedmineMembershipSchema)).optional(),
  groups: z.lazy(() => z.array(RedmineReferenceSchema)).optional(),
});

// API Request Schemas
export const CreateUserRequestSchema = z.object({
  user: z.object({
    login: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    mail: z.string().email(),
    password: z.string().min(8).optional(),
    generate_password: z.boolean().optional(),
  }),
});

export const UpdateUserRequestSchema = z.object({
  user: z.object({
    login: z.string().optional(),
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    mail: z.string().email().optional(),
    password: z.string().min(8).optional(),
  }),
});

export type CreateUserPayload = z.infer<typeof CreateUserRequestSchema>;
export type UpdateUserPayload = z.infer<typeof UpdateUserRequestSchema>;

// Tool Parameter Schemas
export const CreateUserToolSchema = z.object({
  login: z.string().describe("The user's unique login name (username). This will be used for authentication."),
  firstname: z.string().describe("The user's first name."),
  lastname: z.string().describe("The user's last name."),
  mail: z
    .string()
    .email("This must be a valid email address.")
    .describe("The user's email address. Must be unique in the system."),
  password: z
    .string()
    .min(8)
    .optional()
    .describe(
      "The user's password. Must be at least 8 characters. Cannot be used together with 'generate_password'. Either password or generate_password must be provided."
    ),
  generate_password: z
    .boolean()
    .optional()
    .describe(
      "If true, Redmine will generate a random password and send it to the user's email. Cannot be used together with 'password'. Either password or generate_password must be provided."
    ),
  auth_source_id: z
    .number()
    .optional()
    .describe("Authentication source ID for external authentication (LDAP, etc.)."),
  mail_notification: z
    .string()
    .optional()
    .describe("Email notification option. Possible values depend on Redmine configuration."),
  admin: z
    .boolean()
    .optional()
    .describe("Whether the user should have administrator privileges. Default is false."),
  must_change_passwd: z
    .boolean()
    .optional()
    .describe("If true, the user will be required to change password on next login."),
});

export const GetUserToolSchema = z.object({
  id: z.string().describe("The numeric ID of the user to retrieve."),
  include: z
    .string()
    .optional()
    .describe("Comma-separated list of associations to include: 'memberships' (project memberships), 'groups' (group memberships)."),
});

export const ListUsersToolSchema = z.object({
  status: z
    .union([z.literal(1), z.literal(2), z.literal(3)])
    .optional()
    .describe("Filter users by status: 1=active (default), 2=registered, 3=locked."),
  name: z
    .string()
    .optional()
    .describe("Filter users by name. Searches in login, firstname, lastname, and email fields."),
  group_id: z
    .number()
    .optional()
    .describe("Filter users by group membership. Provide the group ID."),
  offset: z
    .number()
    .optional()
    .describe("Number of users to skip for pagination."),
  limit: z
    .number()
    .optional()
    .describe("Maximum number of users to return (default: 25, max: 100)."),
});

export const UpdateUserToolSchema = z.object({
  id: z.string().describe("The numeric ID of the user to update."),
  login: z.string().optional().describe("The user's new login name (username). Must be unique."),
  firstname: z.string().optional().describe("The user's new first name."),
  lastname: z.string().optional().describe("The user's new last name."),
  mail: z.string().email().optional().describe("The user's new email address. Must be unique."),
  password: z
    .string()
    .min(8)
    .optional()
    .describe("The user's new password. Must be at least 8 characters."),
  auth_source_id: z
    .number()
    .optional()
    .describe("Authentication source ID for external authentication."),
  mail_notification: z
    .string()
    .optional()
    .describe("Email notification option."),
  admin: z
    .boolean()
    .optional()
    .describe("Update administrator privileges."),
  must_change_passwd: z
    .boolean()
    .optional()
    .describe("Force password change on next login."),
});

export const DeleteUserToolSchema = z.object({
  id: z.string().describe("The numeric ID of the user to delete. Warning: This action is permanent and cannot be undone."),
});

export const GetCurrentUserToolSchema = z.object({
  include: z
    .string()
    .optional()
    .describe("Comma-separated list of associations to include: 'memberships' (project memberships), 'groups' (group memberships). Example: 'memberships,groups'."),
});

import { z } from "zod";
import { RedmineReferenceSchema } from "./reference.schema";

// Redmine REST API Custom Fields Schema
// Reference: https://www.redmine.org/projects/redmine/wiki/Rest_CustomFields
// - This schema prioritizes the official docs but allows unions/optionals to absorb version differences.
export const RedmineCustomFieldSchema = z.object({
  id: z.number().describe("Unique numeric identifier of the custom field"),
  name: z.string().describe("Human-readable name of the custom field"),
  // Some Redmine instances expose 'type' (e.g., 'IssueCustomField'), others 'customized_type' (e.g., 'issue').
  // We prefer 'customized_type' per docs while keeping 'type' for compatibility.
  customized_type: z
    .string()
    .describe("Object type this field applies to (issue, project, time_entry, user, etc.)"),
  type: z
    .string()
    .optional()
    .describe("Internal type name exposed by some versions (e.g., IssueCustomField)"),
  field_format: z
    .string()
    .describe("Field data format: string, text, int, float, date, bool, list, user, version, etc."),
  regexp: z
    .string()
    .nullable()
    .optional()
    .describe("Regular expression for value validation (null if none)"),
  min_length: z
    .number()
    .nullable()
    .optional()
    .describe("Minimum length for text fields (null if none)"),
  max_length: z
    .number()
    .nullable()
    .optional()
    .describe("Maximum length for text fields (null if none)"),
  is_required: z.boolean().describe("Whether it is required on create/update"),
  is_filter: z.boolean().describe("Whether it can be used as a filter in queries"),
  searchable: z.boolean().describe("Whether values are included in text search"),
  multiple: z.boolean().describe("Whether multiple values are accepted (mainly for list)"),
  default_value: z.any().optional().describe("Default value applied to new objects"),
  visible: z.boolean().describe("Whether the field is visible to users (vs internal)"),
  trackers: z
    .array(RedmineReferenceSchema)
    .optional()
    .describe("Enabled trackers for issue custom fields"),
  roles: z.array(RedmineReferenceSchema).optional().describe("Roles that can view/edit this field"),
  // Depending on docs/version, possible_values may be an array of strings or an array of {value,label?}.
  possible_values: z
    .union([
      z.array(z.string()),
      z.array(
        z.object({
          value: z.string().describe("Internal value of the option"),
          label: z.string().optional().describe("Display label of the option (optional)"),
        })
      ),
    ])
    .optional()
    .describe("Available options for list format"),
});
export type RedmineCustomField = z.infer<typeof RedmineCustomFieldSchema>;

// Tool Parameter Schemas for Custom Fields API
export const ListCustomFieldsToolSchema = z
  .object({
    // No parameters - requires admin privileges, returns all system custom field definitions
  })
  .describe(
    "Retrieve all custom field definitions. Requires admin privileges. Docs: https://www.redmine.org/projects/redmine/wiki/Rest_CustomFields"
  );

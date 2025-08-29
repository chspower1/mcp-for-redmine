import { z } from "zod";
import { RedmineReferenceSchema } from "./reference.schema";

// Base Custom Field Schema for Redmine (v2.4 Alpha)
export const RedmineCustomFieldSchema = z.object({
  id: z.number().describe("Unique numeric identifier for the custom field"),
  name: z.string().describe("Human-readable custom field name"),
  customized_type: z.string().describe("Object type this field applies to (issue, project, time_entry, user, etc.)"),
  field_format: z.string().describe("Field data format: string, text, int, float, date, bool, list, user, version, etc."),
  regexp: z.string().optional().describe("Regular expression pattern for field validation"),
  min_length: z.number().nullable().optional().describe("Minimum required length for text fields"),
  max_length: z.number().nullable().optional().describe("Maximum allowed length for text fields"),
  is_required: z.boolean().describe("Whether this field is mandatory when creating/updating objects"),
  is_filter: z.boolean().describe("Whether this field can be used as a filter in search/queries"),
  searchable: z.boolean().describe("Whether field values are included in text search"),
  multiple: z.boolean().describe("Whether field accepts multiple values (for list-type fields)"),
  default_value: z.any().optional().describe("Default value assigned to new objects"),
  visible: z.boolean().describe("Whether field is visible to users (vs. internal use)"),
  trackers: z.array(RedmineReferenceSchema).optional().describe("Tracker types this field is enabled for (issue fields only)"),
  roles: z.array(RedmineReferenceSchema).optional().describe("User roles that can view/edit this field"),
  possible_values: z
    .array(
      z.object({
        label: z.string().describe("Display label for list option"),
        value: z.string().describe("Internal value for list option"),
      })
    )
    .optional().describe("Available options for list-type custom fields"),
});
export type RedmineCustomField = z.infer<typeof RedmineCustomFieldSchema>;

// Tool Parameter Schemas for Custom Fields API (v2.4 Alpha)
export const ListCustomFieldsToolSchema = z.object({
  // No parameters needed - returns all custom field definitions (admin only)
}).describe("Retrieve all custom field definitions with complete configuration details");

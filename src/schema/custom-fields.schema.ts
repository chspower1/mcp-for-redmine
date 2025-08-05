import { z } from "zod";
import { RedmineReferenceSchema } from "./reference.schema";

// Base Custom Field Schema for Redmine
export const RedmineCustomFieldSchema = z.object({
  id: z.number(),
  name: z.string(),
  customized_type: z.string(), // e.g., "issue"
  field_format: z.string(), // e.g., "string", "list", "date", "bool"
  regexp: z.string().optional(),
  min_length: z.number().nullable().optional(),
  max_length: z.number().nullable().optional(),
  is_required: z.boolean(),
  is_filter: z.boolean(),
  searchable: z.boolean(),
  multiple: z.boolean(),
  default_value: z.any().optional(),
  visible: z.boolean(),
  trackers: z.array(RedmineReferenceSchema).optional(),
  roles: z.array(RedmineReferenceSchema).optional(),
  possible_values: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    )
    .optional(),
});
export type RedmineCustomField = z.infer<typeof RedmineCustomFieldSchema>;

// Tool Parameter Schemas
export const ListCustomFieldsToolSchema = z.object({});

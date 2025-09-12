import { z } from "zod";

/**
 * Redmine Enumerations schemas aligned with the official REST API.
 *
 * References (REST):
 * - GET /enumerations/issue_priorities.json         -> { issue_priorities: IssuePriority[] }
 * - GET /enumerations/time_entry_activities.json    -> { time_entry_activities: TimeEntryActivity[] }
 * - GET /enumerations/document_categories.json      -> { document_categories: DocumentCategory[] }
 *
 * Field notes per Redmine wiki:
 * - Issue Priority: id:number, name:string, is_default:boolean
 * - Time Entry Activity: id:number, name:string, active:boolean
 * - Document Category: id:number, name:string
 *
 * We use .passthrough() on each schema to remain forward-compatible with
 * additional fields provided by plugins or future Redmine versions.
 */

/** Issue Priorities enumeration (GET /enumerations/issue_priorities.json) */
export const IssuePriorityEnumerationSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    is_default: z.boolean(),
  })
  .passthrough();
export type IssuePriorityEnumeration = z.infer<typeof IssuePriorityEnumerationSchema>;

/** Time Entry Activities enumeration (GET /enumerations/time_entry_activities.json) */
export const TimeEntryActivityEnumerationSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    active: z.boolean(),
  })
  .passthrough();
export type TimeEntryActivityEnumeration = z.infer<typeof TimeEntryActivityEnumerationSchema>;

/** Document Categories enumeration (GET /enumerations/document_categories.json) */
export const DocumentCategoryEnumerationSchema = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .passthrough();
export type DocumentCategoryEnumeration = z.infer<typeof DocumentCategoryEnumerationSchema>;

/**
 * Backward-compatible generic enumeration schema.
 * Some endpoints may share the minimal shape (id, name). Use this when a
 * specific enumeration type is not necessary. Kept permissive for compatibility.
 */
export const RedmineEnumerationSchema = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .passthrough();
export type RedmineEnumeration = z.infer<typeof RedmineEnumerationSchema>;

// Tool Parameter Schemas for listing enumerations (no inputs required)
export const ListIssuePrioritiesToolSchema = z.object({});
export const ListTimeEntryActivitiesToolSchema = z.object({});
export const ListDocumentCategoriesToolSchema = z.object({});

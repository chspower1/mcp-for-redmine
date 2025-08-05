import { z } from "zod";

export const RedmineEnumerationSchema = z.object({
  id: z.number(),
  name: z.string(),
  is_default: z.boolean(),
});
export type RedmineEnumeration = z.infer<typeof RedmineEnumerationSchema>;

// Tool Parameter Schemas for listing enumerations
export const ListIssuePrioritiesToolSchema = z.object({});
export const ListTimeEntryActivitiesToolSchema = z.object({});

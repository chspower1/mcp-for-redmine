import { z } from "zod";

// Base Tracker Schema for Redmine
export const RedmineTrackerSchema = z.object({
  id: z.number(),
  name: z.string(),
  default_status: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .optional(),
});
export type RedmineTracker = z.infer<typeof RedmineTrackerSchema>;

// Tool Parameter Schemas
export const ListTrackersToolSchema = z.object({});

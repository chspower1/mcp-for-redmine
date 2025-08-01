import { z } from "zod";

// Defines the schema for a Redmine tracker.
export const RedmineTrackerSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type RedmineTracker = z.infer<typeof RedmineTrackerSchema>;

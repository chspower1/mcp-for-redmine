import { z } from "zod";

// Base Tracker Schema for Redmine (v1.3 Alpha)
export const RedmineTrackerSchema = z.object({
  id: z.number().describe("Unique numeric identifier for the tracker"),
  name: z.string().describe("Human-readable tracker name (e.g., 'Defect', 'Feature', 'Support')"),
  default_status: z
    .object({
      id: z.number().describe("Default status ID for new issues created with this tracker"),
      name: z.string().describe("Default status name (e.g., 'New', 'Open')"),
    })
    .optional()
    .describe("Default issue status assigned when creating new issues with this tracker"),
  description: z.string().optional().describe("Tracker description text (available since Redmine v4.2.0)"),
  enabled_standard_fields: z.array(z.string()).optional().describe("List of enabled standard fields like 'assigned_to_id', 'category_id' (available since Redmine v5.0.0)"),
});
export type RedmineTracker = z.infer<typeof RedmineTrackerSchema>;

// Tool Parameter Schemas for Trackers API (v1.3 Alpha)
export const ListTrackersToolSchema = z.object({
  // No parameters needed - returns all available trackers
}).describe("Retrieve complete list of system trackers with their configuration");

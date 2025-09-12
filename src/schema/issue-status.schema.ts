import { z } from "zod";

/**
 * Redmine Issue Status schema (aligned with official REST API)
 *
 * Reference: https://www.redmine.org/projects/redmine/wiki/Rest_IssueStatuses
 * Endpoint: GET /issue_statuses.json
 * Notes:
 * - Response items include: id, name, is_closed
 * - Workflow transition rules are configured separately and not included here
 */

// Base Issue Status Schema for Redmine (v1.3 Alpha)
export const RedmineIssueStatusSchema = z.object({
  id: z.number().describe("Unique numeric identifier for the issue status"),
  name: z
    .string()
    .describe("Human-readable status name (e.g., 'New', 'In Progress', 'Resolved', 'Closed')"),
  is_closed: z
    .boolean()
    .describe("Whether this status represents a closed/completed state for issues"),
});
export type RedmineIssueStatus = z.infer<typeof RedmineIssueStatusSchema>;

// Tool Parameter Schemas for Issue Statuses API (v1.3 Alpha)
export const ListIssueStatusesToolSchema = z
  .object({
    // No parameters needed - returns all configured issue statuses
  })
  .describe("Retrieve complete list of system issue statuses and their properties");

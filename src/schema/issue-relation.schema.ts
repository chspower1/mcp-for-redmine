import { z } from "zod";

// Base Issue Relation Schema for Redmine
export const RedmineIssueRelationSchema = z.object({
  id: z.number(),
  issue_id: z.number(),
  issue_to_id: z.number(),
  relation_type: z.string(),
  delay: z.number().nullable(),
});
export type RedmineIssueRelation = z.infer<typeof RedmineIssueRelationSchema>;

// API Request Schemas
const IssueRelationRequestObjectSchema = z.object({
  issue_to_id: z.number(),
  relation_type: z.enum([
    "relates",
    "duplicates",
    "duplicated_by",
    "blocks",
    "blocked_by",
    "precedes",
    "follows",
    "copied_to",
    "copied_from",
  ]),
  delay: z.number().optional(),
});

export const CreateIssueRelationRequestSchema = z.object({
  relation: IssueRelationRequestObjectSchema,
});
export type CreateIssueRelationPayload = z.infer<typeof CreateIssueRelationRequestSchema>;

// Tool Parameter Schemas
export const ListIssueRelationsToolSchema = z.object({
  issue_id: z.string().describe("The ID of the issue to list relations for."),
});

export const GetIssueRelationToolSchema = z.object({
  id: z.string().describe("The numeric ID of the issue relation."),
});

export const CreateIssueRelationToolSchema = IssueRelationRequestObjectSchema.extend({
  issue_id: z.string().describe("The ID of the issue to create the relation from."),
}).describe("Creates a new relation for an issue.");

export const DeleteIssueRelationToolSchema = z.object({
  id: z.string().describe("The ID of the issue relation to delete."),
});

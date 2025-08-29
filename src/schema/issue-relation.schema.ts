import { z } from "zod";

// Base Issue Relation Schema for Redmine (v1.3 Alpha)
export const RedmineIssueRelationSchema = z.object({
  id: z.number().describe("Unique numeric identifier for the issue relation"),
  issue_id: z.number().describe("Source issue ID in the relationship"),
  issue_to_id: z.number().describe("Target issue ID in the relationship"),
  relation_type: z.string().describe("Type of relationship: relates, duplicates, blocks, precedes, follows, etc."),
  delay: z.number().nullable().describe("Optional delay in days for precedes/follows relations"),
});
export type RedmineIssueRelation = z.infer<typeof RedmineIssueRelationSchema>;

// API Request Schemas for Issue Relations (v1.3 Alpha)
const IssueRelationRequestObjectSchema = z.object({
  issue_to_id: z.number().describe("Target issue ID to create relationship with (required)"),
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
  ]).describe("Type of relationship to create (default: relates)"),
  delay: z.number().optional().describe("Delay in days for precedes/follows relations"),
});

export const CreateIssueRelationRequestSchema = z.object({
  relation: IssueRelationRequestObjectSchema,
});
export type CreateIssueRelationPayload = z.infer<typeof CreateIssueRelationRequestSchema>;

// Tool Parameter Schemas for Issue Relations API (v1.3 Alpha)
export const ListIssueRelationsToolSchema = z.object({
  issue_id: z.string().describe("The numeric ID of the issue to list all relationships for"),
}).describe("Retrieve all relationships for an issue including dependencies and associations");

export const GetIssueRelationToolSchema = z.object({
  id: z.string().describe("The numeric ID of the issue relation to retrieve"),
}).describe("Retrieve detailed information about a specific issue relationship");

export const CreateIssueRelationToolSchema = IssueRelationRequestObjectSchema.extend({
  issue_id: z.string().describe("The numeric ID of the source issue to create the relation from"),
}).describe("Create a new relationship between issues for dependency tracking and workflow management");

export const DeleteIssueRelationToolSchema = z.object({
  id: z.string().describe("The numeric ID of the issue relation to delete"),
}).describe("Remove an issue relationship without affecting the related issues themselves");

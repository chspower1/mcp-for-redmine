import { z } from "zod";
import { RedmineReferenceSchema } from "./reference.schema";

// Base Issue Category Schema for Redmine (v1.3 Alpha)
export const RedmineIssueCategorySchema = z.object({
  id: z.number().describe("Unique numeric identifier for the issue category"),
  project: RedmineReferenceSchema.describe("Project this category belongs to"),
  name: z.string().describe("Human-readable category name (must be unique within project)"),
  assigned_to: RedmineReferenceSchema.optional().describe("Optional user automatically assigned to issues in this category"),
});
export type RedmineIssueCategory = z.infer<typeof RedmineIssueCategorySchema>;

// API Request Schemas for Issue Categories (v1.3 Alpha)
const IssueCategoryRequestObjectSchema = z.object({
  name: z.string().describe("Category name (required, must be unique within project)"),
  assigned_to_id: z.number().optional().describe("User ID to automatically assign issues in this category"),
});

export const CreateIssueCategoryRequestSchema = z.object({
  issue_category: IssueCategoryRequestObjectSchema,
});
export type CreateIssueCategoryPayload = z.infer<typeof CreateIssueCategoryRequestSchema>;

export const UpdateIssueCategoryRequestSchema = z.object({
  issue_category: IssueCategoryRequestObjectSchema.partial(),
});
export type UpdateIssueCategoryPayload = z.infer<typeof UpdateIssueCategoryRequestSchema>;

// Tool Parameter Schemas for Issue Categories API (v1.3 Alpha)
export const ListIssueCategoriesToolSchema = z.object({
  project_id: z
    .union([z.string(), z.number()])
    .describe("The numeric ID or string identifier of the project to list issue categories for"),
}).describe("Retrieve all issue categories configured for a specific project");

export const GetIssueCategoryToolSchema = z.object({
  id: z.string().describe("The numeric ID of the issue category to retrieve detailed information for"),
}).describe("Retrieve detailed information about a specific issue category");

export const CreateIssueCategoryToolSchema = IssueCategoryRequestObjectSchema.extend({
  project_id: z
    .union([z.string(), z.number()])
    .describe("The numeric ID or string identifier of the project to create the category in"),
}).describe("Create a new issue category for organizing and classifying project issues");

export const UpdateIssueCategoryToolSchema = UpdateIssueCategoryRequestSchema.shape.issue_category
  .extend({
    id: z.string().describe("The numeric ID of the issue category to update"),
  })
  .describe("Update an existing issue category's name or assigned user configuration");

export const DeleteIssueCategoryToolSchema = z.object({
  id: z.string().describe("The numeric ID of the issue category to delete"),
  reassign_to_id: z.number().optional().describe("Optional category ID to reassign existing issues to before deletion"),
}).describe("Delete an issue category with optional issue reassignment");

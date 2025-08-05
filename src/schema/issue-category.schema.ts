import { z } from "zod";
import { RedmineReferenceSchema } from "./reference.schema";

// Base Issue Category Schema for Redmine
export const RedmineIssueCategorySchema = z.object({
  id: z.number(),
  project: RedmineReferenceSchema,
  name: z.string(),
  assigned_to: RedmineReferenceSchema.optional(),
});
export type RedmineIssueCategory = z.infer<typeof RedmineIssueCategorySchema>;

// API Request Schemas
const IssueCategoryRequestObjectSchema = z.object({
  name: z.string(),
  assigned_to_id: z.number().optional(),
});

export const CreateIssueCategoryRequestSchema = z.object({
  issue_category: IssueCategoryRequestObjectSchema,
});
export type CreateIssueCategoryPayload = z.infer<typeof CreateIssueCategoryRequestSchema>;

export const UpdateIssueCategoryRequestSchema = z.object({
  issue_category: IssueCategoryRequestObjectSchema.partial(),
});
export type UpdateIssueCategoryPayload = z.infer<typeof UpdateIssueCategoryRequestSchema>;

// Tool Parameter Schemas
export const ListIssueCategoriesToolSchema = z.object({
  project_id: z
    .union([z.string(), z.number()])
    .describe("The ID or identifier of the project to list categories for."),
});

export const GetIssueCategoryToolSchema = z.object({
  id: z.string().describe("The numeric ID of the issue category."),
});

export const CreateIssueCategoryToolSchema = IssueCategoryRequestObjectSchema.extend({
  project_id: z
    .union([z.string(), z.number()])
    .describe("The ID or identifier of the project to create the category in."),
}).describe("Creates a new issue category for a project.");

export const UpdateIssueCategoryToolSchema = UpdateIssueCategoryRequestSchema.shape.issue_category
  .extend({
    id: z.string().describe("The ID of the issue category to update."),
  })
  .describe("Updates an existing issue category.");

export const DeleteIssueCategoryToolSchema = z.object({
  id: z.string().describe("The ID of the issue category to delete."),
});

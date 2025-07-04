import { z } from "zod";
import {
  listIssueRelations,
  createIssueRelation,
  deleteRelation,
} from "../api/issue-relations.api";
import { Tool } from "../types/types";

export const listIssueRelationsTool: Tool = {
  name: "redmine_list-issue-relations",
  description: "Lists relations for a given issue.",
  parameters: z.object({
    issueId: z.number().describe("The ID of the issue."),
  }),
  execute: async ({ issueId }) => {
    try {
      const result = await listIssueRelations(issueId);
      return result.relations;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list relations for issue ${issueId}: ${errorMessage}`);
    }
  },
};

export const createIssueRelationTool: Tool = {
  name: "redmine_create-issue-relation",
  description: "Creates a new relation between two issues.",
  parameters: z.object({
    issueId: z.number().describe("The ID of the issue to create a relation from."),
    issueToId: z.number().describe("The ID of the issue to relate to."),
    relationType: z
      .enum(["relates", "duplicates", "blocks", "precedes", "follows"])
      .describe("The type of the relation."),
    delay: z.number().optional().describe('The delay in days for a "precedes" relation.'),
  }),
  execute: async ({ issueId, issueToId, relationType, delay }) => {
    try {
      const result = await createIssueRelation(issueId, {
        relation: { issue_to_id: issueToId, relation_type: relationType, delay },
      });
      return result.relation;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to create relation for issue ${issueId}: ${errorMessage}`);
    }
  },
};

export const deleteRelationTool: Tool = {
  name: "redmine_delete-relation",
  description: "Deletes an issue relation.",
  parameters: z.object({
    relationId: z.number().describe("The ID of the relation to delete."),
  }),
  execute: async ({ relationId }) => {
    try {
      await deleteRelation(relationId);
      return { success: true, message: `Relation ${relationId} deleted successfully.` };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to delete relation ${relationId}: ${errorMessage}`);
    }
  },
};

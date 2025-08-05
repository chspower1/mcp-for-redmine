import {
  createIssueRelation,
  deleteIssueRelation,
  listIssueRelations,
} from "../api/issue-relations.api";
import {
  CreateIssueRelationToolSchema,
  DeleteIssueRelationToolSchema,
  ListIssueRelationsToolSchema,
} from "../schema/issue-relation.schema";
import { McpTool } from "../types/types";

export const listIssueRelationsTool: McpTool<typeof ListIssueRelationsToolSchema.shape> = {
  name: "issue_relations_list",
  config: {
    description: "Retrieves a list of relations for a given issue.",
    inputSchema: ListIssueRelationsToolSchema.shape,
  },
  execute: async ({ issue_id }) => {
    try {
      const result = await listIssueRelations(issue_id);
      return {
        content: [{ type: "text", text: JSON.stringify(result.relations) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list issue relations: ${errorMessage}`);
    }
  },
};

export const createIssueRelationTool: McpTool<typeof CreateIssueRelationToolSchema.shape> = {
  name: "issue_relations_create",
  config: {
    description: "Creates a new relation for an issue.",
    inputSchema: CreateIssueRelationToolSchema.shape,
  },
  execute: async ({ issue_id, ...relationData }) => {
    const payload = { relation: relationData };
    try {
      const result = await createIssueRelation(issue_id, payload);
      return {
        content: [{ type: "text", text: JSON.stringify(result.relation) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to create issue relation: ${errorMessage}`);
    }
  },
};

export const deleteIssueRelationTool: McpTool<typeof DeleteIssueRelationToolSchema.shape> = {
  name: "issue_relations_delete",
  config: {
    description: "Deletes an issue relation.",
    inputSchema: DeleteIssueRelationToolSchema.shape,
  },
  execute: async ({ id }) => {
    try {
      await deleteIssueRelation(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              message: `Issue relation ${id} deleted successfully.`,
            }),
          },
        ],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to delete issue relation: ${errorMessage}`);
    }
  },
};

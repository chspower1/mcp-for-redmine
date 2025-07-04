import { axiosInstance } from "../utils/axios.util";
import { RedmineRelation } from "../types/types";

// Payloads
interface RelationCreatePayload {
  relation: {
    issue_to_id: number;
    relation_type: "relates" | "duplicates" | "blocks" | "precedes" | "follows" | string;
    delay?: number;
  };
}

// Responses
interface RelationListResponse {
  relations: RedmineRelation[];
}

interface RelationResponse {
  relation: RedmineRelation;
}

/**
 * Lists relations for a given issue.
 * @param issueId The ID of the issue.
 */
export const listIssueRelations = async (issueId: number): Promise<RelationListResponse> => {
  const response = await axiosInstance.get(`/issues/${issueId}/relations.json`);
  return response.data;
};

/**
 * Creates a new relation for an issue.
 * @param issueId The ID of the issue to create a relation from.
 * @param relationData The relation details.
 */
export const createIssueRelation = async (
  issueId: number,
  relationData: RelationCreatePayload
): Promise<RelationResponse> => {
  const response = await axiosInstance.post(`/issues/${issueId}/relations.json`, relationData);
  return response.data;
};

/**
 * Deletes a relation.
 * @param id The ID of the relation to delete.
 */
export const deleteRelation = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/relations/${id}.json`);
};

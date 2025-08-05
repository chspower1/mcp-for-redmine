import { axiosInstance } from "../utils/axios.util";
import { CreateIssueRelationPayload, RedmineIssueRelation } from "../schema/issue-relation.schema";

interface IssueRelationListResponse {
  relations: RedmineIssueRelation[];
}

interface IssueRelationResponse {
  relation: RedmineIssueRelation;
}

/**
 * Retrieves a list of relations for a given issue.
 * @param issueId The ID of the issue.
 */
export const listIssueRelations = async (issueId: string): Promise<IssueRelationListResponse> => {
  const response = await axiosInstance.get(`/issues/${issueId}/relations.json`);
  return response.data;
};

/**
 * Creates a new relation for a given issue.
 * @param issueId The ID of the issue to create the relation from.
 * @param relationData The data for the new relation.
 */
export const createIssueRelation = async (
  issueId: string,
  relationData: CreateIssueRelationPayload
): Promise<IssueRelationResponse> => {
  const response = await axiosInstance.post(`/issues/${issueId}/relations.json`, relationData);
  return response.data;
};

/**
 * Deletes an issue relation by its ID.
 * @param id The ID of the relation to delete.
 */
export const deleteIssueRelation = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/relations/${id}.json`);
};

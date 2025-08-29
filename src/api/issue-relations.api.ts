import { axiosInstance } from "@/utils/axios.util";
import { CreateIssueRelationPayload, RedmineIssueRelation } from "@/schema/issue-relation.schema";

interface IssueRelationListResponse {
  relations: RedmineIssueRelation[];
}

interface IssueRelationResponse {
  relation: RedmineIssueRelation;
}

/**
 * Retrieves a list of all relations for a given issue.
 * 
 * **Note**: 
 * - API Status: Alpha (v1.3) - Major functionality in place, may change
 * - Returns both incoming and outgoing relationships
 * - Shows relation types, target issues, and optional delay values
 * 
 * Response includes:
 * - Relation ID and type (relates, blocks, precedes, etc.)
 * - Source and target issue IDs
 * - Optional delay value for time-based relations
 * 
 * @param issueId - The numeric ID of the issue to list relations for
 * @returns Promise containing the list of issue relationships
 */
export const listIssueRelations = async (issueId: string): Promise<IssueRelationListResponse> => {
  const response = await axiosInstance.get(`/issues/${issueId}/relations.json`);
  return response.data;
};

/**
 * Creates a new relationship between issues.
 * 
 * **Note**: 
 * - API Status: Alpha (v1.3) - Major functionality in place, may change
 * - Requires edit permission on the source issue
 * - Some relation types create bidirectional relationships
 * 
 * Required fields:
 * - issue_to_id: Target issue ID for the relationship
 * - relation_type: Type of relationship (default: "relates")
 * 
 * Optional fields:
 * - delay: Days delay for precedes/follows relations
 * 
 * Relation types:
 * - relates: General association
 * - duplicates/duplicated_by: Duplicate issue markers
 * - blocks/blocked_by: Blocking dependencies
 * - precedes/follows: Sequential dependencies with optional delay
 * - copied_to/copied_from: Issue copy relationships
 * 
 * @param issueId - The numeric ID of the source issue
 * @param relationData - The relation data containing target issue and type
 * @returns Promise containing the created issue relation information
 * @throws 422 Unprocessable Entity if validation fails
 */
export const createIssueRelation = async (
  issueId: string,
  relationData: CreateIssueRelationPayload
): Promise<IssueRelationResponse> => {
  const response = await axiosInstance.post(`/issues/${issueId}/relations.json`, relationData);
  return response.data;
};

/**
 * Removes an issue relationship.
 * 
 * **Note**: 
 * - API Status: Alpha (v1.3) - Major functionality in place, may change
 * - Requires edit permission on the source issue
 * - Removes bidirectional relationships completely
 * - Does not affect the related issues themselves
 * 
 * @param id - The numeric ID of the issue relation to delete
 * @returns Promise that resolves when the deletion is successful
 */
export const deleteIssueRelation = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/relations/${id}.json`);
};

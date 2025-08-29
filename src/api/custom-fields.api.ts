import { axiosInstance } from "@/utils/axios.util";
import { RedmineCustomField } from "@/schema/custom-fields.schema";

interface CustomFieldListResponse {
  custom_fields: RedmineCustomField[];
}

/**
 * Retrieves a list of all custom field definitions.
 * 
 * **Note**: 
 * - API Status: Alpha (v2.4) - Major functionality in place, may change
 * - Requires administrator privileges
 * - Returns complete custom field configurations for all object types
 * 
 * Response includes:
 * - Field ID, name, and customized type (issue, project, time_entry, etc.)
 * - Field format (string, list, date, bool, etc.) and validation rules
 * - Visibility settings, tracker associations, and role permissions
 * - Default values and possible values for list-type fields
 * - Required status, filter capability, and searchability settings
 * 
 * @returns Promise containing the complete list of system custom field definitions
 */
export const listCustomFields = async (): Promise<CustomFieldListResponse> => {
  const response = await axiosInstance.get("/custom_fields.json");
  return response.data;
};

import { axiosInstance } from "@/utils/axios.util";
import { RedmineCustomField } from "@/schema/custom-fields.schema";

interface CustomFieldListResponse {
  custom_fields: RedmineCustomField[];
}

/**
 * Retrieves a list of all custom field definitions.
 *
 * Docs: https://www.redmine.org/projects/redmine/wiki/Rest_CustomFields
 * - Requires admin privileges
 * - Returns all system custom field configurations
 * - Includes list options, visibility, required flag, search/filter capabilities, etc.
 *
 * Response fields (summary): id, name, customized_type, field_format, regexp, min_length, max_length,
 * is_required, is_filter, searchable, multiple, default_value, visible, trackers, roles, possible_values
 *
 * @returns System custom field definitions
 */
export const listCustomFields = async (): Promise<CustomFieldListResponse> => {
  const response = await axiosInstance.get("/custom_fields.json");
  return response.data;
};

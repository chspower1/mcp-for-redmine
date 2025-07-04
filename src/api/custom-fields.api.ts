import { axiosInstance } from "../utils/axios.util";
import { RedmineCustomField } from "../types/types";

// Response
interface CustomFieldListResponse {
  custom_fields: RedmineCustomField[];
}

/**
 * Retrieves a list of all custom fields.
 */
export const listCustomFields = async (): Promise<CustomFieldListResponse> => {
  const response = await axiosInstance.get("/custom_fields.json");
  return response.data;
};

import { z } from "zod";
import { listCustomFields } from "../api/custom-fields.api";
import { Tool } from "../types/types";

export const listCustomFieldsTool: Tool = {
  name: "redmine_list-custom-fields",
  description: "Retrieves a list of all custom fields.",
  parameters: z.object({}),
  execute: async () => {
    try {
      const result = await listCustomFields();
      return result.custom_fields;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list custom fields: ${errorMessage}`);
    }
  },
};

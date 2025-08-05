import { listCustomFields } from "../api/custom-fields.api";
import { ListCustomFieldsToolSchema } from "../schema/custom-fields.schema";
import { McpTool } from "../types/types";

export const listCustomFieldsTool: McpTool<typeof ListCustomFieldsToolSchema.shape> = {
  name: "custom_fields_list",
  config: {
    description: "Retrieves a list of all custom fields.",
    inputSchema: ListCustomFieldsToolSchema.shape,
  },
  execute: async () => {
    try {
      const result = await listCustomFields();
      return {
        content: [{ type: "text", text: JSON.stringify(result.custom_fields) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to list custom fields: ${errorMessage}`);
    }
  },
};

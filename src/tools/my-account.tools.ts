import { getMyAccount } from "@/api/my-account.api";
import { GetMyAccountToolSchema } from "@/schema/my-account.schema";
import { McpTool } from "@/types/types";

export const getMyAccountTool: McpTool<typeof GetMyAccountToolSchema.shape> = {
  name: "my_account_get",
  config: {
    description: "Retrieves the currently logged-in user account from Redmine.",
    inputSchema: GetMyAccountToolSchema.shape,
  },
  execute: async (params) => {
    try {
      const result = await getMyAccount(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result.user) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to retrieve current user account: ${errorMessage}`);
    }
  },
};

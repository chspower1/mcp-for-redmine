import { getAttachment, deleteAttachment } from "../api/attachments.api";
import { GetAttachmentToolSchema, DeleteAttachmentToolSchema } from "../schema/attachment.schema";
import { McpTool } from "../types/types";

export const getAttachmentTool: McpTool<typeof GetAttachmentToolSchema.shape> = {
  name: "attachments_get",
  config: {
    description: "Retrieves the details of an attachment by its ID.",
    inputSchema: GetAttachmentToolSchema.shape,
  },
  execute: async ({ id }) => {
    try {
      const result = await getAttachment(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result.attachment) }],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to retrieve attachment ${id}: ${errorMessage}`);
    }
  },
};

export const deleteAttachmentTool: McpTool<typeof DeleteAttachmentToolSchema.shape> = {
  name: "attachments_delete",
  config: {
    description: "Deletes an attachment by its ID.",
    inputSchema: DeleteAttachmentToolSchema.shape,
  },
  execute: async ({ id }) => {
    try {
      await deleteAttachment(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              message: `Attachment ${id} deleted successfully.`,
            }),
          },
        ],
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to delete attachment ${id}: ${errorMessage}`);
    }
  },
};

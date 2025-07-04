import { z } from "zod";
import { getAttachment, deleteAttachment, uploadFile } from "../api/attachments.api";
import { Tool } from "../types/types";
import * as fs from "fs/promises";

export const getAttachmentTool: Tool = {
  name: "redmine_get-attachment",
  description: "Retrieves the details of an attachment by its ID.",
  parameters: z.object({
    id: z.number().describe("The ID of the attachment."),
  }),
  execute: async ({ id }) => {
    try {
      const result = await getAttachment(id);
      return result.attachment;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to retrieve attachment ${id}: ${errorMessage}`);
    }
  },
};

export const uploadFileTool: Tool = {
  name: "redmine_upload-file",
  description:
    "Uploads a file to Redmine to get an attachment token. The token can then be used to attach the file to an issue or other resource.",
  parameters: z.object({
    filePath: z.string().describe("The local path to the file to be uploaded."),
    filename: z.string().describe("The name that the file should have on the server."),
    contentType: z
      .string()
      .optional()
      .describe(
        "The MIME type of the file (e.g., 'image/png'). Defaults to 'application/octet-stream'."
      ),
  }),
  execute: async ({ filePath, filename, contentType }) => {
    try {
      const fileData = await fs.readFile(filePath);
      const result = await uploadFile(fileData, filename, contentType);
      return result.upload;
    } catch (error: any) {
      if (error.code === "ENOENT") {
        throw new Error(`File not found at path: ${filePath}`);
      }
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to upload file ${filename}: ${errorMessage}`);
    }
  },
};

export const deleteAttachmentTool: Tool = {
  name: "redmine_delete-attachment",
  description: "Deletes an attachment. Requires Redmine 4.0.0 or higher.",
  parameters: z.object({
    id: z.number().describe("The ID of the attachment to delete."),
  }),
  execute: async ({ id }) => {
    try {
      await deleteAttachment(id);
      return { success: true, message: `Attachment ${id} deleted successfully.` };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(", ") || error.message;
      throw new Error(`Failed to delete attachment ${id}: ${errorMessage}`);
    }
  },
};

import { axiosInstance } from "../utils/axios.util";
import { RedmineAttachment } from "../types/types";

// Response for upload
interface UploadResponse {
  upload: {
    token: string;
  };
}

// Response for get
interface AttachmentResponse {
  attachment: RedmineAttachment;
}

/**
 * Uploads a file to be attached to an object later.
 * The request body must be the raw file data.
 * @param fileData The raw binary data of the file.
 * @param filename The name of the file.
 * @param contentType The MIME type of the file (e.g., 'application/octet-stream').
 */
export const uploadFile = async (
  fileData: any,
  filename: string,
  contentType: string = "application/octet-stream"
): Promise<UploadResponse> => {
  const response = await axiosInstance.post(`/uploads.json?filename=${filename}`, fileData, {
    headers: {
      "Content-Type": contentType,
    },
  });
  return response.data;
};

/**
 * Retrieves the details of an attachment.
 * @param id The ID of the attachment.
 */
export const getAttachment = async (id: number): Promise<AttachmentResponse> => {
  const response = await axiosInstance.get(`/attachments/${id}.json`);
  return response.data;
};

/**
 * Deletes an attachment. (Added in Redmine 4.0.0)
 * @param id The ID of the attachment.
 */
export const deleteAttachment = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/attachments/${id}.json`);
};

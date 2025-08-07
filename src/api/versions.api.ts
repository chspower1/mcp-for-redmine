import { axiosInstance } from "@/utils/axios.util";
import {
  CreateVersionPayload,
  RedmineVersion,
  UpdateVersionPayload,
} from "@/schema/version.schema";

interface VersionListResponse {
  versions: RedmineVersion[];
}

interface VersionResponse {
  version: RedmineVersion;
}

export const listVersions = async (projectId: string | number): Promise<VersionListResponse> => {
  const response = await axiosInstance.get(`/projects/${projectId}/versions.json`);
  return response.data;
};

export const getVersion = async (id: string): Promise<VersionResponse> => {
  const response = await axiosInstance.get(`/versions/${id}.json`);
  return response.data;
};

export const createVersion = async (
  projectId: string | number,
  versionData: CreateVersionPayload
): Promise<VersionResponse> => {
  const response = await axiosInstance.post(`/projects/${projectId}/versions.json`, versionData);
  return response.data;
};

export const updateVersion = async (
  id: string,
  versionData: UpdateVersionPayload
): Promise<void> => {
  await axiosInstance.put(`/versions/${id}.json`, versionData);
};

export const deleteVersion = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/versions/${id}.json`);
};

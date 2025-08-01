import { axiosInstance } from "../utils/axios.util";
import {
  CreateProjectPayload,
  RedmineProject,
  UpdateProjectPayload,
} from "../schema/project.schema";

interface ProjectListResponse {
  projects: RedmineProject[];
  total_count: number;
  offset: number;
  limit: number;
}

interface ProjectResponse {
  project: RedmineProject;
}

export const listProjects = async (): Promise<ProjectListResponse> => {
  const response = await axiosInstance.get("/projects.json");
  return response.data;
};

export const getProject = async (
  id: string | number,
  params?: { include?: string }
): Promise<ProjectResponse> => {
  const response = await axiosInstance.get(`/projects/${id}.json`, { params });
  return response.data;
};

export const createProject = async (
  projectData: CreateProjectPayload
): Promise<ProjectResponse> => {
  const response = await axiosInstance.post("/projects.json", projectData);
  return response.data;
};

export const updateProject = async (
  id: string | number,
  projectData: UpdateProjectPayload
): Promise<void> => {
  await axiosInstance.put(`/projects/${id}.json`, projectData);
};

export const archiveProject = async (id: string | number): Promise<void> => {
  await axiosInstance.put(`/projects/${id}/archive.json`);
};

export const unarchiveProject = async (id: string | number): Promise<void> => {
  await axiosInstance.put(`/projects/${id}/unarchive.json`);
};

export const deleteProject = async (id: string | number): Promise<void> => {
  await axiosInstance.delete(`/projects/${id}.json`);
};

import { axiosInstance } from "@/utils/axios.util";
import { CreateUserPayload, RedmineUser, UpdateUserPayload } from "@/schema/user.schema";

// response types
interface UserResponse {
  user: RedmineUser;
}

interface UserListResponse {
  users: RedmineUser[];
  total_count: number;
  offset: number;
  limit: number;
}

/**
 * Retrieves a list of users.
 * This is an admin-only method.
 */
export const listUsers = async (): Promise<UserListResponse> => {
  const response = await axiosInstance.get("/users.json");
  return response.data;
};

/**
 * Retrieves the currently logged-in user account.
 */
export const getCurrentUser = async (params?: { include?: string }): Promise<UserResponse> => {
  const response = await axiosInstance.get("/users/current.json", { params });
  return response.data;
};

/**
 * Retrieves a single user by their ID.
 * @param id The ID of the user to retrieve.
 */
export const getUser = async (id: string): Promise<UserResponse> => {
  const response = await axiosInstance.get(`/users/${id}.json`);
  return response.data;
};

/**
 * Creates a new user.
 * @param userData The data for the new user.
 */
export const createUser = async (userData: CreateUserPayload): Promise<UserResponse> => {
  const response = await axiosInstance.post("/users.json", userData);
  return response.data;
};

/**
 * Updates an existing user.
 * @param id The ID of the user to update.
 * @param userData The data to update for the user.
 */
export const updateUser = async (id: string, userData: UpdateUserPayload): Promise<void> => {
  await axiosInstance.put(`/users/${id}.json`, userData);
};

/**
 * Deletes a user.
 * @param id The ID of the user to delete.
 */
export const deleteUser = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/users/${id}.json`);
};

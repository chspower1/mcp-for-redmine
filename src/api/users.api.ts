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
 * Retrieves a list of users from Redmine.
 * 
 * **Note**: This endpoint requires administrator privileges.
 * 
 * @param params - Optional query parameters for filtering
 * @param params.status - Filter users by status (1=active, 2=registered, 3=locked)
 * @param params.name - Filter users by name (searches in login, firstname, lastname, and mail)
 * @param params.group_id - Filter users by group membership (group ID)
 * @param params.offset - Skip this number of users (for pagination)
 * @param params.limit - Number of users per page (default: 25, max: 100)
 * @returns Promise containing the list of users with pagination metadata
 */
export const listUsers = async (params?: {
  status?: 1 | 2 | 3;
  name?: string;
  group_id?: number;
  offset?: number;
  limit?: number;
}): Promise<UserListResponse> => {
  const response = await axiosInstance.get("/users.json", { params });
  return response.data;
};

/**
 * Retrieves the currently authenticated user's account information.
 * 
 * This endpoint returns details about the user associated with the current API key
 * or authenticated session.
 * 
 * @param params - Optional parameters
 * @param params.include - Comma-separated list of associations to include:
 *   - 'memberships': Include user's project memberships
 *   - 'groups': Include user's group memberships
 * @returns Promise containing the current user's information
 */
export const getCurrentUser = async (params?: { include?: string }): Promise<UserResponse> => {
  const response = await axiosInstance.get("/users/current.json", { params });
  return response.data;
};

/**
 * Retrieves a single user by their ID.
 * 
 * **Note**: 
 * - Admin users can view all user details
 * - Non-admin users can only view limited information
 * - Locked users return 404 status
 * 
 * @param id - The numeric ID of the user to retrieve
 * @param params - Optional parameters
 * @param params.include - Comma-separated list of associations to include:
 *   - 'memberships': Include user's project memberships
 *   - 'groups': Include user's group memberships
 * @returns Promise containing the user's information
 */
export const getUser = async (id: string, params?: { include?: string }): Promise<UserResponse> => {
  const response = await axiosInstance.get(`/users/${id}.json`, { params });
  return response.data;
};

/**
 * Creates a new user in Redmine.
 * 
 * **Note**: This endpoint requires administrator privileges.
 * 
 * Required fields:
 * - login: Unique username for the user
 * - firstname: User's first name
 * - lastname: User's last name  
 * - mail: User's email address
 * - password OR generate_password: One must be provided
 * 
 * @param userData - The user data payload containing required and optional fields
 * @returns Promise containing the created user's information
 * @throws 422 Unprocessable Entity if validation fails
 */
export const createUser = async (userData: CreateUserPayload): Promise<UserResponse> => {
  const response = await axiosInstance.post("/users.json", userData);
  return response.data;
};

/**
 * Updates an existing user's information.
 * 
 * **Note**: This endpoint requires administrator privileges.
 * 
 * All fields are optional - only provide fields that need to be updated.
 * 
 * @param id - The numeric ID of the user to update
 * @param userData - The user data payload containing fields to update
 * @returns Promise that resolves when the update is successful
 * @throws 422 Unprocessable Entity if validation fails
 */
export const updateUser = async (id: string, userData: UpdateUserPayload): Promise<void> => {
  await axiosInstance.put(`/users/${id}.json`, userData);
};

/**
 * Deletes a user from Redmine.
 * 
 * **Note**: This endpoint requires administrator privileges.
 * 
 * **Warning**: This action is permanent and cannot be undone.
 * All user's associated data will be affected.
 * 
 * @param id - The numeric ID of the user to delete
 * @returns Promise that resolves when the deletion is successful
 */
export const deleteUser = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/users/${id}.json`);
};

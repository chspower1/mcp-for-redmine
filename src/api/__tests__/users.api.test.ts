import MockAdapter from "axios-mock-adapter";
import { axiosInstance } from "../../utils/axios.util";
import { listUsers, getUser, createUser, updateUser, deleteUser } from "../users.api";
import { RedmineUser } from "../../schema";

describe("Redmine Users API", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    //
    mock = new MockAdapter(axiosInstance);
  });

  afterEach(() => {
    mock.restore();
  });

  describe("listUsers", () => {
    it("should return an array of users", async () => {
      const users: RedmineUser[] = [
        {
          id: 1,
          login: "user1",
          firstname: "Test",
          lastname: "User1",
          mail: "user1@example.com",
          created_on: "2024-01-01T00:00:00Z",
          updated_on: "2024-01-01T00:00:00Z",
          last_login_on: "2024-01-01T00:00:00Z",
        },
      ];
      const responseData = { users, total_count: 1, offset: 0, limit: 25 };
      mock.onGet("/users.json").reply(200, responseData);

      const result = await listUsers();
      expect(result).toEqual(responseData);
    });
  });

  describe("getUser", () => {
    it("should return a single user", async () => {
      const user: RedmineUser = {
        id: 1,
        login: "user1",
        firstname: "Test",
        lastname: "User1",
        mail: "user1@example.com",
        created_on: "2024-01-01T00:00:00Z",
        updated_on: "2024-01-01T00:00:00Z",
        last_login_on: "2024-01-01T00:00:00Z",
      };
      mock.onGet("/users/1.json").reply(200, { user });

      const result = await getUser("1");
      expect(result).toEqual({ user });
    });
  });

  describe("createUser", () => {
    it("should create a new user and return it", async () => {
      const newUserPayload = {
        user: {
          login: "newuser",
          firstname: "New",
          lastname: "User",
          mail: "newuser@example.com",
        },
      };
      const createdUser: RedmineUser = {
        id: 2,
        login: "newuser",
        firstname: "New",
        lastname: "User",
        mail: "newuser@example.com",
        created_on: "2024-01-02T00:00:00Z",
        updated_on: "2024-01-02T00:00:00Z",
      };
      mock.onPost("/users.json", newUserPayload).reply(201, { user: createdUser });

      const result = await createUser(newUserPayload);
      expect(result).toEqual({ user: createdUser });
    });
  });

  describe("updateUser", () => {
    it("should update an existing user", async () => {
      const updatedUserData = {
        user: {
          firstname: "Updated",
        },
      };
      mock.onPut("/users/1.json", updatedUserData).reply(204);

      await expect(updateUser("1", updatedUserData)).resolves.not.toThrow();
    });
  });

  describe("deleteUser", () => {
    it("should delete a user", async () => {
      mock.onDelete("/users/1.json").reply(204);

      await expect(deleteUser("1")).resolves.not.toThrow();
    });
  });
});

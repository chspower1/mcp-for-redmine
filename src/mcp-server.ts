import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  createUserTool,
  deleteUserTool,
  getUserTool,
  listUsersTool,
  updateUserTool,
} from "./tools/users.tools";

export const server = new McpServer({
  name: "mcp-for-redmine",
  version: "0.1.0",
});

server.registerTool(
  "test1",
  {
    inputSchema: {
      name: z.string(),
    },
  },
  async ({ name }) => {
    return {
      content: [{ type: "text", text: `Hello, ${name}!` }],
    };
  }
);

server.registerTool(createUserTool.name, createUserTool.config, createUserTool.execute);
server.registerTool(getUserTool.name, getUserTool.config, getUserTool.execute);
server.registerTool(listUsersTool.name, listUsersTool.config, listUsersTool.execute);
server.registerTool(updateUserTool.name, updateUserTool.config, updateUserTool.execute);
server.registerTool(deleteUserTool.name, deleteUserTool.config, deleteUserTool.execute);

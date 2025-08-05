import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  archiveProjectTool,
  createProjectTool,
  deleteProjectTool,
  getProjectTool,
  listProjectsTool,
  unarchiveProjectTool,
  updateProjectTool,
} from "./tools/projects.tools";
import {
  createUserTool,
  deleteUserTool,
  getUserTool,
  listUsersTool,
  updateUserTool,
} from "./tools/users.tools";
import {
  createIssueTool,
  deleteIssueTool,
  getIssueTool,
  listIssuesTool,
  updateIssueTool,
} from "./tools/issues.tools";

export const server = new McpServer({
  name: "mcp-for-redmine",
  version: "0.1.0",
});

// Test Tool
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

// User Tools
server.registerTool(createUserTool.name, createUserTool.config, createUserTool.execute);
server.registerTool(getUserTool.name, getUserTool.config, getUserTool.execute);
server.registerTool(listUsersTool.name, listUsersTool.config, listUsersTool.execute);
server.registerTool(updateUserTool.name, updateUserTool.config, updateUserTool.execute);
server.registerTool(deleteUserTool.name, deleteUserTool.config, deleteUserTool.execute);

// Project Tools
server.registerTool(listProjectsTool.name, listProjectsTool.config, listProjectsTool.execute);
server.registerTool(getProjectTool.name, getProjectTool.config, getProjectTool.execute);
server.registerTool(createProjectTool.name, createProjectTool.config, createProjectTool.execute);
server.registerTool(updateProjectTool.name, updateProjectTool.config, updateProjectTool.execute);
server.registerTool(archiveProjectTool.name, archiveProjectTool.config, archiveProjectTool.execute);
server.registerTool(
  unarchiveProjectTool.name,
  unarchiveProjectTool.config,
  unarchiveProjectTool.execute
);
server.registerTool(deleteProjectTool.name, deleteProjectTool.config, deleteProjectTool.execute);

// Issue Tools
server.registerTool(listIssuesTool.name, listIssuesTool.config, listIssuesTool.execute);
server.registerTool(getIssueTool.name, getIssueTool.config, getIssueTool.execute);
server.registerTool(createIssueTool.name, createIssueTool.config, createIssueTool.execute);
server.registerTool(updateIssueTool.name, updateIssueTool.config, updateIssueTool.execute);
server.registerTool(deleteIssueTool.name, deleteIssueTool.config, deleteIssueTool.execute);

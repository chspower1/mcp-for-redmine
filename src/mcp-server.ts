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
import {
  createTimeEntryTool,
  deleteTimeEntryTool,
  getTimeEntryTool,
  listTimeEntriesTool,
  updateTimeEntryTool,
} from "./tools/time-entries.tools";
import {
  createVersionTool,
  deleteVersionTool,
  getVersionTool,
  listVersionsTool,
  updateVersionTool,
} from "./tools/versions.tools";
import { listIssuePrioritiesTool, listTimeEntryActivitiesTool } from "./tools/enumerations.tools";
import {
  createIssueRelationTool,
  deleteIssueRelationTool,
  listIssueRelationsTool,
} from "./tools/issue-relations.tools";
import {
  createOrUpdateWikiPageTool,
  deleteWikiPageTool,
  getWikiPageTool,
  listWikiPagesTool,
} from "./tools/wiki-pages.tools";

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

// Time Entry Tools
server.registerTool(
  listTimeEntriesTool.name,
  listTimeEntriesTool.config,
  listTimeEntriesTool.execute
);
server.registerTool(getTimeEntryTool.name, getTimeEntryTool.config, getTimeEntryTool.execute);
server.registerTool(
  createTimeEntryTool.name,
  createTimeEntryTool.config,
  createTimeEntryTool.execute
);
server.registerTool(
  updateTimeEntryTool.name,
  updateTimeEntryTool.config,
  updateTimeEntryTool.execute
);
server.registerTool(
  deleteTimeEntryTool.name,
  deleteTimeEntryTool.config,
  deleteTimeEntryTool.execute
);

// Version Tools
server.registerTool(listVersionsTool.name, listVersionsTool.config, listVersionsTool.execute);
server.registerTool(getVersionTool.name, getVersionTool.config, getVersionTool.execute);
server.registerTool(createVersionTool.name, createVersionTool.config, createVersionTool.execute);
server.registerTool(updateVersionTool.name, updateVersionTool.config, updateVersionTool.execute);
server.registerTool(deleteVersionTool.name, deleteVersionTool.config, deleteVersionTool.execute);

// Enumeration Tools
server.registerTool(
  listIssuePrioritiesTool.name,
  listIssuePrioritiesTool.config,
  listIssuePrioritiesTool.execute
);
server.registerTool(
  listTimeEntryActivitiesTool.name,
  listTimeEntryActivitiesTool.config,
  listTimeEntryActivitiesTool.execute
);

// Issue Relation Tools
server.registerTool(
  listIssueRelationsTool.name,
  listIssueRelationsTool.config,
  listIssueRelationsTool.execute
);
server.registerTool(
  createIssueRelationTool.name,
  createIssueRelationTool.config,
  createIssueRelationTool.execute
);
server.registerTool(
  deleteIssueRelationTool.name,
  deleteIssueRelationTool.config,
  deleteIssueRelationTool.execute
);

// Wiki Page Tools
server.registerTool(listWikiPagesTool.name, listWikiPagesTool.config, listWikiPagesTool.execute);
server.registerTool(getWikiPageTool.name, getWikiPageTool.config, getWikiPageTool.execute);
server.registerTool(
  createOrUpdateWikiPageTool.name,
  createOrUpdateWikiPageTool.config,
  createOrUpdateWikiPageTool.execute
);
server.registerTool(deleteWikiPageTool.name, deleteWikiPageTool.config, deleteWikiPageTool.execute);

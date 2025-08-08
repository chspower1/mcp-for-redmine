import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  archiveProjectTool,
  createIssueTool,
  createProjectTool,
  createTimeEntryTool,
  createUserTool,
  deleteIssueTool,
  deleteProjectTool,
  deleteTimeEntryTool,
  deleteUserTool,
  getIssueTool,
  getProjectTool,
  getTimeEntryTool,
  getUserTool,
  listIssuesTool,
  listProjectsTool,
  listTimeEntriesTool,
  listUsersTool,
  searchTool,
  unarchiveProjectTool,
  updateIssueTool,
  updateProjectTool,
  updateTimeEntryTool,
  updateUserTool,
} from "./tools";

export const server = new McpServer({
  name: "mcp-for-redmine",
  version: "0.1.3",
});

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

// // Version Tools
// server.registerTool(listVersionsTool.name, listVersionsTool.config, listVersionsTool.execute);
// server.registerTool(getVersionTool.name, getVersionTool.config, getVersionTool.execute);
// server.registerTool(createVersionTool.name, createVersionTool.config, createVersionTool.execute);
// server.registerTool(updateVersionTool.name, updateVersionTool.config, updateVersionTool.execute);
// server.registerTool(deleteVersionTool.name, deleteVersionTool.config, deleteVersionTool.execute);

// // Enumeration Tools
// server.registerTool(
//   listIssuePrioritiesTool.name,
//   listIssuePrioritiesTool.config,
//   listIssuePrioritiesTool.execute
// );
// server.registerTool(
//   listTimeEntryActivitiesTool.name,
//   listTimeEntryActivitiesTool.config,
//   listTimeEntryActivitiesTool.execute
// );

// // Issue Relation Tools
// server.registerTool(
//   listIssueRelationsTool.name,
//   listIssueRelationsTool.config,
//   listIssueRelationsTool.execute
// );
// server.registerTool(
//   createIssueRelationTool.name,
//   createIssueRelationTool.config,
//   createIssueRelationTool.execute
// );
// server.registerTool(
//   deleteIssueRelationTool.name,
//   deleteIssueRelationTool.config,
//   deleteIssueRelationTool.execute
// );

// // Wiki Page Tools
// server.registerTool(listWikiPagesTool.name, listWikiPagesTool.config, listWikiPagesTool.execute);
// server.registerTool(getWikiPageTool.name, getWikiPageTool.config, getWikiPageTool.execute);
// server.registerTool(
//   createOrUpdateWikiPageTool.name,
//   createOrUpdateWikiPageTool.config,
//   createOrUpdateWikiPageTool.execute
// );
// server.registerTool(deleteWikiPageTool.name, deleteWikiPageTool.config, deleteWikiPageTool.execute);

// // Query Tools
// server.registerTool(listQueriesTool.name, listQueriesTool.config, listQueriesTool.execute);

// // Attachment Tools
// server.registerTool(getAttachmentTool.name, getAttachmentTool.config, getAttachmentTool.execute);
// server.registerTool(
//   deleteAttachmentTool.name,
//   deleteAttachmentTool.config,
//   deleteAttachmentTool.execute
// );

// // File Tools
// server.registerTool(listFilesTool.name, listFilesTool.config, listFilesTool.execute);

// // Issue Status Tools
// server.registerTool(
//   listIssueStatusesTool.name,
//   listIssueStatusesTool.config,
//   listIssueStatusesTool.execute
// );

// // Tracker Tools
// server.registerTool(listTrackersTool.name, listTrackersTool.config, listTrackersTool.execute);

// // Issue Category Tools
// server.registerTool(
//   listIssueCategoriesTool.name,
//   listIssueCategoriesTool.config,
//   listIssueCategoriesTool.execute
// );
// server.registerTool(
//   createIssueCategoryTool.name,
//   createIssueCategoryTool.config,
//   createIssueCategoryTool.execute
// );
// server.registerTool(
//   getIssueCategoryTool.name,
//   getIssueCategoryTool.config,
//   getIssueCategoryTool.execute
// );
// server.registerTool(
//   updateIssueCategoryTool.name,
//   updateIssueCategoryTool.config,
//   updateIssueCategoryTool.execute
// );
// server.registerTool(
//   deleteIssueCategoryTool.name,
//   deleteIssueCategoryTool.config,
//   deleteIssueCategoryTool.execute
// );

// // Role Tools
// server.registerTool(listRolesTool.name, listRolesTool.config, listRolesTool.execute);
// server.registerTool(getRoleTool.name, getRoleTool.config, getRoleTool.execute);

// // Group Tools
// server.registerTool(listGroupsTool.name, listGroupsTool.config, listGroupsTool.execute);
// server.registerTool(getGroupTool.name, getGroupTool.config, getGroupTool.execute);
// server.registerTool(createGroupTool.name, createGroupTool.config, createGroupTool.execute);
// server.registerTool(updateGroupTool.name, updateGroupTool.config, updateGroupTool.execute);
// server.registerTool(deleteGroupTool.name, deleteGroupTool.config, deleteGroupTool.execute);
// server.registerTool(addUserToGroupTool.name, addUserToGroupTool.config, addUserToGroupTool.execute);
// server.registerTool(
//   removeUserFromGroupTool.name,
//   removeUserFromGroupTool.config,
//   removeUserFromGroupTool.execute
// );

// // Custom Field Tools
// server.registerTool(
//   listCustomFieldsTool.name,
//   listCustomFieldsTool.config,
//   listCustomFieldsTool.execute
// );

// Search Tools
server.registerTool(searchTool.name, searchTool.config, searchTool.execute);

// // My Account Tools
// server.registerTool(getMyAccountTool.name, getMyAccountTool.config, getMyAccountTool.execute);

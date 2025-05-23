import dotenv from "dotenv";
dotenv.config(); // .env 파일의 환경 변수를 process.env로 로드합니다.

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
// import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"; // No longer used
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js"; // Corrected import
import { randomUUID } from "node:crypto"; // For sessionIdGenerator
import { z } from "zod";
import fetch from "node-fetch";
import {
  RedmineUser,
  RedmineRole,
  RedmineMembership,
  RedmineProject,
  RedmineTracker,
  RedmineStatus,
  RedminePriority,
  RedmineCustomField,
  RedmineJournalDetail,
  RedmineJournal,
  RedmineAttachment,
  RedmineRelation,
  RedmineIssue,
  RedmineActivity,
  RedmineTimeEntry,
  RedmineGroup,
} from "./types.js"; // Importing all Redmine types

// --- Interface Definitions have been moved to src/types.ts ---

// --- Main Application Logic ---

async function main() {
  const server = new McpServer({
    name: "mcp-for-redmine",
    version: "0.1.0",
    description: "MCP Server for interacting with a Redmine instance.",
  });

  const redmineApiKey = process.env.REDMINE_API_KEY;
  const redmineBaseUrl = process.env.REDMINE_BASE_URL;

  if (!redmineApiKey) {
    console.error("REDMINE_API_KEY environment variable is not set.");
    process.exit(1);
  }
  if (!redmineBaseUrl) {
    console.error("REDMINE_BASE_URL environment variable is not set.");
    process.exit(1);
  }

  console.log(`Initializing MCP server for Redmine at: ${redmineBaseUrl}`);

  // --- All MCP Tool definitions have been removed as per request ---
  // You can start adding new tools here, one by one.
  // Example of adding a simple tool:
  /*
  server.tool(
    "exampleTool",
    {
      inputMessage: z.string(),
    },
    async ({ inputMessage }) => {
      // Tool logic here
      const outputMessage = `Received: ${inputMessage}`;
      console.log(`Example tool executed with: ${inputMessage}`);
      return {
        content: [{ type: "text", text: outputMessage }],
      };
    }
  );
  */

  // Server startup logic - Changed to Streamable HTTP transport
  const port = process.env.MCP_PORT ? parseInt(process.env.MCP_PORT, 10) : 3000;
  console.log(`MCP server for Redmine starting on port: ${port}...`);

  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
    onsessioninitialized: (sessionId) => {
      console.log(`MCP Session initialized: ${sessionId}`);
      // Here you might store the transport instance if managing multiple sessions, as shown in SDK guide with Express.
      // For a single, global transport instance, this might not be strictly necessary unless you need to reference it by ID.
    },
    // NOTE: This transport is designed to be integrated with a web server framework like Express.
    // Running it standalone like this might not expose an HTTP endpoint directly without further adapters
    // or the SDK handling it internally, which is not explicitly shown for non-Express use in the guide.
    // The port option is typically for the web server (e.g., app.listen(port) in Express).
    // We are providing minimal required options for now.
  });

  // Attempt to connect. This might throw an error if the transport expects
  // to be part of a larger web server setup that isn't present.
  try {
    await server.connect(transport);
    console.log(`MCP server connected with StreamableHTTPServerTransport.`);
    console.log(`However, to make it externally accessible via HTTP on port ${port},`);
    console.log(
      "you will likely need to integrate this transport with a web server like Express, as shown in the SDK documentation."
    );
    console.log(
      "The transport itself might not start an HTTP listener on its own in this basic configuration."
    );
  } catch (e: any) {
    console.error("Failed to connect server with StreamableHTTPServerTransport:", e.message);
    console.error(
      "This transport usually requires integration with a web framework (e.g., Express). Please check the SDK documentation."
    );
  }
}

main().catch((error) => {
  console.error("Failed to start MCP server:", error);
  process.exit(1);
});

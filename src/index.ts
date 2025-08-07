import dotenv from "dotenv";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server as mcpServer } from "./mcp-server.js";

dotenv.config();

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

async function main() {
  console.error("Starting MCP server with stdio transport");
  // Stdio transport does not require any arguments
  const transport = new StdioServerTransport();

  // Connect the transport object to the MCP server
  await mcpServer.connect(transport);
  console.error("MCP server stopped");
}

main().catch((err) => {
  console.error("MCP server error:", err);
  process.exit(1);
});

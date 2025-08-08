import dotenv from "dotenv";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server as mcpServer } from "./mcp-server.js";

dotenv.config();

export async function startMcpServerStdio(): Promise<void> {
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

  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
}

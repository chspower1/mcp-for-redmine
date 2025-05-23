import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// import { z } from "zod"; // MCP SDK often uses zod for schema validation - Removed as not currently used
import fetch from "node-fetch"; // For making HTTP requests to Redmine API

// TODO: Define interfaces for Redmine API responses (e.g., Project)
interface RedmineProject {
  id: number;
  name: string;
  identifier: string;
  description: string;
  status: number;
  is_public: boolean;
  created_on: string;
  updated_on: string;
  // Add other relevant fields based on API response and needs
}

// TODO: Implement Redmine API interaction and MCP tools/resources

async function main() {
  const server = new McpServer({
    name: "mcp-for-redmine",
    version: "0.1.0",
    description:
      "MCP Server for interacting with a Redmine instance. It allows managing projects, issues, users, and more via the Redmine REST API.",
  });

  // TODO: Add Redmine API Key configuration from environment variable
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

  // Tool to list all projects
  server.tool(
    "listProjects",
    {
      // No input parameters for listing all projects initially
      // We can add pagination params later: limit, offset
    },
    async () => {
      try {
        const response = await fetch(`${redmineBaseUrl}/projects.json?limit=100`, {
          // Default limit to 100 for now
          method: "GET",
          headers: {
            "X-Redmine-API-Key": redmineApiKey,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error(
            `Error fetching projects: ${response.status} ${response.statusText}`,
            errorData
          );
          return {
            content: [
              {
                type: "text",
                text: `Error fetching projects: ${response.status} ${response.statusText}. Details: ${errorData}`,
              },
            ],
            isError: true,
          };
        }

        const data = (await response.json()) as { projects: RedmineProject[] }; // Type assertion
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data.projects, null, 2),
            },
          ],
        };
      } catch (error: any) {
        console.error("Exception in listProjects tool:", error);
        return {
          content: [{ type: "text", text: `Exception in listProjects tool: ${error.message}` }],
          isError: true,
        };
      }
    }
  );

  // TODO: Implement other tools and resources based on requirements.md

  console.log("MCP server for Redmine starting...");
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("MCP server for Redmine connected and running. Ready to receive commands.");
}

main().catch((error) => {
  console.error("Failed to start MCP server:", error);
  process.exit(1);
});

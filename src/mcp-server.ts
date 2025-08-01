import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

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

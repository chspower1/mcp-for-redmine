import dotenv from "dotenv";
dotenv.config(); // .env 파일의 환경 변수를 process.env로 로드합니다.

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const createServerInstance = () => {
  const server = new McpServer(
    {
      name: "mcp-for-redmine",
      version: "0.1.0",
    },
    {
      capabilities: {
        resources: {},
        tools: {},
        prompts: {},
      },
    }
  );

  server.tool(
    "test-tool1",
    "this is test tool1",
    {
      inputMessage: z.string(),
    },
    async ({ inputMessage }) => {
      return {
        content: [{ type: "text", text: `받은 메시지: ${inputMessage}` }],
      };
    }
  );
  return server;
};

async function main() {
  const redmineApiKey = process.env.REDMINE_API_KEY;
  const redmineBaseUrl = process.env.REDMINE_BASE_URL;

  if (!redmineApiKey) {
    console.error("REDMINE_API_KEY 환경 변수가 설정되어 있지 않습니다.");
    process.exit(1);
  }
  if (!redmineBaseUrl) {
    console.error("REDMINE_BASE_URL 환경 변수가 설정되어 있지 않습니다.");
    process.exit(1);
  }

  console.log(`Redmine용 MCP 서버를 초기화합니다: ${redmineBaseUrl}`);

  // 서버 시작 로직 - Streamable HTTP 트랜스포트로 변경됨
  const port = process.env.MCP_PORT ? parseInt(process.env.MCP_PORT, 10) : 7140;
  console.log(`Redmine용 MCP 서버가 포트 ${port}에서 시작됩니다...`);
  const server = createServerInstance();
  const transport = new StdioServerTransport();

  // 연결 시도. 트랜스포트가 더 큰 웹 서버 환경에서 동작하도록 설계된 경우 에러가 발생할 수 있습니다.
  try {
    await server.connect(transport);
    console.log(`MCP 서버가 StdioServerTransport로 연결되었습니다.`);
    console.log(`이 서버는 표준 입출력을 통해 통신합니다.`);
  } catch (e: any) {
    console.error("StdioServerTransport와 서버 연결에 실패했습니다:", e.message);
  }
}

main().catch((error) => {
  console.error("MCP 서버 시작에 실패했습니다:", error);
  process.exit(1);
});

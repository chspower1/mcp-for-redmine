#!/usr/bin/env node
import { Command } from "commander";
import "dotenv/config";

import { startMcpServerStdio } from "./index.js";

const program = new Command();

program
  .name("@chspower1/mcp-for-redmine")
  .description("Run the MCP server for Redmine with required credentials.")
  .requiredOption("-u, --url <url>", "Redmine base URL")
  .requiredOption("-k, --api-key <key>", "Redmine API key")
  .action((options) => {
    process.env.REDMINE_BASE_URL = options.url;
    process.env.REDMINE_API_KEY = options.apiKey;

    startMcpServerStdio();
  });

program.parse(process.argv);

#!/usr/bin/env node
import { Command } from "commander";
import "dotenv/config";

import { startMcpServerStdio } from "./index.js";

const program = new Command();

program
  .name("@chspower1/mcp-for-redmine")
  .description("Run the MCP server for Redmine with required credentials.")
  .option("-u, --url <url>", "Redmine base URL")
  .option("-k, --api-key <key>", "Redmine API key")
  .option("--env-file <path>", "Path to .env file (default: .env)")
  .option("--tls-verify", "Enable TLS verification", true)
  .option("--no-tls-verify", "Disable TLS verification")
  .action((options) => {
    // Priority: CLI args > Environment variables > Error
    const url = options.url || process.env.REDMINE_BASE_URL || process.env.REDMINE_URL;

    const apiKey = options.apiKey || process.env.REDMINE_API_KEY || process.env.REDMINE_TOKEN;

    // Validation with helpful error messages
    if (!url) {
      console.error("❌ Redmine URL is required!\n");
      console.error("You can provide it using:");
      console.error("  🔹 CLI argument: --url https://your.redmine.tld");
      console.error("  🔹 Environment variable: REDMINE_BASE_URL=https://your.redmine.tld");
      console.error("  🔹 Environment variable: REDMINE_URL=https://your.redmine.tld");
      console.error("  🔹 .env file: REDMINE_BASE_URL=https://your.redmine.tld\n");
      process.exit(1);
    }

    if (!apiKey) {
      console.error("❌ Redmine API key is required!\n");
      console.error("You can provide it using:");
      console.error("  🔹 CLI argument: --api-key your_api_key_here");
      console.error("  🔹 Environment variable: REDMINE_API_KEY=your_api_key_here");
      console.error("  🔹 Environment variable: REDMINE_TOKEN=your_api_key_here");
      console.error("  🔹 .env file: REDMINE_API_KEY=your_api_key_here\n");
      console.error("📚 How to get API key: Go to Redmine → My account → API access key → Show\n");
      process.exit(1);
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (error) {
      console.error("❌ Invalid URL format:", url);
      console.error("Please provide a valid URL like: https://your.redmine.tld\n");
      process.exit(1);
    }

    // Set environment variables for the server
    process.env.REDMINE_BASE_URL = url;
    process.env.REDMINE_API_KEY = apiKey;
    if (options.tlsVerify === false) {
      process.env.REDMINE_TLS_VERIFY = "false";
    }

    startMcpServerStdio();
  });

program.parse(process.argv);

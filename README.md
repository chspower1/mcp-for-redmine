<div align="center">
    <img src="./assets/cover.png" alt="MCP-FOR-REDMINE" />
</div>

# MCP-For-Redmine &middot; [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/toss/slash/blob/main/LICENSE)

English | [한국어](./README-ko_kr.md) | [日本語](./README-ja_jp.md) | [简体中文](./README-zh_cn.md)

This project is a Model-Context-Protocol (MCP) server for interacting with Redmine. With an MCP-compatible client, you can easily manage projects, issues, users, and time entries in Redmine.

Currently, only the standard input/output (`stdio`) transport is supported.

### Requirements

- Node.js 18 or higher
- Redmine API Key (a personal API key from your Redmine account)

### Quickstart

You can run the server instantly with the command below.

```bash
npx -y @chspower1/mcp-for-redmine --url https://your.redmine.tld --api-key <YOUR_API_KEY>
```

### MCP Client Integration Example

You can register the server in your MCP client as follows.

```json
{
  "mcpServers": {
    "mcp-for-redmine": {
      "command": "npx",
      "args": [
        "-y",
        "@chspower1/mcp-for-redmine",
        "--url",
        "https://your.redmine.tld",
        "--api-key",
        "YOUR_API_KEY"
      ]
    }
  }
}
```

**Testing with MCP Inspector**

```bash
npx -y @modelcontextprotocol/inspector npx -y @chspower1/mcp-for-redmine --url https://your.redmine.tld --api-key YOUR_API_KEY
```

### Configuration

The server can only be configured via CLI flags.

- **CLI Flags**
  - `-u, --url <url>`
  - `-k, --api-key <key>`

**Note**: This server operates exclusively via `stdio` and does not support separate port or HTTP/SSE configurations.

### Key Features

Here are the currently available tools:

- **Users**
  - `users_create`, `users_get`, `users_list`, `users_update`, `users_delete`
- **Projects**
  - `projects_list`, `projects_get`, `projects_create`, `projects_update`, `projects_archive`, `projects_unarchive`, `projects_delete`
- **Issues**
  - `issues_list`, `issues_get`, `issues_create`, `issues_update`, `issues_delete`
- **Time Entries**
  - `time_entries_list`, `time_entries_get`, `time_entries_create`, `time_entries_update`, `time_entries_delete`

The input schema for each tool is defined in the `src/schema/*.schema.ts` files. The output is returned as a JSON-formatted string.

### Simple Examples

- You can retrieve a list of projects by calling `projects_list` from your MCP client. The result is delivered in JSON format.
- To create a new issue, use `issues_create`. You must provide at least `project_id` and `subject`.

### Troubleshooting Guide

- **Missing Environment Variable Error**
  - **Example Error Message**: `REDMINE_API_KEY environment variable is not set.`
  - **Solution**: Please pass the required values directly using the `--url` and `--api-key` flags. While some error messages might mention a `.env` file, using CLI flags is the recommended method.
- **Node.js/ESM-related Errors**
  - Make sure you are using Node.js version 18 or higher.
- **Authentication and Network Errors (e.g., 401, 403)**
  - Verify that your API key has the correct permissions, the URL is accurate, and there are no network issues.
- **Execution Issues on Windows**
  - Try running the command using the `cmd /c npx ...` format as shown in the guide.

### Security & Permissions Notice

- Your API key is sensitive information. Please be careful not to expose it in Git commits, logs, or shared repositories.
- For destructive actions like deleting projects or issues, double-check that you have the necessary permissions and proceed with caution.

### Roadmap

We plan to add more features, such as versions, issue relations, and wikis, as the Redmine API stabilizes. While we currently only support `stdio`, we intend to add SSE (Server-Sent Events) support in the future to enhance usability.

### License

MIT
